# Plan: Rommelwoord wordt een bundel woordspellen

Voorstel van Claude Code, 6 november 2026. Nog niets gebouwd: eerst jouw akkoord.
Onderaan staan de voorbeelden (20 cryptische omschrijvingen, 5 letterroosters en 3 klinkermijnenvelden), met de oplossingen helemaal achteraan, zodat je ze eerst zelf kunt proberen.

---

## 1. In het kort

`rommelwoord.html` wordt een bundel van vier woordspellen van de dag:

| Spel | Wat je doet | Nieuw? |
|---|---|---|
| **Woord** | Raad het woord van de dag. Nu ook met 4, 6, 7 en 8 letters, een moeilijke stand, oefenen, een archief en na afloop wat het woord betekent. | uitbreiding |
| **Cryptisch** | Eén cryptische omschrijving per dag, met hints die je iets leren, en een kleine school. | nieuw |
| **Letterval** | Een rooster vol letters en een thema. Veeg woorden; de letters erboven vallen naar beneden. | nieuw |
| **Klinkermijnen** | Een klein kruiswoordrooster waarin elke klinker een mijn is. | nieuw |

Eén beginscherm met de vier spellen van vandaag, één gezamenlijke **woordreeks**, en per spel een eigen reeks, cijfers, mijlpalen en een archief.

**Wat hetzelfde blijft**: het woord van vijf letters (vandaag en alle eerdere dagen precies hetzelfde woord), `rommelwoord-dag-v1` en `rommelwoord-stats-v1` (met alle reeksen), het bord `woord` op het scorebord, de gedeelde blokken, het veiligheidsbeleid (er komen geen scripts van buiten bij), en de stijl van 0.6 (papier, licht en donker).

---

## 2. De namen

| Voorstel van jou | Mijn advies | Waarom |
|---|---|---|
| Cryptisch | **Cryptisch** | Een gewoon Nederlands woord, van niemand. |
| Letterslaatje | **Letterval** | "Letterslaatje" is bijna een vertaling van Word Salad. "Letterval" zegt wat er gebeurt: de letters vallen. Andere mogelijkheden: Lettervloed, Valwoord. |
| Klinkermijnen | **Klinkermijnen** | Eigen woord, zegt precies wat het is. |

De bundel zelf blijft **Rommelwoord** (zelfde pagina, zelfde tegel op de homepage), het bekende spel heet daarin **Woord**.

---

## 3. Het scherm (schets, op een telefoon)

```
┌────────────────────────────────────────┐
│ ← Rommelhoekje          [ROMMELWOORD]  │  labeltape, zoals nu
│        vrijdag 6 november              │
│  🔥 Woordreeks: 12 dagen               │
│  ✓ ✓ ◐ ○   2 van 4 gedaan              │  vorm én kleur (ook voor kleurenblinden)
├────────────────────────────────────────┤
│ ▦  WOORD                    ✓ in 4     │  ✓ = gedaan
│    5 letters · ook 4 6 7 8             │
│    reeks 9                             │
├────────────────────────────────────────┤
│ ✎  CRYPTISCH               Speel nu ▸  │  ○ = nog niet
│    "Gaat elke ochtend af, …" (6)       │
│    par 2 · reeks 3                     │
├────────────────────────────────────────┤
│ ⇩  LETTERVAL              Ga verder ▸  │  ◐ = bezig
│    Op de boerderij · 2 van 5 woorden   │
├────────────────────────────────────────┤
│ ✱  KLINKERMIJNEN            ✓ ★★★      │
│    0 fouten · reeks 12                 │
├────────────────────────────────────────┤
│ [Deel vandaag] [Archief] [Cijfers]     │
│ [Mijlpalen]   [Cryptoschool]           │
│ Nieuwe puzzels over 07:12:44           │
└────────────────────────────────────────┘
```

- Een tik op een kaart opent het spel; bovenin een pijl terug naar de bundel. Elk spel heeft een eigen adres (`rommelwoord.html#woord`, `#cryptisch`, `#letterval`, `#klinkermijnen`), dus elk spel kan ook los.
- Op een computer staan de vier kaarten in een raster van twee bij twee.
- Na afloop van een spel: "Je was sneller dan 73% van de spelers" (zie §6), en een knop naar het volgende spel dat je nog niet deed.
- Overal: een vorm of teken naast elke kleur (✓ ◐ ○ ✗, en in Woord het stipje en de stippellijn zoals nu).

---

## 4. De vier spellen

### 4.1 Woord (de uitbreiding van Rommelwoord)

- **Lengtes**: 4, 5, 6, 7 en 8 letters, elk met een eigen woord van de dag. Zes pogingen, zoals nu. Bovenin vijf tabjes (`4 5 6 7 8`); 5 is het woord van de dag dat iedereen kent, en staat voorop.
- **Vijf letters blijft precies zo**: dezelfde lijst, dezelfde volgorde, dezelfde dag (de klok van je apparaat, zoals nu), dezelfde opslag. Dat test ik met code: voor elke dag van 8 oktober 2026 tot ver in 2030 geeft de nieuwe pagina hetzelfde woord als de oude.
- **De moeilijke stand** (per apparaat aan of uit, alleen te veranderen vóór je eerste poging van de dag): een groene letter moet op dezelfde plek blijven, een letter met de rode stippellijn moet er weer in. Anders schudt de rij met bijvoorbeeld "De 3e letter moet een A zijn".
- **Oefenen**: een willekeurig woord van de lengte die je kiest. Telt nergens mee, wordt niet bewaard.
- **Archief**: een kalender per maand. Een dag die je miste, speel je na (telt niet voor de reeks).
- **Na afloop**: wat het woord betekent, in één of twee zinnen die ik zelf schrijf. Bijvoorbeeld:
  - *anker*: Een zwaar stuk ijzer met haken aan een ketting. Een schip laat het zakken om op zijn plek te blijven liggen.
  - *bezem*: Een borstel aan een lange steel, om mee te vegen.
  - *zegel*: Een stempel in lak of was op een brief, waaraan je ziet dat hij nog niet open is geweest. Ook: een postzegel.
  - *barst*: Een scheur in iets hards, zoals glas, steen of een kopje.
