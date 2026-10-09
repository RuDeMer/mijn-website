# Ruben's rommelhoekje

Dit is de persoonlijke website van Ruben, gehost met GitHub Pages vanaf de main-branch (root). Ruben is beginner met code en GitHub: leg wijzigingen kort en in gewone taal uit, in het Nederlands.

## Hoe de site werkt

- `index.html` is de homepage. Elke tool of elk spel hangt daar als prijskaartje ("label") onder "Aan de haak".
- Elke tool is één zelfstandig HTML-bestand in de root, bijvoorbeeld `rommelpoker.html`. CSS en JavaScript staan in het bestand zelf.
- Er is geen build-stap. Wat in de repo staat, staat live.
- Onderaan de homepage staat een versienummer in de vorm `Versie 0.05`. Verhoog het bij elke update met 0.01 (0.09 wordt 0.10, 0.99 wordt 1.00), zodat Ruben kan controleren dat de update live staat. Een oud nummer zonder punt, zoals `Versie 4`, telt als 0.04.
- `werkplaats.html` is Rubens eigen uploadpagina en homepage-editor. In het paneel Homepage past hij het briefje, de volgorde van de labels, het stempel Nieuw, zichtbaarheid, teksten en iconen aan, met een live voorbeeld. De editor leest en schrijft de labels binnen `.haak-rij`; houd die structuur dus aan (`div.label` met `a.label-kaart`, `.soort`, `.stempel`, `.naam`, `p`, `.doe`, en een verborgen label krijgt het attribuut `hidden`). De werkplaats staat bewust niet op de homepage en krijgt nooit een label. Hij zet bestanden online via de GitHub API met een sleutel die alleen in zijn browser staat, en verhoogt daarbij zelf het versienummer.

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

## Rommelhotel: tekenstijl

- Het hotel wordt pixel voor pixel getekend op een klein canvas (480×300, op telefoons smaller) dat met een heel getal wordt vergroot, zodat alles haarscherp blijft (`zetMaat`).
- `poly(punten, kleur)` accepteert ook een functie `(sx, sy) => kleur`: zo worden texturen getekend. Bereken texturen altijd in vloer- of muurcoördinaten (`naarVloer` voor vloeren; t en z voor muren), nooit in schermcoördinaten, anders lopen ze niet mee met het perspectief.
- Vloeren: `MATERIAAL` per ruimte en tegelsoort (planken, marmer, tapijt, vlonder, kassei, gras, water, enzovoort) in `vloerPixel`. Muren: `muurPixel` met lambrisering, strepen of een motief.
- `blok()` tekent automatisch een donkere omlijning en lichte randen. Poppetjes komen uit `maakSprite` en worden per uiterlijk en houding bewaard.
- Licht: `lichtPass` legt elk beeld een lichtkaart over het scherm. Overdag (7 tot 18 uur) is het licht, 's avonds dimt het en geven lampen, de haard, lantaarns, arcadekasten en neon licht. Kleuren in `GLOEIT` (ramen, lampen, vuur, neon) blijven 's avonds fel.

## Scorebord en bezoekersteller

- `scorebord.js` zit in elke spelpagina, in `scorebord.html` en (via de werkplaats) op de homepage. Het leest `instellingen.json` uit de map van de site: `scoreUrl` (het adres van de Cloudflare Worker) en `analyticsToken` (Cloudflare Web Analytics, zonder cookies). Beide zijn niet geheim en worden in de werkplaats ingesteld.
- Spelers doen alleen mee als ze zelf een naam kiezen. Die staat met een willekeurig geheim in localStorage onder `rommelhoekje-speler`. De server bewaart alleen naam, beste score en een extra getal per spel.
- Scores sturen: `Scorebord.stuur(spel, score, extra)` met spel `vlaai` (totaal gebakken, extra = per seconde), `woord` (beste reeks, extra = gewonnen) of `poker` (verst gekomen kraampjes, extra = beste hand) of `beest` (verschillende Rommelbeesten verzameld, extra = totaal aantal kaarten). `Scorebord.blokje(element, tekst)` toont een meedoen-blokje.
- De server is `scorebord-worker.js` (Cloudflare Worker met D1-database als binding `DB` en een geheim `BEHEER` voor beheer). Dat bestand hoort niet op de site, maar in Cloudflare. Endpoints: GET /scores, POST /score, POST /naam, POST /verwijder, DELETE /score (met beheerwachtwoord).
- Een nieuw spel op het scorebord? Voeg het toe aan `SPELLEN` in de worker en in `scorebord_template.html`.

## Sticker en coulissen op de homepage

- `hebbedingen.js` (herkenbaar aan HEBBEDINGEN) bouwt op de homepage de sticker (`ruben-sticker.webp` in de map van de site), die net achter het eind van de onderste tape van het logo plakt en zo groot wordt als er ruimte is en de sectie Uit de coulissen: props van Rubens personages aan haakjes op het gaatjesbord, elk met een kaartje (naam, rol, voorstelling), plus een rek voor extra gereedschap (`#rek-plank`). De werkplaats zet dit script op de homepage en houdt het bij.
- Personages staan in `PROPS`, tekeningen in `SVG`, wat ze doen bij een klik in `DOEN`: Juan Martinez (schedelstaf, Fiesta de los Muertos bij Toverland Halloween Nights: gloeiende ogen, klapperende kaak, goudsbloemblaadjes), Caspian Darius (kroon, groene chaosvonken), Erik Jacobs (wandelstok, draait en tikt), Roeter (kaarten en pailletten, waaieren uit), Hans Herzschlag (hoedje met krullen, schlagerdeuntje) en Callum (brilletje, glinstering).
- Alle tekeningen zijn eigen ontwerpen. Teken geen herkenbare spullen, figuren of logo's uit films, series, games of merken na.
- Gereedschap bijgekomen: boor, verfroller, klem, beitel, rolmaat en ijzerzaag (in `muur.js`). Het gereedschap ontwijkt ook de sticker en de props. Met `window.gereedschapBouw()` hang je alles opnieuw op.

## Werkwijze

- Commitberichten in het Nederlands, kort en duidelijk, bijvoorbeeld "Winkel overzichtelijker gemaakt".
- Zeg na afloop in één of twee zinnen wat er veranderd is en wat Ruben moet doen om het live te zetten.
