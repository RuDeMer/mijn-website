# Ruben's rommelhoekje

Dit is de persoonlijke website van Ruben, gehost met GitHub Pages vanaf de main-branch (root). Ruben is beginner met code en GitHub: leg wijzigingen kort en in gewone taal uit, in het Nederlands.

## Hoe de site werkt

- `index.html` is de homepage. Elke tool of elk spel hangt daar als prijskaartje ("label") onder "Aan de haak".
- Elke tool is één zelfstandig HTML-bestand in de root, bijvoorbeeld `rommelpoker.html`. CSS en JavaScript staan in het bestand zelf.
- Er is geen build-stap. Wat in de repo staat, staat live.
- Onderaan de homepage staat een versienummer in de vorm `Versie 0.05`. Verhoog het bij elke update met 0.01 (0.09 wordt 0.10, 0.99 wordt 1.00), zodat Ruben kan controleren dat de update live staat. Een oud nummer zonder punt, zoals `Versie 4`, telt als 0.04.
- `werkplaats.html` is Rubens eigen uploadpagina en homepage-editor. In het paneel Homepage past hij het briefje, de volgorde van de labels, het stempel Nieuw, zichtbaarheid, teksten en iconen aan, met een live voorbeeld. De editor leest en schrijft de labels binnen `.haak-rij`; houd die structuur dus aan (`div.label` met `a.label-kaart`, `.soort`, `.stempel`, `.naam`, `p`, `.doe`, en een verborgen label krijgt het attribuut `hidden`). De werkplaats staat bewust niet op de homepage en krijgt nooit een label. Hij zet bestanden online via de GitHub API met een sleutel die alleen in zijn browser staat, en verhoogt daarbij zelf het versienummer.

- **Indeling** (sinds de herinrichting): na het verbinden een vaste bovenbalk met de verbinding, een link naar de site en tabbladen: Uploaden (standaard), Homepage, Scorebord en ideeën, Geschiedenis en Sleutel. Het gekozen tabblad wordt onthouden (localStorage `wp-tab`). Panelen hebben `class="wp-deel" data-tab="..."`; een nieuw onderdeel krijgt die ook, plus een knop in `.wp-tabs`.
- Bestanden kun je overal op de pagina loslaten; dan gaat de werkplaats naar Uploaden. De balk met "Zet online" blijft in beeld zodra er bestanden klaarstaan, met een telling. De homepage staat op brede schermen naast het voorbeeld. Het rondhangende gereedschap verdwijnt na het verbinden.

## Regels voor nieuwe of aangepaste pagina's

- Alle tekst voor bezoekers is Nederlands.
- Geen functies die alleen binnen Claude werken: geen `window.claude`, geen `window.storage`, geen aanroepen naar api.anthropic.com. Voor bewaren per bezoeker mag `localStorage`, altijd binnen try/catch.
- Nooit wachtwoorden, API-sleutels of andere geheimen in de repo zetten. De repo is openbaar.
- Werkt goed op telefoon (vanaf 360 px breed) en ondersteunt `prefers-reduced-motion`.
- Bij een nieuwe tool: voeg een label toe op de homepage met een link en een korte beschrijving. Het "Binnenkort"-label blijft als laatste staan.
- Gebruik geen namen, plaatjes of personages van bestaande merken, games of films. Eigen namen en eigen ontwerpen.

## Huisstijl

- Thema: een gaatjesbord in een schuurtje of op een rommelmarkt. Labeltape, vastgeprikte briefjes, prijskaartjes aan touwtjes.
- Lettertype: Bricolage Grotesque via Google Fonts, met system-ui als terugval.
- Kleuren: bord `#2F4C8F` met gaatjes `#1E3263`, manila `#F2DDA0`, papier `#FBF6E9`, inkt `#1F2333`, rood `#C8323C`, labeltape `#23252B`, hout `#7A4E2D`, munt `#E9B949`.
- Elk spel heeft een eigen icoon. Op de homepage kies je het met `data-icoon` op de `label-kaart` (kaarten, woord, doos, puzzel, dobbelsteen, controller, potlood, ster, label); het script onderaan de homepage tekent het icoon. Hetzelfde icoon staat in de kop van het spel en als favicon.
- Op elke pagina hangt gereedschap aan het gaatjesbord. `div.rek` elementen met `data-gereedschap` (bijvoorbeeld `hamer,zaag,tang`) bepalen alleen waar het gereedschap eerst hangt; het gereedschapsscript zet alles op één laag over de hele pagina. Bezoekers kunnen het met de muis naar elk vrij gaatje slepen. Het gereedschap is een echte slinger (zwaartekracht met een sinus, geen hoekgrens): een tik geeft een klein zwaaitje, blijven klikken of flink zwieren laat het over de kop gaan. Het script laat gereedschap nooit over tekst, knoppen of panelen hangen (lijst `HINDER`) en schuift het opzij als de pagina verandert. `body` heeft `data-gat` (afstand tussen de gaatjes in px) en `data-pagina`.
- Alle decoratieve elementen (labeltape, briefjes, labels, stempels, iconen) krijgen een kleine hover-animatie. Zet animaties altijd binnen `@media (prefers-reduced-motion: no-preference)`.
- Gebruik nooit `:hover` met een transform op het element dat zelf beweegt: het schuift dan onder de muis vandaan en gaat haperen. Decoratieve animaties lopen via het bewegingsscript onderaan elke pagina (lijst `SOORTEN`, veren in `VEER`): elke keer dat de muis een element raakt krijgt het een zetje, en een veer brengt het vloeiend terug. Er wordt nooit een animatie opnieuw gestart.
- De werkplaats werkt bij elke update de scripts voor iconen, gereedschap en animaties op de homepage bij, zonder labels of teksten aan te raken. Daarom hoeft `index.html` zelden in zijn geheel vervangen te worden. Zijn die scripts op de homepage ouder dan in de werkplaats, dan toont het Homepage-paneel een knop 'Werk mijn homepage bij'.
- Opgeslagen spellen, records en gereedschapsplekken staan in de browser van de bezoeker (localStorage), niet in de bestanden. Een update laat ze staan, zolang de sleutelnamen (zoals `vlaaienbakker-v1`, `rommelpoker-spel-v2`, `rommelwoord-stats-v1`) en de opbouw van de gegevens hetzelfde blijven.

## Rommelpoker

