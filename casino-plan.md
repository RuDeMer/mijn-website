# Plan: Casino Rommelroyaal

Voorstel van 4 november 2026, door Claude Code. Nog niet goedgekeurd.
De proefpagina `rommelcasino-proef.html` laat de ingang, de lobby en één tafel (blackjack) zien.

## In het kort

- Een casino met **alleen speelfiches**. Nooit echt geld, niets te koop, geen reclame. Fiches zijn buiten het casino niets waard.
- **Zes spellen** in **vijf zalen**, die je vrijspeelt met **sterren** uit uitdagingen. Je wordt dus beloond voor slim spelen en leren, niet voor veel inzetten.
- Elke dag **de hand van de dag** (blackjack, voor iedereen dezelfde kaarten) en elke week **het toernooi van de week**. Alleen die tellen voor het scorebord: je slimheid, niet je fiches.
- Overal staan de echte kansen, en er is een onderdeel **Waarom het huis altijd wint**.

## 1. De naam en de stijl

- **Casino Rommelroyaal**, in het bestand `rommelcasino.html`, met de opslag `rommelcasino-v1`.
- **De stijl** (zie de proef): de diepe kleurverlopen van Zoals in de reclame, met alles wat je meteen als casino herkent:
  - een eigen gebouw in art-deco, met een neonbord dat gloeit en af en toe flikkert, lampjes die rondlopen, een rood tapijt en koperen paaltjes met fluwelen koorden;
  - **Moeki en Floortje als portiers**, met een rood petje en een strikje (ze knipperen, zwaaien met hun staart, en tikken hun pet aan als je naar binnen gaat);
  - groen vilt met een gouden biesje, kaarten met een eigen voorkant (met de Nederlandse **boer, vrouw en heer**) en een eigen achterkant, en fiches met een vlaai, een kroon en het kopje van Moeki;
  - **licht** is het gouden uur (een zonsondergang), **donker** is de nacht (maan, sterren en verlichte ramen in de stad).
- **Namen**:
  - de zalen: **De Rommelbar**, **De Lampjeshal**, **De Groene Salon**, **Het Sterrendak** en **De Gouden Zaal**;
  - de spellen: **Blackjack**, **Hoger of lager**, **De Rommelrollen** (de fruitautomaat), **Knikkerval** (bewust niet "Plinko": dat is een merknaam), **Roulette** en **Het Rommelrad**;
  - de coach: **Oehoe, de rekenuil**.
- **Niets overgenomen**: geen namen, logo's, tekeningen, geluiden of schermen van echte casino's, merken, fruitautomaten of andere spellen. Alles is eigen werk.

## 2. De spellen

Elk spel heeft een knop **Kansen** met de regels, de kansen en wat het huis gemiddeld wint, in gewone taal. Inzetten gaan per 10 fiches, zodat elke uitbetaling een heel aantal fiches is.

| Spel | Zaal | Hoe het werkt | Het huis wint gemiddeld |
|---|---|---|---|
| **Blackjack** | De Rommelbar | 6 spellen, voor elke hand geschud. De bank past vanaf 17. Blackjack betaalt 3 tot 2. Verdubbelen met elke twee kaarten (ook na splitsen), één keer splitsen. | **0,5%** met de beste keuzes (nagerekend: 0,495% ± 0,18% over 1,5 miljoen handen). Wie speelt zoals de bank: 5,7%. |
| **Hoger of lager** | De Rommelbar | Raad of de volgende kaart hoger of lager is. Elke goede gok vermenigvuldigt je inzet; stop wanneer je wilt. | **3% per gok** (je krijgt 0,97 gedeeld door de kans). |
| **De Rommelrollen** | De Lampjeshal | Een fruitautomaat met drie rollen en één winlijn: vlaai, kers, bel, ster, kroon en Moeki als joker. Ongeveer 1 op 4 draaien is raak. | **4%** (96 van elke 100 fiches komen terug). |
| **Knikkerval** | De Lampjeshal | Een knikker valt langs 12 rijen pinnen in een van 13 bakjes. Drie standen: rustig, gewoon en wild (de bakjes aan de rand betalen meer, maar komen veel minder vaak). | **3%** in elke stand. |
| **Roulette** | De Groene Salon | Europees wiel met 37 vakken (0 tot en met 36). Op een nummer, een paar, een hoek, een lijn, een dozijn, een kolom, rood of zwart, even of oneven, laag of hoog. | **2,7%** op elke inzet (1 van de 37 vakken is de 0). |
| **Het Rommelrad** | De Gouden Zaal | Een groot rad met 25 vakjes: 12 × "keer 2", 6 × "keer 4", 4 × "keer 6", 2 × "keer 12" en 1 × "keer 24". | **4%** op elk vakje (elk vakje geeft gemiddeld 96 van de 100 terug). |