- **De woorden van de dag**: gewone woorden die mensen kennen. Ik kies ze uit de OpenTaal-lijst met een lijst van hoe vaak woorden voorkomen (wordfreq), en kijk ze daarna allemaal zelf na: geen vervoegingen die raar staan, geen meervouden als het enkelvoud er ook is, geen merknamen, geen kwetsende woorden. Per lengte minstens 365 (na een jaar begint de lijst opnieuw, net als nu).
- **Geldige gokken**: alle woorden van die lengte uit OpenTaal (net als nu). Vier letters: 2.789 woorden, zes: 11.368, zeven: 18.602, acht: 26.629. Die lijsten zijn samen 480 kB, dus ze komen in een apart bestand (`rommelwoord-woorden.txt`) dat pas wordt opgehaald als je een andere lengte dan vijf speelt. Vijf letters blijft in de pagina staan, dus het bekende spel werkt altijd.
- **IJ** telt in Woord als twee letters (i en j), zoals nu.

### 4.2 Cryptisch

- **Elke dag één omschrijving** met tussen haakjes het aantal letters. Twee soorten door elkaar:
  - **De Nederlandse traditie**: een omschrijving die je op het verkeerde been zet, met een dubbele betekenis of een uitdrukking die je letterlijk moet lezen, zoals in het cryptogram uit de krant.
  - **Met een recept**: een omschrijving plus een aanwijzing hoe je het woord maakt. Acht recepten: anagram (husselen), verstopt woord, klinkt als, stukjes, eromheen, achterstevoren, eraf (een letter weghalen) en beginletters.
- **Invullen**: vakjes onder de omschrijving, typen met het toetsenbord van Woord. Fout raden mag zo vaak als je wilt (de vakjes schudden). IJ telt hier als **één** letter, zoals in de krant (je typt i en j, en het vakje toont IJ).
- **Hints die je iets leren**, stap voor stap (elk een tik):
  1. Welke soort omschrijving is dit?
  2. Waar zit de betekenis? (dat stuk wordt onderstreept)
  3. Het woordspel uitgelegd, zonder het antwoord.
  4. De eerste letter.
  5. Laat het woord zien (dan telt hij als niet gelukt).
- **Par**: het aantal hints dat je mag gebruiken voor een goede score (1 of 2, per omschrijving). Score: ★★★ zonder hint, ★★ binnen par, ★ meer hints dan par.
- **Na afloop** een duidelijke uitleg van hoe de omschrijving werkt (zie de voorbeelden).
- **De Cryptoschool**: negen lesjes (de traditie en de acht recepten), elk met een korte uitleg, een voorbeeld dat stap voor stap opengaat, en drie oefeningen. Zo kan iemand die nog nooit een cryptogram deed, binnen tien minuten de eerste zelf oplossen. De hint "Welke soort?" heeft een knop naar het lesje van die soort.

### 4.3 Letterval

- **Elke dag een rooster** van 4 bij 4 of 5 bij 5 met door elkaar gehusselde letters en een thema, bijvoorbeeld "In de keuken". Je ziet hoeveel woorden er zijn en hoe lang ze zijn (zoals `▢▢▢▢▢ ▢▢▢▢ ▢▢▢▢ ▢▢▢`).
- **Zoeken**: veeg over letters die aan elkaar grenzen (ook schuin). Op een computer kan het ook met de muis, of door het woord te typen (het spel licht de letters op; Enter pakt het woord, Tab kiest een andere route als die er is).
- **Vallen**: een gevonden woord verdwijnt, en de letters erboven vallen naar beneden. De volgorde doet er dus toe: pak je eerst het verkeerde woord, dan kan een ander woord uit elkaar vallen.
- **Ongedaan maken** van de laatste stap, zo vaak je wilt, gratis.
- **Vastgelopen?** Het spel rekent na elke stap uit of het nog af te maken is. Is dat niet zo, dan zegt het dat (eerlijk, zodat je niet eindeloos zoekt), met een knop Ongedaan maken.
- **Hints** (een duwtje, niet alles):
  1. "Dit woord kun je nu beter nog niet pakken" of "Begin bij deze letter" (één letter licht op).
  2. Eén woord uit het lijstje wordt zichtbaar.
  3. De route van dat woord licht op.
- Score: ★★★ zonder hint, ★★ met één hint, ★ meer.
- **Elk rooster heeft minstens één volgorde waarin alle woorden lukken.** De maker bouwt het rooster achterstevoren (hij schuift de woorden er een voor een in), en een oplosser probeert daarna alle volgordes en alle routes. Ik kies roosters waarin de volgorde er echt toe doet: niet elke volgorde lukt (bij alle vijf voorbeelden lukt ongeveer 1 op de 8 volgordes, zie §13.2).
- IJ is hier één tegel (zoals in de krant), maar ik kies vooral woorden zonder IJ.

### 4.4 Klinkermijnen

