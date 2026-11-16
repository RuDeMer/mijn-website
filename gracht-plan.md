# Plan: De Rommelgracht

Voorstel van 16 november 2026, door Claude Code. **Nog niet goedgekeurd.** Eerst kiest Ruben een stuk gracht en kijkt hij naar het proefstuk; daarna bouw ik dat stuk helemaal af, en pas dan de rest.

Een nieuwe pagina, `rommelgracht.html`: je wandelt in 3D langs een echte gracht in Amsterdam, en elk pand is een spel van het rommelhoekje. Loop naar de deur, druk op de knop, en je komt met een mooie overgang in het spel. Een mix van echt en verzonnen: de gracht, de bruggen en de rij panden komen uit OpenStreetMap, de gevels, etalages en grapjes verzinnen we zelf.

Het idee (een straat in 3D om doorheen te lopen) komt van oudezijds.divergentlabs.xyz. Daar neem ik niets van over: geen code, geen ontwerp, geen teksten. Ik heb die site niet eens geopend.

## 1. Welk stuk gracht?

Alle drie liggen ver van de Wallen, zijn rustig en passen bij kinderen. De vorm komt uit OpenStreetMap (de kaartgegevens, de bruggen en per pand de plattegrond en de hoogte uit de 3D BAG).

| | **A. Bloemgracht** (Jordaan) — mijn voorkeur | **B. Brouwersgracht** | **C. Reguliersgracht** |
|---|---|---|---|
| Lengte | 475 m, water 12 m breed | ongeveer 800 m, water 15 tot 20 m | 540 m tussen Keizers- en Prinsengracht, water 12 m |
| Bruggen | 3 over de Bloemgracht, en de Kees de Jongenbrug bij de Prinsengracht | 2 aan de ene kant, en het beroemde kruispunt met 4 bruggen | 6 op een rij ("de zeven bruggen") |
| Woonboten | 5 (en meer op de Prinsengracht) | 26 | geen |
| Herkenningspunt | **de Westertoren** aan het eind, met de blauwe keizerskroon | de Noorderkerk (lage toren) | geen kerktoren in zicht |
| Panden aan het water | zo'n 130 | zo'n 150 (veel pakhuizen) | zo'n 120 |
| Waarom wel | Jordaan: trap-, hals- en klokgevels door elkaar, smal en gezellig, je ziet beide kanten tegelijk (en dat is ook zuinig om te tekenen), de toren als doel aan het eind | pakhuizen met luiken, heel veel woonboten, breed water | de bruggen op een rij zijn wereldberoemd, het Amstelveld met bomen |
| Waarom niet | | breder water en langer zicht: zwaarder voor een telefoon | geen woonboten en geen toren; veel bruggen maar minder panden |

Het proefstuk hieronder is gebouwd op **A, de Bloemgracht**: de hele gracht staat erin (707 gebouwen in en om het gebied), maar alleen het oostelijke stuk, van de Rosa Overbeekbrug tot de Prinsengracht, is al bijgewerkt.

## 2. Het proefstuk: een eerste stuk gracht met twee panden

De schermafbeeldingen staan in het gesprek (en in de pagina met het plan). Wat er al werkt:

- **De gracht uit OpenStreetMap**: het water, de kades, de stoepen, de dwarsstraten, de bruggen, de woonboten en per pand de echte plattegrond en hoogte. De gevels zelf zijn verzonnen, per pand altijd hetzelfde: trap-, hals-, klok-, tuit- en lijstgevels (oude panden vaker een trap- of halsgevel), baksteen in rood en bruin of geverfd, schuiframen met roedes, vitrage, luiken, een hijsbalk in de top, bloembakken, een stoepje en een geveltuintje.
- **Het water spiegelt de gevels** (een echte spiegeling, kleiner getekend), met golfjes, en bij regen kringen.
- **De straat**: klinkers, een stoep van tegels met een stoeprand, Amsterdammertjes, lantaarns (gietijzer met een glazen kap), iepen langs het water (in de herfst geel en bruin, met open plekken), fietsen tegen de brugleuning en de bomen.
- **Schaduwen van de huizen** op de straat, het water en de gevels (uit een hoogtekaartje van de huizen, zuinig te rekenen), met de echte stand van de zon in Amsterdam.
- **Dag en nacht**: 's avonds gaan de lantaarns en een deel van de ramen aan, met licht op de straat en in het water. **Weer**: zon, bewolkt, regen (natte straat, plassen, druppels), mist (laag boven het water) en sneeuw.
- **De Westertoren** (85 m, met de keizerskroon) en de Westerkerk aan het eind.
- **Twee spelpanden**: de **bakkerij** van de Vlaaienbakker (een groene pui met gouden letters, een gestreepte luifel, vlaaien op planken, een uithangbord en een stoepbord met een grap uit banners.json; in de etalage "Jij bakte al … vlaaien", uit de opslag van je eigen apparaat) en het **theater** van het Coulissenkoor (een rode klokgevel met goud, een markies met lampjes, rode gordijnen en een affiche; "Jij zong al … liedjes mee").
- **Naar binnen**: bij een deur verschijnt de naam van het spel; E (of de knop) opent de deur, je loopt naar binnen en het beeld wordt warm geel, en dan ben je in het spel. Kom je terug, dan sta je weer voor die deur.
- **Lopen**: WASD of pijltjes, Shift om te rennen, de muis om rond te kijken (Pointer Lock, met Esc stop je); op een telefoon links een stuurknuppel en rechts vegen. Een kaartje rechtsboven, een grote kaart om naar een pand te lopen, en **een gewone lijst** met alle spellen (ook als 3D niet werkt, en vanzelf bij minder beweging).
- **Geluid** (pas na de eerste tik): voetstappen (anders op een brug), kabbelend water, meeuwen, een fietsbel en de klok van de Westertoren op het hele uur.

Gemeten (Chromium in de cloud met software-tekenen, dus zonder grafische kaart; zegt vooral iets over het budget): **de hele gracht** is 240.000 driehoeken en 25 tekenopdrachten per beeld (plus de spiegeling), het JavaScript kost 1 tot 2 ms per beeld, en het bouwen 1,5 s. De pagina is 446 kB (waarvan 113 kB de kaart). Niet gemeten: een echte MacBook en telefoon (dat is stap 2).

Wat nog niet goed is (dat komt in stap 2): de bomen zijn nog te bol, de woonboten te eenvoudig, de bakstenen in de verte, op de telefoon staat er een E op de knop, en de gloed van verre lantaarns is klein.

## 3. De panden per spel

Elk spel krijgt een eigen pand dat erbij past. Het pand houdt zijn plek; een nieuw spel verdringt nooit een ander.