Rommelpoker blijft een eigen spel: in het casino komt geen poker.

**Wat elk spel mooi maakt**:
- **Blackjack**: kaarten die met een boog uit de schoen over het vilt zweven en echt omdraaien, fiches die op de stapel vallen en uitwiebelen, licht dat over het vilt glijdt, en een regen van fiches bij blackjack. Oehoe vertelt bij elke keuze wat het beste is, en waarom (uit te zetten).
- **Hoger of lager**: een ladder van neon die oplicht bij elke goede gok, met de stand en de uitbetaling erbij.
- **De Rommelrollen**: rollen met bewegingsonscherpte die afremmen en terugveren, lampjes langs de kast, en een feestje met munten en licht bij winst.
- **Knikkerval**: echte natuurkunde: de knikker stuitert langs de pinnen, de pinnen trillen even na, en elk bakje heeft een eigen toon.
- **Roulette**: een wiel van hout en goud met een balletje met echte natuurkunde: het rolt in de goot, verliest vaart, raakt de ruitjes, stuitert over de vakjes en rolt uit.
- **Het Rommelrad**: een groot rad met pinnetjes en een wijzer die tikt, sneller en langzamer.

**Hoe de uitkomst eerlijk blijft** (ook met echte natuurkunde): eerst bepaalt `crypto.getRandomValues` de uitkomst, met precies de kansen die je ziet. Daarna laat het spel de natuurkunde zo lopen dat hij daar uitkomt. Bij roulette rekent het spel het balletje echt uit en draait het wiel met een vaste hoek mee (een wiel is rond, dus dat verandert niets aan hoe het eruitziet). Bij Knikkerval kiest het eerst een pad naar het juiste bakje, en geeft het de knikker bij elke pin een heel klein duwtje die kant op.

## 3. Bijna gewonnen: de bijna-momenten

Alleen bij een **verliesbeurt** mag het spel er vaker "bijna" uit laten zien dan het toeval vanzelf zou doen. Met spanning erbij: de laatste rol draait langzamer, de lampjes knipperen, en de muziek houdt even de adem in.

| Spel | Hoe het eruitziet | Bij echt toeval (ongeveer) | Wat het spel laat zien |
|---|---|---|---|
| De Rommelrollen | Twee kroontjes op de lijn, de derde net erboven of eronder | 1 op 30 verliesbeurten | **1 op 5** |
| Roulette (als je op losse nummers zet) | Het balletje springt in je nummer, wiebelt, en rolt eruit naar de buurman | 1 op 12 | **1 op 4** |
| Knikkerval | De knikker wiebelt op de laatste pin boven een beter bakje, en valt de andere kant op | 1 op 10 | **1 op 4** |
| Het Rommelrad | De wijzer tikt nog net tegen het pinnetje van je vakje, en valt terug | 1 op 12 | **1 op 4** |
| Blackjack en Hoger of lager | **Geen**: de kaarten zijn de uitkomst, daar verandert het spel niets aan. | | |

De getallen "bij echt toeval" reken ik precies uit als ik de spellen bouw; ze komen zo in het spel te staan.

**De regel**: of je wint en hoeveel, komt altijd eerst uit `crypto.getRandomValues`. Het "bijna" kiest daarna alleen hoe een verliesbeurt eruitziet, met een eigen, aparte stroom toeval. **De test**: met dezelfde stroom voor de uitkomst moeten de uitkomsten met en zonder bijna-momenten bit voor bit gelijk zijn, en over een miljoen rondes per spel kloppen met de kansen in de tabel.

In **Waarom het huis altijd wint** staat hoe vaak jij "bijna" won, hoeveel daarvan het spel expres liet zien, en dat echte fruitautomaten dit trucje ook gebruiken om je door te laten spelen. **Voorstel**: daar ook een schakelaar "Laat het zien zoals het echte toeval" (de bijna-momenten uit), zodat je het verschil zelf kunt zien.

## 4. Eerlijk en verantwoord

