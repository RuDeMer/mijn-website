# Plan: een muntenschuiver

Voorstel van 21 november 2026, door Claude Code. **Goedgekeurd door Ruben op 21 november 2026** ("Ja, akkoord"): de naam **Rommelschuiver**, eigen natuurkunde (Rapier als reserve), het scorebord met de verzameling, een deurtje vanuit de Muntjesduwer in het casino, de pauze van Moeki, chocolademunten met Sinterklaas, en de bonussen en de verzameling zoals hieronder.

**Stand (21 november 2026): de proefpagina staat klaar** (`rommelschuiver.html`, nergens gelinkt; zie hoofdstuk 12). Ruben probeert hem op zijn telefoon en MacBook; pas als hij er prachtig uitziet en soepel loopt, bouw ik de rest (stap 3).

Een nieuw spel: een muntenschuiver zoals op de kermis en in een arcadehal. Je laat munten in een gleuf vallen, een schuiver duwt ze naar voren, en wat over de rand kiept, valt in je bakje. Alles eigen werk: geen namen, kasten, munten, geluiden of teksten van echte automaten, merken of andere spellen. Alleen speelmunten: nooit echt geld, niets te koop, geen reclame.

## 1. De naam

| Naam | Waarom |
|---|---|
| **Rommelschuiver** (mijn voorkeur) | Past in het rijtje Rommelbel, Rommelkroon, Rommelland; zegt meteen wat het is. Pagina `rommelschuiver.html`, opslag `rommelschuiver-v1`. |
| **De Muntenschuiver** | Het gewone woord; duidelijk voor iedereen. |
| **Kermiskiepers** | Grappig en kermisachtig ("kiepen" = over de rand vallen), minder duidelijk wat het is. |
| **Kiepkast** | Kort en stoer; het bord op de kast leest lekker. |

Op het bord bovenop de kast komt de naam in neonletters. Hieronder schrijf ik verder **Rommelschuiver**.

## 2. De natuurkunde: eigen werk, gemaakt voor munten

### Wat ik al gemeten heb

Ik heb **Rapier** geprobeerd (versie 0.21, de snelste uitvoering met SIMD; licentie Apache 2.0). Rapier staat **niet op cdnjs**, dus hij zou als eigen bestand naast de pagina moeten (1,65 MB ingepakt), en het veiligheidsbeleid zou `'wasm-unsafe-eval'` nodig hebben. Gemeten op één kern van de computer in de cloud (een Xeon van 2,3 GHz, ongeveer half zo snel als een MacBook met een M-chip), met een speelveld van 30 bij 24 muntstralen en een schuiver die heen en weer gaat:

| Proef | Tijd per stap (60 per seconde) | Wakkere munten |
|---|---|---|
| 650 munten (450 onder, 200 bovenop de schuiver) | 6,0 ms (de traagste 10%: 6,7 ms) | **alle 650** |
| Dezelfde 650, met mijn eigen slaaplaag over Rapier heen | 8,2 ms | nog 553 |
| Munten in hoge stapels | 300 munten 7,8 ms, 1.000 munten 49 ms | alle |

**Het probleem**: Rapier laat munten pas slapen als hun hele "eiland" stilligt (alles wat elkaar aanraakt). In een muntenschuiver raken alle munten elkaar, en de schuiver beweegt altijd. Dus slaapt er nooit een munt, en kost elke munt altijd rekenwerk: ongeveer 1 ms per 100 munten op deze computer. Met 2.000 munten wordt dat 20 ms per stap: te veel voor een telefoon, en een MacBook gaat blazen. Een eigen slaaplaag eroverheen bouwen werkt tegen Rapier in (het wisselen kost tijd, en de schuiver botst niet met munten die ik op "vast" heb gezet).

### Mijn keuze: eigen muntennatuurkunde

Ik schrijf zelf een natuurkunde die alleen munten (en ronde voorwerpen) hoeft te kunnen, met **drie standen per munt**:

1. **Slapen.** Ligt stil en kost niets. Een munt bovenop de schuiver slaapt *ten opzichte van de schuiver*: hij rijdt mee zonder rekenwerk, tot iets hem raakt (bijvoorbeeld de achterwand die hem eraf schraapt).
2. **Schuiven.** Een munt die ergens plat op ligt (de vloer, de schuiver, andere munten). Hij schuift en draait over de ondergrond, botst met munten op dezelfde hoogte, wordt door wrijving meegenomen door wat eronder beweegt, en **klimt over een andere munt heen** als hij klem zit (zo ontstaan de lagen munten die over elkaar schuiven). Zijn hoogte en schuinte volgen uit wat eronder ligt, dus een munt die half op een andere ligt, ligt ook echt scheef. Dit is snel: een paar duizend munten in een paar milliseconden, en munten kunnen nooit door elkaar of door de vloer zakken.
3. **Vallen.** Echte 3D-natuurkunde: zwaartekracht, draaien, stuiteren, rollen op de rand, botsen met de pinnetjes, de rand, de bak en andere munten. Een munt komt in deze stand als hij uit de gleuf komt, over een rand kiept of ergens vanaf valt. Ligt hij weer stil, dan gaat hij terug naar schuiven en slapen.

**Over de rand kiepen**: per munt reken ik uit of hij nog gedragen wordt, **met het gewicht van de munten die op hem liggen**. Een munt die uitsteekt, maar met zijn achterkant onder andere munten ligt, blijft dus hangen; zo ontstaat een rand die steeds verder uitsteekt, tot het zwaartepunt eroverheen gaat en er een hele plak tegelijk afkiept. Precies het moment waar je bij een echte muntenschuiver op zit te wachten.

De natuurkunde draait in een **eigen hulpje (Web Worker)**, zodat het tekenen nooit hoeft te wachten. Dat hulpje staat in de pagina zelf (zoals de kaartbouwer van Rommelarend), dus er komt geen extra bestand bij, en het veiligheidsbeleid blijft zoals bij de andere 3D-spellen (`worker-src 'self' blob:` staat er al).

**Voordelen**: geen download van 1,65 MB, geen `'wasm-unsafe-eval'`, munten die echt slapen, en alles precies afgesteld op munten. **Nadeel**: het is nieuw werk, dus er kunnen in het begin rare dingen gebeuren. Daarom komt het eerst in de proefpagina, met een test die zoekt naar munten die door de vloer of door elkaar zakken, of blijven trillen.

**De reserve**: lukt het in de proefpagina niet om het echt en stabiel te krijgen, dan stap ik over op Rapier in het hulpje, met minder munten die echt bewegen (ongeveer 500) en de rest als siermunten in de bak en op de randen. Dat zeg ik dan eerlijk, met de metingen erbij.

## 3. Het budget (zuinig en soepel)

Hoogstens 60 beelden per seconde. Een keuze **Zuinig, Normaal of Mooi** bij Instellingen, met een automatische keuze (zoals bij Rommelland en Rommelarend: een telefoon met weinig kernen of geheugen Zuinig, anders Normaal; houdt het apparaat het niet bij, dan een stand lager).

| | Zuinig | Normaal | Mooi |
|---|---|---|---|
| Beelden per seconde | 30 | 60 | 60 |
| Munten in de machine | 500 | 1.000 | 1.600 |
| Munten in de bak (je winst, siermunten) | 300 | 1.000 | 2.000 |
| Tegelijk in de stand "vallen" | hooguit 40 | 80 | 150 |
| Natuurkunde per beeld (in het hulpje) | ≤ 2 ms | ≤ 3 ms | ≤ 5 ms |
| Tekenen per beeld (processor) | ≤ 3 ms | ≤ 4 ms | ≤ 5 ms |
| Tekenopdrachten | ≤ 40 | ≤ 60 | ≤ 90 |
| Driehoeken | ≤ 150.000 | ≤ 400.000 | ≤ 1.000.000 |
| Scherpte | 1 | tot 1,5 | tot 2 |
| Gloed om de lampjes | nee | lichtpuntjes | echte gloed |
| Schaduw onder de munten | een vlekje per munt | zachte schaduwkaart | zachte schaduwkaart, vaker bijgewerkt |
| Weerspiegelingen | eenvoudig | de arcadehal | de arcadehal, en het glas |

**Doelen op echte apparaten**: een MacBook blijft koel en stil (op Normaal samen hooguit een derde van één kern tijdens het spelen), en een gewone telefoon van een paar jaar oud loopt op Normaal op 60 beelden per seconde.

**De slaapstand**: speel je 20 seconden niet, dan maakt de schuiver zijn slag af en stopt hij. Zodra alle munten slapen, rekent en tekent het spel niets meer (de lampjes branden stil). Ook niets in een verborgen tabblad. Een tik, een toets of de muis maakt alles weer wakker.

**Meten**: ik meet in de cloud (Chromium met software-tekenen) op computerformaat (1280 × 800) en telefoonformaat (390 × 844, met een vier keer vertraagde processor): tijd per beeld met het tekenen erbij, de rekentijd van de natuurkunde, en hoeveel munten slapen, schuiven en vallen. Software-tekenen zegt weinig over de grafische kaart, dus de proefpagina krijgt een **meetpaneeltje** (zet `?meet` achter het adres): daarop staan die getallen live, zodat Ruben ze op zijn eigen telefoon en MacBook kan aflezen (een schermafbeelding is genoeg).

## 4. De machine (zo echt mogelijk)

- **De kast**: een gelakte kast met chromen randen (die de lampjes weerspiegelen), een verlicht front, een glazen voorkant en zijkanten, en bovenop een bord met de naam in neonletters. Ledlampjes rondom die rondlopen (één tekenopdracht voor alle lampjes, de kleuren per lampje). Het glas weerspiegelt de lampjes en de hal, met een paar vingerafdrukken en krasjes (zelf getekend, alleen te zien als het licht erop valt).
- **De munten**: metaal (messing en zilver, en een paar gouden), met een **gekartelde rand**, een **afgesleten glans** (elke munt iets anders: de ene glimt, de andere is dof) en een **eigen ontwerp in reliëf**: een vlaai, een kroontje en Moeki, en op de achterkant een getal. Het reliëf is een normal map die het spel zelf tekent (geen plaatjes van buiten).
- **Het speelveld, twee verdiepingen**: bovenin een **gleuf** over de hele breedte; de munt valt rechtop tussen **pinnetjes** (achter het glas) naar beneden en komt op de **bovenste verdieping**: de bovenkant van de schuiver. Een vaste achterwand schraapt de munten eraf als de schuiver terugschuift; ze vallen dan op de **onderste verdieping**. Daar duwt de voorkant van de schuiver alles naar voren. Wat over de voorrand kiept, valt in **de bak** (gewonnen); wat over een zijrand valt, verdwijnt in een **zijgoot** (weg). Zo werken echte muntenschuivers.
- **Licht**: materialen die op het licht reageren (PBR), een omgeving die het spel zelf maakt (een arcadehal met gekleurd licht) voor de weerspiegelingen, zachte schaduwen onder de munten (een kaartje van bovenaf, dat alleen bijgewerkt wordt als er iets bewogen heeft) en gloed om de lampjes.
- **De sfeer**: achter de kast een arcadehal, onscherp: andere automaten, een grijpkraan, gekleurde lichtjes die zachtjes knipperen (één plaatje dat het spel zelf tekent, met een beetje diepte als je beweegt). Alles eigen tekeningen.
- **De camera**: je staat voor de kast en kijkt erin, een beetje van boven. Een knopje om dichterbij te kijken. Op Mooi beweegt het beeld een klein beetje mee met de muis of het kantelen van je telefoon.
- three.js **r128** van cdnjs met dezelfde SRI-hash als Rommelland, Rommelarend en de Rommelgracht (staat dus vaak al in de opslag van de browser). Alle munten in één keer (InstancedMesh), met eenvoudiger munten op Zuinig en een telefoon.

## 5. Spelen

- **Munten erin**: tik of klik boven de gleuf waar de munt moet vallen. Houd je ingedrukt, dan valt er een rijtje (hooguit 4 per seconde). Op het toetsenbord: pijltjes om te mikken, spatie om te laten vallen (ingedrukt houden voor een rijtje). Een munt kost 1 munt uit je bakje.
- **De bonusgleuf**: onderaan de pinnetjes zitten drie uitgangen; de middelste heeft een lampje en het woord BONUS. Valt je munt daardoorheen, dan draait **het rad** (of lopen de lampjes rond). Of je munt daar komt, is gewone natuurkunde (de pinnetjes); wat het rad geeft, komt uit `crypto.getRandomValues`, en het rad **toont altijd zijn kansen**:

  | Vakje | Aantal van de 16 | Kans | Wat |
  |---|---|---|---|
  | 5 munten | 6 | 37,5% | 5 munten vallen in de machine |
  | 10 munten | 4 | 25% | 10 munten |
  | 20 munten | 2 | 12,5% | 20 munten |
  | Muntenregen | 1 | 6,25% | 40 munten, verspreid over de bovenste verdieping |
  | Lampjesronde | 1 | 6,25% | 10 seconden lang valt elke munt dubbel |
  | Voorwerp | 1 | 6,25% | een voorwerp voor je verzameling valt in de machine |
  | Gouden munt | 1 | 6,25% | een grote gouden munt (in je bakje 25 munten waard) |

  De prijzen vallen **als echte munten in de machine**: je moet ze er nog uit duwen. De getallen stel ik af met een robot (zie 7), en ze staan ook bij "Hoe eerlijk is het?".
- **Geluid** (Web Audio, alles zelf gemaakt, pas na de eerste tik): het rinkelen van munten (metaal op metaal, op glas, op de bak; elk tikje iets anders, en als er veel tegelijk vallen, worden ze samengevoegd tot één rinkelende golf in plaats van honderd losse tikjes), het zoemen en klikken van de schuiver, een doffe klap als er een plak munten over de rand gaat, het ratelen van het rad, en zachte arcademuziek met de hal op de achtergrond. Knoppen voor geluid en muziek.
- **Trillen**: een kort tikje als er munten in je bakje vallen (alleen op telefoons die het kunnen; een iPhone kan het niet vanuit een webpagina).
- **Minder beweging**: geen camerabeweging, geen knipperende lampjes (ze branden stil), geen flitsen. De munten bewegen wel, want dat is het spel.
- Een schermlezer hoort wat er gebeurt ("12 munten gewonnen", "Bonus! Het rad draait").

## 6. Bijzondere voorwerpen en de verzameling

Tussen de munten liggen af en toe **bijzondere voorwerpen**. Valt er een in de bak, dan komt het in je verzameling (heb je hem al, dan is hij 25 munten waard). Ze komen op drie manieren in de machine: van het rad (vakje Voorwerp), **elke dag één dagprijs** (bij je eerste munt van de dag ligt er een voorwerp dat je nog niet hebt op de bovenste verdieping), en heel af en toe met een gewone munt (1 op 250, uit `crypto.getRandomValues`, en ook die kans staat bij "Hoe eerlijk is het?").

**24 stukken**, in drie series (het totaal komt als `voortgangTotaal` in de opslag):

- **Beeldjes uit de spellen** (12, op een rond voetstukje): een vlaai (Vlaaienbakker), een kroontje (Rommelkroon), Moeki en Floortje (Huis op stelten), een Rommelbeest, een papieren vliegtuigje (Vouwvlieger), een arend (Rommelarend), een duikhelm (Ruben de Duiker), de productiefiets, een duim (Rob 👍), een speelfiche (Casino Rommelroyaal) en een muzieknoot (Coulissenkoor).
- **Edelstenen** (6): robijn, saffier, smaragd, amethist, topaas en (heel zeldzaam) een diamant. Geslepen, met licht dat erdoorheen schittert.
- **Bijzondere munten** (6): de grote gouden Rommelmunt, een zilveren munt, een koperen centje met een gaatje, een piratenmunt, een sterrenmunt en een munt uit 1926 (van het Rommelhotel).

Voor de natuurkunde heeft elk voorwerp een rond voetstukje of een ronde vorm, zodat het zich gedraagt als een dikke munt; daarop staat de tekening. De verzameling is een kastje met vakjes (zoals de prijzenkast van Zoals in de reclame); een leeg vakje toont een schaduw.

**Feestvoorwerpen** (tellen niet mee voor de 24, net als de Feestset van Rommelbeesten): met de kerst een kerstmunt, met oud en nieuw een vuurwerkmunt (zie 9).

## 7. Speelmunten en eerlijkheid

- **Alleen speelmunten**, buiten dit spel niets waard. Je begint met 150. **Elke dag 100 gratis munten** (bij je eerste bezoek van de dag), zodat je nooit blijft steken.
- **Het huis wint een beetje, net als bij een echte muntenschuiver**: door de zijgoten. Ik stel de machine af met een **robot** die uren speelt met dezelfde natuurkunde (in Node, versneld): met de bonussen erbij moet er gemiddeld **88 tot 96 van elke 100 munten** terugkomen. Een paneeltje **"Hoe eerlijk is het?"** legt dat uit, met de gemeten getallen, de kansen van het rad en de voorwerpen, en hoeveel van jouw munten in de bak en in de zijgoten vielen (zoals "Waarom het huis altijd wint" in het casino).
- **Geen manier om eindeloos munten te maken**:
  - elke munt is een echt ding: hij telt precies één keer, op het moment dat hij in de bak valt;
  - je munten en het aantal munten in de machine worden **samen** bewaard: dicht doen en opnieuw openen maakt geen munten erbij;
  - kan de stapel van dit apparaat niet geladen worden (een ander apparaat, of de opslag is weg), dan maakt het spel een geloofwaardige stapel met **precies evenveel munten**, die niet vlak bij de rand liggen (dus geen voordeel);
  - een voorwerp in de machine staat ook in de opslag; het kan niet dubbel uit de machine komen.
- **Even pauze**: zoals in het casino vraagt Moeki na een tijdje spelen (20, 30, 45 of 60 minuten, bij Instellingen) of je even iets anders wilt doen. Geen aftelklokken, geen "nog één keer" na verlies.
- **Los van het casino**: de munten en de fiches van Casino Rommelroyaal hebben niets met elkaar te maken. Het casino heeft al een kleine Muntjesduwer (2D, met fiches) op de Boulevard. **Voorstel**: daar een deurtje "Naar de echte muntenschuiver" (alleen een link; er gaat niets van het een naar het ander).

## 8. Bewaren en koppelen

- **`rommelschuiver-v1`** (in `SLEUTELS`, gaat mee met koppelen; een paar honderd tekens):
  `{ v: 1, m: munten in je bakje, mm: munten in de machine, mi: [voorwerpen in de machine], d: laatste dag gratis munten, dp: laatste dag van de dagprijs, n: munten ingegooid (ooit), vz: [je verzameling], st: { uit: in de bak, zij: in de zijgoot, bonus, rad: {...} }, inst: { geluid, muziek, pauze }, voortgangTotaal: 24 }`
