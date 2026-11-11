/* feest-home.js: het feestbord op de homepage (geladen door feest.js, alleen op de homepage).
   Het bord staat in section#feest (gemaakt door home_v6 in homepage-onderdelen.js, op de plek waar het casinobord stond), alleen in de
   feestperiodes uit feestdagen.json. Alles is eigen werk: de tekeningen, de gedichtjes en de geluidjes.
   Deel 1 (Sinterklaas): de intocht op zaterdag 14 november (de Stoomboot vaart binnen en legt aan; het intochtcadeautje),
   en van 14 november tot en met 4 december elke dag je schoen zetten (de volgende dag zit er een ingepakt cadeautje in, dat naar je
   stapel gaat). Pepernoten tussen de rommeltjes (RM.pepernoten in homepage-onderdelen.js).
   Versiering uit (per apparaat, rommelhoekje-feest-apparaat.uit): geen pepernoten en niets dat beweegt; het bord blijft.
   Testhaak: window.RommelFeestHome. */
(function () {
  'use strict';
  if (window.RommelFeestHome) return;
  var F = null, sec = null, bord = null, minder = false, laatsteSig = '', laatsteFase = '';
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var meer = function (n, een, veel) { return n + ' ' + (n === 1 ? een : veel); };
  var naam = function () { try { var s = JSON.parse(localStorage.getItem('rommelhoekje-speler') || 'null'); return s && s.naam ? String(s.naam) : ''; } catch (e) { return ''; } };

  // ================= wat je met de feestdagen kunt krijgen (deel 1: de intocht)
  var SPUL = {
    intocht26: { naam: 'Stoombootvlaggetje 2026', wat: 'Verzamelstuk van de intocht', feest: 'Sinterklaas 2026', teken: function () { return vlaggetje(); } }
  };
  var GEDICHT = {
    intocht26: ['De stoomboot is er, kijk eens aan,', 'de Sint en zijn Pieten zijn net aan land gegaan.', 'Dit vlaggetje is voor jou, als welkomstgroet:', 'zet elke dag je schoen, dan komt het goed!']
  };

  // ================= de tekeningen (eigen werk, in de stijl van het rommelhoekje: inktranden, platte kleuren met wat licht en schaduw)
  var I = '#231A26', WIT = '#FBF6E9', GOUD = '#E9B949', ROOD = '#C8323C';
  var r1 = function (x) { return Math.round(x * 10) / 10; };
  var pd = function (d, f, rest) { return '<path d="' + d + '" fill="' + (f || 'none') + '"' + (rest == null ? ' stroke="' + I + '" stroke-width="2" stroke-linejoin="round"' : ' ' + rest) + '/>'; };
  // een vast toeval (dezelfde tekening bij elk bezoek)
  function zaad(n) { var s = n * 9301 + 49297; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function vlaggetje() {
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M30 14v96" stroke="#7A4E2D" stroke-width="5" stroke-linecap="round"/><circle cx="30" cy="12" r="5" fill="' + GOUD + '" stroke="' + I + '" stroke-width="2"/>' +
      '<path d="M33 18h70l-12 20 12 20H33z" fill="' + ROOD + '" stroke="' + I + '" stroke-width="3" stroke-linejoin="round"/><path d="M33 38h62" stroke="' + WIT + '" stroke-width="4" opacity=".9"/>' +
      '<path d="M41 33h28l-4 5H45z" fill="' + WIT + '" stroke="' + I + '" stroke-width="1.4" stroke-linejoin="round"/><rect x="53" y="25" width="6" height="8" fill="' + WIT + '" stroke="' + I + '" stroke-width="1.4"/><text x="68" y="54" font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800" font-size="13" fill="' + GOUD + '" text-anchor="middle">2026</text></svg>';
  }
  // ---------- de Sint (x, y: zijn voeten). Een eigen tekening: een rode mantel met een gouden rand, een witte albe, een mijter en een staf.
  function sint(x, y, s) {
    var g = '<g class="fb-sint" transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')">';
    // de staf, met een gouden krul
    g += '<path d="M25 0V-100" stroke="#8B6418" stroke-width="5" stroke-linecap="round"/><path d="M25 0V-100" stroke="' + GOUD + '" stroke-width="3" stroke-linecap="round"/>';
    g += '<path d="M25 -100C25 -114 42 -116 43 -104C44 -95 33 -93 32 -100C31 -104 36 -106 38 -103" fill="none" stroke="#8B6418" stroke-width="5.4" stroke-linecap="round"/><path d="M25 -100C25 -114 42 -116 43 -104C44 -95 33 -93 32 -100C31 -104 36 -106 38 -103" fill="none" stroke="' + GOUD + '" stroke-width="3.2" stroke-linecap="round"/>';
    // de albe (wit, met een kanten zoom) en de mantel
    g += pd('M-14 0L-10 -60H10L14 0Z', WIT) + pd('M-14 0q2.3 -4 4.6 0t4.6 0 4.6 0 4.6 0 4.6 0 4.6 0', 'none', 'stroke="#C9C0B0" stroke-width="1.4"');
    g += pd('M-27 0C-28 -24 -24 -46 -17 -62Q0 -71 17 -62C24 -46 28 -24 27 0H14L10 -60H-10L-14 0Z', ROOD) + pd('M-14 0L-10 -60M14 0L10 -60M-27 0H-14M14 0H27', 'none', 'stroke="' + GOUD + '" stroke-width="3"');
    g += pd('M-22 -40Q-20 -24 -21 -6', 'none', 'stroke="#A52634" stroke-width="2.4" stroke-linecap="round"') + pd('M22 -40Q20 -24 21 -6', 'none', 'stroke="#A52634" stroke-width="2.4" stroke-linecap="round"');
    g += '<circle cx="0" cy="-60" r="3.4" fill="' + GOUD + '" stroke="' + I + '" stroke-width="1.4"/>';
    // de armen: links zwaait hij, rechts houdt hij de staf vast (witte handschoenen)
    g += '<g class="fb-zwaai-sint">' + pd('M-15 -56C-24 -60 -30 -70 -33 -82', 'none', 'stroke="' + ROOD + '" stroke-width="9" stroke-linecap="round"') + pd('M-15 -56C-24 -60 -30 -70 -33 -82', 'none', 'stroke="' + I + '" stroke-width="1.2" stroke-linecap="round" opacity=".0"') + '<circle cx="-33.5" cy="-86" r="5" fill="#FFFFFF" stroke="' + I + '" stroke-width="1.8"/><path d="M-37 -88l-3 -5M-34.5 -90l-1 -6M-31.5 -90l1 -5.5" stroke="' + I + '" stroke-width="1.4" stroke-linecap="round"/></g>';
    g += pd('M15 -55C21 -50 24 -45 25 -40', 'none', 'stroke="' + ROOD + '" stroke-width="9" stroke-linecap="round"') + '<circle cx="25" cy="-40" r="5" fill="#FFFFFF" stroke="' + I + '" stroke-width="1.8"/><circle cx="23" cy="-38" r="1.6" fill="' + GOUD + '"/>';
    // het hoofd, de baard en de mijter
    g += '<circle cx="0" cy="-74" r="10.5" fill="#F1C9A5" stroke="' + I + '" stroke-width="2"/><circle cx="-5.5" cy="-71" r="2.6" fill="#F2A08C" opacity=".7"/><circle cx="5.5" cy="-71" r="2.6" fill="#F2A08C" opacity=".7"/>';
    g += pd('M-11 -74C-13 -60 -9 -46 0 -40C9 -46 13 -60 11 -74C7 -66 3 -67 0 -68C-3 -67 -7 -66 -11 -74Z', '#FFFFFF');
    g += pd('M-6 -55Q0 -52 6 -55M-4 -48Q0 -46 4 -48', 'none', 'stroke="#D8D2C6" stroke-width="1.6" stroke-linecap="round"');
    g += pd('M-7 -68Q-3 -71 0 -68Q3 -71 7 -68Q4 -64 0 -66Q-4 -64 -7 -68Z', '#FFFFFF', 'stroke="' + I + '" stroke-width="1.4"') + '<circle cx="-3.8" cy="-75.5" r="1.3" fill="' + I + '"/><circle cx="3.8" cy="-75.5" r="1.3" fill="' + I + '"/>';
    g += pd('M-7.5 -79.5q3.5 -2.5 6 -.6M7.5 -79.5q-3.5 -2.5 -6 -.6', 'none', 'stroke="#FFFFFF" stroke-width="2.6" stroke-linecap="round"');
    g += pd('M-11.5 -82L-10 -102Q0 -118 10 -102L11.5 -82Z', ROOD) + pd('M-11.5 -82H11.5', 'none', 'stroke="' + GOUD + '" stroke-width="4"') + pd('M-11 -83H11', 'none', 'stroke="' + I + '" stroke-width="1"');
    g += pd('M0 -112V-85', 'none', 'stroke="' + GOUD + '" stroke-width="2.6"') + pd('M-4.5 -101H4.5M0 -105.5V-96.5', 'none', 'stroke="' + GOUD + '" stroke-width="3.2" stroke-linecap="round"') + '<circle cx="0" cy="-101" r="1.6" fill="' + ROOD + '"/>';
    return g + '</g>';
  }
  // ---------- een roetveegpiet: een gewone huidskleur met een paar vegen roet van de schoorsteen, een kleurig pak met pofmouwen en een
  // pofbroek, een witte plooikraag en een baret met een grote veer. Wat hij vasthoudt: 'zwaai', 'zak' (een zak met pepernoten) of 'touw'.
  function piet(x, y, k, s, doet) {
    var g = '<g class="fb-piet" transform="translate(' + x + ' ' + y + ') scale(' + (s || 1) + ')">';
    g += pd('M-6 0V-16M6 0V-16', 'none', 'stroke="' + k.kous + '" stroke-width="5" stroke-linecap="round"');
    g += pd('M-11 1q0 -5 5 -5h4v5zM11 1q0 -5 -5 -5h-4v5z', I, 'stroke="' + I + '" stroke-width="1"') + '<rect x="-7" y="-3.6" width="3" height="2.4" fill="' + GOUD + '"/><rect x="4" y="-3.6" width="3" height="2.4" fill="' + GOUD + '"/>';
    // de pofbroek, gestreept
    g += pd('M-13 -16C-15 -26 -10 -31 0 -31C10 -31 15 -26 13 -16C8 -13 -8 -13 -13 -16Z', k.broek) + pd('M-6 -30Q-8 -22 -6 -14M0 -31V-13M6 -30Q8 -22 6 -14', 'none', 'stroke="' + k.streep + '" stroke-width="2.4"');
    // het wambuis met gouden knoopjes
    g += pd('M-10 -29L-11 -50Q0 -54 11 -50L10 -29Z', k.pak) + '<circle cx="0" cy="-45" r="1.4" fill="' + GOUD + '"/><circle cx="0" cy="-39" r="1.4" fill="' + GOUD + '"/><circle cx="0" cy="-33" r="1.4" fill="' + GOUD + '"/>';
    // de armen
    var arm = function (lx, ly, hx, hy, kl) { return '<g' + (kl ? ' class="' + kl + '"' : '') + '>' + pd('M' + lx + ' ' + ly + 'Q' + ((lx + hx) / 2 + (hx > 0 ? 3 : -3)) + ' ' + ((ly + hy) / 2) + ' ' + hx + ' ' + hy, 'none', 'stroke="' + I + '" stroke-width="8.4" stroke-linecap="round"') + pd('M' + lx + ' ' + ly + 'Q' + ((lx + hx) / 2 + (hx > 0 ? 3 : -3)) + ' ' + ((ly + hy) / 2) + ' ' + hx + ' ' + hy, 'none', 'stroke="' + k.mouw + '" stroke-width="5.6" stroke-linecap="round"') + '<circle cx="' + hx + '" cy="' + hy + '" r="3.6" fill="' + k.huid + '" stroke="' + I + '" stroke-width="1.5"/></g>'; };
    if (doet === 'zak') g += pd('M-20 -26c-4 -2 -6 -12 2 -15c6 -1 11 4 9 10c-1 5 -6 7 -11 5z', '#C9A267') + pd('M-18 -40q3 -3 6 0', 'none', 'stroke="' + I + '" stroke-width="1.6"') + arm(-9, -47, -16, -36);
    else g += arm(-9, -47, -15, -32);
    g += doet === 'touw' ? arm(9, -47, 20, -40) + pd('M20 -40Q40 -22 66 -8', 'none', 'stroke="#C9A267" stroke-width="2.6" stroke-linecap="round"') : arm(9, -47, 16, -64, 'fb-zwaai');
    g += pd('M-13 -50C-14 -45 -6 -44 -5 -49M13 -50C14 -45 6 -44 5 -49', k.mouw, 'stroke="' + I + '" stroke-width="1.6"');
    // de plooikraag
    g += '<ellipse cx="0" cy="-52" rx="11" ry="3.8" fill="#FFFFFF" stroke="' + I + '" stroke-width="1.6"/>' + pd('M-8 -53.5v3M-4 -54.5v4M0 -55v4.6M4 -54.5v4M8 -53.5v3', 'none', 'stroke="#C9C0B0" stroke-width="1"');
    // het hoofd: haar aan de zijkant, oren, ogen, een lach, blosjes en een paar roetvegen
    g += '<circle cx="0" cy="-62" r="9.4" fill="' + k.huid + '" stroke="' + I + '" stroke-width="2"/>';
    g += '<circle cx="-9.4" cy="-61" r="2.4" fill="' + k.huid + '" stroke="' + I + '" stroke-width="1.4"/><circle cx="9.4" cy="-61" r="2.4" fill="' + k.huid + '" stroke="' + I + '" stroke-width="1.4"/>';
    g += pd('M-9 -64q0 -6 4 -8M9 -64q0 -6 -4 -8', 'none', 'stroke="' + k.haar + '" stroke-width="3.4" stroke-linecap="round"');
    g += '<circle cx="-3.4" cy="-63" r="1.3" fill="' + I + '"/><circle cx="3.4" cy="-63" r="1.3" fill="' + I + '"/>' + pd('M-3.6 -58q3.6 3 7.2 0', 'none', 'stroke="' + I + '" stroke-width="1.5" stroke-linecap="round"');
    g += '<circle cx="-5.6" cy="-59.4" r="2.2" fill="#F2A08C" opacity=".55"/><circle cx="5.6" cy="-59.4" r="2.2" fill="#F2A08C" opacity=".55"/>';
    g += pd('M-7.2 -60.6q2 -1.6 3.6 -.2M3.8 -57.6q2 -.8 3.4 .4M1.2 -67.6q1.8 -1 3 .2', 'none', 'stroke="#4A4650" stroke-width="1.8" stroke-linecap="round" opacity=".42"');
    // de baret met een grote veer
    g += pd('M-12 -68C-12 -74 -4 -77 3 -76C10 -75 15 -72 13 -68C7 -66 -6 -66 -12 -68Z', k.baret) + pd('M-11 -68.4C-5 -66.6 7 -66.6 12.6 -68.6', 'none', 'stroke="' + GOUD + '" stroke-width="1.8"');
    g += pd('M8 -73C14 -82 22 -86 26 -84C22 -82 20 -78 17 -74C21 -76 24 -75 25 -73C18 -70 12 -70 8 -73Z', k.veer, 'stroke="' + I + '" stroke-width="1.3" stroke-linejoin="round"');
    return g + '</g>';
  }
  var PIET = [
    { pak: '#6A4C9C', mouw: '#E9B949', broek: '#6A4C9C', streep: '#E9B949', kous: '#E9B949', baret: '#3E2F6B', veer: '#FBF6E9', huid: '#F1C9A5', haar: '#7A4E2D' },
    { pak: '#2E8B62', mouw: '#E07A2E', broek: '#E07A2E', streep: '#2E8B62', kous: '#2E8B62', baret: '#C8323C', veer: '#F6CB2F', huid: '#C68C5E', haar: '#3A2414' },
    { pak: '#2F4C8F', mouw: '#C8323C', broek: '#C8323C', streep: '#2F4C8F', kous: '#C8323C', baret: '#2F4C8F', veer: '#E9B949', huid: '#E8B48C', haar: '#B9822F' },
    { pak: '#C8323C', mouw: '#2F4C8F', broek: '#2F4C8F', streep: '#E9B949', kous: '#2F4C8F', baret: '#E9B949', veer: '#C8323C', huid: '#8D5A3B', haar: '#2A1A10' }
  ];
  // ---------- het paard van de Sint: een schimmel met een rood zadeldek (x, y: de hoeven)
  function paard(x, y) {
    var g = '<g class="fb-paard" transform="translate(' + x + ' ' + y + ')">';
    g += pd('M18 -30C30 -32 34 -18 30 -8', 'none', 'stroke="#C9C5CC" stroke-width="5" stroke-linecap="round"');
    g += pd('M-14 0V-16M-6 0V-17M10 0V-17M17 0V-16', 'none', 'stroke="' + I + '" stroke-width="5.6" stroke-linecap="round"') + pd('M-14 0V-16M-6 0V-17M10 0V-17M17 0V-16', 'none', 'stroke="#ECEAEE" stroke-width="3.4" stroke-linecap="round"');
    g += '<ellipse cx="2" cy="-24" rx="22" ry="11" fill="#ECEAEE" stroke="' + I + '" stroke-width="2"/><ellipse cx="9" cy="-21" rx="6" ry="3" fill="#D9D5DC"/>';
    g += pd('M-4 -33h16v13h-16z', ROOD) + pd('M-4 -22h16', 'none', 'stroke="' + GOUD + '" stroke-width="2.4"');
    g += pd('M-16 -28C-22 -36 -24 -44 -22 -50L-12 -48C-12 -42 -10 -36 -6 -32Z', '#ECEAEE');
    g += pd('M-30 -50C-31 -56 -26 -60 -20 -58L-16 -54C-16 -48 -22 -44 -28 -45C-31 -46 -31 -48 -30 -50Z', '#ECEAEE') + '<circle cx="-23" cy="-53" r="1.3" fill="' + I + '"/><circle cx="-29" cy="-47.6" r=".9" fill="' + I + '"/>';
    g += pd('M-19 -58l1 -6 3 5z', '#ECEAEE', 'stroke="' + I + '" stroke-width="1.4"') + pd('M-17 -58C-12 -54 -10 -46 -8 -36', 'none', 'stroke="#B9B4BE" stroke-width="3.4" stroke-linecap="round"');
    g += pd('M-28 -49L-17 -54L-12 -47', 'none', 'stroke="' + ROOD + '" stroke-width="1.6"');
    return g + '</g>';
  }
  // ---------- de Stoomboot: een stoomboot met een kajuit, een stuurhuis, een hoge schoorsteen, reddingsboeien en vlaggetjes
  function boot() {
    var s = '<g id="fb-boot" class="fb-boot"><g class="fb-dein">';
    s += '<g class="fb-rook">' + [0, 1, 2, 3, 4].map(function (i) { return '<circle class="fb-wolk" style="--i:' + i + '" cx="597" cy="94" r="' + (9 + i * 2.2) + '" fill="var(--fb-rook)"/>'; }).join('') + '</g>';
    // de mast en de lijn met vlaggetjes van de boeg via de mast naar de vlaggenstok achteraan
    s += pd('M398 230V62', 'none', 'stroke="' + I + '" stroke-width="6" stroke-linecap="round"') + pd('M398 230V62', 'none', 'stroke="#8E5A3A" stroke-width="3.6" stroke-linecap="round"') + pd('M384 98H412', 'none', 'stroke="#8E5A3A" stroke-width="3.6" stroke-linecap="round"');
    s += pd('M400 64h22l-6 5 6 5h-22z', ROOD, 'stroke="' + I + '" stroke-width="1.6" stroke-linejoin="round"');
    var lijn = function (ax, ay, cx, cy, bx, by, n, start) { var t = pd('M' + ax + ' ' + ay + 'Q' + cx + ' ' + cy + ' ' + bx + ' ' + by, 'none', 'stroke="' + I + '" stroke-width="1.1" opacity=".7"'); for (var i = 1; i < n; i++) { var u = i / n, x = (1 - u) * (1 - u) * ax + 2 * u * (1 - u) * cx + u * u * bx, y = (1 - u) * (1 - u) * ay + 2 * u * (1 - u) * cy + u * u * by; t += '<path class="fb-vlagje" d="M' + r1(x - 4) + ' ' + r1(y) + 'h8l-4 9z" fill="' + [ROOD, GOUD, '#2F4C8F', WIT, '#2E8B62'][(i + start) % 5] + '" stroke="' + I + '" stroke-width=".7"/>'; } return t; };
    s += lijn(328, 226, 352, 150, 398, 64, 10, 0) + lijn(398, 64, 560, 70, 718, 190, 16, 3);
    // de vlaggenstok achteraan, met een wapperende vlag
    s += pd('M718 232V188', 'none', 'stroke="' + I + '" stroke-width="2.6"') + '<g class="fb-vlag">' + pd('M719 190h24v5h-24z', '#AE1C28', 'stroke="none"') + pd('M719 195h24v5h-24z', '#FFFFFF', 'stroke="none"') + pd('M719 200h24v5h-24z', '#21468B', 'stroke="none"') + pd('M719 190h24v15h-24z', 'none', 'stroke="' + I + '" stroke-width="1.2"') + '</g>';
    // de schoorsteen
    s += pd('M580 190V104h34V190', '#C8323C') + pd('M580 114h34v10h-34z', WIT, 'stroke="' + I + '" stroke-width="1.6"') + pd('M577 96h40v10h-40z', I, 'stroke="' + I + '" stroke-width="1.6"') + pd('M586 128V186', 'none', 'stroke="#E8676E" stroke-width="3" opacity=".7"');
    // de kajuit met ramen, een deur en twee reddingsboeien
    s += pd('M436 230V194Q436 188 442 188H652Q658 188 658 194V230Z', WIT);
    for (var x = 452; x < 600; x += 26) s += '<rect class="fb-raam" x="' + x + '" y="199" width="15" height="13" rx="2" fill="var(--fb-glas)" stroke="' + I + '" stroke-width="1.6"/>';
    s += '<rect x="610" y="196" width="18" height="34" rx="2" fill="#7A4E2D" stroke="' + I + '" stroke-width="1.6"/><circle cx="624" cy="214" r="1.6" fill="' + GOUD + '"/>';
    [[642, 211]].forEach(function (b) { s += '<circle cx="' + b[0] + '" cy="' + b[1] + '" r="8" fill="none" stroke="' + I + '" stroke-width="7"/><circle cx="' + b[0] + '" cy="' + b[1] + '" r="8" fill="none" stroke="#FFFFFF" stroke-width="4.6"/><circle cx="' + b[0] + '" cy="' + b[1] + '" r="8" fill="none" stroke="' + ROOD + '" stroke-width="4.6" stroke-dasharray="6.3 6.3"/>'; });
    // het bovendek met een reling en het stuurhuis
    s += pd('M440 188V178M466 188V178M492 188V178M580 188V178M610 188V178M636 188V178M656 188V178M440 178H656', 'none', 'stroke="' + I + '" stroke-width="1.8"');
    s += pd('M470 188V160Q470 156 474 156H560Q564 156 564 160V188Z', WIT) + pd('M464 158L470 148H564L570 158Z', '#8E5A3A');
    s += [478, 506, 534].map(function (x) { return '<rect class="fb-raam" x="' + x + '" y="163" width="20" height="14" rx="2" fill="var(--fb-glas)" stroke="' + I + '" stroke-width="1.6"/>'; }).join('');
    s += pd('M548 148V138h6V148', '#D9A72E', 'stroke="' + I + '" stroke-width="1.4"');
    // aan dek: de Sint voorop, een Piet met het touw, een Piet bovenop, en achteraan het paard
    s += piet(436, 188, PIET[2], 0.82) + paard(684, 230) + sint(372, 230, 1.02) + piet(416, 230, PIET[0], 0.95, 'touw');
    // de romp: donkerblauw met een rode streep bij het water, patrijspoorten, een anker en de naam
    s += pd('M330 236H714', 'none', 'stroke="' + I + '" stroke-width="2"') + pd('M334 230V219M352 230V219M370 230V219M664 230V219M684 230V219M704 230V219M332 219H376M662 219H712', 'none', 'stroke="' + I + '" stroke-width="1.8"');
    s += pd('M322 228L722 232L706 270Q520 288 350 274Q334 256 322 228Z', '#1F2E57', 'stroke="' + I + '" stroke-width="2.6" stroke-linejoin="round"');
    s += pd('M341 262Q520 276 710 260L706 270Q520 288 350 274Z', ROOD, 'stroke="none"') + pd('M326 236L719 239', 'none', 'stroke="#FFFFFF" stroke-width="2.6"');
    for (var i = 0; i < 8; i++) s += '<circle class="fb-raam" cx="' + (454 + i * 31) + '" cy="250" r="5" fill="var(--fb-glas)" stroke="#FFFFFF" stroke-width="2.2"/>';
    s += pd('M352 242v12M347 246h10M346 252q6 6 12 0', 'none', 'stroke="' + GOUD + '" stroke-width="2" stroke-linecap="round"');
    s += '<text x="398" y="256" font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800" font-size="12.5" letter-spacing="1.6" fill="#FFFFFF" text-anchor="middle">STOOMBOOT</text>';
    s += pd('M322 228Q310 250 304 262', 'none', 'stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" class="fb-boeggolf" opacity="0"');
    return s + '</g></g>';
  }
  // ---------- een grachtenhuis: een trapgevel, halsgevel, klokgevel of tuitgevel, met witte ramen, een deur en een hijsbalk
  function huis(x, b, h, kleur, soort, Y, deur) {
    var top = Y - h, t = '<g>', c = function (fx) { return r1(x + b * fx); };
    var gevel = soort === 'trap' ? 'M' + x + ' ' + top + 'H' + c(.12) + 'V' + (top - 9) + 'H' + c(.24) + 'V' + (top - 18) + 'H' + c(.36) + 'V' + (top - 27) + 'H' + c(.64) + 'V' + (top - 18) + 'H' + c(.76) + 'V' + (top - 9) + 'H' + c(.88) + 'V' + top + 'H' + (x + b)
      : soort === 'hals' ? 'M' + x + ' ' + top + 'Q' + c(.2) + ' ' + (top - 2) + ' ' + c(.28) + ' ' + (top - 14) + 'V' + (top - 30) + 'Q' + c(.5) + ' ' + (top - 40) + ' ' + c(.72) + ' ' + (top - 30) + 'V' + (top - 14) + 'Q' + c(.8) + ' ' + (top - 2) + ' ' + (x + b) + ' ' + top
      : soort === 'klok' ? 'M' + x + ' ' + top + 'C' + x + ' ' + (top - 10) + ' ' + c(.2) + ' ' + (top - 10) + ' ' + c(.24) + ' ' + (top - 22) + 'C' + c(.3) + ' ' + (top - 40) + ' ' + c(.7) + ' ' + (top - 40) + ' ' + c(.76) + ' ' + (top - 22) + 'C' + c(.8) + ' ' + (top - 10) + ' ' + (x + b) + ' ' + (top - 10) + ' ' + (x + b) + ' ' + top
      : 'M' + x + ' ' + top + 'L' + c(.5) + ' ' + r1(top - b * .48) + 'L' + (x + b) + ' ' + top;
    t += pd(gevel + 'V' + Y + 'H' + x + 'Z', kleur);
    t += '<rect x="' + x + '" y="' + top + '" width="' + b + '" height="' + h + '" fill="#000000" opacity="0"/>' + pd('M' + (x + b - 4) + ' ' + (top + 1) + 'V' + (Y - 1), 'none', 'stroke="#000000" stroke-width="5" opacity=".1"');
    t += pd('M' + (x - 1.5) + ' ' + (top + 1) + 'H' + (x + b + 1.5), 'none', 'stroke="' + WIT + '" stroke-width="3"');
    // de ramen (twee per verdieping, met een kruis), en in de gevel een rond raampje met een hijsbalk erboven
    var rijen = Math.max(1, Math.floor((h - 44) / 21));
    for (var r = 0; r < rijen; r++) for (var k = 0; k < 2; k++) { var rx = c(k ? .58 : .16), ry = top + 8 + r * 21, rw = r1(b * .26); t += '<rect class="fb-raam" x="' + rx + '" y="' + ry + '" width="' + rw + '" height="14" fill="var(--fb-glas)" stroke="' + WIT + '" stroke-width="2.4"/><path d="M' + r1(rx + rw / 2) + ' ' + ry + 'v14M' + rx + ' ' + (ry + 6) + 'h' + rw + '" stroke="' + WIT + '" stroke-width="1.6"/>'; }
    if (soort !== 'tuit' || b > 40) t += '<circle class="fb-raam" cx="' + c(.5) + '" cy="' + (top - (soort === 'trap' ? 13 : soort === 'tuit' ? 9 : 17)) + '" r="4" fill="var(--fb-glas)" stroke="' + WIT + '" stroke-width="2"/>';
    t += pd('M' + c(.5) + ' ' + (top - (soort === 'trap' ? 23 : soort === 'tuit' ? 15 : 29)) + 'v-5', 'none', 'stroke="' + I + '" stroke-width="2"');
    // de begane grond: een deur met een bovenlicht en een stoepje, en een raam
    var dx = c(deur ? .56 : .14), dw = r1(b * .3);
    t += '<rect x="' + dx + '" y="' + (Y - 27) + '" width="' + dw + '" height="27" fill="' + (deur || '#2E5E4E') + '" stroke="' + I + '" stroke-width="1.6"/><path class="fb-raam" d="M' + dx + ' ' + (Y - 27) + 'a' + r1(dw / 2) + ' ' + r1(dw / 2.4) + ' 0 0 1 ' + dw + ' 0z" fill="var(--fb-glas)" stroke="' + I + '" stroke-width="1.4"/>';
    var ox = c(deur ? .12 : .54); t += '<rect class="fb-raam" x="' + ox + '" y="' + (Y - 25) + '" width="' + r1(b * .32) + '" height="17" fill="var(--fb-glas)" stroke="' + WIT + '" stroke-width="2.4"/>';
    return t + '</g>';
  }
  // ---------- een mens op de kade (die zwaait), met een vlaggetje, een ballon of een papieren mijter
  function mens(x, Y, m, i) {
    var kind = m.kind, h = kind ? 24 : 34, top = Y - h, hr = kind ? 5.4 : 6.4, kl = ' style="--i:' + i + '"', g = '<g class="fb-mens"' + kl + '>';
    g += '<rect x="' + (x - (kind ? 5.5 : 7)) + '" y="' + (top + hr) + '" width="' + (kind ? 11 : 14) + '" height="' + (h - hr) + '" rx="5" fill="' + m.jas + '" stroke="' + I + '" stroke-width="1.5"/>';
    g += '<circle cx="' + x + '" cy="' + top + '" r="' + hr + '" fill="' + m.huid + '" stroke="' + I + '" stroke-width="1.5"/>';
    if (m.muts === 'mijter') g += pd('M' + (x - 5) + ' ' + (top - 3) + 'L' + (x - 4) + ' ' + (top - 11) + 'Q' + x + ' ' + (top - 17) + ' ' + (x + 4) + ' ' + (top - 11) + 'L' + (x + 5) + ' ' + (top - 3) + 'Z', ROOD, 'stroke="' + I + '" stroke-width="1.2"') + pd('M' + x + ' ' + (top - 13) + 'v7M' + (x - 2.4) + ' ' + (top - 10) + 'h4.8', 'none', 'stroke="' + GOUD + '" stroke-width="1.4"');
    else if (m.muts) g += pd('M' + (x - hr) + ' ' + (top - 1) + 'Q' + x + ' ' + (top - hr * 2.2) + ' ' + (x + hr) + ' ' + (top - 1) + 'Z', m.muts, 'stroke="' + I + '" stroke-width="1.2"');
    else g += pd('M' + (x - hr) + ' ' + (top - 1) + 'Q' + x + ' ' + (top - hr * 1.7) + ' ' + (x + hr) + ' ' + (top - 1), m.haar, 'stroke="none"');
    var ax = x + (kind ? 4 : 6), ay = top + hr + 3;
    g += '<g class="fb-arm">' + pd('M' + ax + ' ' + ay + 'l7 -11', 'none', 'stroke="' + m.jas + '" stroke-width="3.6" stroke-linecap="round"') + '<circle cx="' + (ax + 7) + '" cy="' + (ay - 12) + '" r="2.2" fill="' + m.huid + '"/>';
    if (m.vlag) g += pd('M' + (ax + 7) + ' ' + (ay - 12) + 'v-14', 'none', 'stroke="' + I + '" stroke-width="1.2"') + '<path d="M' + (ax + 7) + ' ' + (ay - 26) + 'h11v3.4h-11z" fill="#AE1C28"/><path d="M' + (ax + 7) + ' ' + (ay - 22.6) + 'h11v3.4h-11z" fill="#FFFFFF"/><path d="M' + (ax + 7) + ' ' + (ay - 19.2) + 'h11v3.4h-11z" fill="#21468B"/>';
    g += '</g>';
    if (m.ballon) g += pd('M' + (x - 6) + ' ' + (top + 12) + 'Q' + (x - 12) + ' ' + (top - 4) + ' ' + (x - 10) + ' ' + (top - 14) + 'v-2', 'none', 'stroke="' + I + '" stroke-width=".8"') + '<ellipse cx="' + (x - 10) + '" cy="' + (top - 22) + '" rx="6" ry="7.4" fill="' + m.ballon + '" stroke="' + I + '" stroke-width="1.3"/>';
    return g + '</g>';
  }
  // ---------- de scène: de lucht, de stad in de verte (met een molen), de huizen, de kade met mensen en een spandoek, het water en de boot
  function scene(fase) {
    var s = '<svg class="fb-svg" viewBox="0 0 960 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">';
    s += '<defs><linearGradient id="fbg-lucht" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--fb-l1)"/><stop offset="1" style="stop-color:var(--fb-l2)"/></linearGradient>' +
      '<linearGradient id="fbg-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--fb-w1)"/><stop offset="1" style="stop-color:var(--fb-w2)"/></linearGradient>' +
      '<radialGradient id="fbg-gloed"><stop offset="0" stop-color="#FFE9A8" stop-opacity=".9"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></radialGradient></defs>';
    s += '<rect width="960" height="300" fill="url(#fbg-lucht)"/>';
    // de zon en wolken (overdag), of de maan en sterren ('s avonds)
    var wolk = function (x, y, k) { return '<g class="fb-wolkje" transform="translate(' + x + ' ' + y + ') scale(' + k + ')"><path d="M-40 10Q-44 -6 -26 -6Q-22 -22 -4 -18Q6 -30 22 -20Q40 -22 40 -4Q52 0 46 10Z" fill="#FFFFFF" stroke="#BFD6E6" stroke-width="2"/><path d="M-38 10H46" stroke="#D7E7F1" stroke-width="5" stroke-linecap="round"/></g>'; };
    s += '<g class="fb-dag"><circle cx="672" cy="48" r="44" fill="url(#fbg-gloed)"/><circle cx="672" cy="48" r="22" fill="#F6CB2F" stroke="#E0A92E" stroke-width="2"/>' + wolk(120, 40, .9) + wolk(470, 26, .7) + wolk(860, 30, .9) + '</g>';
    s += '<g class="fb-nacht"><circle cx="672" cy="48" r="40" fill="url(#fbg-gloed)" opacity=".35"/><circle cx="672" cy="48" r="19" fill="#FBF6E9"/><circle cx="680" cy="43" r="16" fill="var(--fb-l1)"/>' + [[60, 30], [210, 64], [300, 22], [420, 46], [520, 18], [640, 40], [760, 24], [880, 58], [930, 20], [340, 80], [700, 84]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.7" fill="#FBF6E9"/>'; }).join('') + '</g>';
    // meeuwen
    s += [[300, 92, 0], [338, 78, 1], [760, 104, 2]].map(function (m) { return '<path class="fb-meeuw" style="--i:' + m[2] + '" d="M' + m[0] + ' ' + m[1] + 'q6 -7 12 0q6 -7 12 0" stroke="var(--fb-meeuw)" stroke-width="2.2" fill="none" stroke-linecap="round"/>'; }).join('');
    // de stad in de verte, met een kerktoren en een molen
    s += '<g class="fb-ver" fill="var(--fb-ver)"><path d="M300 214V190h18v-12h14v12h20v-20l10-14 10 14v20h24v-16h22v16h30v-22h16v22h20V180l8-26 8 26v34h26v-14h30v14h20v-18h24v18h26v-24h20v24h40V214Z"/><path d="M886 214v-40l8-6 8 6v40z"/><g class="fb-wieken" style="transform-origin:894px 168px"><path d="M894 168l-3 -34h6zM894 168l34 -3v6zM894 168l3 34h-6zM894 168l-34 3v-6z"/></g></g>';
    // de huizen op de kade links en aan de overkant rechts
    var L = [[0, 50, 120, '#B5533C', 'trap'], [50, 44, 102, '#8E5A3A', 'hals'], [94, 48, 128, '#C9A267', 'klok'], [142, 42, 108, '#A0473A', 'trap', '#1F3D6B'], [184, 46, 96, '#7B6B5B', 'tuit'], [230, 48, 118, '#B8823F', 'hals', '#7A2430'], [278, 44, 104, '#9B4D38', 'trap']];
    var R = [[700, 46, 110, '#9B4D38', 'trap'], [746, 42, 96, '#C7A06A', 'tuit', '#7A2430'], [788, 48, 124, '#8A5236', 'klok'], [836, 44, 104, '#B5533C', 'trap', '#1F3D6B'], [880, 46, 92, '#7C6A57', 'tuit'], [926, 44, 114, '#A9693E', 'hals']];
    s += '<g class="fb-stad">' + L.map(function (h) { return huis(h[0], h[1], h[2], h[3], h[4], 206, h[5]); }).join('') + R.map(function (h) { return huis(h[0], h[1], h[2], h[3], h[4], 214, h[5]); }).join('') + '</g>';
    // de Piet op het dak (als je je schoen zet): bij een schoorsteen op de tuitgevel aan de overkant
    if (fase !== 'intocht') s += '<g class="fb-dak">' + pd('M893 112V96h12v16z', '#A0473A') + pd('M891 94h16v4h-16z', I) + piet(915, 117, PIET[3], 0.6, 'zak') + '</g>';
    // de kade links: stenen, lantaarns, de mensen, een spandoek en een meerpaal; de kade aan de overkant
    s += pd('M0 206H330V214H0Z', '#8A8790') + pd('M0 214H330V244H0Z', '#9C5B3E');
    for (var x = 0; x < 330; x += 22) s += pd('M' + x + ' 222h20M' + (x + 11) + ' 232h20', 'none', 'stroke="#7A4031" stroke-width="1" opacity=".6"');
    s += pd('M700 214H960V244H700Z', '#9C5B3E') + pd('M700 214H960', 'none', 'stroke="#8A8790" stroke-width="5"');
    var lantaarn = function (x, Y) { return '<g class="fb-lantaarn"><circle class="fb-lgloed" cx="' + x + '" cy="' + (Y - 52) + '" r="22" fill="url(#fbg-gloed)"/>' + pd('M' + x + ' ' + Y + 'V' + (Y - 46), 'none', 'stroke="' + I + '" stroke-width="3"') + pd('M' + (x - 6) + ' ' + (Y - 46) + 'h12l-2 -10h-8z', 'var(--fb-glas)', 'stroke="' + I + '" stroke-width="1.6"') + pd('M' + (x - 7) + ' ' + (Y - 56) + 'h14l-7 -5z', I, 'stroke="none"') + '</g>'; };
    s += lantaarn(14, 206) + lantaarn(204, 206) + lantaarn(724, 214);
    var rnd = zaad(7), huiden = ['#F1C9A5', '#C68C5E', '#8D5A3B', '#E8B48C', '#B97A52', '#F6D6BC'], jassen = ['#2F4C8F', ROOD, GOUD, '#2E8B62', '#6A4C9C', '#E07A2E', '#3A3A44', '#1F6F8B'], haren = ['#3A2414', '#7A4E2D', '#B9822F', '#2A1A10', '#C9C0B0'];
    var mensen = [];
    for (var i = 0; i < 15; i++) { var kind = rnd() < .38; mensen.push({ x: 26 + i * 19 + rnd() * 6, kind: kind, jas: jassen[Math.floor(rnd() * jassen.length)], huid: huiden[Math.floor(rnd() * huiden.length)], haar: haren[Math.floor(rnd() * haren.length)], muts: kind && rnd() < .55 ? 'mijter' : rnd() < .25 ? [ROOD, '#2F4C8F', '#2E8B62'][Math.floor(rnd() * 3)] : '', vlag: rnd() < .4, ballon: i === 4 ? ROOD : i === 11 ? GOUD : '' }); }
    // het spandoek, tussen twee palen (zichtbaar als de boot heeft aangelegd)
    s += '<g class="fb-spandoek">' + pd('M30 206V104M300 206V104', 'none', 'stroke="' + I + '" stroke-width="3.4"') + pd('M30 108Q165 120 300 108V134Q165 146 30 134Z', WIT, 'stroke="' + I + '" stroke-width="2.4"') + pd('M34 113Q165 125 296 113', 'none', 'stroke="' + ROOD + '" stroke-width="3"') +
      '<text x="165" y="136" font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800" font-size="17" fill="' + ROOD + '" text-anchor="middle" letter-spacing=".6">WELKOM SINTERKLAAS!</text></g>';
    s += '<g class="fb-mensen">' + mensen.map(function (m, i) { return mens(r1(m.x), 208, m, i); }).join('') + '</g>';
    s += pd('M300 208v-12h10v12z', I) + piet(276, 210, PIET[1], 0.66, 'zwaai');
    // het water: een verloop, de weerspiegeling van de boot en golfjes
    s += '<rect x="0" y="244" width="960" height="56" fill="url(#fbg-water)"/><rect x="330" y="236" width="370" height="10" fill="url(#fbg-water)"/>';
    s += '<g class="fb-spiegel" opacity=".22"><path d="M330 276Q520 292 712 274L700 300H346Z" fill="#0B1430"/><path d="M0 248H330V266H0ZM700 248H960V264H700Z" fill="#5A2E22"/></g>';
    var golf = function (y, b, o) { var d = 'M' + (-30 + o) + ' ' + y; for (var k = 0; k < 34; k++) d += 'q15 -' + b + ' 30 0'; return d; };
    s += '<g class="fb-golf">' + pd(golf(258, 4, 0), 'none', 'stroke="var(--fb-golf)" stroke-width="2.2" opacity=".75"') + pd(golf(276, 5, -14), 'none', 'stroke="var(--fb-golf)" stroke-width="2.4" opacity=".55"') + pd(golf(294, 5, 8), 'none', 'stroke="var(--fb-golf)" stroke-width="2" opacity=".4"') + '</g>';
    // het touw van de boot naar de meerpaal (als hij heeft aangelegd)
    s += pd('M330 232Q318 222 306 202', 'none', 'stroke="#C9A267" stroke-width="2.6" stroke-linecap="round" class="fb-touw"');
    return s + boot() + '</svg>';
  }
  // ---------- het hoekje met de kachel, je schoen en je stapel cadeautjes
  var PAPIER = [['#C8323C', '#E9B949', 'streep'], ['#2F4C8F', '#FBF6E9', 'stip'], ['#2E8B62', '#C8323C', ''], ['#E9B949', '#6A4C9C', 'stip'], ['#6A4C9C', '#E9B949', 'streep'], ['#E07A2E', '#2F4C8F', ''], ['#FBF6E9', '#C8323C', 'stip']];
  function pakje(x, y, b, h, i, klas) {
    var p = PAPIER[i % PAPIER.length], g = '<g class="' + (klas || 'fb-pakje') + '">' + '<rect x="' + x + '" y="' + y + '" width="' + b + '" height="' + h + '" rx="2.5" fill="' + p[0] + '" stroke="' + I + '" stroke-width="1.8"/>';
    if (p[2] === 'streep') for (var k = 4; k < b - 2; k += 6) g += '<path d="M' + r1(x + k) + ' ' + (y + 1) + 'v' + (h - 2) + '" stroke="' + p[1] + '" stroke-width="1.6" opacity=".55"/>';
    if (p[2] === 'stip') for (var a = 4; a < b - 2; a += 6) for (var c = 4; c < h - 2; c += 6) g += '<circle cx="' + r1(x + a) + '" cy="' + r1(y + c) + '" r="1.1" fill="' + p[1] + '" opacity=".7"/>';
    g += '<path d="M' + r1(x + b / 2) + ' ' + y + 'v' + h + 'M' + x + ' ' + r1(y + h / 2) + 'h' + b + '" stroke="' + p[1] + '" stroke-width="2.8"/><path d="M' + r1(x + b / 2) + ' ' + y + 'q-8 -8 -10 -1q3 3 10 1zM' + r1(x + b / 2) + ' ' + y + 'q8 -8 10 -1q-3 3 -10 1z" fill="' + p[1] + '" stroke="' + I + '" stroke-width="1.2"/>';
    return g + '</g>';
  }
  // een leren kinderschoen met veters (de neus naar links), met een wortel voor het paard, een tekening voor de Sint en een suikerklontje
  function schoen(x, y, sch) {
    var g = '<g class="fb-klomp" transform="translate(' + x + ' ' + y + ')">';
    var gezet = sch.vandaagGezet, iets = sch.inSchoen > 0;
    if (gezet) g += '<g class="fb-wortel">' + pd('M70 0L88 -34L93 -31L76 2Z', '#E07A2E', 'stroke="' + I + '" stroke-width="1.6" stroke-linejoin="round"') + pd('M76 -14l6 2M81 -22l5 2', 'none', 'stroke="#B85A1E" stroke-width="1.4"') + pd('M90 -33Q86 -44 92 -48M91 -33Q96 -42 104 -42M90 -32Q82 -38 80 -46', 'none', 'stroke="#2E8B62" stroke-width="3" stroke-linecap="round"') + '</g>';
    if (gezet) g += '<g transform="rotate(-24 34 4)">' + pd('M14 -4h40v14h-40z', '#FFFFFF') + pd('M18 0q6 -3 10 2t10 -1 10 2', 'none', 'stroke="#2F4C8F" stroke-width="1.4"') + pd('M30 -4v14', 'none', 'stroke="' + ROOD + '" stroke-width="2.6"') + '</g>';
    if (iets) g += pakje(62, -18, 20, 18, sch.inSchoen + 2, 'fb-pakje fb-in-schoen');
    g += pd('M4 47C-1 38 4 31 14 29L44 23C50 14 54 6 60 3L86 1C93 1 96 6 96 12L97 47Z', '#A8683A', 'stroke="' + I + '" stroke-width="2.4" stroke-linejoin="round"');
    g += pd('M4 47C-1 38 4 31 14 29L28 26C25 33 25 41 29 47Z', '#8B5228', 'stroke="' + I + '" stroke-width="1.8" stroke-linejoin="round"') + pd('M86 1C93 1 96 6 96 12L97 47H82C84 34 84 18 80 5Z', '#8B5228', 'stroke="' + I + '" stroke-width="1.8" stroke-linejoin="round"');
    g += pd('M56 6Q57 -6 66 -7Q72 -7 72 -2Q66 0 60 3Z', '#C08048', 'stroke="' + I + '" stroke-width="1.6" stroke-linejoin="round"') + pd('M60 3Q73 -2 86 1Q74 7 60 3Z', '#2A1A10', 'stroke="' + I + '" stroke-width="1.6"');
    g += [[47, 22], [51, 16], [55, 10]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="1.7" fill="' + GOUD + '" stroke="' + I + '" stroke-width=".8"/><circle cx="' + (p[0] + 12) + '" cy="' + (p[1] - 2) + '" r="1.7" fill="' + GOUD + '" stroke="' + I + '" stroke-width=".8"/>'; }).join('');
    g += pd('M47 22L63 14M51 16L67 8M59 20L49 15M63 14L53 9', 'none', 'stroke="' + ROOD + '" stroke-width="2" stroke-linecap="round"') + pd('M56 6q-8 -6 -6 -10q6 2 6 10q4 -8 10 -6q-2 5 -10 6', 'none', 'stroke="' + ROOD + '" stroke-width="1.8" stroke-linecap="round"');
    g += pd('M18 33Q30 29 41 28', 'none', 'stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round" opacity=".35"') + pd('M86 8Q90 22 90 40', 'none', 'stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" opacity=".25"');
    g += pd('M2 52Q2 58 9 58H94Q100 58 100 51V47H2Z', '#3A2416', 'stroke="' + I + '" stroke-width="2.2" stroke-linejoin="round"') + pd('M8 45H95', 'none', 'stroke="#E0A86C" stroke-width="1.4" stroke-dasharray="3 3"') + pd('M14 55h6M30 55h6M46 55h6M62 55h6M78 55h6', 'none', 'stroke="#6E4A30" stroke-width="1.6"');
    if (gezet) g += pd('M106 50h9v8h-9zM106 50l3 -3h9l-3 3M115 58l3 -3v-8', '#FFFFFF', 'stroke="' + I + '" stroke-width="1.4" stroke-linejoin="round"');
    return g + '</g>';
  }
  function schoenPaneel(sch) {
    var s = '<svg class="fb-schoen-svg" viewBox="0 0 330 180" aria-hidden="true" focusable="false">';
    s += '<defs><radialGradient id="fbg-vuur"><stop offset="0" stop-color="#FFC95A" stop-opacity=".9"/><stop offset="1" stop-color="#FF8A3D" stop-opacity="0"/></radialGradient></defs>';
    // de vloer
    s += pd('M0 160H330V180H0Z', 'var(--fb-vloer)', 'stroke="none"') + pd('M0 160H330', 'none', 'stroke="' + I + '" stroke-width="2.4"') + pd('M60 160v20M150 160v20M240 160v20', 'none', 'stroke="' + I + '" stroke-width="1" opacity=".3"');
    // de open haard: stenen, een schoorsteenmantel met een kaars, en een vuur met houtblokken
    s += pd('M14 160V44H142V160Z', '#A0473A');
    for (var y = 50; y < 158; y += 12) s += pd('M14 ' + y + 'H142', 'none', 'stroke="#7A3329" stroke-width="1" opacity=".7"') + [0, 1, 2, 3, 4].map(function (k) { var x = 24 + k * 26 + ((y / 12) % 2 ? 13 : 0); return x < 140 ? pd('M' + x + ' ' + y + 'v12', 'none', 'stroke="#7A3329" stroke-width="1" opacity=".7"') : ''; }).join('');
    s += pd('M38 160V108Q38 82 78 82Q118 82 118 108V160Z', '#2A2430') + '<circle class="fb-gloei" cx="78" cy="140" r="38" fill="url(#fbg-vuur)"/>';
    s += pd('M50 156l50 -8M54 148l52 8', 'none', 'stroke="#6E4A30" stroke-width="7" stroke-linecap="round"') + '<g class="fb-vuur">' + pd('M58 150Q52 132 66 118Q66 132 72 134Q72 116 84 108Q82 126 90 130Q96 122 96 116Q104 132 96 150Z', '#E07A2E', 'stroke="none"') + pd('M66 150Q64 138 72 132Q74 140 78 140Q80 130 86 126Q86 138 90 150Z', '#F6CB2F', 'stroke="none"') + '</g>';
    s += pd('M4 34H152V46H4Z', '#7A4E2D') + pd('M4 34H152', 'none', 'stroke="#A0733F" stroke-width="2" opacity=".8"');
    s += pd('M118 34V18h8V34z', '#FBF6E9', 'stroke="' + I + '" stroke-width="1.4"') + '<path class="fb-vlam" d="M122 16q-4 -6 0 -11q4 5 0 11z" fill="#F6CB2F" stroke="#E07A2E" stroke-width="1"/>';
    s += pd('M24 34V20h22v14z', '#FFFFFF', 'stroke="' + I + '" stroke-width="1.4"') + pd('M28 30l4 -6 3 3 3 -5 4 8', 'none', 'stroke="' + ROOD + '" stroke-width="1.4"');
    // de schoen, voor de haard
    s += schoen(150, 102, sch);
    // de stapel: onderaan het meest, bovenop er hooguit een paar
    var n = sch.stapel, toon = Math.min(n, 15), plekken = [];
    for (var r = 0, k = 0; k < toon; r++) { var opRij = Math.max(1, 5 - r); for (var j = 0; j < opRij && k < toon; j++, k++) plekken.push([262 + j * 13 + r * 6.5 - (opRij - 4) * 0, 143 - r * 17]); }
    s += plekken.map(function (p, i) { return pakje(r1(p[0] - 10), p[1], 13 + (i % 3), 16, i); }).join('');
    if (n > toon) s += '<text x="324" y="40" font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800" font-size="14" fill="var(--tg-tekst)" text-anchor="end">+' + (n - toon) + '</text>';
    return s + '</svg>';
  }

  // ================= geluidjes (Web Audio, pas na een aanraking; volgen het geluid van de rommeltjes)
  var ctx = null;
  function geluidAan() { try { var r = JSON.parse(localStorage.getItem('rommeltjes-v1') || 'null'); return !r || r.g !== 0; } catch (e) { return true; } }
  function audio() { if (!geluidAan()) return null; try { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === 'suspended') ctx.resume(); return ctx; } catch (e) { return null; } }
  function toon(f, t0, duur, soort, vol, naar) {
    var a = audio(); if (!a) return; var o = a.createOscillator(), g = a.createGain(), t = a.currentTime + t0;
    o.type = soort || 'sine'; o.frequency.setValueAtTime(f, t); if (naar) o.frequency.exponentialRampToValueAtTime(naar, t + duur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.05, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + duur);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + duur + 0.05);
  }
  function toeter() {
    var a = audio(); if (!a) return;
    [196, 247].forEach(function (f) { var o = a.createOscillator(), fl = a.createBiquadFilter(), g = a.createGain(), t = a.currentTime; o.type = 'sawtooth'; o.frequency.value = f; fl.type = 'lowpass'; fl.frequency.value = 700; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.05, t + 0.08); g.gain.setValueAtTime(0.05, t + 0.55); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.85); o.connect(fl); fl.connect(g); g.connect(a.destination); o.start(t); o.stop(t + 0.9); });
  }
  var plop = function () { toon(420, 0, 0.18, 'sine', 0.07, 160); };
  var tring = function () { toon(880, 0, 0.25, 'triangle', 0.04); toon(1320, 0.12, 0.35, 'triangle', 0.035); };

  // ================= het bord
  function stijl() {
    if (document.getElementById('fb-stijl')) return;
    var st = document.createElement('style'); st.id = 'fb-stijl';
    st.textContent = [
      ':root{--fb-l1:#7DB6E4;--fb-l2:#DDF0F8;--fb-w1:#4A86BC;--fb-w2:#2A5888;--fb-golf:#CFE6F4;--fb-glas:#A9CDE4;--fb-rook:#E9E4DA;--fb-ver:#A9C3D6;--fb-meeuw:#FFFFFF;--fb-vloer:#C99A62;--fb-papier:#FFFDF6}',
      'html[data-thema="donker"]{--fb-l1:#0E1838;--fb-l2:#33467C;--fb-w1:#20406E;--fb-w2:#0F2140;--fb-golf:#5C7DB0;--fb-glas:#F6CB2F;--fb-rook:#8A8794;--fb-ver:#24335C;--fb-meeuw:#C9D3E6;--fb-vloer:#6E4A30;--fb-papier:#2B2733}',
      '.tg-feest-bord{position:relative;display:grid;grid-template-columns:minmax(0,1fr) 330px;grid-template-areas:"scene scene" "tekst schoen";background:var(--fb-papier);color:var(--tg-tekst);border:3px solid #231A26;border-radius:18px;box-shadow:6px 7px 0 rgba(35,26,38,.22);overflow:hidden}',
      'html[data-thema="donker"] .tg-feest-bord{border-color:#F6F2EA;box-shadow:6px 7px 0 rgba(0,0,0,.4)}',
      '.fb-scene{grid-area:scene;position:relative;aspect-ratio:960/300;border-bottom:3px solid #231A26;overflow:hidden;background:var(--fb-l2)}',
      'html[data-thema="donker"] .fb-scene{border-bottom-color:#F6F2EA}',
      '.fb-svg{position:absolute;inset:0;width:100%;height:100%;display:block}',
      '.fb-nacht,.fb-lgloed{display:none}html[data-thema="donker"] .fb-nacht,html[data-thema="donker"] .fb-lgloed{display:inline}html[data-thema="donker"] .fb-dag{display:none}',
      '.fb-boot{cursor:pointer}',
      '.fb-spandoek,.fb-touw{opacity:0}.fb-aangemeerd .fb-spandoek,.fb-aangemeerd .fb-touw{opacity:1}',
      '.fb-tekst{grid-area:tekst;padding:1.15rem 1.4rem 1.3rem;min-width:0}',
      '.fb-label{display:inline-block;font-size:.78rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;background:#23252B;color:#F4F1EC;padding:.28rem .6rem .24rem;border-radius:4px;transform:rotate(-1.5deg)}',
      '.fb-kop{margin:.55rem 0 .3rem;font-size:clamp(1.45rem,3.6vw,2.1rem);font-weight:800;line-height:1.08}',
      '.fb-zin{margin:0 0 .85rem;font-size:1rem;line-height:1.45;max-width:36rem}',
      '.fb-knoppen{display:flex;flex-wrap:wrap;gap:.55rem;align-items:center}',
      '.fb-knop{font:inherit;font-weight:800;font-size:.98rem;padding:.62rem 1.1rem;border-radius:999px;border:2.5px solid var(--tg-knop-rand,#231A26);background:var(--tg-knop,#FFF);color:var(--tg-knop-tekst,#231A26);cursor:pointer;box-shadow:0 3px 0 rgba(35,26,38,.25)}',
      '.fb-knop.fb-hoofd{background:#C8323C;border-color:#231A26;color:#FFF}',
      '.fb-knop:focus-visible,.fb-klein:focus-visible{outline:3px solid var(--tg-focus,#2F4C8F);outline-offset:3px}',
      '.fb-kleintjes{display:flex;flex-wrap:wrap;gap:.2rem 1rem;margin-top:.55rem}',
      '.fb-klein{font:inherit;font-size:.82rem;font-weight:700;background:none;border:0;color:var(--tg-zacht);text-decoration:underline;cursor:pointer;padding:.3rem .2rem}',
      '.fb-schoen{grid-area:schoen;padding:.7rem 1rem .6rem 0;display:flex;flex-direction:column;justify-content:flex-end}',
      '.fb-schoen-svg{width:100%;height:auto;display:block}',
      '.fb-stapel{margin:.2rem 0 0;font-size:.85rem;font-weight:800;color:var(--tg-zacht);text-align:right}',
      '.fb-regen{position:absolute;inset:0;pointer-events:none;overflow:hidden}.fb-regen i{position:absolute;top:-14px;width:11px;height:10px;border-radius:50%;background:#B5733A;border:2px solid #231A26}',
      '.fb-dialoog{max-width:24rem;width:calc(100vw - 32px);border:3px solid #231A26;border-radius:16px;padding:1.2rem 1.3rem;background:var(--fb-papier);color:var(--tg-tekst);box-shadow:6px 7px 0 rgba(35,26,38,.3)}',
      '.fb-dialoog::backdrop{background:rgba(20,16,24,.45)}',
      '.fb-dialoog h2{margin:.2rem 0 .5rem;font-size:1.35rem}.fb-dialoog .fb-plaat{width:110px;margin:0 auto .4rem;display:block}',
      '.fb-gedicht{font-style:italic;line-height:1.5;margin:.5rem 0 .9rem}.fb-gedicht span{display:block}.fb-ondert{font-style:normal;font-weight:700;color:var(--tg-zacht);font-size:.9rem;margin-top:.3rem}',
      '.fb-spullen{list-style:none;margin:.4rem 0 1rem;padding:0;display:grid;gap:.6rem}.fb-spullen li{display:grid;grid-template-columns:52px 1fr;gap:.7rem;align-items:center}.fb-spullen svg{width:52px;height:52px}.fb-spullen b{display:block}.fb-spullen small{color:var(--tg-zacht)}',
      '.fb-leeg{color:var(--tg-zacht)}',
      '@media (max-width:640px){.tg-feest-bord{grid-template-columns:minmax(0,1fr);grid-template-areas:"scene" "tekst" "schoen"}.fb-scene{aspect-ratio:720/300}.fb-schoen{padding:0 1rem .8rem}.fb-schoen-svg{max-width:290px;margin-left:auto}.fb-tekst{padding:1rem 1.05rem .6rem}}',
      '@media (prefers-reduced-motion:no-preference){',
      '  .tg-feest-bord:not(.fb-stil) .fb-dein{animation:fb-dein 3.2s ease-in-out infinite}',
      '  .tg-feest-bord:not(.fb-stil) .fb-wolk{animation:fb-rook 3.6s linear infinite;animation-delay:calc(var(--i)*-0.72s);transform-box:fill-box;transform-origin:center}',
      '  .tg-feest-bord:not(.fb-stil) .fb-golf{animation:fb-golf 6s linear infinite}',
      '  .tg-feest-bord:not(.fb-stil) .fb-zwaai,.tg-feest-bord:not(.fb-stil) .fb-zwaai-sint{animation:fb-zwaai 1.1s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:0% 100%}',
      '  .tg-feest-bord:not(.fb-stil) .fb-zwaai-sint{transform-origin:100% 100%}',
      '  .tg-feest-bord:not(.fb-stil) .fb-arm{animation:fb-zwaai .9s ease-in-out infinite alternate;animation-delay:calc(var(--i)*-.17s);transform-box:fill-box;transform-origin:0% 100%}',
      '  .tg-feest-bord:not(.fb-stil) .fb-vuur{animation:fb-vuur .5s steps(2) infinite;transform-box:fill-box;transform-origin:50% 100%}',
      '  .tg-feest-bord:not(.fb-stil) .fb-vlam{animation:fb-vuur .7s steps(2) infinite;transform-box:fill-box;transform-origin:50% 100%}',
      '  .tg-feest-bord:not(.fb-stil) .fb-gloei{animation:fb-gloei 2.4s ease-in-out infinite alternate}',
      '  .tg-feest-bord:not(.fb-stil) .fb-vlag{animation:fb-wapper 1.3s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:0% 50%}',
      '  .tg-feest-bord:not(.fb-stil) .fb-vlagje{animation:fb-wapper 1.1s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:50% 0%}',
      '  .tg-feest-bord:not(.fb-stil) .fb-wieken{animation:fb-draai 9s linear infinite}',
      '  .tg-feest-bord:not(.fb-stil) .fb-meeuw{animation:fb-meeuw 7s ease-in-out infinite alternate;animation-delay:calc(var(--i)*-2.3s)}',
      '  .tg-feest-bord:not(.fb-stil) .fb-aangemeerd .fb-mens{animation:fb-juich 1.4s ease-in-out infinite;animation-delay:calc(var(--i)*-.31s)}',
      '  .fb-spandoek,.fb-touw{transition:opacity .7s ease .2s}',
      '  .fb-vaart .fb-boot{animation:fb-vaart 7s cubic-bezier(.2,.6,.35,1) both}',
      '  .fb-vaart .fb-boeggolf{animation:fb-boeg .5s ease-in-out infinite alternate}',
      '  .fb-regen i{animation:fb-val linear forwards}',
      '}',
      '@keyframes fb-dein{0%,100%{transform:translateY(0)}50%{transform:translateY(2.5px)}}',
      '@keyframes fb-rook{0%{transform:translate(0,0) scale(.6);opacity:0}15%{opacity:.9}100%{transform:translate(-40px,-78px) scale(1.6);opacity:0}}',
      '@keyframes fb-golf{to{transform:translateX(-60px)}}',
      '@keyframes fb-zwaai{from{transform:rotate(-12deg)}to{transform:rotate(14deg)}}',
      '@keyframes fb-vuur{50%{transform:scaleY(.86)}}',
      '@keyframes fb-gloei{from{opacity:.65}to{opacity:1}}',
      '@keyframes fb-wapper{from{transform:skewY(-6deg) scaleX(.94)}to{transform:skewY(5deg) scaleX(1)}}',
      '@keyframes fb-draai{to{transform:rotate(360deg)}}',
      '@keyframes fb-meeuw{0%{transform:translate(0,0)}50%{transform:translate(28px,-8px)}100%{transform:translate(60px,4px)}}',
      '@keyframes fb-juich{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-4px)}}',
      '@keyframes fb-vaart{from{transform:translateX(680px)}to{transform:translateX(0)}}',
      '@keyframes fb-boeg{from{opacity:.3}to{opacity:.95}}',
      '@keyframes fb-val{to{transform:translateY(330px) rotate(300deg)}}',
      '@keyframes fb-niets{to{opacity:1}}'
    ].join('\n');
    document.head.appendChild(st);
  }
  // de kijkhoek van de scène: op een smal scherm alleen het midden (de boot en een stukje kade)
  function kijkhoek() { var svg = bord && bord.querySelector('.fb-svg'); if (!svg) return; var smal = bord.clientWidth < 600; svg.setAttribute('viewBox', smal ? '40 0 720 300' : '0 0 960 300'); }

  function teksten(s, sch) {
    var t = { label: '', kop: '', zin: '', knoppen: [], stapel: '' }, zin = [];
    var pakjesTekst = sch.stapel ? meer(sch.stapel, 'cadeautje', 'cadeautjes') + ' op je stapel voor pakjesavond' : '';
    if (s.fase === 'intocht' || s.fase === 'schoen') {
      t.label = s.fase === 'intocht' ? 'Zaterdag 14 november: de intocht' : 'Sinterklaas is in het land';
      t.kop = s.fase === 'intocht' ? 'Sinterklaas is in het land!' : 'Nog ' + meer(s.nachtjes, 'nachtje', 'nachtjes') + ' slapen';
      if (s.fase === 'intocht') zin.push('De Stoomboot is net aangekomen. Welkom, Sint!');
      if (!s.zeker) zin.push(navigator.onLine === false ? 'Zonder internet kun je je schoen nog niet zetten. Dat kan straks weer.' : 'Even kijken hoe laat het echt is…');
      else {
        if (s.fase === 'intocht' && !F.kern.heb('intocht26')) { zin.push('Er ligt een cadeautje voor je klaar.'); t.knoppen.push(['intocht', 'Pak je intochtcadeautje']); }
        if (sch.inSchoen) { zin.push('Er zit iets in je schoen!'); t.knoppen.push(['uit-schoen', 'Haal je cadeautje eruit']); }
        else if (sch.kanZetten) { zin.push('Zet je schoen bij de kachel. Morgen kijk je wat erin zit, en op pakjesavond pak je alles uit.'); t.knoppen.push(['schoen', 'Zet je schoen']); }
        else if (sch.vandaagGezet) zin.push('Je schoen staat klaar. Kom morgen kijken wat erin zit!');
      }
      t.stapel = pakjesTekst;
    } else if (s.fase === 'pakjesavond-straks' || s.fase === 'pakjesavond') {
      t.label = 'Zaterdag 5 december'; t.kop = s.fase === 'pakjesavond' ? 'Het is pakjesavond!' : 'Vanavond is het pakjesavond!';
      zin.push(sch.stapel ? 'Je hebt ' + meer(sch.stapel, 'cadeautje', 'cadeautjes') + ' op je stapel.' : 'Je zette dit jaar geen schoen, maar de Sint denkt aan iedereen.');
      zin.push(s.fase === 'pakjesavond' ? 'Uitpakken kan zo meteen.' : 'Om vijf uur mag je uitpakken.');
      t.stapel = pakjesTekst;
    }
    t.zin = zin.join(' ');
    t.knoppen.forEach(function (k, i) { k[2] = i === 0 ? 1 : 0; });
    t.knoppen.push(['spullen', 'Mijn feestspullen', 0]);
    if (s.fase === 'intocht' || s.fase === 'schoen') t.nog = s.fase === 'intocht' ? 'Bekijk de intocht nog een keer' : 'Bekijk de intocht';
    return t;
  }
  function knopHtml(k) { return '<button type="button" class="fb-knop' + (k[2] ? ' fb-hoofd' : '') + '" data-actie="' + k[0] + '">' + esc(k[1]) + '</button>'; }

  // het bord tekenen (alleen wat veranderde, zodat de knop zijn focus houdt)
  function teken() {
    var s = F.nu(), toon = s.feest === 'sint' && (s.fase === 'intocht' || s.fase === 'schoen' || s.fase === 'pakjesavond-straks' || s.fase === 'pakjesavond');
    if (!toon) { if (bord) { bord.remove(); bord = null; } sec.hidden = true; pepernoten(false); laatsteSig = ''; laatsteFase = ''; return; }
    var sch = F.kern.schoen(), t = teksten(s, sch), sig = JSON.stringify([t, sch.dagen, sch.stapel, s.versiering]);
    sec.hidden = false; stijl();
    if (!bord || laatsteFase !== s.fase) {
      if (bord) bord.remove();
      bord = document.createElement('div'); bord.className = 'tg-feest-bord fb-sint'; bord.setAttribute('role', 'region'); bord.setAttribute('aria-labelledby', 'fb-kop');
      bord.innerHTML = '<div class="fb-scene fb-aangemeerd">' + scene(s.fase) + '<div class="fb-regen" aria-hidden="true"></div></div>' +
        '<div class="fb-tekst"><span class="fb-label"></span><h2 class="fb-kop" id="fb-kop"></h2><p class="fb-zin" aria-live="polite"></p><div class="fb-knoppen"></div><div class="fb-kleintjes"><button type="button" class="fb-klein" data-actie="nog" hidden></button><button type="button" class="fb-klein fb-uitknop" aria-pressed="false"></button></div></div>' +
        '<div class="fb-schoen"><div class="fb-schoen-plek"></div><p class="fb-stapel"></p></div>';
      sec.appendChild(bord); laatsteFase = s.fase; laatsteSig = '';
      bord.addEventListener('click', klik);
      kijkhoek();
      if (s.fase === 'intocht') intocht(false);
    }
    bord.classList.toggle('fb-stil', !s.versiering);
    if (sig !== laatsteSig) {
      var focus = document.activeElement && bord.contains(document.activeElement) ? document.activeElement.getAttribute('data-actie') : null;
      bord.querySelector('.fb-label').textContent = t.label;
      bord.querySelector('.fb-kop').textContent = t.kop;
      bord.querySelector('.fb-zin').textContent = t.zin;
      bord.querySelector('.fb-knoppen').innerHTML = t.knoppen.map(knopHtml).join('');
      var nog = bord.querySelector('[data-actie="nog"]'); nog.hidden = !t.nog; nog.textContent = t.nog || '';
      var u = bord.querySelector('.fb-uitknop'); u.textContent = s.versiering ? 'Versiering uit' : 'Versiering aan'; u.setAttribute('aria-pressed', String(!s.versiering));
      bord.querySelector('.fb-schoen-plek').innerHTML = schoenPaneel(sch);
      bord.querySelector('.fb-stapel').textContent = t.stapel || (sch.gezet ? '' : 'Nog geen cadeautjes op je stapel');
      if (focus) { var k = bord.querySelector('[data-actie="' + focus + '"]') || bord.querySelector('.fb-knop'); if (k) k.focus(); }
      laatsteSig = sig;
      herbouw();
    }
    pepernoten(s.versiering);
  }
  // de rommeltjes weten dat het bord er is (een oppervlak om iets op te leggen), en de pepernoten
  var herbouwKlok = 0;
  function herbouw() { clearTimeout(herbouwKlok); herbouwKlok = setTimeout(function () { var R = window.__rommeltjes; if (R && R.bouwWereld) { R.bouwWereld(); R.teken(1); } }, 60); }
  var peperKlok = 0;
  function pepernoten(aan) {
    var R = window.__rommeltjes;
    if (!R || !R.pepernoten) { clearTimeout(peperKlok); peperKlok = setTimeout(function () { pepernoten(aan); }, 400); return; }
    try { R.pepernoten(aan); } catch (e) { if (window.reportError) reportError(e); }
  }

  // ================= de intocht: de boot vaart binnen en legt aan, dan het welkom en een regen van pepernoten
  var vaartKlok = 0;
  function intocht(opnieuw) {
    if (!bord) return;
    var sc = bord.querySelector('.fb-scene'), dag = F.nu().dag, eerste = F.app().zag !== dag;
    if (!opnieuw && !eerste) return;
    if (eerste) F.zetApp('zag', dag);
    clearTimeout(vaartKlok);
    if (minder || bord.classList.contains('fb-stil')) { sc.classList.add('fb-aangemeerd'); return; }
    sc.classList.remove('fb-aangemeerd', 'fb-vaart'); void sc.offsetWidth; sc.classList.add('fb-vaart');
    vaartKlok = setTimeout(function () { sc.classList.remove('fb-vaart'); sc.classList.add('fb-aangemeerd'); if (opnieuw) toeter(); regen(); }, 7000);
  }
  function regen() {
    var r = bord && bord.querySelector('.fb-regen'); if (!r || minder || bord.classList.contains('fb-stil')) return;
    r.innerHTML = '';
    for (var i = 0; i < 22; i++) { var p = document.createElement('i'); p.style.left = (Math.random() * 96 + 2) + '%'; p.style.animationDuration = (1.6 + Math.random() * 1.6) + 's'; p.style.animationDelay = (Math.random() * 1.4) + 's'; r.appendChild(p); }
    setTimeout(function () { if (r) r.innerHTML = ''; }, 5000);
  }

  // ================= vensters
  function venster(html, klas) {
    var d = document.createElement('dialog'); d.className = 'fb-dialoog ' + (klas || ''); d.innerHTML = html;
    document.body.appendChild(d);
    d.addEventListener('close', function () { d.remove(); });
    d.addEventListener('click', function (e) { if (e.target === d || (e.target.closest && e.target.closest('[data-dicht]'))) d.close(); });
    try { d.showModal(); } catch (e) { d.setAttribute('open', ''); }
    var k = d.querySelector('[data-dicht]'); if (k) k.focus();
    return d;
  }
  function gedichtHtml(id) {
    var g = GEDICHT[id]; if (!g) return '';
    var n = naam();
    return '<p class="fb-gedicht">' + (n ? '<span>Lieve ' + esc(n) + ',</span>' : '') + g.map(function (r) { return '<span>' + esc(r) + '</span>'; }).join('') + '<span class="fb-ondert">Sint en Piet</span></p>';
  }
  function cadeauVenster(id) {
    var x = SPUL[id];
    venster('<span class="fb-label">Een cadeautje voor jou</span><span class="fb-plaat">' + x.teken() + '</span><h2>' + esc(x.naam) + '</h2>' + gedichtHtml(id) +
      '<p class="fb-leeg">Het staat nu in Mijn feestspullen.</p><div class="fb-knoppen"><button type="button" class="fb-knop fb-hoofd" data-dicht>Dank je wel, Sint!</button></div>');
  }
  function spullenVenster() {
    var s = F.kern.lees(), sch = F.kern.schoen(), heb = s.st.filter(function (id) { return SPUL[id]; });
    var lijst = heb.length ? '<ul class="fb-spullen">' + heb.map(function (id) { var x = SPUL[id]; return '<li>' + x.teken() + '<span><b>' + esc(x.naam) + '</b><small>' + esc(x.wat + ' · ' + x.feest) + '</small></span></li>'; }).join('') + '</ul>' : '<p class="fb-leeg">Nog niets. Kom op de feestdagen langs, dan vult je feestkast zich vanzelf.</p>';
    var schoen = sch.gezet ? '<p>Je schoen stond ' + meer(sch.gezet, 'keer', 'keer') + ' klaar. ' + (sch.stapel ? meer(sch.stapel, 'cadeautje ligt', 'cadeautjes liggen') + ' op je stapel' : '') + (sch.inSchoen ? (sch.stapel ? ', en ' : '') + meer(sch.inSchoen, 'cadeautje zit', 'cadeautjes zitten') + ' nog in je schoen' : '') + '. Op pakjesavond pak je ze uit.</p>' : '';
    venster('<span class="fb-label">Mijn feestspullen</span><h2>Wat je met de feestdagen kreeg</h2>' + lijst + schoen +
      '<p class="fb-leeg">Wat je krijgt, gaat mee naar je andere apparaten als je ze hebt gekoppeld.</p><div class="fb-knoppen"><button type="button" class="fb-knop" data-dicht>Sluiten</button></div>');
  }

  // ================= klikken
  function klik(e) {
    var k = e.target.closest && e.target.closest('[data-actie], .fb-uitknop, .fb-boot');
    if (!k) return;
    if (k.classList.contains('fb-boot')) { toeter(); var z = bord.querySelectorAll('.fb-zwaai'); for (var i = 0; i < z.length; i++) { try { z[i].animate([{ transform: 'rotate(-20deg)' }, { transform: 'rotate(20deg)' }, { transform: 'rotate(-10deg)' }], { duration: 600 }); } catch (x) {} } return; }
    if (k.classList.contains('fb-uitknop')) { F.zetApp('uit', F.app().uit ? 0 : 1); return; }
    var a = k.getAttribute('data-actie');
    if (a === 'schoen') { if (F.kern.zetSchoen()) { plop(); F.melden(); var kl = bord.querySelector('.fb-klomp'); if (kl && !minder && kl.animate) { try { kl.animate([{ transform: 'translate(150px,102px)' }, { transform: 'translate(150px,94px)' }, { transform: 'translate(150px,102px)' }], { duration: 450, easing: 'ease-out' }); } catch (x) {} } } else F.melden(); }
    else if (a === 'uit-schoen') { var n = F.kern.haalUitSchoen(); if (n) { tring(); F.melden(); } }
    else if (a === 'intocht') { if (F.kern.krijg('intocht26')) { tring(); F.melden(); cadeauVenster('intocht26'); } else F.melden(); }
    else if (a === 'spullen') spullenVenster();
    else if (a === 'nog') intocht(true);
  }

  // ================= starten (feest.js roept dit aan, zodra de stand bekend is)
  function start(RF) {
    if (F) return; F = RF; minder = F.minder;
    var wacht = 0;
    (function zoek() {
      sec = document.getElementById('feest');
      if (!sec) { if (++wacht < 50) setTimeout(zoek, 100); return; }
      F.klaar(function () { teken(); });
      addEventListener('resize', function () { kijkhoek(); });
    })();
  }
  window.RommelFeestHome = { start: start, teken: function () { if (F) teken(); }, SPUL: SPUL, intocht: function () { intocht(true); } };
})();
