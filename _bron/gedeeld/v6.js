
(() => {
  'use strict';
  if (window.__v6sub) return; window.__v6sub = true;
  const THEMA = 'rommelhoekje-thema', mq = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  const minder = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const pas = () => { let k = 'auto'; try { k = localStorage.getItem(THEMA) || 'auto'; } catch (e) {} const d = k === 'donker' || (k !== 'licht' && mq.matches); document.documentElement.setAttribute('data-thema', d ? 'donker' : 'licht'); };
  pas(); if (mq.addEventListener) mq.addEventListener('change', pas); else if (mq.addListener) mq.addListener(pas);
  addEventListener('storage', e => { if (e.key === THEMA) pas(); });
  const ROMMEL = {
    dobbelsteen: ['de dobbelsteen', '<rect x="10" y="10" width="44" height="44" rx="9" fill="#FFFFFF" stroke="#231A26" stroke-width="3.5"/><circle cx="22" cy="22" r="4.2" fill="#231A26"/><circle cx="42" cy="42" r="4.2" fill="#231A26"/><circle cx="32" cy="32" r="4.2" fill="#C8323C"/><circle cx="42" cy="22" r="4.2" fill="#231A26"/><circle cx="22" cy="42" r="4.2" fill="#231A26"/>'],
    knoop: ['de knoop', '<circle cx="32" cy="32" r="22" fill="#2F6FB5" stroke="#231A26" stroke-width="3.5"/><circle cx="32" cy="32" r="15" fill="none" stroke="#1F4F85" stroke-width="2.5"/><circle cx="26" cy="26" r="3.2" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/><circle cx="38" cy="26" r="3.2" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/><circle cx="26" cy="38" r="3.2" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/><circle cx="38" cy="38" r="3.2" fill="#FBF6E9" stroke="#231A26" stroke-width="2"/>'],
    potlood: ['het potlood', '<g transform="rotate(-40 32 32)"><rect x="12" y="25" width="34" height="14" fill="#F2C94C" stroke="#231A26" stroke-width="3"/><path d="M46 25l12 7-12 7z" fill="#F4DCC2" stroke="#231A26" stroke-width="3" stroke-linejoin="round"/><path d="M54 29.7l4 2.3-4 2.3z" fill="#231A26"/><rect x="6" y="25" width="7" height="14" rx="2" fill="#E8577A" stroke="#231A26" stroke-width="3"/></g>'],
    paperclip: ['de paperclip', '<path d="M24 50V18a8 8 0 0 1 16 0v30a12 12 0 0 1-24 0V22" fill="none" stroke="#231A26" stroke-width="7" stroke-linecap="round"/><path d="M24 50V18a8 8 0 0 1 16 0v30a12 12 0 0 1-24 0V22" fill="none" stroke="#B8C0C8" stroke-width="3.4" stroke-linecap="round"/>'],
    kroonkurk: ['de kroonkurk', '<path d="M32 9l5 4 6-2 3 5 6 1 0 6 5 4-3 5 3 5-5 4 0 6-6 1-3 5-6-2-5 4-5-4-6 2-3-5-6-1 0-6-5-4 3-5-3-5 5-4 0-6 6-1 3-5 6 2z" fill="#C8323C" stroke="#231A26" stroke-width="3" stroke-linejoin="round"/><circle cx="32" cy="32" r="13" fill="#E8414E" stroke="#231A26" stroke-width="2.5"/><path d="M26 30c2-3 8-3 12 0" fill="none" stroke="#FBF6E9" stroke-width="2.5" stroke-linecap="round"/>'],
    sterretje: ['het sterretje', '<path d="M32 7l7.4 15 16.6 2.4-12 11.7 2.8 16.5L32 44.8 17.2 52.6 20 36.1 8 24.4l16.6-2.4z" fill="#FFE76A" stroke="#231A26" stroke-width="3.5" stroke-linejoin="round"/>'],
    tol: ['de tol', '<path d="M32 8v8" stroke="#231A26" stroke-width="4" stroke-linecap="round"/><path d="M12 30c0-9 9-14 20-14s20 5 20 14c0 4-2 7-6 10L32 56 18 40c-4-3-6-6-6-10z" fill="#2E8B62" stroke="#231A26" stroke-width="3.5" stroke-linejoin="round"/><path d="M13 30h38" stroke="#FFE76A" stroke-width="4"/>'],
    knikker: ['de knikker', '<circle cx="32" cy="32" r="20" fill="#7FB3E6" stroke="#231A26" stroke-width="3.5"/><path d="M18 36c6-10 18-12 28-4" fill="none" stroke="#C8323C" stroke-width="4" stroke-linecap="round"/><circle cx="25" cy="24" r="4.5" fill="#FFFFFF" opacity=".85"/>'],
  };
  const SOORTEN = ['dobbelsteen', 'sterretje', 'knoop', 'potlood'];
  const items = [];
  for (const [i, soort] of SOORTEN.entries()) {
    const [naam, svg] = ROMMEL[soort];
    const b = document.createElement('button'); b.type = 'button'; b.className = 'tg-rommel'; b.setAttribute('aria-label', 'Geef ' + naam + ' een zetje');
    b.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true">' + svg + '</svg>'; b.style.transform = 'rotate(' + (((i * 37) % 40) - 20) + 'deg)';
    const it = { el: b, versleept: false }; let start = null;
    const hup = () => { if (minder) return; b.classList.remove('hup'); void b.offsetWidth; b.classList.add('hup'); };
    b.addEventListener('animationend', () => b.classList.remove('hup'));
    b.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse' && !start) hup(); });
    b.addEventListener('pointerdown', e => { start = { x: e.clientX, y: e.clientY, l: parseFloat(b.style.left), t: parseFloat(b.style.top), weg: false, id: e.pointerId }; try { b.setPointerCapture(e.pointerId); } catch (x) {} });
    b.addEventListener('pointermove', e => { if (!start || e.pointerId !== start.id) return; const dx = e.clientX - start.x, dy = e.clientY - start.y; if (!start.weg && Math.hypot(dx, dy) < 6) return; start.weg = true; b.classList.add('sleept'); b.style.left = Math.max(0, Math.min(document.documentElement.scrollWidth - b.offsetWidth, start.l + dx)) + 'px'; b.style.top = Math.max(0, start.t + dy) + 'px'; });
    const los = e => { if (!start || (e && e.pointerId !== start.id)) return; const weg = start.weg; start = null; b.classList.remove('sleept'); if (weg) it.versleept = true; else hup(); };
    b.addEventListener('pointerup', los); b.addEventListener('pointercancel', los);
    b.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hup(); } });
    document.body.appendChild(b); items.push(it);
  }
  function plaats() {
    const m = document.querySelector('main') || document.body, r = m.getBoundingClientRect(), vw = document.documentElement.clientWidth;
    const links = r.left - 80, rechts = r.right + 16, ruimte = links >= 6 && rechts + 62 <= vw - 6, hoog = Math.max(600, document.documentElement.scrollHeight - 200);
    items.forEach((it, i) => { if (it.versleept) return; it.el.hidden = !ruimte; if (!ruimte) return; const kant = i % 2 ? rechts : links; it.el.style.left = (kant + scrollX) + 'px'; it.el.style.top = (r.top + scrollY + 120 + (i * hoog) / items.length * 0.8) + 'px'; });
  }
  plaats(); let t = 0; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(plaats, 150); }); addEventListener('load', plaats); setTimeout(plaats, 1200);
})();

