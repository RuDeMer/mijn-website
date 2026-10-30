// De service worker van Ruben's rommelhoekje (koppelen 2.0, fase 3, 30 oktober 2026).
// Pagina's die je al eens opende, werken ook zonder internet, en wat een spel nog niet kon versturen, gaat mee zodra de verbinding
// terug is (Background Sync: in Chrome en op Android, ook als de pagina dicht is; in Safari bij het volgende bezoek).
// - Pagina's, de scripts van de site, instellingen.json en het manifest: eerst het internet (met een snelle controle: GitHub antwoordt
//   dan "niet veranderd"), en na 3 seconden of zonder verbinding de bewaarde versie. Zo kom je nooit vast te zitten op een oude versie.
// - Plaatjes, geluiden, lettertypes, three.js en Planck (vaste versies met SRI): uit de opslag, en op de achtergrond verversen.
// - De scoreserver en de andere servers: nooit bewaard. De werkplaats (alles wat met werkplaats begint) laat hij met rust: die heeft
//   een eigen service worker.
// - Alleen wat je opende, wordt bewaard (hooguit 80 pagina's en 300 andere bestanden), niet vooraf de hele site.
// NOODSTOP: zet UIT op true en zet dit bestand online. Bij het volgende bezoek ruimt hij dan zijn opslag op en gaat alles weer gewoon
// via internet: hij blijft aangemeld, maar doet niets meer. (De browser kijkt bij elk bezoek of dit bestand veranderd is.)
const UIT = false;
const PAGINAS = 'rh-paginas-v1', VAST = 'rh-vast-v1', MAX_PAGINAS = 80, MAX_VAST = 300, WACHT = 3000;
const BUITEN = ['https://cdnjs.cloudflare.com/', 'https://fonts.gstatic.com/'];

self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil((async () => {
  const namen = await caches.keys();
  for (const n of namen) if (n.startsWith('rh-') && (UIT || (n !== PAGINAS && n !== VAST))) await caches.delete(n);
  await self.clients.claim();
})()));

// wat hoort bij de site (en niet bij de werkplaats)
const opDeSite = url => url.origin === self.location.origin && !url.href.slice(self.registration.scope.length).startsWith('werkplaats');
const isPagina = (req, url) => req.mode === 'navigate' || /\.html$/.test(url.pathname) || url.pathname.endsWith('/');
const isVers = url => /\.(js|json|webmanifest)$/.test(url.pathname);

self.addEventListener('fetch', e => {
  if (UIT) return;
  const req = e.request; if (req.method !== 'GET' || req.headers.has('range')) return;
  let url; try { url = new URL(req.url); } catch (x) { return; }
  if (opDeSite(url)) {
    if (url.pathname.endsWith('/rommelhoekje-sw.js')) return;
    if (isPagina(req, url)) return e.respondWith(eerstInternet(e, req, url, true));
    if (isVers(url)) return e.respondWith(eerstInternet(e, req, url, false));
    return e.respondWith(eerstOpslag(e, req));
  }
  if (BUITEN.some(b => req.url.startsWith(b))) return e.respondWith(eerstOpslag(e, req));
  // al het andere (de scoreserver, de bezoekersteller, het hotel, de spelserver, GitHub): gewoon via internet
});

