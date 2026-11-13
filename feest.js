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
   - Per apparaat (bewust niet in SLEUTELS): rommelhoekje-feest-apparaat ({ uit: versiering uit, zag: de intocht al gezien, weg: het afscheid al gezien; het geluid volgt rommeltjes-v1.g }) en
     rommelhoekje-feest-kal (de laatste kalender, zodat een spel het meteen weet).
   - Voor de spellen: Scorebord.feest(f) (in het gedeelde blok) of window.RommelFeest.klaar(f): f(stand) zodra het bekend is, en
     opnieuw als het verandert. stand = { feest: 'sint' | 'kerst' | 'oud' | 'nieuwjaar' | null, fase, jaar, dag, winter, schoen,
     uitpakken, munt, oudNacht (31 december 18:00 tot 1 januari 06:00), versiering, heb(id) }. Een spel dat er niets mee doet, verandert niet.
   - Het voorbeeld in de werkplaats zet window.__feestVoorbeeld = { moment: 'JJJJ-MM-DD UU:MM', kalender, verzameling }: dan geldt die tijd (Nederlandse
     tijd), en wordt er nooit iets bewaard (en het voorbeeld draait afgeschermd, zonder opslag).
   - De intocht heeft een tijd (rond het middaguur): op die dag is de fase eerst 'intocht-straks' (iedereen wacht op de kade), dan
     'intocht'. Je schoen zetten kan pas vanaf de intocht.
   - Op de homepage laadt dit bestand feest-home.js (het feestbord). Testhaak: window.RommelFeest. */
