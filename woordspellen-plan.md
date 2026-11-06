# Plan: de woordspellen van vandaag (versie 3)

Voorstel van Claude Code, 6 november 2026, aangepast na twee keer feedback van Ruben. Er is nog niets gebouwd: eerst je akkoord.
Bij dit plan horen drie speelbare proefpagina's (één per nieuw spel, elk in een eigen stijl). Die stuur ik los; ze komen niet op de site.

---

## 1. Wat er veranderd is na je feedback

### Tweede ronde (versie 3)

| Je feedback | Wat ik nu voorstel |
|---|---|
| 1. Terugblik | Ja. Oude puzzels kun je bekijken, met de oplossing en de uitleg, maar niet meer spelen. |
| 2. "Hoe bedoel je oefenen?" | Zie §2, bij Rommelwoord. |
| 3. Cryptisch is nog veel te makkelijk: door beide woorden te raden heb je het antwoord | Alle twintig zijn nieuw (§5 en §6). Er zijn geen dubbele punten meer die zeggen waar de betekenis ophoudt. Het woordspel werkt nu met letters: afkortingen, Romeinse cijfers, een letter eraf, eromheen, om de andere letter, beginletters, verstopt en achterstevoren. De betekenis zet je bewust op het verkeerde been. |
| 3. Geen hints | Cryptisch heeft geen hints meer. Wie vastzit, kan alleen opgeven. Er is wel een algemene uitleg over hoe een cryptische omschrijving werkt, met een voorbeeld dat nooit een puzzel van de dag is. |
| 4. De stijlen | Blijven zoals ze zijn. |
| Letterval: slepen moet duidelijker, de blokken zijn te groot | De blokken zijn kleiner. Een letter die je raakt, wordt een wit kaartje met een rode rand en een volgnummer. Een dikke rode lijn verbindt de gekozen letters. Het woord dat je maakt, staat live op een strook labeltape boven de kist. Na het loslaten wordt het groen (goed) of rood (fout). Tijdens het vegen telt alleen het midden van een blok, zodat je schuin kunt vegen zonder per ongeluk een buurman te raken. |
| Klinkermijnen: 5×5, zoals Vowelsweeper, en beter klinkers markeren | Elk veld is een woordvierkant van 5×5: elke rij en elke kolom is een woord van vijf letters. Onder het veld staat een gereedschapsbalk: ⛏ Openen, 🚩 Klinker hier, en de knoppen A E I O U IJ. Je markeert op twee manieren: kies een klinker en tik op het vakje, of tik een vlaggetje aan en kies dan de klinker. |

### Eerste ronde (versie 2)

| Je feedback | Wat ik voorstelde |
|---|---|
| Drie unieke stijlen | Elk spel een eigen stijl (§3), in de sfeer van het soort spel, maar met een eigen ontwerp. |
| Geen tabbladen | Vier losse spellen met een eigen pagina en tegel: **Rommelwoord**, **Cryptisch**, **Letterval** en **Klinkermijnen**. |
| Eén dag te spelen | Elke puzzel is alleen op zijn eigen dag te spelen. |
| Namen, één keer mis, vijf letters, homepage | Cryptisch, Letterval, Klinkermijnen. Klinkermijnen: één keer mis is voorbij. Vijf letters blijft zoals het is. Eén kaart bij Puzzels van vandaag, drie nieuwe borden. |
| De scoreserver | Ontvangen (versie 2026-11-05b); de nieuwe versie bouw ik daarop. |

---

## 2. De vier spellen

### Rommelwoord (`rommelwoord.html`)
- Het bekende spel, met daarbij woorden van **4, 6, 7 en 8 letters**, elk een eigen woord van de dag. Bovenin kies je de lengte; vijf letters staat voorop.
- **Vijf letters blijft precies zoals het is**: dezelfde lijst, dezelfde volgorde en dezelfde opslag. Ik test met code dat elke dag hetzelfde woord geeft als nu.
- **De moeilijke stand**: wat je al weet, moet je gebruiken (groen op dezelfde plek, rood ergens in het woord).
- **Na afloop**: wat het woord betekent, in één of twee zinnen die ik zelf schrijf.
- **Terugblik**: de woorden van vorige dagen, met de uitleg. Alleen bekijken.
- **Oefenen** (uitleg bij je vraag): een knop "Oefenen" geeft een willekeurig woord, van de lengte die je kiest. Dat woord is nooit een woord van de dag, je kunt er zo vaak als je wilt een nieuw nemen, en het telt nergens mee (geen reeks en geen scorebord). Het is voor wie na het woord van vandaag nog door wil spelen. **Mijn advies: houden.** Weglaten mag ook; dan is er per lengte één woord per dag, en verder niets.

