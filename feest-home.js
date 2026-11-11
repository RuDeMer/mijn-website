/* feest-home.js: het feestbord op de homepage (geladen door feest.js, alleen op de homepage).
   Het bord staat in section#feest (gemaakt door home_v6 in homepage-onderdelen.js, op de plek waar het casinobord stond), alleen in de
   feestperiodes uit feestdagen.json. Alles is eigen werk: de tekeningen, de gedichtjes en de geluidjes.
   Deel 1 (Sinterklaas): de intocht op zaterdag 14 november (de Stoomboot vaart binnen en legt aan; het intochtcadeautje),
   en van 14 november tot en met 4 december elke dag je schoen zetten (de volgende dag zit er een ingepakt cadeautje in, dat naar je
   stapel gaat). Pepernoten tussen de rommeltjes (RM.pepernoten in homepage-onderdelen.js).
   Deel 2 (pakjesavond, zaterdag 5 december vanaf 17:00): de cadeautjes een voor een uitpakken (uitpakVenster), met een gedichtje en een
   tekening per ding (SPUL, GEDICHT); voor wie alle schoendagen kwam als laatste de Gouden Mijter; daarna vaart de Stoomboot weer weg
   (afscheidVaart, per apparaat één keer vanzelf: rommelhoekje-feest-apparaat.weg). Na pakjesavond staat het bord er nog zolang er iets uit
   te pakken is (tot en met uitpakkenTot). Wat je uitpakte op de homepage (de chocoladeletter, het worteltje, de Gouden Mijter) komt als
   rommeltje in een eigen vakje van de rommelkast (spul, RM.feestRommels in homepage-onderdelen.js).
   Versiering uit (per apparaat, rommelhoekje-feest-apparaat.uit): geen pepernoten en niets dat beweegt; het bord blijft.
   Testhaak: window.RommelFeestHome. */
