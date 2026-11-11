/* feest.js: de feestdagen op Ruben's rommelhoekje (Sinterklaas, de kerst en oud en nieuw).
   Op elke pagina geladen door het gedeelde scorebord-blok en het 0.6-blok onderaan (niet in de werkplaats).
   - De kalender staat in feestdagen.json (aan te passen in de werkplaats: Site, Feestdagen), in Nederlandse tijd: een dag begint
     om middernacht in Nederland, waar je ook bent. Zonder feestdagen.json geldt de kalender hieronder (KALENDER).
   - De echte tijd: een klein verzoek (HEAD) naar de site zelf geeft de tijd van GitHub (de kop Date). Zo levert een verzette klok
     nooit iets op. Zonder internet kun je rondkijken, maar krijg je niets (je schoen zetten kan dan bij je volgende bezoek).
   - De verzameling: localStorage rommelhoekje-feest-v1 (in SLEUTELS, gaat mee met koppelen; in de REGELS: per dag de hoogste
     en de verzamelstukken samen, dus nooit iets dubbel en nooit iets kwijt):
       { v: 1, d: { sint26: '0000000000000123…', kerst26: '…' }, st: ['intocht26', …] }
     d: per seizoen één cijfer per dag, dag 0 is 1 november van dat jaar. Sinterklaas: 1 schoen gezet, 2 cadeautje uit de schoen
     gehaald (op de stapel), 3 uitgepakt. Kerst: 1 deurtje geopend. st: alles wat je kreeg (verzamelstukken en dingen voor de spellen).
   - Per apparaat (bewust niet in SLEUTELS): rommelhoekje-feest-apparaat ({ uit: versiering uit, zag: de intocht al gezien; het geluid volgt rommeltjes-v1.g }) en
     rommelhoekje-feest-kal (de laatste kalender, zodat een spel het meteen weet).
   - Voor de spellen: Scorebord.feest(f) (in het gedeelde blok) of window.RommelFeest.klaar(f): f(stand) zodra het bekend is, en
     opnieuw als het verandert. stand = { feest: 'sint' | 'kerst' | 'oud' | 'nieuwjaar' | null, fase, jaar, dag, winter, schoen,
     uitpakken, munt, versiering, heb(id) }. Een spel dat er niets mee doet, verandert niet.
   - Het voorbeeld in de werkplaats zet window.__feestVoorbeeld = { moment: 'JJJJ-MM-DD UU:MM', kalender }: dan geldt die tijd (Nederlandse
     tijd), en wordt er nooit iets bewaard (en het voorbeeld draait afgeschermd, zonder opslag).
   - Op de homepage laadt dit bestand feest-home.js (het feestbord). Testhaak: window.RommelFeest. */