### Cryptisch (`cryptisch.html`)
- Elke dag één cryptische omschrijving met het aantal letters, alleen die dag te spelen.
- Je typt je antwoord en drukt op **Raad**. Een fout antwoord krijgt een rood kruisje; je mag zo vaak proberen als je wilt.
- **Geen hints.** Wie vastzit, kan **opgeven**: dan zie je het antwoord, en telt de dag niet als gelukt.
- **Na afloop** een uitleg als krantenkolom. Daarin is de omschrijving gemarkeerd: de betekenis met een rode golflijn, het woordspel met geel markeerstift, en de aanwijzer met een blauwe cirkel.
- **De klok** loopt mee. Je uitslag is de tijd en het aantal keer mis. Bij het delen worden dat gekleurde blokjes: 🟥🟥🟩 betekent twee keer mis, en toen goed.
- **Hoe werkt het?** Een uitleg van de soorten woordspel en de afkortingen, met een voorbeeld dat nooit een puzzel van de dag is. Dat is geen hint voor vandaag, maar hetzelfde wat je in een krant bij de puzzel leest.
- **Terugblik** op de omschrijvingen van vorige dagen, met de uitleg.

### Letterval (`letterval.html`)
- Elke dag een rooster met een thema, alleen die dag te spelen.
- Je veegt woorden. Een gevonden woord verdwijnt, en de letters erboven vallen omlaag.
- Tijdens het vegen zie je precies wat je raakt (zie §1). Je kunt ook letters één voor één aantikken.
- Er zijn hints: eerst een letter, dan het woord, dan de route. Ongedaan maken kan altijd. (Je zei "geen hints" bij Cryptisch. Moeten ze hier ook weg, dan haal ik ze weg.)
- Loop je vast, dan zegt het spel dat. Elk rooster lukt in minstens één volgorde.

### Klinkermijnen (`klinkermijnen.html`)
- Elke dag een woordvierkant van 5×5: vijf woorden in de rijen en vijf in de kolommen. Elke klinker (A, E, I, O, U en de IJ, die één vakje is) is een mijn.
- Open je een medeklinker, dan zie je de letter en het aantal klinkers in de acht vakjes eromheen.
- Op een klinker zet je een vlaggetje, of meteen de goede klinker, met de gereedschapsbalk, lang vasthouden of rechts klikken.
  - Een vlaggetje kan nooit per ongeluk open: tik je erop met Openen, dan kies je alleen het vakje.
- **Eén keer een klinker openen, en het is voorbij.** Dan springt er een duveltje uit het doosje.
- Het veld is af als alle tien de woorden kloppen.
- Elk veld is zonder gokken op te lossen, en je begint met zo weinig mogelijk open vakjes (1 tot 3). De computer kijkt dat na: met alleen de getallen en de woorden die een speler kent, moet het lukken. Valt er één beginvakje weg, dan lukt het niet meer.
- Geen hints.
- **Waarom ook kolommen?** Ik heb het eerst geprobeerd met alleen woorden in de rijen. Dan was bijna geen enkel veld zonder gokken op te lossen: 2 van de 57. Een woord in elke kolom geeft je net genoeg om verder te komen.

---

## 3. Drie eigen stijlen

Elk spel heeft het lettertype, de kleuren, licht en donker, en de grapjes van het rommelhoekje. Daarbovenop een eigen stijl:

| Spel | Stijl | Wat je ziet |
|---|---|---|
| **Cryptisch** | **Het krantenknipsel** | Krantenpapier met fijne stippen, een kop met dubbele lijnen, de omschrijving op een uitgeknipt stukje krant met plakband en een gekartelde rand, en de vakjes als een strook uit een kruiswoordraadsel. Na afloop komt er een stempel OPGELOST of OPGEGEVEN op, en een uitleg als krantenkolom. |
| **Letterval** | **De marktkraam** | Een rood-witte luifel, een houten kist vol geverfde letterblokjes, het thema op een prijskaartje aan een touwtje, de woorden op een krijtbordje, en het woord dat je maakt op een strook labeltape. |
| **Klinkermijnen** | **Het duveltjesveld** | Een kast in de stijl van een oud spelletje: verhoogde vakjes, rode cijferschermpjes en gekleurde getallen, op het gaatjesbord van het rommelhoekje. In het midden zit een duveltje uit een doosje. Onder het veld zit de gereedschapsbalk in dezelfde stijl. |

De **Woord**-pagina houdt de stijl die hij nu heeft (de stijl van 0.6).

---

## 4. Samen: de woordspellen van vandaag

- **Op de homepage** komt bij Puzzels van vandaag één kaart "Woordspellen", met vier tekentjes (✓ gedaan, ◐ bezig, ○ open). Bij Alle spellen krijgt elk spel een eigen tegel, in de categorie Puzzels.
- **Onderaan elk spel** staat een strookje met de andere drie, en of je die vandaag al deed.
- **Reeksen**: elk spel heeft een eigen reeks (op de dag zelf gelukt). Daarnaast is er een gezamenlijke **woordreeks**: elke dag minstens één woordspel gespeeld. Wie nu een reeks in Rommelwoord heeft, houdt die ook in de woordreeks.
- **Cijfers en mijlpalen** per spel, uitgerekend uit wat je speelde. Bijvoorbeeld:
  - alle vier op één dag;
  - een woordreeks van 7, 30, 100 of 365 dagen;
  - Cryptisch in één keer goed;
  - Klinkermijnen tien keer zonder fout.
- **Delen** als rijtje tekens, zonder de oplossing te verraden.
- **"Je was sneller dan x% van de spelers"**: anoniem, met hetzelfde systeem als de dagtijden van Rommelkroon (zie §8).
- **Geen spieken**: de puzzels van komende dagen zitten versleuteld in kistjes, net als bij Rommelgroepjes. Ze staan in een apart bestand, zodat de pagina's niet te groot worden.

---

## 5. Hoe een omschrijving een echte puzzel wordt

Ik heb opnieuw gekeken hoe Minute Cryptic dat doet (hun uitleg en een flink aantal uitgelegde puzzels op andere sites). Ik neem niets over: geen omschrijvingen, geen teksten en geen schermen. Wel volg ik deze regels, die voor alle cryptische puzzels gelden.

**Waarom de vorige twintig te makkelijk waren.** Ze waren bijna allemaal twee gewone woorden achter elkaar (STEM + VORK). Een dubbele punt zei ook nog waar de betekenis begon. Je kon het antwoord dus vinden door twee makkelijke woorden te raden.

**Wat er nu anders is:**
- **Geen grens in de zin.** Geen dubbele punt en geen "en dan". Je moet zelf uitzoeken welk deel de betekenis is: het begin of het eind.
- **Het woordspel werkt met letters**, niet met hele woorden. Voorbeelden:
  - een afkorting of een Romeins cijfer;
  - een letter eraf;
  - het ene woord om het andere heen;
  - om de andere letter;
  - beginletters;
  - verstopt over de spaties heen;
  - achterstevoren.
- **Vaak twee stappen**: eerst een ander woord bedenken, en daar dan iets mee doen. Een werpspies wordt SPEER, en onthoofd blijft PEER over. Een stel wordt PAAR, en achterstevoren wordt dat RAAP.
- **De betekenis zet je op het verkeerde been.** Bij "Gloeilamp" denk je niet aan een peer, bij "Neerslag" denk je aan regen, en bij "Zij staat op de balk" aan een turnster.
- **De zin leest gewoon**, en de aanwijzer lijkt een gewoon woord: "verbouwd", "teruggespoeld", "regelmatig", "onthoofde".
- **Elk woord doet iets.** Er mogen alleen kleine verbindingswoorden tussen (is, van, wordt, uit).
- **Eerlijk.** Je husselt alleen letters die echt in de zin staan, dus niet eerst vertalen en dan husselen. Elke afkorting staat in de uitleg van het spel.
- **Precies één antwoord.**