(function () {
  'use strict';
  if (typeof window !== 'undefined' && window.RommelFeest) return;

  // ==== KERN begin
  // Alles wat met de kalender, de tijd en de verzameling te maken heeft, zonder pagina (in Node te testen: knip dit stuk eruit).
  var KALENDER = { versie: 1, jaren: [{ jaar: '2026', intocht: '2026-11-14 12:00', schoenVan: '2026-11-14', schoenTot: '2026-12-04', pakjesavond: '2026-12-05 17:00', uitpakkenTot: '2027-01-06',
    kalenderVan: '2026-12-06', kalenderTot: '2026-12-24', kerstdagenVan: '2026-12-25', kerstdagenTot: '2026-12-26', versieringTot: '2027-01-06',
    oudjaar: '2026-12-31', aftellen: '2026-12-31 23:55', middernacht: '2027-01-01 00:00', vuurwerkTot: '2027-01-01 00:20', muntVan: '2026-12-31 23:00', muntTot: '2027-01-01 03:00', nieuwjaarTot: '2027-01-06' }] };
  var VELDEN = ['intocht', 'schoenVan', 'schoenTot', 'pakjesavond', 'uitpakkenTot', 'kalenderVan', 'kalenderTot', 'kerstdagenVan', 'kerstdagenTot', 'versieringTot', 'oudjaar', 'aftellen', 'middernacht', 'vuurwerkTot', 'muntVan', 'muntTot', 'nieuwjaarTot'];
  var MET_TIJD = { intocht: 1, pakjesavond: 1, aftellen: 1, middernacht: 1, vuurwerkTot: 1, muntVan: 1, muntTot: 1 };
  // Sinterklaas: wat er in de pakjes zit, per feestjaar, op volgorde van de schoendagen (de eerste is de dag van schoenVan). Voor iedereen
  // hetzelfde. Nieuwe jaren krijgen nieuwe dingen; verander nooit een id (de spellen kijken ernaar met heb). MIJTER: het pakje voor wie
  // elke dag zijn schoen zette (een verzamelstuk; de homepage en Rommelkroon zetten er iets mee vrij).
  var PAKJES = { '2026': ['hp-chocoletter', 'vb-letter', 'ck-stoomboot', 'rk-pepernoot', 'rb-pepernotenuil', 'rc-pepernootfiches', 'rs-stoomboot',
    'rd-pepernotentaart', 'rp-pakjesrug', 'vb-speculaas', 'ck-binnen', 'rk-mijter', 'rb-speculaasvos', 'hp-worteltje', 'rs-mijter', 'rc-pakjeskleed',
    'vb-schoorsteen', 'rd-letters', 'ck-wind', 'rb-marsepeinvarken', 'rk-pepernotenregen'] };
  var MIJTER = { '2026': 'mijter26' };
  // Kerst: wat er achter de deurtjes zit, per feestjaar, op volgorde van de dagen (het eerste deurtje is de dag van kalenderVan).
  // Een deurtje gaat alleen op zijn eigen dag open (een gemist deurtje blijft dicht). BIJZONDER: voor wie alle deurtjes opende (vanaf de
  // dag van kalenderTot tot en met versieringTot): een gouden piek voor je boom en een feestkaart. ONDERBOOM: het cadeau onder de boom,
  // voor iedereen die op de kerstdagen komt. Verander nooit een id.
  var DEURTJES = { '2026': ['hp-kerstbal', 'vb-kerstschort', 'ck-tezamen', 'rk-kerstbal', 'rb-kerstbalbeest', 'rc-kerstfiches', 'rs-kerstster',
    'rd-kerstdiner', 'rp-sneeuwrug', 'hs-kerstboom', 'vb-kerstmarkt', 'ck-engelen', 'rk-sneeuwvlok', 'rb-sneeuwvlokkat', 'rc-kerstmutsen',
    'rs-sneeuwpop', 'rd-kerstboompje', 'vb-sneeuwkorst', 'ck-roos'] };
  var BIJZONDER = { '2026': ['piek26', 'rb-sterrenrendier'] };
  var ONDERBOOM = { '2026': 'hp-sneeuwbol' };
  // Oud en nieuw: op oudjaar een zak oliebollen om mee te nemen (voor wie die dag komt), en rond middernacht de nieuwjaarsmunt
  // (van muntVan tot muntTot, met de echte tijd). Per feestjaar; nooit een id veranderen.
  var OUDJAAR = { '2026': ['rd-oliebollen', 'vb-oliebollenkraam'] };
  var MUNT = { '2026': ['munt2027', 'rc-vuurwerkfiches'] };
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
    // de intocht: de Stoomboot komt rond het middaguur (intocht met een tijd); daarvoor wacht iedereen op de kade ('intocht-straks')
    if (dag === datum(J.intocht)) { r.feest = 'sint'; r.fase = t < moment(J.intocht) ? 'intocht-straks' : 'intocht'; }
    else if (tussen(J.schoenVan, J.schoenTot)) { r.feest = 'sint'; r.fase = 'schoen'; }
    else if (dag === datum(J.pakjesavond)) { r.feest = 'sint'; r.fase = t < pa ? 'pakjesavond-straks' : 'pakjesavond'; }
    else if (tussen(J.kalenderVan, J.kalenderTot)) { r.feest = 'kerst'; r.fase = 'kalender'; }
    else if (tussen(J.kerstdagenVan, J.kerstdagenTot)) { r.feest = 'kerst'; r.fase = 'kerstdagen'; }
    else if (t < mid && dag === datum(J.oudjaar)) { r.feest = 'oud'; r.fase = t < moment(J.aftellen) ? 'oudjaar' : 'aftellen'; }
    else if (t >= mid && t < moment(J.vuurwerkTot)) { r.feest = 'nieuwjaar'; r.fase = 'vuurwerk'; }
    else if (t >= mid && dag <= datum(J.nieuwjaarTot)) { r.feest = 'nieuwjaar'; r.fase = 'groet'; }
    else if (dag > datum(J.kerstdagenTot) && dag < datum(J.oudjaar)) { r.feest = 'kerst'; r.fase = 'na'; }
    r.schoen = tussen(J.schoenVan, J.schoenTot) && t >= moment(J.intocht);   // je schoen zetten kan pas als de Sint er is
    r.uitpakken = t >= pa && dag <= datum(J.uitpakkenTot);
    r.winter = tussen(J.kalenderVan, J.versieringTot);
    r.munt = t >= moment(J.muntVan) && t < moment(J.muntTot);
    // oudjaarsavond en die nacht (vuurwerk in de spellen): van 18:00 op oudjaar tot 06:00 op nieuwjaarsdag
    r.oudNacht = t >= moment(datum(J.oudjaar) + ' 18:00') && t < moment(datum(J.middernacht) + ' 06:00');
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
    // ---------- Sinterklaas: uitpakken (vanaf pakjesavond, tot uitpakkenTot)
    // de pakjes: wat er nog dicht op je stapel ligt (ook wat nog in je schoen zat), hoeveel er open zijn, en de Gouden Mijter
    // ('dicht' als je alle schoendagen je schoen zette en hem nog niet hebt, 'open' als je hem hebt, anders null)
    K.pakjes = function () {
      var F = K.nu(), J = F.J, s = K.lees(), sz = seizoen('sint', J), van = plek(J.schoenVan, J), tot = plek(J.schoenTot, J), vandaag = plek(F.dag, J), l = PAKJES[J.jaar] || [];
      var uit = { lijst: [], dicht: 0, open: 0, gezet: 0, dagen: tot - van + 1, mijter: null, kan: !!(F.uitpakken && o.zeker()) };
      for (var i = van; i <= tot; i++) {
        var w = cijfer(s, sz, i); if (w >= 1) uit.gezet++;
        if (w === 3) uit.open++;
        else if (w === 2 || (w === 1 && i < vandaag)) { uit.dicht++; uit.lijst.push({ i: i, id: l[i - van] || null }); }
      }
      var m = MIJTER[J.jaar];
      if (m && uit.gezet === uit.dagen) uit.mijter = s.st.indexOf(m) >= 0 ? 'open' : 'dicht';
      return uit;
    };
    // één pakje uitpakken (i: de dag, zoals in K.pakjes): het cijfer wordt 3, en wat erin zit komt in de verzameling. Geeft { i, id } of null.
    K.pakUit = function (i) {
      if (!o.zeker() || typeof i !== 'number' || i !== Math.floor(i)) return null;
      var F = K.nu(); if (!F.uitpakken) return null;
      var J = F.J, s = K.lees(), sz = seizoen('sint', J), van = plek(J.schoenVan, J), tot = plek(J.schoenTot, J);
      if (!(i >= van && i <= tot && i < plek(F.dag, J))) return null;
      var w = cijfer(s, sz, i); if (w !== 1 && w !== 2) return null;
      zetCijfer(s, sz, i, 3);
      var id = (PAKJES[J.jaar] || [])[i - van] || null; if (id && s.st.indexOf(id) < 0) s.st.push(id);
      return o.opslag.schrijf(s) ? { i: i, id: id } : null;
    };
    // de Gouden Mijter: als laatste, na alle andere pakjes. Geeft het id of null.
    K.pakMijter = function () {
      var p = K.pakjes(); if (!p.kan || p.mijter !== 'dicht' || p.dicht) return null;
      var m = MIJTER[K.nu().J.jaar]; return K.krijg(m) ? m : null;
    };
    // ---------- Kerst: de kerstkalender
    // de deurtjes: per dag { i, nr (de datum in december), id, open, kan (vandaag, nog dicht, met de echte tijd), gemist, later },
    // hoeveel er open zijn, of ze allemaal open zijn, en het bijzondere cadeau ('dicht' als het klaarligt, 'open' als je het hebt, anders null)
    K.kerst = function () {
      var F = K.nu(), J = F.J, s = K.lees(), sz = seizoen('kerst', J), van = plek(J.kalenderVan, J), tot = plek(J.kalenderTot, J), vandaag = plek(F.dag, J), l = DEURTJES[J.jaar] || [];
      var nr0 = +datum(J.kalenderVan).slice(8), uit = { sz: sz, van: van, tot: tot, vandaag: vandaag, deurtjes: [], open: 0, aantal: tot - van + 1, alle: false, bijzonder: null, onderBoom: null, zeker: !!o.zeker() };
      for (var i = van; i <= tot; i++) {
        var open = cijfer(s, sz, i) >= 1, d = { i: i, nr: nr0 + (i - van), id: l[i - van] || null, open: open, kan: false, gemist: false, later: false };
        if (open) uit.open++;
        else if (i < vandaag) d.gemist = true;
        else if (i > vandaag) d.later = true;
        else d.kan = F.fase === 'kalender' && uit.zeker;
        uit.deurtjes.push(d);
      }
      uit.alle = uit.open === uit.aantal;
      var b = BIJZONDER[J.jaar];
      if (b && uit.alle) uit.bijzonder = b.every(function (x) { return s.st.indexOf(x) >= 0; }) ? 'open' : 'dicht';
      uit.kanBijzonder = uit.bijzonder === 'dicht' && uit.zeker && F.dag >= datum(J.kalenderTot) && F.dag <= datum(J.versieringTot);
      var ob = ONDERBOOM[J.jaar];
      if (ob) uit.onderBoom = s.st.indexOf(ob) >= 0 ? 'open' : (F.dag >= datum(J.kerstdagenVan) && F.dag <= datum(J.kerstdagenTot) ? 'dicht' : null);
      uit.kanOnderBoom = uit.onderBoom === 'dicht' && uit.zeker;
      return uit;
    };
    // het deurtje van vandaag openen: het cijfer wordt 1, en wat erachter zit komt in de verzameling. Geeft { i, nr, id } of null.
    K.openDeur = function (i) {
      if (!o.zeker() || typeof i !== 'number' || i !== Math.floor(i)) return null;
      var F = K.nu(); if (F.fase !== 'kalender') return null;
      var J = F.J, van = plek(J.kalenderVan, J), tot = plek(J.kalenderTot, J);
      if (i !== plek(F.dag, J) || i < van || i > tot) return null;
      var s = K.lees(), sz = seizoen('kerst', J); if (!zetCijfer(s, sz, i, 1)) return null;
      var id = (DEURTJES[J.jaar] || [])[i - van] || null; if (id && s.st.indexOf(id) < 0) s.st.push(id);
      return o.opslag.schrijf(s) ? { i: i, nr: +datum(J.kalenderVan).slice(8) + (i - van), id: id } : null;
    };
    // het bijzondere kerstcadeau (alle deurtjes open): geeft de lijst ids of null
    K.pakBijzonder = function () {
      var k = K.kerst(); if (!k.kanBijzonder) return null;
      var s = K.lees(), b = BIJZONDER[K.nu().J.jaar] || [], n = 0;
      b.forEach(function (x) { if (s.st.indexOf(x) < 0) { s.st.push(x); n++; } });
      return n && o.opslag.schrijf(s) ? b.slice() : null;
    };
    // het cadeau onder de boom (op de kerstdagen): geeft het id of null
    K.pakOnderBoom = function () {
      var k = K.kerst(); if (!k.kanOnderBoom) return null;
      var ob = ONDERBOOM[K.nu().J.jaar]; return K.krijg(ob) ? ob : null;
    };
    // ---------- Oud en nieuw
    // de zak oliebollen (op oudjaar, tot middernacht) en de nieuwjaarsmunt: 'dicht' als je hem nu kunt pakken, 'open' als je hem hebt,
    // anders null; kanOudjaar en kanMunt alleen met de echte tijd
    K.oud = function () {
      var F = K.nu(), J = F.J, s = K.lees(), heb = function (l) { return !!l && l.length > 0 && l.every(function (x) { return s.st.indexOf(x) >= 0; }); };
      var oj = OUDJAAR[J.jaar], mu = MUNT[J.jaar], vandaag = F.dag === datum(J.oudjaar) && F.t < moment(J.middernacht);
      var uit = { jaar: +J.jaar + 1, zeker: !!o.zeker() };
      uit.oudjaar = heb(oj) ? 'open' : oj && vandaag ? 'dicht' : null;
      uit.munt = heb(mu) ? 'open' : mu && F.munt ? 'dicht' : null;
      uit.kanOudjaar = uit.oudjaar === 'dicht' && uit.zeker;
      uit.kanMunt = uit.munt === 'dicht' && uit.zeker;
      return uit;
    };
    var pakLijst = function (l) { var s = K.lees(), n = 0; (l || []).forEach(function (x) { if (s.st.indexOf(x) < 0) { s.st.push(x); n++; } }); return n && o.opslag.schrijf(s) ? l.slice() : null; };
    // de zak oliebollen: geeft de lijst ids of null
    K.pakOudjaar = function () { return K.oud().kanOudjaar ? pakLijst(OUDJAAR[K.nu().J.jaar]) : null; };
    // de nieuwjaarsmunt: geeft de lijst ids of null
    K.pakMunt = function () { return K.oud().kanMunt ? pakLijst(MUNT[K.nu().J.jaar]) : null; };
    return K;
  }
  var KERN = { KALENDER: KALENDER, VELDEN: VELDEN, MET_TIJD: MET_TIJD, PAKJES: PAKJES, MIJTER: MIJTER, DEURTJES: DEURTJES, BIJZONDER: BIJZONDER, ONDERBOOM: ONDERBOOM, OUDJAAR: OUDJAAR, MUNT: MUNT, nlDag: nlDag, nlDelen: nlDelen, dagNr: dagNr, moment: moment, jaarVan: jaarVan, jaren: jaren, fase: fase, seizoen: seizoen, plek: plek, schoon: schoon, cijfer: cijfer, zetCijfer: zetCijfer, Kern: Kern, geldigJaar: geldigJaar };
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
    lees: function () { if (VB && VB.verzameling) return VB.verzameling === 'trouw' || VB.verzameling === 'uitgepakt' ? trouw(VB.verzameling === 'uitgepakt') : VB.verzameling; return leesJ(SLEUTEL); },
    schrijf: function (s) { if (VB) return false; s.v = 1; var ok = schrijfJ(SLEUTEL, s); if (ok) melden(); return ok; }
  };
  // in het voorbeeld van de werkplaats ('trouw'): alsof je tot vandaag elke dag kwam (je schoen gezet, alle deurtjes open), zodat Ruben
  // ziet wat een trouwe bezoeker ziet. Wordt nooit bewaard. Met 'uitgepakt' (het uitzwaaien) zijn de pakjes van de Sint al open.
  function trouw(uitgepakt) {
    var F = KERN.fase(kal, klok()), J = F.J, vd = KERN.plek(F.dag, J), s = { v: 1, d: {}, st: [] }, sd = '', kd = '';
    var sv = KERN.plek(J.schoenVan, J), stt = KERN.plek(J.schoenTot, J), kv = KERN.plek(J.kalenderVan, J), kt = KERN.plek(J.kalenderTot, J), dl = DEURTJES[J.jaar] || [];
    var pl = PAKJES[J.jaar] || [];
    if (F.dag > datum(J.pakjesavond)) uitgepakt = true;   // wie elke dag kwam, pakte alles uit op pakjesavond
    for (var i = 0; i < vd; i++) {
      sd += i >= sv && i <= stt ? (uitgepakt ? '3' : '2') : '0'; kd += i >= kv && i <= kt ? '1' : '0';
      if (i >= kv && i <= kt && dl[i - kv]) s.st.push(dl[i - kv]);
      if (uitgepakt && i >= sv && i <= stt && pl[i - sv]) s.st.push(pl[i - sv]);
    }
    if (uitgepakt && vd > stt && MIJTER[J.jaar]) s.st.push(MIJTER[J.jaar]);
    // wie elke dag kwam, haalde het bijzondere kerstcadeau op de dag van het laatste deurtje, en het cadeau onder de boom op de eerste kerstdag
    if (F.dag > datum(J.kalenderTot)) (BIJZONDER[J.jaar] || []).forEach(function (id) { s.st.push(id); });
    if (F.dag > datum(J.kerstdagenVan) && ONDERBOOM[J.jaar]) s.st.push(ONDERBOOM[J.jaar]);
    if (F.dag > datum(J.oudjaar) && OUDJAAR[J.jaar]) OUDJAAR[J.jaar].forEach(function (id) { s.st.push(id); });
    if (F.t >= moment(J.muntTot) && MUNT[J.jaar]) MUNT[J.jaar].forEach(function (id) { s.st.push(id); });
    if (F.dag > datum(J.intocht)) s.st.unshift('intocht26');
    if (sd.replace(/0/g, '')) s.d[KERN.seizoen('sint', J)] = sd.replace(/0+$/, '');
    if (kd.replace(/0/g, '')) s.d[KERN.seizoen('kerst', J)] = kd.replace(/0+$/, '');
    return s;
  }
  var K = Kern({ kal: function () { return kal; }, klok: klok, zeker: zeker, opslag: opslag });
  // ---------- per apparaat: versiering aan of uit, en geluid (pas na een aanraking)
  // (lukt bewaren niet, zoals in het voorbeeld van de werkplaats, dan onthoudt dit tabblad het zolang het openstaat: anders begint de
  // intocht of het afscheid daar steeds opnieuw)
  var appMem = {};
  var app = function () { var a = leesJ(APP); a = a && typeof a === 'object' ? a : {}; for (var k in appMem) a[k] = appMem[k]; return a; };
  function zetApp(k, v) { var a = app(); a[k] = v; if (schrijfJ(APP, a)) delete appMem[k]; else appMem[k] = v; melden(); versier(); }

  // ---------- de stand voor de spellen, en wie er wil weten wanneer hij verandert
  function stand() {
    var F = K.nu(), uit = { feest: F.feest, fase: F.fase, jaar: F.jaar, dag: F.dag, winter: F.winter, schoen: F.schoen, uitpakken: F.uitpakken, munt: F.munt, oudNacht: F.oudNacht, nachtjes: F.nachtjes, zeker: zeker(), voorbeeld: !!VB };
    uit.versiering = !app().uit;
    uit.heb = function (id) { return K.heb(id); };
    return uit;
  }
  var luisteraars = [], isKlaar = false, vorige = '';
  function melden() {
    var s = stand(), sig = [s.feest, s.fase, s.dag, s.versiering, s.zeker, s.oudNacht, s.munt, JSON.stringify(K.lees())].join('|');
    if (sig === vorige) return; vorige = sig;
    luisteraars.slice().forEach(function (f) { try { f(s); } catch (e) { if (window.reportError) reportError(e); } });
    try { window.dispatchEvent(new CustomEvent('rommelhoekje-feest', { detail: s })); } catch (e) {}
  }
  function klaar(f) { if (typeof f !== 'function') return; luisteraars.push(f); if (isKlaar) { try { f(stand()); } catch (e) { if (window.reportError) reportError(e); } } }

  // ---------- versiering: de vlaggetjes van de Sint, en in de winter lichtjes en een beetje sneeuw
  // Alleen op de homepage en de pagina's met het papier van 0.6, achter de inhoud (dus nooit over iets heen), en nooit in een spel.
  // Achter de inhoud kan alleen als de achtergrond van de pagina een laag lager ligt: zolang er versiering is, staat de achtergrond van
  // body op html (zelfde kleur, zelfde stippen), en ligt de versiering daartussen (z-index -1).
  var opHome = function () { return document.body && document.body.getAttribute('data-pagina') === 'home'; };
  var papier = function () { return !!(window.__v6sub && !opHome()); };
  var BGV = ['backgroundColor', 'backgroundImage', 'backgroundSize', 'backgroundPosition', 'backgroundRepeat', 'backgroundAttachment'];
  var bgOp = false, bgWacht = null;
  function bgNaarHtml(aan) {
    var h = document.documentElement, b = document.body; if (!b) return;
    if (bgOp) { BGV.forEach(function (k) { h.style[k] = ''; }); b.style.removeProperty('background'); bgOp = false; }
    if (!aan) { if (bgWacht) { bgWacht.disconnect(); bgWacht = null; } return; }
    // licht of donker gewisseld (de homepage, of het apparaat), of de homepage is net klaar: de achtergrond opnieuw overnemen
    if (!bgWacht && window.MutationObserver) { bgWacht = new MutationObserver(function () { if (bgWacht) bgNaarHtml(true); }); bgWacht.observe(h, { attributes: true, attributeFilter: ['data-thema', 'class'] }); bgWacht.observe(b, { attributes: true, attributeFilter: ['class'] }); }
    var cs = getComputedStyle(b), w = {}; BGV.forEach(function (k) { w[k] = cs[k]; });
    if (/rgba\(0, 0, 0, 0\)|transparent/.test(w.backgroundColor) && w.backgroundImage === 'none') return;   // niets te verplaatsen (nog niet)
    BGV.forEach(function (k) { h.style[k] = w[k]; }); b.style.setProperty('background', 'transparent', 'important'); bgOp = true;
  }
  function donker() { var a = document.documentElement.getAttribute('data-thema'); return a ? a === 'donker' : !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches); }
  var STIJL = '.fs-slinger,.fs-lichtjes{position:absolute;left:0;right:0;top:0;z-index:-1;overflow:hidden;pointer-events:none}.fs-slinger{height:34px}.fs-slinger svg,.fs-lichtjes svg{display:block;width:100%}'
    + '.fs-lichtjes{height:44px}.fs-lamp{pointer-events:auto;cursor:pointer}'
    + '@media (prefers-reduced-motion:no-preference){.fs-lichtjes .fs-a{animation:fs-brand 2.6s ease-in-out infinite}.fs-lichtjes .fs-b{animation:fs-brand 2.6s ease-in-out -1.3s infinite}}'
    + '@keyframes fs-brand{0%,100%{opacity:1}50%{opacity:.42}}'
    + '.fs-sneeuw{position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none}'
    + '.fs-melding{position:fixed;left:50%;bottom:1rem;transform:translateX(-50%);z-index:60;max-width:min(26rem,calc(100% - 2rem));padding:.7rem 1rem;border-radius:12px;background:#23252B;color:#FBF6E9;font:600 .92rem/1.35 "Bricolage Grotesque",system-ui,sans-serif;box-shadow:0 4px 0 rgba(0,0,0,.25)}';
  STIJL += '.fs-vuur{position:fixed;inset:0;width:100%;height:100%;z-index:-1;pointer-events:none}'
    + '.fs-klok{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom));z-index:60;pointer-events:none;padding:.38rem .8rem .36rem;border-radius:999px;background:#23252B;color:#FBF6E9;font:700 .86rem/1.2 "Bricolage Grotesque",system-ui,sans-serif;letter-spacing:.01em;box-shadow:0 3px 0 rgba(0,0,0,.25);opacity:.94}'
    + '.fs-klok b{font-variant-numeric:tabular-nums;color:#F2C744}'
    + '.fs-nj{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom));z-index:60;pointer-events:none;width:min(250px,calc(100vw - 24px));border-radius:14px;overflow:hidden;background:#141A3A;color:#FBF6E9;border:2.5px solid #231A26;box-shadow:0 4px 0 rgba(0,0,0,.28);font:600 .9rem/1.3 "Bricolage Grotesque",system-ui,sans-serif;transition:opacity .6s ease}'
    + '.fs-nj canvas,.fs-nj svg{display:block;width:100%;height:96px}.fs-nj p{margin:0;padding:.5rem .75rem .6rem}.fs-nj b{display:block;font-size:1.05rem;color:#F2C744}.fs-nj.fs-weg{opacity:0}';
  function stijl() { if (document.getElementById('fs-stijl')) return; var st = document.createElement('style'); st.id = 'fs-stijl'; st.textContent = STIJL; document.head.appendChild(st); }
  function melding(tekst) {
    var m = document.createElement('div'); m.className = 'fs-melding'; m.setAttribute('role', 'status'); m.textContent = tekst; document.body.appendChild(m);
    setTimeout(function () { m.remove(); }, 4500);
  }
  // de vlaggetjes van de Sint
  var slingerEl = null;
  function slinger(aan) {
    if (!aan) { if (slingerEl) { slingerEl.remove(); slingerEl = null; } return; }
    if (slingerEl) return; stijl();
    slingerEl = document.createElement('div'); slingerEl.className = 'fs-slinger'; slingerEl.setAttribute('aria-hidden', 'true');
    var svg = '<svg viewBox="0 0 1000 34" preserveAspectRatio="none" height="34"><path d="M0 3Q500 24 1000 3" stroke="#7A4E2D" stroke-width="1.6" fill="none" opacity=".7"/>', kl = ['#C8323C', '#E9B949', '#FBF6E9', '#2F4C8F'];
    for (var i = 0; i < 34; i++) { var x = i * 30 + 8, y = 3 + Math.sin(Math.PI * x / 1000) * 19; svg += '<path d="M' + x + ' ' + y.toFixed(1) + 'l13 0l-6.5 13z" fill="' + kl[i % 4] + '" stroke="#231A26" stroke-width=".8" stroke-opacity=".5"/>'; }
    slingerEl.innerHTML = svg + '</svg>'; document.body.appendChild(slingerEl);
  }
  // de lichtjes: een snoer in boogjes, met lampjes die om de beurt zacht branden. Tik erop om de versiering uit te zetten.
  var lichtEl = null, lichtB = 0;
  function lichtjes(aan) {
    if (!aan) { if (lichtEl) { lichtEl.remove(); lichtEl = null; } return; }
    var W = Math.max(320, Math.round(document.documentElement.clientWidth || innerWidth));
    if (lichtEl && Math.abs(W - lichtB) < 40) return;
    stijl(); if (lichtEl) lichtEl.remove(); lichtB = W;
    lichtEl = document.createElement('div'); lichtEl.className = 'fs-lichtjes';
    var KL = ['#E5484D', '#F2C744', '#3FB37F', '#4C86F0', '#FFF1C9'], boog = W < 700 ? 130 : 180, n = Math.max(2, Math.round(W / boog)), bw = W / n;
    var pad = 'M0 4', lampen = '';
    for (var i = 0; i < n; i++) pad += 'Q' + (i * bw + bw / 2).toFixed(1) + ' 30 ' + ((i + 1) * bw).toFixed(1) + ' 4';
    var stap = W < 700 ? 26 : 30, k = 0;
    for (var x = stap / 2; x < W; x += stap, k++) {
      var j = Math.floor(x / bw), u = (x - j * bw) / bw, y = 4 + 2 * u * (1 - u) * 26;   // de hoogte op het boogje (kwadratische bezier)
      var kl = KL[k % KL.length], gr = k % 2 ? 'fs-b' : 'fs-a';
      lampen += '<g class="fs-lamp ' + gr + '" transform="translate(' + x.toFixed(1) + ' ' + (y + 1).toFixed(1) + ')"><circle r="9" cy="8" fill="' + kl + '" opacity=".22"/><rect x="-2.4" y="-1.5" width="4.8" height="4" rx="1" fill="#3A3A40"/><path d="M0 2.5C-4 4.5-4.2 10 0 13C4.2 10 4 4.5 0 2.5Z" fill="' + kl + '" stroke="rgba(0,0,0,.35)" stroke-width=".8"/><path d="M-1.4 5.6q-.8 2 .1 4" stroke="#fff" stroke-opacity=".7" stroke-width="1.1" fill="none" stroke-linecap="round"/></g>';
    }
    lichtEl.innerHTML = '<svg width="' + W + '" height="44" viewBox="0 0 ' + W + ' 44" aria-hidden="true"><path d="' + pad + '" stroke="' + (donker() ? '#8A8A92' : '#4A4A52') + '" stroke-width="1.4" fill="none"/>' + lampen + '</svg>';
    lichtEl.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('.fs-lamp')) return;
      zetApp('uit', true);
      melding(opHome() ? 'De versiering is uit. Aanzetten kan bij het feestbord.' : 'De lichtjes en de sneeuw zijn uit, op de hele site. Aanzetten kan op de homepage, bij het feestbord.');
    });
    document.body.appendChild(lichtEl);
  }
  // de sneeuw: hooguit 40 vlokjes op een klein doekje achter de inhoud. Stil als het tabblad niet in beeld is, en na een minuut niets
  // doen (dan blijven de vlokjes hangen tot je weer iets doet). Bij minder beweging geen sneeuw.
  var SN = null;
  function sneeuw(aan) {
    if (!aan || minder || !window.requestAnimationFrame) {
      if (SN) { cancelAnimationFrame(SN.raf); SN.c.remove(); SN.weg(); SN = null; } return;
    }
    if (SN) return;
    var c = document.createElement('canvas'); c.className = 'fs-sneeuw'; c.setAttribute('aria-hidden', 'true'); stijl();
    document.body.insertBefore(c, document.body.firstChild);
    var g = c.getContext('2d'), vl = [], W = 0, H = 0, vorig = 0, actief = Date.now(), raf = 0;
    function maat() {
      W = c.width = Math.max(1, Math.round(innerWidth)); H = c.height = Math.max(1, Math.round(innerHeight));
      var n = Math.max(8, Math.min(40, Math.round(W * H / 26000)));
      while (vl.length < n) vl.push({ x: Math.random() * W, y: Math.random() * H, r: 1.2 + Math.random() * 2.2, v: 14 + Math.random() * 26, f: Math.random() * 6.28, d: .4 + Math.random() * .8 });
      vl.length = n;
    }
    function teken() {
      g.clearRect(0, 0, W, H);
      var dk = donker(), kern = dk ? 'rgba(255,255,255,.78)' : 'rgba(255,255,255,.95)', rand = dk ? 'rgba(220,232,255,.22)' : 'rgba(112,140,190,.38)';
      for (var i = 0; i < vl.length; i++) { var f = vl[i]; g.fillStyle = rand; g.beginPath(); g.arc(f.x, f.y, f.r + 1.1, 0, 6.283); g.fill(); g.fillStyle = kern; g.beginPath(); g.arc(f.x, f.y, f.r, 0, 6.283); g.fill(); }
    }
    function stap(nu) {
      raf = 0;
      if (document.hidden || Date.now() - actief > 60000) return;   // stil: weer verder bij de volgende aanraking of als je terugkomt
      raf = requestAnimationFrame(stap);
      if (nu - vorig < 33) return;   // hooguit 30 keer per seconde
      var dt = Math.min(.1, (nu - vorig) / 1000 || .033); vorig = nu;
      for (var i = 0; i < vl.length; i++) { var f = vl[i]; f.y += f.v * dt; f.f += dt * f.d; f.x += Math.sin(f.f) * 9 * dt; if (f.y > H + 6) { f.y = -6; f.x = Math.random() * W; } if (f.x < -6) f.x = W + 5; else if (f.x > W + 6) f.x = -5; }
      teken();
    }
    function wek() { actief = Date.now(); if (!raf && !document.hidden) { vorig = performance.now(); raf = requestAnimationFrame(stap); } }
    var EV = ['pointerdown', 'pointermove', 'keydown', 'scroll', 'wheel', 'touchstart'];
    EV.forEach(function (e) { window.addEventListener(e, wek, { passive: true }); });
    document.addEventListener('visibilitychange', wek);
    var opnieuw = function () { maat(); teken(); }; window.addEventListener('resize', opnieuw);
    SN = { c: c, get raf() { return raf; }, weg: function () { EV.forEach(function (e) { window.removeEventListener(e, wek); }); document.removeEventListener('visibilitychange', wek); window.removeEventListener('resize', opnieuw); } };
    maat(); teken(); wek();
  }
  // ---------- oud en nieuw: vuurwerk, het klokje bij het aftellen, de nieuwjaarsmelding en een knal
  // De vuurwerkmotor tekent op een doekje (ook gebruikt door het feestbord, RommelFeest.vuurwerk): vuurpijlen met een staartje die
  // openspatten als pioen, chrysant, ring, wilg of knetterend goud. Hooguit 30 beelden per seconde, stil als het tabblad niet in beeld is,
  // en nooit bij minder beweging. o: { tempo: pijlen per seconde per miljoen pixels, max: hooguit zoveel pijlen per seconde, nacht: donkere
  // lucht (dan lichter mengen), knal: f(kracht) bij elke knal }.
  var VKL = [['#FF5A5F', '#FFD3D0'], ['#F2C744', '#FFF4C8'], ['#4C86F0', '#D2E2FF'], ['#3FD18A', '#D5F7E6'], ['#B36BFF', '#EBD9FF'], ['#FF9F43', '#FFE1C2'], ['#FFFFFF', '#FFFFFF']];
  function maakVuurwerk(c, o) {
    o = o || {};
    var g = c.getContext('2d'), pijlen = [], vonk = [], W = 1, H = 1, dpr = 1, raf = 0, vorig = 0, wacht = 0, aan = false, tempo = o.tempo || 1;
    function maat() { var r = c.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1); W = Math.max(1, r.width); H = Math.max(1, r.height); c.width = Math.round(W * dpr); c.height = Math.round(H * dpr); }
    function pijl(x, hoogte) {
      var kl = VKL[Math.floor(Math.random() * VKL.length)], soort = ['pioen', 'pioen', 'chrysant', 'ring', 'wilg', 'knetter'][Math.floor(Math.random() * 6)];
      var doel = H * (hoogte || (0.14 + Math.random() * 0.32)), x0 = x == null ? W * (0.08 + Math.random() * 0.84) : x;
      var duur = 0.9 + Math.random() * 0.5, vy = -(H - doel) / duur;
      pijlen.push({ x: x0, y: H + 4, vx: (Math.random() - 0.5) * W * 0.04, vy: vy, doel: doel, kl: kl, soort: soort, k: Math.min(1.2, Math.max(0.55, H / 520)) });
    }
    function knal(p) {
      var n = p.soort === 'ring' ? 36 : p.soort === 'knetter' ? 46 : 62, r = (p.soort === 'wilg' ? 150 : 190) * p.k * (0.8 + Math.random() * 0.4), tweede = Math.random() < 0.35 ? VKL[Math.floor(Math.random() * VKL.length)] : null;
      for (var i = 0; i < n; i++) {
        var a = (i / n) * 6.283 + Math.random() * 0.2, v = p.soort === 'ring' ? r : r * (0.35 + Math.random() * 0.65);
        vonk.push({ x: p.x, y: p.y, px: p.x, py: p.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: 0, max: (p.soort === 'wilg' ? 2.6 : 1.5) + Math.random() * 0.6, kl: tweede && i % 2 ? tweede : p.kl, soort: p.soort });
      }
      if (vonk.length > 900) vonk.splice(0, vonk.length - 900);
      if (o.knal) try { o.knal(p.k); } catch (e) {}
    }
    function stap(nu) {
      raf = 0; if (document.hidden) return;
      raf = requestAnimationFrame(stap);
      if (nu - vorig < 33) return;
      var dt = Math.min(0.06, (nu - vorig) / 1000 || 0.033); vorig = nu;
      if (aan) { wacht -= dt; if (wacht <= 0) { pijl(); var per = Math.min(o.max || 3, tempo * W * H / 1e6); wacht = (0.5 + Math.random()) / Math.max(0.05, per); } }
      var zw = 120 * Math.min(1.2, Math.max(0.55, H / 520));
      for (var i = pijlen.length - 1; i >= 0; i--) { var p = pijlen[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += zw * 0.25 * dt; if (p.y <= p.doel || p.vy >= 0) { knal(p); pijlen.splice(i, 1); } }
      for (var j = vonk.length - 1; j >= 0; j--) {
        var v = vonk[j]; v.t += dt; if (v.t >= v.max) { vonk.splice(j, 1); continue; }
        var rem = v.soort === 'wilg' ? 0.9 : 0.94; v.px = v.x; v.py = v.y; v.vx *= Math.pow(rem, dt * 30); v.vy = v.vy * Math.pow(rem, dt * 30) + zw * (v.soort === 'wilg' ? 0.7 : 0.45) * dt; v.x += v.vx * dt; v.y += v.vy * dt;
      }
      teken();
      if (!aan && !pijlen.length && !vonk.length) { cancelAnimationFrame(raf); raf = 0; }
    }
    function teken() {
      g.setTransform(dpr, 0, 0, dpr, 0, 0); g.clearRect(0, 0, W, H);
      g.globalCompositeOperation = o.nacht ? 'lighter' : 'source-over'; g.lineCap = 'round';
      for (var i = 0; i < pijlen.length; i++) { var p = pijlen[i]; g.strokeStyle = 'rgba(255,214,140,.8)'; g.lineWidth = 2; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(p.x - p.vx * 0.05, p.y - p.vy * 0.05); g.stroke(); }
      for (var j = 0; j < vonk.length; j++) {
        var v = vonk[j], a = 1 - v.t / v.max; if (v.soort === 'knetter' && Math.random() < 0.35) continue;
        g.globalAlpha = Math.max(0, Math.min(1, a * 1.4)); g.strokeStyle = a > 0.75 ? v.kl[1] : v.kl[0]; g.lineWidth = v.soort === 'chrysant' || v.soort === 'wilg' ? 1.6 : 2.4;
        g.beginPath(); g.moveTo(v.px - (v.x - v.px) * (v.soort === 'chrysant' || v.soort === 'wilg' ? 3 : 1), v.py - (v.y - v.py) * (v.soort === 'chrysant' || v.soort === 'wilg' ? 3 : 1)); g.lineTo(v.x, v.y); g.stroke();
      }
      g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
    }
    function wek() { if (!raf && !document.hidden) { vorig = performance.now(); raf = requestAnimationFrame(stap); } }
    var opMaat = function () { maat(); };
    window.addEventListener('resize', opMaat); document.addEventListener('visibilitychange', wek);
    maat();
    return {
      start: function (t) { if (t) tempo = t; aan = true; wacht = 0.2; wek(); },
      stop: function () { aan = false; },
      tempo: function (t) { tempo = t; },
      pijl: function (x, h) { pijl(x, h); wek(); },
      maat: maat,
      weg: function () { aan = false; if (raf) cancelAnimationFrame(raf); raf = 0; window.removeEventListener('resize', opMaat); document.removeEventListener('visibilitychange', wek); },
      get bezig() { return !!raf; }, get aantal() { return pijlen.length + vonk.length; }
    };
  }
  // een knal (Web Audio): alleen op de homepage en de pagina's met het papier, als het geluid van de rommeltjes aanstaat, en pas als je
  // al iets aanraakte (zo wil de browser het ook)
  var KA = null;
  function geluidAan() { try { var r = JSON.parse(localStorage.getItem('rommeltjes-v1') || 'null'); return !r || r.g !== 0; } catch (e) { return true; } }
  function ontgrendel() { if (KA || !geluidAan()) return; try { KA = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { KA = null; } }
  function luisterOntgrendel(aan) {
    ['pointerdown', 'keydown'].forEach(function (e) { if (aan) window.addEventListener(e, ontgrendel, { passive: true }); else window.removeEventListener(e, ontgrendel); });
  }
  function knal(kracht) {
    if (!KA || !geluidAan() || document.hidden) return;
    try {
      if (KA.state === 'suspended') KA.resume();
      var nu = KA.currentTime + Math.random() * 0.05, duur = 0.9, buf = KA.createBuffer(1, Math.round(KA.sampleRate * duur), KA.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 5);
      var bron = KA.createBufferSource(), f = KA.createBiquadFilter(), v = KA.createGain();
      bron.buffer = buf; f.type = 'lowpass'; f.frequency.value = 900 + Math.random() * 900; v.gain.value = 0.16 * Math.min(1, kracht || 1);
      bron.connect(f); f.connect(v); v.connect(KA.destination); bron.start(nu);
    } catch (e) {}
  }
  // het vuurwerk achter de inhoud (de homepage en de pagina's met het papier), van middernacht tot vuurwerkTot
  var VW = null;
  function achterVuur(aan) {
    if (!aan || minder || !window.requestAnimationFrame) { if (VW) { VW.w.weg(); VW.c.remove(); VW = null; } return; }
    if (VW) return;
    var c = document.createElement('canvas'); c.className = 'fs-vuur'; c.setAttribute('aria-hidden', 'true'); stijl();
    document.body.insertBefore(c, document.body.firstChild);
    VW = { c: c, w: maakVuurwerk(c, { tempo: 1.8, max: 2.4, nacht: donker(), knal: function (k) { if (!opHome() && Math.random() < 0.55) knal(k); } }) };   // op de homepage knalt het feestbord al
    VW.w.start();
  }
  // het klokje bij het aftellen (niet op de homepage: daar telt het feestbord groot af), onderin, klein, zonder iets te blokkeren
  var KLOK = null;
  function klokje(aan) {
    if (!aan) { if (KLOK) { clearInterval(KLOK.i); KLOK.el.remove(); KLOK = null; } return; }
    if (KLOK) return; stijl();
    var el = document.createElement('div'); el.className = 'fs-klok'; el.setAttribute('aria-hidden', 'true'); document.body.appendChild(el);
    var J = K.nu().J, mid = moment(J.middernacht), jaar = +J.jaar + 1;
    function tik() {
      var ms = mid - klok();
      if (ms <= 0) { klokje(false); melden(); versier(); return; }
      var s = Math.ceil(ms / 1000), m = Math.floor(s / 60);
      el.innerHTML = 'Nog <b>' + m + ':' + pad(s % 60) + '</b> tot ' + jaar;
    }
    KLOK = { el: el, i: setInterval(tik, 1000) }; tik();
  }
  // de nieuwjaarsmelding (niet op de homepage: daar staat het op het feestbord), één keer per bezoek, linksonder, en na 14 seconden weg
  var njGemeld = false;
  function nieuwjaarMelding(s) {
    if (njGemeld || window.__eigenNieuwjaar) return; njGemeld = true; stijl();   // een spel met een eigen nieuwjaarsmelding zet __eigenNieuwjaar
    var el = document.createElement('div'), jaar = +s.jaar + 1, beweeg = !minder && s.versiering && window.requestAnimationFrame;
    el.className = 'fs-nj'; el.setAttribute('role', 'status');
    var sterren = '<svg viewBox="0 0 250 96" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><rect width="250" height="96" fill="#141A3A"/>' + [[34, 30, '#F2C744'], [88, 58, '#FF5A5F'], [140, 24, '#4C86F0'], [196, 50, '#3FD18A'], [228, 20, '#FFFFFF']].map(function (p) { var x = p[0], y = p[1], d = 'M' + x + ' ' + (y - 9) + 'L' + (x + 2.6) + ' ' + (y - 2.6) + 'L' + (x + 9) + ' ' + y + 'L' + (x + 2.6) + ' ' + (y + 2.6) + 'L' + x + ' ' + (y + 9) + 'L' + (x - 2.6) + ' ' + (y + 2.6) + 'L' + (x - 9) + ' ' + y + 'L' + (x - 2.6) + ' ' + (y - 2.6) + 'Z'; return '<path d="' + d + '" fill="' + p[2] + '"/>'; }).join('') + '<text x="125" y="84" text-anchor="middle" font-family="Bricolage Grotesque,system-ui,sans-serif" font-weight="800" font-size="22" fill="#F2C744">' + jaar + '</text></svg>';
    el.innerHTML = (beweeg ? '<canvas aria-hidden="true"></canvas>' : sterren) + '<p><b>Gelukkig nieuwjaar!</b>Welkom in ' + jaar + '.</p>';
    document.body.appendChild(el);
    var w = null;
    if (beweeg) { var c = el.querySelector('canvas'); w = maakVuurwerk(c, { tempo: 60, max: 2.2, nacht: true }); w.start(); }
    setTimeout(function () { el.classList.add('fs-weg'); setTimeout(function () { if (w) w.weg(); el.remove(); }, 700); }, 14000);
  }
  function oudNieuw(s) {
    var hier = papier() || opHome();
    klokje(s.fase === 'aftellen' && !opHome() && !window.__eigenNieuwjaar);
    var vuur = s.fase === 'vuurwerk';
    achterVuur(vuur && hier && s.versiering);
    if (vuur && !opHome()) nieuwjaarMelding(s);
    luisterOntgrendel(hier && (s.feest === 'oud' || vuur));
    return vuur && hier && s.versiering && !minder;
  }
  function versier() {
    var s = stand(), hier = papier() || opHome(), sint = s.versiering && papier() && s.feest === 'sint', winter = s.versiering && hier && s.winter;
    var vuur = oudNieuw(s);
    bgNaarHtml(sint || winter || vuur);
    slinger(sint); lichtjes(winter); sneeuw(winter);
  }
  window.addEventListener('resize', function () { if (lichtEl) lichtjes(true); });

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
    app: app, zetApp: zetApp, melden: melden, minder: minder, voorbeeld: !!VB, BASIS: BASIS, SLEUTEL: SLEUTEL, vuurwerk: maakVuurwerk, knal: knal, ontgrendel: ontgrendel,
    get afwijking() { return afwijking; }
  };
  // wie al vroeg vroeg (Scorebord.feest, in het gedeelde blok), komt nu aan de beurt
  var wacht = window.__feestWacht; window.__feestWacht = null;
  if (Array.isArray(wacht)) wacht.forEach(klaar);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', begin); else begin();
})();