- Eigen kaartspel in `rommelpoker.html`: pokerhanden, fiches × mult, acht markten met elk een kleine kraam, een grote kraam en een baas (24 kraampjes), daarna eindeloos. Snuisterijen en handboekjes koop je in de winkel. Een lopend spel wordt in localStorage bewaard.
- De spelregels en balans staan bovenin het script in `HANDEN`, `SNUIS`, `BAZEN`, `MARKT_BASIS` en `KRAAMSOORT`. De balans is afgesteld met een simulatie: een slimme speler wint ongeveer een op de drie keer. Elke snuisterij heeft een `soort` (fiches, mult, maal, munt, speciaal) die de kleur in de winkel bepaalt, en een eigen icoon in `ICOON_PAD`.
- Test na een wijziging dat een potje te starten is, dat scoren werkt en dat de winkel opent.

## Rommelwoord

- Dagelijks woordspel in `rommelwoord.html`: raad een Nederlands woord van vijf letters in zes pogingen.
- Het woord van de dag wordt berekend uit de datum (dag 1 is 8 oktober 2026) en een vaste geschudde volgorde van `ANTWOORDEN`. Er hoeft dus nooit iets bijgewerkt te worden. Na alle antwoorden begint een nieuwe, anders geschudde ronde.
- Pas de volgorde of de antwoordenlijst niet aan zonder dat Ruben het weet: dan krijgen spelers ineens een ander woord dan hun vrienden.
- Geldige gokken komen uit de OpenTaal-woordenlijst (CC BY 3.0). De bronvermelding onderaan de pagina moet blijven staan.

## Vlaaienbakker

- Eigen klikspel in `vlaaienbakker.html`: klik op de vlaai, neem bakkers in dienst (`BAKKERS`), koop verbeteringen (`UPGRADES`) en nieuwe smaken (`SMAKEN`), vang gouden vlaaien en haal prestaties (`PRESTATIES`, elk met een uitleg, een meetfunctie en een doel, zodat spelers hun voortgang zien). Verander de id's van prestaties niet, want die staan in opgeslagen spellen.
- Het spel wordt bewaard in localStorage onder `vlaaienbakker-v1`. Verander je de opbouw van de opgeslagen gegevens, verhoog dan het versienummer `v` en zorg dat oude spelletjes netjes worden omgezet.
- Thema: Limburgse vlaaien, zonder echte merken of bekende personen. Elke smaak heeft een eigen tekening in `topping()`.

## Rommelhotel

- Pixelhotel in `rommelhotel.html`: een eigen ontwerp in isometrische pixelstijl, geen namaak van een bestaand spel. Gebruik geen namen, poppetjes, meubels, ruimtes of logo's van bestaande games.
- Je komt aan op `plein`: buiten aan de gracht, met het hele hotelgebouw (`gebouw` in de ruimte, getekend door `tekenGebouw`), de rommelmarkt, een brug, eenden en een park. Daar kijkt de camera mee en kun je slepen om rond te kijken.
- Ruimtes in `RUIMTES`: plein, receptie, lobby, café, spel (spelletjeskamer), dak (dakterras) en kamer (kamer 12). De lift in de receptie gaat naar spel en dak (`LIFTSTOP`).
- Tekenen: `poly()` vult vlakken met harde pixelranden, `blok()` tekent isometrische blokken, `muurVlak()` en `muurTekst()` tekenen op elk verticaal vlak (met `q` als positie van het vlak). Meubels via `TEKEN[type]`.
- Bewoners hebben `zinnen` voor praatjes; `dwaal` met `gebied` laat ze rondlopen, `zit` laat ze zitten, `volgt` laat de hond achter het baasje aanlopen, `water` laat eenden zwemmen.
- Munten verdien je met opdrachten (`S.taken`): Harries sokken (`SOKPLEK`), Miens brief, eendjes voeren, darts en sterren kijken. Uitgeven bij Kees (meubels, `MEUBELWAAR`), Rob (souvenirs, `SOUVENIRS`), Bep (vlaai), Joep (drinken) en de snoepautomaat. Badges staan in `BADGES`.
- In kamer 12 zet je gekochte meubels neer met Inrichten (`S.kamerItems`).
- Echte andere bezoekers zijn er nog niet; daarvoor is een server nodig.
- Opslag in localStorage onder `rommelhotel-v1`. Oude opslag met de ruimte `ingang` wordt automatisch omgezet naar `plein`.

## Rommelbeesten

- Eigen verzamelkaartspel in `rommelbeesten.html`: een eigen ontwerp, geen namaak van een bestaand kaartspel. Gebruik geen namen, beesten, kaartontwerpen, symbolen of logo's van bestaande kaartspellen of games.
- Kaarten staan in `beesten_data.js` (`KAARTEN`, 130 stuks: 120 in de Zolderset en 10 geheime). Elke kaart heeft een eigen beest-recept: lichaamsvorm `v`, kleuren `k`, onderdelen `a`, patroon `pat`, ogen `o` en mond `m`. De tekenmachine (`BT` in `beesten_tekenaar.js`) bouwt daar SVG-tekeningen van. Maak bij een nieuwe kaart altijd een nieuw, uniek beest.
- Zeldzaamheid `z`: g gewoon, o ongewoon, z zeldzaam, h holo zeldzaam, u ultra zeldzaam (volle kaart), x geheim (goud, volle kaart). Elke kaart kan ook glimmend zijn.
- Pakjes en kansen staan in `PAKJES`, verkoopwaarden in `WAARDE`, de dagbonus in `BONUS`. Een pakje levert gemiddeld minder op dan het kost; zo blijven de dagbonus en zeldzame kaarten waardevol.
- Bij het openen blijft elke omgedraaide kaart groot in beeld tot de speler tikt; dan schuift hij naar de rij onderaan en draait de volgende om. De laatste (zeldzame) kaart krijgt eerst een gloed en daarna even rust. 'Alles omdraaien' doet alles snel achter elkaar.
- Opslag in localStorage onder `rommelbeesten-v1` (`munten`, `bezit` als {id: [normaal, glimmend]}, `dag`, `stats`, `beste`).
- Het geheime muntenluik: drie keer op de titel tikken en dan twee keer op de muntjes (binnen 6 seconden), of 'rommelrijk' typen. Zet dit nergens op de site.