**Hoe ik nakijk:**
- **De computer** rekent elk stukje woordspel na. Er staat geen dubbele punt in, de betekenis staat helemaal vooraan of helemaal achteraan, en het antwoord en elk tussenwoord staan in OpenTaal.
- **Blinde oplossers.** Vijf aparte Claudes losten de omschrijvingen op zonder de antwoorden te kennen: een kenner, een gewone speler en een strenge nakijker. Na elke ronde heb ik verbeterd wat ze vonden:
  - een tweede antwoord (NOOT of NOOD);
  - een aanwijzer die niet goed werkte;
  - eerst vertalen en dan husselen (MOLEN, die is eruit);
  - betekenissen die het antwoord meteen verraadden.
- In de laatste ronde vonden ze bij geen enkele omschrijving een tweede antwoord.
- **Een eerlijke kanttekening**: een computer vindt woorden heel snel, en vond ze ook nu meestal oplosbaar. Of ze voor jou moeilijk genoeg zijn, merk je het best in de proef.

**De moeilijkheid wisselt per dag**, zoals in de krant: maandag het makkelijkst, zondag het lastigst.

---

## 6. De twintig nieuwe omschrijvingen

De omschrijvingen staan **niet** in dit plan, want dit bestand is openbaar op GitHub. Dan zouden ze nooit meer een puzzel van de dag kunnen zijn. Je vindt ze in de proefpagina van Cryptisch, met na afloop de uitleg.

Wat erin zit:

| Soort | Aantal |
|---|---|
| Twee betekenissen | 4 |
| Afkorting of Romeins cijfer, met een stukje | 3 |
| Eromheen | 2 |
| Een letter eraf | 2 |
| Husselen | 2 |
| Achterstevoren | 2 |
| Verstopt en achterstevoren | 1 |
| Verstopt | 1 |
| Om de andere letter | 1 |
| Beginletters | 1 |
| Klinkt als | 1 |

Het antwoord is 3 tot 8 letters lang.

**De voorbeelden van Letterval** zijn dezelfde 5 roosters als eerst. Ze zijn met code nagekeken: elk rooster lukt in minstens één volgorde.

**De voorbeelden van Klinkermijnen** zijn 3 nieuwe woordvierkanten. Een zoeker maakt ze vakje voor vakje. Daarna kijkt de oplosser na dat ze zonder gokken lukken.
- In drie minuten vond hij er 68 verschillende.
- Voor een jaar heb ik er 365 nodig, met gewone woorden en zonder herhaling. Daarvoor laat ik hem langer zoeken.

---

## 7. De opslag

- `rommelwoord-dag-v1` en `rommelwoord-stats-v1` **blijven precies zoals ze zijn**.
- Elk nieuw spel krijgt een eigen, kleine sleutel. Zo schrijven twee open spellen nooit door elkaar in dezelfde opslag. Alle vier komen in `SLEUTELS`, dus ze gaan mee met koppelen.

| Sleutel | Wat erin staat |
|---|---|
| `rommelwoord-extra-v1` | De lengtes 4, 6, 7 en 8, de geschiedenis van vijf letters (voor de woordreeks), de moeilijke stand |
| `cryptisch-v1` | Je uitslagen per dag, je tijden, en een omschrijving die nog loopt |
| `letterval-v1` | Je uitslagen per dag, je tijden, en een rooster dat nog loopt |
| `klinkermijnen-v1` | Je uitslagen per dag, je tijden, en een veld dat nog loopt |

Per spel staat er **één teken per dag** (dag 0 is 8 oktober 2026). Na een jaar is dat zo'n 400 tekens per spel. De tijden staan apart, als getallen.

| Teken | Betekenis |
|---|---|
| `.` | Niet gespeeld |
| `1` t/m `9` | Op de dag zelf gelukt. Bij Rommelwoord is het getal het aantal pogingen. Bij Cryptisch is het 1 plus het aantal keer mis. Bij Letterval is het 1 plus het aantal hints. Bij Klinkermijnen is het altijd 1. |
| `A` t/m `I` | Hetzelfde, in de moeilijke stand van Rommelwoord |
| `0` | Gelukt van vóór de nieuwe spellen (uit je lopende reeks) |
| `x` / `X` | Niet gelukt, opgegeven of boem (`X`: in de moeilijke stand) |

