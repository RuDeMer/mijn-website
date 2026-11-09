# Vouwvlieger: meer pit (plan, 9 november 2026)

Ruben vroeg om een flinke upgrade van de graphics en veel meer pit, zonder dat de records iets anders gaan betekenen. Dit is het plan. Pas als Ruben het goedkeurt, ga ik bouwen.

## Wat ik zag (speelronde en meting)

- Een robot vloog door de gaten, op computer- en telefoonformaat.
- Het spel heeft een fijne sfeer (een nachtstad met de maan), maar alles ziet er hetzelfde uit, hoe ver je ook komt: dezelfde stad, dezelfde kranen.
- Een botsing en het neerstorten zijn klein: een geluidje en een propje.
- Gemeten (Chromium in de cloud, met het tekenen meegeteld): **10 ms per beeld op een computer** en **63 ms op een telefoon** (4 keer vertraagde processor: maar 15 beelden per seconde). Het duurst zijn de twee lagen met gebouwen, die elk beeld over het hele scherm worden getekend, en de gloed (`shadowBlur`) om de maan, de sterren en de neonborden.
- **Let op**: de natuurkunde rekent met de tijd tussen twee beelden, maar hooguit 1/30 seconde per keer. Haalt een telefoon minder dan 30 beelden per seconde, dan loopt het spel in slow motion, en is het makkelijker. Met de nieuwe, snellere tekenaar gebeurt dat bijna nooit meer.

## Wat er verandert

### 1. Een reis die verandert naarmate je verder vliegt

De score blijft het aantal obstakels dat je voorbij bent, en elke vlucht begint in de slaapkamer. Bij de medailles kom je in een nieuwe wereld:

| Punten | Wereld |
|---|---|
| 0 tot 10 | **De slaapkamer**: een bureau, boeken, een lamp, posters, een bed, en het raam staat open |
| 10 | **Door het raam naar buiten**: het raamkozijn schuift voorbij en je vliegt de avond in |
| 10 tot 25 | **De tuin**: een schutting, bloemen, een vogelhuisje, een appelboom, het huis achter je |
| 25 tot 50 | **De stad**: zoals nu, maar met meer diepte (drie lagen gebouwen, lichtjes, kranen in de verte) |
| 50 tot 100 | **Boven de wolken**: een zee van wolken, een luchtballon in de verte, vogels |
| 100 en verder | **De ruimte**: sterren, de aarde onder je, een maan, een satelliet |

- De lucht verkleurt mee: avond in de slaapkamer, schemering in de tuin, nacht in de stad, een zonsopgang boven de wolken, zwart in de ruimte.
- Het weer wisselt per vlucht (helder, een buitje, sneeuw, vallende sterren), maar nooit zo dat je de obstakels slechter ziet.
- **De obstakels blijven precies even groot en staan op dezelfde plekken**: dezelfde botsvakken als nu, alleen per wereld anders getekend, binnen dezelfde vorm. Bijvoorbeeld in de slaapkamer een hanglamp aan een snoer in plaats van een kraanhaak, een boekenplank aan twee touwtjes in plaats van een neonbord, en een stapel boeken in plaats van een schoorsteen. Wat je ziet, is dus precies waar je tegenaan botst. Bewust geen hoge torens of gebouwen om tegenaan te vliegen, en geen ontploffingen (zoals in CLAUDE.md).
- **De windvlagen** blijven precies zoals ze zijn (wanneer, hoe sterk, omhoog of omlaag), maar je ziet ze beter, per wereld: de verwarming die warme lucht omhoog blaast in de slaapkamer, blaadjes in de tuin, een tochtvlaag tussen de gebouwen, thermiek boven de wolken, zonnewind in de ruimte.

### 2. Een vliegtuigje dat je voelt

- Papier dat echt op papier lijkt: de vouwen, licht en schaduw, vezels en een randje.
- Het kantelt mee als je stijgt en duikt, en de vleugels klappen een beetje als je tikt. Bij een duik verschijnen er snelheidsstrepen, en achter je hangt een spoortje.
- Elke papiersoort is bijzonder: wit papier (vezels), krantenpapier (kolommen en een fotootje), kraanvogel (een origamipatroon), neon (gloeiende randen), bladgoud (glanst als je kantelt) en regenboog (kleuren die verlopen, met fonkeltjes).

### 3. Meer pit

