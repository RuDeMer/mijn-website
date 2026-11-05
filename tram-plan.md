# Plan: Rommeltram

Voorstel van 5 november 2026, door Claude Code. **Goedgekeurd door Ruben op 5 november 2026**: de naam Rommeltram, met "Op tijd", niet bij Puzzels van vandaag, en lijn 1 eerst als privé testlink. Ruben wil nog mooiere graphics: van dezelfde kwaliteit als Tramwaj, maar in een eigen stijl (de tekeningen en het uiterlijk van Tramwaj nemen we niet over).

Alleen het spelidee komt van Tramwaj: stop een tram zo dat de voorkant precies bij een geel bordje staat, met één knop. Het origineel heb ik niet bekeken. Naam, stad, haltes, tekeningen, teksten, geluiden en de indeling van het scherm zijn helemaal eigen.

## De naam

- **Rommeltram** (mijn voorkeur: past bij Rommelwoord, Rommelbel en Rommelkroon)
- **Tingeling!** (de bel van de tram)
- **Halte!**
- **Lijn 11** (een knipoog naar de elfde van de elfde)

## De stad: Rommelstad

Een Nederlandse stad in pixelart, getekend door het spel zelf: grachtenpanden met trap-, hals- en klokgevels, bomen langs het water, fietsen tegen het hek, een kerktoren, een molen aan de rand van de stad, een markt en een haven. De tram is crème met rood (de kleuren van de site), met een stroomafnemer aan de bovenleiding en het nummer 11.

In beeld schuiven lagen op verschillende snelheden voorbij: de lucht, de verre stad met de kerk en de molen, de grachtenpanden, de gracht met bootjes, de kade met bomen en lantaarns, en vooraan de straat, het perron en de tram. Af en toe schiet er een lantaarnpaal vlak voor je langs.

Een levende stad: mensen wachten bij de halte en lopen naar de deuren als die opengaan (sta je ver naast het bordje, dan moeten ze verder lopen), mensen stappen uit en lopen weg, fietsers op het fietspad naast de rails, duiven die opvliegen als de tram eraan komt, een kat in de vensterbank, bootjes op de gracht, meeuwen bij de haven. Elke lijn heeft een seizoen, weer en tijd van de dag: bloesem in de lente, vallende bladeren in de herfst, regen met plassen en weerspiegelingen, sneeuw op de daken, 's avonds licht in de ramen en brandende lantaarns.

## De lijnen

Elke lijn heeft vijf haltes en een eigen sfeer. Een lijn gaat open als je de vorige hebt uitgereden (minstens één ster). Per lijn komt er iets bij.

| Lijn | Sfeer | Haltes | Wat erbij komt |
|---|---|---|---|
| 1. De Grachtenlijn | lente, ochtend, droog | Remise → **Vlaaienplein** (de bakkerij met een vlaai op het uithangbord) → **Snorharensteeg** (een kat in de vensterbank) → **Knikkerkade** → **Prijskaartjesplein** → **Rommelmarkt** | Niets: rustig leren rijden. De eerste halte is dichtbij en makkelijk. |
| 2. De Marktlijn | zomer, middag, druk | Rommelmarkt → **Kienzaal** (Kienmaster Jan staat te wachten) → **Raadhuisplein** → **Dobbelsteenstraat** → **Schouwburg De Coulissen** → **Station Rommelstad** | Een maximumsnelheid (30 bij de markt, met een flitspaal), een heel korte en een heel lange halte. |
| 3. De Molenlijn | herfst, wind | Station → **Tolbrug** (een bult over de gracht, met fietsen tegen de brug) → **Draaiorgelplein** → **Pepernotenhof** → **Schapendijk** → **Molen De Zeurpiet** | Hellingen (bruggen en een dijk op en af) en bladeren op de rails (langere remweg). |
| 4. De Havenlijn | avond, regen | Hotel Rommel → **Zeekoekade** (de boot uit Ruben de Duiker) → **Het Rommelkombuis** → **Ophaalbrug** → **Meeuwenhoek** → **Vuurtoren** | Natte rails, een tramsein (een wit streepje: liggend is stoppen, staand is rijden; staat de ophaalbrug open, dan moet je wachten) en een halte waar niemand in of uit wil: daar rij je soepel doorheen. |
| 5. De Nachtlijn | winter, nacht, sneeuw | Vuurtoren → **Casino Rommelroyaal** (neon) → **De Bioscoop** (het witte fabrieksgebouw, met Moeki en Floortje voor het raam) → **Koek-en-zopie** → **Kerkplein** → **Het Rommelhoekje** | Alles door elkaar, met ijzel. |