// eerst het internet, hooguit 3 seconden als er een bewaarde versie is; zonder verbinding de bewaarde versie
async function eerstInternet(e, req, url, pagina) {
  const opslag = await caches.open(PAGINAS);
  let net;
  try { net = fetch(pagina && req.mode === 'navigate' ? new Request(req.url, { cache: 'no-cache', credentials: 'same-origin' }) : req, pagina && req.mode === 'navigate' ? undefined : { cache: 'no-cache' }); }
  catch (x) { net = Promise.reject(x); }
  net = net.then(async r => {
    // een doorverwezen antwoord geeft een iPhone niet aan een pagina: dan een schone kopie
    if (r.redirected && pagina) r = new Response(await r.blob(), { status: r.status, statusText: r.statusText, headers: r.headers });
    if (r.ok && (r.type === 'basic' || r.type === 'default')) { const kopie = r.clone(); e.waitUntil(opslag.put(req.url, kopie).then(() => snoei(opslag, MAX_PAGINAS)).catch(() => {})); }
    return r;
  });
  // de homepage heet ook index.html (en andersom)
  const ook = pagina && (url.pathname.endsWith('/') ? url.href.split(/[?#]/)[0] + 'index.html' : /\/index\.html$/.test(url.pathname) ? url.href.split(/[?#]/)[0].replace(/index\.html$/, '') : null);
  const bewaard = await opslag.match(req.url) || (pagina ? await opslag.match(req.url, { ignoreSearch: true }) || (ook && await opslag.match(ook, { ignoreSearch: true })) : null);
  if (!bewaard) {
    try { return await net; }
    catch (x) { return pagina ? offline() : Response.error(); }
  }
  e.waitUntil(net.catch(() => {}));
  return Promise.race([
    net.then(r => (r.status >= 500 ? bewaard : r), () => bewaard),
    new Promise(ok => setTimeout(() => ok(bewaard), WACHT)),
  ]);
}
// uit de opslag (en op de achtergrond verversen); staat het er nog niet, dan van internet
async function eerstOpslag(e, req) {
  const opslag = await caches.open(VAST), bewaard = await opslag.match(req);
  const net = fetch(req).then(r => { if (r.ok) { const kopie = r.clone(); e.waitUntil(opslag.put(req, kopie).then(() => snoei(opslag, MAX_VAST)).catch(() => {})); } return r; });
  if (bewaard) { e.waitUntil(net.catch(() => {})); return bewaard; }
  try { return await net; } catch (x) { return Response.error(); }
}
// de oudste weg als het er te veel worden
async function snoei(opslag, max) { const sleutels = await opslag.keys(); for (let i = 0; i < sleutels.length - max; i++) await opslag.delete(sleutels[i]); }
// een pagina die je nog nooit opende, zonder internet
function offline() {
  const html = '<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Geen internet – Ruben\'s rommelhoekje</title>'
    + '<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#FBF6E9;color:#1F2333;font-family:"Bricolage Grotesque",system-ui,sans-serif;padding:1rem;box-sizing:border-box}'
    + '.k{max-width:26rem;background:#F2DDA0;border-radius:14px;box-shadow:0 0 0 4px #1F2333,0 10px 0 4px rgba(0,0,0,.25);padding:1.2rem 1.4rem}h1{margin:0 0 .5rem;font-size:1.4rem}p{line-height:1.45;margin:.4rem 0}'
    + 'a{display:inline-block;margin:.6rem .5rem 0 0;font-weight:800;color:#fff;background:#C8323C;border-radius:8px;padding:.55rem .9rem;text-decoration:none}a.b{background:#FBF6E9;color:#1F2333}'
    + '@media (prefers-color-scheme:dark){body{background:#1B1D27;color:#F3EEDF}.k{background:#2A2D3A;box-shadow:0 0 0 4px #F3EEDF}a.b{background:#3A3E4E;color:#F3EEDF}}</style></head>'
    + '<body><div class="k"><h1>Geen internet</h1><p>Deze pagina heb je op dit apparaat nog niet eerder geopend, dus hij is er nog niet zonder internet.</p>'
    + '<p>Spellen die je al eens speelde, werken wel. Wat je speelt, gaat vanzelf mee zodra je weer internet hebt.</p>'
    + '<a href="">Probeer opnieuw</a><a class="b" href="./">Naar de homepage</a></div></body></html>';
  return new Response(html, { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

// ---------- Background Sync: wat een pagina niet kon versturen (zonder internet), staat in IndexedDB rommelhoekje, tabel uit, als 'sync'
self.addEventListener('sync', e => { if (e.tag === 'rommelhoekje-sync') e.waitUntil(stuurWachtrij()); });
const openDB = () => new Promise(ok => { try { const r = indexedDB.open('rommelhoekje', 1); r.onupgradeneeded = () => { for (const n of ['basis', 'uit']) if (!r.result.objectStoreNames.contains(n)) r.result.createObjectStore(n); }; r.onsuccess = () => ok(r.result); r.onerror = r.onblocked = () => ok(null); } catch (x) { ok(null); } });
const doe = (db, modus, f) => new Promise(ok => { try { const t = db.transaction('uit', modus), v = f(t.objectStore('uit')); t.oncomplete = () => ok(v && 'result' in v ? v.result : true); t.onerror = t.onabort = () => ok(null); } catch (x) { ok(null); } });
async function stuurWachtrij() {
  // staat er een pagina van de site open, dan zet die zelf gelijk (en ruimt de wachtrij op)
  const vensters = await self.clients.matchAll({ type: 'window' });
  if (vensters.some(c => c.visibilityState === 'visible' && opDeSite(new URL(c.url)))) return;
  const db = await openDB(); if (!db) return;
  const w = await doe(db, 'readonly', s => s.get('sync'));
  if (!w || typeof w.url !== 'string' || typeof w.body !== 'string') return;
  if (Date.now() - (w.t || 0) > 7 * 864e5) { await doe(db, 'readwrite', s => s.delete('sync')); return; }
  const r = await fetch(w.url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: w.body });   // zonder internet: een fout, dan probeert de browser het later nog eens
  if (r.ok || (r.status >= 400 && r.status < 500 && r.status !== 429)) {
    // alleen weghalen als er intussen niets nieuwers in de wachtrij kwam
    await doe(db, 'readwrite', s => { const q = s.get('sync'); q.onsuccess = () => { if (q.result && q.result.t === w.t) s.delete('sync'); }; return null; });
    return;
  }
  throw new Error('De scoreserver kan het nu even niet aan: later nog eens.');
}
