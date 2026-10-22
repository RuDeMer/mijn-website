// Scorebord voor Ruben's rommelhoekje
// Een Cloudflare Worker met een D1-database (binding: DB) en een geheim beheerwachtwoord (secret: BEHEER).
//
//   GET  /scores                    de toplijsten van alle spellen
//   POST /score      {spel, naam, geheim, score, extra}   een score insturen (de beste blijft staan)
//   POST /naam       {geheim, naam}  je naam veranderen bij al je scores
//   POST /verwijder  {geheim}        je eigen scores weghalen
//   DELETE /score?spel=..&id=..      een score weghalen (alleen met het beheerwachtwoord)
//   POST /sync                       koppelen: voortgang van alle spellen gelijkzetten op apparaten met dezelfde koppelcode
//   POST /rb/sync                    Rommelbeesten: verzameling van dit apparaat bewaren (anoniem) en wachtende cadeaus ophalen
//   POST /rb/ontvangen               het spel meldt welke cadeaus het heeft uitgepakt
//   GET  /rb/spelers, /rb/speler?id=   beheer: spelers en hun verzameling bekijken
//   POST /rb/geef                    beheer: een cadeau klaarzetten (kaarten, munten, pakjes)

const SPELLEN = {
  vlaai: { naam: 'Vlaaienbakker', max: 1e40 },
  woord: { naam: 'Rommelwoord', max: 100000 },
  poker: { naam: 'Rommelpoker', max: 100000 },
  beest: { naam: 'Rommelbeesten', max: 130 },
  vlieger: { naam: 'Vouwvlieger', max: 100000 },
  ritme: { naam: 'Rommelritme', max: 600 },
  kroon: { naam: 'Rommelkroon', max: 500 },
  arend: { naam: 'Rommelarend', max: 10000 },
  rob: { naam: 'Rob 👍', max: 5000 },
  bel: { naam: 'Rommelbel', max: 50000000 },
  fiets: { naam: 'JAJA Productiefiets', max: 5000000 },
  steiger: { naam: 'Steigerstress', max: 200000 },
  wheels: { naam: 'Rommelwheels', max: 40000 },
  gevoel: { naam: 'Op Gevoel', max: 500 },
};
// lange woorden blokkeren we overal in een naam, korte alleen als los woord (zodat bijvoorbeeld 'Spike' en 'Lulu' gewoon mogen)
const VERBODEN_LANG = ['kanker', 'hoer', 'neuk', 'fuck', 'shit', 'nazi', 'hitler', 'tering', 'tyfus', 'bitch', 'porn', 'neger', 'nikker', 'flikker', 'mongool', 'kut', 'slet'];
const VERBODEN_KORT = ['lul', 'pik', 'kkr', 'sex', 'seks'];
const TOP = 50;
const VERSIE = '2026-10-12';
const STANDAARD_ORIGINS = ['https://www.rubensrommelhoekje.nl', 'https://rubensrommelhoekje.nl'];
function magOrigin(o, env) { const lijst = STANDAARD_ORIGINS.concat(String(env.ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean)); if (lijst.includes(o)) return true; try { const u = new URL(o); return u.protocol === 'https:' && (u.hostname.endsWith('.rubensrommelhoekje.nl') || u.hostname.endsWith('.github.io')); } catch (e) { return false; } }
function afmaken(res, origin, toegestaan) {
  const h = new Headers(res.headers);
  h.set('Access-Control-Allow-Origin', origin && toegestaan ? origin : STANDAARD_ORIGINS[0]); h.set('Vary', 'Origin');
  h.set('X-Content-Type-Options', 'nosniff'); h.set('Referrer-Policy', 'no-referrer'); h.set('X-Frame-Options', 'DENY'); h.set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'"); h.set('Strict-Transport-Security', 'max-age=31536000'); h.set('Cache-Control', h.get('Cache-Control') || 'no-store');
  return new Response(res.body, { status: res.status, headers: h });
}
async function logFout(env, bron, plek, e) {
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  try { await env.DB.prepare('INSERT INTO fouten (t, bron, plek, bericht, code) VALUES (?, ?, ?, ?, ?)').bind(Date.now(), bron, String(plek).slice(0, 80), String((e && (e.stack || e.message)) || e).slice(0, 600), code).run(); await env.DB.prepare('DELETE FROM fouten WHERE nr <= (SELECT MAX(nr) FROM fouten) - 500').run(); } catch (x) {}
  return code;
}
async function logboek(env, wat, details, ip) { try { await env.DB.prepare('INSERT INTO logboek (t, wat, details, ip) VALUES (?, ?, ?, ?)').bind(Date.now(), String(wat).slice(0, 80), String(details || '').slice(0, 300), ip || '').run(); } catch (e) {} }
let schakelCache = null, schakelT = 0;
async function schakelaars(env) { if (schakelCache && Date.now() - schakelT < 15000) return schakelCache; const r = await env.DB.prepare('SELECT sleutel, waarde FROM instellingen WHERE sleutel LIKE ?').bind('dicht:%').all(); schakelCache = {}; for (const x of r.results || []) schakelCache[x.sleutel.slice(6)] = x.waarde === '1'; schakelT = Date.now(); return schakelCache; }
const SCHAKELAARS = ['alles', 'scores', 'sync', 'ideeen', 'beesten', 'hotel'];
async function beheerRoute(request, env, url) {
  const p = url.pathname.slice(8), DB = env.DB, aantal = async t => ((await DB.prepare('SELECT COUNT(*) AS n FROM ' + t).first()) || {}).n || 0;
  if (p === 'status' && request.method === 'GET') {
    const tabellen = {}; for (const t of ['scores', 'sync_data', 'ideeen', 'rb_spelers', 'rb_cadeaus', 'fouten', 'geweigerd', 'logboek', 'geblokkeerd']) tabellen[t] = await aantal(t);
    const spellen = (await DB.prepare('SELECT spel, COUNT(*) AS n, MAX(tijd) AS laatst FROM scores GROUP BY spel ORDER BY n DESC').all()).results || [];
    const fouten = (await DB.prepare('SELECT t, bron, plek, bericht, code FROM fouten ORDER BY nr DESC LIMIT 8').all()).results || [];
    const weg = (await DB.prepare('SELECT t, id, sleutel, reden FROM geweigerd ORDER BY nr DESC LIMIT 8').all()).results || [];
    const dag = await DB.prepare('SELECT COUNT(*) AS n FROM fouten WHERE t > ?').bind(Date.now() - 86400000).first();
    return json({ ok: true, versie: VERSIE, tabellen, spellen, schakelaars: await schakelaars(env), fouten, geweigerd: weg, foutenVandaag: (dag || {}).n || 0 });
  }
  if (p === 'fouten' && request.method === 'GET') return json({ ok: true, fouten: (await DB.prepare('SELECT t, bron, plek, bericht, code FROM fouten ORDER BY nr DESC LIMIT 150').all()).results || [] });
  if (p === 'fouten' && request.method === 'DELETE') { await DB.prepare('DELETE FROM fouten').run(); return json({ ok: true }); }
  if (p === 'geweigerd' && request.method === 'GET') return json({ ok: true, geweigerd: (await DB.prepare('SELECT g.nr, g.t, g.id, g.sleutel, g.reden, CASE WHEN d.nr IS NULL THEN 0 ELSE 1 END AS bewaard FROM geweigerd g LEFT JOIN geweigerd_data d ON d.nr = g.nr ORDER BY g.nr DESC LIMIT 150').all()).results || [] });
  // een geweigerde stand toch goedkeuren: hij wordt de stand van het account, en alle apparaten nemen hem over
  if (p === 'goedkeuren' && request.method === 'POST') { const b = await lees(request) || {}; const g = await DB.prepare('SELECT g.nr, g.id, g.sleutel, d.data FROM geweigerd g JOIN geweigerd_data d ON d.nr = g.nr WHERE g.nr = ?').bind(Math.floor(+b.nr || 0)).first(); if (!g) return json({ fout: 'Deze stand is niet meer bewaard.' }, 404); const nu = Date.now(); await DB.prepare('INSERT INTO sync_data (id, sleutel, data, t) VALUES (?, ?, ?, ?) ON CONFLICT(id, sleutel) DO UPDATE SET data = excluded.data, t = MAX(excluded.t, sync_data.t + 1)').bind(g.id, g.sleutel, g.data, nu).run(); await DB.prepare('DELETE FROM sync_apparaat WHERE id = ? AND sleutel = ?').bind(g.id, g.sleutel).run(); await DB.prepare('DELETE FROM geweigerd_data WHERE nr = ?').bind(g.nr).run(); await logboek(env, 'stand toch goedgekeurd', g.sleutel + ' · account ' + String(g.id).slice(0, 6)); return json({ ok: true }); }
  if (p === 'logboek' && request.method === 'GET') return json({ ok: true, logboek: (await DB.prepare('SELECT t, wat, details, ip FROM logboek ORDER BY nr DESC LIMIT 150').all()).results || [] });
  if (p === 'schakelaar' && request.method === 'POST') { const b = await lees(request) || {}; if (!SCHAKELAARS.includes(b.naam)) return json({ fout: 'Onbekende schakelaar' }, 400); await DB.prepare('INSERT INTO instellingen (sleutel, waarde) VALUES (?, ?) ON CONFLICT(sleutel) DO UPDATE SET waarde = excluded.waarde').bind('dicht:' + b.naam, b.dicht ? '1' : '0').run(); schakelCache = null; await logboek(env, 'schakelaar ' + b.naam, b.dicht ? 'dicht' : 'open'); return json({ ok: true, schakelaars: await schakelaars(env) }); }
  if (p === 'hotel' && request.method === 'POST') { const b = await lees(request) || {}; const bericht = String(b.bericht || '').slice(0, 200); await DB.prepare('INSERT INTO instellingen (sleutel, waarde) VALUES (?, ?) ON CONFLICT(sleutel) DO UPDATE SET waarde = excluded.waarde').bind('dicht:hotel', b.dicht ? '1' : '0').run(); await DB.prepare('INSERT INTO instellingen (sleutel, waarde) VALUES (?, ?) ON CONFLICT(sleutel) DO UPDATE SET waarde = excluded.waarde').bind('hotel:bericht', bericht).run(); schakelCache = null; await logboek(env, b.dicht ? 'hotel gesloten' : 'hotel geopend', bericht); return json({ ok: true, open: !b.dicht, bericht }); }
  if (p === 'scores' && request.method === 'GET') { const spel = String(url.searchParams.get('spel') || ''); const r = await DB.prepare('SELECT s.id, s.naam, s.score, s.extra, s.tijd, (SELECT 1 FROM geblokkeerd g WHERE g.id = s.id) AS geblokkeerd FROM scores s WHERE s.spel = ? ORDER BY s.score DESC LIMIT 200').bind(spel).all(); return json({ ok: true, scores: r.results || [] }); }
  if (p === 'score-weg' && request.method === 'POST') { const b = await lees(request) || {}; await DB.prepare('DELETE FROM scores WHERE spel = ? AND id = ?').bind(String(b.spel || ''), String(b.id || '')).run(); await logboek(env, 'score weg', b.spel + ' ' + b.id); return json({ ok: true }); }
  if (p === 'reset' && request.method === 'POST') { const b = await lees(request) || {}; const spel = String(b.spel || ''); if (!spel || b.bevestig !== spel) return json({ fout: 'Bevestig met de naam van het spel.' }, 400); const n = await DB.prepare('SELECT COUNT(*) AS n FROM scores WHERE spel = ?').bind(spel).first(); await DB.prepare('DELETE FROM scores WHERE spel = ?').bind(spel).run(); await logboek(env, 'scorebord leeggemaakt', spel + ' (' + ((n || {}).n || 0) + ' scores)'); return json({ ok: true, weg: (n || {}).n || 0 }); }
  if (p === 'blokkeer' && request.method === 'POST') { const b = await lees(request) || {}; const id = String(b.id || '').slice(0, 40); if (!id) return json({ fout: 'Geen speler' }, 400); if (b.aan) await DB.prepare('INSERT OR REPLACE INTO geblokkeerd (id, t, reden) VALUES (?, ?, ?)').bind(id, Date.now(), String(b.reden || '').slice(0, 120)).run(); else await DB.prepare('DELETE FROM geblokkeerd WHERE id = ?').bind(id).run(); await logboek(env, b.aan ? 'speler geblokkeerd' : 'speler vrijgegeven', id); return json({ ok: true }); }
  if (p === 'export' && request.method === 'GET') {
    const tabel = async (sql) => (await DB.prepare(sql).all()).results || [];
    await logboek(env, 'back-up gedownload', '');
    return json({ ok: true, versie: VERSIE, gemaakt: Date.now(), scores: await tabel('SELECT * FROM scores'), ideeen: await tabel('SELECT * FROM ideeen'), stemmen: await tabel('SELECT * FROM stemmen'), rb_spelers: await tabel('SELECT * FROM rb_spelers'), rb_cadeaus: await tabel('SELECT * FROM rb_cadeaus'), instellingen: await tabel('SELECT * FROM instellingen'), geblokkeerd: await tabel('SELECT * FROM geblokkeerd'), logboek: await tabel('SELECT * FROM logboek ORDER BY nr DESC LIMIT 500'), sync: { accounts: ((await DB.prepare('SELECT COUNT(DISTINCT id) AS n FROM sync_data').first()) || {}).n || 0, opslagen: await aantal('sync_data') } });
  }
  return json({ fout: 'Onbekende beheeropdracht' }, 404);
}