Reeksen, cijfers en mijlpalen rekent het spel uit die tekens. Een lopend spel (`bezig`) bewaart alleen vandaag.

---

## 8. De REGELS voor het koppelen en de scoreserver

**De REGELS** veranderen letterlijk hetzelfde in het gedeelde blok en in de scoreserver.

Er komt één nieuwe regel bij, `woordDagen`: per dag telt de eerste uitslag, en een `0` van vóór de nieuwe spellen maakt plaats voor een echte uitslag.

| Spel | Wat er per veld gebeurt |
|---|---|
| Alle vier de nieuwe sleutels | `d` (de uitslagen per dag) met `woordDagen` |
| | De tijden per dag: de eerste telt |
| | `bezig` is lopend: de laatste versie wint |
| | `inst` is een keuze |
| `MAAT` (alle vier) | Eerst het aantal dagen gelukt, dan het aantal dagen gespeeld |

Er zit geen geld en er zitten geen spullen in, dus samenvoegen is veilig. Ik test het met twee en drie apparaten, en met een oud apparaat.

**De scoreserver, versie 2026-11-06**, gebouwd op 2026-11-05b. Ik lever hem als volledig bestand.
- **Drie nieuwe borden** in `SPELLEN`: `cryptisch`, `letterval` en `klinker`.
  - Score: je beste reeks.
  - Extra: het aantal keer in één keer goed, zonder hint of zonder fout.
  - De grens is 5.000, want een reeks groeit hooguit één per dag.
- **De nieuwe REGELS** en de vier sleutels in `TIJD_SPEL`. Dan kun je ze ook terugzetten met de tijdmachine. `BLOK_NU` gaat naar 10.
- **"Sneller dan x%"**: `POST /woord/tijd` en `GET /woord/dag`, op dezelfde manier gebouwd als `/kroon/tijd`.
  - Wat er bewaard wordt: alleen het spel, de dag en de tijd. Geen naam en geen apparaatnummer.
  - Elk apparaat telt één keer per spel per dag, met hooguit 6 per adres per dag.
  - De tijden worden 28 dagen bewaard. De noodknop `scores` zet het dicht.
- `/status` zegt `woorden: 1`. De spellen sturen pas iets als de server dat zegt.

**De spellen gaan pas online als die versie in Cloudflare staat.**

---

## 9. Bouwvolgorde

1. **De scoreserver.** Jij zet hem in Cloudflare.
2. **Rommelwoord**: de lengtes, de moeilijke stand, de uitleg bij de woorden en de terugblik, plus de kaart op de homepage en het strookje onderaan.
3. **Cryptisch**, met de uitleg "Hoe werkt het?" en de terugblik.
4. **Letterval.**
5. **Klinkermijnen.**
6. **De hele voorraad**, per spel minstens een jaar:
   - **Cryptisch**: elke omschrijving door de computer nagerekend, en blind opgelost door een aparte Claude.
   - **Letterval**: elk rooster nagerekend.
   - **Klinkermijnen**: 365 woordvierkanten met gewone woorden, zonder gokken op te lossen.
7. **Alles testen.** Ik laat je vóór elke commit zien wat erin gaat.

---

## 10. Nog drie vragen

1. **Oefenen in Rommelwoord**: houden of weglaten (zie §2)? Mijn advies: houden.
2. **Hints bij Letterval**: houden zoals nu, of ook weg, net als bij Cryptisch? Mijn advies: houden. Je kunt hier echt vastlopen in de volgorde.
3. **Cryptisch**: zijn de twintig in de proef nu een echte puzzel? Zo niet, noem dan er een paar die nog te makkelijk zijn. Dan weet ik welke kant ik op moet.

---

## 11. De twintig uit versie 2

Die staan al openbaar op GitHub (in de vorige versie van dit plan). Ze worden dus nooit een puzzel van de dag. Een paar ervan kunnen dienen als voorbeeld in de uitleg "Hoe werkt het?".

Over de logica achter de omschrijvingen: [Minute Cryptic, How to Play](https://www.minutecryptic.com/guide). Ik heb daaruit alleen de regels gehaald, geen omschrijvingen of teksten.