- **Heldenset**: 30 superhelden (`HELDEN` in `beesten_data.js`, ids hs001 tot hs030): 10 gewoon, 9 ongewoon, 5 zeldzaam, 3 holo, 2 ultra en 1 geheim (De Rommelheld). Eigen ontwerpen met cape, masker en embleem (`cape`, `masker`, `embleem` in de tekenaar) en een stripachtergrond met stralen en stippen. Alleen te krijgen in het Heldenpakje (150 munten, 6 kaarten, 1 zeldzaam of beter). Op de kaart staat "Held" of "Superheld" en het nummer van de 30. Het album wisselt tussen de sets; het scorebord telt alleen de Zolderset (van de 130).

- **Pakjes**: brons (50, 5 kaarten, 15% kans op een zeldzame plek), zilver (100, id `gewoon`), goud (250, id `premium`), regenboog (650, met een gegarandeerde holo-plek `H`), het elementpakje van de dag (180, alleen kaarten van `dagElement()`), het heldenpakje en de doos. Elk pakje heeft een `tier` voor zijn folie-ontwerp in `pakSVG` (`TIERS`). Bij het openscheuren komt er licht uit de scheur in de kleur van de beste kaart.
- **Grote onthulling**: is de laatste kaart holo of beter, dan volgt eerst `FUT.onthulling`: element, silhouet en zeldzaamheid één voor één, dan pas de kaart.
- **Pakjesjager** (`FUT`, opgeslagen in `S.fut`): verzamelaarsniveau met XP (pakjes, nieuwe en zeldzame kaarten, opdrachten), een niveau omhoog geeft munten en elke 3 niveaus een pakje in **Mijn pakjes** (`F.voorraad`). Drie **opdrachten van vandaag** (`POOL`), de **aanbieding van de dag** (30% korting, één keer per dag) en de **ruilbalie** (`RUILEN`): dubbele kaarten inleveren voor pakjes of munten; je houdt altijd minstens één exemplaar.

- **Dubbele kaarten verkopen**: je houdt altijd één exemplaar van elke kaart, en als je een glimmende hebt, houd je die. Bij "Verkoop dubbele" kies je tussen alleen gewone dubbele, of alles, ook glimmende (drie keer zoveel waard). Het filter "Mijn dubbele" toont ook glimmende dubbele.
- **Tekenregels**: geef beesten met een plat of liggend lijf (bol, walvis, krab, rups) geen cape; die hangt dan als een blok onder het lijf. Gebruik bijvoorbeeld vleugels of een masker. Vlammen horen niet midden op een gezicht; zet ze met `'vrij'` op een vleugel of op de rug.

- **Wonderpakje**: elk gekocht of geopend pakje heeft een kans van 1 op 400 (`WONDER_KANS`) om een wonderpakje te zijn: alle kaarten holo of beter (68% holo, 26% ultra, 6% geheim), de helft glimmend, met een eigen regenboog-witte verpakking, een aankondiging en een melding in de samenvatting. Wordt geteld in `S.stats.wonder`.
- **Beheermenu** (`BEHEER`): openen door "beheer" te typen of het logo 2 seconden ingedrukt te houden. Het vraagt het beheerwachtwoord van de werkplaats en controleert dat bij de scoreserver (`/ideeen/alle`); het wachtwoord wordt niet bewaard, alleen "ontgrendeld" voor dat tabblad (sessionStorage). Tabbladen: Speler (munten, niveau, dagbonus, opdrachten, aanbieding), Kaarten (zoeken, gewone en glimmende exemplaren erbij of eraf, hele set vullen of leegmaken), Pakjes (elk pakje geven of gratis openen, het volgende pakje een wonderpakje maken) en Back-up (code kopiëren, terugzetten, alles wissen).

- **Coulissenset** (`COULISSEN` in beesten_data.js, ids `cs001` en verder, kaartnummers x/150): beesten uit de theaterwereld. De set is compleet: 150 kaarten (60 gewoon, 40 ongewoon, 25 zeldzaam, 12 holo, 8 ultra, 5 geheim). De eerste 25 staan los in `COULISSEN`; de overige 125 worden gemaakt met `coul_data.py` (een tabel per kaart). De ultra-kaarten cs139 tot en met cs145 zijn legendes op basis van Rubens rollen: Chaoskroon (Caspian Darius), Fiestaschedel (Juan Martinez), Bokkenrijder (Erik Jacobs), Ruitenroeter (Roeter), Schlagerbeer (Hans Herzschlag), Brillenuil (Callum) en Slome Verstronden (Dorian). Geheim: Grote Regisseur, Gouden Luchter, Het Laatste Doek, Staande Ovatie en Rommelster.
- Kaarten in deze set krijgen automatisch de **detaillaag**: `volume()` (licht linksboven, schaduw rechtsonder), `lichtrand()` en optioneel een stof via `tex` ('fluweel', 'pailletten', 'glitter', 'hout', 'goud', 'veren', 'streep', 'ruit'). Dat kan ook voor een losse kaart in een andere set met `detail: true`.
- Nieuwe vormen: masker, gordijn, spot, pop, popcorn, kaartje, pruik, microfoon, trommel, stoel, klapper, kroonluchter. Extra accessoire: bril (ronde brillenglazen). Nieuwe accessoires: hogehoed, vlinderdas, monocle, koptelefoon, boa, roos, sjerp, toverstaf, scenario, pailletjes, snor, spotstraal. Let op: het bestaande accessoire `strik` is iets anders dan `vlinderdas`.
- Achtergrond: een podium met gordijnen, een gouden franje, een spotlicht, een houten vloer en voetlichtjes, licht gekleurd naar het element.
- Het **Coulissenpakje** (175 munten, 6 kaarten, `tier: 'coulissen'`). Ontbreekt een zeldzaamheid nog in een set, dan trekt het spel de beste die er wel is.
- Namen moeten op de kaart passen (de test `t20.py` controleert dat); maximaal ongeveer 18 tekens.

- **De winkel is een etalage**: bovenaan de aanbieding van de dag, daaronder een houten plank per set (`PLANKEN` in `tekenWinkel`, met verzamelvoortgang en een nieuw-stempel), elk pakje als tegel met een korte omschrijving (`KORT`), en aan de zijkant Mijn pakjes, de opdrachten en een inklapbare ruilbalie. Een nieuw pakje voeg je toe aan `PAKJES`, `KORT` en de juiste plank.

