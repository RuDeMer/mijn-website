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

- **Waarom ze dansten**: de torenregel van hoofdstuk 28 duwde elke bovenste munt die hoger dan 11 mm boven de schuiver lag eraf, ook als hij op een brede berg of een dikke laag lag. In een volle kast liggen de bovenste munten van zo'n laag net rond die grens (wat schuin, op munten van verschillende hoogte). Zo'n munt kreeg een duw, gleed naar een buurplek die net zo hoog was, kreeg weer een duw, enzovoort: een munt die over de berg rondrent. Gemeten in een volle Schatkamer, een minuut zonder te gooien: tot 1,5 meter per minuut.
- **De regel nu** (`torenVal` in de natuurkunde): een munt die te hoog ligt (`TOREN_H`, nu 11,6 mm: de zesde munt) glijdt alleen nog als er vlakbij (in acht richtingen, 22 en 30 mm van zijn midden) een plek is die minstens anderhalve munt lager ligt dan zijn onderkant, en dan precies die kant op. Ligt hij op een vlakke laag, dan blijft hij liggen. Een echte toren brokkelt dus nog steeds af, en een steile berg zakt in, maar op een brede laag rent niets meer rond.
- **Eerst geprobeerd**: alleen duwen als er naast de munt geen munt even hoog ligt (een smalle toren). Dan dansten er nog minder munten, maar de kast liep weer vol: bij 240 munten per minuut op één plek 1.710 munten (met de oude regel 1.350), omdat er dan een brede berg groeit. Dat is dus niet gebleven.
- **Gemeten** (een volle Schatkamer, een minuut kijken zonder te gooien, drie zaadjes): munten die duidelijk zichtbaar rondschuiven (meer dan 40 cm in die minuut) 15, 5 en 14 met de oude regel, nu 6, 0 en 3; alles bij elkaar schuiven de munten 1,8 tot 5 keer minder. Wat er nog schuift, zijn vooral munten tegen de achterwand, die de schuiver op elkaar drukt als hij terugloopt (dat deed hij altijd al, in de maat van de schuiver). Met 240 munten per minuut op één plek blijft de kast rond de 1.390 munten (met de oude regel 1.350).
