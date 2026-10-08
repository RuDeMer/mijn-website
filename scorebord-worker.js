// Scorebord voor Ruben's rommelhoekje
// Een Cloudflare Worker met een D1-database (binding: DB) en een geheim beheerwachtwoord (secret: BEHEER).
//
//   GET  /scores                    de toplijsten van alle spellen
//   POST /score      {spel, naam, geheim, score, extra}   een score insturen (de beste blijft staan)
//   POST /naam       {geheim, naam}  je naam veranderen bij al je scores
//   POST /verwijder  {geheim}        je eigen scores weghalen
//   DELETE /score?spel=..&id=..      een score weghalen (alleen met het beheerwachtwoord)

const SPELLEN = {
  vlaai: { naam: 'Vlaaienbakker', max: 1e40 },
  woord: { naam: 'Rommelwoord', max: 100000 },
  poker: { naam: 'Rommelpoker', max: 100000 },
};
// lange woorden blokkeren we overal in een naam, korte alleen als los woord (zodat bijvoorbeeld 'Spike' en 'Lulu' gewoon mogen)
const VERBODEN_LANG = ['kanker', 'hoer', 'neuk', 'fuck', 'shit', 'nazi', 'hitler', 'tering', 'tyfus', 'bitch', 'porn', 'neger', 'nikker', 'flikker', 'mongool', 'kut', 'slet'];
const VERBODEN_KORT = ['lul', 'pik', 'kkr', 'sex', 'seks'];
const TOP = 50;

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
  await db.prepare('CREATE TABLE IF NOT EXISTS scores (spel TEXT NOT NULL, id TEXT NOT NULL, naam TEXT NOT NULL, score REAL NOT NULL, extra REAL NOT NULL DEFAULT 0, tijd INTEGER NOT NULL, PRIMARY KEY (spel, id))').run();
  tabelKlaar = true;
}
async function lees(request) { try { return JSON.parse(await request.text()); } catch (e) { return null; } }

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors() });
    if (!env.DB) return json({ fout: 'De database is nog niet gekoppeld (binding DB).' }, 500);
    try {
      await zorgVoorTabel(env.DB);

      if (url.pathname === '/scores' && request.method === 'GET') {
        const uit = {};
        for (const spel of Object.keys(SPELLEN)) {
          const r = await env.DB.prepare('SELECT id, naam, score, extra, tijd FROM scores WHERE spel = ? ORDER BY score DESC, extra DESC, tijd ASC LIMIT ?').bind(spel, TOP).all();
          uit[spel] = r.results || [];
        }
        return json(uit);
      }

      if (url.pathname === '/score' && request.method === 'POST') {
        if (teSnel(request.headers.get('CF-Connecting-IP') || 'onbekend')) return json({ fout: 'Even rustig aan.' }, 429);
        const b = await lees(request);
        if (!b) return json({ fout: 'Ongeldige gegevens' }, 400);
        const spel = String(b.spel || '');
        if (!SPELLEN[spel]) return json({ fout: 'Onbekend spel' }, 400);
        const naam = schoneNaam(b.naam);
        if (!naam) return json({ fout: 'Kies een andere naam (2 tot 16 tekens, zonder rare woorden).' }, 400);
        const geheim = String(b.geheim || '');
        if (geheim.length < 16 || geheim.length > 80) return json({ fout: 'Ongeldige speler' }, 400);
        const score = Number(b.score), extra = Number(b.extra || 0);
        if (!Number.isFinite(score) || score < 0 || score > SPELLEN[spel].max) return json({ fout: 'Ongeldige score' }, 400);
        const id = await idVan(geheim), nu = Date.now();
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
        if (!env.BEHEER || request.headers.get('Authorization') !== 'Bearer ' + env.BEHEER) return json({ fout: 'Geen toegang' }, 401);
        const spel = url.searchParams.get('spel'), id = url.searchParams.get('id');
        if (!SPELLEN[spel] || !id) return json({ fout: 'Ongeldige gegevens' }, 400);
        await env.DB.prepare('DELETE FROM scores WHERE spel = ? AND id = ?').bind(spel, id).run();
        return json({ ok: true });
      }

      if (url.pathname === '/' && request.method === 'GET') return json({ ok: true, wat: 'Scorebord van Ruben\'s rommelhoekje' });
      return json({ fout: 'Niet gevonden' }, 404);
    } catch (e) {
      return json({ fout: 'Er ging iets mis op de server.' }, 500);
    }
  },
};