(function () {
  'use strict';
  if (window.RommelFeestHome) return;
  var F = null, sec = null, bord = null, minder = false, laatsteSig = '', laatsteFase = '';
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var meer = function (n, een, veel) { return n + ' ' + (n === 1 ? een : veel); };
  var naam = function () { try { var s = JSON.parse(localStorage.getItem('rommelhoekje-speler') || 'null'); return s && s.naam ? String(s.naam) : ''; } catch (e) { return ''; } };

  // ================= wat je met de feestdagen kunt krijgen
  // Wat er in welk pakje zit, staat in feest.js (PAKJES, per schoendag). Hier: de naam, het spel (met de pagina, voor "Naar het spel"),
  // wat het is, het gedichtje en een eigen tekening (viewBox 0 0 120 120). Nieuwe dingen erbij; verander nooit een id.
  var SPUL = {
    intocht26: { naam: 'Stoombootvlaggetje 2026', wat: 'Verzamelstuk van de intocht', feest: 'Sinterklaas 2026', teken: function () { return plaat(vlaggetje(true)); } },
    'hp-chocoletter': { naam: 'Chocoladeletter', spel: 'je homepage', wat: 'Een rommeltje in je rommelkast', feest: 'Sinterklaas 2026', teken: function () { return plaat(icChocoletter()); } },
    'hp-worteltje': { naam: 'Marsepeinen worteltje', spel: 'je homepage', wat: 'Een rommeltje in je rommelkast', feest: 'Sinterklaas 2026', teken: function () { return plaat(icWortel()); } },
    'vb-letter': { naam: 'Chocoladeletter-vlaai', spel: 'de Vlaaienbakker', pagina: 'vlaaienbakker.html', wat: 'Een vlaaivorm in de Gildewinkel', feest: 'Sinterklaas 2026', teken: function () { return plaat(icLettervlaai()); } },
    'vb-speculaas': { naam: 'Speculaaskorst', spel: 'de Vlaaienbakker', pagina: 'vlaaienbakker.html', wat: 'Een korst in de Gildewinkel', feest: 'Sinterklaas 2026', teken: function () { return plaat(icSpeculaas()); } },
    'vb-schoorsteen': { naam: 'Schoorsteen op pakjesavond', spel: 'de Vlaaienbakker', pagina: 'vlaaienbakker.html', wat: 'Een decor in de Gildewinkel', feest: 'Sinterklaas 2026', teken: function () { return plaat(icSchouw()); } },
    'ck-stoomboot': { naam: 'Zie ginds komt de stoomboot', spel: 'het Coulissenkoor', pagina: 'coulissenkoor.html', wat: 'Een liedje voor het koor', feest: 'Sinterklaas 2026', teken: function () { return plaat(icLied('boot')); } },
    'ck-binnen': { naam: 'Sinterklaasje, kom maar binnen', spel: 'het Coulissenkoor', pagina: 'coulissenkoor.html', wat: 'Een liedje voor het koor', feest: 'Sinterklaas 2026', teken: function () { return plaat(icLied('deur')); } },
    'ck-wind': { naam: 'Hoor de wind waait door de bomen', spel: 'het Coulissenkoor', pagina: 'coulissenkoor.html', wat: 'Een liedje voor het koor', feest: 'Sinterklaas 2026', teken: function () { return plaat(icLied('boom')); } },
    'rk-pepernoot': { naam: 'Pepernootkruisje', spel: 'Rommelkroon', pagina: 'rommelkroon.html', wat: 'Een kruisje in de kast, voor altijd', feest: 'Sinterklaas 2026', teken: function () { return plaat(icKroonVak('pepernoot')); } },
    'rk-mijter': { naam: 'Mijterkroontje', spel: 'Rommelkroon', pagina: 'rommelkroon.html', wat: 'Een kroontje in de kast, voor altijd', feest: 'Sinterklaas 2026', teken: function () { return plaat(icKroonVak('mijter')); } },
    'rk-pepernotenregen': { naam: 'Pepernotenregen', spel: 'Rommelkroon', pagina: 'rommelkroon.html', wat: 'Een feestje in de kast, voor altijd', feest: 'Sinterklaas 2026', teken: function () { return plaat(icPepernotenregen()); } },
    'rb-pepernotenuil': { naam: 'Pepernotenuil', spel: 'Rommelbeesten', pagina: 'rommelbeesten.html', wat: 'Een feestkaart in je album', feest: 'Sinterklaas 2026', teken: function () { return plaat(icKaart('uil')); } },
    'rb-speculaasvos': { naam: 'Speculaasvos', spel: 'Rommelbeesten', pagina: 'rommelbeesten.html', wat: 'Een feestkaart in je album', feest: 'Sinterklaas 2026', teken: function () { return plaat(icKaart('vos')); } },
    'rb-marsepeinvarken': { naam: 'Marsepeinen Varkentje', spel: 'Rommelbeesten', pagina: 'rommelbeesten.html', wat: 'Een feestkaart in je album', feest: 'Sinterklaas 2026', teken: function () { return plaat(icKaart('varken')); } },
    'rc-pepernootfiches': { naam: 'Pepernootfiches', spel: 'Casino Rommelroyaal', pagina: 'rommelcasino.html', wat: 'Fiches in je kluisje', feest: 'Sinterklaas 2026', teken: function () { return plaat(icFiches()); } },
    'rc-pakjeskleed': { naam: 'Tafelkleed Pakjesavond', spel: 'Casino Rommelroyaal', pagina: 'rommelcasino.html', wat: 'Een tafelkleed in je kluisje', feest: 'Sinterklaas 2026', teken: function () { return plaat(icKleed()); } },
    'rp-pakjesrug': { naam: 'Kaartrug Pakjespapier', spel: 'Rommelpoker', pagina: 'rommelpoker.html', wat: 'Een kaartrug bij de instellingen', feest: 'Sinterklaas 2026', teken: function () { return plaat(icKaartrug()); } },
    'rd-pepernotentaart': { naam: 'Pepernotentaartje', spel: 'Ruben de Duiker', pagina: 'rubendeduiker.html', wat: 'Een toetje voor het Rommelkombuis', feest: 'Sinterklaas 2026', teken: function () { return plaat(icTaartje()); } },
    'rd-letters': { naam: 'Chocoladeletters op de bar', spel: 'Ruben de Duiker', pagina: 'rubendeduiker.html', wat: 'Iets moois voor in het restaurant', feest: 'Sinterklaas 2026', teken: function () { return plaat(icLetters()); } },
    'rs-stoomboot': { naam: 'Borduurpatroon Stoomboot', spel: 'Rommelsteek', pagina: 'rommelsteek.html', wat: 'Een patroon in de groep Feest', feest: 'Sinterklaas 2026', teken: function () { return plaat(icRing('boot')); } },
    'rs-mijter': { naam: 'Borduurpatroon Mijter', spel: 'Rommelsteek', pagina: 'rommelsteek.html', wat: 'Een patroon in de groep Feest', feest: 'Sinterklaas 2026', teken: function () { return plaat(icRing('mijter')); } },
    mijter26: { naam: 'De Gouden Mijter', spel: 'je homepage en in Rommelkroon', knop: 'Rommelkroon', pagina: 'rommelkroon.html', wat: 'Voor wie elke dag zijn schoen zette', feest: 'Sinterklaas 2026', teken: function () { return plaat(icGoudmijter()); } }
  };
  var GEDICHT = {
    intocht26: ['De stoomboot is er, kijk eens aan,', 'de Sint en zijn Pieten zijn net aan land gegaan.', 'Dit vlaggetje is voor jou, als welkomstgroet:', 'zet elke dag je schoen, dan komt het goed!'],
    'hp-chocoletter': ['Een letter van chocola, wie wil dat nou niet?', 'Het werd een R, zoals je ziet.', 'Hij staat op je homepage, in je rommelkast:', 'tik er maar op, hij springt, en hij past.'],
    'hp-worteltje': ['Je zette een wortel klaar, steeds weer voor het paard,', 'en het paard vond dat een bedankje wel waard.', 'Dus hier is er een terug, van marsepein, oranje en fijn:', 'hij ligt op je homepage, waar de rommeltjes zijn.'],
    'vb-letter': ['Een vlaai als een letter, hoe kan dat nou?', 'De Sint vroeg de bakker, en die deed het voor jou.', 'Kies hem in de Vlaaienbakker, in de Gildewinkel, hier:', 'een vlaai in de vorm van een R, met extra veel plezier!'],
    'vb-speculaas': ['Speculaas met molentjes, met kaneel en met kruid,', 'daar ziet zelfs een gewone vlaai heel feestelijk uit.', 'In de Vlaaienbakker kies je hem als korst, ga je gang:', 'dan ruikt je bakkerij naar pakjesavond, de hele dag lang.'],
    'vb-schoorsteen': ['Een schouw met een vuurtje, een schoen ervoor gezet:', 'daar klimt Piet het liefst naar binnen, met zijn baret.', 'Zet hem in de Vlaaienbakker achter je vlaai, als decor:', 'dan bak je op pakjesavond, het hele jaar door.'],
    'ck-stoomboot': ['Zie ginds komt de stoomboot: dat zing je vast mee,', 'en nu met een echt koor erbij: dat is pas een idee!', 'Het staat bij de liedjes in het Coulissenkoor:', 'sleep een zanger omhoog, en de Sint is een en al oor.'],
    'ck-binnen': ['Sinterklaasje, kom maar binnen: dat lied is al heel oud,', 'en het koor in de coulissen zingt het nu, zo mooi als goud.', 'Je vindt het bij de liedjes, zing gerust een stukje mee:', 'de Sint zit op de eerste rij, en hij klapt voor twee.'],
    'ck-wind': ['Hoor, de wind waait door de bomen, dus kruip lekker bij het vuur,', 'en laat het koor dit liedje zingen, op elk gewenst uur.', 'Je vindt het bij de liedjes in het Coulissenkoor, kijk maar:', 'de bas bromt als de wind, en de rest staat al klaar.'],
    'rk-pepernoot': ['Een kruisje als pepernoot, wat lekker en wat klein,', 'dat moet toch in je Rommelkroon voor altijd zijn?', 'Kies het in de kast, ook als de Sint weer gaat:', 'dan strooi je pepernoten waar nooit een kroon staat.'],
    'rk-mijter': ['Een kroontje als een mijter, met een kruis op de punt:', 'dat is iets wat de Sint jou in Rommelkroon gunt.', 'Het blijft voor altijd van jou, ook in de zomer, ja:', 'kies het in de kast, en puzzel lekker verder, hoera!'],
    'rk-pepernotenregen': ['Los je in Rommelkroon een puzzel op, dan is het feest,', 'en nu regent het pepernoten, zoals nog nooit is geweest!', 'Dit feestje is van jou, voor altijd, wat een buit:', 'kies het in de kast, en strooi ze maar uit.'],
    'rb-pepernotenuil': ['In Rommelbeesten zat er nog geen uil van pepernoot,', 'dus maakte de Sint er een, met twee ogen, rond en groot.', 'Hij staat in je album, in de Feestset, kijk maar:', 'een kaart die je nergens koopt, alleen van de Sint, echt waar.'],
    'rb-speculaasvos': ['Een vos van speculaas, slim, bruin en wat kruidig,', 'met molentjes op zijn staart, en zijn snuitje heel guitig.', 'In Rommelbeesten staat hij nu in de Feestset: wat een beest,', 'de slimste vos die er ooit in een schoen is geweest!'],
    'rb-marsepeinvarken': ['Een varkentje van marsepein, roze en rond,', 'met een knorretje erbij en een lachje om zijn mond.', 'In Rommelbeesten staat het in de Feestset, heel fijn:', 'niet opeten, hoor, ook al lijkt het echt marsepein!'],
    'rc-pepernootfiches': ['In het casino speel je met fiches, en nooit met echt geld,', 'en deze zijn pepernoten: heb je ze al geteld?', 'Kies ze in je kluisje, in Casino Rommelroyaal:', 'zo speel je met snoepgoed, en dat is heel normaal.'],
    'rc-pakjeskleed': ['Een tafelkleed van pakjespapier, met strikjes en met lint,', 'voor elke tafel in het casino, zo vrolijk als een kind.', 'Je vindt het in je kluisje, in Casino Rommelroyaal:', 'dan wordt elk spelletje een pakjesavond, allemaal.'],
    'rp-pakjesrug': ['Een kaartrug van pakjespapier, rood met een strik:', 'in Rommelpoker kies je hem nu, met één klik.', 'Elke kaart die je trekt, lijkt dan een cadeau:', 'wat zou erin zitten? Een paar, of een straat, zomaar zo?'],
    'rd-pepernotentaart': ['Een taartje met pepernoten, voor na het eten, heel fijn:', 'in het Rommelkombuis mag het nu op het menu zijn.', 'Ruben bakt het voor zijn gasten, als toetje van de dag,', 'en wie het proeft, die krijgt meteen een Sinterklaaslach.'],
    'rd-letters': ['Chocoladeletters op de bar, in goud en zilver gepakt:', 'daar heeft Ruben al een paar keer stiekem van gesnackt.', 'Zet ze neer in het Rommelkombuis, in Ruben de Duiker, daar:', 'dan weet elke gast die binnenkomt: de Sint was hier, echt waar!'],
    'rs-stoomboot': ['Een stoomboot van kruisjes, met rook en een vlag,', 'om rustig te borduren, op een stille dag.', 'Hij staat in Rommelsteek, bij de patronen van Feest:', 'steekje voor steekje, en dan is de Sint er geweest.'],
    'rs-mijter': ['Een mijter van kruisjes, met goud en met rood,', 'heel rustig geborduurd, steek voor steek, niet te groot.', 'Hij staat in Rommelsteek, bij Feest, en weet je wat het fijnste is?', 'Je hoeft je nergens te haasten, en je steekt nooit mis.'],
    mijter26: ['Eenentwintig keer stond je schoen bij het vuur,', 'geen dag vergeten, op geen enkel uur.', 'Daarom de Gouden Mijter, de mooiste die er is:', 'op je homepage, en als kroontje in Rommelkroon, gewis!']
  };
  // een tekening (viewBox 0 0 120 120) als los plaatje
  function plaat(binnen) { return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">' + binnen + '</svg>'; }

  // ================= de tekeningen (eigen werk, in de stijl van het rommelhoekje: inktranden, platte kleuren met wat licht en schaduw)
  var I = '#231A26', WIT = '#FBF6E9', GOUD = '#E9B949', ROOD = '#C8323C';
  var r1 = function (x) { return Math.round(x * 10) / 10; };
  var pd = function (d, f, rest) { return '<path d="' + d + '" fill="' + (f || 'none') + '"' + (rest == null ? ' stroke="' + I + '" stroke-width="2" stroke-linejoin="round"' : ' ' + rest) + '/>'; };
  // een vast toeval (dezelfde tekening bij elk bezoek)
  function zaad(n) { var s = n * 9301 + 49297; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }
  function vlaggetje(binnen) {
    var s = '<path d="M30 14v96" stroke="#7A4E2D" stroke-width="5" stroke-linecap="round"/><circle cx="30" cy="12" r="5" fill="' + GOUD + '" stroke="' + I + '" stroke-width="2"/>' +
      '<path d="M33 18h70l-12 20 12 20H33z" fill="' + ROOD + '" stroke="' + I + '" stroke-width="3" stroke-linejoin="round"/><path d="M33 38h62" stroke="' + WIT + '" stroke-width="4" opacity=".9"/>' +
      '<path d="M41 33h28l-4 5H45z" fill="' + WIT + '" stroke="' + I + '" stroke-width="1.4" stroke-linejoin="round"/><rect x="53" y="25" width="6" height="8" fill="' + WIT + '" stroke="' + I + '" stroke-width="1.4"/><text x="68" y="54" font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800" font-size="13" fill="' + GOUD + '" text-anchor="middle">2026</text>';
    return binnen ? s : plaat(s);
  }
  // ---------- de tekeningen van de cadeautjes (viewBox 0 0 120 120)
  var p3 = function (d, f, w) { return pd(d, f, 'stroke="' + I + '" stroke-width="' + (w || 3) + '" stroke-linejoin="round" stroke-linecap="round"'); };
  var lijn = function (d, kl, w, rest) { return pd(d, 'none', 'stroke="' + kl + '" stroke-width="' + (w || 2) + '" stroke-linecap="round" stroke-linejoin="round"' + (rest ? ' ' + rest : '')); };
  var R_PAD = 'M30 16H62Q88 16 88 40Q88 56 72 61L89 100H67L53 66H50V100H30ZM50 31V51H61Q70 51 70 41Q70 31 61 31Z';
  var pepernootje = function (x, y, r) { return '<ellipse cx="' + x + '" cy="' + y + '" rx="' + r + '" ry="' + r1(r * 0.88) + '" fill="#B5733A" stroke="' + I + '" stroke-width="2.2"/>' + lijn('M' + r1(x - r * 0.6) + ' ' + r1(y - r * 0.2) + 'q' + r1(r * 0.6) + ' -' + r1(r * 0.5) + ' ' + r1(r * 1.2) + ' 0', '#D99A5B', 2) + '<circle cx="' + r1(x - r * 0.25) + '" cy="' + r1(y + r * 0.25) + '" r="1.2" fill="#6E3F1A"/><circle cx="' + r1(x + r * 0.35) + '" cy="' + r1(y + r * 0.35) + '" r="1.1" fill="#6E3F1A"/>'; };
  function icChocoletter() {
    return pd('M22 103H96', 'none', 'stroke="#C9C2B8" stroke-width="6" stroke-linecap="round"') +
      '<path d="' + R_PAD + '" fill="#7A4526" fill-rule="evenodd" stroke="' + I + '" stroke-width="3.4" stroke-linejoin="round"/>' +
      lijn('M36 22V94M52 22H61Q81 22 82 38', '#A96B3F', 4, 'opacity=".85"') + lijn('M74 66L84 92', '#5A3018', 3) +
      pd('M96 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z', '#FFF3C4', 'stroke="' + I + '" stroke-width="1.6" stroke-linejoin="round"');
  }
  function icWortel() {
    return p3('M82 36Q86 14 98 12Q96 26 86 38ZM86 41Q104 31 112 39Q100 45 88 45ZM79 33Q70 15 78 6Q86 20 84 34Z', '#4DA35A', 2.6) +
      p3('M16 102Q44 64 74 35Q87 34 89 47Q64 78 16 102Z', '#F08A2E', 3.2) +
      lijn('M36 80l8 4M48 66l8 5M60 54l7 5M42 90l6-4M56 76l6-4', '#C1601A', 2.4) + lijn('M24 92Q48 64 74 41', '#FFC48A', 3, 'opacity=".75"');
  }
  function icLettervlaai() {
    return '<defs><clipPath id="fbc-rv"><path d="' + R_PAD + '" clip-rule="evenodd"/></clipPath></defs>' +
      '<g clip-path="url(#fbc-rv)"><rect x="20" y="10" width="80" height="100" fill="#B5222E"/>' +
      [-30, -10, 10, 30, 50].map(function (o) { return lijn('M' + (20 + o) + ' 10L' + (100 + o) + ' 110M' + (100 - o) + ' 10L' + (20 - o) + ' 110', '#E3A857', 6); }).join('') +
      [[42, 28], [60, 46], [42, 64], [42, 88], [78, 82], [60, 26]].map(function (c) { return '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="4" fill="#E23A48" stroke="#7A1420" stroke-width="1.4"/>'; }).join('') + '</g>' +
      '<path d="' + R_PAD + '" fill="none" stroke="#E3A857" stroke-width="9" stroke-linejoin="round"/><path d="' + R_PAD + '" fill="none" stroke="' + I + '" stroke-width="3.2" stroke-linejoin="round"/>' +
      lijn('M35 20V96', '#F6CF8A', 2.4, 'opacity=".9"');
  }
  function icSpeculaas() {
    return '<rect x="16" y="20" width="88" height="80" rx="11" fill="#B86A2C" stroke="' + I + '" stroke-width="3.2"/>' +
      '<rect x="24" y="28" width="72" height="64" rx="7" fill="none" stroke="#86461A" stroke-width="2.4" stroke-dasharray="5 4"/>' +
      p3('M53 86L57 54H63L67 86Z', '#A65C24', 2.4) + lijn('M60 52L44 36M60 52L76 36M60 52L76 68M60 52L44 68', '#7E4218', 4.4) +
      lijn('M44 36l-5 5M76 36l5 5M76 68l5-5M44 68l-5-5', '#7E4218', 3) +
      [[30, 34], [90, 34], [30, 86], [90, 86]].map(function (a) { return '<ellipse cx="' + a[0] + '" cy="' + a[1] + '" rx="5" ry="3.4" fill="#F1D6A6" stroke="' + I + '" stroke-width="1.4"/>'; }).join('') +
      lijn('M22 30Q22 24 30 24H52', '#D99A5B', 3, 'opacity=".8"');
  }
  function icSchouw() {
    var s = p3('M18 106V34H102V106Z', '#A0473A', 3);
    for (var y = 42; y < 104; y += 11) s += lijn('M18 ' + y + 'H102', '#7A3329', 1.2, 'opacity=".7"');
    s += p3('M36 106V74Q36 56 60 56Q84 56 84 74V106Z', '#2A2430', 2.6) + '<ellipse cx="60" cy="96" rx="22" ry="10" fill="#FFB347" opacity=".45"/>';
    s += lijn('M44 102l32-6M46 96l32 6', '#6E4A30', 6) + pd('M48 98Q44 84 54 74Q54 84 58 86Q58 72 66 66Q66 80 72 84Q76 78 76 74Q82 86 74 98Z', '#E07A2E', 'stroke="none"') + pd('M54 98Q52 90 58 84Q60 90 62 90Q64 82 68 80Q68 88 70 98Z', '#F6CB2F', 'stroke="none"');
    s += p3('M10 24H110V36H10Z', '#7A4E2D', 2.8) + p3('M86 24V10h7V24z', '#FBF6E9', 2) + pd('M89.5 8q-3 -5 0 -8q3 4 0 8z', '#F6CB2F', 'stroke="#E07A2E" stroke-width="1"');
    s += '<g transform="translate(4 84) scale(.36)">' + pd('M4 47C-1 38 4 31 14 29L44 23C50 14 54 6 60 3L86 1C93 1 96 6 96 12L97 47Z', '#A8683A', 'stroke="' + I + '" stroke-width="5" stroke-linejoin="round"') + pd('M2 52Q2 58 9 58H94Q100 58 100 51V47H2Z', '#3A2416', 'stroke="' + I + '" stroke-width="5"') + '</g>';
    return s + pepernootje(94, 100, 5) + pepernootje(104, 104, 4.4);
  }
  function icLied(sym) {
    var s = '<g transform="rotate(-6 58 58)">' + p3('M20 12H90V100H20Z', '#FFFDF6', 3);
    [36, 64].forEach(function (y0) { for (var k = 0; k < 5; k++) s += lijn('M28 ' + (y0 + k * 4) + 'H82', '#8A8794', 1.2); });
    [[36, 48, 1], [48, 44, 1], [60, 40, 0], [72, 46, 1], [40, 76, 0], [54, 72, 1], [68, 68, 1]].map(function (n) { s += '<ellipse cx="' + n[0] + '" cy="' + n[1] + '" rx="4.4" ry="3.3" transform="rotate(-20 ' + n[0] + ' ' + n[1] + ')" fill="' + (n[2] ? I : WIT) + '" stroke="' + I + '" stroke-width="1.8"/>' + lijn('M' + (n[0] + 4) + ' ' + n[1] + 'V' + (n[1] - 18), I, 1.8); });
    s += '</g><circle cx="88" cy="90" r="22" fill="' + (sym === 'boom' ? '#2E8B62' : sym === 'deur' ? '#6A4C9C' : '#2F4C8F') + '" stroke="' + I + '" stroke-width="3"/>';
    if (sym === 'boot') s += p3('M72 94H104L99 103H77Z', ROOD, 2.2) + p3('M80 94V86H96V94Z', WIT, 2) + p3('M88 86V77H94V86Z', '#1F2333', 2) + pd('M91 75q-4 -6 2 -9q5 2 2 7', 'none', 'stroke="#E9E4DA" stroke-width="2.4" stroke-linecap="round"');
    else if (sym === 'deur') s += p3('M78 108V78Q78 72 88 72Q98 72 98 78V108Z', '#A0733F', 2.2) + '<circle cx="94" cy="92" r="1.8" fill="' + GOUD + '"/>' + lijn('M82 80h12M82 86h12', '#7A4E2D', 1.4);
    else s += p3('M88 104V94', '#6E4A30', 3) + p3('M88 72L100 92H76Z', '#7ACB7F', 2.2) + lijn('M70 78q6 -3 10 0M66 86q8 -3 12 0', '#FFFFFF', 2.2);
    return s;
  }
  function icKroonVak(soort) {
    var kl = ['#F6C3B5', '#BFE0C9', '#C9D6F2', '#F2DE9B'], s = '';
    for (var r = 0; r < 2; r++) for (var c = 0; c < 2; c++) s += '<rect x="' + (14 + c * 46) + '" y="' + (14 + r * 46) + '" width="46" height="46" fill="' + kl[r * 2 + c] + '"/>';
    s += '<rect x="14" y="14" width="92" height="92" rx="6" fill="none" stroke="' + I + '" stroke-width="3.4"/>' + lijn('M60 14V106M14 60H106', I, 2);
    if (soort === 'pepernoot') return s + pepernootje(37, 37, 12) + pepernootje(83, 83, 12) + pepernootje(37, 83, 12) + mijterKlein(83, 37, 1, ROOD);
    return s + mijterKlein(37, 38, 1.15, ROOD) + pepernootje(83, 37, 9) + pepernootje(37, 83, 9) + pepernootje(83, 83, 9);
  }
  // een kleine mijter (midden x, y), schaal k, kleur
  function mijterKlein(x, y, k, kl) {
    return '<g transform="translate(' + x + ' ' + y + ') scale(' + k + ')">' + p3('M-13 16L-14 -2Q-12 -12 0 -18Q12 -12 14 -2L13 16Z', kl, 2.4) + p3('M-13.6 10H13.6V16H-13Z', GOUD, 2) + lijn('M0 -10V6M-6 -2H6', GOUD, 3) + lijn('M-8 -4Q-7 -11 -2 -14', '#FFFFFF', 2, 'opacity=".55"') + '</g>';
  }
  function icPepernotenregen() {
    var s = '';
    [[30, 26, 8, 0], [60, 14, 9, 1], [88, 30, 7, 0], [44, 54, 10, 1], [78, 60, 8, 0], [26, 80, 7, 1], [96, 86, 9, 0], [56, 92, 10, 1]].forEach(function (p) {
      s += lijn('M' + (p[0] - 3) + ' ' + (p[1] - p[2] - 6) + 'v-10M' + (p[0] + 3) + ' ' + (p[1] - p[2] - 4) + 'v-7', '#B5733A', 2, 'opacity=".45"') + pepernootje(p[0], p[1], p[2]);
    });
    return s;
  }
  function icKaart(dier) {
    var rand = dier === 'uil' ? '#8A5A2E' : dier === 'vos' ? '#D9752B' : '#E06F93', s = '';
    s += '<rect x="24" y="8" width="72" height="104" rx="9" fill="' + rand + '" stroke="' + I + '" stroke-width="3.2"/><rect x="30" y="14" width="60" height="92" rx="5" fill="#FFF8E8" stroke="' + I + '" stroke-width="2"/>';
    s += '<rect x="34" y="20" width="52" height="50" rx="3" fill="' + (dier === 'varken' ? '#FCE3EC' : '#F6E3C0') + '" stroke="' + I + '" stroke-width="1.8"/>';
    if (dier === 'uil') s += p3('M44 66Q40 44 48 36L46 28L54 33Q60 31 66 33L74 28L72 36Q80 44 76 66Z', '#B5733A', 2.4) + '<circle cx="53" cy="44" r="7" fill="' + WIT + '" stroke="' + I + '" stroke-width="2"/><circle cx="67" cy="44" r="7" fill="' + WIT + '" stroke="' + I + '" stroke-width="2"/><circle cx="54" cy="45" r="3" fill="' + I + '"/><circle cx="66" cy="45" r="3" fill="' + I + '"/>' + p3('M57 52L60 57L63 52Z', GOUD, 1.6) + '<circle cx="52" cy="60" r="1.6" fill="#6E3F1A"/><circle cx="60" cy="63" r="1.6" fill="#6E3F1A"/><circle cx="68" cy="60" r="1.6" fill="#6E3F1A"/>';
    else if (dier === 'vos') s += p3('M42 30L50 42H70L78 30L76 50Q70 64 60 66Q50 64 44 50Z', '#D9752B', 2.4) + p3('M48 52Q54 58 60 66Q66 58 72 52Q66 50 60 54Q54 50 48 52Z', '#FFF1DC', 1.6) + '<circle cx="53" cy="48" r="2.4" fill="' + I + '"/><circle cx="67" cy="48" r="2.4" fill="' + I + '"/>' + p3('M57 60h6l-3 4z', I, 1.4) + lijn('M46 38l4 2M74 38l-4 2', '#8A4A1C', 2);
    else s += p3('M42 34L48 44M78 34L72 44', 'none', 2.6) + p3('M40 48Q40 32 60 32Q80 32 80 48Q80 66 60 66Q40 66 40 48Z', '#F4A7BD', 2.4) + p3('M52 52Q52 46 60 46Q68 46 68 52Q68 58 60 58Q52 58 52 52Z', '#E77E9E', 2) + '<ellipse cx="57" cy="52" rx="1.6" ry="2.4" fill="#8A3A55"/><ellipse cx="63" cy="52" rx="1.6" ry="2.4" fill="#8A3A55"/><circle cx="51" cy="42" r="2.2" fill="' + I + '"/><circle cx="69" cy="42" r="2.2" fill="' + I + '"/>' + lijn('M54 61q6 3 12 0', '#8A3A55', 1.8);
    s += '<rect x="34" y="76" width="52" height="10" rx="2" fill="' + rand + '" opacity=".35"/>' + lijn('M38 81h30', I, 2.2, 'opacity=".55"');
    return s + [48, 60, 72].map(function (x) { return pd('M' + x + ' 92l2.4 4.6 5 .7-3.6 3.5.9 5-4.7-2.4-4.7 2.4.9-5-3.6-3.5 5-.7z', GOUD, 'stroke="' + I + '" stroke-width="1.2" stroke-linejoin="round"'); }).join('');
  }
  function icFiches() {
    var fiche = function (y) { var g = '<ellipse cx="60" cy="' + (y + 6) + '" rx="34" ry="13" fill="#8A4E22" stroke="' + I + '" stroke-width="3"/><ellipse cx="60" cy="' + y + '" rx="34" ry="13" fill="#B5733A" stroke="' + I + '" stroke-width="3"/>'; for (var k = 0; k < 8; k++) { var a = k * Math.PI / 4; g += '<rect x="' + r1(60 + Math.cos(a) * 28 - 3) + '" y="' + r1(y + Math.sin(a) * 10.5 - 2) + '" width="6" height="4" rx="1" fill="' + WIT + '" transform="rotate(' + r1(a * 57.3) + ' ' + r1(60 + Math.cos(a) * 28) + ' ' + r1(y + Math.sin(a) * 10.5) + ')"/>'; } return g + '<ellipse cx="60" cy="' + y + '" rx="20" ry="7.5" fill="none" stroke="#D99A5B" stroke-width="2"/>'; };
    return fiche(88) + fiche(70) + fiche(52) + '<circle cx="54" cy="51" r="1.6" fill="#6E3F1A"/><circle cx="64" cy="54" r="1.4" fill="#6E3F1A"/><circle cx="66" cy="48" r="1.3" fill="#6E3F1A"/>' + pd('M96 22l3 7 7 3-7 3-3 7-3-7-7-3 7-3z', '#FFF3C4', 'stroke="' + I + '" stroke-width="1.6" stroke-linejoin="round"');
  }
  function icKleed() {
    var s = '<rect x="12" y="22" width="96" height="76" rx="14" fill="#7A4E2D" stroke="' + I + '" stroke-width="3"/><rect x="20" y="30" width="80" height="60" rx="8" fill="#A3232E" stroke="' + I + '" stroke-width="2"/>';
    [[32, 42], [62, 38], [86, 50], [44, 70], [74, 72]].forEach(function (p, i) { var kl = [GOUD, '#2E8B62', WIT, GOUD, '#2F4C8F'][i]; s += '<rect x="' + (p[0] - 6) + '" y="' + (p[1] - 5) + '" width="12" height="10" rx="1.5" fill="' + kl + '" stroke="' + I + '" stroke-width="1.4"/>' + lijn('M' + p[0] + ' ' + (p[1] - 5) + 'v10M' + (p[0] - 6) + ' ' + p[1] + 'h12', ROOD, 1.6); });
    [[50, 52], [86, 80], [28, 62], [66, 56]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="3.2" fill="#B5733A" stroke="' + I + '" stroke-width="1.2"/>'; });
    return s + '<rect x="20" y="30" width="80" height="60" rx="8" fill="none" stroke="' + GOUD + '" stroke-width="2" stroke-dasharray="3 3"/>';
  }
  function icKaartrug() {
    var s = '<rect x="28" y="10" width="64" height="100" rx="9" fill="' + ROOD + '" stroke="' + I + '" stroke-width="3.2"/>';
    for (var k = 0; k < 9; k++) s += lijn('M' + (24 + k * 10) + ' 10L' + (4 + k * 10) + ' 110', '#E0505A', 3, 'opacity=".55"');
    s += '<rect x="28" y="10" width="64" height="100" rx="9" fill="none" stroke="' + I + '" stroke-width="3.2"/>';
    s += pd('M56 10V110H64V10ZM28 56H92V64H28Z', GOUD, 'stroke="' + I + '" stroke-width="1.8"');
    return s + p3('M60 60Q44 44 40 52Q38 60 60 60Q82 60 80 52Q76 44 60 60Z', '#F6CB2F', 2.2) + p3('M60 60L50 74L56 74L60 66L64 74L70 74Z', '#F6CB2F', 2) + '<circle cx="60" cy="60" r="4.4" fill="' + GOUD + '" stroke="' + I + '" stroke-width="2"/>';
  }
  function icTaartje() {
    return p3('M10 96Q60 112 110 96L104 102Q60 116 16 102Z', '#E8EEF2', 2.4) +
      p3('M22 92L28 62H92L98 92Q60 102 22 92Z', '#C98A4E', 3) + lijn('M26 78Q60 86 94 78', '#A6672E', 2.4) +
      p3('M26 64Q26 52 60 50Q94 52 94 64Q60 72 26 64Z', '#F3E1C2', 2.6) + lijn('M34 60q4 4 8 0t8 0 8 0 8 0 8 0 8 0', '#E3C69A', 2) +
      pepernootje(44, 54, 6) + pepernootje(60, 50, 7) + pepernootje(76, 54, 6) + pepernootje(52, 61, 5) + pepernootje(68, 61, 5);
  }
  function icLetters() {
    var M = 'M60 44V98H71V68L79 84L87 68V98H98V44H86L79 60L72 44Z';
    return p3('M6 100H114V112H6Z', '#7A4E2D', 2.6) + lijn('M8 103H112', '#A0733F', 2, 'opacity=".8"') +
      '<g transform="translate(8 6) scale(.58)"><path d="' + R_PAD + '" fill="#E9B949" fill-rule="evenodd" stroke="' + I + '" stroke-width="5" stroke-linejoin="round"/>' + lijn('M36 24V94M56 26l8 10M40 60l12 6', '#FFF3C4', 4, 'opacity=".85"') + lijn('M44 40l8 6M70 76l6 12', '#B8862C', 3) + '</g>' +
      '<path d="' + M + '" fill="#C9CCD3" stroke="' + I + '" stroke-width="3" stroke-linejoin="round"/>' + lijn('M64 50V94M90 50l-6 8', '#FFFFFF', 2.6, 'opacity=".8"') + lijn('M74 74l4 6M92 64v20', '#8E929C', 2);
  }
  function icRing(soort) {
    var s = '<circle cx="60" cy="62" r="48" fill="#C08A4E" stroke="' + I + '" stroke-width="3"/><circle cx="60" cy="62" r="42" fill="#FBF6E9" stroke="' + I + '" stroke-width="2"/>' + p3('M52 10H68V18H52Z', '#8A8794', 2) + '<circle cx="60" cy="14" r="2" fill="' + I + '"/>';
    var raster = soort === 'boot' ?
      ['............', '.......gg...', '......gg....', '.......rr...', '.......rr...', '...wwwwwww..', '..bbbbbbbbb.', '...bbbbbbb..', 'll.l..l..l.l'] :
      ['.....rr.....', '....rrrr....', '...rrggrr...', '...rgggrr...', '..rrrggrrr..', '..rrrggrrr..', '..rrrrrrrr..', '..gggggggg..', '..rrrrrrrr..'];
    var kl = { g: soort === 'boot' ? '#B9B3A8' : '#E9B949', r: ROOD, w: WIT, b: '#2F4C8F', l: '#7FB3D8' }, y0 = 34;
    raster.forEach(function (rij, j) { for (var i = 0; i < rij.length; i++) { var c = rij[i]; if (c !== '.') s += '<rect x="' + (24 + i * 6) + '" y="' + (y0 + j * 6) + '" width="6" height="6" fill="' + kl[c] + '"/>' + lijn('M' + (24.8 + i * 6) + ' ' + (y0 + j * 6 + 0.8) + 'l4.4 4.4M' + (29.2 + i * 6) + ' ' + (y0 + j * 6 + 0.8) + 'l-4.4 4.4', I, 0.8, 'opacity=".35"'); } });
    return s;
  }
  function icGoudmijter() {
    var s = '';
    for (var k = 0; k < 12; k++) { var a = k * Math.PI / 6; s += lijn('M' + r1(60 + Math.cos(a) * 30) + ' ' + r1(58 + Math.sin(a) * 30) + 'L' + r1(60 + Math.cos(a) * 52) + ' ' + r1(58 + Math.sin(a) * 52), '#F6CB2F', 4, 'opacity=".55"'); }
    s += p3('M30 104L28 54Q30 32 60 18Q90 32 92 54L90 104Z', '#E9B949', 3.4) + lijn('M60 18Q46 36 45 58L44 104M60 18Q74 36 75 58L76 104', '#B8862C', 2.4);
    s += p3('M29 88H91V104H30Z', ROOD, 2.8) + lijn('M60 36V72M46 52H74', ROOD, 7) + lijn('M60 36V72M46 52H74', '#FFE7A0', 2.4);
    s += [42, 60, 78].map(function (x) { return '<circle cx="' + x + '" cy="96" r="3.6" fill="#FFE7A0" stroke="' + I + '" stroke-width="1.4"/>'; }).join('') + '<circle cx="60" cy="52" r="5" fill="#4FA3E0" stroke="' + I + '" stroke-width="1.6"/>';
    return s + lijn('M36 60Q38 40 54 28', '#FFF3C4', 4, 'opacity=".9"') + pd('M96 18l3 7 7 3-7 3-3 7-3-7-7-3 7-3z', '#FFF3C4', 'stroke="' + I + '" stroke-width="1.6" stroke-linejoin="round"');
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
    if (fase !== 'intocht' && fase !== 'nog') s += '<g class="fb-dak">' + pd('M893 112V96h12v16z', '#A0473A') + pd('M891 94h16v4h-16z', I) + piet(915, 117, PIET[3], 0.6, 'zak') + '</g>';
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
      '<text x="165" y="136" font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800" font-size="17" fill="' + ROOD + '" text-anchor="middle" letter-spacing=".6" class="fb-welkom">WELKOM SINTERKLAAS!</text>' +
      '<text x="165" y="136" font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800" font-size="17" fill="' + ROOD + '" text-anchor="middle" letter-spacing=".6" class="fb-dagdag">DAG SINTERKLAASJE!</text></g>';
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
  // papier dat scheurt: ruis door een filter dat omlaag schuift
  var scheur = function () {
    var a = audio(); if (!a) return;
    try {
      var n = Math.floor(a.sampleRate * 0.32), buf = a.createBuffer(1, n, a.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (0.55 + 0.45 * Math.sin(i / 160));
      var src = a.createBufferSource(), fl = a.createBiquadFilter(), g = a.createGain(), t0 = a.currentTime;
      src.buffer = buf; fl.type = 'bandpass'; fl.Q.value = 1.3; fl.frequency.setValueAtTime(3200, t0); fl.frequency.exponentialRampToValueAtTime(1000, t0 + 0.3);
      g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.09, t0 + 0.03); g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.31);
      src.connect(fl); fl.connect(g); g.connect(a.destination); src.start(t0);
    } catch (e) {}
  };

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
      // pakjesavond: de avond (ook in licht), het afscheid, en daarna een lege kade
      '.tg-feest-bord.fb-avond{--fb-l1:#141C44;--fb-l2:#5B4A7E;--fb-w1:#203C68;--fb-w2:#0E1D3A;--fb-golf:#6C86B8;--fb-glas:#F6CB2F;--fb-ver:#2A3560;--fb-meeuw:#C9D3E6}',
      '.fb-avond .fb-nacht,.fb-avond .fb-lgloed{display:inline}.fb-avond .fb-dag,.fb-avond .fb-meeuw{display:none}',
      '.fb-dagdag{display:none}.fb-afscheid .fb-welkom{display:none}.fb-afscheid .fb-dagdag{display:inline}',
      '.fb-weg .fb-boot,.fb-weg .fb-touw,.fb-afvaart .fb-touw{display:none}',
      '.fb-scene.fb-leeg .fb-boot,.fb-scene.fb-leeg .fb-touw,.fb-scene.fb-leeg .fb-spandoek,.fb-scene.fb-leeg .fb-mensen{display:none}',
      // het uitpakvenster
      '.fb-dialoog.fb-uitpak{max-width:30rem;text-align:center}',
      '.fb-uitpak h2{outline:none}.fb-uitpak .fb-knoppen{justify-content:center}.fb-uitpak .fb-gedicht{text-align:left;display:inline-block;margin:.3rem auto .9rem}',
      '.fb-teller{margin:.35rem 0 0;font-weight:800;color:var(--tg-zacht);font-size:.9rem}',
      '.fb-podium{position:relative;width:min(100%,250px);margin:.2rem auto .3rem;aspect-ratio:200/180}',
      '.fb-groot{width:100%;height:100%;padding:0;border:0;background:none;cursor:pointer;display:block;touch-action:none;border-radius:14px}',
      '.fb-groot svg{width:100%;height:100%;display:block;overflow:visible}',
      '.fb-groot:focus-visible{outline:3px solid var(--tg-focus,#2F4C8F);outline-offset:4px}',
      '.fb-hl,.fb-hr,.fb-strik,.fb-inhoud{transform-box:fill-box;transform-origin:center}',
      '.fb-inhoud{opacity:0}.fb-open .fb-inhoud{opacity:1}.fb-open .fb-hl,.fb-open .fb-hr,.fb-open .fb-strik{opacity:0}',
      '.fb-snippers{position:absolute;inset:0;pointer-events:none}.fb-snippers i{position:absolute;left:50%;top:42%;width:11px;height:7px;margin:-3px 0 0 -5px;border:1.5px solid #231A26;border-radius:1px;opacity:0}',
      '.fb-hint{margin:.2rem 0 .85rem;color:var(--tg-zacht)}.fb-voor{margin:.1rem 0 .2rem;color:var(--tg-zacht);font-size:.92rem}',
      '.fb-uitpak a.fb-knop{text-decoration:none;display:inline-block}',
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
      '  .fb-afvaart .fb-boot{animation:fb-afvaart 7s cubic-bezier(.45,0,.8,.55) both}',
      '  .fb-afvaart .fb-boeggolf{animation:fb-boeg .5s ease-in-out infinite alternate}',
      '  .fb-groot.fb-wacht .fb-pak{animation:fb-wiebel 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}',
      '  .fb-groot.fb-wacht:hover .fb-strik{animation:fb-strikje .5s ease-in-out}',
      '  .fb-open .fb-hl{animation:fb-hl .75s ease-in both}.fb-open .fb-hr{animation:fb-hr .75s ease-in both}.fb-open .fb-strik{animation:fb-strikweg .7s ease-out both}',
      '  .fb-open .fb-inhoud{animation:fb-inhoud .65s .22s cubic-bezier(.2,1.4,.4,1) both}',
      '  .fb-snippers i{animation:fb-snip 1.05s cubic-bezier(.15,.7,.4,1) forwards}',
      '}',
      '@keyframes fb-afvaart{from{transform:translateX(0)}to{transform:translateX(760px)}}',
      '@keyframes fb-wiebel{0%,68%,100%{transform:rotate(0)}76%{transform:rotate(-3deg)}84%{transform:rotate(3deg)}92%{transform:rotate(-1.5deg)}}',
      '@keyframes fb-strikje{50%{transform:scale(1.12)}}',
      '@keyframes fb-hl{from{transform:none;opacity:1}to{transform:translate(-64px,34px) rotate(-30deg);opacity:0}}',
      '@keyframes fb-hr{from{transform:none;opacity:1}to{transform:translate(64px,34px) rotate(30deg);opacity:0}}',
      '@keyframes fb-strikweg{from{transform:none;opacity:1}to{transform:translate(0,-80px) rotate(180deg);opacity:0}}',
      '@keyframes fb-inhoud{from{transform:scale(.35);opacity:0}to{transform:none;opacity:1}}',
      '@keyframes fb-snip{0%{opacity:1;transform:translate(0,0) rotate(0)}80%{opacity:1}100%{opacity:0;transform:translate(var(--x),var(--y)) rotate(var(--r))}}',
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

  var MAANDEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
  function datumTekst(d) { var a = String(d || '').slice(0, 10).split('-'); return a.length === 3 ? (+a[2]) + ' ' + MAANDEN[+a[1] - 1] : ''; }
  function teksten(s, sch, p, modus) {
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
    } else if (modus === 'pakjesavond-straks') {
      t.label = 'Zaterdag 5 december'; t.kop = 'Vanavond is het pakjesavond!';
      if (sch.inSchoen && s.zeker) { zin.push('Er zit nog iets in je schoen!'); t.knoppen.push(['uit-schoen', 'Haal je cadeautje eruit']); }
      if (sch.stapel || sch.inSchoen) zin.push((sch.stapel ? 'Je hebt ' + meer(sch.stapel, 'cadeautje', 'cadeautjes') + ' op je stapel. ' : '') + 'Om vijf uur mag je uitpakken.');
      else zin.push('Je zette dit jaar je schoen niet, maar om vijf uur kun je de Sint gerust mee uitzwaaien.');
      t.stapel = pakjesTekst;
    } else if (modus === 'pakjesavond' || modus === 'nog') {
      var nog = p.dicht || (p.mijter === 'dicht' ? 1 : 0);
      t.label = modus === 'nog' ? 'Van de Sint' : 'Zaterdag 5 december';
      if (modus === 'nog') { t.kop = 'Er ligt nog iets voor je!'; zin.push('De Sint is alweer naar huis, maar je stapel ligt hier nog. Je kunt uitpakken tot en met ' + datumTekst(s.uitpakTot) + '.'); }
      else if (p.dicht) { t.kop = 'Het is pakjesavond!'; zin.push('Er ' + (p.dicht === 1 ? 'ligt één cadeautje' : 'liggen ' + p.dicht + ' cadeautjes') + ' op je stapel. Pak ze een voor een uit!'); }
      else if (nog) { t.kop = 'Het is pakjesavond!'; zin.push('Wacht eens… er ligt nog één groot, glimmend pakje voor je!'); }
      else {
        t.kop = 'Dag Sinterklaasje!';
        zin.push(p.open ? 'Alles is uitgepakt. De Sint en zijn Pieten varen weer naar huis met de Stoomboot. Tot volgend jaar!' : 'Je zette dit jaar je schoen niet, maar zwaai de Sint en zijn Pieten gerust mee uit. Tot volgend jaar!');
        t.nog = 'Zwaai de Sint nog eens uit'; t.nogActie = 'afscheid';
      }
      if (nog) { if (!s.zeker) zin.push(navigator.onLine === false ? 'Zonder internet kun je nog niet uitpakken. Dat kan straks weer.' : 'Even kijken hoe laat het echt is…'); else t.knoppen.push(['uitpakken', 'Pak uit!']); }
      t.stapel = p.dicht ? meer(p.dicht, 'cadeautje', 'cadeautjes') + ' om uit te pakken' : p.open ? meer(p.open, 'cadeautje', 'cadeautjes') + ' uitgepakt' : '';
    }
    t.zin = zin.join(' ');
    t.knoppen.forEach(function (k, i) { k[2] = i === 0 ? 1 : 0; });
    t.knoppen.push(['spullen', 'Mijn feestspullen', 0]);
    if (modus === 'intocht' || modus === 'schoen') t.nog = modus === 'intocht' ? 'Bekijk de intocht nog een keer' : 'Bekijk de intocht';
    return t;
  }
  function knopHtml(k) { return '<button type="button" class="fb-knop' + (k[2] ? ' fb-hoofd' : '') + '" data-actie="' + k[0] + '">' + esc(k[1]) + '</button>'; }

  // het bord tekenen (alleen wat veranderde, zodat de knop zijn focus houdt)
  function teken() {
    var s = F.nu(); spul();
    var p = F.kern.pakjes(), rest = p.dicht + (p.mijter === 'dicht' ? 1 : 0);
    var sint = s.feest === 'sint' && (s.fase === 'intocht' || s.fase === 'schoen' || s.fase === 'pakjesavond-straks' || s.fase === 'pakjesavond');
    var modus = sint ? s.fase : s.uitpakken && rest ? 'nog' : '';
    if (!modus) { if (bord) { bord.remove(); bord = null; } sec.hidden = true; pepernoten(false); laatsteSig = ''; laatsteFase = ''; return; }
    s.uitpakTot = F.kern.nu().J.uitpakkenTot;
    var sch = F.kern.schoen(), t = teksten(s, sch, p, modus), afscheid = modus === 'pakjesavond' && !rest, sig = JSON.stringify([t, sch.dagen, sch.stapel, s.versiering, p.dicht, p.mijter]);
    sec.hidden = false; stijl();
    if (!bord || laatsteFase !== modus) {
      if (bord) bord.remove();
      bord = document.createElement('div'); bord.className = 'tg-feest-bord fb-sint'; bord.setAttribute('role', 'region'); bord.setAttribute('aria-labelledby', 'fb-kop');
      bord.innerHTML = '<div class="fb-scene ' + (modus === 'nog' ? 'fb-leeg' : 'fb-aangemeerd') + '">' + scene(modus) + '<div class="fb-regen" aria-hidden="true"></div></div>' +
        '<div class="fb-tekst"><span class="fb-label"></span><h2 class="fb-kop" id="fb-kop"></h2><p class="fb-zin" aria-live="polite"></p><div class="fb-knoppen"></div><div class="fb-kleintjes"><button type="button" class="fb-klein fb-nogknop" data-actie="nog" hidden></button><button type="button" class="fb-klein fb-uitknop" aria-pressed="false"></button></div></div>' +
        '<div class="fb-schoen"><div class="fb-schoen-plek"></div><p class="fb-stapel"></p></div>';
      sec.appendChild(bord); laatsteFase = modus; laatsteSig = '';
      bord.addEventListener('click', klik);
      kijkhoek();
      if (modus === 'intocht') intocht(false);
    }
    bord.classList.toggle('fb-stil', !s.versiering);
    bord.classList.toggle('fb-avond', modus === 'pakjesavond');
    var sc = bord.querySelector('.fb-scene');
    sc.classList.toggle('fb-afscheid', afscheid);
    if (!afscheid) sc.classList.remove('fb-weg', 'fb-afvaart');
    else if (!UP && !sc.classList.contains('fb-afvaart')) afscheidVaart(false);
    if (sig !== laatsteSig) {
      var focus = document.activeElement && bord.contains(document.activeElement) ? document.activeElement.getAttribute('data-actie') : null;
      bord.querySelector('.fb-label').textContent = t.label;
      bord.querySelector('.fb-kop').textContent = t.kop;
      bord.querySelector('.fb-zin').textContent = t.zin;
      bord.querySelector('.fb-knoppen').innerHTML = t.knoppen.map(knopHtml).join('');
      var nog = bord.querySelector('.fb-nogknop'); nog.hidden = !t.nog; nog.textContent = t.nog || ''; nog.setAttribute('data-actie', t.nogActie || 'nog');
      var u = bord.querySelector('.fb-uitknop'); u.textContent = s.versiering ? 'Versiering uit' : 'Versiering aan'; u.setAttribute('aria-pressed', String(!s.versiering));
      bord.querySelector('.fb-schoen-plek').innerHTML = schoenPaneel(sch);
      bord.querySelector('.fb-stapel').textContent = t.stapel || (sch.gezet || p.open ? '' : 'Nog geen cadeautjes op je stapel');
      if (focus) { var k = bord.querySelector('[data-actie="' + focus + '"]') || bord.querySelector('.fb-knop'); if (k) k.focus(); }
      laatsteSig = sig;
      herbouw();
    }
    pepernoten(s.versiering && s.feest === 'sint');
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

  // ================= het afscheid: de Stoomboot vaart weer weg (op pakjesavond, als alles is uitgepakt; per apparaat één keer vanzelf)
  function afscheidVaart(opnieuw) {
    if (!bord) return;
    var sc = bord.querySelector('.fb-scene'), dag = F.nu().dag, eerste = F.app().weg !== dag;
    if (!opnieuw && !eerste) { sc.classList.add('fb-weg'); return; }
    if (eerste) F.zetApp('weg', dag);
    clearTimeout(vaartKlok);
    if (minder || bord.classList.contains('fb-stil')) { sc.classList.add('fb-weg'); return; }
    sc.classList.remove('fb-weg', 'fb-afvaart'); void sc.offsetWidth; sc.classList.add('fb-afvaart'); toeter();
    vaartKlok = setTimeout(function () { sc.classList.remove('fb-afvaart'); sc.classList.add('fb-weg'); }, 7000);
  }

  // ================= de feestrommeltjes op de homepage (voor altijd, als je ze uitpakte): in de rommelkast
  var RSPUL = { 'hp-chocoletter': 'chocoletter', 'hp-worteltje': 'worteltje', mijter26: 'goudmijter' }, spulKlok = 0, spulVorig = '';
  function spul() {
    var l = []; for (var id in RSPUL) if (F.kern.heb(id)) l.push(RSPUL[id]);
    var sig = l.join(); if (sig === spulVorig) return;
    var R = window.__rommeltjes;
    if (!R || !R.feestRommels) { clearTimeout(spulKlok); spulKlok = setTimeout(spul, 400); return; }
    spulVorig = sig;
    try { R.feestRommels(l); } catch (e) { if (window.reportError) reportError(e); }
  }

  // ================= pakjesavond: de cadeautjes een voor een uitpakken
  // UP: het venster dat openstaat { d, staat: 'dicht' | 'open' | 'klaar', i, id, goud }
  var UP = null;
  var ONBEKEND = { naam: 'Een handje pepernoten', wat: 'Om lekker op te knabbelen', teken: function () { return plaat(icPepernotenregen()); } };
  var ONBEKEND_GEDICHT = ['Een handje pepernoten, rond en bruin en zoet,', 'omdat je je schoen zette, en dat deed je goed!'];
  function grootPakje(i, goud, inhoud) {
    var p = goud ? ['#E9B949', ROOD, 'glans'] : PAPIER[i % PAPIER.length];
    var s = '<svg viewBox="0 0 200 180" aria-hidden="true" focusable="false"><g class="fb-inhoud"><ellipse cx="100" cy="166" rx="54" ry="7" fill="#231A26" opacity=".14"/>' + inhoud + '</g><g class="fb-pak">';
    var helft = function (x0, klas) {
      var g = '<g class="' + klas + '"><rect x="' + x0 + '" y="64" width="60" height="98" fill="' + p[0] + '" stroke="' + I + '" stroke-width="3"/>';
      if (p[2] === 'streep') for (var k = 6; k < 60; k += 10) g += '<path d="M' + (x0 + k) + ' 66v94" stroke="' + p[1] + '" stroke-width="3" opacity=".5"/>';
      if (p[2] === 'stip') for (var a = 8; a < 58; a += 11) for (var c = 74; c < 158; c += 11) g += '<circle cx="' + (x0 + a) + '" cy="' + c + '" r="2.2" fill="' + p[1] + '" opacity=".7"/>';
      if (p[2] === 'glans') g += '<path d="M' + (x0 + 8) + ' 150L' + (x0 + 40) + ' 72M' + (x0 + 22) + ' 156L' + (x0 + 54) + ' 80" stroke="#FFF3C4" stroke-width="5" stroke-linecap="round" opacity=".75"/>';
      g += '<rect x="' + x0 + '" y="104" width="60" height="13" fill="' + p[1] + '" stroke="' + I + '" stroke-width="2.4"/>';
      g += '<rect x="' + (klas === 'fb-hl' ? 93 : 100) + '" y="64" width="7" height="98" fill="' + p[1] + '" stroke="' + I + '" stroke-width="2.4"/>';
      return g + '</g>';
    };
    s += helft(40, 'fb-hl') + helft(100, 'fb-hr');
    s += '<g class="fb-strik">' + pd('M100 64Q72 30 64 48Q62 64 100 64Z', p[1], 'stroke="' + I + '" stroke-width="2.6" stroke-linejoin="round"') + pd('M100 64Q128 30 136 48Q138 64 100 64Z', p[1], 'stroke="' + I + '" stroke-width="2.6" stroke-linejoin="round"') +
      pd('M96 66L84 92L92 90L97 98ZM104 66L116 92L108 90L103 98Z', p[1], 'stroke="' + I + '" stroke-width="2.2" stroke-linejoin="round"') + '<circle cx="100" cy="64" r="7" fill="' + p[1] + '" stroke="' + I + '" stroke-width="2.4"/></g>';
    return s + '</g></svg>';
  }
  function uitpakVenster() {
    if (UP) return;
    var d = venster('<div class="fb-up" aria-live="polite"></div>', 'fb-uitpak');
    UP = { d: d, staat: 'dicht' };
    d.addEventListener('close', function () {
      UP = null; F.melden(); teken();
      var s = F.nu(), p = F.kern.pakjes();
      if (s.fase === 'pakjesavond' && !p.dicht && p.mijter !== 'dicht') afscheidVaart(false);
    });
    d.addEventListener('click', function (e) {
      var k = e.target.closest && e.target.closest('[data-pak], [data-verder], [data-spullen]'); if (!k) return;
      if (k.hasAttribute('data-pak')) upOpen();
      else if (k.hasAttribute('data-verder')) upVolgende();
      else { d.close(); spullenVenster(); }
    });
    // trekken aan het lint: indrukken op het pakje en een stukje slepen
    var van = null;
    d.addEventListener('pointerdown', function (e) { if (e.target.closest && e.target.closest('.fb-groot')) van = [e.clientX, e.clientY]; });
    d.addEventListener('pointermove', function (e) { if (van && Math.hypot(e.clientX - van[0], e.clientY - van[1]) > 28) { van = null; upOpen(); } });
    d.addEventListener('pointerup', function () { van = null; });
    upVolgende();
  }
  function upVolgende() {
    var p = F.kern.pakjes();
    if (p.dicht) { UP.staat = 'dicht'; UP.i = p.lijst[0].i; UP.id = p.lijst[0].id; UP.goud = false; }
    else if (p.mijter === 'dicht') { UP.staat = 'dicht'; UP.i = null; UP.id = F.KERN.MIJTER[F.nu().jaar]; UP.goud = true; }
    else UP.staat = 'klaar';
    var box = UP.d.querySelector('.fb-up'), totaal = p.dicht + p.open;
    if (UP.staat === 'klaar') {
      var mijter = p.mijter === 'open', avond = F.nu().fase === 'pakjesavond';
      box.innerHTML = '<span class="fb-label">Pakjesavond</span><span class="fb-plaat">' + (mijter ? SPUL.mijter26.teken() : plaat(icPepernotenregen())) + '</span><h2 tabindex="-1">Alles uitgepakt!</h2>' +
        '<p>Je kreeg dit jaar ' + meer(p.open, 'cadeautje', 'cadeautjes') + ' van de Sint' + (mijter ? ', en de Gouden Mijter' : '') + '. Alles staat in Mijn feestspullen, en in de spellen.</p>' +
        (avond ? '<p>Nu gaat de Sint weer naar huis. Zwaai je hem uit?</p>' : '') +
        '<div class="fb-knoppen"><button type="button" class="fb-knop fb-hoofd" data-dicht>' + (avond ? 'Zwaai de Sint uit' : 'Sluiten') + '</button><button type="button" class="fb-knop" data-spullen>Mijn feestspullen</button></div>';
      box.querySelector('[data-dicht]').focus(); return;
    }
    var x = SPUL[UP.id] || ONBEKEND;
    box.innerHTML = '<span class="fb-label">Pakjesavond</span><p class="fb-teller">' + (UP.goud ? 'Nog één pakje…' : 'Cadeautje ' + (p.open + 1) + ' van ' + totaal) + '</p>' +
      '<div class="fb-podium"><button type="button" class="fb-groot fb-wacht" data-pak aria-label="Pak het cadeautje uit">' + grootPakje(UP.i == null ? 3 : UP.i, UP.goud, x.teken().replace('<svg ', '<svg x="40" y="34" width="120" height="120" ')) + '</button><div class="fb-snippers" aria-hidden="true"></div></div>' +
      '<div class="fb-onder"><h2>' + (UP.goud ? 'Wacht eens, er ligt nog een groot, glimmend pakje!' : 'Wat zou erin zitten?') + '</h2><p class="fb-hint">Tik op het pakje, of trek aan het lint.</p>' +
      '<div class="fb-knoppen"><button type="button" class="fb-knop fb-hoofd" data-pak>Pak uit!</button><button type="button" class="fb-knop" data-dicht>Later verder</button></div></div>';
    box.querySelector('.fb-knop[data-pak]').focus();
  }
  function upOpen() {
    if (!UP || UP.staat !== 'dicht') return;
    var r = UP.goud ? F.kern.pakMijter() : F.kern.pakUit(UP.i), box = UP.d.querySelector('.fb-up');
    if (!r) { var h = box.querySelector('.fb-hint'); if (h) h.textContent = navigator.onLine === false ? 'Zonder internet kun je nog niet uitpakken. Probeer het straks nog eens.' : 'Dat lukte even niet. Probeer het zo nog eens.'; return; }
    UP.staat = 'open';
    var pod = box.querySelector('.fb-podium'), knop = pod.querySelector('.fb-groot'), p = F.kern.pakjes(), x = SPUL[UP.id] || ONBEKEND, meerNog = p.dicht || p.mijter === 'dicht';
    knop.classList.remove('fb-wacht'); knop.setAttribute('tabindex', '-1'); knop.removeAttribute('data-pak'); knop.setAttribute('aria-label', x.naam);
    pod.classList.add('fb-open'); snippers(pod); scheur(); setTimeout(tring, 380);
    var g = GEDICHT[UP.id] ? gedichtHtml(UP.id) : '<p class="fb-gedicht">' + ONBEKEND_GEDICHT.map(function (r) { return '<span>' + esc(r) + '</span>'; }).join('') + '<span class="fb-ondert">Sint en Piet</span></p>';
    box.querySelector('.fb-onder').innerHTML = '<h2 tabindex="-1">' + esc(x.naam) + '</h2><p class="fb-voor">' + esc(x.wat + (x.spel ? (/^je homepage/.test(x.spel) ? ', op ' : ', in ') + x.spel : '')) + '</p>' + g +
      '<div class="fb-knoppen"><button type="button" class="fb-knop fb-hoofd" data-verder>' + (meerNog ? 'Volgende cadeautje' : 'Klaar') + '</button>' + (x.pagina ? '<a class="fb-knop" href="' + esc(x.pagina) + '">Naar ' + esc(x.knop || x.spel) + '</a>' : '') + '</div>';
    box.querySelector('.fb-onder h2').focus();
    F.melden();
  }
  function snippers(pod) {
    if (minder) return;
    var box = pod.querySelector('.fb-snippers'), kl = [ROOD, GOUD, '#2F4C8F', '#2E8B62', '#6A4C9C', WIT, '#E07A2E'];
    for (var k = 0; k < 22; k++) {
      var e = document.createElement('i'), a = Math.random() * Math.PI * 2, r = 70 + Math.random() * 90;
      e.style.setProperty('--x', Math.round(Math.cos(a) * r) + 'px'); e.style.setProperty('--y', Math.round(Math.sin(a) * r * 0.8 - 40) + 'px'); e.style.setProperty('--r', Math.round(Math.random() * 720 - 360) + 'deg');
      e.style.background = kl[k % kl.length]; e.style.animationDelay = (Math.random() * 0.12).toFixed(2) + 's'; box.appendChild(e);
    }
    setTimeout(function () { box.innerHTML = ''; }, 1500);
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
    var schoen = sch.gezet ? '<p>Je schoen stond ' + meer(sch.gezet, 'keer', 'keer') + ' klaar. ' + (sch.stapel ? meer(sch.stapel, 'cadeautje ligt', 'cadeautjes liggen') + ' op je stapel' : '') + (sch.inSchoen ? (sch.stapel ? ', en ' : '') + meer(sch.inSchoen, 'cadeautje zit', 'cadeautjes zitten') + ' nog in je schoen' : '') + '. ' + (F.nu().uitpakken ? 'Je pakt ze uit op het feestbord.' : 'Op pakjesavond pak je ze uit.') + '</p>' : '';
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
    else if (a === 'uitpakken') uitpakVenster();
    else if (a === 'afscheid') afscheidVaart(true);
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