(function () {
  'use strict';
  if (typeof window !== 'undefined' && window.RommelFeest) return;

  // ==== KERN begin
  // Alles wat met de kalender, de tijd en de verzameling te maken heeft, zonder pagina (in Node te testen: knip dit stuk eruit).
  var KALENDER = { versie: 1, jaren: [{ jaar: '2026', intocht: '2026-11-14', schoenVan: '2026-11-14', schoenTot: '2026-12-04', pakjesavond: '2026-12-05 17:00', uitpakkenTot: '2027-01-06',
    kalenderVan: '2026-12-06', kalenderTot: '2026-12-24', kerstdagenVan: '2026-12-25', kerstdagenTot: '2026-12-26', versieringTot: '2027-01-06',
    oudjaar: '2026-12-31', aftellen: '2026-12-31 23:55', middernacht: '2027-01-01 00:00', vuurwerkTot: '2027-01-01 00:20', muntVan: '2026-12-31 23:00', muntTot: '2027-01-01 03:00', nieuwjaarTot: '2027-01-06' }] };
  var VELDEN = ['intocht', 'schoenVan', 'schoenTot', 'pakjesavond', 'uitpakkenTot', 'kalenderVan', 'kalenderTot', 'kerstdagenVan', 'kerstdagenTot', 'versieringTot', 'oudjaar', 'aftellen', 'middernacht', 'vuurwerkTot', 'muntVan', 'muntTot', 'nieuwjaarTot'];
  var MET_TIJD = { pakjesavond: 1, aftellen: 1, middernacht: 1, vuurwerkTot: 1, muntVan: 1, muntTot: 1 };
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  var NLF = null;
  function nlDelen(t) {
    if (!NLF) NLF = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });
    var o = {}; NLF.formatToParts(new Date(t)).forEach(function (p) { o[p.type] = p.value; });
    return { j: +o.year, m: +o.month, d: +o.day, u: (+o.hour) % 24, mi: +o.minute, s: +o.second };
  }
  // de datum in Nederland (JJJJ-MM-DD) en het dagnummer daarvan (dagen sinds 1970)
  function nlDag(t) { var p = nlDelen(t); return p.j + '-' + pad(p.m) + '-' + pad(p.d); }
  function dagNr(dag) { var a = String(dag).split('-'); return Math.round(Date.UTC(+a[0], +a[1] - 1, +a[2]) / 864e5); }
  // 'JJJJ-MM-DD' of 'JJJJ-MM-DD UU:MM' in Nederlandse tijd, als tijdstip (ms)
  function moment(s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}))?$/.exec(String(s || '').trim()); if (!m) return NaN;
    var doel = Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] || 0), +(m[5] || 0)), u = doel;
    for (var i = 0; i < 3; i++) { var p = nlDelen(u), als = Date.UTC(p.j, p.m - 1, p.d, p.u, p.mi, p.s); if (als === doel) break; u += doel - als; }
    return u;
  }
  var datum = function (s) { return String(s || '').slice(0, 10); };
  function geldigJaar(J) {
    if (!J || !/^\d{4}$/.test(String(J.jaar))) return false;
    for (var i = 0; i < VELDEN.length; i++) { var v = J[VELDEN[i]]; if (typeof v !== 'string' || !isFinite(moment(v))) return false; }
    return true;
  }
  function jaren(kal) { var l = kal && Array.isArray(kal.jaren) ? kal.jaren.filter(geldigJaar) : []; return l.length ? l : KALENDER.jaren; }
  // het feestjaar van een moment: waarvan het (van de intocht tot en met de nieuwjaarsgroet) nu is, anders het eerstvolgende of het laatste
  function jaarVan(kal, t) {
    var l = jaren(kal), dag = nlDag(t), beste = null;
    for (var i = 0; i < l.length; i++) { var J = l[i]; if (dag >= datum(J.intocht) && dag <= datum(J.nieuwjaarTot)) return J; if (dag < datum(J.intocht) && (!beste || J.intocht < beste.intocht)) beste = J; }
    return beste || l[l.length - 1];
  }
  // het seizoen in de verzameling (sint26, kerst26) en de plek van een dag daarin (dag 0 is 1 november)
  function seizoen(soort, J) { return soort + String(J.jaar).slice(2); }
  function plek(dag, J) { return dagNr(dag) - dagNr(J.jaar + '-11-01'); }
  // welke feestdag het is
  function fase(kal, t) {
    var J = jaarVan(kal, t), dag = nlDag(t), tussen = function (a, b) { return dag >= datum(a) && dag <= datum(b); };
    var r = { feest: null, fase: null, jaar: J.jaar, dag: dag, t: t, winter: false, schoen: false, uitpakken: false, munt: false, J: J };
    var pa = moment(J.pakjesavond), mid = moment(J.middernacht);
    if (dag === datum(J.intocht)) { r.feest = 'sint'; r.fase = 'intocht'; }
    else if (tussen(J.schoenVan, J.schoenTot)) { r.feest = 'sint'; r.fase = 'schoen'; }
    else if (dag === datum(J.pakjesavond)) { r.feest = 'sint'; r.fase = t < pa ? 'pakjesavond-straks' : 'pakjesavond'; }
    else if (tussen(J.kalenderVan, J.kalenderTot)) { r.feest = 'kerst'; r.fase = 'kalender'; }
    else if (tussen(J.kerstdagenVan, J.kerstdagenTot)) { r.feest = 'kerst'; r.fase = 'kerstdagen'; }
    else if (t < mid && dag === datum(J.oudjaar)) { r.feest = 'oud'; r.fase = t < moment(J.aftellen) ? 'oudjaar' : 'aftellen'; }
    else if (t >= mid && t < moment(J.vuurwerkTot)) { r.feest = 'nieuwjaar'; r.fase = 'vuurwerk'; }
    else if (t >= mid && dag <= datum(J.nieuwjaarTot)) { r.feest = 'nieuwjaar'; r.fase = 'groet'; }
    else if (dag > datum(J.kerstdagenTot) && dag < datum(J.oudjaar)) { r.feest = 'kerst'; r.fase = 'na'; }
    r.schoen = tussen(J.schoenVan, J.schoenTot);
    r.uitpakken = t >= pa && dag <= datum(J.uitpakkenTot);
    r.winter = tussen(J.kalenderVan, J.versieringTot);
    r.munt = t >= moment(J.muntVan) && t < moment(J.muntTot);
    r.nachtjes = Math.max(0, dagNr(datum(J.pakjesavond)) - dagNr(dag));
    return r;
  }
  // de verzameling (altijd een net object: kapotte opslag wordt niets kwijt, maar ook niets extra)
  function schoon(s) {
    var r = { v: 1, d: {}, st: [] };
    if (!s || typeof s !== 'object') return r;
    if (s.d && typeof s.d === 'object') for (var k in s.d) if (/^[a-z]{3,12}\d{2}$/.test(k) && typeof s.d[k] === 'string' && /^[0-3]*$/.test(s.d[k])) r.d[k] = s.d[k].slice(0, 120);
    if (Array.isArray(s.st)) s.st.forEach(function (x) { if (typeof x === 'string' && /^[a-z0-9-]{2,40}$/.test(x) && r.st.indexOf(x) < 0) r.st.push(x); });
    for (var e in s) if (!(e in r) && e !== 'v') r[e] = s[e];
    return r;
  }
  function cijfer(s, sz, i) { var x = (s.d[sz] || '')[i]; return x ? +x : 0; }
  function zetCijfer(s, sz, i, w) { var x = s.d[sz] || ''; while (x.length <= i) x += '0'; if (+x[i] >= w) return false; s.d[sz] = (x.slice(0, i) + w + x.slice(i + 1)).replace(/0+$/, ''); return true; }
  // de Kern: kal() geeft de kalender, klok() de tijd (ms), zeker() of die tijd te vertrouwen is, en opslag { lees, schrijf }
  function Kern(o) {
    var K = {};
    K.nu = function () { return fase(o.kal(), o.klok()); };
    K.lees = function () { return schoon(o.opslag.lees()); };
    K.heb = function (id) { return K.lees().st.indexOf(id) >= 0; };
    // iets krijgen: alleen met de echte tijd, en elk ding maar één keer
    K.krijg = function (id) { if (!o.zeker()) return false; var s = K.lees(); if (s.st.indexOf(id) >= 0) return false; s.st.push(id); return o.opslag.schrijf(s); };
    // ---------- Sinterklaas: de schoen
    K.schoen = function () {
      var F = K.nu(), J = F.J, s = K.lees(), sz = seizoen('sint', J), van = plek(J.schoenVan, J), tot = plek(J.schoenTot, J), vandaag = plek(F.dag, J), uit = { sz: sz, van: van, tot: tot, vandaag: vandaag, dagen: [], gezet: 0, inSchoen: 0, stapel: 0, uitgepakt: 0, vandaagGezet: false };
      for (var i = van; i <= tot; i++) {
        var w = cijfer(s, sz, i); uit.dagen.push(w);
        if (w >= 1) uit.gezet++;
        if (w === 1 && i < vandaag) uit.inSchoen++;
        if (w === 2 || (w === 1 && i < vandaag && F.uitpakken)) uit.stapel++;
        if (w === 3) uit.uitgepakt++;
      }
      uit.vandaagGezet = F.schoen && cijfer(s, sz, vandaag) >= 1;
      uit.kanZetten = F.schoen && !uit.vandaagGezet;
      uit.alleDagen = uit.gezet === tot - van + 1;
      return uit;
    };
    // vandaag je schoen zetten (alleen in de periode, met de echte tijd)
    K.zetSchoen = function () {
      if (!o.zeker()) return false;
      var F = K.nu(); if (!F.schoen) return false;
      var s = K.lees(), sz = seizoen('sint', F.J); if (!zetCijfer(s, sz, plek(F.dag, F.J), 1)) return false;
      return o.opslag.schrijf(s);
    };
    // de cadeautjes uit je schoen halen (van de dagen voor vandaag): ze gaan op de stapel
    K.haalUitSchoen = function () {
      if (!o.zeker()) return 0;
      var F = K.nu(), J = F.J, s = K.lees(), sz = seizoen('sint', J), n = 0, vandaag = plek(F.dag, J);
      for (var i = plek(J.schoenVan, J); i <= plek(J.schoenTot, J) && i < vandaag; i++) if (cijfer(s, sz, i) === 1 && zetCijfer(s, sz, i, 2)) n++;
      if (n) o.opslag.schrijf(s);
      return n;
    };
    return K;
  }
  var KERN = { KALENDER: KALENDER, VELDEN: VELDEN, MET_TIJD: MET_TIJD, nlDag: nlDag, nlDelen: nlDelen, dagNr: dagNr, moment: moment, jaarVan: jaarVan, jaren: jaren, fase: fase, seizoen: seizoen, plek: plek, schoon: schoon, cijfer: cijfer, zetCijfer: zetCijfer, Kern: Kern, geldigJaar: geldigJaar };
  if (typeof module !== 'undefined' && module.exports && typeof window === 'undefined') { module.exports = KERN; return; }
  // ==== KERN eind

  var SLEUTEL = 'rommelhoekje-feest-v1', APP = 'rommelhoekje-feest-apparaat', KAL = 'rommelhoekje-feest-kal';
  var VB = window.__feestVoorbeeld && typeof window.__feestVoorbeeld === 'object' ? window.__feestVoorbeeld : null;
  if (VB && VB.moment) VB.t = KERN.moment(VB.moment);
  var minder = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  // waar dit bestand staat (feestdagen.json en feest-home.js staan ernaast)
  var BASIS = (function () { var s = document.currentScript && document.currentScript.src; return s && !VB ? s.replace(/[^/]*(\?.*)?$/, '') : ''; })();
  var leesJ = function (k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  var schrijfJ = function (k, v) { if (VB) return false; try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

  // ---------- de kalender: eerst wat dit apparaat de vorige keer zag (of de kalender hierboven), dan feestdagen.json
  var kal = (VB && VB.kalender) || leesJ(KAL) || KALENDER;
  // ---------- de tijd: de klok van het apparaat, gecorrigeerd met de tijd van de site (zodra die er is)
  var perf0 = (window.performance && performance.now) ? performance.now() : 0;
  var afwijking = null;   // echte tijd min de klok van dit apparaat, in ms (null: nog niet bekend)
  function klok() { if (VB && isFinite(VB.t)) return VB.t + ((window.performance && performance.now ? performance.now() : 0) - perf0); return Date.now() + (afwijking || 0); }
  // in het voorbeeld doen we alsof de tijd klopt (dan zie je wat een bezoeker ziet), maar bewaren kan daar nooit
  function zeker() { return VB ? true : afwijking !== null; }
  function haalTijd() {
    if (VB || !window.fetch) return Promise.resolve(null);
    var t0 = Date.now();
    // HEAD gaat altijd langs de service worker heen (die bekijkt alleen GET), en no-store vraagt het echt aan GitHub
    return fetch(BASIS + 'feestdagen.json', { method: 'HEAD', cache: 'no-store' }).then(function (r) {
      var d = Date.parse(r.headers.get('Date') || ''), t1 = Date.now();
      if (!r.ok || !isFinite(d)) return null;
      afwijking = d + 500 - (t0 + t1) / 2;   // de kop Date is op de seconde naar beneden afgerond
      if (Math.abs(afwijking) < 2000) afwijking = 0;
      return afwijking;
    }).catch(function () { return null; });
  }
  function haalKalender() {
    if (VB || !window.fetch) return Promise.resolve(null);
    return fetch(BASIS + 'feestdagen.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : null; }).then(function (j) {
      if (!j || !Array.isArray(j.jaren) || !j.jaren.filter(KERN.geldigJaar).length) return null;
      kal = j; try { localStorage.setItem(KAL, JSON.stringify(j)); } catch (e) {}
      return j;
    }).catch(function () { return null; });
  }
  // ---------- de verzameling
  var opslag = {
    lees: function () { if (VB && VB.verzameling) return VB.verzameling; return leesJ(SLEUTEL); },
    schrijf: function (s) { if (VB) return false; s.v = 1; var ok = schrijfJ(SLEUTEL, s); if (ok) melden(); return ok; }
  };
  var K = Kern({ kal: function () { return kal; }, klok: klok, zeker: zeker, opslag: opslag });
  // ---------- per apparaat: versiering aan of uit, en geluid (pas na een aanraking)
  var app = function () { var a = leesJ(APP); return a && typeof a === 'object' ? a : {}; };
  function zetApp(k, v) { var a = app(); a[k] = v; schrijfJ(APP, a); melden(); }

  // ---------- de stand voor de spellen, en wie er wil weten wanneer hij verandert
  function stand() {
    var F = K.nu(), uit = { feest: F.feest, fase: F.fase, jaar: F.jaar, dag: F.dag, winter: F.winter, schoen: F.schoen, uitpakken: F.uitpakken, munt: F.munt, nachtjes: F.nachtjes, zeker: zeker(), voorbeeld: !!VB };
    uit.versiering = !app().uit;
    uit.heb = function (id) { return K.heb(id); };
    return uit;
  }
  var luisteraars = [], isKlaar = false, vorige = '';
  function melden() {
    var s = stand(), sig = [s.feest, s.fase, s.dag, s.versiering, s.zeker, JSON.stringify(K.lees())].join('|');
    if (sig === vorige) return; vorige = sig;
    luisteraars.slice().forEach(function (f) { try { f(s); } catch (e) { if (window.reportError) reportError(e); } });
    try { window.dispatchEvent(new CustomEvent('rommelhoekje-feest', { detail: s })); } catch (e) {}
  }
  function klaar(f) { if (typeof f !== 'function') return; luisteraars.push(f); if (isKlaar) { try { f(stand()); } catch (e) { if (window.reportError) reportError(e); } } }

  // ---------- versiering op de andere pagina's (de homepage heeft het feestbord, uit feest-home.js)
  // Alleen op de pagina's met het papier van 0.6, achter de inhoud (dus nooit over iets heen), en nooit in een spel.
  var opHome = function () { return document.body && document.body.getAttribute('data-pagina') === 'home'; };
  var papier = function () { return !!(window.__v6sub && !opHome()); };
  var slingerEl = null;
  function versier() {
    var s = stand(), aan = s.versiering && papier() && s.feest === 'sint';
    if (!aan) { if (slingerEl) { slingerEl.remove(); slingerEl = null; } return; }
    if (slingerEl) return;
    var st = document.createElement('style'); st.id = 'fs-stijl';
    st.textContent = '.fs-slinger{position:absolute;left:0;right:0;top:0;height:34px;z-index:-1;pointer-events:none;overflow:hidden}.fs-slinger svg{display:block;width:100%;height:34px}';
    if (!document.getElementById('fs-stijl')) document.head.appendChild(st);
    slingerEl = document.createElement('div'); slingerEl.className = 'fs-slinger'; slingerEl.setAttribute('aria-hidden', 'true');
    var svg = '<svg viewBox="0 0 1000 34" preserveAspectRatio="none"><path d="M0 3Q500 24 1000 3" stroke="#7A4E2D" stroke-width="1.6" fill="none" opacity=".7"/>', kl = ['#C8323C', '#E9B949', '#FBF6E9', '#2F4C8F'];
    for (var i = 0; i < 34; i++) { var x = i * 30 + 8, y = 3 + Math.sin(Math.PI * x / 1000) * 19; svg += '<path d="M' + x + ' ' + y.toFixed(1) + 'l13 0l-6.5 13z" fill="' + kl[i % 4] + '" stroke="#231A26" stroke-width=".8" stroke-opacity=".5"/>'; }
    slingerEl.innerHTML = svg + '</svg>'; document.body.appendChild(slingerEl);
  }

  // ---------- starten
  function begin() {
    Promise.all([haalTijd(), haalKalender()]).then(function () { isKlaar = true; vorige = ''; melden(); versier(); laadHome(); });
    // eerst al met wat er is (zodat een spel niet hoeft te wachten), daarna opnieuw met de echte tijd
    setTimeout(function () { if (!isKlaar) { isKlaar = true; melden(); versier(); laadHome(); } }, VB ? 0 : 2500);
    // middernacht, en een andere fase (pakjesavond om vijf uur, het aftellen): elke 20 seconden kijken, en als je terugkomt
    setInterval(function () { melden(); versier(); }, 20000);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) { haalTijd().then(function () { melden(); versier(); }); } });
    // een ander tabblad of het koppelen veranderde de verzameling
    window.addEventListener('storage', function (e) { if (e.key === SLEUTEL || e.key === APP) { melden(); versier(); } });
    window.addEventListener('rommelhoekje-bijgewerkt', function () { melden(); });
  }
  var homeGeladen = false;
  function laadHome() {
    if (homeGeladen || !opHome()) return; homeGeladen = true;
    if (window.RommelFeestHome) { window.RommelFeestHome.start(window.RommelFeest); return; }
    if (VB) return;
    var s = document.createElement('script'); s.src = BASIS + 'feest-home.js'; s.async = true;
    s.onload = function () { if (window.RommelFeestHome) window.RommelFeestHome.start(window.RommelFeest); };
    document.head.appendChild(s);
  }

  window.RommelFeest = {
    klaar: klaar, nu: stand, kern: K, KERN: KERN, kalender: function () { return kal; }, klok: klok, zeker: zeker, haalTijd: haalTijd,
    app: app, zetApp: zetApp, melden: melden, minder: minder, voorbeeld: !!VB, BASIS: BASIS, SLEUTEL: SLEUTEL,
    get afwijking() { return afwijking; }
  };
  // wie al vroeg vroeg (Scorebord.feest, in het gedeelde blok), komt nu aan de beurt
  var wacht = window.__feestWacht; window.__feestWacht = null;
  if (Array.isArray(wacht)) wacht.forEach(klaar);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', begin); else begin();
})();