Knipoogjes onderweg: Joop fietst soms op zijn rode productiefiets voorbij, op 11 november hangen er vlaggetjes aan de tram.

## Spelen: één knop

De spatie, de muis, of het hele scherm op een telefoon.

- **Je staat stil**: ingedrukt houden is **optrekken**. Loslaten is **uitrollen**.
- **Je rijdt**: opnieuw ingedrukt houden is **remmen**. Loslaten is weer uitrollen.
- **Optrekken kan alleen vanuit stilstand.** Je moet dus bij het wegrijden goed inschatten hoeveel vaart je nodig hebt (vooral voor een brug of een lange halte). Dat is de kern van het spel.

Op een telefoon kan de knop de pagina niet laten scrollen of inzoomen. Een kort tikje telt altijd.

### Echte natuurkunde

De tram is zwaar (36 ton, een volle tram iets meer, en die remt dan ook iets langer).

- **Optrekken** gaat geleidelijk: de motor bouwt in anderhalve seconde zijn kracht op, tot ongeveer 1,2 m/s² (van 0 naar 30 km/u in zo'n 8 seconden). Boven de 40 km/u trekt hij minder hard. Hooguit 50 km/u.
- **Uitrollen** gaat langzaam minder hard: van 40 km/u ben je na 400 meter nog ongeveer 26 km/u.
- **Remmen** begint zacht en wordt sterker zolang je vasthoudt, tot 1,6 m/s² na anderhalve seconde. De remweg van 40 km/u is ongeveer 45 meter. Wie op het laatst even loslaat en dan kort tikt, staat zacht stil.
- **Hellingen**: een brug van 4% geeft ongeveer 0,4 m/s² erbij of eraf.
- **Grip**: op natte rails, bladeren of ijzel kun je minder hard remmen. Rem je harder dan de rails toelaten, dan glijden de wielen (gepiep, vonken, en je schuift verder door).
- Het spel rekent in vaste stapjes van 1/120 seconde en leest de knop per stapje. **Dezelfde knop geeft dus altijd precies dezelfde rit** (dat test ik met een opname die ik opnieuw afspeel, ook in Node).

## Punten

Per halte hooguit **1.000 punten**:

- **Precisie** (hooguit 500): hoe dicht de voorkant bij het bordje staat, in centimeters. Met een beoordeling: tot 5 cm **"Op de centimeter!"** (en 100 extra), tot 30 cm **"Perfect!"**, tot 1 meter **"Netjes"**, tot 3 meter **"Kan ermee door"**, tot 8 meter **"Oeps"**, verder **"Daar sta je dan"**. Op het scherm staat bijvoorbeeld "12 cm te ver" of "48 cm te vroeg".
- **Rustig rijden** (hooguit 200): de staande passagiers wankelen boven 1,2 m/s² (min 40) en vallen om boven 1,5 m/s² (min 80). Een schok als je met de rem vol stilstaat kost 40.
- **Op tijd** (hooguit 200): elke halte heeft een tijd in de dienstregeling. Kom je later (omdat je heel langzaam naar het bordje kruipt), dan zakt dit in 20 seconden naar 0. Zonder dit deel zou kruipen altijd winnen.

Wat punten kost:

- **Te vroeg gestopt** (je staat stil voordat je bij het perron bent): min 150, de deuren blijven dicht en je mag opnieuw optrekken.
- **Voorbijgereden** (meer dan 8 meter voorbij het bordje): geen precisiepunten en min 150. De mensen lopen mopperend naar je toe.
- **Door rood** (bij het tramsein): min 200. **Geflitst**: min 100.
- **Doorrijhalte**: soepel doorrijden (zonder te stoppen, niet harder dan 30) geeft 100 punten, stoppen kost 100.

**Sterren per lijn**: één, twee of drie, naar je score (ongeveer de helft, 70% en 85% van wat kan; ik stel de grenzen af met een robot die de lijnen rijdt).

## De lijn van de dag

Elke dag (in Nederlandse tijd) een nieuwe lijn van zes haltes, voor iedereen hetzelfde: de haltes, de afstanden, de hellingen, wat erbij komt, het weer en de tijd van de dag komen uit een vast zaadje met de datum. Het seizoen volgt de echte kalender. **De eerste rit van een dag telt voor het scorebord**, daarna kun je hem oefenen. Stop je halverwege, dan ga je later verder bij de laatste halte waar je stilstond.

## Het stuurscherm

In eigen stijl: een crème paneel met een koperen randje, zoals de tram.

- een oranje **lichtkrant** met de volgende halte (zoals in een echte tram), de lijn en welke halte van de hoeveel;
- een **snelheidsmeter** met een wijzer;
- **hoe ver het bordje nog is** ("nog 2,2 m"), met een routebalkje van de vorige naar de volgende halte;
- drie **lampjes** (optrekken, uitrollen, remmen) en een balkje voor hoe hard je remt;
- hoe **rustig** de passagiers staan (poppetjes die wankelen);
- bovenin op labeltape: de lijn, het seizoen en het weer, en je punten.

Op een liggend scherm staat het stuurscherm onder de straat; op een staande telefoon ook, met eronder een groot vlak waar je duim op kan (het hele scherm telt, maar zo zie je waar).

## Geluid

Met Web Audio, door het spel zelf gemaakt: de bel (tingeling bij vertrek, en voor de lol met B of het belletje), het zoemen van de motor (dat hoger wordt met de snelheid), het tikken van de wielen over de railnaden, piepende remmen, glijdende wielen, de deuren (piepjes en gesis), een ding-dong en een stem die de halte omroept (een gebrabbel van geluidjes, geen echte stem), en per lijn de stad: markt, wind, regen, meeuwen. De halte wordt voor een schermlezer ook in tekst omgeroepen.

## De eerste keer

Drie korte stapjes, terwijl je al rijdt: "Houd ingedrukt om op te trekken", "Laat los om uit te rollen", "Houd weer ingedrukt om te remmen". De eerste halte (Vlaaienplein) ligt dichtbij, en alleen de eerste keer staan er twee spookbordjes langs de rails: "laat hier los" en "begin hier te remmen". Die rit telt niet mee.

## Techniek

- **Eén bestand**: `rommeltram.html`. Canvas 2D, scherpe pixels (vergroot met een heel getal, zonder vervaging), alles door het spel zelf getekend, geen scripts van buiten, een veiligheidsbeleid zoals bij Rommelbel (met `wss://rommellive.rubendm.workers.dev`).
- **Opbouw**: de motor (natuurkunde, punten, lijnen, de lijn van de dag, opslag) tussen `// ==== MOTOR begin` en `// ==== MOTOR eind`, zonder pagina en dus in Node te testen; daarna de weergave. De gedeelde blokken letterlijk zoals overal: het scorebord-script, de grapjes en de spelbalk van 0.6 (licht en donker in de balk).
- **Zuinig**: hooguit 60 beeldjes per seconde, de lagen worden één keer getekend en daarna alleen verschoven, niets in een verborgen tabblad, en minder als je stilstaat. Bij `prefers-reduced-motion` geen schudden, geen vallende bladeren en rustigere passagiers.
- Getest op 360 breed (staand) en liggend, en op een computer.

## Opslag en koppelen

`rommeltram-v1` (in `SLEUTELS`, gaat mee met koppelen; na een jaar ongeveer 5 kB):

```
{ v: 1,
  l: { '1': { b: 4210, s: 2, n: 5 }, ... },   // per lijn: beste score, sterren, keer gereden
  dag: { '20763': 3912, ... },                // de eerste rit van elke dag (dagnummer: punten)
  dagb: { d, h, p, ... } of null,             // een rit van de dag die nog loopt (verder bij de laatste halte)
  inst: { g: 1 }, uitleg: 1, voortgangTotaal: 15 }
```

Welke lijnen open zijn, rekent het spel uit de sterren uit (niets apart bewaard).

**De REGELS** (in het gedeelde blok én in de scoreserver): per lijn de beste score en de meeste sterren (`max`), keer gereden telt op (`teller`), per dag de eerste uitslag (`eerste`), een lopende rit de laatste versie (`lopend`), instellingen de laatste keuze. Er is geen geld of iets te koop, dus samenvoegen is eerlijk. De maat: sterren, dagen gereden, beste score.

## Scorebord en scoreserver

- Spel **`tram`**: je beste lijn van de dag (alleen de eerste rit van een dag telt), extra = aantal dagen gereden. Hooguit ongeveer 6.100 per dag; grens **10.000**.
- Weekbord **`tw` + weeknummer**: de ritten van deze week samen (net als de kroon en het casino), grens **70.000**.
- **Scoreserver 2026-11-06**, gebouwd op 2026-11-05 (die nu in Cloudflare draait): `tram` in `SPELLEN`, het weekbord, de REGELS, `TIJD_SPEL`, `BLOK_NU = 9`, en `/status` zegt `tram: 1`. **Daarvoor heb ik de code nodig die nu echt in Cloudflare staat**: plak hem in het gesprek als we zover zijn. De pagina stuurt pas scores als de server die versie heeft, en gaat pas online als hij in Cloudflare staat.

## De rest van de site

- Het gedeelde scorebord-blok in alle 24 pagina's, `homepage-onderdelen.js` en de kopie in de werkplaats (en `rommelblok.html`): de sleutel, `BRONNEN.tram`, het weekbord, de REGELS, `BV = 9`.
- Homepage (`homepage-onderdelen.js`): icoon `tram` (een trammetje met een geel bordje; ook het favicon en het icoon in de kop), categorie Snel een potje, onderschrift "Stop precies bij het gele bordje", voortgang "x van 15 sterren". Het label zet je zelf met de werkplaats.
- `scorebord.html`, de werkplaats (`SPELICONEN`, `SPELINFO`, `KAN`), `privacy.html` en een notitie in CLAUDE.md.

## Werkwijze

1. Dit plan, en jouw akkoord.
2. **Lijn 1 helemaal af** (de stad, de mensen, geluid, het stuurscherm, de uitleg, bewaren). Die zet ik als privé testlink op claude.ai (niet op de site), zodat je hem op je telefoon kunt spelen.
3. Daarna lijn 2 tot en met 5, de lijn van de dag, de sterren en het scorebord.
4. Testen: met code (de natuurkunde, de punten, de lijn van de dag voor iedereen gelijk, bewaren en laden, de REGELS met twee apparaten) en in een echte browser op telefoon- en computerformaat, zonder fouten of overtredingen van het veiligheidsbeleid.
5. Ik werk op de tak `claude/kind-mccarthy-kyy0ja`. Pas als jij akkoord geeft en de scoreserver draait, laat ik je zien wat er in de commit gaat en zet ik het op main.

## Stand van 5 november 2026: lijn 1 als testversie

- `rommeltram.html` heeft lijn 1 (De Grachtenlijn, vijf haltes): de motor tussen `// ==== MOTOR begin` en `// ==== MOTOR eind` (in Node getest: dezelfde knop geeft dezelfde rit, de robot haalt 5.000 van de 5.000, een kort tikje, te vroeg stoppen, altijd vasthouden tot het stootblok, bewaren en laden), de stad in vijf lagen die per stuk van 256 pixels één keer getekend en vooruit klaargezet worden, de tram, mensen die in- en uitstappen, duiven, fietsers, bootjes, het stuurscherm, geluid, de uitleg van de eerste keer en de uitslag.
- Nog niet: lijn 2 tot en met 5, de lijn van de dag, het scorebord, de sleutel in `SLEUTELS` en de REGELS, de homepage en de werkplaats. De pagina staat alleen op de werktak, niet op main.
- Ruben speelt lijn 1 eerst via een privé testlink op claude.ai (zonder de gedeelde blokken van de site).
