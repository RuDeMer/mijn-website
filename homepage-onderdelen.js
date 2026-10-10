/* homepage-onderdelen.js voor Ruben's rommelhoekje: gereedschap, animaties, iconen, scorebord, sticker, coulissen en de stijl van de kaarten. Upload een nieuwe versie van dit bestand om de homepage bij te werken. */
;(function () {
var s = document.createElement('style'); s.id = 'onderdelen-stijl'; s.textContent = "\n.rek { position: relative; }\n.rek.zijkant { position: absolute; top: 7rem; height: 50rem; width: calc((100% - var(--inhoud)) / 2 - 2rem); display: none; z-index: 0; }\n.rek.zijkant.links { left: 1rem; }\n.rek.zijkant.rechts { right: 1rem; }\n.muurlaag { position: absolute; left: 0; top: 0; width: 100%; pointer-events: none; z-index: 3; }\n.gs { position: absolute; pointer-events: none; user-select: none; -webkit-user-select: none; filter: drop-shadow(3px 5px 0 rgba(0,0,0,.25)); z-index: 1; }\n.gs svg { display: block; pointer-events: none; overflow: visible; }\n.gs svg * { pointer-events: visiblePainted; cursor: grab; }\n.gs.sleept { z-index: 30; filter: drop-shadow(9px 16px 0 rgba(0,0,0,.22)); }\n.gs.sleept svg * { cursor: grabbing; }\n.gs-haak { position: absolute; width: 9px; height: 9px; margin: -4.5px 0 0 -4.5px; border-radius: 50%; background: #A8B3CC; box-shadow: 0 2px 0 rgba(0,0,0,.45); pointer-events: none; z-index: 2; transition: opacity .2s; }\n@media (pointer: coarse) { .gs svg * { cursor: pointer; } }\n.gs-sleept, .gs-sleept * { -webkit-user-select: none !important; user-select: none !important; cursor: grabbing !important; }\n\n.dag b { display: inline-block; }\n.label-icoon svg { transform-origin: 50% 80%; }\n"; document.head.appendChild(s);
})();
;(function () {

const SPELICONEN = {"kaarten": "<g transform=\"rotate(-14 26 36)\"><rect x=\"10\" y=\"12\" width=\"28\" height=\"40\" rx=\"4\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"14\" y=\"16\" width=\"20\" height=\"32\" rx=\"2\" fill=\"none\" stroke=\"#F2DDA0\" stroke-width=\"1.6\"/><path d=\"M24 25l5 7-5 7-5-7z\" fill=\"#F2DDA0\"/></g><g transform=\"rotate(11 40 34)\"><rect x=\"25\" y=\"12\" width=\"28\" height=\"40\" rx=\"4\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M39 41c-6.5-4.2-9.5-7.6-9.5-10.8a4.8 4.8 0 0 1 9.5-1.2 4.8 4.8 0 0 1 9.5 1.2c0 3.2-3 6.6-9.5 10.8z\" fill=\"#C8323C\"/><path d=\"M29 15.5v6M29 15.5l3 6M29 18.5h2.4\" stroke=\"#C8323C\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/></g>", "woord": "<g transform=\"rotate(-8 18 34)\"><rect x=\"5\" y=\"20\" width=\"24\" height=\"24\" rx=\"4\" fill=\"#5F6470\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M12 27h10M17 27v11\" stroke=\"#E6E3DA\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><g transform=\"rotate(6 46 30)\"><rect x=\"35\" y=\"16\" width=\"24\" height=\"24\" rx=\"4\" fill=\"#F2DDA0\" stroke=\"#C8323C\" stroke-width=\"2.4\" stroke-dasharray=\"4 2.4\"/><path d=\"M41 34l6-12 6 12M43.2 29.6h7.6\" stroke=\"#9E2430\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></g><rect x=\"20\" y=\"30\" width=\"26\" height=\"26\" rx=\"4\" fill=\"#2E8B62\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"41\" cy=\"35\" r=\"2\" fill=\"#fff\"/><path d=\"M25 37l3 12 5-8 5 8 3-12\" stroke=\"#fff\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>", "doos": "<path d=\"M8 26l24-10 24 10v24L32 60 8 50z\" fill=\"#C99A5B\" stroke=\"#7A4E2D\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M8 26l24 10 24-10M32 36v24\" stroke=\"#7A4E2D\" stroke-width=\"2\" fill=\"none\"/><path d=\"M8 26l-4-9 24-9 4 8zM56 26l4-9-24-9-4 8z\" fill=\"#DDB27A\" stroke=\"#7A4E2D\" stroke-width=\"2\" stroke-linejoin=\"round\"/><rect x=\"38\" y=\"40\" width=\"12\" height=\"8\" rx=\"1\" fill=\"#FBF6E9\" transform=\"rotate(-22 44 44)\"/>", "puzzel": "<path d=\"M12 18h12a6 6 0 1 1 12 0h12v12a6 6 0 1 1 0 12v12H36a6 6 0 1 0-12 0H12V42a6 6 0 1 0 0-12z\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/>", "dobbelsteen": "<g transform=\"rotate(-10 32 32)\"><rect x=\"12\" y=\"12\" width=\"40\" height=\"40\" rx=\"8\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2.4\"/><g fill=\"#1F2333\"><circle cx=\"22\" cy=\"22\" r=\"3.4\"/><circle cx=\"42\" cy=\"22\" r=\"3.4\"/><circle cx=\"32\" cy=\"32\" r=\"3.4\"/><circle cx=\"22\" cy=\"42\" r=\"3.4\"/><circle cx=\"42\" cy=\"42\" r=\"3.4\"/></g></g>", "controller": "<path d=\"M18 22h28c7 0 12 6 13 15l1 8c1 7-6 10-10 5l-5-6H19l-5 6c-4 5-11 2-10-5l1-8c1-9 6-15 13-15z\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M19 30v10M14 35h10\" stroke=\"#F2DDA0\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><circle cx=\"44\" cy=\"31\" r=\"3\" fill=\"#C8323C\"/><circle cx=\"50\" cy=\"37\" r=\"3\" fill=\"#E9B949\"/>", "potlood": "<g transform=\"rotate(40 32 32)\"><rect x=\"25\" y=\"4\" width=\"14\" height=\"40\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"25\" y=\"4\" width=\"14\" height=\"7\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M25 44l7 14 7-14z\" fill=\"#F1D9B5\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M30 54l2 4 2-4z\" fill=\"#1F2333\"/><path d=\"M32 11v33\" stroke=\"#B8862F\" stroke-width=\"1.5\"/></g>", "ster": "<path d=\"M32 6l7.6 16.4 17.9 2.1-13.3 12.2 3.6 17.7L32 45.6l-15.8 8.8 3.6-17.7L6.5 24.5l17.9-2.1z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M24 30a8 8 0 0 0 16 0\" stroke=\"#1F2333\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>", "hamer": "<g transform=\"rotate(-35 32 32)\"><rect x=\"28\" y=\"20\" width=\"8\" height=\"40\" rx=\"3\" fill=\"#B5793F\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"14\" y=\"8\" width=\"36\" height=\"14\" rx=\"3\" fill=\"#8C939E\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"44\" y=\"6\" width=\"8\" height=\"18\" rx=\"2\" fill=\"#6F7785\" stroke=\"#1F2333\" stroke-width=\"2\"/></g>", "vlaai": "<defs><clipPath id=\"vlaai-icoon-knip\"><circle cx=\"31\" cy=\"32\" r=\"19\"/></clipPath></defs><ellipse cx=\"34\" cy=\"37\" rx=\"28\" ry=\"25\" fill=\"#1F2333\" opacity=\".18\"/><circle cx=\"31\" cy=\"32\" r=\"27\" fill=\"#C98A43\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"31\" cy=\"32\" r=\"23.5\" fill=\"none\" stroke=\"#E0AE66\" stroke-width=\"3.2\" stroke-dasharray=\"4 2.6\"/><circle cx=\"31\" cy=\"32\" r=\"19\" fill=\"#A8162B\"/><g clip-path=\"url(#vlaai-icoon-knip)\" stroke=\"#E0AE66\" stroke-width=\"3.6\"><g transform=\"rotate(45 31 32)\"><path d=\"M8 24h46M8 32h46M8 40h46\"/></g><g transform=\"rotate(-45 31 32)\"><path d=\"M8 24h46M8 32h46M8 40h46\"/></g></g>", "hotel": "<rect x=\"10\" y=\"14\" width=\"44\" height=\"44\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"6\" y=\"10\" width=\"52\" height=\"6\" fill=\"#23252B\"/><g fill=\"#9FD3E8\" stroke=\"#1F2333\" stroke-width=\"1.5\"><rect x=\"15\" y=\"21\" width=\"8\" height=\"8\"/><rect x=\"28\" y=\"21\" width=\"8\" height=\"8\"/><rect x=\"41\" y=\"21\" width=\"8\" height=\"8\"/><rect x=\"15\" y=\"34\" width=\"8\" height=\"8\"/><rect x=\"41\" y=\"34\" width=\"8\" height=\"8\"/></g><rect x=\"27\" y=\"40\" width=\"10\" height=\"18\" fill=\"#7A4E2D\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><path d=\"M24 38h16l2 4H22z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><rect x=\"18\" y=\"4\" width=\"28\" height=\"7\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><g fill=\"#1F2333\"><rect x=\"21\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"25\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"29\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"33\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"37\" y=\"6\" width=\"2\" height=\"3\"/><rect x=\"41\" y=\"6\" width=\"2\" height=\"3\"/></g>", "beker": "<path d=\"M20 10h24v14a12 12 0 0 1-24 0z\" fill=\"#E9B949\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><path d=\"M20 14h-6a6 6 0 0 0 6 10M44 14h6a6 6 0 0 1-6 10\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"2.5\"/><path d=\"M29 36h6v8h-6z\" fill=\"#C99A2E\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"22\" y=\"44\" width=\"20\" height=\"7\" rx=\"1.5\" fill=\"#7A4E2D\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M27 15v9\" stroke=\"#FFF3C4\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><path d=\"M32 52v0\" /><rect x=\"27\" y=\"46\" width=\"10\" height=\"3\" fill=\"#E9B949\"/>", "pakje": "<path d=\"M14 8l4-4 4 4 4-4 4 4 4-4 4 4 4-4 4 4v52l-4 4-4-4-4 4-4-4-4 4-4-4-4 4-4-4-4 4z\" fill=\"#2F8BD6\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\"/><rect x=\"16\" y=\"14\" width=\"34\" height=\"8\" rx=\"1.5\" fill=\"#23252B\"/><rect x=\"17\" y=\"25\" width=\"32\" height=\"26\" rx=\"3\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"1.5\"/><path d=\"M33 30l2.5 5.5 6 .6-4.5 4 1.3 5.9L33 43l-5.3 3 1.3-5.9-4.5-4 6-.6z\" fill=\"#E9B949\" stroke=\"#8C6A0A\" stroke-width=\"1.2\"/><path d=\"M14 8h40\" stroke=\"#6EE8F0\" stroke-width=\"2\" stroke-dasharray=\"3 3\"/><rect x=\"22\" y=\"54\" width=\"22\" height=\"5\" rx=\"2.5\" fill=\"#1E4F8C\"/>", "ritme": "<rect x=\"8\" y=\"22\" width=\"26\" height=\"26\" rx=\"3\" fill=\"#8AFF6A\" stroke=\"#1F2333\" stroke-width=\"3\"/><rect x=\"14\" y=\"30\" width=\"4\" height=\"5\" fill=\"#1F2333\"/><rect x=\"24\" y=\"30\" width=\"4\" height=\"5\" fill=\"#1F2333\"/><rect x=\"15\" y=\"39\" width=\"12\" height=\"2.6\" fill=\"#1F2333\"/><path d=\"M44 10v24\" stroke=\"#1F2333\" stroke-width=\"3.4\" stroke-linecap=\"round\"/><path d=\"M44 10l12 4v7l-12-4\" fill=\"#FF5AA8\" stroke=\"#1F2333\" stroke-width=\"2.6\" stroke-linejoin=\"round\"/><ellipse cx=\"40\" cy=\"35\" rx=\"5.5\" ry=\"4.2\" fill=\"#FF5AA8\" stroke=\"#1F2333\" stroke-width=\"2.6\"/><path d=\"M4 56h56\" stroke=\"#5EE6FF\" stroke-width=\"3\" stroke-linecap=\"round\"/><path d=\"M44 56l6-8 6 8z\" fill=\"#1F2333\"/>", "vlieger": "<path d=\"M6 34L58 8 34 56l-6-16z\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M58 8L28 40l-22-6z\" fill=\"#DCE4F5\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M58 8L28 40l6 16\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M4 50q8-4 14 0M10 58q6-3 12 0\" fill=\"none\" stroke=\"#5EC2E8\" stroke-width=\"3\" stroke-linecap=\"round\"/>", "blok": "<path d=\"M32 6L56 18 32 30 8 18z\" fill=\"#5FA83E\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 18l24 12v28L8 46z\" fill=\"#8A5A36\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M56 18L32 30v28l24-12z\" fill=\"#6E4426\" stroke=\"#1F2333\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M8 18l24 12 24-12\" fill=\"none\" stroke=\"#7CC452\" stroke-width=\"2\"/><path d=\"M14 24v6M22 28v8M42 30v6M50 26v8\" stroke=\"#5FA83E\" stroke-width=\"3\" stroke-linecap=\"round\"/>", "pretpark": "<circle cx=\"32\" cy=\"26\" r=\"20\" fill=\"none\" stroke=\"#C8323C\" stroke-width=\"4\"/><circle cx=\"32\" cy=\"26\" r=\"20\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"1.5\" opacity=\".6\"/><path d=\"M32 6v40M12 26h40M18 12l28 28M46 12L18 40\" stroke=\"#E9B949\" stroke-width=\"2.5\"/><circle cx=\"32\" cy=\"26\" r=\"4\" fill=\"#1F2333\"/><path d=\"M20 58l12-32 12 32\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"4\" stroke-linejoin=\"round\"/><rect x=\"6\" y=\"56\" width=\"52\" height=\"5\" rx=\"2\" fill=\"#2E8B62\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"27\" y=\"2\" width=\"10\" height=\"7\" rx=\"2\" fill=\"#2F8BD6\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"47\" y=\"22\" width=\"10\" height=\"7\" rx=\"2\" fill=\"#F6CB2F\" stroke=\"#1F2333\" stroke-width=\"2\"/><rect x=\"7\" y=\"22\" width=\"10\" height=\"7\" rx=\"2\" fill=\"#E8577A\" stroke=\"#1F2333\" stroke-width=\"2\"/>", "idee": "<rect x=\"10\" y=\"22\" width=\"44\" height=\"34\" rx=\"4\" fill=\"#C8323C\" stroke=\"#1F2333\" stroke-width=\"2.5\"/><rect x=\"18\" y=\"28\" width=\"28\" height=\"6\" rx=\"3\" fill=\"#1F2333\"/><path d=\"M14 56h36v4H14z\" fill=\"#9E2430\" stroke=\"#1F2333\" stroke-width=\"2\"/><circle cx=\"44\" cy=\"16\" r=\"11\" fill=\"#FFE76A\" stroke=\"#1F2333\" stroke-width=\"2.5\"/><path d=\"M40 26h8v5h-8z\" fill=\"#9AA6C2\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M41 15q3-4 6 0\" stroke=\"#E9B949\" stroke-width=\"2\" fill=\"none\"/><path d=\"M44 1v-3M55 6l3-2M33 6l-3-2M58 16h3M30 16h-3\" stroke=\"#E9B949\" stroke-width=\"2.5\" stroke-linecap=\"round\" transform=\"translate(0 2)\"/><rect x=\"20\" y=\"40\" width=\"24\" height=\"10\" rx=\"2\" fill=\"#FBF6E9\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M20 40l12 6 12-6\" fill=\"none\" stroke=\"#1F2333\" stroke-width=\"2\"/>", "label": "<path d=\"M14 10h24l16 16-24 28-20-18z\" fill=\"#F2DDA0\" stroke=\"#1F2333\" stroke-width=\"2\" stroke-linejoin=\"round\" transform=\"rotate(8 32 32)\"/><circle cx=\"24\" cy=\"21\" r=\"4\" fill=\"#2F4C8F\" stroke=\"#1F2333\" stroke-width=\"2\"/><path d=\"M24 17c-6-8-14-6-16-1\" stroke=\"#1F2333\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/>"};
document.querySelectorAll('.label:not(.leeg) .label-kaart').forEach(a => {
  let s = a.querySelector('.label-icoon');
  if (!s) { s = document.createElement('span'); s.className = 'label-icoon'; s.setAttribute('aria-hidden', 'true'); a.prepend(s); }
  const n = SPELICONEN[a.dataset.icoon] ? a.dataset.icoon : 'doos';
  s.innerHTML = '<svg viewBox="0 0 64 64" focusable="false">' + SPELICONEN[n] + '</svg>';
});

})();
;(function () {
(function () {
  // rommelhoekje-speler: gedeeld door alle pagina's van de site (zelfde adres = zelfde opslag)
  const SKEY = 'rommelhoekje-speler';
  let speler = null;
  try { speler = JSON.parse(localStorage.getItem(SKEY) || 'null'); } catch (e) { speler = null; }
  const bewaar = () => { try { if (speler) localStorage.setItem(SKEY, JSON.stringify(speler)); else localStorage.removeItem(SKEY); } catch (e) {} };

  // instellingen.json staat in de map van de site en wordt door de werkplaats beheerd
  const klaar = fetch('instellingen.json?' + Math.floor(Date.now() / 600000), { cache: 'no-cache' })
    .then(r => (r.ok ? r.json() : {})).catch(() => ({}))
    .then(inst => {
      inst = inst || {};
      // bezoekersteller van Cloudflare: geen cookies, geen persoonsgegevens
      if (inst.analyticsToken && /^[a-f0-9]{16,64}$/i.test(inst.analyticsToken) && !document.querySelector('script[src*="cloudflareinsights"]')) {
        const s = document.createElement('script');
        s.defer = true; s.src = 'https://static.cloudflareinsights.com/beacon.min.js?token=' + encodeURIComponent(inst.analyticsToken);
        document.head.appendChild(s);
      }
      return inst;
    });
  const adres = inst => (inst.scoreUrl || '').replace(/\/+$/, '');
  function nieuwGeheim() {
    if (window.crypto && crypto.getRandomValues) { const a = new Uint8Array(18); crypto.getRandomValues(a); return [...a].map(b => b.toString(16).padStart(2, '0')).join(''); }
    return Math.random().toString(36).slice(2) + Date.now().toString(36) + Math.random().toString(36).slice(2);
  }
  async function mijnId() {
    if (!speler || !window.crypto || !crypto.subtle) return null;
    const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('rommelhoekje:' + speler.geheim));
    return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
  }
  const laatst = {};
  // ---------- alle spellen bijwerken, vanaf elke pagina van de site
  // Elk spel bewaart zijn beste score in deze browser. Doe je mee, dan sturen we die vanzelf door,
  // ook als je niet op de scorebordpagina komt. Alleen wat nieuw of beter is, gaat de deur uit.
  const lees = k => { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } };
  const BRONNEN = {
    vlaai: () => { const s = lees('vlaaienbakker-v1'); return s && s.totaal >= 1 ? [Math.floor(s.totaal), Math.floor(s.vpsNu || 0)] : null; },
    woord: () => { const s = lees('rommelwoord-stats-v1'); return s && s.besteReeks > 0 ? [s.besteReeks, s.gewonnen || 0] : null; },
    poker: () => { const s = lees('rommelpoker-record'); return s && s.verst > 0 ? [s.verst, Math.round(s.beste || 0)] : null; },
    ritme: () => { const s = lees('rommelritme-v1'); if (!s || !s.best) return null; const som = Object.values(s.best).reduce((a, b) => a + b, 0); return som > 0 ? [som, Object.values(s.pogingen || {}).reduce((a, b) => a + b, 0)] : null; },
    vlieger: () => { const s = lees('vouwvlieger-v1'); return s && s.best > 0 ? [s.best, s.sterren || 0] : null; },
    beest: () => { const s = lees('rommelbeesten-v1'); if (!s || !s.bezit) return null; let u = 0, t = 0; for (const [id, b] of Object.entries(s.bezit)) { const n = (b[0] || 0) + (b[1] || 0); t += n; if (n > 0 && /^zs/.test(id)) u++; } return u ? [u, t] : null; },
  };
  const VKEY = 'rommelhoekje-verstuurd';
  const onthoud = (spel, score, extra) => { const v = lees(VKEY) || {}; const o = v[spel]; if (!o || o.naam !== speler.naam || score > o.s || (score === o.s && extra > o.e)) { v[spel] = { s: score, e: extra, naam: speler.naam }; try { localStorage.setItem(VKEY, JSON.stringify(v)); } catch (e) {} } };
  let bezig = false;
  async function synchroniseer() {
    if (bezig || !speler || !speler.naam) return; bezig = true;
    try {
      const inst = await klaar; if (!adres(inst)) return;
      const v = lees(VKEY) || {};
      for (const [spel, bron] of Object.entries(BRONNEN)) {
        let w = null; try { w = bron(); } catch (e) {}
        if (!w) continue;
        const o = v[spel];
        if (o && o.naam === speler.naam && o.s >= w[0] && o.e >= w[1]) continue;
        await API.stuur(spel, w[0], w[1]);
      }
    } finally { bezig = false; }
  }

  const API = {
    klaar,
    actief: () => klaar.then(inst => !!adres(inst)),
    doetMee: () => !!(speler && speler.naam),
    naam: () => (speler && speler.naam) || '',
    mijnId,
    // meedoen of je naam veranderen; een lege naam = stoppen
    async zetNaam(naam) {
      naam = String(naam || '').replace(/\s+/g, ' ').trim().slice(0, 16);
      if (!naam) { speler = null; bewaar(); return { ok: true }; }
      const bestond = !!(speler && speler.geheim);
      speler = { geheim: (speler && speler.geheim) || nieuwGeheim(), naam };
      bewaar();
      let uitslag = { ok: true };
      const inst = await klaar;
      if (bestond && adres(inst)) {
        try { const r = await fetch(adres(inst) + '/naam', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ geheim: speler.geheim, naam }) }); const j = await r.json().catch(() => ({})); if (!r.ok) { uitslag = { ok: false, fout: j.fout || 'Naam veranderen lukte niet.' }; document.dispatchEvent(new CustomEvent('scorebord-fout', { detail: uitslag.fout })); } } catch (e) {}
      }
      document.dispatchEvent(new CustomEvent('scorebord-naam'));
      for (const [spel, w] of Object.entries(laatst)) { delete laatst[spel]; await API.stuur(spel, w[0], w[1], true); }
      await synchroniseer();
      return uitslag;
    },
    // een score insturen (de server bewaart alleen je beste)
    async stuur(spel, score, extra, direct) {
      laatst[spel] = [score, extra || 0];
      if (!API.doetMee()) return null;
      const inst = await klaar; if (!adres(inst)) return null;
      try {
        const r = await fetch(adres(inst) + '/score', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, keepalive: true, body: JSON.stringify({ spel, naam: speler.naam, geheim: speler.geheim, score, extra: extra || 0 }) });
        const j = await r.json().catch(() => ({}));
        if (r.ok) onthoud(spel, score, extra || 0);
        if (!r.ok && j.fout) document.dispatchEvent(new CustomEvent('scorebord-fout', { detail: j.fout }));
        return r.ok ? j : null;
      } catch (e) { return null; }
    },
    async lijsten() {
      const inst = await klaar; if (!adres(inst)) return null;
      const r = await fetch(adres(inst) + '/scores', { cache: 'no-store' });
      return r.ok ? r.json() : null;
    },
    async stopEnVerwijder() {
      const inst = await klaar;
      if (speler && adres(inst)) { try { await fetch(adres(inst) + '/verwijder', { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ geheim: speler.geheim }) }); } catch (e) {} }
      speler = null; bewaar();
      document.dispatchEvent(new CustomEvent('scorebord-naam'));
    },
    // een klein blokje om mee te doen, voor in een spel
    async blokje(el, wat) {
      if (!el) return;
      el.dataset.sbWat = wat || 'je score';
      if (!(await API.actief())) { el.hidden = true; return; }
      tekenBlok(el);
    },
  };
  function tekenBlok(el) {
    el.hidden = false; el.innerHTML = '';
    el.classList.add('sb-blok');
    const p = document.createElement('p');
    if (API.doetMee()) {
      p.innerHTML = 'Je doet mee aan het <a href="scorebord.html">scorebord</a> als <b></b>.';
      p.querySelector('b').textContent = speler.naam;
      el.appendChild(p);
      return;
    }
    p.textContent = 'Zet ' + el.dataset.sbWat + ' op het scorebord van het rommelhoekje. Kies een naam:';
    const f = document.createElement('form'); f.className = 'sb-mee';
    f.innerHTML = '<input maxlength="16" placeholder="Je naam" aria-label="Je naam voor het scorebord" autocomplete="nickname"><button type="submit">Doe mee</button>';
    f.addEventListener('submit', async e => { e.preventDefault(); const n = f.querySelector('input').value.trim(); if (n.length < 2) { f.querySelector('input').focus(); return; } await API.zetNaam(n); });
    const k = document.createElement('small'); k.textContent = 'We bewaren alleen je naam en je beste score. Je kunt altijd stoppen op de scorebordpagina.';
    el.appendChild(p); el.appendChild(f); el.appendChild(k);
  }
  document.addEventListener('scorebord-naam', () => document.querySelectorAll('[data-sb-wat]').forEach(el => { if (!el.hidden) tekenBlok(el); }));
  // stijl voor het blokje, met de kleuren van de site
  const st = document.createElement('style');
  st.textContent = '.sb-blok{background:var(--papier,#FBF6E9);color:var(--inkt,#1F2333);border-radius:8px;padding:.6rem .8rem;margin-top:.8rem;font-size:.92rem;line-height:1.4;text-align:left}.sb-blok p{margin:0 0 .4rem}.sb-blok p:last-child{margin:0}.sb-blok a{color:var(--rood-d,#9E2430);font-weight:700}.sb-mee{display:flex;gap:.4rem;flex-wrap:wrap}.sb-mee input{flex:1 1 8rem;min-width:0;font:inherit;padding:.4rem .6rem;border-radius:6px;border:2px solid var(--manila-d,#D9BE78);background:#fff}.sb-mee button{font:inherit;font-weight:700;border:0;border-radius:6px;padding:.4rem .8rem;background:var(--rood,#C8323C);color:#fff;cursor:pointer}.sb-blok small{display:block;color:var(--zacht,#5E5643);margin-top:.35rem;font-size:.78rem}';
  document.head.appendChild(st);
  API.synchroniseer = synchroniseer;
  window.Scorebord = API;
  // bij elk bezoek, en als je even naar een ander tabblad gaat
  klaar.then(() => setTimeout(synchroniseer, 1500));
  document.addEventListener('visibilitychange', () => { if (document.hidden) synchroniseer(); });
})();

})();
;(function () {
(function () {
  // Elk stuk gereedschap hangt aan een haakje op punt (px, py) van zijn eigen tekening.
  const D = '#23252B';
  const TANDEN = 'M44 50' + 'l4 5l4-5'.repeat(15);
  const GEREEDSCHAP = {
    hamer: { w: 70, h: 152, px: 35, py: 6, svg: `<circle cx="35" cy="6" r="5" fill="none" stroke="#3A2A1E" stroke-width="2.5"/><path d="M35 11v4" stroke="#3A2A1E" stroke-width="2.5"/><rect x="29" y="14" width="12" height="108" rx="5" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><rect x="29" y="18" width="12" height="34" rx="4" fill="#2E2E33"/><path d="M31 24h8M31 30h8M31 36h8M31 42h8" stroke="#55555C" stroke-width="1.5"/><rect x="6" y="118" width="58" height="24" rx="3" fill="#8C939E" stroke="#5F6470" stroke-width="1.5"/><rect x="56" y="115" width="10" height="30" rx="2" fill="#6F7785" stroke="#4A4F59" stroke-width="1.5"/><path d="M6 121l-5-5M6 139l-5 5" stroke="#5F6470" stroke-width="4" stroke-linecap="round"/>` },
    schroevendraaier: { w: 34, h: 150, px: 17, py: 7, svg: `<rect x="7" y="0" width="20" height="56" rx="8" fill="#C8323C" stroke="#9E2430" stroke-width="1.5"/><circle cx="17" cy="7" r="3.4" fill="${D}"/><path d="M12 17v32M17 17v32M22 17v32" stroke="#9E2430" stroke-width="2" stroke-linecap="round"/><rect x="11" y="55" width="12" height="9" rx="2" fill="#C9CED6" stroke="#8C939E"/><rect x="15" y="64" width="4" height="76" fill="#A9AFB8"/><path d="M14.5 140h5l-1.5 9h-2z" fill="#8C939E"/>` },
    zaag: { w: 170, h: 70, px: 23, py: 24, svg: `<path d="M44 14L166 24V50H44z" fill="#C9CED6" stroke="#8C939E" stroke-width="1.5"/><path d="${TANDEN}" fill="none" stroke="#8C939E" stroke-width="1.5" stroke-linejoin="round"/><path d="M60 22l90 7" stroke="#E6EAEF" stroke-width="2"/><path d="M4 8h42v54H4q-4 0-4-4V12q0-4 4-4z" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><rect x="12" y="20" width="22" height="28" rx="7" fill="${D}"/><circle cx="40" cy="18" r="2" fill="#8C939E"/><circle cx="40" cy="52" r="2" fill="#8C939E"/>` },
    tang: { w: 60, h: 150, px: 30, py: 26, svg: `<path d="M15 4q-5 42 13 86" stroke="#2F7A6E" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M45 4q5 42-13 86" stroke="#C8323C" stroke-width="11" stroke-linecap="round" fill="none"/><path d="M24 92l2 48 4 6 4-6 2-48z" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5" stroke-linejoin="round"/><path d="M30 100v40" stroke="#6F7785" stroke-width="1.2"/><circle cx="30" cy="92" r="7" fill="#8C939E" stroke="#5F6470" stroke-width="1.5"/><circle cx="30" cy="92" r="2.4" fill="#5F6470"/>` },
    steeksleutel: { w: 44, h: 168, px: 22, py: 9, svg: `<circle cx="22" cy="20" r="17" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5"/><rect x="15" y="0" width="14" height="20" rx="2" fill="${D}"/><rect x="16" y="32" width="12" height="108" rx="4" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5"/><path d="M19 46v80" stroke="#C9CED6" stroke-width="2" stroke-linecap="round"/><circle cx="22" cy="150" r="15" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5"/><circle cx="22" cy="150" r="7" fill="${D}"/>` },
    duimstok: { w: 40, h: 166, px: 20, py: 10, svg: `<rect x="10" y="4" width="24" height="158" rx="2" fill="#E0AE1E" stroke="#B8901A" stroke-width="1.5"/><rect x="6" y="2" width="24" height="158" rx="2" fill="#F2C230" stroke="#B8901A" stroke-width="1.5"/><circle cx="20" cy="10" r="3" fill="${D}"/><path d="M6 24h7M6 34h5M6 44h7M6 54h5M6 64h7M6 74h5M6 84h7M6 94h5M6 104h7M6 114h5M6 124h7M6 134h5M6 144h7" stroke="#3A3D46" stroke-width="1.4"/><circle cx="18" cy="152" r="2.4" fill="#B8862F"/>` },
    schaar: { w: 62, h: 132, px: 20, py: 11, svg: `<path d="M26 28L37 124l5-2L31 28z" fill="#C9CED6" stroke="#8C939E" stroke-width="1.5" stroke-linejoin="round"/><path d="M36 28L25 124l-5-2L31 28z" fill="#DDE1E6" stroke="#8C939E" stroke-width="1.5" stroke-linejoin="round"/><circle cx="20" cy="18" r="10" fill="none" stroke="#2F4C8F" stroke-width="6"/><circle cx="42" cy="18" r="10" fill="none" stroke="#2F4C8F" stroke-width="6"/><circle cx="31" cy="48" r="3.2" fill="#6F7785"/>` },
    plakband: { w: 72, h: 72, px: 36, py: 24, svg: `<circle cx="36" cy="36" r="31" fill="#D9BE78" stroke="#B8862F" stroke-width="1.5"/><circle cx="36" cy="36" r="25" fill="none" stroke="#C9A85E" stroke-width="1"/><circle cx="36" cy="36" r="17" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><circle cx="36" cy="36" r="13" fill="${D}"/><path d="M66 40l3 18-12 2z" fill="#E4CC8E" stroke="#B8862F" stroke-width="1.2"/>` },
    kwast: { w: 40, h: 150, px: 20, py: 9, svg: `<rect x="13" y="0" width="14" height="82" rx="7" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><circle cx="20" cy="9" r="3.4" fill="${D}"/><rect x="8" y="78" width="24" height="20" rx="2" fill="#C9CED6" stroke="#8C939E" stroke-width="1.5"/><path d="M8 84h24M8 90h24" stroke="#A9AFB8"/><path d="M8 98h24l2 42q-14 7-28 0z" fill="#3A3D46"/><path d="M6 132q14 8 28 0l0 8q-14 7-28 0z" fill="#C8323C"/>` },
    waterpas: { w: 190, h: 40, px: 95, py: 11, svg: `<rect x="2" y="4" width="186" height="30" rx="4" fill="#E9B949" stroke="#B8862F" stroke-width="1.5"/><rect x="2" y="4" width="14" height="30" rx="3" fill="#3A3D46"/><rect x="174" y="4" width="14" height="30" rx="3" fill="#3A3D46"/><circle cx="95" cy="11" r="3.4" fill="${D}"/><rect x="118" y="12" width="40" height="14" rx="7" fill="#CDEFE0" stroke="#5E7F8C" stroke-width="1.5"/><path d="M131 12v14M145 12v14" stroke="#5E7F8C" stroke-width="1"/><circle class="bel" cx="138" cy="19" r="4.5" fill="#fff" stroke="#9FD3C7"/><rect x="40" y="14" width="34" height="10" rx="5" fill="#CDEFE0" stroke="#5E7F8C" stroke-width="1.2"/>` },
    boor: { w: 132, h: 110, px: 50, py: 8, svg: `<circle cx="50" cy="8" r="5" fill="none" stroke="#3A2A1E" stroke-width="2.5"/><path d="M50 13v2" stroke="#3A2A1E" stroke-width="2.5"/><rect x="18" y="14" width="80" height="34" rx="11" fill="#2E8B62" stroke="#1E5E42" stroke-width="1.5"/><rect x="20" y="16" width="30" height="30" rx="9" fill="#23252B"/><path d="M26 24h18M26 30h18M26 36h18" stroke="#45495A" stroke-width="1.6"/><rect x="96" y="20" width="14" height="22" rx="3" fill="#3A3D46" stroke="#23252B" stroke-width="1.5"/><path d="M99 22v18M103 22v18" stroke="#5F6470"/><rect x="110" y="27" width="20" height="8" rx="2" fill="#A9AFB8" stroke="#6F7785"/><path d="M112 31h16" stroke="#6F7785" stroke-dasharray="2 2"/><path d="M44 46h24l-5 46H48z" fill="#23252B" stroke="#1F2333" stroke-width="1.5" stroke-linejoin="round"/><rect x="62" y="50" width="8" height="13" rx="2" fill="#E9B949"/><rect x="30" y="90" width="52" height="18" rx="4" fill="#2E8B62" stroke="#1E5E42" stroke-width="1.5"/><rect x="36" y="95" width="12" height="4" rx="1" fill="#CDEFE0"/><rect x="51" y="95" width="5" height="4" rx="1" fill="#CDEFE0"/>` },
    verfroller: { w: 84, h: 130, px: 40, py: 7, svg: `<rect x="33" y="0" width="14" height="70" rx="7" fill="#C8323C" stroke="#9E2430" stroke-width="1.5"/><circle cx="40" cy="7" r="3.4" fill="${D}"/><path d="M36 18v44M44 18v44" stroke="#9E2430" stroke-width="1.5"/><path d="M40 70v8q0 6 6 6h22q6 0 6 6v12" fill="none" stroke="#A9AFB8" stroke-width="4" stroke-linecap="round"/><rect x="6" y="100" width="72" height="27" rx="11" fill="#FBF6E9" stroke="#C9B58A" stroke-width="1.5"/><path d="M12 107q30 4 60 0M12 114q30 4 60 0M12 121q30 4 60 0" stroke="#E9DFC4" stroke-width="1.5" fill="none"/><path d="M8 118q14 8 26-1q10 6 18 1" stroke="#2F4C8F" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>` },
    klem: { w: 70, h: 148, px: 14, py: 7, svg: `<rect x="9" y="0" width="10" height="146" rx="2" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5"/><circle cx="14" cy="7" r="3" fill="${D}"/><path d="M12 30v112" stroke="#C9CED6" stroke-width="1.5"/><path d="M14 16h44v14H14z" fill="#3A3D46" stroke="#23252B" stroke-width="1.5" stroke-linejoin="round"/><rect x="47" y="30" width="12" height="6" rx="1" fill="#C8323C"/><path d="M14 96h44v14H14z" fill="#3A3D46" stroke="#23252B" stroke-width="1.5" stroke-linejoin="round"/><rect x="49" y="58" width="8" height="38" fill="#C9CED6" stroke="#8C939E"/><path d="M49 64h8M49 70h8M49 76h8M49 82h8M49 88h8" stroke="#8C939E"/><rect x="46" y="52" width="14" height="6" rx="1" fill="#C8323C"/><rect x="44" y="110" width="18" height="34" rx="7" fill="#C8323C" stroke="#9E2430" stroke-width="1.5"/>` },
    beitel: { w: 30, h: 150, px: 15, py: 8, svg: `<rect x="7" y="0" width="16" height="64" rx="7" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><circle cx="15" cy="8" r="3.4" fill="${D}"/><path d="M11 20v36M19 20v36" stroke="#9A6438" stroke-width="1.2"/><rect x="6" y="58" width="18" height="8" rx="2" fill="#C9A85E" stroke="#8C6A2A"/><path d="M11 66h8v66l3 14H8l3-14z" fill="#A9AFB8" stroke="#6F7785" stroke-width="1.5" stroke-linejoin="round"/><path d="M13 72v58" stroke="#DDE1E6" stroke-width="1.5"/>` },
    rolmaat: { w: 84, h: 80, px: 38, py: 8, svg: `<rect x="30" y="2" width="16" height="16" rx="2" fill="#3A3D46"/><circle cx="38" cy="8" r="3" fill="${D}"/><rect x="4" y="14" width="68" height="62" rx="14" fill="#E9B949" stroke="#B8862F" stroke-width="1.5"/><circle cx="38" cy="45" r="18" fill="#23252B"/><circle cx="38" cy="45" r="11" fill="#3A3D46"/><circle cx="38" cy="45" r="3" fill="#E9B949"/><rect x="64" y="61" width="16" height="10" rx="1" fill="#F2DDA0" stroke="#B8862F"/><path d="M67 61v10M71 61v4M75 61v10" stroke="#3A3D46"/><rect x="78" y="58" width="4" height="16" fill="#8C939E"/><rect x="10" y="20" width="22" height="8" rx="3" fill="#F6D27A" opacity=".7"/>` },
    ijzerzaag: { w: 170, h: 66, px: 92, py: 8, svg: `<circle cx="92" cy="8" r="5" fill="none" stroke="#3A2A1E" stroke-width="2.5"/><path d="M92 13v3" stroke="#3A2A1E" stroke-width="2.5"/><path d="M34 46V18h124v28" fill="none" stroke="#2F4C8F" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/><rect x="34" y="42" width="124" height="6" fill="#C9CED6" stroke="#8C939E"/><path d="M36 48l3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4 3 4 3-4" fill="none" stroke="#8C939E" stroke-width="1.2"/><circle cx="158" cy="45" r="3" fill="#E9B949" stroke="#8C6A2A"/><path d="M8 32h28v28H16q-8 0-8-8z" fill="#C8323C" stroke="#9E2430" stroke-width="1.5" stroke-linejoin="round"/><rect x="14" y="40" width="14" height="12" rx="5" fill="${D}"/>` },
  };

  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const G = +(document.body.dataset.gat || 30), OFF = G / 2;
  const PAGINA = document.body.dataset.pagina || location.pathname;
  const KEY = 'gereedschap-v2';
  // dingen waar gereedschap nooit overheen mag hangen
  const HINDER = '.sticker, .coulissen, .prop, .kaartje, .coulissen h2, h1, h2, h3, .briefje, .haak-rij .label, footer > *, .kop a, .paneel, .status, .plank, .tafel .som, .tafel .handnaam, .veld .kaart, .werkbank, .knoppen, .bericht, .klein, .uitleg, .bord, .legenda, .toetsen, .teller, .buffs .buff, .vlaai-knop, .melding:not([hidden]), .welkom, .dag, #uitslag > *, .opslaan-balk, main a, main button, .wrap > p';
  let opgeslagen = {};
  try { opgeslagen = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { opgeslagen = {}; }
  const bewaar = () => { try { localStorage.setItem(KEY, JSON.stringify(opgeslagen)); } catch (e) {} };

  const laag = document.createElement('div');
  laag.className = 'muurlaag'; laag.setAttribute('aria-hidden', 'true');
  laag.style.cssText = 'position:absolute;left:0;top:0;width:100%;pointer-events:none;z-index:3;';
  document.body.prepend(laag);
  const stijl = document.createElement('style');
  stijl.textContent = '.gs-sleept, .gs-sleept * { -webkit-user-select: none !important; user-select: none !important; cursor: grabbing !important; }';
  document.head.appendChild(stijl);

  const stukken = [];
  const actief = new Set();
  let laatste = 0, loopt = false;
  const snap = v => Math.round((v - OFF) / G) * G + OFF;
  const GRAAD = 180 / Math.PI;
  const breedte = () => document.documentElement.clientWidth;
  const hoogte = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

  function hindernissen() {
    const sx = window.scrollX, sy = window.scrollY, uit = [];
    document.querySelectorAll(HINDER).forEach(el => {
      if (laag.contains(el)) return;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return;
      uit.push({ l: r.left + sx, t: r.top + sy, r: r.right + sx, b: r.bottom + sy });
    });
    return uit;
  }
  function kader(T, px, py) { return { l: px - T.px, t: py - T.py, r: px - T.px + T.w, b: py - T.py + T.h }; }
  function botst(k, lijst, marge) { return lijst.some(h => k.l < h.r + marge && k.r > h.l - marge && k.t < h.b + marge && k.b > h.t - marge); }
  function past(T, px, py, lijst, zelf) {
    const k = kader(T, px, py);
    if (k.l < 2 || k.r > breedte() - 2 || k.t < 2) return false;
    if (botst(k, lijst, 8)) return false;
    return !stukken.some(s => s !== zelf && botst(k, [kader(s.T, s.px, s.py)], 4));
  }
  // zoek het dichtstbijzijnde vrije gaatje rond (x, y)
  function vrijGaatje(T, x, y, zelf, lijst) {
    x = snap(x); y = snap(y);
    if (past(T, x, y, lijst, zelf)) return [x, y];
    for (let ring = 1; ring <= 14; ring++) {
      let beste = null, bd = Infinity;
      for (let dx = -ring; dx <= ring; dx++) for (let dy = -ring; dy <= ring; dy++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== ring) continue;
        const cx = x + dx * G, cy = y + dy * G, d = dx * dx + dy * dy;
        if (d < bd && past(T, cx, cy, lijst, zelf)) { beste = [cx, cy]; bd = d; }
      }
      if (beste) return beste;
    }
    return null;
  }

  function bouw() {
    laag.innerHTML = ''; stukken.length = 0; actief.clear();
    laag.style.height = hoogte() + 'px';
    const lijst = hindernissen(), W = breedte(), midden = W / 2;
    const bewaard = opgeslagen[PAGINA] || {};
    const orde = z => (z.classList.contains('verspreid') ? 2 : z.classList.contains('zijkant') ? 1 : 0);
    const zones = Array.from(document.querySelectorAll('.rek[data-gereedschap]')).sort((p, q) => orde(p) - orde(q));
    zones.forEach(zone => {
      const r = zone.getBoundingClientRect();
      if (r.width < 40 || r.height < 40) return;
      const bx = r.left + window.scrollX, by = r.top + window.scrollY;
      const ids = (zone.dataset.gereedschap || '').split(',').map(s => s.trim()).filter(id => GEREEDSCHAP[id]);
      if (zone.classList.contains('verspreid')) {
        // los over de hele pagina: zoek per stuk een vrij plekje, zo ver mogelijk van de rest
        for (const id of ids) {
          if (stukken.some(s => s.id === id)) continue;
          const T = GEREEDSCHAP[id], b = bewaard[id];
          let plek = null;
          if (b) { const px = snap(midden + b[0]), py = snap(b[1]); if (past(T, px, py, lijst, null)) plek = [px, py]; }
          if (!plek) {
            let zaad = [...id].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 2147483647, 7) || 7, beste = -1;
            const rnd = () => (zaad = (zaad * 16807) % 2147483647) / 2147483647;
            for (let k = 0; k < 140; k++) {
              const px = snap(bx + 16 + rnd() * Math.max(0, r.width - 32 - T.w) + T.px), py = snap(by + 16 + rnd() * Math.max(0, r.height - 32 - T.h) + T.py);
              if (!past(T, px, py, lijst, null)) continue;
              const afstand = stukken.length ? Math.min(...stukken.map(s => Math.hypot(s.px - px, (s.py - py) * 1.3))) : 1e6;
              if (afstand > beste) { beste = afstand; plek = [px, py]; }
            }
            if (!plek || beste < 90) continue;
          }
          maakStuk(id, T, plek[0], plek[1]);
        }
        return;
      }
      let x = 12, y = 14, rij = 0;
      for (const id of ids) {
        if (stukken.some(s => s.id === id)) continue;
        const T = GEREEDSCHAP[id];
        let plek = null;
        const b = bewaard[id];
        if (b) { const px = snap(midden + b[0]), py = snap(b[1]); if (past(T, px, py, lijst, null)) plek = [px, py]; }
        if (!plek) {
          if (x + T.w > r.width - 8) { x = 12; y += rij + 34; rij = 0; }
          if (y + T.h > r.height) continue;
          const px = snap(bx + x + T.px), py = snap(by + y + T.py);
          x += T.w + 26; rij = Math.max(rij, T.h);
          plek = past(T, px, py, lijst, null) ? [px, py] : vrijGaatje(T, px, py, null, lijst);
          if (!plek) continue;
        }
        maakStuk(id, T, plek[0], plek[1]);
      }
    });
    if (!begroet && !reduce && stukken.length && window.name !== 'voorbeeld') { begroet = true; stukken.forEach((s, i) => setTimeout(() => duw(s, (i % 2 ? 1 : -1) * (14 + Math.random() * 14)), 300 + i * 110)); }
  }
  let begroet = false;

  function maakStuk(id, T, px, py) {
    const haak = document.createElement('span'); haak.className = 'gs-haak';
    const el = document.createElement('div'); el.className = 'gs gs-' + id;
    el.style.width = T.w + 'px'; el.style.height = T.h + 'px';
    el.style.transformOrigin = T.px + 'px ' + T.py + 'px';
    el.innerHTML = `<svg viewBox="0 0 ${T.w} ${T.h}" width="${T.w}" height="${T.h}" aria-hidden="true" focusable="false">${T.svg}</svg>`;
    laag.appendChild(el); laag.appendChild(haak);
    const s = { id, T, el, haak, px, py, a: 0, v: 0, sleep: false, bel: el.querySelector('.bel'), vorig: [px, py] };
    zet(s); stukken.push(s);

    el.addEventListener('pointerenter', e => {
      if (e.pointerType !== 'mouse' || s.sleep || reduce) return;
      const nu = performance.now();
      if (nu - (s.laatsteDuw || 0) < 150 || Math.abs(s.v) > 300) return;
      s.laatsteDuw = nu;
      const mx = e.movementX || (e.clientX - pivotScherm(s).x) / 4;
      duw(s, (mx > 0 ? -1 : 1) * (14 + Math.min(1, Math.abs(mx) / 25) * 30));
    });
    el.addEventListener('mousedown', e => e.preventDefault());
    el.addEventListener('pointerdown', e => {
      if (e.button !== 0) return;
      const p = pivotScherm(s);
      s.start = { x: e.clientX, y: e.clientY, dx: e.clientX - p.x, dy: e.clientY - p.y, t: e.pointerType };
      s.bewogen = false;
      if (e.pointerType === 'mouse' || e.pointerType === 'pen') { el.setPointerCapture(e.pointerId); e.preventDefault(); }
    });
    el.addEventListener('pointermove', e => {
      if (!s.start || s.start.t === 'touch') return;
      if (!s.bewogen && Math.hypot(e.clientX - s.start.x, e.clientY - s.start.y) < 5) return;
      if (!s.bewogen) { s.bewogen = true; s.sleep = true; s.vorig = [s.px, s.py]; el.classList.add('sleept'); haak.style.opacity = '0'; document.documentElement.classList.add('gs-sleept'); const sel = window.getSelection && window.getSelection(); if (sel) sel.removeAllRanges(); }
      const W = breedte(), H = hoogte();
      const nx = Math.min(W - (T.w - T.px), Math.max(T.px, e.clientX + window.scrollX - s.start.dx));
      const ny = Math.min(H - (T.h - T.py), Math.max(T.py, e.clientY + window.scrollY - s.start.dy));
      if (!reduce) s.v += (nx - s.px) * 7 * Math.cos(s.a / GRAAD) - (ny - s.py) * 7 * Math.sin(s.a / GRAAD);
      s.px = nx; s.py = ny; zet(s); start(s);
    });
    const los = e => {
      if (!s.start) return;
      if (!s.bewogen) {
        s.laatsteDuw = performance.now();
        // zwaait hij al, dan geeft een klik extra vaart in dezelfde richting, zoals een schommel aanduwen
        const richting = Math.abs(s.v) > 30 ? Math.sign(s.v) : (e.clientX > pivotScherm(s).x ? 1 : -1);
        duw(s, richting * (Math.abs(s.v) > 30 ? 320 : 160));
      } else {
        const lijst = hindernissen();
        const plek = vrijGaatje(T, s.px, s.py, s, lijst) || s.vorig;
        s.px = plek[0]; s.py = plek[1];
        s.sleep = false; el.classList.remove('sleept'); haak.style.opacity = ''; document.documentElement.classList.remove('gs-sleept');
        zet(s); start(s);
        opgeslagen[PAGINA] = opgeslagen[PAGINA] || {};
        opgeslagen[PAGINA][id] = [Math.round(s.px - breedte() / 2), Math.round(s.py)];
        bewaar();
      }
      s.start = null;
    };
    el.addEventListener('pointerup', los);
    el.addEventListener('pointercancel', () => { s.start = null; document.documentElement.classList.remove('gs-sleept'); if (s.sleep) { s.sleep = false; el.classList.remove('sleept'); haak.style.opacity = ''; s.px = s.vorig[0]; s.py = s.vorig[1]; zet(s); } });
  }

  function pivotScherm(s) { return { x: s.px - window.scrollX, y: s.py - window.scrollY }; }
  function zet(s) {
    s.el.style.left = (s.px - s.T.px) + 'px';
    s.el.style.top = (s.py - s.T.py) + 'px';
    s.el.style.transform = 'rotate(' + s.a.toFixed(2) + 'deg)';
    s.haak.style.left = s.px + 'px'; s.haak.style.top = s.py + 'px';
    if (s.bel) s.bel.setAttribute('cx', (138 - Math.max(-13, Math.min(13, s.a * 1.6))).toFixed(1));
  }
  function duw(s, v) { if (reduce) return; s.v = Math.max(-2400, Math.min(2400, s.v + v)); start(s); }
  function start(s) { actief.add(s); if (!loopt) { loopt = true; laatste = performance.now(); requestAnimationFrame(tik); } }
  function tik(t) {
    const dt = Math.min(0.04, (t - laatste) / 1000); laatste = t;
    for (const s of actief) {
      if (!reduce) {
        // slinger: zwaartekracht trekt naar beneden, demping laat hem rustig uitzwaaien
        const stappen = 4, h = dt / stappen;
        for (let i = 0; i < stappen; i++) { s.v += (-38 * GRAAD * Math.sin(s.a / GRAAD) - 1.3 * s.v) * h; s.a += s.v * h; }
        s.a = ((s.a + 180) % 360 + 360) % 360 - 180;   // na een rondje over de kop weer netjes tussen -180 en 180
      }
      zet(s);
      if (!s.sleep && Math.abs(s.a) < 0.05 && Math.abs(s.v) < 0.08) { s.a = 0; s.v = 0; zet(s); actief.delete(s); }
    }
    if (actief.size) requestAnimationFrame(tik); else loopt = false;
  }
  // als de pagina verandert (bijvoorbeeld een nieuw paneel), schuift gereedschap opzij
  function ruimOp() {
    laag.style.height = hoogte() + 'px';
    const lijst = hindernissen();
    for (const s of stukken) {
      if (s.sleep) continue;
      if (!botst(kader(s.T, s.px, s.py), lijst, 4)) continue;
      const plek = vrijGaatje(s.T, s.px, s.py, s, lijst);
      if (plek) { s.px = plek[0]; s.py = plek[1]; zet(s); duw(s, 40); }
      else { s.el.style.display = 'none'; s.haak.style.display = 'none'; }
    }
  }
  setInterval(ruimOp, 1500);

  let wachtR = null, oudeB = breedte();
  window.addEventListener('resize', () => { if (breedte() === oudeB) return; oudeB = breedte(); clearTimeout(wachtR); wachtR = setTimeout(bouw, 200); });
  window.gereedschapBouw = () => bouw();
  window.gereedschapTerug = () => { delete opgeslagen[PAGINA]; bewaar(); bouw(); stukken.forEach(s => duw(s, (Math.random() - .5) * 60)); };
  bouw();
  window.addEventListener('load', bouw);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(bouw);
})();

})();
;(function () {
(function () {
  // Veerkrachtige hover-animaties. Elke keer dat je muis een element raakt, krijgt het
  // meteen een zetje. Een veer brengt het daarna altijd rustig terug naar zijn plek.
  // Er wordt nooit een animatie opnieuw gestart, dus het blijft vloeiend, ook als je
  // snel heen en weer gaat of op het randje blijft hangen.
  const SOORTEN = [
    // [selector, soort]
    ['.stempel', 'stempel'],
    ['.label', 'zwaai'],
    ['.briefje', 'zwaai'],
    ['.tape', 'wiebel'],
    ['.sticker', 'wiebel'],
    ['.prop', 'zwaai'],
    ['.kaartje', 'zwaai'],
    ['h2 > span', 'wiebel'],
    ['.versie', 'wiebel'],
    ['.legenda li', 'hop'],
    ['.dag b', 'hop'],
  ];
  // veren per soort: k = stijfheid, d = demping, max = grootste uitslag
  const VEER = {
    wiebel: { a: { k: 90, d: 7, max: 4, duw: 70 }, y: { k: 160, d: 13, max: 5, duw: 90 } },
    zwaai: { a: { k: 26, d: 2.4, max: 5, duw: 34 } },
    hop: { a: { k: 120, d: 9, max: 5, duw: 60 }, y: { k: 170, d: 12, max: 6, duw: 120 } },
    stempel: { a: { k: 130, d: 9, max: 9, duw: 120 }, s: { k: 220, d: 14, max: 0.16, duw: 3 } },
    icoon: { a: { k: 110, d: 8, max: 7, duw: 80 }, y: { k: 150, d: 11, max: 7, duw: 130 } },
  };
  const KIES = SOORTEN.map(s => s[0]).join(', ');
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const staat = new WeakMap();
  const actief = new Set();
  let loopt = false, laatste = 0;

  function soortVan(el) { for (const [sel, s] of SOORTEN) if (el.matches(sel)) return s; return null; }
  function st(el, soort) {
    let s = staat.get(el);
    if (!s) { s = { el, soort, a: 0, va: 0, y: 0, vy: 0, s: 0, vs: 0, rust: 0 }; staat.set(el, s); }
    return s;
  }
  function zet(s) {
    if (Math.abs(s.a) < 0.01 && Math.abs(s.y) < 0.01 && Math.abs(s.s) < 0.0005) { s.el.style.transform = ''; return; }
    s.el.style.transform = `translateY(${s.y.toFixed(2)}px) rotate(calc(var(--r, 0deg) + ${s.a.toFixed(3)}deg)) scale(${(1 + s.s).toFixed(4)})`;
  }
  function duw(el, soort, richting, kracht) {
    const s = st(el, soort), V = VEER[soort];
    kracht = kracht == null ? 1 : kracht;
    if (V.a) s.va += richting * V.a.duw * kracht;
    if (V.y) s.vy -= V.y.duw * kracht;
    if (V.s) s.vs += V.s.duw * kracht;
    actief.add(s);
    if (!loopt) { loopt = true; laatste = performance.now(); requestAnimationFrame(tik); }
  }
  const klem = (v, m) => Math.max(-m, Math.min(m, v));
  function stap(x, v, V, dt) { v += (-V.k * x - V.d * v) * dt; x += v * dt; if (Math.abs(x) > V.max) { x = klem(x, V.max); v *= 0.5; } return [x, v]; }
  function tik(t) {
    const dt = Math.min(0.033, (t - laatste) / 1000); laatste = t;
    for (const s of actief) {
      const V = VEER[s.soort];
      if (V.a) [s.a, s.va] = stap(s.a, s.va, V.a, dt);
      if (V.y) [s.y, s.vy] = stap(s.y, s.vy, V.y, dt);
      if (V.s) [s.s, s.vs] = stap(s.s, s.vs, V.s, dt);
      zet(s);
      if (Math.abs(s.a) + Math.abs(s.va) / 20 < 0.02 && Math.abs(s.y) + Math.abs(s.vy) / 20 < 0.02 && Math.abs(s.s) + Math.abs(s.vs) / 20 < 0.0008) {
        s.a = s.va = s.y = s.vy = s.s = s.vs = 0; zet(s); actief.delete(s);
      }
    }
    if (actief.size) requestAnimationFrame(tik); else loopt = false;
  }

  document.addEventListener('pointerover', e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const el = e.target.closest && e.target.closest(KIES);
    if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
    const soort = soortVan(el); if (!soort) return;
    const s = st(el, soort), nu = performance.now();
    if (nu - s.rust < 120) return;   // tegen haperen op het randje
    s.rust = nu;
    const mx = e.movementX || 0;
    const kracht = 0.55 + Math.min(1, Math.abs(mx) / 30) * 0.65;   // snel langs = iets meer zwaai
    duw(el, soort, mx >= 0 ? -1 : 1, kracht);
    if (soort === 'zwaai') { const ic = el.querySelector('.label-icoon svg'); if (ic) duw(ic, 'icoon', mx >= 0 ? 1 : -1, kracht); }
  });

  // binnenkomst: labels zwaaien even als de pagina opent
  if (window.name !== 'voorbeeld') document.querySelectorAll('.label').forEach((l, i) => setTimeout(() => duw(l, 'zwaai', i % 2 ? 1 : -1, 1.6), 250 + i * 160));
})();

})();
;(function () {
(function () {
  // HEBBEDINGEN: de sticker rechtsboven en de props uit Rubens musicals op de homepage.
  // Dit script bouwt alles zelf op, zodat de werkplaats het kan bijwerken zonder je labels aan te raken.
  if (document.querySelector('.coulissen')) return;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const D = '#1E3263';

  // ---------- geluid (alleen na een klik)
  let audio = null;
  function toon(f, start, duur, type, vol, naar) {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const o = audio.createOscillator(), v = audio.createGain(), t = audio.currentTime + (start || 0);
      o.type = type || 'square'; o.frequency.setValueAtTime(f, t);
      if (naar) o.frequency.exponentialRampToValueAtTime(naar, t + duur);
      v.gain.setValueAtTime(vol || 0.04, t); v.gain.exponentialRampToValueAtTime(0.0001, t + duur);
      o.connect(v); v.connect(audio.destination); o.start(t); o.stop(t + duur + 0.03);
    } catch (e) {}
  }

  // ---------- props van Rubens personages (eigen tekeningen, geïnspireerd op zijn kostuums)
  const PEG = '<circle cx="0" cy="0" r="5" fill="#1E3263"/><path d="M0 0v10" stroke="#8C939E" stroke-width="3" stroke-linecap="round"/>';
  const SVG = {
    jas: `<svg viewBox="0 0 132 206" aria-hidden="true" focusable="false"><g transform="translate(66 8)">${PEG}</g>
      <path d="M66 16q0-8 8-8t6 8q-2 6-10 12" fill="none" stroke="#C9CED6" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M66 28L14 52q-6 3 0 6h104q6-3 0-6z" fill="#8C5530" stroke="#3A2414" stroke-width="2.5" stroke-linejoin="round"/>
      <g class="jas-lijf">
        <path d="M30 56q-14 6-18 26l-6 74q0 6 6 6h14l4-70" fill="#26262E" stroke="#0A0A0E" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M102 56q14 6 18 26l6 74q0 6-6 6h-14l-4-70" fill="#26262E" stroke="#0A0A0E" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M30 56q16-6 36-6t36 6l4 128q0 8-8 10l-32 6-32-6q-8-2-8-10z" fill="#2E2E38" stroke="#0A0A0E" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M30 70q4 40 2 112M102 70q-4 40-2 112" stroke="#3E3E4A" stroke-width="2" fill="none" opacity=".7"/>
        <path d="M54 52l12 34 12-34q-6 6-12 6t-12-6z" fill="#F2EDE2" stroke="#8C826C" stroke-width="1.6"/>
        <path d="M58 50q8 10 16 0" fill="none" stroke="#8C826C" stroke-width="1.4"/>
        <path d="M54 52q-12 4-14 24l14 26 12-20zM78 52q12 4 14 24l-14 26-12-20z" fill="#383844" stroke="#0A0A0E" stroke-width="2" stroke-linejoin="round"/>
        <path d="M60 46q6 8 12 0l2 8q-8 6-16 0z" fill="#26262E" stroke="#0A0A0E" stroke-width="2"/>
        ${[96, 116, 136, 156].map(y => `<circle cx="56" cy="${y}" r="3.4" fill="#C9CED6" stroke="#5F6470" stroke-width="1.2"/><circle cx="76" cy="${y}" r="3.4" fill="#C9CED6" stroke="#5F6470" stroke-width="1.2"/>`).join('')}
        <path d="M32 60L104 150l-2 20L28 82z" fill="#B82E3A" stroke="#4A0A12" stroke-width="2" stroke-linejoin="round"/>
        <path d="M34 70l68 86M31 77l69 87" stroke="#E0505C" stroke-width="1.6" opacity=".7"/>
        <path d="M96 150q10 10 6 30l-8-4q4-12-4-20zM104 156q12 6 12 26l-8-2q0-12-8-18z" fill="#9E2430" stroke="#4A0A12" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M44 190l22 4 22-4" fill="none" stroke="#0A0A0E" stroke-width="2"/>
        <g class="das"><g transform="rotate(-22 64 56)"><path d="M61 52q2 6 1 12M69 52q-1 6 0 12" stroke="#6E1F2A" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M58 64q6 5 12 0l2 7q-7 6-15 1z" fill="#6E1F2A" stroke="#2A0A10" stroke-width="1.6"/><path d="M61 71q-5 12 0 26l5 7 4-9q-1-15-4-24z" fill="#8E2F3A" stroke="#2A0A10" stroke-width="1.6" stroke-linejoin="round"/><path d="M63 77q0 10 3 19" stroke="#B85A64" stroke-width="1.2" fill="none"/><path d="M70 70q8 6 6 16" stroke="#8E2F3A" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>
        <g class="broche" transform="translate(88 98)">
          <path d="M0-14v28M-9-5h18" stroke="#DDE3EA" stroke-width="4.2" stroke-linecap="round"/>
          <path d="M0-14v28M-9-5h18" stroke="#8C939E" stroke-width="1.4" stroke-linecap="round"/>
          <circle cy="-14" r="2.6" fill="#3EC6A8" stroke="#DDE3EA" stroke-width="1"/><circle cy="14" r="2.6" fill="#3EC6A8" stroke="#DDE3EA" stroke-width="1"/><circle cx="-9" cy="-5" r="2.6" fill="#3EC6A8" stroke="#DDE3EA" stroke-width="1"/><circle cx="9" cy="-5" r="2.6" fill="#3EC6A8" stroke="#DDE3EA" stroke-width="1"/><circle cy="-5" r="3.2" fill="#2E8B62" stroke="#DDE3EA" stroke-width="1.2"/>
          <path class="glinster" d="M7-15l1.4 3.6L12-10l-3.6 1.4L7-5l-1.4-3.6L2-10l3.6-1.4z" fill="#fff" opacity="0"/>
        </g>
      </g>
    </svg>`,
    kroon: `<svg viewBox="0 0 150 128" aria-hidden="true" focusable="false"><g transform="translate(75 8)">${PEG}</g>
      <g class="gloed" opacity="0"><ellipse cx="75" cy="78" rx="70" ry="44" fill="#4BE38A" opacity=".25"/></g>
      <g stroke="#3E3112" stroke-width="1.6" stroke-linejoin="round">
        <path d="M20 86L14 40l18 30 6-52 14 46 10-50 13 44 13-44 10 50 14-46 6 52 18-30-6 46z" fill="#6B5A2A"/>
        <path d="M24 88L22 54l14 24 8-40 12 38 10-42 9 40 9-40 10 42 12-38 8 40 14-24-2 34z" fill="#C9A24A"/>
        <path d="M44 38l4 34M66 30l3 40M84 30l-3 40M106 38l-4 34" stroke="#F2D58A" stroke-width="1.4" fill="none"/>
        <rect x="18" y="84" width="114" height="22" rx="4" fill="#A88536"/>
        <path d="M18 95h114" stroke="#6B5A2A" stroke-width="2"/>
      </g>
      <g fill="#E9C46A"><circle cx="34" cy="90" r="2.4"/><circle cx="54" cy="90" r="2.4"/><circle cx="96" cy="90" r="2.4"/><circle cx="116" cy="90" r="2.4"/><circle cx="34" cy="101" r="2.4"/><circle cx="116" cy="101" r="2.4"/></g>
      <path class="steen" d="M75 82l9 12-9 12-9-12z" fill="#2E8B62" stroke="#1E5E42" stroke-width="1.6"/>
      <path d="M72 88l3-3 3 3" stroke="#B8F0CF" stroke-width="1.5" fill="none"/>
    </svg>`,
    stok: `<svg viewBox="0 0 70 236" aria-hidden="true" focusable="false"><g transform="translate(30 8)">${PEG}</g>
      <path d="M30 14q-20 0-20 18" fill="none" stroke="#C99A2E" stroke-width="9" stroke-linecap="round"/>
      <path d="M30 14q-20 0-20 18" fill="none" stroke="#F2D58A" stroke-width="3" stroke-linecap="round"/>
      <path d="M30 14q18 0 18 18v16" fill="none" stroke="#C99A2E" stroke-width="11" stroke-linecap="round"/>
      <path d="M30 14q18 0 18 18v16" fill="none" stroke="#F2D58A" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="10" cy="34" r="6" fill="#E9C46A" stroke="#8C6A2A" stroke-width="1.5"/>
      <rect x="42" y="46" width="12" height="12" rx="2" fill="#C99A2E" stroke="#8C6A2A" stroke-width="1.5"/>
      <path d="M42 50h12M42 54h12" stroke="#8C6A2A"/>
      <rect x="44" y="58" width="8" height="160" rx="3" fill="#23252B"/>
      <path d="M46 62v150" stroke="#45495A" stroke-width="1.5"/>
      <rect x="43" y="110" width="10" height="4" rx="1" fill="#C99A2E"/><rect x="43" y="160" width="10" height="4" rx="1" fill="#C99A2E"/>
      <path d="M44 216h8l-1 14h-6z" fill="#C99A2E" stroke="#8C6A2A" stroke-width="1.2"/>
    </svg>`,
    kaarten: `<svg viewBox="0 0 130 140" aria-hidden="true" focusable="false"><g transform="translate(65 8)">${PEG}</g>
      <rect x="57" y="12" width="16" height="22" rx="3" fill="#B5793F" stroke="#7A4E2D" stroke-width="1.5"/><path d="M65 14v18" stroke="#7A4E2D"/>
      <g class="kaart k1"><rect x="34" y="30" width="48" height="68" rx="5" fill="#FBF6E9" stroke="#9AA0A6" stroke-width="1.5"/><text x="40" y="44" font-size="11" font-weight="800" fill="#C8323C" font-family="sans-serif">7</text><path d="M58 56l7 9-7 9-7-9z" fill="#C8323C"/></g>
      <g class="kaart k2"><rect x="44" y="30" width="48" height="68" rx="5" fill="#FBF6E9" stroke="#9AA0A6" stroke-width="1.5"/><text x="50" y="44" font-size="11" font-weight="800" fill="#C8323C" font-family="sans-serif">9</text><path d="M68 56l7 9-7 9-7-9z" fill="#C8323C"/><path d="M68 78l4 5-4 5-4-5z" fill="#C8323C"/></g>
      <g class="kaart k3"><rect x="54" y="30" width="48" height="68" rx="5" fill="#FBF6E9" stroke="#9AA0A6" stroke-width="1.5"/><text x="60" y="44" font-size="11" font-weight="800" fill="#C8323C" font-family="sans-serif">A</text><path d="M78 54l11 14-11 14-11-14z" fill="#C8323C"/></g>
      <g class="pailletten"><path d="M38 96l16 20-16 20-16-20z" fill="#C8323C" stroke="#7E1E26" stroke-width="1.5"/>
        <g fill="#F28C9A"><circle cx="38" cy="104" r="1.8"/><circle cx="32" cy="112" r="1.8"/><circle cx="44" cy="112" r="1.8"/><circle cx="38" cy="118" r="1.8"/><circle cx="30" cy="120" r="1.6"/><circle cx="46" cy="120" r="1.6"/><circle cx="38" cy="127" r="1.8"/><circle cx="34" cy="124" r="1.4"/><circle cx="42" cy="124" r="1.4"/></g></g>
    </svg>`,
    hoed: `<svg viewBox="0 0 140 120" aria-hidden="true" focusable="false"><g transform="translate(70 8)">${PEG}</g>
      <g class="krul" fill="none" stroke="#1F1A17" stroke-width="5" stroke-linecap="round"><path d="M24 84q-5 5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9"/><path d="M32 84q-5 5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9q-5 4.5 0 8"/><path d="M40 84q-5 5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9"/><path d="M116 84q5 5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9"/><path d="M108 84q5 5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9q5 4.5 0 8"/><path d="M100 84q5 5 0 9.5q-5 4.5 0 9.5q5 4.5 0 9.5q-5 4.5 0 9"/></g>
      <path d="M44 72q-2-30 14-48q12-8 24 0q14 18 14 48z" fill="#8FA3B5" stroke="#4F6070" stroke-width="2" stroke-linejoin="round"/>
      <path d="M58 24q12 6 24 0" stroke="#4F6070" stroke-width="2" fill="none"/>
      <path d="M62 30q8 10 16 0" stroke="#A9BAC8" stroke-width="2" fill="none"/>
      <path d="M44 66q26 8 52 0v8q-26 8-52 0z" fill="#2E6B4E" stroke="#1E4A35" stroke-width="1.5"/>
      <path d="M48 70q22 6 44 0" stroke="#7FBF9E" stroke-width="1.5" stroke-dasharray="3 3" fill="none"/>
      <path d="M92 64q14-16 22-30" stroke="#5C3A21" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M114 34q-6 8-4 16q8-6 4-16z" fill="#2E8B62"/>
      <path d="M14 82q56-24 112 0q-10 12-56 12t-56-12z" fill="#7F93A6" stroke="#4F6070" stroke-width="2" stroke-linejoin="round"/>
      <path d="M26 82q44-16 88 0" stroke="#A9BAC8" stroke-width="2" fill="none"/>
    </svg>`,
    staf: `<svg viewBox="0 0 84 250" aria-hidden="true" focusable="false"><g transform="translate(42 6)">${PEG}</g>
      <path d="M42 10L30 64M42 10l12 54" stroke="#7A4E2D" stroke-width="3" stroke-linecap="round" fill="none"/>
      <g class="veren"><path d="M38 20q-14-14-12-26q8 8 14 24z" fill="#23252B"/><path d="M44 18q4-16 16-22q-4 12-12 24z" fill="#23252B"/><path d="M41 18q-2-14 4-22q2 10-1 22z" fill="#E9DFC4" stroke="#B5976A"/></g>
      <path d="M36 66h12v172q0 6-6 6t-6-6z" fill="#D9C9A8" stroke="#8C7350" stroke-width="1.6"/>
      <path d="M39 70v166" stroke="#F2E8D0" stroke-width="2" stroke-linecap="round"/>
      <g fill="#C9B58A" stroke="#8C7350" stroke-width="1.4"><ellipse cx="42" cy="92" rx="8" ry="4"/><ellipse cx="42" cy="122" rx="8" ry="4"/><ellipse cx="42" cy="152" rx="8" ry="4"/><ellipse cx="42" cy="182" rx="8" ry="4"/><ellipse cx="42" cy="212" rx="8" ry="4"/></g>
      <path d="M38 100q4 6 8 0M38 160q4 6 8 0M38 196q4 6 8 0" stroke="#A88E62" stroke-width="1.2" fill="none"/>
      <rect x="35" y="132" width="14" height="12" rx="2" fill="#5C3A21"/><path d="M35 136h14M35 140h14" stroke="#3A2416"/>
      <path d="M22 36q0-24 20-24t20 24q0 10-6 16v8H28v-8q-6-6-6-16z" fill="#E9DFC4" stroke="#8C7350" stroke-width="1.8" stroke-linejoin="round"/>
      <path d="M26 30q4-12 14-14" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity=".7"/>
      <path d="M30 22q4 4 2 8M52 20q-2 6 2 10" stroke="#B5976A" stroke-width="1.4" fill="none"/>
      <g class="ogen"><ellipse cx="33.5" cy="38" rx="6" ry="6.5" fill="#2A1D14"/><ellipse cx="50.5" cy="38" rx="6" ry="6.5" fill="#2A1D14"/></g>
      <path d="M42 44l-3.5 6h7z" fill="#2A1D14"/>
      <g class="kaak"><path d="M29 58h26v6q0 5-5 5H34q-5 0-5-5z" fill="#E9DFC4" stroke="#8C7350" stroke-width="1.6"/><path d="M33 58v8M37 58v9M41 58v9M45 58v9M49 58v9M53 58v7" stroke="#8C7350" stroke-width="1.1"/></g>
      <path d="M29 56h26" stroke="#8C7350" stroke-width="1.4"/><path d="M33 52v4M37 52v4M41 52v4M45 52v4M49 52v4M53 52v4" stroke="#8C7350" stroke-width="1.1"/>
    </svg>`,
    bril: `<svg viewBox="0 0 130 70" aria-hidden="true" focusable="false"><g transform="translate(65 8)">${PEG}</g>
      <defs><clipPath id="hb-l1"><circle cx="38" cy="40" r="20"/></clipPath><clipPath id="hb-l2"><circle cx="92" cy="40" r="20"/></clipPath></defs>
      <path d="M58 32q7-8 14 0" fill="none" stroke="#C99A2E" stroke-width="3"/>
      <path d="M18 36l-12-4M112 36l12-4" stroke="#C99A2E" stroke-width="3" stroke-linecap="round"/>
      <circle cx="38" cy="40" r="20" fill="#DCEBF5" fill-opacity=".55" stroke="#C99A2E" stroke-width="3.5"/>
      <circle cx="92" cy="40" r="20" fill="#DCEBF5" fill-opacity=".55" stroke="#C99A2E" stroke-width="3.5"/>
      <g class="glans"><rect x="10" y="10" width="10" height="70" fill="#fff" opacity=".85" transform="rotate(25 38 40)" clip-path="url(#hb-l1)"/><rect x="64" y="10" width="10" height="70" fill="#fff" opacity=".85" transform="rotate(25 92 40)" clip-path="url(#hb-l2)"/></g>
      <path d="M28 30q6-6 14-4" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/><path d="M82 30q6-6 14-4" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>
    </svg>`,
  };
  const PROPS = [
    { id: 'staf', b: 78, naam: 'Juan Martinez', rol: 'Fiesta de los Muertos', show: 'Toverland Halloween Nights', zin: '¡Bienvenidos a la fiesta!' },
    { id: 'kroon', b: 150, naam: 'Caspian Darius', rol: 'De God van Chaos', show: 'Graywood en de Geheime Goden van Ostarus en Gifgroeve', zin: 'Chaos!' },
    { id: 'stok', b: 64, naam: 'Erik Jacobs', rol: '', show: 'De Bokkenrijders', zin: 'Tik, tik.' },
    { id: 'kaarten', b: 124, naam: 'Roeter', rol: '', show: 'Wonderland', zin: 'Ruiten troef!' },
    { id: 'hoed', b: 140, naam: 'Hans Herzschlag', rol: 'Schlagerzanger', show: 'Voor feesten en partijen', zin: 'Prost!' },
    { id: 'bril', b: 124, naam: 'Callum', rol: '', show: 'Moonside', zin: 'Nog eentje aan de bar?' },
    { id: 'jas', b: 120, naam: 'Dorian Verstronden', rol: 'De zonde van luiheid', show: 'De Zonden van Groenhorst', zin: 'Vijf minuutjes nog...' },
  ];

  // ---------- stijl
  const stijl = document.createElement('style');
  stijl.id = 'hebbedingen-stijl';
  stijl.textContent = `
  .held { position: relative; }
  .sticker { position: absolute; z-index: 4; left: 0; top: 0; width: 120px; visibility: hidden; height: auto; --r: 5deg; transform: rotate(var(--r)); cursor: pointer; -webkit-user-select: none; user-select: none; -webkit-user-drag: none; }
  .sticker-ballon { position: absolute; z-index: 5; transform: translateX(-50%); background: var(--papier, #FBF6E9); color: var(--inkt, #1F2333); font-weight: 700; padding: .4rem .7rem; border-radius: 10px; box-shadow: 0 3px 0 rgba(0,0,0,.28); font-size: .95rem; pointer-events: none; white-space: nowrap; }
  .sticker-ballon::after { content: ""; position: absolute; left: 50%; top: -6px; width: 12px; height: 12px; background: inherit; transform: translateX(-50%) rotate(45deg); }
  .coulissen { margin-top: 3.5rem; position: relative; z-index: 1; }
  /* minder ruimte tussen het briefje en de kaarten */
  .held { margin-bottom: .6rem; }
  .rek-held { min-height: 11rem; }
  .haak-rij { padding-top: 2rem; gap: 3.2rem 1.8rem; }
  /* kaarten: elk een eigen kleur, een gekleurde kop met het icoon en een echte speelknop */
  .haak-rij .label { --kk: #C8323C; --kd: #8E1F28; }
  .haak-rij .label:not(.leeg) { filter: drop-shadow(0 6px 0 rgba(0,0,0,.28)); }
  .haak-rij .label:nth-child(6n+2) { --kk: #2F8BD6; --kd: #1E5E9A; }
  .haak-rij .label:nth-child(6n+3) { --kk: #E9A23B; --kd: #A86A1A; }
  .haak-rij .label:nth-child(6n+4) { --kk: #2E8B62; --kd: #1E5E42; }
  .haak-rij .label:nth-child(6n+5) { --kk: #7A4E9A; --kd: #523268; }
  .haak-rij .label:nth-child(6n+6) { --kk: #E8577A; --kd: #A8304E; }
  .haak-rij .label:not(.leeg) .label-kaart { display: flow-root; padding: 2.4rem 1.3rem 1.3rem; background: linear-gradient(var(--kk) 0, var(--kk) 6.6rem, var(--manila) 6.6rem); transition: transform .18s ease; }
  .haak-rij .label:not(.leeg) .label-kaart::after { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 6.6rem; background: repeating-linear-gradient(135deg, rgba(255,255,255,.13) 0 12px, transparent 12px 24px), radial-gradient(circle at 20% 110%, rgba(0,0,0,.18), transparent 60%); pointer-events: none; }
  .haak-rij .label:not(.leeg) .label-icoon { position: relative; z-index: 1; width: 5.2rem; height: 5.2rem; margin: 0 auto -.6rem; padding: .55rem; background: #FBF6E9; border-radius: 50%; box-shadow: 0 0 0 4px var(--kd), 0 5px 0 4px rgba(0,0,0,.25); }
  .haak-rij .label:not(.leeg) .soort { position: relative; z-index: 1; margin-top: 1.6rem; text-transform: uppercase; letter-spacing: .08em; font-size: .78rem; font-weight: 800; color: var(--kd); }
  .haak-rij .label:not(.leeg) .naam { color: var(--inkt); font-size: 1.85rem; }
  .haak-rij .label:not(.leeg) .doe { display: inline-flex; align-items: center; gap: .45rem; text-decoration: none; background: var(--kk); color: #fff; padding: .45rem .95rem; border-radius: 999px; box-shadow: 0 3px 0 var(--kd); font-weight: 800; }
  .haak-rij .label:not(.leeg) .doe::after { content: ""; width: 0; height: 0; border-left: .5rem solid #fff; border-top: .32rem solid transparent; border-bottom: .32rem solid transparent; }
  .haak-rij .label:not(.leeg) .label-kaart:hover .doe, .haak-rij .label:not(.leeg) .label-kaart:focus-visible .doe { background: var(--kd); }
  .haak-rij .label:not(.leeg) .label-kaart:hover .label-icoon { animation: kaartIcoon .5s ease; }
  @keyframes kaartIcoon { 30% { transform: rotate(-8deg) scale(1.08); } 60% { transform: rotate(6deg) scale(1.04); } }
  .haak-rij .label:not(.leeg) .label-kaart:focus-visible { outline: 3px solid var(--munt, #E9B949); outline-offset: -6px; }
  .haak-rij .label .stempel { background: #FBF6E9; }
  @media (prefers-reduced-motion: reduce) { .haak-rij .label:not(.leeg) .label-kaart:hover .label-icoon { animation: none; } }
  .coulissen-rij { display: block; position: relative; border-radius: 14px; padding: 2.2rem 3.6rem 2.4rem; overflow: hidden;
    background: radial-gradient(ellipse 80% 55% at 50% -8%, rgba(255,214,150,.22), transparent 70%), linear-gradient(to bottom, transparent 88%, #6E4626 88%, #5C3A21 94%, #4A2E1C 100%), linear-gradient(#2C1838, #170D20);
    box-shadow: inset 0 0 0 4px #4A0E16, inset 0 14px 0 #8E1F28, inset 0 18px 0 #E9B949, 0 8px 0 rgba(0,0,0,.35); }
  .coulissen-rij::before, .coulissen-rij::after { content: ""; position: absolute; top: 0; bottom: 0; width: 3.2rem; z-index: 2; pointer-events: none;
    background: repeating-linear-gradient(90deg, #6E1018 0 6px, #B82E3A 6px 14px, #8E1F28 14px 20px, #6E1018 20px 24px); }
  .coulissen-rij::before { left: 0; box-shadow: inset -10px 0 14px rgba(0,0,0,.45); border-radius: 14px 0 60% 14px / 14px 0 12% 14px; }
  .coulissen-rij::after { right: 0; box-shadow: inset 10px 0 14px rgba(0,0,0,.45); border-radius: 0 14px 14px 60% / 0 14px 14px 12%; }
  .coulissen .props { position: relative; z-index: 1; }
  .coulissen .prop-plek { position: relative; }
  .coulissen .prop-plek::before { content: ""; position: absolute; left: 50%; top: -2.2rem; width: 15rem; height: calc(100% + 2.6rem); transform: translateX(-50%); pointer-events: none; z-index: 0;
    background: radial-gradient(ellipse 42% 58% at 50% 34%, rgba(255,236,180,.32), rgba(255,220,150,.12) 55%, transparent 72%); }
  .coulissen .prop, .coulissen .kaartje { z-index: 1; }
  .coulissen .prop svg { filter: drop-shadow(0 0 1.5px rgba(255,243,196,.9)) drop-shadow(0 0 12px rgba(255,214,150,.35)) drop-shadow(0 6px 0 rgba(0,0,0,.5)); }
  .coulissen .kaartje { box-shadow: 0 0 0 1px rgba(0,0,0,.2), 0 4px 0 rgba(0,0,0,.45), 0 0 18px rgba(255,214,150,.25); }
  .coulissen .kaartje::after { background: #2C1838; }
  @media (max-width: 640px) { .coulissen-rij { padding: 1.8rem 1.8rem 2rem; } .coulissen-rij::before, .coulissen-rij::after { width: 1.4rem; } .coulissen .prop-plek::before { width: 10rem; } }
  .rek.verspreid { position: absolute; left: 0; top: 0; width: 100%; pointer-events: none; z-index: 0; }
  .props { display: flex; flex-wrap: wrap; justify-content: space-around; align-items: flex-start; gap: 2.2rem 1.2rem; padding-top: 1.4rem; --s: 1; }
  .prop-plek { margin: 0; display: flex; flex-direction: column; align-items: center; }
  .prop { display: block; width: calc(var(--b) * var(--s) * 1px); padding: 0; border: 0; background: none; cursor: pointer; transform-origin: 50% 4px; -webkit-tap-highlight-color: transparent; position: relative; }
  .prop .in { display: block; transform-origin: 50% 4px; }
  .prop svg { display: block; width: 100%; height: auto; overflow: visible; filter: drop-shadow(0 5px 0 rgba(0,0,0,.25)); }
  .prop:focus-visible { outline: 3px solid var(--munt, #E9B949); outline-offset: 4px; border-radius: 8px; }
  .kaartje { position: relative; transform-origin: 50% -.9rem; margin-top: .9rem; background: var(--manila, #F2DDA0); color: var(--inkt, #1F2333); border-radius: 4px 4px 6px 6px; padding: .45rem .7rem .4rem; max-width: 12.5rem; text-align: center; box-shadow: 0 3px 0 rgba(0,0,0,.25); --r: -2deg; transform: rotate(var(--r)); line-height: 1.25; }
  .kaartje::before { content: ""; position: absolute; left: 50%; top: -.9rem; width: 2px; height: .9rem; background: #D9CFB8; }
  .kaartje::after { content: ""; position: absolute; left: calc(50% - 4px); top: .25rem; width: 8px; height: 8px; border-radius: 50%; background: var(--bord, #2F4C8F); }
  .kaartje b { display: block; margin-top: .45rem; font-size: 1rem; }
  .kaartje span { display: block; font-size: .78rem; color: var(--zacht, #5E5643); }
  .prop-ballon { position: absolute; left: 50%; top: -1.6rem; transform: translateX(-50%); background: var(--papier, #FBF6E9); color: var(--inkt, #1F2333); font-weight: 800; font-size: .9rem; padding: .2rem .6rem; border-radius: 8px; box-shadow: 0 2px 0 rgba(0,0,0,.28); white-space: nowrap; pointer-events: none; z-index: 6; }
  .zzz { position: absolute; z-index: 30; pointer-events: none; font-family: 'Bricolage Grotesque', system-ui, sans-serif; font-weight: 800; color: #DCE4F5; text-shadow: 0 2px 0 rgba(0,0,0,.4); }
  .vonk { position: fixed; width: 6px; height: 6px; border-radius: 50%; background: #6CF2A3; box-shadow: 0 0 8px #4BE38A; pointer-events: none; z-index: 30; }
  @media (max-width: 640px) { .props { --s: .72; gap: 1.6rem .6rem; } .kaartje { max-width: 9.5rem; padding: .35rem .5rem; } .kaartje b { font-size: .88rem; } .sticker-ballon { font-size: .82rem; } }
  `;
  document.head.appendChild(stijl);

  // ---------- de sticker
  const held = document.querySelector('.held') || document.body;
  if (!document.querySelector('.sticker')) {
    const img = document.createElement('img');
    img.className = 'sticker'; img.src = 'ruben-sticker.webp'; img.alt = 'Ruben'; img.width = 380; img.height = 511; img.draggable = false;
    img.addEventListener('error', () => img.remove());
    held.prepend(img);
    // de sticker plakt net op het eind van de onderste tape van het logo
    const plaats = () => {
      const tapes = [...document.querySelectorAll('.held h1 .tape')];
      const hr = held.getBoundingClientRect(), vw = document.documentElement.clientWidth;
      if (!tapes.length) { img.style.left = (hr.width - 130) + 'px'; img.style.visibility = 'visible'; return; }
      let rechts = 0, boven = Infinity;
      tapes.forEach(t => { const r = t.getBoundingClientRect(); rechts = Math.max(rechts, r.right); boven = Math.min(boven, r.top); });
      const fs = parseFloat(getComputedStyle(tapes[tapes.length - 1]).fontSize) || 40;
      // zo groot als past: liefst ruim twee keer de letterhoogte, nooit over de letters en nooit buiten beeld
      const ruimte = vw - 8 - (rechts - fs * 0.1);
      const w = Math.round(Math.max(52, Math.min(180, fs * 2.05, ruimte / 1.12)));
      let links = rechts - hr.left - fs * 0.1;
      if (hr.left + links + w * 1.12 > vw - 4) links = vw - 4 - w * 1.12 - hr.left;
      img.style.width = w + 'px'; img.style.left = Math.round(links) + 'px'; img.style.top = Math.round(boven - hr.top - fs * 0.3) + 'px';
      img.style.visibility = 'visible';
    };
    plaats();
    window.addEventListener('resize', plaats);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { plaats(); if (window.gereedschapBouw) window.gereedschapBouw(); });
    img.addEventListener('load', plaats);
    const ZINNEN = ['Hoi! Ik ben Ruben.', 'Welkom in mijn rommelhoekje!', 'Niet zo hard prikken, ik plak er net.', 'Speel je een potje mee?'];
    let z = 0, ballon = null;
    img.addEventListener('click', () => {
      if (!reduce && img.animate) img.animate([{ transform: 'rotate(var(--r)) scale(1)' }, { transform: 'rotate(-3deg) scale(1.08)' }, { transform: 'rotate(var(--r)) scale(1)' }], { duration: 500, easing: 'cubic-bezier(.3,1.6,.5,1)' });
      if (ballon) ballon.remove();
      ballon = document.createElement('div'); ballon.className = 'sticker-ballon'; ballon.textContent = ZINNEN[z++ % ZINNEN.length];
      ballon.style.left = (img.offsetLeft + img.offsetWidth / 2) + 'px'; ballon.style.top = (img.offsetTop + img.offsetHeight + 8) + 'px';
      held.appendChild(ballon);
      const b = ballon; setTimeout(() => { if (b === ballon) { b.remove(); ballon = null; } }, 2600);
      toon(660, 0, 0.1, 'triangle', 0.04); toon(880, 0.08, 0.14, 'triangle', 0.04);
    });
  }

  // ---------- uit de coulissen
  const sectie = document.createElement('section');
  sectie.className = 'coulissen'; sectie.setAttribute('aria-label', 'Uit de coulissen');
  sectie.innerHTML = `<h2><span>Uit de coulissen</span></h2>
    <div class="coulissen-rij">
      <div class="props">${PROPS.map(p => `<figure class="prop-plek"><button class="prop" type="button" data-prop="${p.id}" aria-label="${p.naam}, ${p.show}" style="--b:${p.b}"><span class="in">${SVG[p.id]}</span></button><figcaption class="kaartje"><b>${p.naam}</b>${p.rol ? `<span>${p.rol}</span>` : ''}<span><i>${p.show}</i></span></figcaption></figure>`).join('')}</div>
    </div>`;
  const rij = document.querySelector('.haak-rij'), main = document.querySelector('main');
  if (rij) rij.after(sectie); else if (main) main.appendChild(sectie); else document.body.appendChild(sectie);

  const $p = id => sectie.querySelector(`[data-prop="${id}"]`);
  const binnen = id => $p(id).querySelector('.in');
  const anim = (el, frames, opt) => (reduce || !el.animate ? null : el.animate(frames, opt));
  const wacht = ms => new Promise(r => setTimeout(r, ms));
  const bezig = new Set();
  function ballon(id, t) {
    const k = $p(id), oud = k.querySelector('.prop-ballon'); if (oud) oud.remove();
    const s = document.createElement('span'); s.className = 'prop-ballon'; s.textContent = t; k.appendChild(s);
    setTimeout(() => s.remove(), 1700);
  }
  const DOEN = {
    // Dorian: de zonde van luiheid. De jas zakt langzaam in slaap, en er komen Zzz'jes uit
    jas: async () => {
      if (bezig.has('jas')) return; bezig.add('jas');
      for (let i = 0; i < 3; i++) { toon(110, i * 1.1, 0.8, 'sine', 0.05, 82); toon(165, i * 1.1 + 0.55, 0.45, 'triangle', 0.025, 220); }
      const k = $p('jas'), r = k.getBoundingClientRect();
      anim(binnen('jas'), [{ transform: 'rotate(0)' }, { transform: 'rotate(7deg)', offset: .25 }, { transform: 'rotate(5deg)', offset: .5 }, { transform: 'rotate(8deg)', offset: .75 }, { transform: 'rotate(0)' }], { duration: 3400, easing: 'ease-in-out' });
      const das = k.querySelector('.das'); das.style.transformBox = 'fill-box'; das.style.transformOrigin = '50% 0';
      anim(das, [{ transform: 'rotate(0)' }, { transform: 'rotate(14deg)', offset: .5 }, { transform: 'rotate(0)' }], { duration: 3400, easing: 'ease-in-out' });
      if (!reduce) for (let i = 0; i < 4; i++) {
        const z = document.createElement('span'); z.className = 'zzz'; z.textContent = 'Z'; z.style.left = (r.left + r.width * 0.62) + 'px'; z.style.top = (r.top + r.height * 0.18 + scrollY) + 'px'; z.style.fontSize = (14 + i * 5) + 'px';
        document.body.appendChild(z);
        z.animate([{ transform: 'translate(0,0) rotate(-10deg)', opacity: 0 }, { opacity: 1, offset: .2 }, { transform: `translate(${30 + i * 12}px, ${-60 - i * 14}px) rotate(12deg)`, opacity: 0 }], { duration: 2000, delay: i * 650, easing: 'ease-out', fill: 'both' }).onfinish = () => z.remove();
      }
      ballon('jas', 'Vijf minuutjes nog...');
      await wacht(3400); bezig.delete('jas');
    },
    // Caspian: groene chaosvonken
    kroon: async () => {
      const k = $p('kroon'), r = k.getBoundingClientRect();
      [110, 116.5, 155.6].forEach(f => toon(f, 0, 1.3, 'sawtooth', 0.025));
      toon(880, 0.15, 0.6, 'sine', 0.03, 1760);
      const gl = k.querySelector('.gloed');
      anim(gl, [{ opacity: 0 }, { opacity: 1, offset: .3 }, { opacity: 0 }], { duration: 1400 });
      anim(k.querySelector('svg'), [{ filter: 'drop-shadow(0 5px 0 rgba(0,0,0,.25))' }, { filter: 'drop-shadow(0 0 18px #4BE38A)', offset: .3 }, { filter: 'drop-shadow(0 5px 0 rgba(0,0,0,.25))' }], { duration: 1400 });
      if (!reduce) for (let i = 0; i < 26; i++) {
        const v = document.createElement('span'); v.className = 'vonk';
        const x = r.left + r.width / 2 + (Math.random() - .5) * r.width * .6, y = r.top + r.height * .55;
        v.style.left = x + 'px'; v.style.top = y + 'px'; document.body.appendChild(v);
        const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 90;
        v.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d - 30}px) scale(.3)`, opacity: 0 }], { duration: 700 + Math.random() * 700, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = () => v.remove();
      }
      ballon('kroon', 'Chaos!');
    },
    // Erik: de wandelstok draait een rondje en tikt
    stok: async () => {
      if (bezig.has('stok')) return; bezig.add('stok');
      const a = anim(binnen('stok'), [{ transform: 'rotate(0)' }, { transform: 'rotate(-25deg)', offset: .2 }, { transform: 'rotate(335deg)', offset: .8 }, { transform: 'rotate(360deg)' }], { duration: 1000, easing: 'ease-in-out' });
      if (a) await a.finished;
      for (let i = 0; i < 2; i++) { toon(1200, i * 0.22, 0.05, 'square', 0.04); toon(300, i * 0.22, 0.08, 'triangle', 0.05); }
      ballon('stok', 'Tik, tik.');
      bezig.delete('stok');
    },
    // Roeter: de kaarten waaieren uit en de pailletten schitteren
    kaarten: async () => {
      if (bezig.has('kaarten')) return; bezig.add('kaarten');
      for (let i = 0; i < 6; i++) toon(500 + Math.random() * 900, i * 0.05, 0.03, 'square', 0.02);
      const k = $p('kaarten');
      [['k1', -28], ['k2', 0], ['k3', 28]].forEach(([c, h], i) => { const el = k.querySelector('.' + c); el.style.transformBox = 'view-box'; el.style.transformOrigin = '68px 96px'; anim(el, [{ transform: 'rotate(0)' }, { transform: `rotate(${h}deg) translateY(-6px)`, offset: .5 }, { transform: 'rotate(0)' }], { duration: 900, delay: i * 60, easing: 'ease-in-out' }); });
      k.querySelectorAll('.pailletten circle').forEach((c, i) => anim(c, [{ fill: '#F28C9A' }, { fill: '#FFF3C4' }, { fill: '#F28C9A' }], { duration: 300, delay: i * 60, iterations: 2 }));
      ballon('kaarten', 'Ruiten troef!');
      await wacht(950); bezig.delete('kaarten');
    },
    // Hans: hoedje omhoog en een schlagerdeuntje
    hoed: async () => {
      if (bezig.has('hoed')) return; bezig.add('hoed');
      const bas = [98, 147, 110, 147, 98, 147, 130.8, 147], mel = [392, 0, 440, 494, 523, 0, 494, 440];
      bas.forEach((f, i) => { toon(f, i * 0.2, 0.18, 'triangle', 0.05); if (mel[i]) toon(mel[i], i * 0.2 + 0.1, 0.16, 'square', 0.02); });
      anim(binnen('hoed'), [{ transform: 'translateY(0) rotate(0)' }, { transform: 'translateY(-26px) rotate(-12deg)', offset: .3 }, { transform: 'translateY(-26px) rotate(12deg)', offset: .55 }, { transform: 'translateY(0) rotate(0)', offset: .8 }, { transform: 'translateY(-6px) rotate(-3deg)', offset: .9 }, { transform: 'translateY(0) rotate(0)' }], { duration: 1500, easing: 'ease-in-out' });
      ballon('hoed', 'Prost!');
      await wacht(1600); bezig.delete('hoed');
    },
    // Juan: de ogen gloeien, de kaak klappert en er vliegen goudsbloemblaadjes
    staf: async () => {
      if (bezig.has('staf')) return; bezig.add('staf');
      const k = $p('staf'), r = k.getBoundingClientRect();
      [523, 659, 784, 1047, 784, 1047].forEach((f, i) => toon(f, i * 0.11, 0.16, 'square', 0.03));
      [262, 330, 392].forEach(f => toon(f, 0.66, 0.5, 'triangle', 0.035));
      k.querySelectorAll('.ogen ellipse').forEach(e => anim(e, [{ fill: '#2A1D14' }, { fill: '#F2A93B', offset: .2 }, { fill: '#F2A93B', offset: .8 }, { fill: '#2A1D14' }], { duration: 1600 }));
      anim(k.querySelector('svg'), [{ filter: 'drop-shadow(0 5px 0 rgba(0,0,0,.25))' }, { filter: 'drop-shadow(0 0 14px #F2A93B)', offset: .25 }, { filter: 'drop-shadow(0 5px 0 rgba(0,0,0,.25))' }], { duration: 1600 });
      const kaak = k.querySelector('.kaak');
      anim(kaak, [{ transform: 'translateY(0)' }, { transform: 'translateY(4px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(4px)' }, { transform: 'translateY(0)' }, { transform: 'translateY(4px)' }, { transform: 'translateY(0)' }], { duration: 900 });
      if (!reduce) for (let i = 0; i < 22; i++) {
        const v = document.createElement('span'); v.className = 'vonk';
        v.style.background = ['#F2A93B', '#E8702A', '#F6CB2F', '#C8323C'][i % 4]; v.style.boxShadow = 'none'; v.style.borderRadius = '60% 40% 60% 40%'; v.style.width = v.style.height = (6 + Math.random() * 5) + 'px';
        v.style.left = (r.left + r.width / 2) + 'px'; v.style.top = (r.top + r.height * .14) + 'px'; document.body.appendChild(v);
        const a = -Math.PI / 2 + (Math.random() - .5) * 2.4, d = 60 + Math.random() * 90;
        v.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 140}px) rotate(${Math.random() * 540}deg)`, opacity: 0 }], { duration: 1300 + Math.random() * 700, easing: 'cubic-bezier(.2,.6,.4,1)' }).onfinish = () => v.remove();
      }
      ballon('staf', '¡Bienvenidos a la fiesta!');
      await wacht(1600); bezig.delete('staf');
    },
    // Callum: een glinstering over de glazen
    bril: async () => {
      if (bezig.has('bril')) return; bezig.add('bril');
      toon(1568, 0, 0.25, 'sine', 0.04); toon(2349, 0.08, 0.3, 'sine', 0.03);
      const gl = $p('bril').querySelector('.glans');
      anim(gl, [{ transform: 'translateX(-40px)' }, { transform: 'translateX(60px)' }], { duration: 700, easing: 'ease-in-out' });
      ballon('bril', 'Nog eentje aan de bar?');
      await wacht(800); bezig.delete('bril');
    },
  };
  sectie.addEventListener('click', e => { const b = e.target.closest('[data-prop]'); if (b && DOEN[b.dataset.prop]) DOEN[b.dataset.prop](); });

  // het gereedschap hangt verspreid over de hele pagina: een paar in het rek bij de titel, de rest los
  const heldRek = document.getElementById('rek-held');
  if (heldRek) heldRek.dataset.gereedschap = 'zaag,hamer,tang';
  const overal = document.createElement('div');
  overal.className = 'rek verspreid'; overal.id = 'rek-overal'; overal.setAttribute('aria-hidden', 'true');
  overal.dataset.gereedschap = 'waterpas,boor,verfroller,schroevendraaier,klem,plakband,rolmaat,beitel,ijzerzaag,steeksleutel,kwast,schaar,duimstok';
  document.body.appendChild(overal);
  const zetHoogte = () => { overal.style.height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) + 'px'; };
  zetHoogte(); addEventListener('resize', zetHoogte);
  // het gereedschap opnieuw ophangen nu er een plank en sticker bij zijn
  if (window.gereedschapBouw) setTimeout(window.gereedschapBouw, 60);
})();

})();
;(function () {
(function () {
  // GRAPJES: verborgen grapjes op het rommelhoekje. Geen teller, geen hints: wie ze vindt, vindt ze.
  if (window.Grapjes) return;
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opHome = !!document.querySelector('.haak-rij');

  const stijl = document.createElement('style');
  stijl.textContent = `
    .gr-vallen { position: fixed; top: -40px; z-index: 9998; pointer-events: none; }
    .gr-groot { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 9998; pointer-events: none; font-family: "Bricolage Grotesque", system-ui, sans-serif; font-weight: 800; font-size: clamp(3rem, 14vw, 9rem); color: #F6CB2F; text-shadow: 0 6px 0 #C8323C, 0 12px 0 #2E8B62; }
    dialog.gr-boek { border: 0; border-radius: 12px; padding: 1.2rem 1.3rem; background: #F2DDA0; color: #1F2333; max-width: min(28rem, 94vw); font-family: "Bricolage Grotesque", system-ui, sans-serif; box-shadow: 0 6px 0 rgba(0,0,0,.35); }
    dialog.gr-boek::backdrop { background: rgba(10,14,30,.7); }
    .gr-boek h2 { margin: 0 0 .4rem; } .gr-boek ul { list-style: none; padding: 0; margin: .6rem 0; }
    .gr-boek li { display: flex; gap: .6rem; align-items: center; padding: .35rem 0; border-bottom: 1px solid #D9BE78; }
    .gr-boek li small { display: block; color: #5E5643; }
    .gr-boek button { font: inherit; font-weight: 700; border: 0; border-radius: 6px; padding: .5rem 1rem; background: #C8323C; color: #fff; cursor: pointer; }
    .gr-gat { position: absolute; width: 34px; height: 20px; border-radius: 17px 17px 0 0; background: #0E1630; box-shadow: inset 0 4px 0 #070B18; z-index: 2; cursor: pointer; }
    .gr-muis { position: absolute; left: 6px; bottom: 0; width: 22px; height: 14px; transform: translateY(14px); transition: transform .35s ease; }
    .gr-gat.uit .gr-muis { transform: translateY(2px); }
    .gr-gat { overflow: hidden; }
    .gr-uil { position: absolute; z-index: 3; width: 56px; cursor: pointer; }
    .gr-ballon { position: absolute; z-index: 4; background: #FBF6E9; color: #1F2333; font-family: "Bricolage Grotesque", system-ui, sans-serif; font-weight: 700; font-size: .9rem; padding: .3rem .6rem; border-radius: 8px; box-shadow: 0 2px 0 rgba(0,0,0,.3); white-space: nowrap; pointer-events: none; }
    .gr-vlaggen { position: fixed; left: 0; right: 0; top: 0; height: 34px; z-index: 50; pointer-events: none; }
    @keyframes gr-schud { 10%, 50%, 90% { transform: translate(-6px, 2px); } 30%, 70% { transform: translate(6px, -2px); } }
  `;
  document.head.appendChild(stijl);

  // ---------- geluidje
  let ac = null;
  function toon(f, t0, d, type, v) { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + (t0 || 0); o.type = type || 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(v || 0.05, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d + 0.05); } catch (e) {} }
  
  const boek = document.createElement('dialog'); boek.className = 'gr-boek';
  document.body.appendChild(boek);
  const vind = () => {};

  // ---------- vlaaienregen
  const VLAAI = '<svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#C98A43" stroke="#7A4E2D" stroke-width="2"/><circle cx="20" cy="20" r="13" fill="#A8162B"/><path d="M8 20h24M20 8v24M11 11l18 18M29 11L11 29" stroke="#E0B07A" stroke-width="2"/><circle cx="20" cy="20" r="3" fill="#E0B07A"/></svg>';
  function regen(html, n) {
    for (let i = 0; i < (reduce ? 6 : n); i++) {
      const v = document.createElement('div'); v.className = 'gr-vallen'; v.innerHTML = html;
      v.style.left = (Math.random() * 96) + 'vw'; document.body.appendChild(v);
      const duur = 2200 + Math.random() * 1600, draai = (Math.random() - 0.5) * 720;
      if (v.animate) v.animate([{ transform: 'translateY(0) rotate(0)' }, { transform: `translateY(${innerHeight + 80}px) rotate(${draai}deg)` }], { duration: duur, delay: Math.random() * 900, easing: 'ease-in', fill: 'both' }).onfinish = () => v.remove();
      else setTimeout(() => v.remove(), 3000);
    }
  }
  function confetti() {
    const kl = ['#C8323C', '#F6CB2F', '#2E8B62'];
    for (let i = 0; i < (reduce ? 10 : 90); i++) regen(`<span style="display:block;width:9px;height:14px;background:${kl[i % 3]};border-radius:2px"></span>`, 1);
  }
  function grootWoord(t) { const g = document.createElement('div'); g.className = 'gr-groot'; g.textContent = t; document.body.appendChild(g); if (g.animate) g.animate([{ transform: 'scale(.3)', opacity: 0 }, { transform: 'scale(1.1)', opacity: 1, offset: .35 }, { transform: 'scale(1)', opacity: 1, offset: .8 }, { opacity: 0 }], { duration: 2000 }).onfinish = () => g.remove(); else setTimeout(() => g.remove(), 1800); }

  // ---------- typen
  let getypt = '';
  document.addEventListener('keydown', e => {
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key.length !== 1) return;
    getypt = (getypt + e.key.toLowerCase()).slice(-14);
    if (getypt.endsWith('vlaai')) { regen(VLAAI, 34); [523, 659, 784].forEach((f, i) => toon(f, i * 0.12, 0.25)); vind('vlaai'); getypt = ''; }
    else if (getypt.endsWith('alaaf')) { confetti(); grootWoord('Alaaf!'); [392, 523, 659, 784, 659, 784].forEach((f, i) => toon(f, i * 0.13, 0.22, 'square', 0.03)); vind('alaaf'); getypt = ''; }
    else if (getypt.endsWith('ejkeohlemmor')) {
      getypt = ''; vind('spiegel');
      document.documentElement.style.transition = 'transform .6s ease'; document.documentElement.style.transform = 'scaleX(-1)';
      setTimeout(() => { document.documentElement.style.transform = ''; setTimeout(() => { document.documentElement.style.transition = ''; }, 700); }, 3500);
    }
  });

  // ---------- klik-reeksen
  const tellers = {};
  function tel(id, nodig, venster) { const nu = Date.now(), t = (tellers[id] || []).filter(x => nu - x < venster); t.push(nu); tellers[id] = t; if (t.length >= nodig) { tellers[id] = []; return true; } return false; }
  document.addEventListener('click', e => {
    const st = e.target.closest && e.target.closest('.sticker');
    if (st && tel('sticker', 10, 8000)) {
      vind('sticker');
      if (!reduce && st.animate) st.animate([{ transform: 'rotate(var(--r)) scale(1)' }, { transform: 'rotate(360deg) scale(1.4)', offset: .5 }, { transform: 'rotate(720deg) scale(1)' }], { duration: 1200, easing: 'ease-in-out' });
      const b = document.createElement('div'); b.className = 'gr-ballon'; b.textContent = 'Oké, oké! Je mag me hebben.'; const r = st.getBoundingClientRect(); b.style.left = (r.left + scrollX - 40) + 'px'; b.style.top = (r.bottom + scrollY + 6) + 'px'; document.body.appendChild(b); setTimeout(() => b.remove(), 2800);
    }
    const ham = e.target.closest && e.target.closest('.gs-hamer');
    if (ham && tel('hamer', 6, 3500)) {
      vind('duim'); toon(110, 0, 0.3, 'square', 0.06); toon(90, 0.08, 0.3, 'square', 0.05);
      if (!reduce) document.body.style.animation = 'gr-schud .5s'; setTimeout(() => { document.body.style.animation = ''; }, 520);
      grootWoord('Au!');
    }
    const ver = e.target.closest && e.target.closest('.versie');
    if (ver && tel('versie', 5, 3000)) {
      vind('bouwplaats');
      boek.innerHTML = `<h2>De geheime bouwplaats</h2><p>Welkom achter de schermen van het rommelhoekje. Een paar eerlijke cijfers:</p><ul><li>Vlaaien gegeten tijdens het bouwen: 37</li><li>Kopjes koffie: veel te veel</li><li>Keren dat Harrie zijn sok kwijt was: 15</li><li>Gereedschap dat over de kop is geslagen: ${Math.floor(Date.now() / 86400000) % 900 + 120}</li><li>Rommelbeesten die op een theepot lijken: 2</li></ul><button type="button">Terug naar de voorkant</button>`;
      boek.querySelector('button').addEventListener('click', () => boek.close()); boek.showModal();
    }
  });

  // ---------- alleen op de homepage: het muisje, de nachtuil en de elfde van de elfde
  function homepage() {
    if (!opHome) return;
    const main = document.querySelector('main') || document.body;
    // muizengat onder aan de pagina
    const gat = document.createElement('div'); gat.className = 'gr-gat'; gat.setAttribute('aria-label', 'Een muizengaatje'); gat.setAttribute('role', 'button'); gat.tabIndex = 0;
    gat.innerHTML = '<svg class="gr-muis" viewBox="0 0 22 14" aria-hidden="true"><ellipse cx="11" cy="10" rx="9" ry="6" fill="#9AA0A6"/><circle cx="5" cy="5" r="3" fill="#C9CED6"/><circle cx="17" cy="5" r="3" fill="#C9CED6"/><circle cx="8" cy="9" r="1.2" fill="#1F2333"/><circle cx="14" cy="9" r="1.2" fill="#1F2333"/><circle cx="11" cy="12" r="1.3" fill="#E8577A"/></svg>';
    const zetGat = () => { const voet = document.querySelector('footer') || main; const r = voet.getBoundingClientRect(); gat.style.left = Math.max(10, r.right + scrollX - 70) + 'px'; gat.style.top = (r.top + scrollY - 20) + 'px'; };
    document.body.appendChild(gat); zetGat(); addEventListener('resize', zetGat); setTimeout(zetGat, 1500);
    let uit = false;
    const kijk = () => { uit = true; gat.classList.add('uit'); setTimeout(() => { uit = false; gat.classList.remove('uit'); }, 2600); setTimeout(kijk, 9000 + Math.random() * 12000); };
    setTimeout(kijk, 5000 + Math.random() * 6000);
    const pak = () => { if (!uit) return; vind('muis'); toon(2200, 0, 0.08, 'sine', 0.05); toon(2600, 0.08, 0.08, 'sine', 0.05); gat.classList.remove('uit'); uit = false; const b = document.createElement('div'); b.className = 'gr-ballon'; b.textContent = 'Piep!'; b.style.left = (parseFloat(gat.style.left) - 40) + 'px'; b.style.top = (parseFloat(gat.style.top) - 30) + 'px'; document.body.appendChild(b); setTimeout(() => b.remove(), 2000); };
    gat.addEventListener('click', pak); gat.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') pak(); });
    // nachtuil tussen middernacht en vijf uur
    const uur = new Date().getHours();
    if (uur < 5) {
      const uil = document.createElement('div'); uil.className = 'gr-uil'; uil.setAttribute('role', 'button'); uil.tabIndex = 0; uil.setAttribute('aria-label', 'Een uil');
      uil.innerHTML = '<svg viewBox="0 0 56 64" aria-hidden="true"><path d="M8 20l6-14 8 10h12l8-10 6 14v26q0 14-20 14T8 46z" fill="#8C6A44" stroke="#3A2414" stroke-width="2.5"/><ellipse cx="28" cy="46" rx="12" ry="11" fill="#E8D5A8"/><circle cx="19" cy="27" r="8" fill="#FBF6E9" stroke="#3A2414" stroke-width="2"/><circle cx="37" cy="27" r="8" fill="#FBF6E9" stroke="#3A2414" stroke-width="2"/><circle cx="20" cy="28" r="4" fill="#1F2333"/><circle cx="36" cy="28" r="4" fill="#1F2333"/><path d="M25 34l3 5 3-5z" fill="#E9B949"/><path d="M20 58v4M36 58v4" stroke="#E9B949" stroke-width="3"/></svg>';
      const held = document.querySelector('.held') || main; const r = held.getBoundingClientRect(); uil.style.left = (r.left + scrollX + Math.min(r.width - 70, 460)) + 'px'; uil.style.top = (r.top + scrollY + 150) + 'px';
      document.body.appendChild(uil);
      const oehoe = () => { vind('uil'); toon(392, 0, 0.35, 'sine', 0.06); toon(330, 0.4, 0.5, 'sine', 0.06); const b = document.createElement('div'); b.className = 'gr-ballon'; b.textContent = 'Oehoe! Jij bent ook laat op, hè?'; b.style.left = (parseFloat(uil.style.left) - 60) + 'px'; b.style.top = (parseFloat(uil.style.top) - 34) + 'px'; document.body.appendChild(b); setTimeout(() => b.remove(), 3000); };
      uil.addEventListener('click', oehoe); uil.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') oehoe(); });
    }
    // de elfde van de elfde: vlaggetjes in rood, geel en groen
    const d = new Date();
    if (d.getMonth() === 10 && d.getDate() === 11) {
      const v = document.createElement('div'); v.className = 'gr-vlaggen';
      let svg = '<svg width="100%" height="34" preserveAspectRatio="none" viewBox="0 0 1000 34" aria-hidden="true"><path d="M0 4Q500 22 1000 4" stroke="#F2DDA0" stroke-width="2" fill="none"/>';
      for (let i = 0; i < 40; i++) { const x = i * 25 + 5, y = 4 + Math.sin(Math.PI * x / 1000) * 14; svg += `<path d="M${x} ${y.toFixed(1)}l14 0l-7 16z" fill="${['#C8323C', '#F6CB2F', '#2E8B62'][i % 3]}"/>`; }
      v.innerHTML = svg + '</svg>'; document.body.appendChild(v);
      setTimeout(() => { grootWoord('Alaaf!'); vind('elfelf'); }, 1200);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', homepage); else homepage();

  // ---------- voor wie in de console kijkt
  try { console.log('%cHé, nieuwsgierig aagje!', 'font: 800 20px sans-serif; color: #C8323C'); console.log('%cHier valt niks te zien. Of toch wel?', 'font: 600 13px sans-serif; color: #2F4C8F'); } catch (e) {}
  window.Grapjes = true;
})();

})();