- **Geen andere trucjes**: geen aftelklokken, geen "nog één keer" na verlies, geen geluid dat verlies als winst laat klinken. Krijg je minder terug dan je inzette (bijvoorbeeld een bakje van 0,5 bij Knikkerval), dan heet het verlies, zonder feestje.
- **Nooit blut**: je begint met 1.000 fiches. Heb je bij het begin van een dag minder dan 100, dan vult de kassa je stapel aan tot 1.000. Dat gebeurt stilletjes, voor iedereen hetzelfde, en nooit meer dan tot 1.000, zodat het niet voelt als een beloning voor verliezen.
- **Geen dagelijkse fiches-bonus en geen fichewinkel**: terugkomen beloont je met de hand van de dag en uitdagingen, niet met meer fiches. Bewust geen winkel waar je fiches uitgeeft: dan wordt winnen belangrijk, en dat is precies het trucje van echte casino's.
- **Een pauze**: na 30 minuten achter elkaar spelen (alleen de tijd dat je echt speelt) komt Moeki geeuwend vragen of je even iets anders wilt doen. Je fiches blijven gewoon liggen. De tijd is in te stellen (20, 30, 45 of 60 minuten), maar niet uit te zetten.
- **Waarom het huis altijd wint**: bovenaan "Alleen voor de lol, met speelfiches. Echt gokken is iets heel anders." Dan een simulatie van duizend potjes (per spel, met de echte regels), waarin je ziet waar de fiches heen gaan: een stapel die langzaam naar het huis schuift, en een lijn die soms omhoog gaat maar altijd terugzakt. Daaronder je eigen cijfers (ingezet, terug, gemiddeld per 100) en de bijna-momenten. En een korte zin: echt gokken mag in Nederland pas vanaf 18 jaar.
- Alles werkt met muis, aanraken en toetsenbord, met teksten voor een schermlezer, en rustig bij `prefers-reduced-motion`.

## 5. Vrijspelen en verzamelen

- **Sterren** krijg je met **uitdagingen** (ongeveer 40, samen ongeveer 75 sterren; dat wordt `voortgangTotaal`). Vier soorten:
  - *leren*: hoe een spel werkt, de simulatie van duizend potjes;
  - *slim*: tien handen achter elkaar de beste keuze (coach uit), de verzekering afslaan als de bank een aas laat zien, 100% slim bij de hand van de dag, vijf dagen de hand van de dag;
  - *geluk*: drie keer achter elkaar blackjack, drie vlaaien op een rij, een knikker in het buitenste bakje, het balletje op de 0;
  - *verstandig*: stoppen bij Hoger of lager terwijl je wint, op tijd pauze nemen als Moeki erom vraagt.
- **De zalen**, elk met een eigen sfeer, tafelkleed en muziek:

| Zaal | Open bij | Spellen | Sfeer | Hoogste inzet |
|---|---|---|---|---|
| De Rommelbar | meteen | Blackjack, Hoger of lager | warm hout, een zachte piano | 200 |
| De Lampjeshal | 4 sterren | De Rommelrollen, Knikkerval | neon en lampjes, zachte synthesizers | 500 |
| De Groene Salon | 10 sterren | Roulette (en de tafels van hierboven) | kroonluchters, groen vilt, strijkers | 1.000 |
| Het Sterrendak | 20 sterren | alle spellen, onder de sterren | nachtblauw vilt, dromerige muziek | 2.000 |
| De Gouden Zaal | 35 sterren | Het Rommelrad, en alles in goud | goud en marmer, swing | 5.000 |

- **De verzameling** (je kluisje), allemaal te verdienen met uitdagingen, niets te koop: ongeveer 12 fiches (vlaai, kroon, Moeki, Floortje, knikker, dobbelsteen, ster, kroonkurk, neon, goud, ...), 8 kaartruggen, 8 tafelkleden, 8 neonborden (je kiest welk bord er boven de ingang hangt) en 4 petjes voor de portiers.

## 6. Terugkomen

- **De hand van de dag**: tien handen blackjack, voor iedereen dezelfde kaarten (geschud met een vast zaadje uit de datum, Nederlandse tijd). De coach staat uit; na elke hand laat Oehoe zien of je de beste keuze maakte, en waarom. Je score is het deel van je keuzes dat de beste was (0 tot 100). Je speelt met aparte dagfiches, dus je eigen stapel speelt niet mee. Eén keer per dag; gemiste dagen kun je naspelen (dat telt niet mee).
  - **Valsspelen helpt niet**: de score meet of je de beste keuze maakte met wat je op dat moment wist, niet hoe het afliep. Wie de kaarten van morgen uit de code haalt, scoort daar dus niet hoger door.
- **Het toernooi van de week**: de zeven handen van de dag van maandag tot en met zondag samen (hooguit 700), met een eigen weekbord.
- **Uitdagingen** en **de verzameling** (zie hierboven).

## 7. Het scorebord

- `casino` (**Casino Rommelroyaal**): alle punten van de hand van de dag bij elkaar (elke dag hooguit 100), extra = je beste week. Zo telt slim spelen én terugkomen. Grens: 1.000.000.
- `cw` + weeknummer (**Toernooi van de week**): de punten van die week, hooguit 700; extra = de dagfiches die je die week overhield. De twee nieuwste weken staan op het scorebord, zoals de Kroon van de week.
- Je fiches tellen nergens mee.
- De pagina stuurt deze scores pas als de scoreserver de nieuwe versie heeft (zoals bij Rommelkroon), en **de pagina gaat pas online als de nieuwe scoreserver in Cloudflare staat**.