let tabelKlaar = false;
const pogingen = new Map(); // eenvoudige snelheidsgrens per IP, per minuut

function cors(extra) {
  return Object.assign({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  }, extra || {});
}
const json = (data, status) => new Response(JSON.stringify(data), { status: status || 200, headers: cors({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }) });

async function idVan(geheim) {
  const data = new TextEncoder().encode('rommelhoekje:' + geheim);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16);
}
function schoneNaam(n) {
  n = String(n || '').normalize('NFC').replace(/\s+/g, ' ').trim();
  if (n.length < 2 || n.length > 16) return null;
  if (!/^[\p{L}\p{N} ._-]+$/u.test(n)) return null;
  const klein = n.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a').replace(/5/g, 's');
  const plat = klein.replace(/[^a-z]/g, ''), woorden = klein.split(/[^a-z]+/);
  if (VERBODEN_LANG.some(w => w.length >= 4 ? plat.includes(w) : plat === w || woorden.includes(w))) return null;
  if (VERBODEN_KORT.some(w => plat === w || woorden.includes(w))) return null;
  return n;
}
function teSnel(ip) {
  const nu = Date.now(), r = pogingen.get(ip) || { start: nu, n: 0 };
  if (nu - r.start > 60000) { r.start = nu; r.n = 0; }
  r.n++; pogingen.set(ip, r);
  if (pogingen.size > 5000) pogingen.clear();
  return r.n > 30;
}
async function zorgVoorTabel(db) {
  if (tabelKlaar) return;
  await db.prepare('CREATE TABLE IF NOT EXISTS ideeen (id INTEGER PRIMARY KEY AUTOINCREMENT, tekst TEXT NOT NULL, naam TEXT NOT NULL DEFAULT \'\', soort TEXT NOT NULL DEFAULT \'anders\', status TEXT NOT NULL DEFAULT \'nieuw\', publiek INTEGER NOT NULL DEFAULT 0, stemmen INTEGER NOT NULL DEFAULT 0, tijd INTEGER NOT NULL)').run();
  await db.prepare('CREATE TABLE IF NOT EXISTS sync_data (id TEXT NOT NULL, sleutel TEXT NOT NULL, data TEXT NOT NULL, t INTEGER NOT NULL, PRIMARY KEY (id, sleutel))').run();
  await db.prepare('CREATE TABLE IF NOT EXISTS rb_spelers (id TEXT PRIMARY KEY, code TEXT NOT NULL, naam TEXT NOT NULL DEFAULT \'\', data TEXT NOT NULL, laatst INTEGER NOT NULL)').run();
  await db.prepare('CREATE TABLE IF NOT EXISTS rb_cadeaus (nr INTEGER PRIMARY KEY AUTOINCREMENT, speler TEXT NOT NULL, data TEXT NOT NULL, gemaakt INTEGER NOT NULL, opgehaald INTEGER)').run();
  await db.prepare('CREATE TABLE IF NOT EXISTS stemmen (idee INTEGER NOT NULL, wie TEXT NOT NULL, PRIMARY KEY (idee, wie))').run();
  for (const sql of [
    'CREATE TABLE IF NOT EXISTS fouten (nr INTEGER PRIMARY KEY AUTOINCREMENT, t INTEGER NOT NULL, bron TEXT NOT NULL, plek TEXT NOT NULL, bericht TEXT NOT NULL, code TEXT NOT NULL)',
    'CREATE TABLE IF NOT EXISTS geweigerd (nr INTEGER PRIMARY KEY AUTOINCREMENT, t INTEGER NOT NULL, id TEXT NOT NULL, sleutel TEXT NOT NULL, reden TEXT NOT NULL)',
    'CREATE TABLE IF NOT EXISTS logboek (nr INTEGER PRIMARY KEY AUTOINCREMENT, t INTEGER NOT NULL, wat TEXT NOT NULL, details TEXT NOT NULL DEFAULT \'\', ip TEXT NOT NULL DEFAULT \'\')',
    'CREATE TABLE IF NOT EXISTS instellingen (sleutel TEXT PRIMARY KEY, waarde TEXT NOT NULL)',
    'CREATE TABLE IF NOT EXISTS geblokkeerd (id TEXT PRIMARY KEY, t INTEGER NOT NULL, reden TEXT NOT NULL DEFAULT \'\')',
    'CREATE TABLE IF NOT EXISTS beheer_mislukt (ip TEXT NOT NULL, t INTEGER NOT NULL)',
    'CREATE TABLE IF NOT EXISTS sync_apparaat (id TEXT NOT NULL, sleutel TEXT NOT NULL, apparaat TEXT NOT NULL, data TEXT NOT NULL, t INTEGER NOT NULL, PRIMARY KEY (id, sleutel, apparaat))',
    'CREATE TABLE IF NOT EXISTS geweigerd_data (nr INTEGER PRIMARY KEY, data TEXT NOT NULL)',
  ]) await db.prepare(sql).run();
  await db.prepare('CREATE TABLE IF NOT EXISTS scores (spel TEXT NOT NULL, id TEXT NOT NULL, naam TEXT NOT NULL, score REAL NOT NULL, extra REAL NOT NULL DEFAULT 0, tijd INTEGER NOT NULL, PRIMARY KEY (spel, id))').run();
  tabelKlaar = true;
}
// ideeën: tekst van 10 tot 500 tekens, zonder scheldwoorden
const SOORTEN = ['spel', 'hotel', 'rommelbeesten', 'homepage', 'anders'];
const STATUSSEN = ['nieuw', 'bekeken', 'in de maak', 'klaar', 'niet nu'];
function schoneTekst(t) {
  t = String(t || '').normalize('NFC').replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim();
  if (t.length < 10 || t.length > 500) return null;
  const klein = t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''), plat = klein.replace(/[^a-z]/g, ''), woorden = klein.split(/[^a-z]+/);
  if (VERBODEN_LANG.some(w => w.length >= 5 && plat.includes(w)) || VERBODEN_LANG.some(w => woorden.includes(w)) || VERBODEN_KORT.some(w => woorden.includes(w))) return null;
  if (/https?:\/\/|www\./i.test(t)) return null;
  return t;
}
const ideeTeller = new Map();
function teVeelIdeeen(ip) { const nu = Date.now(), lijst = (ideeTeller.get(ip) || []).filter(t => nu - t < 3600000); lijst.push(nu); ideeTeller.set(ip, lijst); return lijst.length > 5; }
// vergelijken in vaste tijd, zodat het wachtwoord niet via de reactiesnelheid te raden is
function gelijk(a, b) { a = String(a || ''); b = String(b || ''); let v = a.length ^ b.length; for (let i = 0; i < Math.max(a.length, b.length); i++) v |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0); return v === 0; }
const isBeheer = (request, env) => !!env.BEHEER && env.BEHEER.length >= 12 && gelijk(request.headers.get('Authorization'), 'Bearer ' + env.BEHEER);
async function lees(request) { try { return JSON.parse(await request.text()); } catch (e) { return null; } }