- **Pakjes per set**: elke set heeft dezelfde zes soorten, in dezelfde volgorde: klein, standaard, goud, regenboog (holo gegarandeerd), het elementpakje van de dag en een doos met 10 standaardpakjes voor de prijs van 9 (`doosVan`). Zolderset: brons, gewoon (zilver), premium (goud), regenboog, element, doos. Coulissenset: kaartjes, coulissen, premiere, loge, coulelement, couldoos. Heldenset: heldenmini, helden, superhelden, heldenlegende, heldenelement, heldendoos. Prijzen lopen via `prijsVan()`, zodat de niveaukorting overal geldt. Het uiterlijk komt van `tier`, de ondertitel van `set`. Op het lint staat alleen de soort; het aantal kaarten staat eronder, zodat de tekst altijd past.
- **Vandaag voor jou** (bovenaan de winkel): elke 4 uur een gratis pakje (`GRATIS_MS`), de dagbonusreeks met 7 vakjes, en de aanbieding van de dag.
- **Mijlpalen per set** (`MIJL`, `MIJL_BEL`): 25% verzameld geeft 150 munten, 50% het goudpakje van die set, 75% het regenboogpakje en 100% 1500 munten en een wonderpakje.
- **Sync en cadeaus** (`SYNC`): elk apparaat krijgt een eigen geheim (localStorage `rommelbeesten-speler`) en een spelerscode van 6 tekens, die onderaan de winkel staat met de uitleg dat de verzameling zonder naam wordt bewaard. De verzameling gaat naar de scoreserver (`/rb/sync`) bij het laden, na het openen van pakjes, elke 2 minuten en bij weggaan. Cadeaus komen mee in het antwoord, worden één keer uitgepakt (`S.cadeausGehad`) en pas daarna als bezorgd gemeld (`/rb/ontvangen`).
- **Beheer, tabblad Alle spelers**: alle spelers (code, scorebordnaam als ze meedoen, laatst gezien, kaarten per set), per speler de verzameling, wachtende cadeaus en een formulier om kaarten, munten, pakjes en een bericht te sturen. Vraagt het beheerwachtwoord, dat alleen in het geheugen van het tabblad blijft.
- Scoreserver-routes: `POST /rb/sync`, `POST /rb/ontvangen`, `GET /rb/spelers`, `GET /rb/speler?id=`, `POST /rb/geef` (de laatste drie alleen met het beheerwachtwoord). Tabellen `rb_spelers` en `rb_cadeaus` maken zichzelf aan.

- **Niveaus en beloningspad** (`VOORDELEN` in FUT): elk niveau geeft munten (`padMunt`), elke 3 niveaus een pakje (`padPak`), en op vaste niveaus een titel en een blijvend voordeel: 5 Verzamelaar (5% korting), 8 (dagbonus +25%), 10 Kenner (gratis pakje elke 3 uur), 12 (4 opdrachten per dag), 15 Speurneus (10% korting), 18 (dagbonus +50%), 20 Meesterverzamelaar (gratis pakje elke 2 uur), 25 Rommelkoning (15% korting), 30 Legende (wonderkans 1 op 300). `perk(naam)` geeft de huidige waarde. Klik op het niveau in de kop voor het pad (`toonPad`). XP komt van pakjes, nieuwe en zeldzame kaarten, opdrachten (50), ruilen (40), mijlpalen (60) en de dagbonus (20); na elk pakje staat "+XP" in de samenvatting.

## Rommelhotel: tekenstijl

- Het hotel wordt pixel voor pixel getekend op een klein canvas (480×300, op telefoons smaller) dat met een heel getal wordt vergroot, zodat alles haarscherp blijft (`zetMaat`).
- `poly(punten, kleur)` accepteert ook een functie `(sx, sy) => kleur`: zo worden texturen getekend. Bereken texturen altijd in vloer- of muurcoördinaten (`naarVloer` voor vloeren; t en z voor muren), nooit in schermcoördinaten, anders lopen ze niet mee met het perspectief.
- Vloeren: `MATERIAAL` per ruimte en tegelsoort (planken, marmer, tapijt, vlonder, kassei, gras, water, enzovoort) in `vloerPixel`. Muren: `muurPixel` met lambrisering, strepen of een motief.
- `blok()` tekent automatisch een donkere omlijning en lichte randen.
- Poppetjes komen uit `maakSprite` (20×40 pixels, driekwart van voren of van achteren, gespiegeld voor links): oor, ogen met wit en pupil, wenkbrauwen, neus, blosjes, kraag, riem met gesp en glans in het haar. Houdingen: staan, lopen (4 fasen), zitten, zwaaien, dansen, praten (mond open als er een tekstballon is) en af en toe knipperen. Elke combinatie wordt één keer gemaakt en bewaard in `spriteCache`.
- Zitten: wie op een meubel met `zit` zit, wordt samen met dat meubel getekend. Eerst het meubel, dan de zitter, en als de zitter van je af kijkt (richting A) daarna nog de rugleuning (`m._deel`: 'zonderRug' en 'rug'). Zo valt een zitter nooit meer door een stoel of bank heen.
- Meubels in de nieuwe stijl staan in `Object.assign(TEKEN, {...})`: gelaagde banken met kussens en armleuningen, stoelen met spijlen, tafels met poten, balie, bar, piano, arcadekasten met bewegend scherm, pooltafel, jukebox, snoepautomaat, bed, kast, boekenkast (`kant: 'L'` of `'R'`), globe, staande klok en zwembadspullen. Hulpjes: `stof(kleur)` en `hout(kleur)` voor textuur, `voorX`/`voorY` voor tekeningen op een voorvlak, en `lagen()` tekent onderdelen in de goede volgorde.
- Ruimtes: plein, receptie, lobby, café, spelletjeskamer (1e), bibliotheek (2e), dakterras, het zwembad in de kelder, de gang en vijftien hotelkamers.
- De gang (`RUIMTES.gang`, 32 tegels lang) heeft deuren 1 tot en met 15 met nummerbordjes; de deur "Kamers" in de lobby komt hier uit. Kamer 12 is altijd de kamer van de speler (`RUIMTES.kamer`, op slot tot je incheckt). De andere veertien kamers worden gemaakt uit `GASTEN`: per kamer een bewoner, een thema (muur, vloer, materiaal, meubels, kleed, decoratie) en bewoners met eigen zinnen. Gastenkamers hebben `gast: true` en staan niet apart op de plattegrond.
- Tekst op muren (`muurTekst`, voor bordjes en neon) wordt per pixelkolom schuin gezet, zodat letters in perspectief langs de muur lopen. Een bordje met `midden` hangt gecentreerd boven dat punt (zo hangen de kamernummers in de gang precies boven de deur).
- Muurdecoratie: raam (met vensterbank, plooigordijnen en roede), wandlamp (geeft licht), krijtbord (met `regels`), schilderij, bord, neon, prikbord, dartbord, flessen en klok.
- Extra meubels: hanglamp (aan het plafond, geeft licht), tapkraan, espresso, vitrine met vlaaien, bistrotafel met kaarsje, kapstok, bagagekar en paraplubak. De haard heeft een schoorsteenmantel met spiegel, klokje en vaasjes (`laag: true` laat die weg).
- De lobby is ingericht zoals het eerste proefje: haard met spiegel, boekenkast, staande klok, piano tegen de muur, twee groene banken rond een salontafel, staande lamp, kleed, wandlampjes en een raam met gordijnen.
- Behangpatronen in `muurPixel`: lambrisering, streep, harten, bloem, sterren, tegels en vlak. Themameubels: kaptafel, aquarium, ezel, bureau, drumstel, gitaar, speaker, trofeekast, halters, bal, kandelaar, fornuis, kristalbol, tent, skirek, knuffel en breimand. De lift (`LIFTSTOP`) gaat naar zwembad, receptie, spelletjeskamer, bibliotheek en dak.
- Licht: `lichtPass` legt elk beeld een lichtkaart over het scherm. Overdag (7 tot 18 uur) is het licht, 's avonds dimt het en geven lampen, de haard, lantaarns, arcadekasten en neon licht. Kleuren in `GLOEIT` (ramen, lampen, vuur, neon) blijven 's avonds fel.

