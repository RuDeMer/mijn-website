// De service worker van de werkplaats (alleen voor /werkplaats, niet voor de rest van de site).
// Hij bewaart alleen de app zelf (de pagina, het manifest en de iconen), zodat de werkplaats snel opent en ook zonder internet laat zien
// dat hij er is. Al het andere (GitHub, de scoreserver, de andere servers, alles met een sleutel) laat hij helemaal met rust: dat gaat
// gewoon over het internet en wordt nooit bewaard. Verder toont hij de meldingen en zet hij het getal op het icoon.
'use strict';
const OPSLAG = 'werkplaats-app-v1';
const APP = ['werkplaats.html', 'werkplaats.webmanifest', 'werkplaats-icoon-180.png', 'werkplaats-icoon-192.png', 'werkplaats-icoon-512.png', 'werkplaats-icoon-masker.png'];
const BASIS = new URL('./', self.location).href;
const adres = naam => new URL(naam, BASIS).href;
// welk bestand van de app hoort bij dit verzoek? (null: geen bestand van de app, dan bemoeien we ons er niet mee)
function appBestand(request) {
  if (request.method !== 'GET') return null;
  const u = new URL(request.url);
  if (u.origin !== self.location.origin) return null;
  const pad = u.pathname.slice(new URL(BASIS).pathname.length);
  if (pad === 'werkplaats' || pad === 'werkplaats.html') return 'werkplaats.html';
  return APP.includes(pad) && !u.search ? pad : null;
}

self.addEventListener('install', e => {
  e.waitUntil(caches.open(OPSLAG).then(c => Promise.all(APP.map(n => fetch(adres(n), { cache: 'no-cache' }).then(r => { if (r.ok) return c.put(adres(n), r); })))));
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k.startsWith('werkplaats-') && k !== OPSLAG) await caches.delete(k);
    await self.clients.claim();
  })());
});

// de pagina meteen uit de opslag, en daarna op de achtergrond kijken of er een nieuwere is (dan: "Nieuwe versie, ververs")
async function kijkNieuw() {
  const c = await caches.open(OPSLAG), sleutel = adres('werkplaats.html');
  const oud = await c.match(sleutel);
  let r; try { r = await fetch(sleutel, { cache: 'no-cache' }); } catch (e) { return false; }
  if (!r.ok || r.type !== 'basic') return false;
  const nieuw = await r.clone().text(), was = oud ? await oud.text() : null;
  if (was === nieuw) return false;
  await c.put(sleutel, r);
  if (was !== null) for (const k of await self.clients.matchAll({ type: 'window' })) k.postMessage({ t: 'nieuwe-versie' });
  return true;
}
let laatsteKijk = 0;
self.addEventListener('fetch', e => {
  const naam = appBestand(e.request);
  if (!naam) return;   // niet van de app: gewoon over het internet, nooit bewaard
  const antwoord = (async () => {
    const c = await caches.open(OPSLAG), bewaard = await c.match(adres(naam));
    if (bewaard) return bewaard;
    try { const r = await fetch(adres(naam), { cache: 'no-cache' }); if (r.ok && r.type === 'basic') await c.put(adres(naam), r.clone()); return r; }
    catch (x) {
      if (naam !== 'werkplaats.html') throw x;
      return new Response('<!DOCTYPE html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Werkplaats</title><body style="font-family:system-ui;padding:2rem;background:#FBF6E9;color:#231A26"><h1>Werkplaats</h1><p>Geen internet. Probeer het zo nog eens.</p></body>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
  })();
  e.respondWith(antwoord);
  // pas als de pagina er is: kijken of er een nieuwere versie is
  if (naam === 'werkplaats.html' && Date.now() - laatsteKijk > 5000) { laatsteKijk = Date.now(); e.waitUntil(antwoord.then(() => kijkNieuw()).catch(() => {})); }
});
self.addEventListener('message', e => {
  const d = e.data || {};
  if (d.t === 'kijk') e.waitUntil(kijkNieuw());
  if (d.t === 'sla-over') self.skipWaiting();
});

// ---- meldingen (Web Push van de scoreserver; de inhoud is versleuteld voor dit apparaat)
self.addEventListener('push', e => {
  let d = {}; try { d = e.data ? e.data.json() : {}; } catch (x) { d = { titel: 'Werkplaats', tekst: e.data ? e.data.text() : '' }; }
  const taken = [self.registration.showNotification(d.titel || 'Werkplaats', { body: d.tekst || '', tag: d.tag || 'werkplaats', renotify: true, icon: adres('werkplaats-icoon-192.png'), badge: adres('werkplaats-icoon-192.png'), data: { url: d.url || '', t: d.t || Date.now() } })];
  if (typeof d.badge === 'number' && self.navigator && 'setAppBadge' in self.navigator) taken.push((d.badge > 0 ? self.navigator.setAppBadge(d.badge) : self.navigator.clearAppBadge()).catch(() => {}));
  e.waitUntil(Promise.all(taken));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const hash = /^#[a-z]+(\/[a-z]*)?$/.test((e.notification.data || {}).url || '') ? e.notification.data.url : '';
  e.waitUntil((async () => {
    for (const k of await self.clients.matchAll({ type: 'window', includeUncontrolled: true })) {
      if (appBestand(new Request(k.url)) === 'werkplaats.html') { k.postMessage({ t: 'ga', naar: hash.slice(1) }); return k.focus(); }
    }
    return self.clients.openWindow(adres('werkplaats.html') + hash);
  })());
});