- **Rakelings!**: scheer je heel dicht langs een obstakel zonder het te raken, dan staat er "Rakelings!" en krijg je een bonusster (zie keuze 2). Drie keer rakelings achter elkaar? Dan maakt je vliegtuigje een **rolletje** om zijn lengte (alleen voor het oog: het vliegen en botsen blijven precies hetzelfde). Een looping waarbij het vliegtuigje ondersteboven gaat, doe ik bewust niet: dan klopt wat je ziet niet meer met waar je botst.
- **Verrassingen onderweg**, alleen om naar te kijken: de kat die bij het raam kijkt, een zwerm vogels, een vlieger in de tuin, een kat op een dak, een luchtballon die zwaait, een ufo in de ruimte.
- **Een klap als je iets raakt**: een kreukgeluid, het beeld schudt even, en het papier kreukt. Vangt een extra vouw de botsing op, dan scheurt die vouw er zichtbaar af.
- **Mooi neerdwarrelen**: aan het eind dwarrelt je vliegtuigje als een blaadje heen en weer naar beneden.
- **Het eindscherm**: de punten tellen op, je medaille komt met een klap in beeld, en je ziet tot welke wereld je kwam. Bij een nieuw record volgt een feestje.

Bij `prefers-reduced-motion`: geen schudden, geen flitsen en geen rolletjes; alleen rustig in- en uitfaden.

### 4. De sterrenwinkel

- Nieuwe papiersoorten: **Ruitjespapier** (★ 35), **Bladmuziek** (★ 60), **Landkaart** (★ 110) en **Sterrenkaart** (★ 200).
- Nieuw: **sporen** achter je vliegtuigje: **Vonkjes** (★ 30), **Wolkjes** (★ 45), **Sterretjes** (★ 80) en **Regenboog** (★ 160). Je begint met een gewoon spoortje.
- Alles is alleen voor het oog, zodat de records eerlijk blijven. Er komen **geen nieuwe voordelen** die het spel makkelijker maken.
- De prijzen kunnen nog anders, als je dat wilt.

## Sneller, niet trager

Zoals bij Rommelritme:
- één achtergronddoekje op een lagere resolutie, waarin de lagen die vooraf getekend zijn alleen worden neergezet;
- geen `shadowBlur` meer: gloed komt uit kleine plaatjes;
- een keuze **Beeld: Automatisch, Zuinig, Normaal of Mooi**, alleen voor het apparaat waarop je hem instelt (`vouwvlieger-apparaat`, bewust niet in het koppelen).

Het doel: **op het telefoonformaat 60 beelden per seconde** (nu 15), en op een computer niet trager dan nu. Ik meet vóór en na, op computer- en telefoonformaat.

## Opslag, koppelen en de scoreserver

- `vouwvlieger-v1` blijft zoals hij is. Erbij komen `sporen` (wat je kocht), `spoor` (wat je koos) en `rakelings` (hoe vaak je rakelings ging).
- De nieuwe papiersoorten en sporen komen met hun prijs in `VV_PRIJS` (in het gedeelde blok én in de scoreserver), zodat je nooit sterren verliest of dubbel krijgt als je op twee apparaten tegelijk iets koopt. Dat test ik met twee apparaten.
- Daarvoor komt er een nieuwe scoreserver, **2026-11-12**, gebouwd op 2026-11-11. Die zet jij eerst in Cloudflare, en daarna pas de pagina.
- Het scorebord blijft zoals het is: `Scorebord.stuur('vlieger', opslag.best, opslag.sterren)`.

## Twee keuzes voor Ruben

**Keuze 1: de natuurkunde**
- **A (mijn advies): precies zoals nu.** Het vliegen, de zwaartekracht, de gaten, de windvlagen en het botsen blijven letter voor letter hetzelfde. Dan kan ik, net als bij Rommelritme, met een nagemaakte klok bewijzen dat elke vlucht in de oude en de nieuwe pagina precies hetzelfde loopt. De slow motion op een heel trage telefoon blijft bestaan, maar komt bijna niet meer voor, omdat het tekenen veel sneller wordt.
- **B: in vaste stapjes van 1/120 seconde**, zoals Rommelritme. Dan is het op elk apparaat even moeilijk, ook op een trage telefoon. Op een gewoon scherm merk je er bijna niets van, maar het vliegen is dan niet meer letter voor letter hetzelfde als vroeger, en dat kan ik dus ook niet bewijzen.

**Keuze 2: de bonussterren voor rakelings**
- **A (mijn advies): alleen in je spaarpot.** Je kunt er sneller iets mee kopen in de winkel. Ze tellen niet mee voor een extra vouw (dan zou het vliegen makkelijker worden) en niet voor je totaal aan sterren op het scorebord.
- **B: ook op het scorebord**: dan tellen ze mee in je totaal aan gevangen sterren (het tweede getal op het scorebord).
- **C: geen sterren**: alleen "Rakelings!", het rolletje en een teller.