// ================================================================ CONTROLE TEGEN VALSSPELEN
// De server bewaart de voortgang, en controleert bij de Vlaaienbakker en Rommelbeesten of een nieuwe opslag eerlijk te verdienen is sinds de vorige.
// De marges zijn ruim: gewoon spelen wordt nooit geweigerd, maar zelf getallen veranderen in de browser wel.
const VB_BAKKERS = [["oma", 15, 0.2], ["leerling", 120, 1.2], ["oven", 1000, 9], ["bakkerij", 9000, 60], ["grot", 80000, 380], ["fabriek", 700000, 2600], ["optocht", 6000000, 18000], ["boot", 55000000, 120000], ["raket", 500000000, 900000], ["kasteel", 5000000000, 6500000], ["tijd", 70000000000, 50000000], ["portaal", 1000000000000, 400000000], ["kosmos", 14000000000000, 3000000000], ["multi", 200000000000000, 24000000000], ["rommel", 3000000000000000, 200000000000], ["maan", 5e+17, 28000000000000.0], ["tijdmachine", 8e+19, 4000000000000000.0], ["heelal", 1.2e+22, 5e+17]];
const VB_GROEI = 1.14;
const RB_RAR = {"zs001":"g","zs002":"o","zs003":"z","zs004":"g","zs005":"o","zs006":"h","zs007":"g","zs008":"o","zs009":"z","zs010":"g","zs011":"o","zs012":"g","zs013":"z","zs014":"o","zs015":"u","zs016":"g","zs017":"o","zs018":"z","zs019":"g","zs020":"o","zs021":"h","zs022":"g","zs023":"o","zs024":"z","zs025":"g","zs026":"o","zs027":"g","zs028":"z","zs029":"o","zs030":"u","zs031":"g","zs032":"o","zs033":"z","zs034":"g","zs035":"o","zs036":"h","zs037":"g","zs038":"o","zs039":"z","zs040":"g","zs041":"o","zs042":"g","zs043":"z","zs044":"o","zs045":"u","zs046":"g","zs047":"o","zs048":"z","zs049":"g","zs050":"o","zs051":"h","zs052":"g","zs053":"o","zs054":"z","zs055":"g","zs056":"o","zs057":"g","zs058":"z","zs059":"o","zs060":"h","zs061":"g","zs062":"o","zs063":"z","zs064":"g","zs065":"o","zs066":"h","zs067":"g","zs068":"o","zs069":"z","zs070":"g","zs071":"o","zs072":"g","zs073":"z","zs074":"o","zs075":"u","zs076":"g","zs077":"o","zs078":"z","zs079":"g","zs080":"o","zs081":"h","zs082":"g","zs083":"o","zs084":"z","zs085":"g","zs086":"o","zs087":"g","zs088":"z","zs089":"o","zs090":"h","zs091":"g","zs092":"o","zs093":"z","zs094":"g","zs095":"o","zs096":"h","zs097":"g","zs098":"o","zs099":"z","zs100":"g","zs101":"o","zs102":"g","zs103":"z","zs104":"o","zs105":"u","zs106":"g","zs107":"o","zs108":"z","zs109":"g","zs110":"o","zs111":"h","zs112":"g","zs113":"o","zs114":"z","zs115":"g","zs116":"o","zs117":"g","zs118":"z","zs119":"o","zs120":"h","zs121":"x","zs122":"x","zs123":"x","zs124":"x","zs125":"x","zs126":"x","zs127":"x","zs128":"x","zs129":"x","zs130":"x","hs001":"g","hs002":"g","hs003":"g","hs004":"g","hs005":"g","hs006":"g","hs007":"g","hs008":"g","hs009":"g","hs010":"g","hs011":"o","hs012":"o","hs013":"o","hs014":"o","hs015":"o","hs016":"o","hs017":"o","hs018":"o","hs019":"o","hs020":"z","hs021":"z","hs022":"z","hs023":"z","hs024":"z","hs025":"h","hs026":"h","hs027":"h","hs028":"u","hs029":"u","hs030":"x","cs001":"g","cs002":"g","cs003":"g","cs004":"g","cs005":"g","cs006":"g","cs007":"g","cs008":"g","cs009":"g","cs010":"g","cs011":"o","cs012":"o","cs013":"o","cs014":"o","cs015":"o","cs016":"o","cs017":"o","cs018":"z","cs019":"z","cs020":"z","cs021":"z","cs022":"z","cs023":"h","cs024":"h","cs025":"u","cs026":"g","cs027":"g","cs028":"g","cs029":"g","cs030":"g","cs031":"g","cs032":"g","cs033":"g","cs034":"g","cs035":"g","cs036":"g","cs037":"g","cs038":"g","cs039":"g","cs040":"g","cs041":"g","cs042":"g","cs043":"g","cs044":"g","cs045":"g","cs046":"g","cs047":"g","cs048":"g","cs049":"g","cs050":"g","cs051":"g","cs052":"g","cs053":"g","cs054":"g","cs055":"g","cs056":"g","cs057":"g","cs058":"g","cs059":"g","cs060":"g","cs061":"g","cs062":"g","cs063":"g","cs064":"g","cs065":"g","cs066":"g","cs067":"g","cs068":"g","cs069":"g","cs070":"g","cs071":"g","cs072":"g","cs073":"g","cs074":"g","cs075":"g","cs076":"o","cs077":"o","cs078":"o","cs079":"o","cs080":"o","cs081":"o","cs082":"o","cs083":"o","cs084":"o","cs085":"o","cs086":"o","cs087":"o","cs088":"o","cs089":"o","cs090":"o","cs091":"o","cs092":"o","cs093":"o","cs094":"o","cs095":"o","cs096":"o","cs097":"o","cs098":"o","cs099":"o","cs100":"o","cs101":"o","cs102":"o","cs103":"o","cs104":"o","cs105":"o","cs106":"o","cs107":"o","cs108":"o","cs109":"z","cs110":"z","cs111":"z","cs112":"z","cs113":"z","cs114":"z","cs115":"z","cs116":"z","cs117":"z","cs118":"z","cs119":"z","cs120":"z","cs121":"z","cs122":"z","cs123":"z","cs124":"z","cs125":"z","cs126":"z","cs127":"z","cs128":"z","cs129":"h","cs130":"h","cs131":"h","cs132":"h","cs133":"h","cs134":"h","cs135":"h","cs136":"h","cs137":"h","cs138":"h","cs139":"u","cs140":"u","cs141":"u","cs142":"u","cs143":"u","cs144":"u","cs145":"u","cs146":"x","cs147":"x","cs148":"x","cs149":"x","cs150":"x","gz001":"g","gz002":"g","gz003":"g","gz004":"g","gz005":"g","gz006":"g","gz007":"g","gz008":"g","gz009":"g","gz010":"g","gz011":"g","gz012":"g","gz013":"g","gz014":"g","gz015":"o","gz016":"o","gz017":"o","gz018":"o","gz019":"o","gz020":"o","gz021":"o","gz022":"o","gz023":"o","gz024":"o","gz025":"z","gz026":"z","gz027":"z","gz028":"z","gz029":"z","gz030":"z","gz031":"z","gz032":"h","gz033":"h","gz034":"u","gz035":"u","gz036":"x","gz037":"x","gz038":"x","gz039":"x","gz040":"x"};
const RB_WAARDE = { g: 2, o: 5, z: 20, h: 35, u: 100, x: 250 };
const WEEKBORD = { naam: 'Bakwedstrijd van de week', max: 1e30 };
const spelDef = id => SPELLEN[id] || (/^vw\d{3,6}$/.test(id || '') ? WEEKBORD : null);
const getal = (x, d = 0) => (typeof x === 'number' && isFinite(x) ? x : d);
const VB_WONDEREN = { vrijthof: 1e27, brug: 1e29, mergel: 1e31, maan: 1e33, ring: 1e35, zon: 1e37, melkweg: 1e39, heelal: 1e42 };
const vbWonderAf = S => Object.entries(S.wonderen || {}).filter(([id, v]) => VB_WONDEREN[id] && getal(v) >= VB_WONDEREN[id]).length;
function vbBonus(S) { const g = S.gilde || {}, perks = Array.isArray(g.perks) ? g.perks : []; return Math.pow(1.25, Math.min(8, vbWonderAf(S))) * (1 + 0.1 * Math.max(0, (S.smaken || []).length - 1)) * (1 + 0.02 * Math.min(90, (S.pres || []).length)) * (1 + 0.02 * Math.min(1e6, getal(g.verdiend))) * (perks.includes('meester') ? 1.5 : 1) * (perks.includes('groot') ? 2 : 1); }
function vbVps(S) { const upg = Array.isArray(S.upg) ? S.upg : [], bk = S.bakkers || {}; let t = 0; for (const [id, , v] of VB_BAKKERS) { let m = 1; for (const [n, f] of [[1, 2], [2, 2], [3, 2], [4, 3], [5, 3], [6, 2], [7, 2]]) if (upg.includes(id + '-' + n)) m *= f; t += Math.max(0, getal(bk[id])) * v * m; } return t * vbBonus(S); }
function vbKlik(S) { const upg = Array.isArray(S.upg) ? S.upg : [], perks = (S.gilde && S.gilde.perks) || []; let k = Math.pow(2, Math.min(14, Math.max(0, (S.smaken || []).length - 1))) * (upg.includes('mixer') ? 2 : 1) + vbVps(S) * 0.1; if (perks.includes('klik')) k *= 3; return k * 15; }
function vbKosten(S) { const bk = S.bakkers || {}, korting = ((S.gilde && S.gilde.perks) || []).includes('korting') ? 0.9 : 1; let t = 0; for (const [id, prijs] of VB_BAKKERS) { const n = Math.max(0, getal(bk[id])); if (n) t += prijs * korting * (Math.pow(VB_GROEI, n) - 1) / (VB_GROEI - 1); } return t; }
// De controle tegen valsspelen bij het synchroniseren staat uit (besluit van Ruben, 14 oktober 2026): opslagen worden nooit meer geweigerd.
// Zet op true om hem weer aan te zetten.
const VALSSPEEL_CONTROLE = false;
let DETAIL = '';
const kort = x => (x >= 1e6 ? x.toExponential(2) : String(Math.round(x)));
function valideerVlaai(oud, nieuw, dt) {
  if (!nieuw || typeof nieuw !== 'object') return 'onleesbare opslag';
  for (const k of ['ooit', 'totaal', 'vlaaien']) if (!isFinite(getal(nieuw[k], NaN))) return 'ongeldige getallen';
  const pot = Math.floor(Math.cbrt(Math.max(0, nieuw.ooit) / 1e12)), g = nieuw.gilde || {};
  if (getal(g.verdiend) > pot + 3) return 'meer gildesterren dan je ooit gebakken hebt';
  if (vbKosten(nieuw) > Math.max(getal(nieuw.totaal), getal(nieuw.ooit)) * 1.25 + 6000) return 'meer bakkers dan je kunt betalen';
  const inWonderen = Object.values(nieuw.wonderen || {}).reduce((t, v) => t + Math.max(0, getal(v)), 0);
  if (inWonderen > getal(nieuw.ooit) * 1.01 + 1000) return 'meer in wonderen gestopt dan je ooit gebakken hebt';
  if (!oud) return null;
  if (nieuw.ooit < 2000 && getal(nieuw.totaal) < 2000) return null; // helemaal opnieuw begonnen mag altijd
  const dag = 86400, dagen = Math.ceil((dt + 3600) / dag) + 1, vmax = Math.max(vbVps(oud), vbVps(nieuw));
  const gouden = Math.max(0, getal(nieuw.goud) - getal(oud.goud));
  // ruim genoeg voor eerlijke uitschieters (snel tikken met bonussen, gouden vlaaien, bestellingen, dagbonus); echte valsspelers springen meestal met factoren van duizenden
  const klik = vbKlik(nieuw), mag = (vmax * 5 + klik * 16) * (dt + 120) * 1.5 * 3 + vmax * 900 * (gouden + 1) + vmax * 3600 * 2 * dagen + 50000 + vmax * 600 + klik * 16 * 60;
  const erbij = getal(nieuw.ooit) - getal(oud.ooit);
  if (erbij > mag) { DETAIL = `${Math.round(erbij / mag * 10) / 10}× te veel: ${kort(erbij)} gebakken in ${Math.round(dt)} s, toegestaan ${kort(mag)} (productie ${kort(vmax)}/s, tik ${kort(klik / 15)}, ${gouden} gouden)`; return 'sneller gebakken dan je bakkerij kan'; }
  if (getal(g.sterren) - getal((oud.gilde || {}).sterren) > Math.max(0, getal(g.verdiend) - getal((oud.gilde || {}).verdiend)) + dagen + 1 + (nieuw.pionier && !oud.pionier ? 25 : 0)) return 'meer gildesterren gekregen dan kan';
  return null;
}
function valideerBeesten(oud, nieuw, dt) {
  if (!nieuw || typeof nieuw !== 'object' || !isFinite(getal(nieuw.munten, NaN))) return 'onleesbare opslag';
  if (!oud) return null;
  const ob = oud.bezit || {}, nb = nieuw.bezit || {}, os = oud.stats || {}, ns = nieuw.stats || {};
  let erbij = 0, zeldzaamErbij = 0, geheimErbij = 0, weg = 0;
  for (const id of new Set([...Object.keys(ob), ...Object.keys(nb)])) { const o = ob[id] || [0, 0], n = nb[id] || [0, 0], z = RB_RAR[id] || 'g'; for (const i of [0, 1]) { const d = getal(n[i]) - getal(o[i]); if (d > 0) { erbij += d; if (z === 'h' || z === 'u' || z === 'x') zeldzaamErbij += d; if (z === 'x') geheimErbij += d; } else if (d < 0) weg += -d * (RB_WAARDE[z] || 2) * (i ? 3 : 1); } }
  const pakjes = Math.max(0, getal(ns.pakjes) - getal(os.pakjes)), dagen = Math.ceil((dt + 3600) / 86400) + 1;
  const niveaus = Math.max(0, getal((nieuw.fut || {}).niveau, 1) - getal((oud.fut || {}).niveau, 1));
  if (erbij > pakjes * 10 + 15 * dagen) return 'meer kaarten dan je pakjes hebt geopend';
  if (zeldzaamErbij > pakjes * 3 + 3 * dagen) return 'onwaarschijnlijk veel zeldzame kaarten';
  if (geheimErbij > pakjes * 0.8 + 2 * dagen) return 'onwaarschijnlijk veel geheime kaarten';
  const uitgegeven = Math.max(0, getal(ns.uitgegeven) - getal(os.uitgegeven));
  const inkomen = weg * 1.3 + dagen * 1600 + niveaus * 1600 + 3000;
  if (getal(nieuw.munten) - getal(oud.munten) > inkomen) return 'meer muntjes dan je kunt verdienen';
  if (pakjes > uitgegeven / 45 + (dt / 7200 + 2) * 1.5 + niveaus * 3 + dagen * 4 + 6) return 'meer pakjes geopend dan je kunt betalen';
  return null;
}
function valideerWeek(oud, nieuw, dt) {
  const r = valideerVlaai(oud && oud.week === (nieuw || {}).week ? oud : null, nieuw, dt); if (r) return r;
  if (getal(nieuw.tijdOver, 1800) > 1800 || (nieuw.gilde && (nieuw.gilde.perks || []).length) || getal((nieuw.gilde || {}).verdiend) > 0) return 'de wedstrijd begint voor iedereen gelijk';
  if (oud && oud.week === nieuw.week && getal(nieuw.tijdOver) > getal(oud.tijdOver) + 2) return 'de baktijd kan niet terug';
  if (oud && oud.week === nieuw.week && getal(oud.tijdOver) - getal(nieuw.tijdOver) < dt * 0.0 - 1) return null;
  return null;
}
const VALIDATIE = { 'vlaaienbakker-week-v1': valideerWeek, 'vlaaienbakker-v1': valideerVlaai, 'rommelbeesten-v1': valideerBeesten };