## Rommelhotel: het verhaal

- Het hotel is een verhalend puzzelspel: "Het geheim van de Gouden Sleutel". Eigen verhaal en eigen puzzels; neem geen personages, puzzels of vormgeving van bestaande puzzelgames over.
- `STAPPEN`: de hoofdstukken van het verhaal, elk met `wie` (id van een bewoner, of '*' voor een scène die start als je de kamer binnenkomt), `kamer`, `doel` (tekst in de doelbalk), `voor` en `na` (dialoog: [spreker-id of 'jij', tekst], {naam} wordt de naam van de speler) en optioneel `puzzel`. `einde: true` sluit het verhaal af (badge Speurneus en 100 munten).
- `PUZZELS`: 12 puzzels met `type` getal, woord, keuze, lichten (lampjes-puzzel, `druk` bepaalt de beginstand) of volgorde. Elke puzzel heeft drie hints (elk 1 hintmuntje) en een uitleg. Een fout antwoord kost 10% van de punten (nooit minder dan 40%).
- `MUNTPLEKKEN`: [kamer, meubeltype] waar een hintmuntje verstopt zit; je vindt het door op dat voorwerp te klikken. Je begint met 3 muntjes.
- Voortgang staat in `S.verhaal` (stap, munten, opgelost, punten, gevonden, gezien, waarde). Een uitroepteken staat boven de bewoner die je moet spreken. Het puzzelboek toont alle puzzels en punten.
- Hoofdstukken: `HOOFDSTUKKEN` geeft elk hoofdstuk een titel; een stap met `hoofdstuk: n` toont eerst een titelkaart. Hoofdstuk 2, "Wie heeft de vlaai opgegeten?" (stappen 13 tot en met 24, puzzels p13 tot en met p24), begint vanzelf na hoofdstuk 1 en eindigt met `einde: 2` (badge Meesterspeurneus en 150 munten). De dader is Max, met Bobbie als afleiding.
- Hoofdstuk 3, "Terug naar 1926" (stappen 25 tot en met 33, puzzels p25 tot en met p33): achter een oude deur in het zwembad staat de machinekamer met de tijdmachine van oprichter R. Rommel. Een stap met `actie: 'naar1926'` of `'naar2026'` reist na de dialoog door de tijd, met een flits. `receptie1926` en `lobby1926` zijn kopieën van de echte ruimtes met `sepia: true` (de lichtlaag kleurt ze sepia), andere bewoners (Kleine Mien, Meneer en Mevrouw Rommel, Kok Jacob, fotograaf Lena en conciërge Piet) en deuren met `slot: 'tijd'`. Ze staan niet op de plattegrond. Het einde (`einde: 3`) geeft de badge Tijdreiziger en 200 munten.
- Alle puzzels zijn bewust moeilijk. Bij logica- en volgordepuzzels is met de computer nagerekend dat er precies één oplossing is; doe dat ook bij nieuwe puzzels. De moeilijkere versies van p1 tot en met p24 staan in `MOEILIJK`, en `VERVANG` past de dialogen aan die een antwoord noemen.
- Extra puzzelsoorten: `vingers` (vergelijk een gevonden afdruk met de keuzes; `afdrukSVG` tekent vinger- of pootafdrukken uit een getal, zelfde getal is zelfde afdruk), `verschil` (tik vijf verschillen aan in twee plaatjes) en een optioneel plaatje bij elke puzzel (`svg`).
- Het speurneuslab (`RUIMTES.lab`) staat op de zolder en is met de lift bereikbaar. Het heeft een speurbord met foto's en rode touwtjes, een microscoop, een vergrootglas en een archiefkast.
- Zoomen: de knoppen − en + onder in beeld, of de toetsen - en +. `S.zoom` is 1, 2 of 3; bij inzoomen volgt de camera de speler.

## Coulissen en scorebord (vormgeving)

- De coulissen zijn een klein podium: donker achterdoek, rode fluwelen gordijnen links en rechts, een houten vloertje en een warm spotlicht achter elke prop (`.coulissen-rij`, `.prop-plek::before`). Nieuwe props krijgen dat vanzelf.
- Het scorebord is een erehal: per spel een donker bord met een gestreepte kop en lopende lampjes, een podium voor de top drie (beginletter in een gekleurd rondje, kroon voor nummer 1, volledige naam, score die optelt) en daaronder plek 4 en verder. Namen worden niet meer afgekapt. Bovenaan staat "Jouw plekken" als je meedoet.

## Ideeënbox

- `ideeenbox.html`: bezoekers sturen een idee in (10 tot 500 tekens, een soort en een optionele voornaam). Ideeën met links of scheldwoorden worden geweigerd, en per bezoeker kunnen er hooguit 5 per uur bij.
- Nieuwe ideeën zijn eerst alleen zichtbaar voor Ruben. In de werkplaats (paneel Scorebord en bezoekers, onderdeel Ideeënbox, met het beheerwachtwoord) zet hij ze op het prikbord, geeft hij ze een status (nieuw, bekeken, in de maak, klaar, niet nu) of verwijdert hij ze. "Kopieer nieuwe ideeën" zet ze als lijstje op het klembord, om in een gesprek met Claude te plakken.
- Op het prikbord kan iedereen één keer per idee stemmen (een willekeurig geheim in localStorage `rommelhoekje-idee-geheim`).
- Worker-routes: POST /idee, GET /ideeen (alleen gepubliceerde), POST /stem, en met beheerwachtwoord GET /ideeen/alle, POST /idee/zet en DELETE /idee?id=. De tabellen `ideeen` en `stemmen` maakt de worker zelf aan.