- **Elke dag een klein kruiswoordrooster** (4 bij 4 of 5 bij 5, met zwarte vakjes) waarin elke klinker een mijn is: A, E, I, O, U en de IJ als één letter.
- Bij het begin staan er een paar medeklinkers open, met hun getal.
- **Open je een vakje** met een medeklinker, dan zie je de letter en een getal: hoeveel klinkers er in de vakjes eromheen liggen (de acht vakjes eromheen, ook schuin; zwarte vakjes tellen niet).
- **Een vlaggetje** zet je op een vakje waar volgens jou een klinker staat. Weet je welke klinker het is, dan kies je die (een rijtje A E I O U IJ onder het rooster, of typ hem). Een woord dat helemaal klopt, licht op.
- **Open je een klinker, dan is het mis**: de mijn ontploft (een plof en een vlekje, niets engs), en het vakje gaat dicht met de klinker erin. Mijn voorstel: je hebt **drie levens** (♥♥♥). Bij drie keer mis is het spel voorbij en zie je de oplossing. (Of wil je dat het meteen voorbij is bij één keer mis? Zie de vragen.)
- **Het rooster is af** als alle medeklinkers open zijn en alle klinkers goed staan.
- **Altijd met logica op te lossen, zonder gokken.** Een oplosser in code doet precies wat een speler kan doen:
  - de getallen: alle mogelijkheden rond de open getallen nagaan (zoals bij mijnenvegen);
  - de woorden: elk rijtje moet een Nederlands woord zijn dat mensen kennen (OpenTaal, en niet zeldzamer dan "een beetje bekend" in wordfreq), ook waar woorden elkaar kruisen. Bijvoorbeeld: na GR aan het begin van een woord komt altijd een klinker.
  
  De maker zet zo weinig mogelijk medeklinkers open bij het begin, maar genoeg dat de oplosser het helemaal oplost; met één startvakje minder lukt het niet meer (dat kijkt de code ook na).
- **Bediening**:
  - Telefoon: tik = openen, vasthouden = vlaggetje, tik op een vlaggetje = klinker kiezen, dubbel tikken op een getal = alle vakjes eromheen openen als je daar al alle vlaggetjes hebt gezet. Ook een knop om te wisselen tussen "openen" en "vlaggen" voor wie niet wil vasthouden.
  - Computer: klik = openen, rechtsklik = vlaggetje, toetsenbord: pijltjes, spatie = openen, F = vlaggetje, A E I O U en Y (of I dan J) = de klinker.
  - Vooraf een korte uitleg in drie plaatjes, met een oefenrooster.
- **Hints**: de omschrijving van een woord (kort en gewoon, geen cryptische), of "Laat een veilig vakje zien". Score: ★★★ zonder fout en zonder hint, ★★ met één, ★ meer.

---

## 5. Samen één bundel

- **Eén gezamenlijke reeks** (🔥 woordreeks): elke dag minstens één woordspel van die dag gespeeld (gelukt of niet). Daarnaast heeft elk spel een eigen reeks: op de dag zelf gelukt. De reeks van Woord (vijf letters) blijft de bekende reeks uit `rommelwoord-stats-v1`. Wie nu een reeks heeft, houdt die ook in de woordreeks: de eerste keer zet de pagina de dagen van je lopende reeks erin.
- **Cijfers per spel**: gespeeld, gelukt (%), reeks, beste reeks, en een verdeling (pogingen bij Woord, hints bij Cryptisch en Letterval, fouten bij Klinkermijnen).
- **Mijlpalen** (stempels, uitgerekend uit je opslag, niets apart bewaard), bijvoorbeeld: alle vier op één dag; een woordreeks van 7, 30, 100 en 365 dagen; Woord in twee pogingen; alle vijf lengtes op één dag; tien keer de moeilijke stand; Cryptisch zonder hint; de hele Cryptoschool; Letterval zonder hint; Klinkermijnen zonder fout.
- **Archief**: één kalender voor de bundel; per dag zie je met tekentjes wat je deed, en elk spel van die dag is na te spelen.
- **Delen** als rijtje tekens, zonder de oplossing te verraden:

  ```
  Rommelwoord · vrijdag 6 november · 🔥 12
  ▦ Woord 4/6  🟩🟩⬜🟥⬜ …
  ✎ Cryptisch ★★ (1 hint, par 2)
  ⇩ Letterval ★★★
  ✱ Klinkermijnen ★★★ (0 fouten)
  ```
  Woord deelt ook los zijn rijtjes, zoals nu.
- **"Je was sneller dan x% van de spelers"**: met hetzelfde systeem als de dagtijden van Rommelkroon (anoniem: alleen de dag, het spel en je tijd of aantal; geen naam, geen apparaatnummer; 28 dagen bewaard). Bij Woord: "minder pogingen dan x%", bij Cryptisch: minder hints (en bij gelijk: sneller), bij Letterval en Klinkermijnen: sneller. Daar is een nieuwe route in de scoreserver voor nodig (zie §8).

---

## 6. Geen spieken

- Alle puzzels van de dag (de woorden van 4, 6, 7 en 8 letters, Cryptisch, Letterval en Klinkermijnen) zitten per dag in een **kistje**, net als bij Rommelgroepjes: versleuteld (AES-GCM, de sleutel komt met PBKDF2 uit het dagnummer en de datum). Eén kistje per dag, met alles van die dag, ingepakt. Je kunt de puzzels van komende dagen dus niet in de broncode lezen of doorzoeken. (Wie de code naspeelt of zijn klok verzet, kan wel spieken; dat kan bij een pagina zonder server nooit helemaal anders.)
- De kistjes staan in een apart bestand (`rommelwoord-puzzels.json`, ongeveer 330 kB per jaar), zodat de pagina zelf niet te groot wordt. De service worker van de site haalt `.json` altijd eerst van internet, dus nieuwe puzzels komen meteen.
- **Het woord van vijf letters**: nu kan wie de code naspeelt, al vooruitkijken (de lijst en de formule staan in de pagina). Twee mogelijkheden, zie de vragen:
  - **A (mijn advies)**: ook vijf letters in de kistjes, uitgerekend met precies dezelfde formule (dus precies dezelfde woorden), voor twee jaar vooruit, en de formule uit de pagina. Elk jaar zet ik er een jaar bij.
  - **B**: alles laten zoals het is.