- **De REGELS** (in het gedeelde blok én de scoreserver, letterlijk gelijk), zoals bij het casino (`geld: true`): je munten, de machine en de dagen (`m`, `mm`, `mi`, `d`, `dp`) komen **in één keer** van de versie met de meeste voortgang (de maat: munten ingegooid, dan je verzameling); ze worden nooit opgeteld. De verzameling wordt samengevoegd (`samenLijst`), de tellers ook. Omdat er geld in zit, vraagt een tweede apparaat waar je verder wilt spelen (zoals bij het casino). Gedeeld blok `BV = 17`, scoreserver `BLOK_NU = 17`.
- **Hoe de munten in de machine liggen** staat alleen op dit apparaat, in **`rommelschuiver-machine`** (bewust niet in `SLEUTELS`): per munt de plek, de stand en het ontwerp, in een paar bytes (ongeveer 8 bytes per munt, 1.000 munten zo'n 11 kB), plus een controlegetal dat bij `rommelschuiver-v1` hoort. Klopt dat niet, of is het kapot, dan maakt het spel een geloofwaardige stapel (zie 7).
- **`rommelschuiver-apparaat`** (ook niet in `SLEUTELS`): de kwaliteit (Zuinig, Normaal, Mooi, automatisch).
- Beide staan straks in `privacy.html`, ook in de tabel "Hoe lang".

## 9. Op de rest van de site

- **De scoreserver** (versie 2026-11-15): de REGELS voor `rommelschuiver-v1`, `TIJD_SPEL` voor de tijdmachine, `BLOK_NU = 17`, `/status` zegt `schuiver: 1`, en (als Ruben dat wil) het scorebord `schuiver`. In Cloudflare draait nu **2026-11-14** (dat zegt `/status`); **Ruben, wil je die code plakken als we bij stap 3 zijn?** Ik bouw de nieuwe versie daarop, en lever hem als volledig bestand. De pagina gaat pas online als die in Cloudflare staat (de proefpagina mag eerder: die bewaart nog niets dat meegaat met koppelen).
- **Het scorebord** (optioneel): spel `schuiver`, score = stukken in je verzameling (hooguit 24), extra = alle munten die je ooit won. Staat op `scorebord.html`.
- **De homepage** (`homepage-onderdelen.js`): icoon `schuiver` (een kastje met een schuiver en munten die over de rand vallen; ook het favicon en het icoon in de kop van het spel), categorie Snel een potje, onderschrift "Duw de muntjes over de rand", voortgang "x van 24 voorwerpen". Het label zet Ruben zelf met de werkplaats.
- **De banner** in `banners.json` (en een ontwerp in `banners.js`) met grappige teksten, zoals "Nog één muntje en dan valt die rand…", "Moeki ligt op het randje. Duw hem eraf!", "Geen echt geld. Wel echt rinkelen."
- **De werkplaats**: `SPELICONEN`, `ICOON_OPTIES`, `raadIcoon`, `SPELINFO['rommelschuiver-v1']` (met een cadeautje munten) en `KAN.schuiver`.
- **De feestkalender** (via `Scorebord.feest`, alleen kijken, niets in de feestverzameling):
  - **kerst**: sneeuw op de kast, lichtjes in de hal, en kerstmunten tussen de gewone (een eigen ontwerp: een kerstster), plus het feestvoorwerp **kerstmunt**;
  - **oud en nieuw**: vuurwerk door de grote ramen van de arcadehal (op oudjaar 's avonds, en om middernacht volop), plus het feestvoorwerp **vuurwerkmunt**;
  - **Sinterklaas** (voorstel): chocolademunten in goudpapier tussen de munten.
  - Bij minder beweging of met de versiering uit: geen sneeuw en geen vuurwerk.

## 10. De stappen

1. **Dit plan.** Ruben kiest een naam en zegt ja of nee tegen de keuzes.
2. **De proefpagina**: de kast, de schuiver, de gleuf met de pinnetjes, de twee verdiepingen, de bak en de zijgoten, zoveel munten als soepel kan, munten erin gooien, Zuinig/Normaal/Mooi, de slaapstand en het meetpaneeltje. Nog zonder bonussen, verzameling, scorebord of koppelen. Ik zet hem online op een adres dat nergens gelinkt is (`rubensrommelhoekje.nl/rommelschuiver.html`), zodat Ruben hem op zijn telefoon en MacBook kan proberen. Ik lever de metingen en schermafbeeldingen erbij.
3. **De rest**: bonusgleuf en rad, voorwerpen en de verzameling, het geld en de dagelijkse munten, bewaren en koppelen, "Hoe eerlijk is het?", de pauze, de feestdagen, de scoreserver, de homepage, de banner, de werkplaats en de privacyverklaring.
4. **Testen**:
   - **met code** (in Node, met de natuurkunde uit de pagina): geen munten door de vloer of door elkaar, geen munten die blijven trillen, elke munt in de bak telt precies één keer, geen manier om eindeloos munten te maken (ook niet met opnieuw laden), de kansen van het rad kloppen met wat het rad toont (een miljoen keer draaien), de robot voor de terugbetaling, bewaren en laden (ook kapotte opslag), en de REGELS met twee en drie apparaten;
   - **in een echte browser** (Chromium, en waar het kan WebKit): telefoon- en computerformaat, licht en donker, met muis, vinger en toetsenbord, minder beweging, de metingen, en geen fouten of overtredingen van het veiligheidsbeleid; alle pagina's met het nieuwe gedeelde blok.
5. **Commit en push** volgens de afspraken: Ruben ziet eerst welke bestanden erin gaan. Vlak ervoor `git pull --rebase`, en de controle dat de gedeelde blokken overal gelijk zijn.
6. **Een overdracht** met de metingen, de natuurkunde, de bonussen, de opslag, de REGELS en de testuitslagen met schermafbeeldingen, en een notitie in CLAUDE.md.

## 11. Vragen voor Ruben

1. **Welke naam?** Rommelschuiver, De Muntenschuiver, Kermiskiepers, Kiepkast, of iets anders?
2. **Eigen natuurkunde** (met Rapier als reserve als het niet goed genoeg wordt): akkoord?
3. **Het scorebord**: wil je de verzameling op het scorebord, of liever niet?
4. **Een deurtje vanuit de Muntjesduwer in het casino**: ja of nee?
5. **De pauze van Moeki** (zoals in het casino): ja of nee?
6. **Sinterklaas**: ook chocolademunten tussen de munten?
7. **De bonussen en de verzameling** (hoofdstuk 5 en 6): zo goed, of wil je andere voorwerpen?

## 12. De proefpagina (stap 2, 21 november 2026)

**Wat erin zit**: de kast (gelakt, chroom, een neonbord met ledlampjes die rondlopen, een glazen voorruit met vingerafdrukken, bedrukte binnenwanden), de gleuf met een wagentje dat meeschuift, het pinnenbord (sinds 22 november weg, zie hieronder), de twee verdiepingen met de schuiver, de bak met de munten die je won, de zijgoten, en een arcadehal eromheen. De munten hebben een gekartelde rand, slijtage en drie ontwerpen in reliëf (een vlaai, een kroontje en Moeki) met een 1 op de achterkant; messing, en af en toe zilver of koper. Ze weerspiegelen de binnenkant van de kast (één foto rondom bij het opstarten). Zachte schaduwen (op Normaal en Mooi), zoomen (wieltje, knijpen, knop, + en -), Zuinig/Normaal/Mooi, de slaapstand, geluid (rinkelen, de schuiver, de hal) en een meetpaneeltje (`?meet` achter het adres, of bij Instellingen). Nog zonder bonussen, verzameling, geld en koppelen; de munten zijn gratis.

**De natuurkunde** werkt zoals in hoofdstuk 2, in een hulpje (Web Worker uit de pagina zelf). Wat ik onderweg leerde:
- Het evenwicht (hoeveel munten er in de machine blijven) hangt vooral af van de diepte van de onderste verdieping. Met 21 cm diep blijven er zo'n 700 tot 850 munten in de machine. Het aantal munten in de machine is dus voor elke stand hetzelfde (eerlijk); Zuinig, Normaal en Mooi verschillen in de munten in de bak (260, 700, 1.500) en in hoe mooi het getekend wordt.
- Munten die worden geduwd en een rij munten voor zich uit moeten duwen, schuiven over de munt voor hen heen (zo wordt een stapel in elkaar gedrukt in plaats van als geheel te verschuiven).
- Een munt die stil op zijn steun ligt, wordt niet meer opnieuw neergelegd (anders trillen stapels), en munten op de schuiver slapen ten opzichte van de schuiver.

**Gemeten** (21 november 2026; in de cloud, één kern van een Xeon van 2,3 GHz, ongeveer half zo snel als een MacBook met een M-chip; zonder grafische kaart, dus de grafische kant is niet gemeten):

| | Gemeten |
|---|---|
| Natuurkunde per stap bij flink doorspelen (2,5 munten per seconde, Node, zoals in het hulpje) | gemiddeld 2,5 ms, mediaan 1,8 ms, de traagste 10% 5,3 ms, de traagste 1% 7,5 ms |
| Tekenwerk op de pagina per beeld (processor) | computer 2,0 ms; telefoonformaat met een 4 keer vertraagde processor 4,5 ms |
| Tekenopdrachten per beeld | 61 (Zuinig) tot 66 (Normaal) |
| Driehoeken per beeld (met de schaduw erbij) | Zuinig 290.000, Normaal 420.000 |
| Laden tot de knop Speel | computer 3,1 s, telefoonformaat (4 keer vertraagd) 4,0 s |
| Slaapstand | na 20 s niet spelen maakt de schuiver zijn slag af; zodra alles stilligt: 0 rekenstappen en 0 beelden |
| 10 minuten spelen, 4 keer bewaren en laden | elke munt telt precies één keer, 0 fouten |

**Ruben, wil je zo meten?** Open `rubensrommelhoekje.nl/rommelschuiver.html?meet` op je telefoon en je MacBook, speel een minuutje, en stuur een schermafbeelding van het groene paneeltje (en zeg of hij warm wordt of gaat blazen).

### Na Rubens eerste test (22 november 2026)

Ruben speelde op zijn iPhone (Mooi: 51 beelden per seconde, natuurkunde 5,8 ms per stap, 927 munten). Zijn punten, en wat er veranderde:

- **"De munten zijn te zwaar, het lijkt versneld."** De zwaartekracht in het spel is nu 0,45 keer de echte (`ZWAARTE` in de natuurkunde) en de schuiver doet 4,2 seconden over een slag (was 3,6). Munten vallen en kiepen daardoor rustiger, zoals je het van dichtbij ziet. Alle drempels die met snelheid werken (wanneer een munt slaapt, tikt of stilligt) zijn mee aangepast.
- **"Een tweede laag op de schuiver schuift over de eerste laag."** Dat kwam doordat slapende munten op de schuiver voor de munten erboven geen snelheid hadden: de bovenste laag bleef staan terwijl de onderste meereed. Nu rijdt een munt mee met wat eronder ligt (`steunVx`/`steunVz`), ook als dat slaapt. En een munt die in de onderkant van een slapende munt erboven drukt, maakt die wakker, zodat er nooit munten in elkaar blijven zitten.
- **"De muntenvaller mag voorspelbaarder."** Het pinnenbord is weg: je munt valt recht naar beneden waar het wagentje staat (met een heel klein beetje speling), dus je kunt echt mikken. Voor later (stap 3): een bewegende bonuspoort tussen de valler en de schuiver, waar je doorheen kunt mikken.
- **"De kast is wat simpel."** Erbij: een boog bovenop met een verlichte zonnestraal, lampjes langs de bocht en een grote munt met het kroontje die zachtjes heen en weer draait; twee zwaailichten; zijwanden met een holle wang boven de bak, afgeronde randen en een bedrukte buitenkant; langs de voorkant van elke zijwand een chromen buis, een rij lampjes en een neonbuis waarvan de kleur langzaam rondloopt; een band met twee luidsprekers en een naamplaatje boven de ruit; een verlicht bord achter de neonletters; een bak met een opgerolde lip en afgeronde zijkanten; een schuine plaat met gele pijltjes naar de bak; een zwarte plint met een gloed op de vloer; en een speelhaltapijt. Bij minder beweging staat alles stil (vaste kleuren, geen draaiende munt).
- **"Later misschien meerdere kasten met meerdere obstakels?"** Goed idee, voor na de eerste versie: bijvoorbeeld een kast met draaiende schijfjes, een kast met een glijbaan, een kast met een poortje dat open en dicht gaat. De natuurkunde kan dat (vaste vlakken en pinnen staan in één lijst); elke kast krijgt dan een eigen indeling in de opslag per apparaat.

**Na Rubens tweede test (22 november 2026): munten die wegschieten.** Soms schoot een munt na een botsing veel te hard weg. Drie oorzaken, alle drie opgelost:
- Als twee munten in elkaar zaten, duwde het rechtzetten ze met een te hoge snelheid uit elkaar (de snelheid kwam uit hoe ver ze verschoven). Nu levert dat hooguit 4 cm per seconde op (`UITDUW`); alleen echt stuiteren geeft meer.
- Een munt die over de voorrand van de schuiver hing, kreeg ook een botsing met de voorkant van de schuiver (onder de rand), en die duwde hem in één klap tot 7 mm naar voren. Nu telt een vlak niet meer voor een munt die al voorbij een buitenhoek van dat vlak ligt (`bolleRand`); de hoek zelf vangt hem.
- Bij een munt die tegen die voorrand leunde terwijl de schuiver terugging, wees de botsing met de rand soms naar binnen. Nu weet elke rand welke twee vlakken hij heeft, en gaat een munt die erin zit eruit langs het vlak waar dat het minst ver is.
- Daarnaast valt een munt in de gleuf niet harder dan 45 cm per seconde (hij schuurt langs het glas, `VGLEUF`), krijgen munten die geraakt worden hooguit 9 cm per seconde mee, en glijdt een munt op een verdieping niet harder dan 18 cm per seconde.

Gemeten met een robot die drie minuten elke halve seconde een munt gooit: een munt die ineens wegschiet, glijdt daarna meestal 1 à 2 cm, en nooit meer dan 7 cm (eerst tot 26 cm). De oude versie deed het ook al, en nog vaker (625 keer in drie minuten, nu zo'n 55 keer, en veel korter).

**Opnieuw gemeten** (22 november 2026, dezelfde cloudcomputer): natuurkunde bij flink doorspelen gemiddeld 1,2 tot 1,5 ms per stap (de traagste 1% 4 tot 5 ms); na het uitzetten van de schuiver ligt alles binnen 1,1 s stil, zonder munten in elkaar; 10 minuten spelen met 4 keer bewaren en laden telt elke munt precies één keer. Het evenwicht ligt nu rond de 800 munten in de machine (zo'n 460 op de schuiver), en een robot die elke seconde een munt gooit, krijgt er zo'n 95% van terug. Tekenopdrachten per beeld: Normaal 94 (was 66; de nieuwe kast), driehoeken gelijk.

## 13. De economie: waarom je terugkomt (voorstel, 22 november 2026)

Ruben vroeg om "een ijzersterke economie en een reden waarom mensen terug blijven komen", en eerst als plan. **Goedgekeurd door Ruben op 22 november 2026**, met de getallen uit hoofdstuk 15 ("Mijn voorstel"), behalve het weekbord op het scorebord (vraag 6): dat komt er niet. Gebouwd: zie hoofdstuk 18.

### Twee soorten geld

| | **Munten** | **Kaartjes** |
|---|---|---|
| Wat | Je brandstof: je gooit ze in de gleuf | Je spaargeld: punten voor de **Prijzenkraam** |
| Hoe krijg je ze | Elke dag 100 in je **spaarpot**, en alles wat in je bakje valt | Echte **kaartjes** die tussen de munten in de machine liggen (zoals op de kermis), met 5, 10, 25, 50 of 100 erop, en heel soms een gouden kaartje van 250. Valt er een in je bakje, dan krijg je dat aantal |
| Waaraan geef je ze uit | Aan de machine | Aan de Prijzenkraam |

**De gouden regel: munten worden nooit kaartjes, en kaartjes worden nooit munten.** Als je ze zou kunnen wisselen, kan iemand die slim speelt eindeloos rondpompen (munten, kaartjes, munten). Zo kan dat niet.

### Waar het vandaan komt en waar het heen gaat

- **De spaarpot**: elke dag komen er 100 munten in (om middernacht). Hij wacht op je tot hij 300 munten bevat (drie dagen). Mis je een dag, dan ben je niets kwijt; ben je een maand weg, dan krijg je er niet 3.000. Je begint met 150 munten.
- **De machine geeft gemiddeld zo'n 93 van elke 100 munten terug** (de rest valt in de zijgoten; zo werkt een echte muntenschuiver ook). Daardoor kun je met 100 munten ongeveer 1.400 munten in de machine gooien voor ze op zijn. Dat is **zo'n 15 tot 20 minuten spelen per dag**, en dan wacht je spaarpot weer op morgen. Zo bepaalt de machine zelf hoelang een potje duurt, zonder klok of wachttijd.
- **Kaartjes komen in de machine** doordat de machine na elke 20 munten die je erin gooit een nieuw kaartje bovenop de schuiver legt (je ziet het vallen). Welk kaartje het wordt, komt uit `crypto.getRandomValues` en de kansen staan in beeld:

  | Kaartje | Kans | |
  |---|---|---|
  | 5 | 35% | |
  | 10 | 30% | |
  | 25 | 20% | |
  | 50 | 10% | |
  | 100 | 4% | |
  | Gouden kaartje (250) | 1% | |

  Gemiddeld is een kaartje zo'n 22 waard. Een speler die zijn spaarpot leegspeelt, verdient daarmee ongeveer **1.200 tot 1.500 kaartjes per dag**. Kaartjes die nog in de machine liggen, wachten tot morgen.
- **Drie opdrachtjes per dag** (elke dag andere, voor iedereen dezelfde), zoals "Laat 8 munten tegelijk vallen", "Duw een kaartje van 25 of meer eraf", "Gooi 3 munten op dezelfde plek". Elk opdrachtje 50 tot 150 kaartjes. Geen haast: ze gelden de hele dag, en een gemiste dag maakt niets kapot.
- **De dagprijs**: bij je eerste munt van de dag ligt er iets bijzonders bovenop de schuiver: een voorwerp dat je nog niet hebt, of een gouden kaartje. Je moet het er nog wel zelf uitduwen.

### De Prijzenkraam (waar de kaartjes heen gaan)

| Wat | Prijs | Hoelang sparen (bij één keer per dag spelen) |
|---|---|---|
| Een voorwerp voor je verzameling (het valt in de machine, jij duwt het eruit) | 300 tot 1.500 | een halve tot een paar dagen |
| **De tweede kast** | 2.000 | 2 dagen |
| **De derde kast** | 6.000 | ongeveer een week |
| **De vierde kast** | 12.000 | ongeveer twee weken |
| Mooie dingen: andere munten (zilver, koper, regenboog), een andere lak voor de kast, een andere neonkleur | 500 tot 3.000 | |
| **Gouden versies** van de 24 voorwerpen (voor wie alles al heeft) | 5.000 per stuk | maanden |

De prijzen staan vast en ik reken ze na met de robot: hoelang een gewone speler (een kwartier per dag) erover doet om alles te halen. Mijn doel: de tweede kast in de eerste week, alle kasten in de eerste maand, de hele verzameling in twee maanden, en goud voor wie echt alles wil.

### Waarom je terugkomt (zonder trucjes)

1. **Je stapel blijft liggen.** Wat gisteren al half over de rand hing, hangt er vandaag nog. Dat is de echte reden waarom mensen bij een muntenschuiver blijven staan: je wilt weten of hij nu valt.
2. **Je spaarpot is weer vol** (100 munten per dag, tot 300).
3. **Er ligt een dagprijs**, en er zijn **drie nieuwe opdrachtjes**.
4. **Er is iets om naartoe te sparen**: de volgende kast, het volgende voorwerp, goud.
5. **Elke kast is anders** (zie hoofdstuk 14), met eigen kaartjes: in een duurdere kast zijn de kaartjes meer waard, maar kost een munt ook meer (2 of 3 munten).

**Bewust niet**: geen reeks die kapotgaat als je een dag mist, geen aftelklokken, geen "nog één keer" na verlies, geen meldingen die je terugroepen, en niets te koop met echt geld. Moeki vraagt na een tijdje spelen nog steeds of je even pauze wilt (zoals in het casino).

### Waarom hij ijzersterk is

- **Elke munt en elk kaartje is een echt ding** in de natuurkunde: het telt precies één keer, op het moment dat het in je bakje valt.
- **Munten en kaartjes zijn nooit te wisselen** (zie de gouden regel).
- **Je kunt niet terug in de tijd**: je geld en de machine worden samen bewaard; opnieuw laden of de pagina sluiten maakt niets erbij. Kan de machine niet geladen worden, dan komt er een stapel met precies evenveel munten en kaartjes, niet vlak bij de rand.
- **Twee apparaten**: de versie met de meeste voortgang wint in één keer (zoals bij het casino); geld wordt nooit opgeteld. Een tweede apparaat vraagt waar je verder wilt spelen.
- **De machine geeft nooit meer terug dan erin gaat**: ik laat een slimme robot (die mikt op de beste plekken) uren spelen. Komt hij boven de 97 van de 100 uit, dan maak ik de zijgoten iets breder. Zo kan niemand oneindig spelen en dus ook niet oneindig kaartjes halen.
- **Op het scorebord** (als je dat wilt): je verzameling, en een **weekbord met de kaartjes van deze week** (iedereen begint maandag weer bij nul, zoals de Bakwedstrijd), zodat een nieuwe speler ook kan winnen.

### Vragen voor Ruben

1. **Twee soorten geld** (munten om te spelen, kaartjes om te sparen), en ze nooit kunnen wisselen: goed?
2. **De spaarpot**: 100 per dag, hooguit 300: goed?
3. **De kasten vrijspelen met kaartjes** (2.000, 6.000 en 12.000): goed, of liever anders (bijvoorbeeld met opdrachten)?
4. **De Prijzenkraam**: zo, of wil je er andere dingen in?
5. **De opdrachtjes van de dag**: ja of nee?
6. **Het weekbord met kaartjes** op het scorebord: ja of nee?

## 14. Drie nieuwe kasten (22 november 2026)

Ruben: "Nu zijn het ook nog rechte blokken, maak alvast drie andere kasten." Elke kast heeft een eigen speelveld, een eigen kast en een eigen naambord. De natuurkunde blijft dezelfde; ik maak hem geschikt voor andere vormen.

| Kast | Wat is er anders | Hoe hij eruitziet |
|---|---|---|
| **1. De Rommelschuiver** (zoals nu) | Rechte schuiver, rechte rand | Rood en goud, de boog met de kroonmunt |
| **2. De Halvemaan** | De rand is een **grote boog**: in het midden steekt hij ver naar voren, aan de zijkanten buigt hij terug naar de zijgoten. De voorkant van de schuiver is ook rond. Munten vallen dus anders over de rand, en wat aan de zijkant van de boog afglijdt, is weg | Nachtblauw met zilver, sterren en een maan van neon |
| **3. De Flipperkast** | Op de onderste verdieping staan **vijf ronde paaltjes** (bumpers met een rubberen ring) waar de munten omheen moeten. Ze lichten op en tingelen als er een munt tegenaan komt | Groen en geel, met flipperlampjes en pijlen |
| **4. De Draaimolen** | Midden op de onderste verdieping zit een **draaischijf** die langzaam ronddraait en de munten meeneemt, naar de rand of juist ervan weg | Een kermiskast met een gestreepte luifel, spiegeltjes en lampjes, zoals een draaimolen |

Elke kast bewaart zijn eigen stapel (per apparaat). Of je de kasten moet vrijspelen en wat ze kosten, hangt af van de economie (hoofdstuk 13); in de proefversie staan ze allemaal open.

**Gebouwd (22 november 2026, in de proefpagina)**: de knop **Kasten** (bovenin) opent een venster met de vier kasten. Kiezen bewaart eerst de stapel van de kast waar je bent, en laadt dan de andere. Elke kast bewaart zijn eigen stapel in `rommelschuiver-machine-<kast>` (de gewone kast houdt `rommelschuiver-machine`), en de gekozen kast staat in `rommelschuiver-apparaat` (allemaal per apparaat, niet in `SLEUTELS`). Om te testen: `?kast=maan`, `flipper` of `molen` achter het adres.

- **De natuurkunde** kent nu kasten (`KASTEN` en `kastVorm` in de natuurkunde; het tekenen gebruikt dezelfde vorm). De gewone kast gedraagt zich daarna precies hetzelfde als ervoor (nagerekend: bit voor bit dezelfde uitkomst). De Halvemaan heeft een gebogen rand en een ronde schuiver (in 2D loodrecht op de bocht, in 3D als stukjes vlak en rand), de Flipperkast vijf paaltjes (in 2D cirkels, in 3D verende cilinders; een munt die er hard tegenaan komt laat het lampje oplichten en tingelen), en de Draaimolen een draaischijf: munten die erop slapen draaien exact mee (plek, draai en schuinte), munten die er half op liggen worden meegesleept, en de schijf stopt als de schuiver stopt (dan kan alles slapen).
- **Elke kast een eigen uiterlijk**: de lak, het neonbord met de naam, de band op de schuiver, de boog bovenop, de binnenkant en de munt in de boog.
- **Getest** (Node, met de natuurkunde uit de pagina): per kast spelen en de schuiver uit (alles in rust binnen 2,5 s, geen munten in elkaar, niets door de vloer), 10 minuten spelen met 4 keer bewaren en laden (elke munt telt precies één keer), en een robot die een kwartier lang elke seconde een munt gooit: de gewone kast geeft zo'n 94 van de 100 terug, de Flipperkast zo'n 94, de Draaimolen zo'n 92 en de Halvemaan zo'n 88 (daar valt meer in de zijgoten). In de browser: alle vier op computer en telefoon, wisselen tussen de kasten (de stapels blijven bewaard), geen fouten of overtredingen van het veiligheidsbeleid. Tekenopdrachten op Normaal: 96.
- **Nog niet**: de kaartjes (die horen bij de economie, hoofdstuk 13) en het vrijspelen van de kasten.

**Unieker en actievoller (22 november 2026, na Rubens reactie)**:

| Kast | Eigen kop | Eigen vloer en achterwand | Wat er gebeurt |
|---|---|---|---|
| **De Halvemaan** | Een nachthemel met een grote neonmaan en sterren die twinkelen | Nachtblauw staal met sterretjes; een sterrenhemel met een maan en vallende sterren | **Springtij**: elke zesde slag gaat de schuiver bijna twee keer zo ver (`getij` in `KASTEN`). Een slag van tevoren knippert het bord SPRINGTIJ, tijdens springtij flitsen alle lampjes en klinkt er een aanzwellende golf |
| **De Flipperkast** | Een flipperkop met een beschilderd glas en een scorebord met oranje cijfers | Een flipperveld met banen en sterren; bliksems en BUMPER! | **Bumpers schieten**: raakt een munt een bumper, dan schiet die hem weg (150 mm/s, daarna even rust; `schop`). Het lampje flitst, er klinkt een belletje, alle lampjes flitsen even, en het scorebord telt mee (bewaard per apparaat). Zo'n 40 keer per minuut |
| **De Draaimolen** | Een draaimolen met een gestreept dak, schulpjes, lampjes die rondlopen en zes paardjes die op en neer gaan; hij draait mee met de schijf | Houten planken; een tent met vlaggetjes en spiegeltjes | De schijf **draait heen en weer**: sneller, langzamer, stil en dan de andere kant op (elke 24 seconden een heel rondje heen en weer; `periode`). Een **draaiorgel** speelt een eigen walsje, zo snel als de schijf draait, en stil als hij stilstaat |

De munt met het kroontje en de zwaailichten horen nu alleen bij de gewone kast. Bij minder beweging staan de paardjes, sterren en het bord stil.

**Opnieuw gemeten**: de gewone kast gedraagt zich nog steeds bit voor bit hetzelfde; alle kasten komen tot rust zonder munten in elkaar. Een robot (een munt per seconde, een kwartier): de Flipperkast geeft zo'n 92 van de 100 terug, de Draaimolen zo'n 89 en de Halvemaan zo'n 87 (dat getal klimt nog: na een kwartier groeit de stapel daar nog). In de Draaimolen blijven meer munten wakker (de schijf roert de hele onderste verdieping om): de natuurkunde kost daar ongeveer twee keer zoveel (in Node 2,7 ms per stap, de gewone kast 1,3 ms). Tekenopdrachten op Normaal: 98 tot 108.

## 15. De simulatie van de economie (22 november 2026)

Ruben vroeg om de vragen van hoofdstuk 13 opnieuw te stellen, met suggesties na een kleine simulatie.

**Eerst gemeten met de echte natuurkunde** (een robot, per kast 25 minuten, een munt per seconde, elke munt gevolgd):

| Kast | Van de munten die eruit vallen, in de bak | Hoelang een munt (of kaartje) in de machine ligt |
|---|---|---|
| De Rommelschuiver | 94 van de 100 | meestal 560 tot 930 ingegooide munten (zo'n 10 minuten spelen) |
| De Halvemaan | 83 | 480 tot 930 |
| De Flipperkast | 89 | 540 tot 950 |
| De Draaimolen | 95 | 450 tot 940 |

Een kaartje dat vandaag in de machine valt, komt er dus pas na zo'n 10 minuten spelen uit: vaak in een volgende beurt. Dat is goed voor terugkomen ("er ligt nog een kaartje van 100 bijna over de rand").

**Daarna 60 dagen gespeeld** (`economie.js` in de kladmap; per regel het gemiddelde van 5 keer), met drie soorten spelers: elke dag een kwartiertje (hooguit 1.500 munten), elke dag tot de munten op zijn (en goed mikken, 3 van de 100 beter), en om de drie dagen.

| | Speeltijd per dag | Kaartjes per dag | Kast 2 | Kast 3 | Kast 4 | Hele verzameling |
|---|---|---|---|---|---|---|
| Het voorstel van hoofdstuk 13, met de kasten zoals ze nu zijn | 19 min (goede speler 54 min) | 1.400 (goede speler 4.600) | dag 2 | dag 13 | dag 27 | niet in 60 dagen |
| Kasten afgesteld op 92 tot 93 van de 100, wisselen tussen kasten, dagprijs elke 3e dag een voorwerp | 19 min (goede speler 26) | 1.475 (goede speler 2.400) | dag 2 | dag 8 | dag 18 | dag 34 |
| Idem, spaarpot 75 per dag (hooguit 150) | 14 min | 1.130 | dag 3 | dag 9 | dag 22 | dag 47 |
| Idem, spaarpot 150 per dag (hooguit 450) | 25 min (goede speler 40) | 1.780 | dag 2 | dag 6 | dag 14 | dag 27 |
| **Mijn voorstel**: afgesteld, spaarpot 100 (hooguit 300), kasten 2.000 / 8.000 / 18.000 | **19 min** (goede speler 25) | **1.485** (goede speler 2.360) | **dag 2** | **dag 10** | **dag 23** | **dag 39** |

Om de drie dagen spelen (mijn voorstel): 30 minuten per keer, kast 2 op dag 4, kast 3 op dag 17, kast 4 op dag 41. Niemand komt ooit zonder munten te zitten (de spaarpot vult altijd bij).

**Wat de simulatie liet zien**:
- **Een goede speler liep weg** in de gewone kast: die geeft hem 97 van de 100 terug, dus kan hij bijna een uur spelen op 100 munten en verdient hij drie keer zoveel kaartjes. Als alle kasten op 92 tot 93 van de 100 staan, verdient een goede speler zo'n anderhalf keer zoveel. Dat is eerlijk: goed spelen loont, maar niemand loopt weg.
- **Kasten verschillen te veel**: de Halvemaan geeft 83 terug, de Draaimolen 95. Dan speelt iedereen alleen nog in de Draaimolen. Afstellen (de bak van de Halvemaan iets breder, de zijgoten van de Draaimolen iets breder) maakt ze gelijkwaardig.
- **De dagprijs elke dag een voorwerp** maakt de verzameling in drie weken af, ook zonder kaartjes. Elke derde dag een voorwerp (en anders een gouden kaartje van 250) laat de verzameling ongeveer vijf à zes weken duren.
- **Voorwerpen kunnen in een kast blijven liggen** als je daar niet meer speelt. Daarom: een voorwerp uit de Prijzenkraam valt in de kast waar je op dat moment speelt.

## 16. Een volle kast (22 november 2026, na Rubens test met een andere speler)

Iemand gooide er meer dan 5.000 munten in: de kast zat vol (1.635 munten), het beeld zakte naar 20 per seconde, de natuurkunde kostte 24 ms per stap, en achterin sprongen de munten. Nagebootst met een robot die lang drie munten per seconde gooit.

- **Waarom het sprong**: tegen de achterwand bovenin groeide een toren van wel 13 munten hoog. De munten daar lagen steeds op de schuinste stand die de natuurkunde toestaat (28 graden) en gingen op en neer. Echte munten glijden van zo'n steile helling af; dat zat er nog niet in. Nu glijdt een munt die steiler ligt dan de wrijving kan houden (`HELLING_GLIJ`, ongeveer 18 graden) van de helling af. Daarnaast geeft omhoog geduwd worden door de steun geen vaart meer naar boven (`OPVAART`), en wiebelt een munt minder na (`KANTELDEMP`). Gemeten in een volle kast: munten die echt springen van zo'n 120 naar 12, en geen torens meer.
- **De kast kan niet meer overvol raken**: zitten er 1.000 munten in (sinds hoofdstuk 21: 1.250), dan neemt de gleuf even niets aan ("De kast zit vol · even wachten"); zodra er munten uit vallen, kan het weer. Gewoon spelen komt daar niet aan (dan liggen er zo'n 750 tot 900 munten in). Ingedrukt houden laat nu hooguit drie munten per seconde vallen (was vier).
- **Het hulpje rekent per keer hooguit zo'n 12 ms**: wordt het toch zwaar, dan loopt de kast heel even trager, maar het beeld blijft vloeiend.
- Opnieuw getest: alle kasten komen tot rust zonder munten in elkaar, 10 minuten spelen met bewaren en laden telt elke munt precies één keer, wegschietende munten nog even weinig, en in de browser geen fouten.

## 17. De trechter (22 november 2026, Rubens idee)

Ruben: "Laat ze maar in een soort van trechter vallen, dus dat ze helemaal weg zijn." In de bak lag een plaatje van de munten die je won (Normaal 700, Mooi 1.500): dat kostte bij het tekenen 17 tot 31% van alle driehoeken, en een lege bak kostte evenveel.

- **De bak is een trechter geworden**: een trechter van geborsteld staal met een band in de kleur van de kast en een neonring om het gat. Een munt die over de rand valt, komt neer op de trechter, draait steeds sneller rond naar het gat (zoals water in een afvoer), kantelt het gat in en is weg (ruim een seconde). De ring licht op als er iets in valt. De munt heeft hetzelfde uiterlijk als de munt die viel (eigen InstancedMesh met hooguit 120 tegelijk, `G.trechter`, `nieuweValler` en `updateVallers`).
- **De voorkant van de trog is van plexiglas**, zodat je de munten ook in het gewone beeld in de trechter ziet verdwijnen. De onderkast is daarvoor bovenin hol gemaakt.
- **Voor de natuurkunde verandert er niets**: een munt in de bak was daar al weg.
- **Gemeten** (computer, Normaal): driehoeken van 434.000 naar 364.000, geen fouten; de slaapstand werkt nog (na 30 s niets doen slaapt alles).

## 18. De economie, gebouwd (22 november 2026)

Ruben: "Voor de economie is alles goed, behalve het scorebord (vraag 6). Dat hoeft niet online te komen." Gebouwd met de getallen van hoofdstuk 15: je begint met 150 munten, de spaarpot krijgt er elke dag 100 bij (hooguit 300), om de 20 munten valt er een kaartje in de kast, de kasten kosten 2.000, 8.000 en 18.000 kaartjes (je kiest zelf welke), een voorwerp 600, de mooie dingen samen 12.500, goud 5.000 per stuk, drie opdrachtjes per dag van 100 kaartjes, en de dagprijs elke derde dag een voorwerp (anders een gouden kaartje van 250). Er komt niets op het scorebord (ook de verzameling niet).

- **De rekenregels** staan in de pagina in `ROMMELECO` (tussen `// ==== ECONOMIE begin` en `// ==== ECONOMIE eind`), zonder pagina, in Node te testen. Daarin ook de 24 voorwerpen (`VOORWERPEN`), de mooie dingen (`MOOI`) en de opdrachtjes (`OPDRACHTEN`). **Nieuwe dingen altijd achteraan, en nooit een nummer of id veranderen** (ze staan in de opslag).
- **Kaartjes en voorwerpen zijn echte dingen in de kast**: ze zijn voor de natuurkunde een munt met een andere soort (kaartjes 10 tot en met 15, voorwerpen 32 en verder), dus ze schuiven, kiepen en vallen precies als munten. Ze krijgen alleen een eigen tekening: een kartonnen kaartje (past binnen een munt), een beeldje op een gouden voetstukje (het plaatje kijkt altijd naar je toe), een edelsteen op een zilveren zetting, of een bijzondere munt. Een voorwerp dat in een zijgoot valt, gooit de kast er opnieuw in: je bent nooit een voorwerp kwijt.
- **Echt toeval** (`crypto.getRandomValues`) voor welk kaartje en welke dagprijs. De kansen staan in de kraam bij "Eerlijk?".
- **Bewaren, eerlijk**: je munten en de stapel worden altijd samen bewaard (hooguit eens per anderhalve seconde als er iets veranderde, en meteen als je het tabblad verlaat). Het hulpje gooit eerst wat er nog in de gleuf moest, en maakt dan pas de foto van de stapel; zolang die foto onderweg is, rekent het niet verder. Zo horen de stapel en je munten altijd precies bij elkaar. De stapel krijgt een vingerafdruk (`h`), die ook in `rommelschuiver-v1` staat. Klopt die niet (een ander apparaat, of de stapel is weg), dan legt de kast een nieuwe stapel met precies dezelfde munten, kaartjes en voorwerpen, 4,5 cm verder van de rand (dus geen voordeel). De pagina sluiten kan dus nooit munten opleveren of kosten; hooguit is de laatste anderhalve seconde er niet meer.
- **De opslag** `rommelschuiver-v1` (een paar honderd tekens tot 2 kB): `m` munten, `k` kaartjes, `pot` en `pd` (de spaarpot en de laatste dag dat hij werd bijgevuld), `open` (de kasten), per kast in `kast` het aantal munten `mm`, de kaartjes `kk`, de voorwerpen `vw`, de teller voor de kaartjes `t` en de vingerafdruk `h`, `vz` (de verzameling), `goud`, `mooi`, `kies`, `dp` (de dag van de laatste dagprijs), `op` (de opdrachtjes van vandaag) en `st` (tellers). De stapels per kast staan zoals eerst in `rommelschuiver-machine` (nu `v: 2`, met `h`). Een stapel uit de proefversie wordt de eerste keer gewoon overgenomen.
- **Voorlopig alleen op dit apparaat**: `rommelschuiver-v1` staat nog niet in `SLEUTELS`. Daarvoor moeten eerst de REGELS in de scoreserver en het gedeelde blok: `'rommelschuiver-v1': { geheel: true }` in `SPEL`, en in `MAAT` `s => [getal((s.st || {}).n), lijst(s.vz).length + lijst(s.goud).length, lijst(s.open).length]` (munten ingegooid, dan de verzameling, dan de kasten), plus `TIJD_SPEL` in de scoreserver, `BV = 17` en `BLOK_NU = 17`.
- **De Prijzenkraam** (knop Kraam, met een rood stipje als je iets kunt kopen of er iets nieuws is): Kraam (kasten, voorwerpen, mooie dingen, goud), Verzameling (drie series, een schaduw voor wat je nog niet hebt), Opdrachtjes (met de dagprijs en de spaarpot), en Eerlijk? (wat de kasten teruggeven, de kansen van de kaartjes, de regels, en je eigen getallen). Iets moois gebruiken laadt de kast even opnieuw. Een kast open je in het venster Kasten (twee keer tikken).
- **De pauze**: na 20, 30 (standaard), 45 of 60 minuten spelen vraagt Moeki of je even iets anders wilt doen (Instellingen, sessionStorage `rommelschuiver-speeltijd`).
- **Afgesteld op ongeveer 92 van de 100** (robot, 30 minuten per meting, een munt per seconde; van wat eruit valt het deel in de trechter): de Rommelschuiver 92,9 en de Flipperkast 92,7 (zoals ze waren), de Halvemaan 92,0 (de trechter 233,5 breed, was 216: 84,0), de Draaimolen 91,8 (de zijgoten iets breder, `XF: 231,5`, was 234: 93,8). Een meting schommelt ongeveer 1 punt.
- **Getest**: de rekenregels in Node (spaarpot, gooien, kaartjes en hun kansen, wat in de trechter en de zijgoot valt, opdrachtjes een jaar lang, de dagprijs en hoe zeldzaam de diamant is, de kraam, rare opslag); in Chromium: een nieuw spel, de spaarpot, gooien tot de munten op zijn, kaartjes en voorwerpen in de kast en in de trechter, herladen (dezelfde stapel en dezelfde munten), de stapel weg (een nagemaakte stapel met precies dezelfde inhoud: 848 munten voor en na), een kast openen, gouden neon, de pauze, op 1280, 390 (donker) en 360 breed, zonder fouten of overtredingen van het veiligheidsbeleid.

## 19. Rubens reactie op de economie (22 november 2026)

Ruben: "Ik vind de beeldjes van Moeki en Floortje lelijk, dus alleen edelstenen en bijzondere munten. De spaarpot heeft geen limiet, anders kom je er misschien heel snel aan. De prijzen moeten mooier en op een andere manier in de kast. Wellicht een andere kleine kans mini game? Pauze van de schuiver hoeft pas na 5 minuten."

- **De verzameling: 12 edelstenen en 12 bijzondere munten** (nog steeds 24, zodat de balans van hoofdstuk 15 gelijk blijft; omdat de economie nog nergens online stond, konden de nummers nog veranderen). Edelstenen: robijn, saffier, smaragd, amethist, topaas, diamant (zeldzaam), aquamarijn, roze toermalijn, peridot, granaat, opaal en maansteen, elk met een eigen slijpvorm (rond, ovaal, rechthoek, peer, kussen, driehoek, hart, marquise, achthoek, en een gladde bol voor opaal en maansteen). In 3D zijn het echte facetten (`steenGeo`, uit de omtrek van `snede`), in een metalen kommetje met pootjes op een schijfje, zoals bij een ring; de diamant heeft kleurtjes in zijn facetten, de opaal regenboogvlekjes en de maansteen een blauwe gloed. Munten: de gouden Rommelmunt, een zilveren sterrenmunt, een koperen centje met een gaatje, een piratenmunt, een nachtmunt, een munt uit 1926, en nieuw een klavermunt, een halvemaanmunt, een bliksemmunt, een paardjesmunt, een zonnemunt en een ankermunt. In 3D met reliëf (de tekening is ook de bumpmap) en een gekartelde rand.
- **Het prijzenluikje**: een prijs (de dagprijs, een voorwerp uit de kraam, en een voorwerp dat in de zijgoot viel) komt niet meer door de gleuf, maar uit een luikje in de achterwand, vlak boven de bovenste verdieping: het klepje gaat open, het bordje PRIJS en twaalf lampjes knipperen, er klinkt een fanfaretje, en de prijs schuift plat naar buiten (`luik` in de natuurkunde, `luikPrijs` in het spel; in het hulpje een gooi `[plek, soort, 1]`).
- **De spaarpot heeft geen grens meer**: elke dag 100 munten erbij, hoe lang je ook weg was. Een klok die vooruit liep, telt niet (dan begint het tellen opnieuw); een klok die je zelf vooruit zet, zou wel munten opleveren (net als in de andere spellen vertrouwt het spel de klok van het apparaat).
- **De schuiver rust pas na 5 minuten** zonder spelen (`RUST_NA`, was 20 seconden). De pauze van Moeki telt alleen de tijd dat je echt speelt (een tik in de laatste 30 seconden), en toont nu het pixelportret van Moeki uit Huis op stelten.
- **Getest**: de rekenregels in Node, en in Chromium de kraam, de verzameling, de prijzen in de kast en het luikje, herladen en een nagemaakte stapel (845 munten voor en na, dezelfde kaartjes en prijzen), zonder fouten of overtredingen van het veiligheidsbeleid.
- **Nog open**: een klein kansspelletje voor de prijzen (een voorstel ligt bij Ruben), en de scoreserver (de code staat nergens anders dan in Cloudflare en bij Ruben).

## 20. De Prijzenpoort en het Rad (22 november 2026, keuze A van Ruben)

Ruben koos uit drie voorstellen voor A: prijzen win je met een klein kansspelletje in de kast, en de kraam verkoopt ze niet meer.

- **De Prijzenpoort**: een gouden ringetje met lampjes schuift in de gleuf heen en weer (op 198 mm hoogte, 188 mm naar links en rechts, één keer heen en weer in 6,5 s). Valt je munt erdoorheen, dan draait het rad. Na elke draai is de poort 25 seconden dicht (de lampjes lopen rood vol). Het spel zelf kijkt dat na, zonder iets aan de natuurkunde te veranderen: het ziet in de plekken van de munten wanneer een munt die hoogte passeert, en waar het poortje op dat moment was (`poortKijk`, in de tijd van de natuurkunde).
- **Het Rad** (op de achterwand, tussen het luikje en het poortje): 16 vakjes (`RAD` in de economie): 6 keer Superduw (de schuiver duwt 3 slagen extra ver, net als het springtij van de Halvemaan: `superduw` in de natuurkunde, 1,45 keer zo ver), 4 keer een munt, 3 keer een kaartje, 1 keer een muntenregen van 5, 1 keer 3 kaartjes, en 1 keer de ★. Op de ★ draait het hartje van het rad (6 vakjes): 1 op 6 is een prijs (een edelsteen of bijzondere munt die je nog niet hebt, of een gouden kaartje van 250 als je ze allemaal hebt), anders een kaartje. Een prijs dus 1 op 96 draaien. Alles komt uit het prijzenluikje, en de uitkomst ligt meteen vast (echt toeval, `ECO.radDraai`); het draaien laat hem alleen zien. Bij minder beweging draait het rad kort.
- **Afgesteld met een simulatie** (`poort_sim.js` en `econ_rad.js` in de kladmap): het poortje geeft een draai per ongeveer 45 tot 55 munten (ook als je goed mikt, door de rust van 25 seconden). Met een muntenregen van 8 en 2 munten per vakje speelde een heel goede speler bijna gratis (49 minuten per dag); met 1 munt en een regen van 5 blijft het in balans:

  | Speler | Minuten per dag | Kaartjes per dag | Draaien per dag | Kast 2, 3, 4 | Hele verzameling | Goud na 60 dagen |
  |---|---|---|---|---|---|---|
  | Elke dag een kwartiertje | 22 | 1.870 | 27 | dag 2, 8, 19 | dag 44 | 14 |
  | Elke dag tot de munten op zijn (goed) | 37 | 3.690 | 56 | dag 1, 4, 12 | dag 31 | 24 |
  | Om de drie dagen | 30 | 2.190 | 36 | dag 4, 14, 37 | na dag 60 | 0 |

- **De kraam** verkoopt geen prijzen meer (alleen kasten, mooie dingen en goud), en legt uit hoe je ze wint. Bij Eerlijk? staan de kansen van het rad. Nieuw opdrachtje (achteraan): "Laat het rad 3 keer draaien".
- **Getest**: de rekenregels in Node (elk vakje even vaak, de jackpot 1 op 6, een prijs staat meteen in de kast), en in Chromium: munten door het poortje mikken, het rad, een jackpot met de prijs uit het luikje, de kraam, op 1000 en 390 breed, zonder fouten.

## 21. Kaartjes op de eerste stapel, muntenringen en een hogere grens (22 november 2026, Rubens reactie)

- **De eerste stapel van een kast** heeft meteen kaartjes bovenop de munten: in de Rommelschuiver 10, de Halvemaan 12, de Flipperkast 14 en de Draaimolen 16 (`START_KAARTJES` in het spel). Ze komen met hetzelfde toeval als de kaartjes die je verdient (`ECO.trekKaartje`), en liggen alleen op munten waar niets bovenop ligt, niet vlak bij de rand (`beginStapel` in het hulpje).
- **Muntenringen** in de latere kasten (eerst rechte torens; Ruben stuurde een plaatje van een ring en wilde liever dat): 10 lagen van 8 munten in een kring, elke laag een kwart stap verder gedraaid, zodat er schuine strengen omhoog lopen, als een opgerold touw (`ring` in de natuurkunde, `RINGEN` in het spel: [x, z, lagen]). Het midden is hol, met twee kaartjes erin, en in de bovenste laag ligt er nog een. De Halvemaan heeft 2 ringen, de Flipperkast 3 (tussen de paaltjes) en de Draaimolen 3 (een op de draaischijf). Getest in Node met drie zaadjes: 10 lagen blijft zonder schuiver precies staan (bij 12 viel er soms een stukje van de bovenkant af); als de schuiver ze omduwt, gaat er niets harder dan 300 mm/s. Een ring van 80 munten maakt de eerste stapel zo'n 30 munten voller (er gaan ook munten weg op die plek).
- Dit geldt alleen voor een **gloednieuwe** stapel (een nieuwe speler, of een kast die je net opent). Een stapel die er al is, blijft zoals hij is, ook met "Leg de stapel opnieuw" (die legt precies dezelfde munten en kaartjes terug).
- **De grens van een volle kast** is 1.250 munten (was 1.000). Gemeten met een robot die 10 minuten zonder ophouden gooit: met 1.000 liggen er dan zo'n 1.000 munten in en kost de natuurkunde gemiddeld 3 tot 4,5 ms per stap; met 1.250 liggen er 1.030 tot 1.080 in (er vallen ook meer uit) en kost het 4,3 tot 5,5 ms. Het hulpje houdt zich aan zijn eigen tijd (12 ms), dus het beeld blijft vloeiend.
- **Getest** in Chromium: alle vier de kasten met een lege opslag (het juiste aantal kaartjes, de ringen zichtbaar, zonder fouten of overtredingen van het veiligheidsbeleid).

## 22. Dichte zijgoten en een geheim beheermenu (22 november 2026, Rubens reactie)

- **De zijgoten**: naast de onderste vloer zat een open kier, en daardoor zag je de grond van de zaal. Nu loopt daar aan beide kanten een koker naar beneden (`koker` in `bouwKast`): van de rand van de vloer tot tegen de zijwand, en van ver onder de schuiver tot de voorkant. Binnen is hij donker (het donker loopt weg naar beneden), buiten gelakt zoals de onderkast. Munten vallen er nog steeds in en zijn dan voor de kast; de natuurkunde is niet veranderd.
- **Het geheime beheermenu** (`BEHEER` in de pagina, zoals in het casino): typ "beheer" (niet in een invulveld), of houd de naam bovenaan 2 seconden ingedrukt. Het vraagt het beheerwachtwoord van de werkplaats en laat de scoreserver het nakijken (`/ideeen/alle`); het wachtwoord wordt nergens bewaard, alleen dat het klopte, voor dat tabblad (sessionStorage `rommelschuiver-beheer`). Daarin: munten en kaartjes erbij of op een aantal zetten, een muntenregen van 30 munten, het rad laten draaien, een prijs uit het luikje, alle kasten open, de verzameling compleet, en vergrendelen. Iemand anders helpen kan door het menu op diens apparaat te openen; zodra de scoreserver de Rommelschuiver kent (`rommelschuiver-v1` in `SLEUTELS`), kan het ook vanuit de werkplaats (`SPELINFO` met een `cadeau`). Zet dit menu nergens op de site.
- **Getest** in Chromium op 1280 (licht) en 390 (donker) breed: de zijgoten van dichtbij en van ver in vier kasten, het menu openen door te typen en door lang indrukken, een fout en een goed wachtwoord (met een nagemaakte scoreserver), alle knoppen, bewaard na herladen, zonder fouten of overtredingen van het veiligheidsbeleid.

## 23. Voorstel: nieuwe kasten met meer actie (22 november 2026, nog niet gebouwd)

Ruben stuurde twee foto's als inspiratie: een echte muntenschuiver op de kermis (een rond lichtjesrad met een teller, een zwaaiarm die over de onderste vloer veegt, verzamelkaartjes tussen de munten) en een muntenschuiver-spel (een stenen kelder met tandwielen en een klok, stapels pokerfiches met grote waardes, een muntenring om een schatkist, een gouden sleutel). We nemen alleen de ideeën over, nooit namen, figuren, tekeningen of thema's van die kasten. Elke nieuwe kast krijgt één opvallend eigen kunstje, wordt afgesteld op ongeveer 92 van de 100 (zoals de andere), en komt achteraan in de Kasten (duurder dan de Draaimolen).

- **A. De Schatkamer** (foto 2): een stenen kelder met draaiende tandwielen en een grote klok op de achterwand. Midden op de onderste vloer een schatkist in een muntenring. Uit het rad kan een gouden sleutel komen; valt de sleutel in de trechter, dan springt de kist open en komen er drie prijzen tegelijk uit het luikje. Als de klok slaat (elke 100 munten die erin gaan), draaien de tandwielen en doet de schuiver drie superduwen.
- **B. De Ruitenwisser** (foto 1): een zwaaiarm die vanaf de achterkant heen en weer over de onderste vloer veegt en munten opzij en naar voren duwt. Daarboven een rond lichtjesrad met een teller: elke munt die door het poortje valt, laat de lichtjes rondlopen; ze stoppen op 5, 10, 20 of 50, en zoveel munten komen uit het luikje.
- **C. De Fichebank** (foto 2): groen vilt en neon. Naast gewone munten liggen er hoge stapels waardefiches (5, 25 en 100 munten): valt er een in de trechter, dan krijg je die waarde. De onderste vloer heeft een eigen tweede schuiver, die tegen de bovenste in beweegt.
- **D. De Kantelkermis**: de onderste vloer kantelt langzaam heen en weer, als een wip, zodat de munten naar de ene en dan de andere kant glijden. Langs de kanten bumpers, en af en toe schiet een muntenkanon een rijtje munten over de vloer.

Wat er nieuw moet in de natuurkunde: een bewegende arm (B), grote voorwerpen zoals een kist (A), fiches met een eigen maat en waarde (C), een kantelende vloer (D). Elke kast wordt getest zoals de andere (een robot die een half uur speelt, geen munten die wegschieten, telefoon en computer).

## 24. De Ruitenwisser (22 november 2026, keuze B van Ruben)

De eerste van de drie nieuwe kasten (Ruben koos A, B en C uit hoofdstuk 23; ze komen een voor een online).

- **Blokken in de natuurkunde** (`blokken` in `KASTEN`, `blokStand` in `kastVorm`): een staand blok op de onderste verdieping, een rechthoek met ronde hoeken van de vloer tot hoogte `h`. Drie soorten: `vast` (staat stil, voor de schatkist), `arm` (draait heen en weer om een spil) en `schuif` (schuift vooruit en terug, voor de tweede schuiver). Een liggende munt wordt eruit geduwd (`wanden`); een bewegend blok neemt hem zo vanzelf mee. Een vallende munt botst ertegen in 3D (`blokContact`), met de snelheid van het blok op die plek (`blokSnel`). De bovenkant draagt munten die er (bijna) op liggen (`BLOK_OVER`, 2,5 mm), en neemt ze mee als het blok beweegt. Slapende munten bij een bewegend blok worden wakker. De blokken hebben een eigen klok (`blokT`), die loopt zolang de schuiver loopt; het hulpje stuurt hem mee (`bt`), zodat het tekenen dezelfde stand laat zien. Zonder blokken rekent elke kast precies als eerst (nagekeken met dezelfde zaadjes).
- **De kast**: een arm van 168 mm (`arm`, 11 mm hoog) draait om een spil op het midden van de voorrand, 0,95 rad naar links en rechts, één keer heen en weer in 7 seconden, en veegt munten opzij en over de rand. Thema: een regenbui met een regenboog. Natte blauwe tegels met druppels (`vloerRuit`), een regenboog tussen de wolken op de achterwand (`bordRuit`), en een 3D-regenboog met wolken bovenop.
- **Het lichtjesrad** (in plaats van het rad, `bouwLichtjes`, `draaiLicht`, `lichtKlaar`): 32 lampjes rond een rode teller. Valt je munt door het poortje, dan loopt het licht rond en stopt het op een vakje (`ECO.LICHT`: 21 keer 5, 6 keer 10, 3 keer 20, 1 keer 50 munten en 1 ster). Zoveel munten komen een voor een uit het luikje, en de teller telt af. Op de ster is 1 van de 3 keer een prijs (net zo vaak als bij het rad), anders 3 kaartjes. De uitkomst ligt meteen vast (echt toeval); het lopen laat hem alleen zien. Telt als een draai (ook voor het opdrachtje).
- **Afgesteld** met de robot (een half uur, elke seconde een munt, twee zaadjes): de kast zelf geeft ongeveer 83 van de 100 terug (82 en 84; de arm veegt meer munten naar de zijgoten). Het lichtjesrad stopt er gemiddeld 8,6 munten bij in de kast; na een keer is het poortje 55 seconden dicht (daardoor ongeveer één keer per 85 munten). Samen komt hij op ongeveer 91, net onder de andere kasten (92 tot 94 met het rad).
- **Economie**: vijfde kast, voor 30.000 kaartjes (`KAST_PRIJS`). De eerste stapel heeft 18 kaartjes en twee muntenringen aan de zijkanten.
- **Getest**: in Node (geen fouten, munten tellen, rust, de andere kasten precies gelijk, hoogste snelheden: hooguit 1 of 2 korte sprongetjes per anderhalve minuut), en in Chromium op 1280 en 390 breed: de kast, de arm, het lichtjesrad (draaien en uitbetalen), zonder fouten of overtredingen van het veiligheidsbeleid.

## 25. De Schatkamer (22 november 2026, keuze A van Ruben)

- **De kast**: een stenen kelder. Op de onderste vloer staat midden een schatkist (een vast blok, `kist: true` in `KASTEN`: 52 bij 36 mm en 32 mm hoog), met in de eerste stapel een muntenring eromheen (11 munten per laag, straal 45 mm: `ring` kan nu ook een grotere ring maken) en twee gewone ringen aan de zijkanten. De munten moeten om de kist heen. Bovenop een stenen boog met een grote klok (Romeinse cijfers) en vier tandwielen; op de achterwand stenen met twee fakkels en een gouden boog om het rad; de vloer is van grote platte stenen.
- **De klok** (`klokslag`, `KLOK_ELKE`): de grote wijzer gaat één keer rond per 100 munten die je in deze kast gooit. Dan slaat de klok (drie klokslagen, `geluid.klok`), draaien de tandwielen snel en duwt de schuiver 3 keer extra ver (superduw, zoals bij het rad).
- **De gouden sleutel** (soort 30, `SOORT_SLEUTEL`): in de Schatkamer is de jackpot van het rad (de ★ en dan 1 van de 6 in het hartje, dus 1 op 96 draaien) de gouden sleutel in plaats van één prijs. Hij komt uit het luikje en ligt plat in de kast (een eigen 3D-sleutel met een robijn, `maakSleutel`). Valt hij in de trechter, dan gaat de kist open (het deksel klapt open, goud gloeit) en komen er 3 prijzen tegelijk uit het luikje (`ECO.kistOpen`: drie voorwerpen die je nog niet hebt, of gouden kaartjes van 250). Valt hij in een zijgoot, dan komt hij opnieuw uit het luikje. De sleutels in de kast staan in het kastrecord (`sk`), en een nagemaakte stapel legt ze terug.
- **Afgesteld** met de robot (een half uur, elke seconde een munt, met de klokslag, twee zaadjes): met de gewone zijgoten gaf hij ongeveer 95 van de 100 terug (de kist leidt de munten naar het midden). Met iets bredere zijgoten (`XF` 229) is het ongeveer 91, en het rad geeft daar nog ongeveer 1 bij. De kist geeft per sleutel drie prijzen: in deze kast komen er dus ongeveer drie keer zo vaak prijzen als in de andere.
- **Economie**: zesde kast, voor 45.000 kaartjes. De eerste stapel heeft 20 kaartjes. In het geheime menu staat in deze kast ook "De gouden sleutel".
- **Getest**: in Node (de kist en de ring blijven staan, de munten tellen, sleutels in het kastrecord en in een nagemaakte stapel) en in Chromium op 1280 en 390 breed: de kast, de klok en de klokslag, de kist die opengaat met drie prijzen, de sleutel in de kast, het geheime menu, zonder fouten of overtredingen van het veiligheidsbeleid.

## 26. De Fichebank (22 november 2026, keuze C van Ruben)

- **De kast**: groen vilt met gouden lijnen en kaartsymbolen, een neon achterwand met kaartsymbolen en stapels fiches, en bovenop een grote fiche van 100 die langzaam rondtolt, met twee dobbelstenen ernaast.
- **Waardefiches** (soort 16, 17 en 18: `ECO.FICHES` 5, 25 en 100 munten): groter, dikker en zwaarder dan een munt (`FICHE` in de natuurkunde: straal 15 mm, 3,4 mm dik, 1,7 keer zo zwaar). Valt er een in de trechter, dan krijg je zoveel munten; in een zijgoot is hij weg, net als een munt. Ze worden getekend zoals kaartjes (drie extra lijsten achter de kaartjes in `KAART_LIJST`), met witte blokjes op de rand. In de eerste stapel staan vijf stapels fiches (`STAPELS`, `stapel` in de natuurkunde), en in deze kast geeft het rad op "+1" een fiche van 5 en op "+5" een fiche van 25. De fiches in de kast staan in het kastrecord (`ff`); een nagemaakte stapel laat ze er bij het begin door de gleuf in vallen.
- **De tweede schuiver**: een lage balk (176 bij 20 mm, 10 mm hoog) op de onderste vloer (`schuif` in `blokken`), met lampjes die heen en weer lopen. Eerst bewoog hij tegen de bovenste schuiver in, zoals in het voorstel, maar dan werden de munten ertussen samengeperst en schoten ze weg (22 keer per twee minuten). Nu duwt hij met de bovenste mee (zelfde maat), en gaat het soepel (1 keer per twee minuten).
- **Afgesteld** met de robot (een half uur, elke seconde een munt, drie zaadjes): met de gewone zijgoten gaf hij ongeveer 94 van de 100 terug; met iets bredere zijgoten (`XF` 228) is het ongeveer 87. Het rad stopt in deze kast meer in de kast (fiches van 5 en 25 in plaats van 1 en 5 munten: gemiddeld 2,25 munten meer per draai, ongeveer 4 per 100 munten die je erin gooit), en geeft daarnaast ongeveer 1. Samen ongeveer 91. De fiches in de eerste stapel zijn samen 400 munten waard: een welkomstcadeau voor de duurste kast.
- **Economie**: zevende kast, voor 65.000 kaartjes. De eerste stapel heeft 18 kaartjes. In het geheime menu staat in deze kast ook "Een fiche van 100".
- **Getest**: in Node (stapels fiches blijven staan, de tweede schuiver, de fiches in het kastrecord en in een nagemaakte stapel, hooguit 1 snelle munt per twee minuten) en in Chromium op 1280 en 390 breed: de kast, de fiches, de tweede schuiver, kopen als zevende kast, Eerlijk? en het geheime menu, zonder fouten of overtredingen van het veiligheidsbeleid.

## 27. De metingen en de verbeteringen (22 november 2026, Rubens reactie)

Ruben: "Ik kan de metingen niet uit zetten. Misschien is het ook een idee om upgrades in de winkel toe te voegen zodat je bijvoorbeeld sneller per minuut muntjes kan laten vallen etc. Dit mogen levels zijn en wat duurder om het gebalanceerd te houden."

- **De metingen**: `?meet` in het adres zette ze bij elk bezoek weer aan, wat je ook koos (en ik had gevraagd om dat adres te gebruiken). Nu zet `?meet` ze alleen aan als je bij Instellingen nog nooit zelf iets koos (`mk` in `rommelschuiver-apparaat`), en haalt het spel `?meet` uit het adres. Aan- en uitzetten gaat meteen, zonder herladen.
- **Vier verbeteringen in de Prijzenkraam** (`VERBETERING` in de economie, elk drie niveaus, voor alle kasten; nieuwe altijd achteraan, verander nooit een id). Kopen: twee keer tikken (eerst "Zeker?").

  | Verbetering | Zonder | Niveau 1 | Niveau 2 | Niveau 3 | Prijzen (kaartjes) |
  |---|---|---|---|---|---|
  | **Snelle gleuf**: munten per minuut als je ingedrukt houdt | 180 | 200 | 220 | 240 | 2.500, 6.000, 12.000 |
  | **Kaartjesmachine**: een kaartje na elke … munten | 20 | 18 | 16 | 14 | 4.000, 12.000, 30.000 |
  | **Vangnet**: van de munten in een zijgoot komt er 1 op … terug | – | 12 | 8 | 5 | 3.000, 9.000, 24.000 |
  | **Superduwknop**: een superduw na elke … munten (hooguit 3 klaar) | – | 200 | 130 | 80 | 2.000, 6.000, 15.000 |

  Samen 125.500 kaartjes: meer dan de zevende kast.
- **Waarom deze getallen** (gemeten met de robot):
  - *De gleuf*: 240 per minuut is het meeste dat de kast bijhoudt. Bij 4 munten per seconde blijft de stapel rond de 1.150 munten; bij 4,6 per seconde groeit hij door tot de grens van 1.250 ("De kast zit vol"), en bij 6 per seconde is hij binnen twee minuten vol. Wat de kast teruggeeft verandert niet (92 tot 94 van de 100). Het rad draait er niet vaker door (het poortje is na een draai even dicht), dus per munt geeft het rad iets minder. Vasthouden gaat nu precies in de maat (eerst kwamen er door de klok van 60 ms zo'n 167 per minuut, nu 180).
  - *De Kaartjesmachine*: op het hoogste niveau 43% meer kaartjes in de kast.
  - *Het vangnet*: van wat eruit valt, gaan er zo'n 7 tot 9 van de 100 in een zijgoot (de Fichebank 13, de Ruitenwisser 17). Met 1 op 5 geeft een kast zo'n 1,5 meer terug (de Fichebank 2,5, de Ruitenwisser 3,5). Alleen munten: fiches, kaartjes en prijzen vangt het netje niet. In de zijgoten hangt dan een touwnetje dat oplicht als het een munt vangt.
  - *De Superduwknop*: een superduw (3 slagen extra ver, net als het rad) haalt munten eruit die al bijna vielen. Gemeten met een superduw na elke 80 munten (een half uur): 93,2 van de 100 in de trechter, zonder 92,9. Op den duur verandert het dus bijna niets; je krijgt de munten alleen eerder. Op het scherm een knop met een balkje dat oplaadt (ook met de toets D).
  - *Samen*, voor iemand die elke dag zijn spaarpot leegspeelt: alles op het hoogste niveau geeft zo'n 1,7 keer zoveel kaartjes per dag (meer munten om te gooien door het vangnet, en meer kaartjes per munt). Wie alles koopt, is daar maanden mee bezig.
- **Opslag** (`rommelschuiver-v1`): `upg` (per verbetering het niveau), `sd` (de superduwen die klaar zijn `n`, en hoeveel munten er al opladen `t`), en de tellers `st.vang` (munten uit het vangnet) en `st.duw` (superduwen gebruikt). Ook de tellers `fiche`, `kist` en `sleutel` blijven nu bij het laden staan (die gingen verloren).
- **Eerlijk?** legt de verbeteringen uit en noemt je eigen getallen. **Het geheime menu**: alles op het hoogste niveau, alles terug naar niets, en de Superduwknop vol.
- **Getest**: de rekenregels in Node (kopen, te weinig kaartjes, hooguit drie niveaus, kaartjes, superduwen opladen en gebruiken, het vangnet 1 op 12 precies, rare en oude opslag), en in Chromium op 1280 (licht) en 390 (donker): de metingen aan en uit (ook met `?meet`), kopen in de kraam, de gleuf (met een nagemaakte klok: 180 en 240 per minuut), de knop, het netje, Eerlijk?, herladen en het geheime menu, zonder fouten of overtredingen van het veiligheidsbeleid.

## 28. Een hogere grens en echter geluid (22 november 2026, Rubens reactie)

Ruben: "1250 is nog steeds te weinig. Daarnaast vind ik het geluid niet mooi. Het is net alsof er diamanten vallen, maar dat is dus niet."

- **Waarom de kast vol raakte**: als je op één plek blijft mikken, groeide daar op de schuiver een toren van wel 10 munten hoog. Die munten bleven liggen, dus de kast liep vol, en ze wiebelden. Met de Snelle gleuf (240 per minuut) en mikken op één plek groeide een kast zo door tot zo'n 1.800 munten; met overal gooien bleef hij rond de 1.200.
- **Torens brokkelen af** (`TOREN_H` in de natuurkunde): ligt de bovenste munt van een stapel op de schuiver meer dan 11 mm (5 munten) boven de schuiver, dan schuift hij eraf, weg van wat hem draagt. Gemeten met een robot die 10 minuten op één plek mikt, 240 per minuut: de kast blijft rond de 1.350 munten (was 1.800), op de schuiver 770 in plaats van 1.150, wiebelende munten 47 in plaats van 140 (en niet meer 7 tot 10 hoog, maar 4 of 5), en de natuurkunde per stap 6 ms in plaats van 10 ms. Wat de kasten teruggeven blijft gelijk (de Rommelschuiver 92,8 en 92,9, was 92,9).
- **De grens is nu 1.800** (`VOL_GRENS`), en de kast heeft ruimte voor 2.100 munten (`MAXM`, was 1.700). Bij gewoon spelen kom je daar niet meer aan.
- **Het geluid** klonk als glas: elke munt was een paar zuivere hoge tonen (2.600 tot 4.100 Hz) die bijna een tiende seconde nazongen, en een muntenregen was gefilterde ruis rond 4.200 Hz. Nu (`MAAKKLANK` in het spel) zijn het korte stukjes geluid die bij het opstarten worden uitgerekend (een paar varianten per soort, in stukjes, zodat het beeld niet hapert): een klap (een stootje ruis), de boventonen van een dun schijfje metaal die snel wegsterven (een munt die op andere munten valt, wordt meteen gedempt), een doffe bonk van wat eronder ligt, en soms een of twee natikjes als hij plat valt. Soorten: `munt` (op andere munten: zwaartepunt 2.300 Hz in plaats van 4.900, na 50 ms weg), `staal` (tegen een wand, de schuiver of in de gleuf), `glas` (dof tikje, ook als een munt in de zijgoot valt), `bak` (in de trechter: een klank op het chroom en dan rolt de munt rond, met steeds snellere tikjes) en `klik` (het rad). Een muntenregen is nu een plens losse klanken door elkaar. Elke klank speelt iets hoger of lager, zodat geen twee hetzelfde klinken. De belletjes (kaartjes, prijzen) zijn gebleven.
- **Getest**: de natuurkunde in Node (hierboven), en in Chromium: de klanken worden gemaakt en gespeeld (geen losse tonen meer per munt), de grens (1.798 gaat erin, 1.800 niet), een kast met 1.883 munten zonder fouten, en de tests van hoofdstuk 27 opnieuw.

## 29. Geen dansende munten meer (22 november 2026, Rubens reactie)

Ruben (met een filmpje van een volle Schatkamer): "Heel veel muntjes dansen alsof het muizen zijn zonder iets te doen. Dat heeft waarschijnlijk te maken met jouw laatste aanpassing."

- **Waarom ze dansten**: de torenregel van hoofdstuk 28 duwde elke bovenste munt die hoger dan 11 mm boven de schuiver lag eraf, ook als hij op een brede berg of een dikke laag lag. In een volle kast liggen de bovenste munten van zo'n laag net rond die grens (wat schuin, op munten van verschillende hoogte). Zo'n munt kreeg een duw, gleed naar een buurplek die net zo hoog was, kreeg weer een duw, enzovoort: een munt die over de berg rondrent, tot anderhalve meter per minuut.
- **De regel nu** (`torenVal` en `oppervlak` in de natuurkunde): een munt die te hoog ligt (`TOREN_H`, nu 11,6 mm: de zesde munt) glijdt alleen nog als er vlakbij (in acht richtingen, 22 en 30 mm van zijn midden) een plek is die minstens anderhalve munt lager ligt dan zijn onderkant. Van die lagere plekken kiest hij de plek die het dichtst ligt bij de kant waar de oude regel hem heen duwde (weg van wat hem draagt). Ligt hij op een vlakke laag, dan blijft hij liggen. Een echte toren brokkelt dus nog steeds af, en een steile berg zakt in, maar op een brede laag rent niets meer rond.
- **Eerst geprobeerd, en niet gebleven**:
  - alleen duwen als er naast de munt geen munt even hoog ligt (een smalle toren): dan liep de kast weer vol (bij 240 munten per minuut op één plek 1.710 munten), omdat er een brede berg groeit;
  - altijd naar de laagste plek eromheen: aan de voorkant van de schuiver is dat altijd de rand, dus te hoge munten vielen daar altijd naar voren, en de kast gaf in een proef van een uur meer terug (96 in plaats van 92 van de 100).
- **Gemeten** in een volle Schatkamer, een minuut kijken zonder te gooien (drie zaadjes): munten die duidelijk zichtbaar rondschuiven (meer dan 40 cm in die minuut) 15, 5 en 14 met de oude regel, nu 0, 1 en 0; alles bij elkaar 2,3, 7,4 en 4,6 meter (was 18,8, 9,6 en 18,6 meter), en de munt die het meest schuift hooguit 42 cm (was tot 1,5 meter). Wat er nog een beetje schuift, zijn vooral munten tegen de achterwand, die de schuiver op elkaar drukt als hij terugloopt (dat deed hij altijd al, in de maat van de schuiver).
- **De kast en de teruggave**: met 240 munten per minuut op één plek blijft de kast rond de 1.440 munten (met de oude regel 1.350; de grens is 1.800). Een robot die een uur lang elke seconde een munt gooit: in de zijgoten 7,1 en 7,0 van de 100 (oude regel 6,0 en 7,4), en verrekend met wat er in de kast bijkwam of afging geven beide zo'n 93 van de 100 terug. De natuurkunde per stap is even snel (7 ms bij 240 per minuut).
- **Getest**: in Node (hierboven), en in Chromium: een kast met 1.880 munten (de grens werkt, geen fouten), en de Schatkamer (de klok, de kist met drie prijzen, de sleutel), zonder fouten of overtredingen van het veiligheidsbeleid.

## 30. Echte opnames van munten (23 november 2026, Rubens reactie)

Ruben: "De munten klinken nog niet goed, kun je ergens een echt geluidsbestand gebruiken?"

- **De opnames** komen van Freesound, allemaal **CC0** (vrij te gebruiken, ook zonder naam; ze staan toch in het colofon): munten die vallen (*Coins Being Dropped-Assorted* en *Coins Being Poured* van TheWoodlandNomad, *Coins* van altfuture, *Coin Dropped* van kermite607, *coins 05* van Anthousai), een munt die in een muntteruggave valt (*Quarter Inserted, falls into coin return* van bassmosphere), munten in een kom (*Coins falling in bowl* van eizzof), en munten op tafel (*coindrop1* van jmaimarc, *Coin dropping* van Jace).
- **Het bestand** `rommelschuiver-geluiden.mp3` (118 kB, 80 kbps, naast de pagina) heeft alle klanken achter elkaar, met een stukje stilte ertussen: 12 keer een munt op munten (`munt`, 0,16 s), 6 keer metaal (`staal`, tegen een wand, de schuiver of in de gleuf), 3 keer de trechter (`bak`), 3 doffe tikjes (`glas`, in de zijgoot) en 2 keer een plens munten (`regen`, bij veel munten tegelijk in de trechter). Waar elke klank begint staat in de pagina (`OPNAME_PLEK`); het spel zoekt bij het laden het precieze begin op, want een mp3 kan alles een paar milliseconden verschuiven (`laadOpnames`). Het tikken van het rad (`klik`) is zelfgemaakt gebleven, net als de belletjes, de klok en het draaiorgel.
- **Gemaakt** met een klein script (`knip.py`, niet in de repository): per klank het begin van de klap, een paar milliseconden ervoor beginnen, het gerommel onderin eruit, aan het eind zacht laten wegsterven, en even luid maken. In het spel speelt elke klank iets hoger of lager, zodat geen twee hetzelfde klinken, en zo luid als het zelfgemaakte geluid was (dezelfde energie per soort, `LUID_ECHT`).
- **Zonder het bestand** (geen internet, of het is nog niet binnen) klinkt het zelfgemaakte geluid. Verander je de opnames, verhoog dan `?v=` achter `OPNAMES` (de service worker bewaart het bestand).
- **Getest** in Chromium: het bestand wordt opgehaald en geknipt, elke soort speelt een echte opname (en de regen een echte plens), zonder het bestand het zelfgemaakte geluid, zonder fouten of overtredingen van het veiligheidsbeleid (`connect-src 'self'` dekt het ophalen).

## 31. Koppelen en de scoreserver (23 november 2026, Ruben plakte de scoreserver)

- **De scoreserver 2026-11-15** (gebouwd op 2026-11-14, die Ruben plakte; als volledig bestand aan Ruben gegeven, niet in de repository): de REGELS voor `rommelschuiver-v1`, `TIJD_SPEL` (de tijdmachine: "77 munten · 1.234 kaartjes · 2 van 24 voorwerpen · 2 kasten"), `BLOK_NU = 17`, en `/status` zegt `"schuiver":1`. Verder niets veranderd.
- **De REGELS** (in het gedeelde blok en de scoreserver letterlijk gelijk): `'rommelschuiver-v1': { geheel: true }`, met de maat `[opnieuw, munten ingegooid, voorwerpen en goud, kasten]`. Munten, kaartjes, de spaarpot, de verzameling, de kasten en de verbeteringen hangen samen (alles koop je met munten of kaartjes): één hele versie wint, die met de meeste voortgang, en de andere gaat naar de tijdmachine. Zo kun je met twee apparaten niets verdubbelen. Met twee apparaten tegelijk open vraagt de site waar je verder wilt spelen, net als bij de andere spellen met geld. Terugzetten met de tijdmachine gaat precies.
- **Het gedeelde blok** (in alle 32 pagina's, `homepage-onderdelen.js` en de kopie in de werkplaats): `'rommelschuiver-v1'` in `SLEUTELS`, de REGELS, en `BV = 17`. Geen scorebord (`BRONNEN`): dat wilde Ruben niet.
- **De werkplaats**: `SPELINFO['rommelschuiver-v1']` (munten, kaartjes, de spaarpot, de verzameling, de kasten en wat er is ingegooid, met een cadeautje speelmunten of kaartjes), en het icoon `schuiver` (`SPELICONEN`, `ICOON_OPTIES` "Muntenschuiver", `raadIcoon`). **De homepage** (`homepage-onderdelen.js`): het icoon, de categorie Snel een potje, het onderschrift "Duw de muntjes over de rand" en de voortgang "x van 24 voorwerpen" (of "x munten ingegooid"). Het label zet Ruben zelf.
- **`privacy.html`**: de Rommelschuiver gaat mee met koppelen; hoe de munten in de kast liggen, de instellingen en de speeltijd blijven op het apparaat.
- **Volgorde**: eerst de scoreserver in Cloudflare, dan pas de pagina's met `BV = 17` online. Een oudere scoreserver kent de regel niet (dan wint bij twee apparaten de versie die het laatst binnenkwam, in plaats van de meeste voortgang).
- **Getest**: de scoreserver in Node met een nagemaakte D1 (11 tests: `/status`, een volgende stap, een botsing waarbij de meeste voortgang wint en niets gemengd wordt, een derde apparaat met nog meer voortgang, de tijdmachine met omschrijvingen, en precies terugzetten); twee echte browsers met de nieuwe scoreserver ertussen (browser A maakt vanzelf een account en zet zijn voortgang op de server, browser B met dezelfde koppelcode krijgt precies dezelfde munten, kaartjes, voorwerpen en tellers, en het spel laat ze zien); alle 40 pagina's met het nieuwe blok zonder fouten of overtredingen van het veiligheidsbeleid; de gedeelde blokken overal gelijk, en de REGELS in de scoreserver gelijk aan die in het blok.

## 32. Satisfying geluiden (24 november 2026, Rubens reactie)

Ruben: "Het moeten ook echt satisfying geluiden worden."

- **Twee nieuwe opnames** (Freesound, CC0, in het colofon): *SlotLoadedCoinTray* van LampEight (munten in de metalen bak van een speelautomaat: elke klap rinkelt na, rond 1.300 Hz) voor een munt die in de trechter valt (`bak`, 5 klanken), en *slot machine payout* van jack126guy (een speelautomaat die uitbetaalt) voor de grote plens (`regen`, 3 klanken). *Coins falling in bowl* van eizzof is eruit. `rommelschuiver-geluiden.mp3` is nu 160 kB, `OPNAMES` heeft `?v=2`.
- **Alles klinkt in C groot pentatonisch** (c d e g a): klokjes, de kassa, de fanfare, het rad en het draaiorgel klinken samen nooit vals.
- **De winstladder** (`winst`): elke munt die over de rand gaat, geeft een tingeltje (een klokje met boventonen, `bel`). Komen ze vlak na elkaar (binnen 0,9 s), dan gaat elk tingeltje een toontje hoger (`LADDER`, van g'' tot g''''), hooguit om de 0,06 s. Een losse munt is altijd de eerste toon.
- **De kassa** (`kassa`): komen er binnen twee seconden tien of meer munten binnen, dan klinkt na de plens "ka-ching" (een klik van de la, een doffe bons, een helder belletje dat lang naklinkt) met glinsters, en bij 25 of meer een akkoordje erbij. Ook bij een jackpot van het rad of het lichtjesrad, en bij 20 of meer munten uit het luikje.
- **Kaartjes** (`kaartjes`): de printer ratelt ze eruit, met een tikje per kaartje (hooguit 22), een motortje, het afscheuren en twee tingeltjes. Ook bij een opdrachtje.
- **Iets nieuws voor je verzameling** (`fanfare`): een fanfaretje van klokjes, een akkoord dat blijft hangen en glinsters; groter als de schatkist opengaat. **Een fiche** (`fiche`): een dubbel tingeltje (een fiche van 100: de kassa).
- **De gleuf** (`gleuf`): de munt tikt tegen het staal en rolt de goot af (steeds snellere, zachtere tikjes; bij snel achter elkaar gooien alleen het tikje).
- **Ruimte**: elke klank komt van links of rechts, waar het in de kast gebeurt (`naar`, `panVan`), en gaat een beetje naar een korte, heldere galm van de speelhal (`maakGalm`, zelf uitgerekend). Na de compressor wat harder, met een begrenzer erachter (`grens`): het geheel is zo'n −21 LUFS en komt nooit boven −1 dBFS (eerst −26 LUFS). Het motortje van de schuiver bromt zachter (een driehoek in plaats van een zaagtand). Op een telefoon trilt een grote plens en een fanfare.
- **Getest**: een vast verloop met het echte geluid van de pagina, offline gemaakt in Chromium (een nagemaakte klok en een `OfflineAudioContext`): de ladder klimt, de kassa komt na de plens, geen fouten, piek −1,1 dBFS. De echte pagina met geluid aan, klassiek en de Schatkamer, op 480 en 390 breed: 30 gewonnen munten gaven 30 tingeltjes en 30 keer de trechter, zonder fouten.

## 33. Spannender en verslavender (voorstel, 26 november 2026)

Ruben: "Maak de Rommelschuiver veel spannender en verslavender, voordat hij op de homepage komt." De opzet verandert: **eerlijkheid en vaste kansen mogen weg**. Een spelleider mag het geluk sturen, en de kast mag per moment meer of minder teruggeven, zolang de economie gezond blijft. Wat blijft: **alleen speelmunten**, nooit echt geld, nooit iets kopen, geen reclame.

**Stand: dit is een voorstel.** Eerst keurt Ruben het goed (de vragen staan onderaan). Daarna bouw ik eerst een proefversie met de spelleider en vier gebeurtenissen, die Ruben op zijn telefoon en laptop speelt, en pas daarna de rest.

### Hoe het nu voelt (gemeten)

Ik speelde de kast zoals hij nu online staat, op telefoon- en computerformaat, en liet een robot als nieuwe speler spelen (een verse kast zoals het spel die maakt, elke halve seconde een munt; in Node met de echte natuurkunde, drie keer 20 minuten):

| | De Rommelschuiver | De Schatkamer |
|---|---|---|
| De eerste munt valt eruit | twee keer pas na 87 en 90 seconden (173 en 180 munten erin), één keer meteen | twee keer pas na 82 en 86 seconden (163 en 173 munten erin), één keer na 4 seconden |
| Munten eruit in minuut 1 tot 3, en 3 tot 5 | zo'n 155, en zo'n 220 (240 erin) | zo'n 165, en zo'n 235 (240 erin) |
| Daarna, per minuut | zo'n 102 eruit van de 120 erin | zo'n 99 eruit van de 120 erin |
| Het langste stuk zonder iets | 12 tot 20 seconden | 8 tot 12 seconden |
| Een golfje (5 munten binnen 2 seconden) | zo'n 10 per minuut | zo'n 10 per minuut |

Wat dat betekent:

- **Het begin is te traag.** Een nieuwe speler heeft 250 munten (150 om mee te beginnen en 100 in de spaarpot). Meestal heeft hij er al 170 in gegooid voordat de eerste munt eruit valt: dan is hij al tweederde van zijn munten kwijt zonder dat er iets gebeurd is.
- **Daarna is het een gelijkmatig druppeltje.** Elke paar seconden valt er wat en het is nooit lang stil, maar er komt ook nooit een groot moment: zo'n 10 kleine golfjes per minuut, en elke minuut is ongeveer hetzelfde.
- Op telefoon en computer zag ik hetzelfde: het spel ziet er mooi uit en klinkt goed, maar na een paar minuten weet je wat er komt.

**Wat er nu ontbreekt**: iets onverwachts. Een kaartje of een draai aan het rad is leuk, maar er is nooit een moment waarop de hele kast losgaat, en een nieuwe speler moet eerst lang gooien voordat er iets uit valt.

### 1. De spelleider

Een regisseur in het spel (`REGIE`, in de pagina, zonder pagina te testen in Node, zoals de economie). Hij kijkt elke seconde mee en beslist wanneer er iets bijzonders gebeurt.

- **Het ritme**: na elke gebeurtenis kiest hij een moment over **30 tot 90 seconden spelen** (alleen tijd waarin je echt gooit telt; ligt je telefoon stil, dan wacht hij). Op dat moment komt er een gebeurtenis, een tovermunt of een groot moment. Nooit twee keer kort achter elkaar hetzelfde: elke gebeurtenis heeft een eigen rusttijd, en de laatste drie komen niet meteen terug.
- **Gul op de goede momenten**:
  - *nieuwe speler* (de eerste vijf minuten ooit): een vast verloop, zie "Het begin";
  - *droog* (40 seconden geen munt in de trechter): eerder een gebeurtenis, en dan een die munten geeft (Muntenstorm, Muntenkanon, De vlaai);
  - *bijna op* (minder dan 15 munten, en de spaarpot is leeg): een **reddingsmoment**, een Muntenstorm van 30 munten (hooguit één keer per dag);
  - *terug na een dag of langer*: in de eerste minuut een welkom (de Jackpottoren of de Reuzenmunt), en "Terwijl je weg was" (zie 5).
- **Spanning opbouwen**: de spelleider ziet in de natuurkunde wat er bijna valt (een prijs of een rij munten vlak bij de rand). Dan laat hij het even hangen ("Bijna!"), de rand wiebelt, het publiek houdt de adem in, en met een van de volgende munten geeft hij een klein duwtje: knal.
- **Een handje helpen** (subtiel, alleen als het spannend is): een munt die net niet kiept een heel klein zetje geven, een prijs een paar seconden laten "plakken" zodat hij niet te vroeg valt, of de rand op het goede moment laten gaan. Dat zijn kleine duwtjes in de natuurkunde (een paar mm per seconde), dus het blijft echt voelen.
- **De pot van de spelleider** (zo blijft de economie gezond): van elke 30 munten die je erin gooit, gaat er ongeveer 1 in zijn pot (dat zie je niet; de robots stellen het precies af). Alles wat hij aan munten weggeeft (een storm, een kanon, Koorts, een gouden munt), komt uit die pot. Zit er weinig in, dan kiest hij gebeurtenissen die niets kosten (Aardschok, Zijgoten dicht, De magneet: die laten munten vallen die er toch al bijna uit waren). Zo kan hij **nooit meer weggeven dan er binnenkomt**, en blijft de kast op de lange duur onder de 100 van de 100. Daarnaast heeft hij drie kleine potjes die nooit meer dan dit kunnen geven: een welkom voor een nieuwe speler (eenmalig 150 munten), een welkom terug (25 munten per dag) en het reddingsmoment (30 munten per dag).
- **Het rad mag ook gestuurd worden**: draaide het rad lang geen prijs, dan wordt de kans op de jackpot steeds groter (na 40 draaien zonder prijs zeker een prijs).
- **In het geheime beheermenu**: een knop per gebeurtenis en per tovermunt om hem meteen te zien, en twee schuifjes: **hoe vaak** (de spelleider wacht 0,25 tot 3 keer zo lang) en **hoe gul** (de pot krijgt 0,5 tot 2 keer zoveel). De schuifjes gelden alleen op dat apparaat, om te proberen; wat Ruben het fijnst vindt, zet ik daarna vast voor iedereen.

### 2. De gebeurtenissen

Elke gebeurtenis heeft een eigen aankondiging (een grote tekst over de kast, een eigen lichtpatroon in alle lampjes, een eigen geluid) en een eigen gevoel. Hoe vaak: per uur echt spelen, bij een gewone speler. Samen zo'n 30 tot 35 gebeurtenissen per uur; de andere momenten van de spelleider zijn tovermunten (zie 3). Wat het kost, komt uit de pot.

| Gebeurtenis | Wat je ziet en hoort | Wat het doet | Hoe vaak (per uur) |
|---|---|---|---|
| **Muntenstorm** | De neon flikkert als onweer, een donderslag, en dan regent het munten over de hele schuiver (je hoort ze kletteren) | 20 tot 35 munten vallen van boven op beide verdiepingen | 3 tot 4 |
| **Aardschok** | Een laag gerommel, de hele kast schudt drie tellen (het beeld trilt mee), lampjes knipperen rood | Alles wat aan de rand hangt, kiept eraf; de munten op de vloer schuiven een stukje naar voren | 4 tot 5 |
| **De Reuzenmunt** | Een munt zo groot als een schoteltje (met het kroontje) ploft met een dreun op de schuiver | Hij duwt een hele strook munten naar voren; in de trechter is hij 10 munten waard | 2 tot 3 |
| **Koorts** | Een meter in beeld loopt vol met elke munt die je wint. Vol: 20 seconden is alles goud, de muziek versnelt, de lampjes razen | Elke munt die je wint telt dubbel, en de gleuf gaat 1,5 keer zo snel | 2 tot 3 |
| **Zijgoten dicht** | Twee hekjes schuiven met een klik omhoog voor de zijgoten, met een klokje dat aftelt | 30 seconden gaat er niets verloren in de zijgoten | 3 |
| **De magneet** | Een grote rode hoefijzermagneet zakt aan een kabel boven de voorrand, met een zoemend geluid dat aanzwelt | 8 seconden trekt hij de munten bij de rand naar voren | 3 |
| **Het muntenkanon** | Een koperen kanonnetje klapt uit de zijwand, "poef poef poef" | Schiet een rij van 12 munten dwars over de onderste vloer | 3 |
| **De vlaai** | Een vlaai uit de Vlaaienbakker valt op de schuiver en spat met een "splets" uiteen in munten (en een paar kruimels) | 15 munten op één plek | 2 |
| **De ballon** | Een ballon met een prijs eraan zweeft heen en weer boven de gleuf | Raak hem drie keer met een munt, en hij knalt: de prijs (een edelsteen, een tovermunt, of een stapeltje kaartjes) valt uit het luikje | 1 tot 2 |
| **De jackpottoren** | Op de schuiver groeit een toren van gouden munten, laag voor laag (elke 15 munten die je gooit een laag) | Bij 12 lagen gaat hij wankelen en valt hij om: het regent goud (de gouden munten zijn elk 2 munten waard) | 1 |
| **Turbo** | Een sirene, en de schuiver gaat twee keer zo snel, met snelheidsstrepen op de vloer | 12 seconden schuift alles twee keer zo vaak | 3 |
| **Het Wonder** | Heel zeldzaam. Alles wordt stil, het licht gaat uit op één spot na, dan stort de hele voorrand in, in slow motion, met een fanfare en confetti | Alle munten in de voorste strook van de onderste vloer vallen, plus een regen gouden munten. Het komt als herinnering in je verzameling (met de datum) | ongeveer eens per twee à drie dagen spelen |
| **De feestdagen** | Via de feestkalender van de site (`feest.js`). Sinterklaas: pepernoten en chocolademunten in goudpapier die uit een zak strooien. Kerst: sneeuw op de kast, en kerstballen die als munten vallen. Oud en nieuw: vuurwerkmunten die knallen, en om middernacht vuurwerk boven de kast | In plaats van een gewone storm: dezelfde munten, met het feest erop (de chocolademunten zijn 2 munten waard) | in de feesttijd in plaats van een deel van de stormen |

**Per kast een eigen smaak** (dezelfde gebeurtenis, een eigen naam en uiterlijk, en een eigen gebeurtenis erbij):

| Kast | Eigen namen | Eigen gebeurtenis |
|---|---|---|
| De Rommelschuiver | zoals hierboven | **Kermisknaller**: de kroonmunt in de boog draait snel rond, en er vallen 3 gouden munten |
| De Halvemaan | Muntenstorm heet **Sterrenregen** (vallende sterren worden munten) | **Volle maan**: 20 seconden is elke slag springtij |
| De Flipperkast | Aardschok heet **Tilt!** | **Multibal**: 15 seconden schieten de bumpers twee keer zo hard, en het scorebord gaat los |
| De Draaimolen | De vlaai is een **suikerspin** | **Kermisgekte**: de schijf draait een halve minuut hard rond, het draaiorgel speelt dubbel zo snel |
| De Ruitenwisser | Muntenstorm heet **Wolkbreuk** | **Stormwind**: de arm veegt 15 seconden twee keer zo ver |
| De Schatkamer | Muntenstorm heet **Schatregen** (met gouden munten), Aardschok heet **Instorting** (stenen rommelen) | **De klok slaat dertien**: drie superduwen en een gouden sleutelkans |
| De Fichebank | Muntenstorm heet **Fichesregen** (met fiches van 5) | **Hoge inzet**: 20 seconden is elk fiche dat valt dubbel waard |

### 3. Bijzondere munten (in het spel: tovermunten)

In je verzameling heten een paar voorwerpen al "bijzondere munten". Om dat niet door elkaar te halen, noem ik de nieuwe munten in het spel **tovermunten**. Af en toe valt er uit de gleuf een tovermunt in plaats van een gewone (de spelleider kiest wanneer; zo'n 25 tot 30 per uur, ongeveer 1 op de 250 munten als je flink gooit, vaker tijdens Koorts en als het droog is). Elke munt heeft een eigen uiterlijk (een eigen ontwerp in reliëf en een eigen kleur), zodat je hem herkent terwijl hij over de schuiver schuift.

| Munt | Uiterlijk | Wat hij doet | Hoe vaak (van de bijzondere) |
|---|---|---|---|
| **?-munt** | Paars met een groot vraagteken | Als hij landt: een verrassing (5 munten erbij, een kaartje, een superduw, een klein schokje, of Koorts een stuk voller) | 25% |
| **Bommunt** | Zwart met een lontje dat vonkt | Telt na het landen af (3, 2, 1) en blaast dan de munten om zich heen opzij, ook over de rand | 15% |
| **Magneetmunt** | Rood en zilver, een hoefijzer | Trekt 6 seconden de munten om zich heen naar zich toe (een klontje dat samen verder schuift) | 12% |
| **Kloonmunt** | Groen met drie stipjes | Splitst zich na het landen in drie munten | 15% |
| **Stuitermunt** | Rood rubber | Stuitert een paar keer flink, ook over andere munten heen | 13% |
| **Regenboogmunt** | Alle kleuren, glanzend | Valt hij in de trechter, dan begint meteen Koorts | 5% |
| **Gouden munt** | Echt goud met een 10 erop | 10 munten waard in de trechter | 15% |
| **Feestmunten** | Chocolademunt (Sint), kerstmunt, vuurwerkmunt | Zoals de gewone, met een feestje als hij valt (de vuurwerkmunt knalt als een bommunt) | alleen in de feesttijd |

Een tovermunt telt in de kast als munt (een opslag zonder tovermunten wordt gewoon gelezen); in het kastrecord staat welke er nog in liggen (`bz`), zodat een nagemaakte stapel ze terug kan leggen.

### 4. Grote momenten die je voelt

- **Slow motion en de camera**: vallen er veel munten tegelijk (15 of meer in een seconde), valt er een prijs, of komt Het Wonder, dan gaat alles even langzaam (ruim een seconde op een derde van de snelheid), en zoomt de camera naar de voorrand. Daarna versnelt het weer, met een knal en een flits.
- **De teller rolt op** (de getallen rollen als een kassa), met confetti, een flits en alle lampjes die meedoen.
- **Geluid**: vlak voor een grote val wordt het even stil (de hal en de muziek zakken weg), en dan de plens en de kassa (uit hoofdstuk 32). Een publiek dat meeleeft: "oooh" als er iets bijna valt, gejuich als het valt, een zucht als het blijft hangen (zelf gemaakt met Web Audio).
- **Trillen** op telefoons die het kunnen (een iPhone kan dat niet vanuit een webpagina).
- **"Bijna!"**: ligt er een prijs of een kaartje van 50 of meer vlak bij de rand, dan licht hij op en verschijnt er een stickertje "Bijna!". Blijft hij te lang hangen, dan zucht het publiek, en helpt de spelleider soms een handje.
- Bij minder beweging: geen schudden, geen slow motion met zoom, geen flitsen en geen confetti; de tekst en het geluid blijven.

### 5. Redenen om door te spelen en terug te komen

**Een spelersniveau.** Elke munt die je erin gooit geeft 1 ervaring, een gebeurtenis die je meemaakt 10, een prijs 50. Het eerste niveau gaat snel (na 5 minuten), daarna steeds iets langzamer. Elk niveau geeft munten en kaartjes, en sommige niveaus een gebeurtenis die vaker komt:

| Niveau | Titel | Na ongeveer | Beloning |
|---|---|---|---|
| 1 | Kermisklant | het begin | |
| 2 | Muntjesgooier | 5 minuten | 30 munten |
| 3 | Randjesrijder | 12 minuten | 30 munten, 200 kaartjes |
| 5 | Kiepkenner | een half uur | 50 munten, 300 kaartjes, De magneet komt vaker |
| 8 | Schuivermeester | de tweede dag | 50 munten, 500 kaartjes, tovermunten komen vaker |
| 12 | Goudzoeker | de vierde dag | 75 munten, 800 kaartjes, gouden munten komen vaker |
| 16 | Stormjager | een week | 75 munten, 1.000 kaartjes, Muntenstorm komt vaker |
| 20 | Kermisbaas | anderhalve week | 100 munten, 1.500 kaartjes, Koorts duurt 25 seconden |
| 25 | Jackpotjager | drie weken | 100 munten, 2.000 kaartjes, de Jackpottoren komt vaker |
| 30 | Muntenmagnaat | een maand | 150 munten, 3.000 kaartjes, Het Wonder komt vaker |
| 40 en 50 | Rommelbaron, Rommelkoning | twee en drie maanden | 150 munten, 5.000 kaartjes |

Elk niveau ertussen: 20 munten en 100 kaartjes. Bestaande spelers beginnen op het niveau dat past bij de munten die ze al gooiden (de beloningen van de niveaus die ze zo overslaan, krijgen ze in één keer, in een zakje).

**Een dagreeks.** Speel je op een dag, dan komt er bovenop de 100 munten van die dag 5 munten per dag van je reeks bij (dag 2: +10, dag 11 en verder: +50). Eén keer per week mag je een dag missen zonder dat je reeks breekt (je ziet het vrijkaartje). Bij 7, 14 en 30 dagen een cadeautje: een zakje met 5 tovermunten, een glimmende munt voor je verzameling, en bij 30 dagen een edelsteen.

**Een kermispas** (per maand, met een eigen medaille van die maand). 30 trappen; je vult ze met pasjespunten: 1 per munt, 20 per gebeurtenis, 50 per opdrachtje, 100 per prijs. Een trap kost 3.000 punten: wie elke dag zijn munten opspeelt, haalt trap 30 in ongeveer twee weken, wie om de dag speelt ook nog in die maand, en wie elke dag een kwartiertje speelt, komt tot ongeveer trap 20. Om en om munten (30) en kaartjes (300), elke vijfde trap een zakje tovermunten, trap 15 een glimmende munt, en trap 30 de **medaille van de maand** (een eigen verzameling: elke maand een andere kleur en een ander symbool).

**Meer verdienen tijdens het spelen**: een goede sessie duurt langer dan nu, met de munten uit de gebeurtenissen (uit de pot van de spelleider) bovenop je spaarpot.

**"Terwijl je weg was"**: ben je drie uur of langer weg geweest, dan is er iets gebeurd als je terugkomt: een kaartje van 50 of 100 is vlak bij de rand gaan liggen, of er staat een tovermunt op de rand, met een briefje "Terwijl je weg was…".

**De verzameling**: naast de 24 voorwerpen en hun gouden versies nu ook **glimmende versies** (valt er een voorwerp dat je al hebt, dan is het 1 op 5 keer glimmend, in plaats van 25 kaartjes), **herinneringen** (Het Wonder, met de datum) en de **medailles van de kermispas**.

### 6. Het begin

- **Een nieuwe kast ligt vol tot vlak over de rand**: de eerste munten laten meteen munten vallen.
- **De eerste vijf minuten zijn een vast verloop** (alleen de eerste keer ooit): na zo'n 40 seconden een Muntenstorm ("Welkom!"), na 2 minuten de Reuzenmunt, na 3 minuten Koorts (de meter begint de eerste keer al voor driekwart vol), na 4 minuten een Aardschok, en binnen 10 minuten de eerste edelsteen (de dagprijs van de eerste dag is altijd een edelsteen, en hij ligt vlak bij de rand).
- **Het startscherm**: kort en spannend, met drie plaatjes van wat er kan gebeuren: "Gooi muntjes. Duw ze over de rand. Hoe meer er valt, hoe gekker het wordt." Daaronder de knop Speel.

### 7. Wat er verdwijnt

- **De tabel "Eerlijk?"** in de kraam: dat tabblad wordt **Kermispas** (je trappen, je niveau en je reeks).
- **De pauze van Moeki** gaat naar Instellingen, en staat **standaard uit** (wie hem wil, zet hem aan: 20, 30, 45 of 60 minuten).
- **"PROEF"** bij de naam, als alles af is.

### 8. Balans

**Het doel**: wie elke dag speelt tot zijn munten op zijn, speelt **45 tot 60 minuten per dag** (nu zo'n 35 tot 40, hoofdstuk 20), met een paar grote momenten erin; een kwartiertje per dag blijft ook leuk (dan bewaar je munten voor morgen). De kasten, de verzameling en de niveaus blijven iets om naartoe te werken: de tweede kast in de eerste week, alle kasten in de eerste twee maanden, de hele verzameling in ongeveer anderhalve maand, en goud en glimmend voor wie alles wil.

**Waarom het niet ontspoort**: de pot van de spelleider geeft hooguit 3 à 4 van elke 100 munten terug, bovenop de 91 tot 94 van de kast. Samen blijft het dus altijd onder de 100 van de 100 (zo'n 96 à 97): hoe slim je ook speelt, je munten raken een keer op. Het precieze deel voor de pot stel ik af zodat het doel van de minuten per dag gehaald wordt. Dat reken ik na met drie robots:

- **een robot met de echte natuurkunde** die per kast lange sessies speelt met de spelleider erbij: hoe vaak elke gebeurtenis voorkomt, hoeveel er terugkomt, en dat er nooit munten wegschieten, door de vloer zakken of gaan dansen (ook niet tijdens een Aardschok of een storm), en dat de grens van een volle kast (1.800) blijft werken;
- **een rekenmodel van 60 dagen** (zoals in hoofdstuk 15) met een speler die elke dag een kwartiertje speelt, een die speelt tot de munten op zijn, en een die om de drie dagen speelt: minuten per dag, kaartjes, niveaus, de kasten, de verzameling en de kermispas;
- **een robot die valsspeelt**: zo snel mogelijk gooien met de Snelle gleuf, altijd op de beste plek mikken, opnieuw laden midden in een gebeurtenis, en zoeken of de kloonmunt, de gouden munt of Koorts eindeloos munten geeft. Wordt een gebeurtenis onderbroken (de pagina gaat dicht), dan is hij weg: hij komt niet nog een keer, en wat er al in de kast lag, blijft er.

### 9. Wat blijft

- **De opslag**: `rommelschuiver-v1` en de stapels per kast. Alles komt er achteraan bij (bestaande voortgang blijft werken, geen id verandert): `xp` (ervaring), `rk` (je reeks: de laatste dag, hoe lang, de laatste vrije dag), `pas` (de maand, je punten en je trap), `rg` (de spelleider: zijn pot, de potjes, de Koortsmeter, de laatste gebeurtenissen, de dagen van Het Wonder), `glim` (glimmende voorwerpen), `med` (medailles), en per kast `bz` (tovermunten in de kast). De REGELS blijven zoals ze zijn (`geheel`), dus **de scoreserver hoeft niet opnieuw**.
- **Soepel en zuinig**: ik meet elke gebeurtenis apart in elke kast. De natuurkunde moet binnen zijn eigen tijd per stap blijven (hooguit zo'n 12 ms per keer, hoofdstuk 16) en het beeld vloeiend; op Zuinig zijn de stormen kleiner (20 munten) en is er minder confetti.
- **De natuurkunde**: geen munten die wegschieten, door de vloer zakken of dansen, ook niet tijdens een gebeurtenis.
- **De gedeelde blokken** blijven overal gelijk; het veiligheidsbeleid verandert niet.

### 10. De stappen

1. **Dit plan.** Ruben keurt het goed (of zegt wat anders moet).
2. **De proefversie**: de spelleider met zijn pot, en vier gebeurtenissen: **Muntenstorm, Aardschok, Koorts en de Reuzenmunt**, met de aankondigingen, het geluid, slow motion, "Bijna!" en het nieuwe begin. Ruben speelt hem op zijn telefoon en laptop (met het beheermenu om elke gebeurtenis meteen te zien).
3. **De rest**: de andere gebeurtenissen, de tovermunten, de eigen gebeurtenis per kast, het niveau, de dagreeks, de kermispas, "Terwijl je weg was", de verzameling, de feestdagen, Instellingen, en "PROEF" weg.
4. **Testen** met de robots (hierboven), elke gebeurtenis in elke kast, bewaren en laden midden in een gebeurtenis, de feestdagen op de juiste data, oude voortgang; en in een echte browser op telefoon- en computerformaat, met de metingen, zonder fouten of overtredingen van het veiligheidsbeleid.
5. **Commit en push** volgens de afspraken; Ruben ziet eerst wat erin gaat.

### 11. Vragen voor Ruben

1. **Het doel van 45 tot 60 minuten per dag** (voor wie speelt tot de munten op zijn; een kwartiertje blijft ook leuk): goed, of liever korter of langer?
2. **De pot van de spelleider** (ongeveer 1 van elke 30 munten, en de spelleider kan nooit meer weggeven dan erin zit): akkoord? Dan kan de economie niet ontsporen.
3. **De gebeurtenissen**: zo goed, of wil je er een paar anders of weg?
4. **Het Wonder** eens per twee à drie dagen spelen: zeldzaam genoeg?
5. **De kermispas per maand**, met een medaille van de maand: goed?
6. **De schuifjes in het beheermenu** eerst alleen op jouw apparaat, en daarna zet ik jouw keuze vast voor iedereen: goed?

### 12. De proefversie (26 november 2026)

Ruben: "Akkoord met alles, bouw maar de proefversie." Gebouwd: de spelleider en vier gebeurtenissen. De rest van het plan (de andere gebeurtenissen, de tovermunten, het niveau, de dagreeks, de kermispas, de verzameling, de feestdagen) komt nadat Ruben de proef op zijn telefoon en laptop speelde.

**De spelleider** (`ROMMELREGIE`, in de pagina tussen `// ==== SPELLEIDER begin` en `// ==== SPELLEIDER eind`, zonder pagina, in Node te testen):
- Een moment na 30 tot 90 seconden spelen (het eerste van een bezoek na 20 tot 40 seconden), altijd minstens 20 seconden tussen twee momenten, nooit twee keer dezelfde gebeurtenis achter elkaar, en per gebeurtenis een rusttijd (storm 4 minuten, Aardschok 3 minuten 20, Reuzenmunt 4 minuten). Alleen tijd waarin je echt gooit telt (een munt in de laatste 4 seconden), met de echte klok.
- De pot: 1 van elke 30 munten die je erin gooit. Een storm kost zoveel munten als er vallen (20 tot 35), de Reuzenmunt 10, Koorts elke munt die dubbel telt (de pot mag daarvoor tot 40 onder nul). De Aardschok kost niets.
- Het welkom van een nieuwe speler (150 munten, eenmalig): een Muntenstorm na 30 seconden spelen, de Reuzenmunt na 2 minuten, Koorts na 3 minuten (de meter begint op driekwart), een Aardschok na 4 minuten; wat er daarna nog in zit, gaat eerst op. Welkom terug (na 20 uur weg, eens per dag): na 8 seconden spelen een storm van 20 of de Reuzenmunt. Redding (minder dan 15 munten en een lege spaarpot, eens per dag): een storm van 30.
- Bestaande spelers (die al speelden voor er een spelleider was) krijgen geen welkom, maar beginnen met 40 munten in de pot en een halfvolle koortsmeter.
- Een handje helpen (hooguit eens per 30 seconden spelen): ligt een prijs, een kaartje van 50 of meer of de Reuzenmunt 12 seconden aan de rand, dan een zetje erachter; is er 25 seconden niets gewonnen (in een nieuwe kast 8), een zetje bij de rand.

**De gebeurtenissen** (in de natuurkunde: `regen`, `schok` en `zetje` in `MUNTFYSICA`; in het spel: `SP` in `spannend.js`):
- *Muntenstorm*: een donderslag, onweer in de lampjes en een flits, dan 20 tot 35 munten (Zuinig 20) die in 2,4 seconden van boven vallen: 60% vlak voor de rand van de onderste vloer, 40% vlak achter de voorkant van de schuiver. Als ze geland zijn, een naschokje.
- *Aardschok*: eerst wordt het even stil, dan 3 seconden gerommel, de kast schudt, de lampjes knipperen rood, en de munten vlak bij een rand krijgen een duwtje naar voren. In de Flipperkast heet hij Tilt!, in de Schatkamer Instorting.
- *De Reuzenmunt* (soort 19, een tovermunt): 26 mm straal (een munt is 12), 4,4 mm dik, 5 keer zo zwaar, met een kroontje en een 10. Hij landt met een dreun 6 cm voor de rand, en is in de trechter 10 munten waard.
- *Koorts*: de meter (2.400 gewonnen munten, een flinke speler zo'n 20 minuten) staat bij de tellers. Vol: 20 seconden telt elke munt dubbel, de gleuf gaat 1,5 keer zo snel, de munten worden goud, de lampjes lopen in een regenboog en er speelt een snel kermisdeuntje.
- Elke gebeurtenis heeft een grote aankondiging over de kast (een titel en een zinnetje), een eigen lichtpatroon en een eigen geluid (zelf gemaakt met Web Audio: donder, gerommel, een zoef en een dreun, het deuntje van Koorts, en het publiek).

**Grote momenten**: vallen er 30 munten binnen anderhalve seconde (de robot: ongeveer 15 keer per uur), dan slow motion (1,3 seconde op een derde van de snelheid), de camera zoomt in, een flits, confetti, gejuich en trillen. De teller van je munten rolt op als er 8 of meer tegelijk bijkomen. "Bijna!" (een geel stickertje) boven een prijs, een kaartje van 50 of meer of de Reuzenmunt aan de rand, met een "oooh" van het publiek; valt hij, gejuich en confetti, valt hij in een zijgoot, een zucht. Bij minder beweging: geen schudden, slow motion, inzoomen, flitsen of confetti.

**Het begin**: een nieuwe stapel wordt bij het neerleggen met een schok van 3 seconden dicht tegen de rand geschoven (`pers` in het hulpje), en het startscherm is korter: "Gooi muntjes. Duw ze over de rand. Hoe meer er valt, hoe gekker het wordt."

**Verder**: de pauze van Moeki staat standaard uit (Instellingen heeft nu Uit; wie al een keuze had, staat één keer op uit), en het tabblad Eerlijk? is weg (het wordt later de Kermispas). Het geheime beheermenu heeft bovenaan "De spelleider": de pot, de koortsmeter en het welkom, een knop per gebeurtenis (kost niets), twee schuifjes (hoe lang hij wacht, 0,25 tot 3 keer; hoe gul, 0,5 tot 2 keer; alleen op dat apparaat, in `rommelschuiver-apparaat` als `rv` en `rgu`) en "Begin als nieuwe speler".

**Opslag**: in `rommelschuiver-v1` erbij `rg` (de spelleider: `p` de pot, `w` het welkom, `td` en `rd` de dagen van welkom terug en redding, `km` de koortsmeter, `sp` seconden gespeeld, `ls` laatst gespeeld, `ns` hoe ver het welkom is, `l` de laatste gebeurtenissen, `n` hoe vaak elke kwam), per kast `bz` (de tovermunten in de kast) en de teller `st.tover`. De REGELS zijn niet veranderd (`geheel`), dus de scoreserver hoeft niet opnieuw. Een oudere pagina laat `rg` weg als hij bewaart; dan is de speler voor de spelleider weer een bestaande speler (zonder welkom).

**Gemeten**:
- *De natuurkunde* (Node, de gewone kast, na 3 minuten inspelen, een munt per halve seconde; munten in de trechter per 5 seconden, de eerste 5 seconden na de gebeurtenis): gewoon zo'n 18; na een Aardschok 55 tot 62 (daarna een tijdje minder: wat viel, viel anders later); na een storm met naschokje zo'n 50. Nergens munten die wegschieten (sneller dan 300 mm/s) of door de vloer zakken, en daarna alles in rust binnen 5 seconden.
- *Het begin*: met de schok bij het neerleggen valt in de meeste kasten de eerste munt binnen een paar seconden (zonder: na 80 tot 100 seconden en zo'n 170 munten); in de gewone kast soms nog na een minuut, en daar helpen de zetjes van de spelleider.
- *Een uur spelen met de spelleider* (de robot, een munt per halve seconde, met de echte natuurkunde, economie en spelleider):

  | Kast | Terug van de 100 | Zonder spelleider | Per uur | Gegeven uit de pot |
  |---|---|---|---|---|
  | De Rommelschuiver | 95,1 | 92 tot 94 | 15 Aardschokken, 9 Reuzenmunten, 4 stormen, 2 keer Koorts | 170 munten, en 66 door Koorts |
  | De Flipperkast | 93,6 | zo'n 92,7 | 16, 9, 4, 2 | 170, en 59 |
  | De Schatkamer | 93,4 | zo'n 91 | 16, 10, 4, 2 | 180, en 54 |
  | De Ruitenwisser | 85,9 (zonder het lichtjesrad, dat de robot niet speelt) | zo'n 83 | 15, 11, 3, 2 | 170, en 57 |
  | De Halvemaan | 96,0 | zo'n 92,0 | 17, 12, 6, 3 | 255, en 10 |
  | De Draaimolen | 95,4 | zo'n 91,8 | 15, 9, 4, 3 | 185, en 92 |
  | De Fichebank | 89,9 (zonder de fiches uit het rad) | zo'n 87 | 13, 8, 4, 3 | 175, en 114 |
  | Een nieuwe speler (20 minuten, de gewone kast) | 88,8 (de nieuwe stapel loopt nog vol) | | het welkom op 30, 120, 180 en 240 seconden, daarna 1 storm, 1 Aardschok | 188 (het welkom bijna op) |

  Een deel van wat er meer uitkomt, komt door de Aardschok: die laat munten vallen die er anders later uit vielen, dus over langere tijd is het verschil wat kleiner. Overal blijft het onder de 100 van de 100. Nergens munten die wegschieten; de traagste rekenstap zonder andere programma's ernaast 71 ms (5 stappen boven 25 ms in 12 minuten).

- *De spelleider in Node* (13 tests): het welkom op 30, 120, 180 en 240 seconden; nooit twee momenten binnen 20 seconden; nooit twee keer hetzelfde achter elkaar; nooit meer weggegeven dan er in de pot kwam; welkom terug en redding één keer per dag; niet spelen is niets; de schuifjes werken.
- *In Chromium* (computer 1280 en telefoon iPhone 13, Zuinig en Normaal, minder beweging): een nieuwe speler krijgt het welkom na 30 seconden spelen; elke gebeurtenis met de knop; oude voortgang van de versie die online staat laadt met dezelfde munten en dezelfde stapel; herladen midden in een storm, met de Reuzenmunt in de kast (hij ligt er daarna nog) en midden in Koorts (je munten blijven, de koorts is weg); het beheermenu; nergens fouten of overtredingen van het veiligheidsbeleid; de gedeelde blokken overal gelijk. **Niet getest: een echte iPhone, Android-telefoon en MacBook.**

### 13. De rest, gebouwd (26 november 2026)

Ruben, na het testen van de proefversie: "Bouw nu de rest maar. Geef de interface wel een overzichtelijkere look, en de spelleider mag duidelijk. Daarnaast mag alles wat mooier, behalve de muntjes, die zijn al goed. Het moet er allemaal gelikt uitzien. Alsof je echt in zo'n arcadehal staat." "PROEF" is weg.

**De spelleider is nu duidelijk: Okke de omroeper.** Een eigen figuur (een omroeper van de kermis met een strohoed, een snor en een gestreept jasje; eigen tekening). Hij staat linksonder (op een telefoon onderin) met een tekstballon: hij kondigt elke gebeurtenis aan, plaagt als er iets aankomt ("Ik voel iets aankomen…"), juicht bij een plens, zucht als iets de zijgoot in gaat, en verklapt het als je volgende munt een tovermunt is. Hij praat met een paar vrolijke klankjes (geen echte woorden). Bij Okke:
- de **verrassingsmeter**: vijf lampjes die oplichten naarmate het volgende moment dichterbij komt; vol: ze knipperen;
- de **koortsmeter**;
- wat er nu loopt, met de tijd die nog over is ("Zijgoten dicht 20 s", "Ballon 2/3 raak", "Jackpottoren 7/12 lagen").

**Het scherm is overzichtelijker.** Eén glazen balk linksboven met je munten, kaartjes en spaarpot (en de superduwknop als je die hebt); je niveau rechtsboven (tik erop voor de kermispas); Okke linksonder; meldingen rechtsonder; een grote aankondiging als een lichtbord van de kermis, met lampjes langs de rand. Een nieuw niveau, een trap van de kermispas, je dagreeks en "Terwijl je weg was" komen als een kaart in het midden (tik om weg te halen). Op een staande telefoon staan de tellers bovenin en Okke onderin, en de kast schuift er precies tussen (de camera houdt er rekening mee). De vensters (start, kraam, kasten, instellingen, pauze, beheer) zijn donker glas met neon, in een tweede lettertype voor de koppen (Bungee, Google Fonts). De balk bovenin blijft de huisstijl van de site.

**De arcadehal** (`hal.js` in de bouw, `HAL` in de pagina): naast je kast staan andere muntenschuivers (eigen namen: Goudkoorts, Muntenmeer, Superschuif, Kermiskoers) met lichtjes die rondlopen, een lichtbord en munten achter het glas; achterin een rij speelkasten met schermen en lichtborden; een grijpkraan met knuffels; een prijzenkraam; neonborden; lampen in het plafond; het tapijt; onscherpe lichtjes in de verte en nevel. Alles wat stilstaat is per materiaal samengevoegd (zo'n 40 tekenopdrachten erbij), de lichtjes zijn puntjes.

**De gebeurtenissen** (alle uit het voorstel; in de natuurkunde `hek`, `turbo`, `schop`, `gekte`, `arm`, `veld`, `wip`, `ontplof`, `zetSoort`, `schiet` en `instort` in `MUNTFYSICA`):
- *Zijgoten dicht*: twee lichtgevende hekjes schuiven uit de vloer; 30 seconden gaat er niets in de zijgoten (in de natuurkunde echte wanden, ook in 3D). Gemeten: 0 munten in de zijgoot.
- *De magneet*: een rode hoefijzermagneet zakt aan een kabel en schuift links, midden, rechts boven de voorrand; daar trekt hij de munten naar voren.
- *Het muntenkanon*: een koperen loop schuift uit de linker zijwand en schiet 12 munten in een boog over de onderste vloer.
- *De vlaai* (in de Draaimolen een suikerspin): valt op de kast en spat uiteen in 15 munten, met kruimels.
- *De ballon*: zweeft voor de gleuf heen en weer; gooi je recht onder hem, dan raak je hem. Drie keer raak: hij knapt, en uit het luikje komt een edelsteen die je nog niet hebt, een gouden munt of drie kaartjes van 50.
- *De Jackpottoren*: een toren van gouden schijven op de schuiver (hij rijdt mee); elke 15 munten een laag, bij 12 lagen valt hij om en regent het munten en twee gouden munten (uit de pot).
- *Turbo*: een sirene; 12 seconden schuift de schuiver sneller (1,3 keer) en verder. (Alleen sneller duwde de stapel in elkaar: dan viel er juist minder.)
- *Het Wonder*: alles wordt donker op één lichtbundel na, dan stort de voorrand in, in slow motion, met een fanfare en vier gouden munten. Het komt met de datum bij Herinneringen in je verzameling. Hooguit eens per anderhalf uur spelen.
- *Per kast*: Kermisknaller (de Rommelschuiver: de kroonmunt draait en er vallen drie gouden munten), Volle maan (de Halvemaan: vijf slagen springtij), Multibal (de Flipperkast: de bumpers vaker, en 15 seconden duwt alles naar de rand; alleen harder schieten duwde de munten juist terug), Kermisgekte (de Draaimolen: de schijf draait een halve minuut hard rond), Stormwind (de Ruitenwisser: de arm veegt 15 seconden 1,45 keer zo ver), De klok slaat dertien (de Schatkamer: drie superduwen, en 1 op 5 de gouden sleutel), Hoge inzet (de Fichebank: 20 seconden telt elk fiche dubbel, uit de pot).
- *De feestdagen* (via `Scorebord.feest`): met Sinterklaas is een storm een Pepernotenregen met chocolademunten, met kerst een Sneeuwstorm met kerstballen, met oud en nieuw een Vuurwerkregen met vuurwerkmunten die knallen; en er komen feestmunten bij de tovermunten.

**De tovermunten** (soort 20 tot en met 29, achter de Reuzenmunt; in `TOVER` van de economie, elk met een eigen tekening en kleur): de ?-munt (een verrassing als hij landt), de bommunt (telt af 3, 2, 1 en blaast de munten weg), de magneetmunt (trekt de munten om zich heen 6 seconden naar zich toe), de kloonmunt (worden er drie), de stuitermunt (stuitert drie keer flink), de regenboogmunt (in de trechter: meteen Koorts), de gouden munt (10 munten waard), en de chocolademunt, kerstbalmunt en vuurwerkmunt in de feesttijd. Een derde tot de helft van de momenten van Okke is een tovermunt (zo'n 15 tot 28 per uur). Een tovermunt met een eenmalig kunstje die nog in de stapel ligt als je de pagina opnieuw opent, is een gewone munt geworden: zijn kunstje is voorbij.

**Je niveau, je dagreeks en de kermispas** (in `rommelschuiver-v1`: `xp`, `nv`, `rk`, `pas`, `glim`, `med`, `hr`, `zk`; de REGELS zijn niet veranderd, de scoreserver hoeft niet opnieuw):
- *Niveau*: 1 ervaring per munt die je erin gooit, 10 per gebeurtenis, 50 per prijs; nodig voor niveau L: 500 × (L − 1)^1,7. De titels en voordelen zoals in het voorstel (5 De magneet komt vaker, 8 Tovermunten vaker, 12 Gouden munten vaker, 16 Muntenstorm vaker, 20 Koorts duurt 25 seconden, 25 De Jackpottoren vaker, 30 Het Wonder vaker). Wie al speelde, begint op het niveau van de munten die hij al gooide, met een zakje met de beloningen die hij zo oversloeg (hooguit 600 munten en 6.000 kaartjes).
- *Dagreeks*: bovenop de 100 van die dag 5 munten per dag van je reeks in je spaarpot (hooguit 50); eens per week een vrijkaartje; bij 7 dagen een zakje met 5 tovermunten, bij 14 een glimmende munt, bij 30 een edelsteen (uit het luikje).
- *De kermispas* (per maand): 1 punt per munt, 20 per gebeurtenis, 50 per opdrachtje, 100 per prijs; **elke 1.500 punten een trap** (in het voorstel 3.000: het rekenmodel liet zien dat je dan pas na een maand bij trap 30 komt). Om en om 30 munten en 300 kaartjes, elke vijfde trap een zakje tovermunten, trap 15 een glimmende munt, trap 30 de medaille van de maand (elke maand een andere kleur en een ander teken).
- *Terwijl je weg was* (3 uur of langer weg): een kaartje van 50 of 100, of een gouden munt, bij de rand, met een kaart van Okke. Eén keer per keer dat je weg was: opnieuw laden geeft er niet nog een.
- *De verzameling*: een voorwerp dat je al hebt, is 1 op 5 keer glimmend (✦) in plaats van 25 kaartjes; Herinneringen (Het Wonder, met de dag) en de medailles van de kermispas.
- *Het rad*: draaide het rad 20 keer geen prijs, dan wordt de kans steeds groter; na 40 keer is het zeker een prijs.

**In de kraam** twee nieuwe tabbladen: **Kermispas** (je niveau en de titels, je dagreeks, de 30 trappen van deze maand) en **Okke's gids** (alle gebeurtenissen en tovermunten, en dat alles uit de pot van Okke komt). Het geheime beheermenu heeft een knop voor elke gebeurtenis (ook die van de kast) en elke tovermunt, en: een niveau omhoog, een trap van de kermispas, een zakje tovermunten, en "Terwijl je weg was".

**Geluid** (zelf gemaakt): een sirene (Turbo), een zoem die aanzwelt (de magneet), poef (het kanon), splets (de vlaai), boink en een knal (de ballon en de bom), tik-tak (de bom telt af), de hekjes, boing (de stuitermunt), een trillertje (een verrassing), het stemmetje van Okke, en een grote fanfare met klokken (Het Wonder).

**Gemeten** (26 en 27 november 2026):
- *Een uur spelen met alles erin* (de robot, een munt per halve seconde, met de echte natuurkunde, economie en spelleider, alle gebeurtenissen en tovermunten):

  | Kast | Terug van de 100 | Met de proefversie |
  |---|---|---|
  | De Rommelschuiver | 95,2 | 95,1 |
  | De Flipperkast | 94,8 | 93,6 |
  | De Schatkamer | 94,2 | 93,4 |
  | De Ruitenwisser | 85,7 (zonder het lichtjesrad, dat de robot niet speelt) | 85,9 |
  | De Halvemaan | 95,5 | 96,0 |
  | De Draaimolen | 94,3 | 95,4 |
  | De Fichebank | 90,4 (zonder de fiches uit het rad) | 89,9 |

  Overal onder de 100 van de 100: alles wat de spelleider extra geeft, komt uit zijn pot. Per uur zo'n 42 tot 54 momenten, waarvan een derde tot de helft een tovermunt.
- *Het rekenmodel van 60 dagen* (de economie met de echte regels): wie elke dag een uur speelt, is na twee maanden niveau 31 en haalt elke maand trap 30 van de kermispas; wie elke dag een kwartiertje speelt niveau 14 en trap 13. Met 3.000 punten per trap (zoals eerst voorgesteld) haalde ook de dagelijkse speler trap 30 bijna nooit; daarom 1.500.
- *Valsspelen* (8 tests): "Terwijl je weg was" één keer per keer weg (ook niet door opnieuw te laden), welkom terug één keer per dag, het welkom nooit meer dan 150, de pot nooit meer dan erin kwam, de dagreeks één keer per dag, geen dubbele beloningen, en rare opslag wordt rechtgezet.
- *Oude opslag*: een speler van de proefversie komt met al zijn munten, zijn stapel en zijn pot over, en begint op het niveau van de munten die hij al gooide, met één zakje (in de test 20.000 munten gegooid: niveau 9, +240 munten en +1.400 kaartjes). Speelt hij daarna even met een oude pagina uit de opslag van de browser (die kent de niveaus niet), dan geeft de nieuwe pagina het zakje niet nog een keer (`zak` in `rommelschuiver-apparaat`).
- *Hoe zwaar*: de traagste rekenstap van de natuurkunde zonder andere programma's ernaast 62 tot 126 ms, en in een kwartier spelen maar 6 van de 54.000 stappen boven 25 ms (bij een bom of een storm). De natuurkunde draait apart (in een Web Worker), dus het beeld loopt dan gewoon door.
- *In Chromium* (computer 1280 en 1440, telefoon iPhone 13 in donker, Zuinig, Normaal en Mooi, minder beweging): het beginscherm met Okke, spelen, alle gebeurtenissen en tovermunten met de knoppen van het beheermenu, Het Wonder, een nieuw niveau, de kraam met de Kermispas en Okke's gids, de lampjes van wat er loopt (ook twee tegelijk), en op de telefoon de kast tussen de tellers en Okke; nergens iets opzij te scrollen, geen fouten en geen overtredingen van het veiligheidsbeleid. **Niet getest: Safari en het geluid op een echte iPhone.**

## 34. Niet meer haperen, en De Treinbaan (27 november 2026)

Ruben: "Hij hapert some. Komt dat wellicht door de confetti linksboven? Daarnaast wil ik dat je een leuke, unieke, mooie, spannende, met veel beweging, nieuwe kast maakt." Uit drie ideeën koos hij **De Treinbaan**.

### 1. Het haperen

- **De confetti linksboven**: klopt. Het doekje voor de confetti lag verstopt en was 0 bij 0 groot, dus begon elke bui in de hoek linksboven, en het doekje werd bij elke bui opnieuw op maat gemaakt (dat geeft een hikje). Nu tekent de confetti in WebGL op het speelveld zelf (`CF` in `spannend.js`: één InstancedMesh met 420 snippers, getekend na de kast met `tekenOver()`), op de goede plek en zonder nieuw doekje.
- **De glazen panelen**: de balk met je munten, Okke, de meldingen en de vensters hadden een waas (`backdrop-filter`). Boven een bewegend 3D-beeld moet de browser die waas elk beeld opnieuw uitrekenen; dat kostte het meest. Ze zijn nu donker en een beetje doorzichtig, zonder waas.
- Gemeten: de natuurkunde en het tekenen van de lampjes waren het niet (zie de metingen per gebeurtenis in de kladmap).

### 2. De Treinbaan: wat het is

Een modelbaan op de onderste vloer: een stoomtreintje (een groene locomotief met messing banden, een rode voetplaat en rode wielen, en twee kiepwagens, een rode met kolen en een blauwe met goud) rijdt rondjes over een spoor in de vorm van een stadion en duwt de munten mee. Eigen tekeningen, geen bestaande trein of merk.

- **De vloer** is een modelbaan: gras, grind met houten bielzen en twee rails, een weg met een overweg (planken en haaientanden), een vijvertje met riet en waterlelies, bloemen, en langs de voorrand een perron met tegels, een gele streep en pijltjes.
- **De achterwand**: een zonsondergang achter de bergen, een stenen viaduct met een stoomtrein, huisjes met licht, en een stenen tunnel om het rad.
- **Bovenop**: een stenen viaduct met zes bogen tussen twee groene heuvels met een tunnel en een boompje, voor een geschilderd decor (lucht, wolken, een dorpje met een kerktoren en een molen). Een klein treintje rijdt van tunnel naar tunnel, wacht even in de tunnel en komt dan weer; twee seinen zetten hun arm omhoog en worden groen als het komt.
- **Beweging**: de wielen draaien met de afstand die de trein rijdt, de koppelstangen gaan rond, uit de schoorsteen komen wolkjes rook (sneller als hij hard rijdt), de wagens kiepen.
- **Geluid** (zelf gemaakt): tsjoeken zo snel als hij rijdt, het tikken van de rails (ta-dam), een fluitje (als hij na rust weer gaat rijden, en af en toe) en een sis van stoom.
- **Rust**: de trein rijdt zolang de schuiver loopt. Speel je even niet, dan remt hij zacht af en wacht hij; gooi je weer, dan trekt hij zacht op.

### 3. In de natuurkunde

- Elk rijtuig is een blok van soort `trein` (een rechthoek met ronde hoeken, zoals de arm van de Ruitenwisser). De voorkant en de achterkant liggen op het spoor (`V.spoorOp`), het rijtuig ligt daar recht tussen, ook in de bocht. Munten die het raakt, worden meegeduwd; wat erop ligt, rijdt mee.
- Het spoor (`KASTEN.trein.spoor`): rechte stukken van 160 mm, bochten met een straal van 53 mm, midden op 118 mm van de voorrand, 75 mm per seconde. De zijgoten zijn 4 mm (`XF` 236). Afgesteld met proeven: met een groter spoor dichter bij de rand duwde de trein te veel munten de zijgoten in (80 van de 100 terug, 17% in de zijgoten); zo is het 7%.
- Waar de trein staat, gaat mee in het bewaren van de stapel (in de kop, 4 bytes meer). Een stapel van een andere kast past er niet in.
- Zwaar? Nee: in een proef van 6 minuten gemiddeld 3,2 ms per stap (de Draaimolen 3,8 ms), en de traagste stap 51 ms (de Draaimolen 85 ms).

### 4. De gebeurtenissen van de Treinbaan (achteraan `GEB`)

- **De sneltrein**: een lang fluitje en stoom, en 15 seconden rijdt de trein 2,6 keer zo snel (`sneltrein`); hij trekt zacht op en remt zacht af. Het kleine treintje bovenop rijdt ook harder.
- **De goederentrein** (16 munten uit de pot): de wagens worden zichtbaar volgeladen met een berg munten; rijden ze langs de voorrand, dan kiepen ze naar je toe en storten de munten over de rand (`stort` in de natuurkunde, `treinKiep` in beeld). In een proef gingen er 9 van de 16 binnen 6 seconden de trechter in, de rest ligt aan de rand.
- **Turbo** heet hier **Volle stoom**, en maakt de trein ook sneller.
- De achtste kast kost 90.000 kaartjes (`KAST_PRIJS`), zoals elke kast: wat je als tweede, derde, ... opent, kost steeds meer.

### 5. Gemeten

- *Een uur spelen met de hele spelleider* (de robot met de echte natuurkunde, economie en spelleider): met de goederentrein die zijn munten stort zoals hij nu is **93,6 en 94,0 van de 100 terug** (twee verschillende zaadjes; met een eerdere goederentrein, waarvan de munten van de wagens gleden, 93,1 en 92,7). Net als de andere kasten (93 tot 95) onder de 100: wat de spelleider extra geeft, komt uit zijn pot. Per uur twee keer de sneltrein en één keer de goederentrein, en verder alles zoals in de andere kasten.
- *In Chromium*: alle acht kasten laden en spelen hun eigen gebeurtenissen zonder fouten of overtredingen van het veiligheidsbeleid; De Treinbaan op een computer (Zuinig, Normaal, Mooi), een telefoon (iPhone 13) en met minder beweging (dan geen rook, en het kiepen en de seinen zonder overgang); een stapel bewaren en terugladen (waar de trein stond); de opslag van de live-versie in de nieuwe pagina en terug.
- **Niet getest**: Safari en het geluid op een echte iPhone.

## 35. Eigen vormen, een eigen ring en schoonheidsfoutjes (28 november 2026, Rubens reactie)

Ruben: "De treinbaan rijdt niet over het spoor. Daarnaast wil ik dat je elke kast unieke vormen geeft, dus dat het niet allemaal recht is. Er zijn ook nog wat schoonheidsfoutjes, zoals de munt bovenin de kast, of de interface die soms in elkaar overloopt." En daarna: "Ik bedoelde met de vormen ook vooral in de kast, waar alle munten liggen. Daarnaast mag de ring ook een ander uiterlijk krijgen."

### 1. De trein op het spoor

De tekening van de vloer lag gespiegeld: de bovenkant van het plaatje ligt aan de voorrand (zo legt three.js een plaatje op de vloer), maar `vloerTrein` tekende de voorrand onderaan. De rails en het perron lagen daardoor achterin (een deel onder de schuiver), en de trein reed ervoor. Nu rekent `vloerTrein` met de as de goede kant op, en ligt de trein precies op de rails, ook in de bochten.

### 2. Vormen in de kast (waar de munten liggen)

Elke kast heeft een eigen **voorrand** en de meeste ook een eigen **voorkant van de schuiver** (`VORM` in de natuurkunde; z als functie van t = x / 240):

| Kast | Voorrand | Schuiver |
|---|---|---|
| De Rommelschuiver | twee bogen met een kuiltje ertussen (`hart`) | recht |
| De Halvemaan | de boog zoals hij was (niet veranderd) | de boog zoals hij was |
| De Flipperkast | een punt naar voren met rechte kanten (`punt`) | ook een punt (`schuifPunt`) |
| De Draaimolen | vijf schulpen, zoals de rand van een draaimolen (`schulp`) | hol, om de draaischijf heen (`schuifHol`) |
| De Ruitenwisser | een golf: rechts naar voren, links naar achteren (`golf`) | recht |
| De Schatkamer | twee treden, als een trap naar de schatkist (`trap`) | met een trede in het midden (`schuifTrap`) |
| De Fichebank | een speeltafel met schuine hoeken (`achthoek`) | recht |
| De Treinbaan | recht met ronde einden, zoals een perron (`perron`) | recht |

- *In de natuurkunde*: alle kasten gebruiken nu de manier van de Halvemaan (`boog`: de rand in stukjes, `bak`: tot waar de trechter loopt, daarbuiten de zijgoten), met een eigen functie (`boog.vorm`). De schuiver kan een eigen vorm hebben (`schuif`), met de helling uitgerekend (`schuifDZ`). Nieuw in `kastVorm`: `SB`, `randMax`, `schuifMax` en `schuifMin`.
- *Afgesteld met de robot*: met een gebogen rand vallen er veel minder munten in de zijgoten (de Flipperkast zou 100 van de 100 teruggeven). Ik heb daarom per kast onthouden waar elke vallende munt valt (een half uur, een munt per seconde, de trechter over de hele breedte) en daarmee voor elke breedte van de trechter uitgerekend hoeveel er in de zijgoten valt. Per kast heb ik de breedte gekozen waarbij de nieuwe vorm hetzelfde teruggeeft als de oude, rechte rand (op dezelfde manier gemeten): de Rommelschuiver 226,5 mm (was 234), de Flipperkast 228, de Draaimolen 229, de Ruitenwisser 222, de Schatkamer 224,5, de Fichebank 231 en de Treinbaan 242 (bij de Treinbaan vliegen munten bij de zijkanten over de rand naar buiten; die vallen altijd in de zijgoot, en dat was met de oude rand ook zo).
- *Een nieuwe stapel*: in een kast met een nieuwe vorm past de oude stapel niet meer. Het kenmerk van de stapel telt daarom de versie van de vorm mee (`vv`, `KENMERK`): zo'n kast begint met een nieuwe, volle stapel. Je munten, kaartjes en alles in de verzameling blijven gewoon staan. De Halvemaan is niet veranderd en houdt zijn stapel.
- *Het tekenen* volgt dezelfde vorm: de vloer, de chromen rand, de glijplaat, de schuiver (een dak, een band en een lip langs de bocht; bij een holle schuiver ligt het blok achter het diepste punt) en de hekjes. De print op de vloer ligt in vaste millimeters (`PRINT_VOOR`, de bovenkant 40 mm voor de rechte rand), behalve bij de Halvemaan: daar volgt hij de boog. Het perron van de Treinbaan volgt de ronde rand.

### 3. De ring (de trechter)

Elke kast heeft een eigen trechter (`TRECHTER`, `trechterKast`) en een eigen ring om het gat (`trechterRing`): de Rommelschuiver een circustent van bovenaf met lampjes om het gat, de Halvemaan een sterrenhemel met een stralenkrans, de Flipperkast bliksems en een bumper van chroom, de Draaimolen het dak van een draaimolen met een gouden ring met parels, de Ruitenwisser een draaikolk met schuim, de Schatkamer een molensteen met goud en een gouden ring met edelstenen, de Fichebank een roulettewiel met een gouden rand en ruitjes, en de Treinbaan een rood treinwiel met spaken en een koperen naaf. Wat oplicht als er een munt in valt (`G.keelMat`), doet dat nog steeds. De gouden trechter uit de kraam blijft geborsteld goud.

### 4. Vormen aan de buitenkant

- *De zijkanten* (`ZIJVORM`: hoeveel mm de buitenkant uitsteekt op elke hoogte): de Rommelschuiver een uitlopende voet en brede, ronde schouders, de Halvemaan een sikkel (één grote boog), de Flipperkast hoekig (een smallere voet en bovenin schuin naar buiten), de Draaimolen gedraaide zuilen met een kapiteel, de Ruitenwisser een druppel (onderin dik), de Schatkamer een zuil met treden en een kapiteel, de Fichebank art deco in treden, en de Treinbaan een brede onderkant met bovenin een uitlopende schoorsteen. De zijwanden, de onderkast, de plint, de chromen buizen, de neonbuizen en de lampjes volgen die vorm. De camera kijkt zo ver terug dat de hele kast past.
- *Het neonbord* (`bordOmtrek`): een kermisbord met schulpen, een ovaal, een achthoek, een koepeltje met schulpen, een wolk, een stenen plaat met holle hoeken, art-deco-hoeken met treden en een stationsbord met ronde einden, met een chromen rand en lampjes langs de vorm (`langsOmtrek`).

### 5. De schoonheidsfoutjes

- *De munt bovenin*: bij de Rommelschuiver (en de Halvemaan, de Draaimolen en de Treinbaan) viel de bovenkant van de kast net buiten beeld, met de munt erin. De camera kijkt nu zo dat de hele kop past.
- *De interface*: de tip bij het begin ("Klik om een munt te laten vallen") stond onderin en schoof onder 1.100 punten breed over het paneel van Okke; op een telefoon viel hij deels buiten beeld. Hij staat nu bovenin het midden en mag over twee regels. Gecontroleerd met een script dat bij 18 schermmaten (van 1600 × 900 tot 360 × 640 en liggende telefoons) kijkt of panelen elkaar raken, ook tijdens een muntenstorm: nergens meer.
- *Een oude fout erbij gevonden*: als het hulpje (de natuurkunde in een Web Worker) niet binnen 4 seconden antwoordde, nam de pagina het over, maar de opgeslagen stapel was dan al aan het hulpje gegeven, en de kast liep vast. Dat kon op een trage telefoon gebeuren. Nu zegt het hulpje meteen hallo als het een bericht krijgt, en geeft de pagina tot dat moment niets weg.

### 6. Gemeten

- *De kast zelf* (een munt per seconde, een half uur, van wat eruit valt het deel in de trechter; oud en nieuw op dezelfde manier): zie boven bij 2.
- *Een uur spelen met de hele spelleider* (de robot met de echte natuurkunde, economie en spelleider):

  | Kast | Terug van de 100 | Daarvoor (hoofdstuk 33 en 34) |
  |---|---|---|
  | De Rommelschuiver | 94,1 | 95,2 |
  | De Flipperkast | 92,8 | 94,8 |
  | De Draaimolen | 95,0 | 94,3 |
  | De Ruitenwisser | 84,8 (zonder het lichtjesrad) | 85,7 |
  | De Schatkamer | 94,1 | 94,2 |
  | De Fichebank | 89,6 (zonder de fiches uit het rad) | 90,4 |
  | De Treinbaan | 92,3 | 93,6 en 94,0 |
  | De Halvemaan (niet veranderd) | 95,5 | 95,5 |

  Overal onder de 100 van de 100, en dicht bij hoe het was. De traagste rekenstap was in deze metingen hoog (tot 1,9 s), omdat er vier robots en een browser tegelijk draaiden; dat zegt niets over het spel.

- *In Node*: alle kasten spelen en komen tot rust zonder fouten, munten tellen precies, niets door de vloer.
- *In Chromium*: alle acht kasten op een computer en een telefoon (Zuinig, Normaal en Mooi), met hun eigen gebeurtenissen; de nieuwe vormen van boven en van voren; de trechters van dichtbij; oude opslag van de versie die online staat in de nieuwe pagina en terug (de munten en kaartjes blijven, de Halvemaan houdt zijn stapel, de andere kasten krijgen een nieuwe); nergens fouten of overtredingen van het veiligheidsbeleid; de gedeelde blokken overal gelijk.
- **Niet getest**: Safari en het geluid op een echte iPhone.

## 36. Een eigen Prijzenpoort per kast (28 november 2026, Rubens reactie)

Ruben: "Ik bedoelde ook meer de poort die verbonden staat met het rad." Hoofdstuk 35 gaf elke kast een eigen ring om het gat van de trechter; nu krijgt ook het poortje dat boven het rad heen en weer schuift (de Prijzenpoort) per kast een eigen uiterlijk. Wat er gebeurt als je munt erdoorheen valt, en hoe breed de opening is, is precies hetzelfde gebleven.

| Kast | De poort |
|---|---|
| De Rommelschuiver | een circushoepel met rood-witte strepen, lampjes en een rood en een geel vlaggetje |
| De Halvemaan | een halvemaan met kratertjes om een parelmoeren ringetje, met drie sterretjes |
| De Flipperkast | een achthoekige bumper van satijnen metaal met een rode rubberen rand, gekleurde ronde lampjes, twee paaltjes met rubber en een gele pijl erboven |
| De Draaimolen | een gouden schulprand met parels, een rood randje, en een rood-wit dakje met een vlaggetje |
| De Ruitenwisser | een druppel van blauw glas met een chromen randje, een glimmertje en schuimbelletjes |
| De Schatkamer | een gouden sleutelschild met een sleutelgat als opening, en vier edelstenen |
| De Fichebank | een zwart gelakte art-deco-plaat met getrapte hoeken, een gouden rand, ruitvormige lampjes en een gouden waaier erboven |
| De Treinbaan | de voorkant van een stoomlocje: de rookkast met klinknagels, een schoorsteen met een koperen kap, een rode bufferbalk met buffers en twee lantaarns |

- *Hoe*: `poortVorm` in `poort.js` (vlakke vormen met een gat, uitgetrokken met een afgeronde rand, plus wat bolletjes, kegels en cilinders). De poort rijdt op twee sledes achter de lijst (niet meer met een blokje midden in de opening), en de rail heeft de kleur van de poort (goud, chroom of koper). De lampjes volgen de vorm (6 tot 12), met per kast een eigen kleur als de poort open is (`POORT_LAMP`); dicht lopen ze rood vol en tijdens het draaien zijn ze uit, zoals altijd.
- *Grenzen*: de opening is rond het midden minstens 14 mm breed (een munt telt binnen 13 mm), alles blijft tussen de achterwand en het glas, en hooguit zo'n 21 mm onder het midden, zodat de poort niet over het rad hangt. Vlak chroom spiegelde de donkere hal (dan werd hij zwart); daarom zijn de vlakke delen van de flipper en de buffers van de loc van satijnen metaal.
- *Getest* (Chromium): alle acht kasten van dichtbij, schuin van opzij en met het rad (Mooi), op een computer en een telefoon (Normaal), en per kast munten door de poort gemikt tot het rad draaide (Zuinig): overal draaide het rad en ging de poort daarna dicht, zonder fouten.
- **Niet getest**: Safari op een echte iPhone.