## Homepage-kaarten

- De kaarten op de homepage krijgen hun uiterlijk uit `hebbedingen.js`: elke kaart een eigen kleur (op volgorde: rood, blauw, oranje, groen, paars, roze), een gestreepte kop met het icoon in een rond kader, en een speelknop met pijltje. De ruimte tussen het briefje en de kaarten is kleiner gemaakt.

## Verborgen grapjes

- `grapjes.js` (herkenbaar aan GRAPJES) zit in `homepage-onderdelen.js` en in alle spelpagina's, het scorebord, de ideeënbox en `404.html`. Er is bewust geen teller, geen lijstje en geen melding: wie een grapje vindt, vindt het gewoon. Verwijs er nergens op de site naar.
- De grapjes: "vlaai" typen (vlaaienregen), "alaaf" typen (confetti in rood, geel en groen), de sitenaam achterstevoren typen ("ejkeohlemmor", de pagina spiegelt even), 10 keer op de sticker klikken, 6 keer snel op de hamer klikken, 5 keer op het versienummer klikken (de geheime bouwplaats), het muisje dat af en toe uit het gaatje onder aan de homepage kijkt, de nachtuil tussen middernacht en vijf uur, de vlaggetjes op 11 november, Kamer 404 en een begroeting in de browserconsole.
- `404.html` is de pagina die GitHub Pages toont bij een adres dat niet bestaat. De werkplaats zet er geen label voor op de homepage. Gebruik in die pagina altijd links die met / beginnen.
- Het voorbeeld in de werkplaats plakt de homepage-onderdelen direct in het voorbeeld: de versie die op de site staat, of anders de kopie in de werkplaats.

## Rommelland (pretparkbouwer)