---

## 7. De opslag

**Blijven precies zoals ze zijn**: `rommelwoord-dag-v1` (het lopende spel van vijf letters) en `rommelwoord-stats-v1` (je cijfers en reeks). De pagina blijft ze op dezelfde manier lezen en schrijven.

**Eén nieuwe sleutel**: `rommelwoord-bundel-v1` (in `SLEUTELS`, gaat mee met koppelen):

```js
{
  v: 1,
  d: {                       // per spel één teken per dag (dag 0 = 8 oktober 2026, de eerste dag van Rommelwoord)
    w4: '…', w5: '…', w6: '…', w7: '…', w8: '…',   // Woord, per lengte
    c: '…',                  // Cryptisch
    l: '…',                  // Letterval
    k: '…'                   // Klinkermijnen
  },
  bezig: { c: {…}, l: {…}, k: {…}, w4: {…}, … },  // alleen een spel van vandaag dat nog loopt (vijf letters: zoals nu in rommelwoord-dag-v1)
  inst: { moeilijk: 0, lengte: 5, uitleg: 1 },     // instellingen
  school: { anagram: ['1', '2'], … },               // opgeloste oefeningen in de Cryptoschool
  voortgangTotaal: …                                // voor 'Verder spelen' op de homepage
}
```

De tekens per dag:

| teken | betekenis |
|---|---|
| `.` | niet gespeeld |
| `1` t/m `9` | op de dag zelf gelukt, met 1 t/m 9 (Woord: pogingen; Cryptisch en Letterval: 1 + hints; Klinkermijnen: 1 + fouten en hints) |
| `A` t/m `I` | hetzelfde, in de moeilijke stand (alleen Woord) |
| `0` | op de dag zelf gelukt, van vóór de bundel (alleen vijf letters: uit je lopende reeks; aantal onbekend) |
| `x`, `X` | op de dag zelf niet gelukt (`X`: moeilijke stand) |
| `a` t/m `i` | later gespeeld (archief) en gelukt |
| `z` | later gespeeld en niet gelukt |

Na een jaar is dat ongeveer 3 kB. Reeksen, cijfers en mijlpalen rekent de pagina uit deze tekens uit; er wordt niets dubbel bewaard. Tijden (voor "sneller dan x%") bewaart de pagina alleen voor vandaag.

---

## 8. De REGELS voor het koppelen

Een nieuwe regel en een nieuw spel in `SPEL` en `MAAT`, letterlijk hetzelfde in het gedeelde scorebord-blok en in de scoreserver:

```js
// Rommelwoord, de bundel: per spel één teken per dag. Een uitslag op de dag zelf gaat voor een uitslag uit het archief;
// verder telt de eerste uitslag (een 0 van vóór de bundel maakt plaats voor een echte uitslag van die dag)
const woordDagen = (b, s, i, c) => {
  if (typeof s !== 'string' || typeof i !== 'string' || /[^.0-9A-IXa-ixz]/.test(s + i)) return keuze(b, s, i, c);
  const zelf = x => /[0-9A-IxX]/.test(x); let r = '';
  for (let k = 0; k < Math.max(s.length, i.length); k++) {
    const x = s[k] || '.', y = i[k] || '.';
    r += x === '.' ? y : y === '.' ? x : zelf(x) !== zelf(y) ? (zelf(x) ? x : y) : x === '0' && y !== '0' ? y : x;
  }
  return r.replace(/\.+$/, '');
};
// in SPEL:
'rommelwoord-bundel-v1': { velden: { v: max, d: elk(woordDagen), bezig: elk(lopend), inst: keuze, school: elk(samenLijst), voortgangTotaal: max } },
// in MAAT: hoeveel dagen gelukt, en hoeveel gespeeld (alle spellen samen)
'rommelwoord-bundel-v1': s => { let g = 0, n = 0; for (const t of Object.values(isObj(s.d) ? s.d : {})) for (const x of String(t)) { if (x !== '.') n++; if (/[0-9A-Ia-i]/.test(x)) g++; } return [g, n]; },
```

Dus: wat je op het ene apparaat speelde, komt bij wat je op het andere speelde; speel je dezelfde dag op twee apparaten, dan telt de eerste uitslag (net als bij Rommelgroepjes en Rommelwoord nu); de schoolvoortgang telt samen op; instellingen: de laatste keuze wint. Geen geld, munten of spullen, dus samenvoegen is veilig. De regels voor `rommelwoord-dag-v1` en `rommelwoord-stats-v1` veranderen niet.

Ik test de REGELS met twee en drie apparaten in elke volgorde, met en zonder basis, en met een oud apparaat dat de bundel nog niet kent.

---

## 9. Het scorebord en de scoreserver

**Borden** (`woord` blijft precies zoals het is):

| Bord | Score | Extra | Hoogst haalbaar | Grens (voorstel) |
|---|---|---|---|---|
| `woord` (bestaat) | beste reeks, vijf letters | gewonnen | — | blijft |
| `cryptisch` | beste reeks (op de dag zelf gelukt) | aantal keer binnen par | 1 per dag: na 10 jaar 3.653 | 5.000 |
| `letterval` | beste reeks | aantal keer zonder hint | idem | 5.000 |
| `klinker` | beste reeks | aantal keer zonder fout | idem | 5.000 |