## 8. Techniek en de site

- **Eén bestand**, `rommelcasino.html`: Canvas 2D voor de tafels, SVG voor de ingang, Web Audio voor geluid en muziek, geen scripts van buiten. Een veiligheidsbeleid zoals Zoals in de reclame. Alleen tekenen als er iets beweegt; in rust en in een verborgen tabblad niets.
- **Opslag** `rommelcasino-v1` (een paar kB): `f` (fiches), `kassa` (de dag van de laatste aanvulling), `n` (rondes gespeeld), `st` (per spel: rondes, ingezet, terug), `bijna` (per spel: getoond, waarvan expres), `u` (uitdagingen: id en dag), `kast` (verdiende spullen), `kies` (je keuzes uit de verzameling), `dag` (per dag: score, dagfiches, keuzes), `inst` (geluid, muziek, coach, pauzetijd), `bezig` (een ronde die al loopt), `voortgangTotaal`.
  - Een ronde wordt **bewaard voordat hij begint**: de inzet is al weg en de uitkomst staat al vast. Herlaad je midden in een draai, dan zie je gewoon de uitslag. Zo kun je een verlies niet wegklikken en een winst niet verdubbelen.
- **De REGELS voor het koppelen** (in het gedeelde blok én in de scoreserver, letterlijk gelijk):
  - fiches, de kassa, het aantal rondes en een lopende ronde: **de meeste voortgang wint in zijn geheel** (de maat: rondes gespeeld, uitdagingen, gespeelde dagen);
  - uitdagingen en de verzameling: **samen** (alles wordt verdiend, niets gekocht, dus er valt niets te verdubbelen);
  - de hand van de dag: **de eerste uitslag van een dag telt**;
  - de statistieken: **tellers**; je keuzes en instellingen: **de laatste keuze**.
  - Het gedeelde blok krijgt daarbij `rommelcasino-v1` in `SLEUTELS`, `BRONNEN.casino`, het weekbord `cw` (zoals `kw`) en `BV = 8`.
- **De scoreserver**: `casino` in `SPELLEN`, het weekbord `cw` (zoals `KROONWEEK`), de nieuwe REGELS, `BLOK_NU = 8`, en `rommelcasino-v1` in `TIJD_SPEL` (de tijdmachine). **Daarvoor heb ik de code nodig die nu in Cloudflare draait (versie 2026-11-04)**; ik lever dan het hele bestand terug.
- **De homepage**: een icoon `casino` (een fiche met een kroon), het onderschrift "Speelfiches, neon en een rekenuil", de voortgang "x van 75 sterren", in de categorie Snel een potje. Het label zet je zelf met de werkplaats (de werkplaats leert het icoon kennen).
- **De werkplaats**: `SPELINFO` en `KAN` voor het casino. **Het scorebord**: twee regels met uitleg. **Privacy en huisregels**: een paar zinnen (alleen speelfiches, niets kopen, wat er bewaard wordt). **CLAUDE.md**: een hoofdstuk.

## 9. Volgorde van bouwen

1. **Nu**: dit plan en de proef. Jij kijkt of de stijl goed is.
2. **De basis en twee spellen helemaal af**: blackjack (met de coach, de hand van de dag en de uitdagingen) en De Rommelrollen (met de bijna-momenten en Waarom het huis altijd wint).
3. **De andere vier spellen**, de zalen, de verzameling en het toernooi van de week.
4. **De site**: het gedeelde blok en de REGELS, de scoreserver, de homepage, het scorebord, de werkplaats, privacy en huisregels.
5. **Testen**: met code (een miljoen rondes per spel, met en zonder bijna-momenten; geen manier om eindeloos fiches te maken; de hand van de dag voor iedereen gelijk; bewaren en laden; de REGELS met twee apparaten) en in een echte browser (telefoon en computer, licht en donker, zonder fouten of overtredingen van het veiligheidsbeleid). Daarna laat ik je zien wat er in de commit gaat.

## 10. Wat ik van je wil weten

1. Is de stijl van de proef goed, of wil je iets anders (meer of minder neon, andere kleuren, de katten anders)?
2. Mag de schakelaar "Laat het zien zoals het echte toeval" erin? (Mijn advies: ja.)
3. Moet de hand van de dag ook bij **Puzzels van vandaag** op de homepage? (Mijn advies: nee, het casino blijft rustig op de achtergrond.)
4. Wil je de code van de scoreserver plakken die nu in Cloudflare draait? Die heb ik nodig voor stap 4.