- `rommelland.html` is een 3D-pretparkspel met three.js r128 (geladen van cdnjs, vaste versie). Bronbestanden: `rl_modellen.js` (alle 3D-modellen, met tekenfilmlook: toonmateriaal met drie stappen en donkere randen) en `rl_spel.js` (simulatie en bediening), samengevoegd via `rommelland_template.html`. De Rommelbeesten-tekenaar zit erin voor de kartonnen mascottes (`rl_mascottes.json`: zes beesten).
- Het park is 32 × 24 tegels van 2 meter. Paden worden op het grasdoek getekend. Attracties en kraampjes moeten naast een pad staan; hun ingang is een aangrenzend padvak.
- Catalogus `CAT`: 8 attracties (draaimolen, reuzenrad, botsauto's, zweefmolen, spookhuis, schommelschip, achtbaan, wildwaterbaan), 6 kraampjes en 10 soorten versiering. Personeel (`PERSONEEL`): schoonmaker, monteur en Rommelbeest-mascotte.
- Bezoekers worden met InstancedMesh getekend (tot 180 tegelijk). Ze hebben honger, dorst, wc, energie, plezier, geld en een voorkeur voor spanning; ze kiezen attracties en kraampjes, staan in de rij, laten rommel vallen als er geen prullenbak in de buurt is, en hebben gedachten (klik op een bezoeker). Soms komt er een gast uit het Rommelhotel langs.
- Een dag duurt 6 minuten (08:00 tot 24:00) met dag- en nachtlicht. Aan het eind van de dag: onderhoud en lonen, een dagrapport, en soms regen de volgende dag. Vuurwerkshow: €800, alleen 's avonds.
- `DOELEN` (13 stuks) leveren geld op en spelen attracties vrij (zweefmolen, spookhuis, achtbaan, wildwaterbaan, schommelschip, gouden standbeeld). Waardering 0 tot 1000 bepaalt hoeveel bezoekers er komen.
- 's Nachts is er maanlicht (blauw hemellicht) en een vaste set van 8 warme lampen die steeds bij de dichtstbijzijnde lantaarns, attracties, kraampjes en de poort gaan staan (`zetLampen`). Karretjes en bootjes richten zich met `richt()` binnen de attractie, zodat ze ook bij een gedraaide attractie langs de baan rijden.
- Opslag: localStorage `rommelland-v1` (elke 30 seconden en bij weggaan). Testhaak: `window.__rl` (o.a. `sim(seconden)`).

## Rommelblok (blokkenwereld)

- `rommelblok.html` is een eigen blokkenwereld in 3D (three.js r128 van cdnjs). Bronbestanden: `rb_wereld.js` (blokken, textuur, wereldmaker, licht, tekenen) en `rb_spel.js` (speler, overleven, rugzak, maken, besturing, dag en nacht, opslaan), samengevoegd via `rommelblok_template.html`. De eerste versie staat nog als `rb_wereld_v1.js` en `rb_spel_v1.js`. Geen namen, plaatjes, figuren of geluiden van Minecraft: alles is zelf getekend.
- **Eindeloze wereld** in stukken van 16 x 16 en 80 hoog, rond de speler geladen (straal 7, op een telefoon 5) en ver weg weer opgeruimd. Uit een zaadje: woestijnen met zandsteen en cactussen, bossen, bergen met sneeuw, zeeën, grotten (twee 3D-ruizen die elkaar kruisen) en ertsen op diepte: kolen, ijzer (onder 46), goud (onder 24) en robijn (onder 14). Bomen worden ook over stukgrenzen heen goed gezet. Alleen veranderde blokken worden bewaard (`wijzig`, per stuk).
- **Licht** per blok, 0 tot 15: zonlicht valt recht naar beneden en verspreidt zich, fakkels (14) en lampen (15) geven fakkellicht. Elk stuk rekent zijn licht uit met een rand van 16 blokken, zodat het over grenzen klopt. Per hoek van elk vlak: gemiddeld licht en zachte schaduw in hoeken. De shader mengt zon (maal het daglicht) en warm fakkellicht; dichte grotten zijn pikdonker. Ondergronds kleurt de mist donker.
- **Overleven**: 10 hartjes, honger als 10 vlaaitjes, adem onder water, valschade, cactusschade, flauwvallen en wakker worden bij de startplek met je rugzak. Hakken kost tijd (barsten in het blok), afhankelijk van de hardheid, het juiste gereedschap en de klasse; voor erts heb je een goed genoeg houweel nodig. Wat je krijgt staat in `BLOK` (kolen en robijn als voorwerp, uit bladeren soms een appel of stok).
- **Voorwerpen** (`ITEM`): blokken 1 tot 32, grondstoffen 100 tot 106 (stok, kolen, ijzerstaaf, goudstaaf, robijn, appel, vlaai) en 20 gereedschappen 110 tot 129: houweel, bijl, schep en zwaard in hout, steen, ijzer, goud en robijn, met snelheid, klasse en slijtage. **Recepten** (`REC`) met werkbank of oven in de buurt (binnen 4 blokken).
- **Creatief**: alle blokken en gereedschap, alles meteen kapot, vliegen (F of twee keer spatie).
- **Talen**: Nederlands en Engels. Knop NL/EN in de kop; de keuze staat in localStorage `rommelblok-taal`, en zonder keuze volgt het spel de browsertaal. Zinnen in het spel lopen via `t()` met het woordenboek `EN` (de Nederlandse zin is de sleutel), namen via `naam(id)` (gereedschap heeft een eigen `en`-naam), en vaste teksten op de pagina via `data-t` met `EN_HTML`. Nieuwe tekst: zet hem in `EN` of `EN_HTML`.
- Opslag: localStorage `rommelblok-v2` (de oude `rommelblok-v1` wordt niet meer gebruikt). Testhaak: `window.__rb`.

## Vlaaienbakker: lange termijn

- 15 bakkers (tot "Rubens rommelhoekje" voor 3 biljard), 15 smaken (tot de Rommelvlaai), en per bakker 5 verbeteringen (bij 10, 40, 80, 150 en 250 in dienst: ×2, ×2, ×2, ×3, ×3). Twee extra klikverbeteringen (zilveren garde, klikrobot).
- **Het Bakkersgilde**: je verkoopt je bakkerij voor gildesterren. Hoeveel er in totaal te verdienen zijn, hangt af van alles wat je ooit hebt gebakken (`S.ooit`): de wortel van ooit gedeeld door 100 miljard. Elke verdiende ster geeft voor altijd +3% (`gildeBonus`). Sterren zijn ook te besteden aan tien gildevoordelen (`PERKS`): vliegende start, gouden vingers, nachtploeg (offline volle kracht tot 24 uur), geluksvogel, gildekorting, lange kermis, smaakgeheugen, receptenboek, meesterbakker (×2) en grootmeester (×3).
- **Bestellingen van vandaag**: drie per dag, vast per datum (`dagboek`), elk 20 minuten productie waard; alle drie geleverd geeft 1 gildester.
- 51 prestaties, waaronder bakken tot een quadriljoen, per bakker, gilde, sterren, bestellingen en een week of maand spelen.

## Vouwvlieger

- `vouwvlieger.html` (bron: `vlieger_template.html`, één bestand met canvas, zonder bibliotheken): een papieren vliegtuigje zweeft 's nachts door een stad met neonlicht. Tikken, klikken of spatie geeft lift. Obstakels: boven hangende hijskraanhaken of neonborden (`NEON`), onder schoorstenen, watertorens of antennes. Het gat wordt kleiner en de snelheid hoger naarmate de score stijgt. Windvlagen duwen je omhoog of omlaag, sterren tellen mee, en een extra vouw vangt één botsing op. Bij een botsing kreukt het vliegtuigje tot een propje.
- Bewust geen hoge torens of gebouwen om tegenaan te vliegen, en geen ontploffingen: het spel mag op geen enkele manier aan een aanslag doen denken.
- Sterren: elke 5 sterren in een vlucht geven een extra vouw (maximaal 3). Gevangen sterren gaan in de spaarpot (`spaar`) en zijn te besteden in de sterrenwinkel: uiterlijken voor het vliegtuigje (`SKINS`: wit, krant, kraanvogel, neon, bladgoud, regenboog) en voordelen (`UPG`: start met een extra vouw, sterrenmagneet, dubbele sterren).
- Medailles bij 10 (brons), 25 (zilver), 50 (goud) en 100 (regenboog). Opslag: localStorage `vouwvlieger-v1` (best, sterren, spaar, skins, skin, upg, gespeeld, geluid). Scorebord: spel `vlieger` (score = beste aantal punten, extra = totaal gevangen sterren). Testhaak: `window.__vk`.

## Rommelritme (ritmespel)

- `rommelritme.html` (bronnen: `rr_motor.js` voor natuurkunde en levelbouw, zonder DOM en te testen met `node rr_test.js`; `rr_spel.js` voor muziek, tekenen en schermen; samengevoegd via `ritme_template.html`). Eigen spel in de stijl van een ritme-platformer: geen namen, plaatjes of muziek van Geometry Dash.
- **Levels worden gebouwd vanuit de sprongen**: elk deel heeft een choreografie per achtste noot ('j' springen, '^' springen en een trede omhoog, 'v' trede omlaag, 'o' springring, 'p' springkussen) of is een raketstuk (`schip`, met tunnelmidden per tel en een gatgrootte). De bouwer rekent de bedoelde route uit en zet spijkers alleen waar je er bij de bedoelde sprong met speling (`marge`, per level) overheen gaat (`spijkers`: enkel, dubbel, drie of vol). Daardoor is elk level gegarandeerd te halen. Een tel is 4 blokken; de sprong duurt ongeveer één tel.
- `rr_test.js` laat een robot elk level spelen met de bedoelde invoer, controleert dat je zonder drukken snel af bent, en probeert 40 ms te vroeg en te laat. Zoldertrap (130 BPM) en Neonnacht (140 BPM) vergeven dat; Rommelstorm (150 BPM) vraagt halverwege echte precisie.
- **Muziek** per level (`LIEDJES`): zelf gemaakt met de Web Audio API (kick, clap, hihats, bas, arpeggio, akkoorden, melodie), per deel steeds voller en in raketstukken het zwaarst. De speltijd volgt de klok van de geluidskaart, zodat springen en muziek gelijk blijven; zonder geluid loopt het spel op de gewone klok.
- **Oefenen**: checkpoints aan het begin van elk deel; na een val begin je daar, inclusief de muziek. Telt niet mee voor je beste score.
- Opslag: localStorage `rommelritme-v1` (best per level in procenten, pogingen, gehaald, geluid). Scorebord: spel `ritme` (score = de beste procenten van de drie levels bij elkaar, maximaal 300; extra = alle pogingen). Testhaak: `window.__rr`.

## Scorebord en bezoekersteller

- `scorebord.js` zit in elke spelpagina, in `scorebord.html` en (via de werkplaats) op de homepage. Het leest `instellingen.json` uit de map van de site: `scoreUrl` (het adres van de Cloudflare Worker) en `analyticsToken` (Cloudflare Web Analytics, zonder cookies). Beide zijn niet geheim en worden in de werkplaats ingesteld.
- Spelers doen alleen mee als ze zelf een naam kiezen. Die staat met een willekeurig geheim in localStorage onder `rommelhoekje-speler`. De server bewaart alleen naam, beste score en een extra getal per spel.
- Scores sturen: `Scorebord.stuur(spel, score, extra)` met spel `vlaai` (totaal gebakken, extra = per seconde), `woord` (beste reeks, extra = gewonnen) of `poker` (verst gekomen kraampjes, extra = beste hand) of `beest` (verschillende Rommelbeesten verzameld, extra = totaal aantal kaarten). `Scorebord.blokje(element, tekst)` toont een meedoen-blokje.
- De server is `scorebord-worker.js` (Cloudflare Worker met D1-database als binding `DB` en een geheim `BEHEER` voor beheer). Dat bestand hoort niet op de site, maar in Cloudflare. Endpoints: GET /scores, POST /score, POST /naam, POST /verwijder, DELETE /score (met beheerwachtwoord).
- Een nieuw spel op het scorebord? Voeg het toe aan `SPELLEN` in de worker en in `scorebord_template.html`.

- Scores worden vanzelf bijgewerkt vanaf elke pagina die `scorebord.js` laadt (alle spellen, het hotel, Rommelland, het scorebord en via `homepage-onderdelen.js` ook de homepage). `synchroniseer()` leest de beste scores die elk spel in de browser bewaart (`BRONNEN`: vlaaienbakker-v1, rommelwoord-stats-v1, rommelpoker-record, rommelbeesten-v1) en stuurt alleen wat nieuw of beter is. Wat al verstuurd is, staat per naam in localStorage `rommelhoekje-verstuurd`. Dit gebeurt bij elk bezoek, direct na het meedoen en als je naar een ander tabblad gaat. Bewaart een nieuw spel een score, voeg dan een regel toe aan `BRONNEN`.

## Homepage-onderdelen (belangrijk)

- Alles wat de homepage aan gedeelde onderdelen heeft (gereedschap uit `muur.js`, animaties uit `beweging2.js`, de label-iconen, `scorebord.js`, `hebbedingen.js` en de bijbehorende CSS) zit in één bestand: `homepage-onderdelen.js`. `index.html` laadt dat met `<script src="homepage-onderdelen.js"></script>` onderaan de body.
- `index.html` bevat alleen nog Rubens eigen inhoud (labels, teksten, versienummer). Stuur nooit een nieuwe index.html mee: wijzigingen aan de onderdelen gaan via een nieuwe versie van `homepage-onderdelen.js`, die Ruben gewoon uploadt. De knop "Werk mijn homepage bij" is daarvoor niet meer nodig.
- Uploadt Ruben een nieuwe `homepage-onderdelen.js`, dan zet de werkplaats in index.html een versienummer achter de verwijzing (`homepage-onderdelen.js?v=...`), zodat browsers meteen de nieuwe versie laden in plaats van een bewaarde oude.
- De werkplaats haalt eventuele oude, ingeplakte onderdelen uit de homepage en zet `homepage-onderdelen.js` alleen neer als dat bestand nog ontbreekt (of bij die eenmalige verhuizing). Een nieuwer bestand dat Ruben heeft geüpload, wordt nooit door de werkplaats overschreven.
- Het bouwscript maakt `homepage-onderdelen.js` uit losse stukken, die elk in een eigen functie verpakt worden: eerst de stijl, dan de iconen, het scorebord, het gereedschap, de animaties en als laatste de hebbedingen.

## Sticker en coulissen op de homepage

- Het gereedschap op de homepage hangt grotendeels los verspreid over de pagina (een `.rek.verspreid` over de hele pagina, gemaakt door `hebbedingen.js`); alleen zaag, hamer en tang hangen in het rek bij de titel. In de coulissen hangt geen gereedschap.
- `hebbedingen.js` (herkenbaar aan HEBBEDINGEN) bouwt op de homepage de sticker (`ruben-sticker.webp` in de map van de site), die net achter het eind van de onderste tape van het logo plakt en zo groot wordt als er ruimte is en de sectie Uit de coulissen: props van Rubens personages aan haakjes op het gaatjesbord, elk met een kaartje (naam, rol, voorstelling), plus een rek voor extra gereedschap (`#rek-plank`). De werkplaats zet dit script op de homepage en houdt het bij.
- Personages staan in `PROPS`, tekeningen in `SVG`, wat ze doen bij een klik in `DOEN`: Juan Martinez (schedelstaf, Fiesta de los Muertos bij Toverland Halloween Nights: gloeiende ogen, klapperende kaak, goudsbloemblaadjes), Caspian Darius (kroon, groene chaosvonken), Erik Jacobs (wandelstok, draait en tikt), Roeter (kaarten en pailletten, waaieren uit), Hans Herzschlag (hoedje met krullen, schlagerdeuntje) en Callum (brilletje, glinstering).
- Dorian Verstronden (De Zonden van Groenhorst, de zonde van luiheid): zijn zwarte geklede jas aan een kleerhanger, met de rode sjerp van de familie Verstronden, zilveren knopen, de zilveren kruisbroche en een lui geknoopte stropdas die scheef hangt. Bij een klik dut de jas in, zakt de das scheef, zweven er Z'jes omhoog met een snurkgeluid en zegt hij "Vijf minuutjes nog...". Eigen tekening; de foto staat niet op de site.
- Alle tekeningen zijn eigen ontwerpen. Teken geen herkenbare spullen, figuren of logo's uit films, series, games of merken na.
- Gereedschap bijgekomen: boor, verfroller, klem, beitel, rolmaat en ijzerzaag (in `muur.js`). Het gereedschap ontwijkt ook de sticker en de props. Met `window.gereedschapBouw()` hang je alles opnieuw op.

## Werkwijze

- Commitberichten in het Nederlands, kort en duidelijk, bijvoorbeeld "Winkel overzichtelijker gemaakt".
- Zeg na afloop in één of twee zinnen wat er veranderd is en wat Ruben moet doen om het live te zetten.