Een vierde bord voor de woordreeks kan ook; mijn advies: niet doen, het scorebord heeft al veel borden.

**De scoreserver** (versie 2026-11-06, gebouwd op 2026-11-05b, die nu in Cloudflare draait):
- de drie borden in `SPELLEN`;
- de nieuwe REGELS (`woordDagen`, `SPEL` en `MAAT`), `TIJD_SPEL` voor de tijdmachine (zodat je de bundel ook kunt terugzetten), `BLOK_NU` omhoog;
- een route voor "sneller dan x%": `POST /woord/tijd` met `{ spel, dag, waarde, apparaat }` en `GET /woord/dag?spel=&dag=&waarde=`, net zo gebouwd als `/kroon/tijd` (anoniem, elk apparaat telt één keer per dag per spel, hooguit 6 per adres per dag, alleen vandaag en een dag ervoor of erna, 28 dagen bewaard, de noodknop `scores` zet hem dicht), in een eigen tabel `woord_dagtijd`;
- `/status` zegt `woorden: 1`. De pagina stuurt de nieuwe borden en tijden pas als de server dat zegt.

Ik lever hem als volledig bestand. **Daarvoor heb ik de code nodig die nu echt in Cloudflare staat (2026-11-05b): wil je die plakken?** De pagina gaat pas online als de nieuwe scoreserver in Cloudflare staat.