| Spel | Het pand | De levende etalage (alleen wat op jouw apparaat staat) |
|---|---|---|
| Vlaaienbakker | **Bakkerij** met luifel en vlaaien (staat er al) | hoeveel vlaaien je bakte |
| Coulissenkoor | **Theater** met markies en lampjes (staat er al) | hoeveel liedjes je meezong |
| Casino Rommelroyaal | **Casino** met neonletters, een rode loper en speelfiches in de etalage | de hand van de dag: al gespeeld of niet |
| Rommelwoord, Cryptisch, Letterval, Klinkermijnen | **Boekhandel "Het Laatste Woord"**: Rommelwoord in de winkel, Cryptisch in de krantenhoek (een eigen deur), Letterval als letterkraam op de stoep, Klinkermijnen achter de kelderdeur ("Pas op: klinkers!") | per woordspel: vandaag gedaan of nog open |
| Rommelgroepjes | **Verhuizer "De Vier Kisten"**: vier gekleurde kisten in de etalage | de puzzel van vandaag |
| Rommelkroon | **Juwelier** met kroontjes op kussens | de puzzel van vandaag |
| Op Gevoel | **Instrumentmaker** met weegschalen en meters | de dagronde |
| Rommelbeesten | **Speelgoedwinkel** met pakjes en knuffelbeesten | hoeveel kaarten je hebt |
| Rommelhotel | **Hotel Rommel**: breder, met een hotelbord en een draaideur | het hoofdstuk van het verhaal |
| Rommelblok | **Een pand van blokjes** (de gevel is van blokken) | |
| Rommelland | **Kermiswinkel** met een klein reuzenrad op het dak | hoeveel bezoekers je park had |
| Ruben de Duiker | **Het Rommelkombuis** (het restaurant uit het spel), en Ruben die bubbels maakt in de gracht ervoor | de dag en het hoofdstuk |
| Rommelpoker | **Pandjeshuis** met speelkaarten en snuisterijen | hoe ver je kwam |
| Vouwvlieger | **Papierwinkel** met vliegtuigjes aan draadjes | je record |
| Rommelritme | **Platenzaak** met speakers die op de maat bonzen | hoeveel levels gehaald |
| Rommelarend | **Reisbureau** met ansichtkaarten en een globe; de arend cirkelt boven de daken | hoeveel plekken ontdekt |
| Rob 👍 | **Broodjeszaak "Bij Rob"** met een grote duim | |
| Rommelbel | **Snoepwinkel** met een kauwgomballenautomaat | sterren |
| Rommelsteek | **Fournituren** met borduurringen in de etalage | |
| JAJA PRODUCTIEFIETS! | **Fietsenmaker**, met de rode productiefiets voor de deur | je verste rit |
| Rommelrecht | **Lijstenmaker** met één scheef lijstje | |
| Mengelmoes | **Drukkerij** met stickers in de etalage | hoeveel stickers je vond |
| Rommelwheels | **Garage** met een raar karretje | sterren |
| Zoals in de reclame | **Reclamebureau** met een groot bewegend bord | sterren |
| Huis op stelten | **Het huis van Moeki en Floortje**: de twee katten in de vensterbank (getekend zoals in Huis op stelten) | sterren |
| Helpdesk Hopeloos | **Een klein kantoortje "Helpdesk"**, met op de deur "Gesloten wegens eerlijkheid" | sterren |
| Scorebord | **De Erehal**: een deftig pand met een groot bord en bekers | |
| Ideeënbox | **Een rode brievenbus** op de kade ("Ideeënbus") | |
| Rommeltram (zodra hij op de homepage staat) | **Een tramhalte** bij de Westermarkt, waar af en toe de tram voorbij rijdt | |
| Het rommelhoekje zelf | **Het laatste huis**, met een zolder vol rommel en de sticker van Ruben in het raam; de deur gaat naar de homepage | |
| Een nieuw spel | **Vanzelf een winkel** in een vrij pand: de naam, het icoon en het onderschrift van de homepage, en een stempel "Nieuw!" | of je het al speelde |

Op elk pand een **uithangbord** met de naam, en op de stoep een **krijtbord** met een van de grappige teksten uit banners.json (elke dag een andere). Welke spellen er zijn en in welke volgorde, komt van de homepage (de labels, zonder verborgen labels); de teksten en iconen uit banners.json en banners.js. Er gaat niets naar een server.

## 4. Knipogen in de straat

- Moeki en Floortje in een vensterbank (de pixelkatten uit Huis op stelten, als plaatjes, met knipperen en een staart die beweegt).
- Ruben de Duiker die bubbels maakt in de gracht, en af en toe even boven komt.
- De arend uit Rommelarend die over de daken cirkelt.
- Een tram (crème met rood, lijn 11, zoals in Rommeltram) die af en toe over de Nieuwe-Wercksbrug rijdt, bij de Westermarkt (daar rijdt in het echt ook de tram).
- Een sloepje dat voorbij vaart, meeuwen, en duiven die opvliegen als je eraan komt.
- De feestkalender (via `Scorebord.feest`): met Sinterklaas ligt de Stoomboot in de gracht, met de kerst hangen er lichtjes langs de bruggen en staan er kerstbomen achter de ramen, met oud en nieuw vuurwerk boven de daken (zoals in Rommelarend: alleen om te kijken).