const HANDLER = {
  async verwerk(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors() });
    if (!env.DB) return json({ fout: 'De database is nog niet gekoppeld (binding DB).' }, 500);
    try {
      await zorgVoorTabel(env.DB);

      // hoeveel spelers er per spel op het bord staan
      if (url.pathname === '/tellers' && request.method === 'GET') {
        const r = await env.DB.prepare('SELECT spel, COUNT(*) AS n FROM scores WHERE id NOT IN (SELECT id FROM geblokkeerd) GROUP BY spel').all();
        const uit = {}; for (const x of r.results || []) uit[x.spel] = x.n;
        return json(uit);
      }

      // op welke plek een speler staat, bij elk spel (ook buiten de beste 50)
      if (url.pathname === '/plek' && request.method === 'GET') {
        const wie = url.searchParams.get('id') || '';
        if (!/^[A-Za-z0-9_-]{1,80}$/.test(wie)) return json({ fout: 'Ongeldig' }, 400);
        const r = await env.DB.prepare('SELECT spel, plek, totaal, score, extra FROM (SELECT spel, id, score, extra, ROW_NUMBER() OVER (PARTITION BY spel ORDER BY score DESC, extra DESC, tijd ASC) AS plek, COUNT(*) OVER (PARTITION BY spel) AS totaal FROM scores WHERE id NOT IN (SELECT id FROM geblokkeerd)) WHERE id = ?').bind(wie).all();
        const plekken = {}; for (const x of r.results || []) plekken[x.spel] = { plek: x.plek, totaal: x.totaal, score: x.score, extra: x.extra };
        return json({ plekken });
      }

      if (url.pathname === '/scores' && request.method === 'GET') {
        const uit = {};
        // ook de Bakwedstrijd van de week: die heeft elke week een eigen naam (vw + weeknummer); de twee nieuwste weken gaan mee
        const weken = ((await env.DB.prepare("SELECT DISTINCT spel FROM scores WHERE spel LIKE 'vw%'").all()).results || []).map(r => r.spel).filter(x => /^vw\d{3,6}$/.test(x)).sort((a, b) => +b.slice(2) - +a.slice(2)).slice(0, 2);
        for (const spel of [...Object.keys(SPELLEN), ...weken]) {
          const r = await env.DB.prepare('SELECT id, naam, score, extra, tijd FROM scores WHERE spel = ? AND id NOT IN (SELECT id FROM geblokkeerd) ORDER BY score DESC, extra DESC, tijd ASC LIMIT ?').bind(spel, TOP).all();
          uit[spel] = r.results || [];
        }
        return json(uit);
      }

      if (url.pathname === '/score' && request.method === 'POST') {
        if (teSnel(request.headers.get('CF-Connecting-IP') || 'onbekend')) return json({ fout: 'Even rustig aan.' }, 429);
        const b = await lees(request);
        if (!b) return json({ fout: 'Ongeldige gegevens' }, 400);
        const spel = String(b.spel || '');
        if (!spelDef(spel)) return json({ fout: 'Onbekend spel' }, 400);
        const naam = schoneNaam(b.naam);
        if (!naam) return json({ fout: 'Kies een andere naam (2 tot 16 tekens, zonder rare woorden).' }, 400);
        const geheim = String(b.geheim || '');
        if (geheim.length < 16 || geheim.length > 80) return json({ fout: 'Ongeldige speler' }, 400);
        const score = Number(b.score), extra = Number(b.extra || 0);
        if (!Number.isFinite(score) || score < 0 || score > spelDef(spel).max) return json({ fout: 'Ongeldige score' }, 400);
        const id = await idVan(geheim), nu = Date.now();
        if (await env.DB.prepare('SELECT 1 FROM geblokkeerd WHERE id = ?').bind(id).first()) return json({ fout: 'Je kunt op dit moment geen scores insturen.' }, 403);
        await env.DB.prepare(
          'INSERT INTO scores (spel, id, naam, score, extra, tijd) VALUES (?, ?, ?, ?, ?, ?) ' +
          'ON CONFLICT(spel, id) DO UPDATE SET naam = excluded.naam, ' +
          'extra = CASE WHEN excluded.score > scores.score OR (excluded.score = scores.score AND excluded.extra > scores.extra) THEN excluded.extra ELSE scores.extra END, ' +
          'tijd = CASE WHEN excluded.score > scores.score THEN excluded.tijd ELSE scores.tijd END, ' +
          'score = MAX(scores.score, excluded.score)'
        ).bind(spel, id, naam, score, Number.isFinite(extra) ? extra : 0, nu).run();
        // ook je naam bij je andere spellen bijwerken
        await env.DB.prepare('UPDATE scores SET naam = ? WHERE id = ?').bind(naam, id).run();
        return json({ ok: true, id });
      }

      if (url.pathname === '/naam' && request.method === 'POST') {
        if (teSnel(request.headers.get('CF-Connecting-IP') || 'onbekend')) return json({ fout: 'Even rustig aan.' }, 429);
        const b = await lees(request);
        const naam = b && schoneNaam(b.naam);
        if (!naam) return json({ fout: 'Kies een andere naam (2 tot 16 tekens, zonder rare woorden).' }, 400);
        if (!b.geheim || String(b.geheim).length < 16) return json({ fout: 'Ongeldige speler' }, 400);
        await env.DB.prepare('UPDATE scores SET naam = ? WHERE id = ?').bind(naam, await idVan(String(b.geheim))).run();
        return json({ ok: true });
      }

      if (url.pathname === '/verwijder' && request.method === 'POST') {
        const b = await lees(request);
        if (!b || !b.geheim) return json({ fout: 'Ongeldige gegevens' }, 400);
        await env.DB.prepare('DELETE FROM scores WHERE id = ?').bind(await idVan(String(b.geheim))).run();
        return json({ ok: true });
      }

      if (url.pathname === '/score' && request.method === 'DELETE') {
        if (!isBeheer(request, env)) return json({ fout: 'Geen toegang' }, 401);
        const spel = url.searchParams.get('spel'), id = url.searchParams.get('id');
        if (!spelDef(spel) || !id) return json({ fout: 'Ongeldige gegevens' }, 400);
        await env.DB.prepare('DELETE FROM scores WHERE spel = ? AND id = ?').bind(spel, id).run();
        return json({ ok: true });
      }

      // ---- ideeënbox
      if (url.pathname === '/idee' && request.method === 'POST') {
        const ip = request.headers.get('CF-Connecting-IP') || 'onbekend';
        const b = await lees(request); if (!b) return json({ fout: 'Ongeldige gegevens' }, 400);
        const tekst = schoneTekst(b.tekst); if (!tekst) return json({ fout: 'Je idee moet tussen de 10 en 500 tekens zijn, zonder links of nare woorden.' }, 400);
        const naam = b.naam ? schoneNaam(b.naam) : ''; if (naam === null) return json({ fout: 'Die naam kan niet. Gebruik 2 tot 16 letters of cijfers.' }, 400);
        const soort = SOORTEN.includes(b.soort) ? b.soort : 'anders';
        if (teVeelIdeeen(ip)) return json({ fout: 'Je hebt al veel ideeën gestuurd. Probeer het over een uurtje nog eens.' }, 429);
        await env.DB.prepare('INSERT INTO ideeen (tekst, naam, soort, tijd) VALUES (?, ?, ?, ?)').bind(tekst, naam || '', soort, Date.now()).run();
        return json({ ok: true });
      }
      if (url.pathname === '/ideeen' && request.method === 'GET') {
        const r = await env.DB.prepare('SELECT id, tekst, naam, soort, status, stemmen, tijd FROM ideeen WHERE publiek = 1 ORDER BY stemmen DESC, tijd DESC LIMIT 100').all();
        return json({ ideeen: r.results || [] });
      }
      if (url.pathname === '/stem' && request.method === 'POST') {
        const b = await lees(request); if (!b || !b.geheim || !Number.isInteger(b.id)) return json({ fout: 'Ongeldige gegevens' }, 400);
        const wie = await idVan(String(b.geheim));
        const idee = await env.DB.prepare('SELECT id FROM ideeen WHERE id = ? AND publiek = 1').bind(b.id).first();
        if (!idee) return json({ fout: 'Dat idee bestaat niet' }, 404);
        await env.DB.prepare('INSERT OR IGNORE INTO stemmen (idee, wie) VALUES (?, ?)').bind(b.id, wie).run();
        await env.DB.prepare('UPDATE ideeen SET stemmen = (SELECT COUNT(*) FROM stemmen WHERE idee = ?) WHERE id = ?').bind(b.id, b.id).run();
        const r = await env.DB.prepare('SELECT stemmen FROM ideeen WHERE id = ?').bind(b.id).first();
        return json({ ok: true, stemmen: r ? r.stemmen : 0 });
      }
      if (url.pathname === '/ideeen/alle' && request.method === 'GET') {
        if (!isBeheer(request, env)) return json({ fout: 'Geen toegang' }, 401);
        const r = await env.DB.prepare('SELECT * FROM ideeen ORDER BY tijd DESC LIMIT 500').all();
        return json({ ideeen: r.results || [] });
      }
      if (url.pathname === '/idee/zet' && request.method === 'POST') {
        if (!isBeheer(request, env)) return json({ fout: 'Geen toegang' }, 401);
        const b = await lees(request); if (!b || !Number.isInteger(b.id)) return json({ fout: 'Ongeldige gegevens' }, 400);
        if (b.status !== undefined && STATUSSEN.includes(b.status)) await env.DB.prepare('UPDATE ideeen SET status = ? WHERE id = ?').bind(b.status, b.id).run();
        if (b.publiek !== undefined) await env.DB.prepare('UPDATE ideeen SET publiek = ? WHERE id = ?').bind(b.publiek ? 1 : 0, b.id).run();
        return json({ ok: true });
      }
      if (url.pathname === '/idee' && request.method === 'DELETE') {
        if (!isBeheer(request, env)) return json({ fout: 'Geen toegang' }, 401);
        const id = +url.searchParams.get('id'); if (!id) return json({ fout: 'Ongeldige gegevens' }, 400);
        await env.DB.prepare('DELETE FROM ideeen WHERE id = ?').bind(id).run(); await env.DB.prepare('DELETE FROM stemmen WHERE idee = ?').bind(id).run();
        return json({ ok: true });
      }

      // ---------- koppelen: dezelfde voortgang op al je apparaten, met alleen een koppelcode (geen naam, geen e-mail)
      if (url.pathname === '/sync' && request.method === 'POST') {
        if (teSnel(request.headers.get('CF-Connecting-IP') || 'onbekend')) return json({ fout: 'Even rustig aan.' }, 429);
        const b = await lees(request);
        const code = b && typeof b.code === 'string' ? b.code.toLowerCase().replace(/[^a-z0-9-]/g, '') : '';
        if (code.length < 12 || code.length > 80) return json({ fout: 'Ongeldige koppelcode' }, 400);
        const id = await idVan('koppel:' + code), nu = Date.now();
        const geweigerd = {}, vervangen = {}, apparaat = typeof b.apparaat === 'string' ? b.apparaat.replace(/[^a-z0-9]/gi, '').slice(0, 40) : '';
        const zetApparaat = async (sleutel, data, t) => { if (!apparaat) return; await env.DB.prepare('INSERT INTO sync_apparaat (id, sleutel, apparaat, data, t) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id, sleutel, apparaat) DO UPDATE SET data = excluded.data, t = excluded.t').bind(id, sleutel, apparaat, data, t).run(); };
        for (const [sleutel, it] of Object.entries((b.items && typeof b.items === 'object') ? b.items : {}).slice(0, 30)) {
          if (!/^[a-z0-9-]{3,40}$/.test(sleutel) || !it || typeof it.data !== 'string' || it.data.length > 400000) continue;
          const t = Math.min(nu + 60000, Math.max(1, Math.floor(+it.t || 0)));
          // controle tegen valsspelen: vergelijk met wat DIT apparaat de vorige keer had (een ander apparaat kan een heel andere stand hebben);
          // een nieuw apparaat wordt vergeleken met de laatste stand van het account, zodat een nieuw apparaatnummer de controle niet omzeilt
          if (VALIDATIE[sleutel]) {
            const oudRij = await env.DB.prepare('SELECT data, t FROM sync_data WHERE id = ? AND sleutel = ?').bind(id, sleutel).first();
            const appRij = apparaat ? await env.DB.prepare('SELECT data, t FROM sync_apparaat WHERE id = ? AND sleutel = ? AND apparaat = ?').bind(id, sleutel, apparaat).first() : null;
            const basis = appRij || oudRij;
            let oud = null, nieuw = null, hoofd = null; try { oud = basis ? JSON.parse(basis.data) : null; } catch (e) {} try { nieuw = JSON.parse(it.data); } catch (e) {} try { hoofd = oudRij ? JSON.parse(oudRij.data) : null; } catch (e) {}
            const dt = basis ? Math.max(0, (nu - Math.min(basis.t, nu)) / 1000) : 0;
            DETAIL = ''; const reden = VALSSPEEL_CONTROLE ? VALIDATIE[sleutel](oud, nieuw, dt) : '', detail = DETAIL;
            if (reden) {
              geweigerd[sleutel] = reden; try { const g = await env.DB.prepare('INSERT INTO geweigerd (t, id, sleutel, reden) VALUES (?, ?, ?, ?) RETURNING nr').bind(nu, id, sleutel, (detail ? reden + ' · ' + detail : reden) + (apparaat ? ' · apparaat ' + apparaat.slice(0, 6) : '')).first(); if (g && g.nr) { await env.DB.prepare('INSERT INTO geweigerd_data (nr, data) VALUES (?, ?)').bind(g.nr, it.data).run(); await env.DB.prepare('DELETE FROM geweigerd_data WHERE nr < ?').bind(g.nr - 40).run(); } } catch (e) {}
              if (oudRij) await zetApparaat(sleutel, oudRij.data, oudRij.t);   // dit apparaat krijgt de stand van het account terug
              continue;
            }
            // de meeste voortgang wint: een apparaat dat achterloopt, overschrijft de betere stand niet maar krijgt die terug
            const VOORTGANG = { 'vlaaienbakker-v1': d => getal(d && d.ooit) };
            if (VOORTGANG[sleutel] && hoofd && oudRij && VOORTGANG[sleutel](hoofd) > VOORTGANG[sleutel](nieuw)) { vervangen[sleutel] = true; await zetApparaat(sleutel, oudRij.data, oudRij.t); continue; }
            await zetApparaat(sleutel, it.data, t);
            if (VOORTGANG[sleutel]) { await env.DB.prepare('INSERT INTO sync_data (id, sleutel, data, t) VALUES (?, ?, ?, ?) ON CONFLICT(id, sleutel) DO UPDATE SET data = excluded.data, t = MAX(excluded.t, sync_data.t + 1)').bind(id, sleutel, it.data, t).run(); continue; }
          }
          await env.DB.prepare('INSERT INTO sync_data (id, sleutel, data, t) VALUES (?, ?, ?, ?) ON CONFLICT(id, sleutel) DO UPDATE SET data = excluded.data, t = excluded.t WHERE excluded.t > sync_data.t').bind(id, sleutel, it.data, t).run();
        }
        const bekend = (b.bekend && typeof b.bekend === 'object') ? b.bekend : {};
        const rijen = await env.DB.prepare('SELECT sleutel, data, t FROM sync_data WHERE id = ?').bind(id).all();
        const items = {}; for (const r of rijen.results || []) if (r.t > (+bekend[r.sleutel] || 0) || geweigerd[r.sleutel] || vervangen[r.sleutel]) items[r.sleutel] = { t: r.t, data: r.data };
        return json({ ok: true, items, geweigerd, vervangen, aantal: (rijen.results || []).length });
      }
      // ---------- Rommelbeesten: verzamelingen bewaren (anoniem, met een spelerscode) en cadeaus van Ruben
      if (url.pathname === '/rb/sync' && request.method === 'POST') {
        if (teSnel(request.headers.get('CF-Connecting-IP') || 'onbekend')) return json({ fout: 'Even rustig aan.' }, 429);
        const b = await lees(request);
        if (!b || typeof b.geheim !== 'string' || b.geheim.length < 16 || b.geheim.length > 80 || !b.data || typeof b.data !== 'object') return json({ fout: 'Ongeldige gegevens' }, 400);
        const data = JSON.stringify(b.data); if (data.length > 60000) return json({ fout: 'Te groot' }, 413);
        const id = await idVan(b.geheim), code = id.slice(0, 6).toUpperCase(), naam = schoneNaam(b.naam) || '';
        await env.DB.prepare('INSERT INTO rb_spelers (id, code, naam, data, laatst) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET naam = excluded.naam, data = excluded.data, laatst = excluded.laatst').bind(id, code, naam, data, Date.now()).run();
        const c = await env.DB.prepare('SELECT nr, data FROM rb_cadeaus WHERE speler = ? AND opgehaald IS NULL ORDER BY nr').bind(id).all();
        const cadeaus = (c.results || []).map(r => ({ nr: r.nr, ...JSON.parse(r.data) }));
        return json({ ok: true, code, cadeaus });
      }
      if (url.pathname === '/rb/ontvangen' && request.method === 'POST') {
        const b = await lees(request);
        if (!b || typeof b.geheim !== 'string' || !Array.isArray(b.nrs) || !b.nrs.length) return json({ fout: 'Ongeldige gegevens' }, 400);
        const id = await idVan(b.geheim), nrs = b.nrs.slice(0, 100).map(n => Math.floor(+n)).filter(n => n > 0);
        if (nrs.length) await env.DB.prepare(`UPDATE rb_cadeaus SET opgehaald = ? WHERE speler = ? AND nr IN (${nrs.map(() => '?').join(',')})`).bind(Date.now(), id, ...nrs).run();
        return json({ ok: true });
      }
      if (url.pathname === '/rb/spelers' && request.method === 'GET') {
        if (!isBeheer(request, env)) return json({ fout: 'Geen toegang' }, 401);
        const r = await env.DB.prepare('SELECT id, code, naam, data, laatst FROM rb_spelers ORDER BY laatst DESC LIMIT 500').all();
        return json((r.results || []).map(x => { let d = {}; try { d = JSON.parse(x.data); } catch (e) {} return { id: x.id, code: x.code, naam: x.naam, laatst: x.laatst, kort: d.kort || {} }; }));
      }
      if (url.pathname === '/rb/speler' && request.method === 'GET') {
        if (!isBeheer(request, env)) return json({ fout: 'Geen toegang' }, 401);
        const x = await env.DB.prepare('SELECT id, code, naam, data, laatst FROM rb_spelers WHERE id = ? OR code = ?').bind(url.searchParams.get('id') || '', (url.searchParams.get('id') || '').toUpperCase()).first();
        if (!x) return json({ fout: 'Niet gevonden' }, 404);
        const open = await env.DB.prepare('SELECT nr, data, gemaakt FROM rb_cadeaus WHERE speler = ? AND opgehaald IS NULL').bind(x.id).all();
        return json({ id: x.id, code: x.code, naam: x.naam, laatst: x.laatst, data: JSON.parse(x.data), wachtend: (open.results || []).map(r => ({ nr: r.nr, gemaakt: r.gemaakt, ...JSON.parse(r.data) })) });
      }
      if (url.pathname === '/rb/geef' && request.method === 'POST') {
        if (!isBeheer(request, env)) return json({ fout: 'Geen toegang' }, 401);
        const b = await lees(request);
        if (!b || typeof b.speler !== 'string') return json({ fout: 'Ongeldige gegevens' }, 400);
        const x = await env.DB.prepare('SELECT id FROM rb_spelers WHERE id = ? OR code = ?').bind(b.speler, b.speler.toUpperCase()).first();
        if (!x) return json({ fout: 'Speler niet gevonden' }, 404);
        const cadeau = { kaarten: (Array.isArray(b.kaarten) ? b.kaarten : []).slice(0, 200).filter(k => k && typeof k.id === 'string').map(k => ({ id: k.id.slice(0, 12), glim: !!k.glim, n: Math.max(1, Math.min(50, Math.floor(+k.n || 1))) })), munten: Math.max(0, Math.min(1000000, Math.floor(+b.munten || 0))), pakjes: (Array.isArray(b.pakjes) ? b.pakjes : []).slice(0, 50).map(t => String(t).slice(0, 20)), bericht: String(b.bericht || '').slice(0, 200) };
        await env.DB.prepare('INSERT INTO rb_cadeaus (speler, data, gemaakt) VALUES (?, ?, ?)').bind(x.id, JSON.stringify(cadeau), Date.now()).run();
        return json({ ok: true });
      }
      if (url.pathname === '/' && request.method === 'GET') return json({ ok: true, wat: 'Scorebord van Ruben\'s rommelhoekje' });
      return json({ fout: 'Niet gevonden' }, 404);
    } catch (e) {
      const code = await logFout(env, 'server', url.pathname, e);
      return json({ fout: 'Er ging iets mis op de server.', code }, 500);
    }
  },
  // ================================================================ DE VEILIGE SCHIL OM ELK VERZOEK
  async fetch(request, env, ctx) {
    const url = new URL(request.url), origin = request.headers.get('Origin') || '', ip = request.headers.get('CF-Connecting-IP') || 'onbekend';
    const toegestaan = !origin || magOrigin(origin, env);
    const af = res => afmaken(res, origin, toegestaan);
    try {
      // de vooraf-vraag van de browser: welke methodes en kopregels mogen (Authorization en Content-Type voor het beheer)
      if (request.method === 'OPTIONS') return af(new Response(null, { status: toegestaan ? 204 : 403, headers: cors() }));
      if (origin && !toegestaan) return af(json({ fout: 'Deze website mag het scorebord niet gebruiken.' }, 403));
      const lengte = +(request.headers.get('Content-Length') || 0); if (lengte > 8e6) return af(json({ fout: 'Dit verzoek is te groot.' }, 413));
      if (!env.DB) return af(json({ fout: 'De database is nog niet gekoppeld (binding DB).' }, 500));
      await zorgVoorTabel(env.DB);
      // beheer: geblokkeerd na te veel mislukte pogingen, en alles in het logboek
      const auth = request.headers.get('Authorization'); let beheer = false;
      if (auth && env.BEHEER && env.BEHEER.length < 12) return af(json({ fout: 'Je beheerwachtwoord in Cloudflare is te kort. Maak het minstens 12 tekens lang (Workers, rommelscores, Instellingen, Variabelen: BEHEER).' }, 401));
      if (auth) {
        const ipH = await idVan('ip:' + ip);
        const n = await env.DB.prepare('SELECT COUNT(*) AS n FROM beheer_mislukt WHERE ip = ? AND t > ?').bind(ipH, Date.now() - 15 * 60000).first();
        if (n && n.n >= 8) return af(json({ fout: 'Te veel verkeerde wachtwoorden. Probeer het over een kwartier opnieuw.' }, 429));
        beheer = isBeheer(request, env);
        if (!beheer) { await env.DB.prepare('INSERT INTO beheer_mislukt (ip, t) VALUES (?, ?)').bind(ipH, Date.now()).run(); await env.DB.prepare('DELETE FROM beheer_mislukt WHERE t < ?').bind(Date.now() - 86400000).run(); if (url.pathname.startsWith('/beheer/')) return af(json({ fout: 'Geen toegang' }, 401)); }
        else if (request.method !== 'GET') await logboek(env, request.method + ' ' + url.pathname, '', ipH);
      }
      // openbaar: de status, en foutmeldingen uit de browser
      if (url.pathname === '/status' && request.method === 'GET') { const sch = await schakelaars(env), b = await env.DB.prepare('SELECT waarde FROM instellingen WHERE sleutel = ?').bind('hotel:bericht').first(); return af(json({ ok: true, versie: VERSIE, dicht: Object.keys(sch).filter(k => sch[k]), hotel: { open: !sch.hotel, bericht: sch.hotel ? ((b && b.waarde) || 'Het hotel is even gesloten.') : '' } })); }
      if (url.pathname === '/fout' && request.method === 'POST') { if (teSnel(ip)) return af(json({ fout: 'Te snel' }, 429)); const b = await lees(request) || {};
        // fouten van browserextensies van bezoekers horen niet bij de site: niet bewaren
        if (/chrome-extension:|moz-extension:|safari(-web)?-extension:|runtime\.sendMessage|Extension context invalidated|Tab not found|message port closed|Receiving end does not exist/i.test(String(b.bericht || '') + ' ' + String(b.stack || '') + ' ' + String(b.bron || ''))) return af(json({ ok: true, genegeerd: true }));
        await logFout(env, 'browser', String(b.pagina || '').slice(0, 80), { message: String(b.bericht || '').slice(0, 300) + (b.regel ? ' (regel ' + String(b.regel).slice(0, 20) + ')' : '') }); return af(json({ ok: true })); }
      // het beheer
      if (url.pathname.startsWith('/beheer/')) { if (!beheer) return af(json({ fout: 'Geen toegang' }, 401)); return af(await beheerRoute(request, env, url)); }
      // noodknoppen: onderdelen tijdelijk dicht (het beheer kan er altijd bij)
      if (!beheer && request.method !== 'GET') { const sch = await schakelaars(env), p = url.pathname; const onderdeel = /^\/(score|naam|verwijder)$/.test(p) ? 'scores' : p === '/sync' ? 'sync' : /^\/(idee|stem)$/.test(p) ? 'ideeen' : p.startsWith('/rb/') ? 'beesten' : null; if (sch.alles || (onderdeel && sch[onderdeel])) return af(json({ fout: 'Dit onderdeel is even in onderhoud. Probeer het later opnieuw.', onderhoud: true }, 503)); }
      return af(await HANDLER.verwerk(request, env));
    } catch (e) {
      const code = await logFout(env, 'server', url.pathname, e);
      return af(json({ fout: 'Er ging iets mis op de server.', code }, 500));
    }
  },
};
export default HANDLER;