**Verder op de site**:
- `SLEUTELS` en `BRONNEN` in het gedeelde blok (in alle pagina's tegelijk, met het script uit CLAUDE.md, ook in `homepage-onderdelen.js` en de kopie in de werkplaats);
- de homepage: bij Puzzels van vandaag blijft het één kaart "Rommelwoord", met vier tekentjes (✓ ◐ ○) voor de vier spellen; bij Verder spelen "x van 4 vandaag · woordreeks n";
- `scorebord.html`: de drie nieuwe borden;
- de werkplaats: `SPELINFO` voor de nieuwe sleutel en `KAN` voor de borden;
- `privacy.html`: de nieuwe sleutel en de anonieme dagtijden.

---

## 10. De voorraad en hoe ik hem controleer

| Spel | Voorraad | Hoe gemaakt | Hoe gecontroleerd |
|---|---|---|---|
| Woord 4, 6, 7, 8 | per lengte 365+ woorden, met uitleg | gekozen uit OpenTaal en wordfreq, daarna door mij nagelopen | alle woorden in OpenTaal; geen kwetsende woorden (ook niet achterstevoren); elke uitleg door een tweede nakijker |
| Uitleg bij vijf letters | 473 woorden | zelf geschreven | idem |
| Cryptisch | 365+ | zelf geschreven, in rondes van 30 | elk stukje woordspel met code (anagram: precies dezelfde letters; verstopt: staat er echt in, over de spatie heen; achterstevoren, eraf, stukjes, eromheen en beginletters: precies na te rekenen; klinkt als: een lijst bekende klankparen); het antwoord en de stukjes in OpenTaal; het antwoord staat niet als los woord in de omschrijving; daarna een blinde oplosser (een aparte Claude die het antwoord niet weet, met en zonder hints: vindt hij het, en vindt hij geen ander passend woord?) en een strenge nakijker per omschrijving; wat niet goed is, schrijf ik opnieuw of valt af |
| Letterval | 365+ roosters, rond 120 thema's | de maker (achterstevoren inschuiven) | een oplosser probeert alle volgordes en routes: minstens één lukt, niet allemaal; de woorden passen bij het thema en staan in OpenTaal |
| Klinkermijnen | 365+ | een vuller (gewone woorden) en de oplosser | de oplosser (getallen en woorden, zonder gokken) lost het op vanaf de startvakjes; met één startvakje minder niet; geen woord dubbel; geen kwetsende woorden |

**Verder test ik met code**: de puzzel van de dag is voor iedereen gelijk (twee keer uitpakken geeft hetzelfde); het woord van vijf letters is voor elke dag gelijk aan de oude pagina; oude opslag (met een lopende reeks) laadt goed; geen puzzel van morgen of later is leesbaar in de pagina of het bestand; de REGELS met twee en drie apparaten. **In een echte browser**: telefoon (360 en 390 breed, ook liggend) en computer (1280), licht en donker, met muis, vinger en toetsenbord, zonder fouten of overtredingen van het veiligheidsbeleid.

---

## 11. Bouwvolgorde

1. **De scoreserver** (als jij de huidige code plakt), met alles voor de vier spellen in één keer, zodat Cloudflare maar één keer bijgewerkt hoeft te worden.
2. **De bundel en Woord**: het beginscherm, de lengtes, de moeilijke stand, oefenen, het archief, de uitleg, de reeksen, de opslag en de REGELS, de homepage.
3. **Cryptisch** met de school (eerst met de 20 voorbeelden als school en proef).
4. **Letterval**.
5. **Klinkermijnen**.
6. **De hele voorraad** van alle spellen (een jaar), met alle controles.
7. Alles testen, en dan pas online (na de scoreserver in Cloudflare). Ik laat je vóór elke commit zien wat erin gaat.

---

## 12. Vragen aan jou

1. **Namen**: Cryptisch, **Letterval** (in plaats van Letterslaatje) en Klinkermijnen. Goed?
2. **Klinkermijnen**: drie levens (mijn advies), of meteen voorbij bij één keer mis?
3. **Vijf letters**: ook in de kistjes, zodat niemand vooruit kan kijken (A, mijn advies), of laten zoals het is (B)?
4. **Homepage**: één kaart Rommelwoord bij Puzzels van vandaag (mijn advies), of elk woordspel een eigen kaart?
5. **Scorebord**: drie nieuwe borden (cryptisch, letterval, klinker), zonder een apart bord voor de woordreeks?
6. **De voorbeelden hieronder**: wat vind je ervan? Welke omschrijvingen zijn niet goed, te makkelijk of te moeilijk? Ik gebruik ze niet als puzzels van de dag (ze staan nu in dit plan), maar als oefeningen in de Cryptoschool en de uitleg.
7. **De scoreserver**: wil je de code plakken die nu in Cloudflare staat (2026-11-05b)?

---

## 13. Voorbeelden

Alle voorbeelden staan ook in een **speelbare proefpagina** (`woordspellen-proef.html`, die ik je los stuur): drie tabjes, Cryptisch met de hints, Letterval met vegen, ongedaan maken en hints, en Klinkermijnen met openen, vlaggetjes, drie levens en de omschrijvingen. Die is alleen om te proberen of het leuk is: nog niet in de stijl van de site, en hij komt niet op de site. Getest in Chromium op computer- en telefoonformaat, licht en donker: elk voorbeeld is daarin echt uit te spelen, zonder fouten.

### 13.1 Cryptisch: twintig omschrijvingen

Probeer ze eerst zelf; de antwoorden, hints en uitleg staan in §14.

**De Nederlandse traditie** (een uitdrukking letterlijk lezen, of een woord met een andere betekenis):

1. Gaat elke ochtend af, maar schaamt zich nergens voor (6)
2. Laat zich elke ochtend om je nek strikken (8)
3. Ligt voor de deur en wordt altijd met voeten getreden (7)
4. Maakt er altijd een potje van (12)
5. Gaat altijd met zijn tijd mee (7)
6. Op deze bank liggen zeehonden graag te zonnen (8)
7. Staat altijd op het punt om uit te barsten (7)
8. Wordt elke ochtend opgemaakt, maar gaat nooit uit (3)
9. Zit vaak in de put, maar komt er altijd weer bovenop (5)
10. Maakt van elke mug een olifant (12)

**Met een recept**:

11. Man, sterk verbouwd, brengt cadeautjes (8) — *anagram*
12. Mannetjesrund reist alle kanten op (5) — *anagram*
13. In grote gele bloemen schuilt een stekelig beestje (4) — *verstopt woord*
14. Klinkt niet zacht, maar klopt altijd (4) — *klinkt als*
15. Het niveau van het water klinkt als iets uit een boog (4) — *klinkt als*
16. Toetje met een luiaard: Limburgse lekkernij (5) — *stukjes*
17. Touw om het begin van een relatie: dat beloof je elkaar (5) — *eromheen*
18. Soldaten zetten de regel op zijn kop (5) — *achterstevoren*
19. Vlaag zonder kop is allesbehalve hoog (4) — *eraf*
20. De koppen van 'eerst even niets doen' leveren een watervogel op (4) — *beginletters*

(In het spel staat de soort er niet bij: dat is de eerste hint. Hier zet ik hem erbij, zodat je ziet welke recepten er zijn.)

### 13.2 Letterval: vijf roosters

Veeg woorden die bij het thema horen; letters erboven vallen naar beneden. Alle vijf zijn met code nagekeken.

**1. In de keuken** (4 × 4, woorden van 5, 4, 4 en 3 letters)
```
O V P N
N E L E
E O L A
V R K P
```
Lukt in 3 van de 24 volgordes.

**2. Het weer** (4 × 4, woorden van 5, 4, 4 en 3 letters)
```
E N N R
T G N Z
S I O W
M D E I
```
Lukt in 3 van de 24 volgordes.

**3. Op de boerderij** (5 × 5, woorden van 7, 6, 5, 4 en 3 letters)
```
D P H A R
R K O P O
A A C E A
G T T S T
E I R A C
```
Lukt in 15 van de 120 volgordes.

**4. Op het strand** (5 × 5, woorden van 11, 6, 5 en 3 letters)
```
P L S W E
E A C E E
Z N D E M
L E K A U
E H T S Z
```
Lukt in 3 van de 24 volgordes.

**5. Muziekinstrumenten** (5 × 5, woorden van 7, 5, 5, 4 en 4 letters)
```
T R A P T
H O B A I
A E P U O
M R L I N
M L O O V
```
Lukt in 15 van de 120 volgordes.

### 13.3 Klinkermijnen: drie velden

`··` is een dicht vakje, `██` een zwart vakje. Een open medeklinker staat er met zijn getal: `G2` is een G met twee klinkers eromheen. Alle drie zijn met de oplosser nagekeken: zonder gokken op te lossen, en met één startvakje minder lukt het niet.

**1. Vier bij vier** (vier woorden over en vier woorden neer, 7 klinkers)
```
G2 R3 ·· ··
·· ·· ·· ··
L3 ·· ·· ··
·· ·· ·· ··
```

**2. Het tuinhek** (drie woorden over en drie neer, 5 klinkers)
```
G0 ·· ·· ·· ██
·· ██ ·· ██ ··
·· ·· ·· ·· ··
·· ██ ·· ██ ··
██ ·· ·· ·· D2
```

**3. De ruit** (vijf woorden over en vijf neer, 8 klinkers; de lastigste: hier heb je meer woordkennis nodig)
```
██ R2 ·· ·· ██
·· ·· N3 ·· ··
·· ·· ·· ·· ··
·· ·· ·· ·· ··
██ ·· ·· G2 ██
```

Hints die in het spel bij deze velden zouden horen (de omschrijvingen):
- Vier bij vier: over *Houvast · Niet meer nieuw, zoals in 'een … fiets' · Oud snaarinstrument · Glazen ding met een dop*; neer *Rolt het strand op · Jij dit, ik dat · Ineens heb je er een · Kranten en journalisten samen*.
- Het tuinhek: over *Donker hol · Bang gevoel · Hangt aan een boom*; neer *Je drinkt eruit · Staat in de kerk en heeft pijpen · Groter dan een dorp*.
- De ruit: over *Soort, bij honden · Het voorjaar · Tussen je voet en je been · Prik van een wesp · Heel*; neer *Wat je op school krijgt · Wat je krijgt voor je spaargeld · Houdt het schip op zijn plek · Smal straatje · Ieder*.

---

## 14. Oplossingen

### 14.1 Cryptisch: antwoorden, hints, par en uitleg

| # | Antwoord | Par | Hints (1 t/m 4) | Uitleg na afloop |
|---|---|---|---|---|
| 1 | WEKKER | 2 | Lees een uitdrukking letterlijk · 'Afgaan' kan twee dingen betekenen: voor gek staan, en lawaai maken op een vaste tijd · Je hoort hem in je slaapkamer · Begint met een W | Afgaan is voor gek staan (dan schaam je je), maar een wekker gaat elke ochtend gewoon af: hij rinkelt. |
| 2 | STROPDAS | 2 | Lees een uitdrukking letterlijk · Wie zich laat strikken, laat zich overhalen; maar je kunt ook echt iets strikken · Het hoort bij een net pak · Begint met een S | Je laten strikken is je laten overhalen. Een stropdas wordt letterlijk om je nek gestrikt. |
| 3 | DEURMAT | 2 | Lees een uitdrukking letterlijk · Met voeten treden betekent: slecht behandelen · Je veegt er je schoenen aan · Begint met een D | Iemand met voeten treden is hem slecht behandelen. Over een deurmat loop je letterlijk met je voeten. |
| 4 | POTTENBAKKER | 2 | Lees een uitdrukking letterlijk · Er een potje van maken is iets slecht doen; maar wie maakt er echt potjes? · Hij werkt met klei en een draaischijf · Begint met een P | Er een potje van maken betekent er een rommeltje van maken. Een pottenbakker maakt de hele dag echte potjes. |
| 5 | HORLOGE | 2 | Lees een uitdrukking letterlijk · Met je tijd meegaan is modern zijn; wat loopt er nog meer met de tijd mee? · Je draagt hem om je pols · Begint met een H | Met je tijd meegaan is bij de tijd blijven. Een horloge gaat letterlijk met de tijd mee. |
| 6 | ZANDBANK | 2 | Een woord heeft hier een andere betekenis dan je denkt · Een bank is niet altijd iets om op te zitten · Hij ligt in zee en valt bij eb droog · Begint met een Z | Je denkt aan een bank om op te zitten, maar het is een zandbank in zee: daar liggen zeehonden graag in de zon. |
| 7 | VULKAAN | 2 | Lees een uitdrukking letterlijk · Uitbarsten kan woedend worden zijn, maar ook iets heel anders · Er komt lava uit · Begint met een V | Op het punt staan om uit te barsten klinkt als iemand die heel boos wordt. Een vulkaan barst echt uit. |
| 8 | BED | 2 | Lees een woord letterlijk · Opmaken kan met make-up, vlak voor je uitgaat; wat maak je nog meer op? · Je slaapt erin · Begint met een B | Je denkt aan iemand die zich opmaakt om uit te gaan. Maar een bed maak je elke ochtend op, en dat gaat nergens heen. |
| 9 | EMMER | 2 | Lees een uitdrukking letterlijk · In de put zitten is somber zijn; maar wat zit er echt in een put? · Je haalt er water mee op · Begint met een E | In de put zitten is somber zijn, en er weer bovenop komen is je weer beter voelen. Een emmer zakt letterlijk in de put en komt vol water weer boven. |
| 10 | VERGROOTGLAS | 2 | Lees een uitdrukking letterlijk · Van een mug een olifant maken is overdrijven; wat maakt kleine dingen echt groot? · Een speurneus heeft er altijd een bij zich · Begint met een V | Van een mug een olifant maken is overdrijven. Een vergrootglas maakt een mug echt heel groot. |
| 11 | KERSTMAN | 2 | Een anagram: de letters van een paar woorden staan door elkaar · De betekenis staat aan het eind: 'brengt cadeautjes'; 'verbouwd' zegt dat je moet husselen · Hussel de letters van MAN en STERK · Begint met een K | 'Verbouwd' zegt: hussel. De letters van MAN + STERK vormen KERSTMAN, en die brengt cadeautjes. |
| 12 | STIER | 1 | Een anagram · De betekenis staat vooraan: 'mannetjesrund'; 'alle kanten op' zegt dat je moet husselen · Hussel de letters van REIST · Begint met een S | 'Alle kanten op' zegt: hussel. REIST door elkaar geeft STIER, een mannetjesrund. |
| 13 | EGEL | 1 | Het woord zit verstopt in de omschrijving · 'Schuilt' zegt dat het woord zich verstopt; de betekenis is 'stekelig beestje' · Kijk naar de letters van GROTE GELE, over de spatie heen · Begint met een E | In grotE GELe staat EGEL, over de spatie heen. Een egel is een stekelig beestje. |
| 14 | HART | 2 | Het woord klinkt hetzelfde als een ander woord · 'Klinkt' zegt: luister; de betekenis is 'klopt altijd' (en dat is niet 'heeft altijd gelijk') · Niet zacht is HARD; wat klinkt hetzelfde? · Begint met een H | Niet zacht is HARD, en dat klinkt precies als HART. En een hart klopt altijd. |
| 15 | PEIL | 2 | Het woord klinkt hetzelfde als een ander woord · De betekenis staat vooraan: 'het niveau van het water' · Wat schiet je met een boog? Zeg het hardop · Begint met een P | Met een boog schiet je een PIJL, en dat klinkt als PEIL: het niveau van het water. |
| 16 | VLAAI | 2 | Het woord bestaat uit stukjes die je achter elkaar zet · De betekenis staat aan het eind: 'Limburgse lekkernij' · Een toetje van drie letters, en een luiaard van twee (ken je hem uit de kruiswoordpuzzel?) · Begint met een V | VLA is een toetje, AI is een luiaard. Samen VLAAI, een Limburgse lekkernij. |
| 17 | TROUW | 2 | Het ene woord zit om het andere heen · De betekenis staat aan het eind: 'dat beloof je elkaar' · Het begin van RELATIE is een R; zet er TOUW omheen · Begint met een T | Het begin van een relatie is de R. Zet TOUW eromheen: T-R-OUW. Trouw beloof je elkaar. |
| 18 | LEGER | 1 | Je leest een woord achterstevoren · De betekenis staat vooraan: 'soldaten'; 'op zijn kop' zegt: draai om · Lees REGEL achterstevoren · Begint met een L | REGEL achterstevoren is LEGER, en een leger bestaat uit soldaten. |
| 19 | LAAG | 1 | Je haalt een letter van een woord af · 'Zonder kop' zegt: haal de eerste letter weg; de betekenis is 'allesbehalve hoog' · Haal de eerste letter van VLAAG af · Begint met een L | VLAAG zonder kop (de V) is LAAG, en dat is allesbehalve hoog. |
| 20 | EEND | 1 | Je hebt de eerste letters van een paar woorden nodig · 'De koppen van' zegt: neem de eerste letters; de betekenis staat aan het eind · Neem de eerste letter van EERST, EVEN, NIETS en DOEN · Begint met een E | De eerste letters van Eerst Even Niets Doen vormen EEND: een watervogel (die ook graag even niets doet). |

Met code nagekeken: alle antwoorden en stukjes staan in OpenTaal, het aantal letters klopt, geen antwoord staat als los woord in de omschrijving, en elk stukje woordspel klopt (MAN + STERK en REIST zijn precies de letters van KERSTMAN en STIER; EGEL staat echt in "grote gele"; VLA + AI, T + R + OUW, REGEL achterstevoren, VLAAG zonder V en de beginletters E-E-N-D geven precies het antwoord). De twee "klinkt als" (HARD/HART en PIJL/PEIL) zijn bekende klankparen.

### 14.2 Letterval: een volgorde die lukt

| Rooster | Woorden | Een volgorde die lukt | Wat je eerst kunt pakken |
|---|---|---|---|
| In de keuken | LEPEL, VORK, OVEN, PAN | lepel → oven → vork → pan | alleen LEPEL |
| Het weer | REGEN, WIND, MIST, ZON | mist → zon → wind → regen | MIST of ZON |
| Op de boerderij | TRACTOR, SCHAAP, PAARD, GEIT, KOE | geit → koe → schaap → tractor → paard | GEIT of KOE |
| Op het strand | ZANDKASTEEL, SCHELP, MEEUW, ZEE | zandkasteel → schelp → meeuw → zee | alleen ZANDKASTEEL |
| Muziekinstrumenten | TROMMEL, VIOOL, PIANO, HARP, TUBA | viool → trommel → piano → harp → tuba | HARP of VIOOL |

### 14.3 Klinkermijnen: de oplossingen

```
Vier bij vier         Het tuinhek              De ruit
G2 R3 I  P2           G0 R1 O  T1 ██           ██ R2 A  S2 ██
O  U  D5 E            L1 ██ R1 ██ S0           L2 E  N3 T3 E
L3 I  E  R3           A  N2 G1 S2 T1           E  N3 K4 E  L3
F1 L3 E  S2           S1 ██ E  ██ A            S2 T3 E  E  K2
                      ██ B1 L2 A  D2           ██ E  R3 G2 ██
```

- **Vier bij vier**: over GRIP, OUDE, LIER, FLES; neer GOLF, RUIL, IDEE, PERS. Zo begin je: de G2 heeft maar twee dichte buren (rij 2, kolom 1 en 2), dus dat zijn allebei klinkers. Na GR aan het begin van een woord komt een klinker (rij 1, kolom 3), en GR met twee klinkers erachter bestaat niet in vier letters, dus rij 1, kolom 4 is een medeklinker. Nu heeft de R3 zijn drie klinkers, dus rij 2, kolom 3 is ook een medeklinker. Enzovoort.
- **Het tuinhek**: over GROT, ANGST, BLAD; neer GLAS, ORGEL, STAD. De G0 zegt meteen dat zijn twee buren medeklinkers zijn (R en L), en de D2 in de hoek heeft maar twee buren, dus dat zijn allebei klinkers. Na GR en GL komt een klinker. Daarna gaat bijna alles met de getallen.
- **De ruit**: over RAS, LENTE, ENKEL, STEEK, ERG; neer LES, RENTE, ANKER, STEEG, ELK. Hier begin je met woordkennis: een woord dat met een R begint, heeft daarna een klinker (rij 1 en kolom 2). Daarna helpen de getallen en de kruisende woorden elkaar.