## 5. Soepel en zuinig

- **Budget**: hooguit zo'n 60 tekenopdrachten en 400.000 driehoeken per beeld voor de hele gracht, plus de spiegeling. Alles wat stilstaat is per tegel van 70 m samengevoegd (een paar tekenopdrachten per tegel), wat buiten beeld is wordt niet getekend, en in de verte staat mist.
- **Zuinig, Normaal, Mooi** (Instellingen): de scherpte, hooguit 30 of 60 beelden per seconde, hoe scherp de spiegeling is (een kwart, de helft of driekwart), hoe precies de schaduwen zijn, en hoeveel bomen. **Automatisch**: een telefoon met minder dan 8 kernen of 6 GB Zuinig, anders Normaal. Houdt het apparaat het niet bij, dan wordt het beeld vanzelf minder scherp.
- **Koel en stil**: sta je stil, dan tekent de gracht nog maar 20 keer per seconde; in een verborgen tabblad niets. Geen echte lampen (die zijn het duurst), maar licht dat de shaders zelf uitrekenen.
- **Snel starten**: de pagina laat meteen het beginscherm en de lijst zien; three.js (r128 van cdnjs, met een SRI-hash, dezelfde als in Rommelarend en Rommelland) en de gracht komen daarna.

## 6. Regels die ik volg

- Een eigen pagina; de homepage blijft zoals hij is. Ruben zet hem zelf op de homepage met de werkplaats. Ik zet alleen een icoon (`gracht`: een trapgevel aan het water) en een onderschrift klaar in `homepage-onderdelen.js` (en de kopie in de werkplaats).
- De gedeelde blokken (het scorebord-script met `const SLEUTELS`, de grapjes en de spelbalk van 0.6) letterlijk overgenomen. Het veiligheidsbeleid is hetzelfde als dat van Rommelarend.
- Waar je bent en je instellingen staan per apparaat in localStorage **`rommelgracht-apparaat`**, bewust niet in `SLEUTELS`. Dat komt ook in `privacy.html`.
- De kaartgegevens: **© OpenStreetMap-bijdragers**, onder de **Open Database License (ODbL)**, met een link naar openstreetmap.org/copyright in beeld, bij Instellingen en op de kaart. De kaart in de pagina is een afgeleide database onder dezelfde licentie; ik zet hem ook in `colofon.html`.

## 7. Wat ik van Ruben wil weten

1. **Welk stuk gracht**: A (Bloemgracht), B (Brouwersgracht) of C (Reguliersgracht)?
2. **De naam**: "De Rommelgracht", of iets anders?
3. **De woordspellen**: één boekhandel met vier deuren (zoals hierboven), of vier aparte panden?
4. **Het seizoen**: de bomen volgen nu de echte datum (nu herfst, in de winter kaal), of liever altijd zomer?
5. **De lijst met panden**: wil je bij een spel een ander pand (bijvoorbeeld een ander idee voor Rob of Helpdesk Hopeloos)?

## 8. De stappen

1. Dit plan (met het proefstuk).
2. Het gekozen stuk helemaal mooi en soepel, met de twee panden; Ruben probeert het op zijn telefoon en laptop (een testlink, nog niet op de site).
3. Alle panden, de lijst, de kaart en de knipogen.
4. De feestdagen en het weer helemaal af.
5. Testen (telefoon en computer, toetsenbord, muis, aanraken, de lijst, elke deur naar het goede spel, beelden per seconde, geen fouten of overtredingen van het veiligheidsbeleid), dan commit en push volgens de afspraken, en een notitie in CLAUDE.md.
