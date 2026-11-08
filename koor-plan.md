# Plan: het koor uit de coulissen

Uit de ideeënbox: personages die samen a capella zingen, naar het idee van Blob Opera (Google Arts & Culture). **Alleen het idee**: eigen tekeningen, eigen stemmen, een eigen podium en een eigen naam. Niets van Blob Opera (geen namen, tekeningen, stemmen, geluiden of schermen).

**De zangers zijn de negen personages uit de coulissen** (zo besloten door Ruben op 8 november 2026): Juan Martinez, Caspian Darius, Dokter de Groot, Winston Darius, Erik Jacobs, Roeter, Hans Herzschlag, Callum en Dorian Verstronden. Geen monsters.

**Stand 8 november 2026**: dit plan, de proefpagina `zangproef.html` (één personage zingt, je kiest wie) en geluidsfragmenten. Nog niets op de site.

## Namen

1. **Coulissenkoor** (voorkeur): de zangers komen uit de coulissen op de homepage.
2. **Het Rommelkoor**: past bij de site.
3. **Koor van de Coulissen**.
4. **De Galmgasten**.

## De zangers

Alle negen zijn mannenrollen, dus het wordt een **mannenkoor** met vier stemmen: tenor 1 (de hoogste), tenor 2, bariton en bas. Op het podium staan er vier, één per stem. **Je kiest zelf je koor**: per stem kies je wie er staat.

| Stem | Bereik | Wie | Hoe hij klinkt |
|---|---|---|---|
| **tenor 1** | D3 tot B4 | Hans Herzschlag | stralend, met een breed vibrato (hij kan jodelen) |
| | | Callum | zacht, met veel lucht, zoals een zanger in een bar |
| | | Roeter | licht en vrolijk |
| **tenor 2** | B♭2 tot G4 | Juan Martinez | warm, met een snel vibrato |
| | | Erik Jacobs | deftig en vol |
| **bariton** | G2 tot E4 | Caspian Darius | donker en dramatisch, hij zet in van ver onder de noot |
| | | Dokter de Groot | rustig en precies, met weinig vibrato |
| **bas** | D2 tot C4 | Winston Darius | diep en een beetje rokerig |
| | | Dorian Verstronden | diep en loom: bij lage noten valt hij bijna in slaap |

Het koor waarmee je begint: Hans, Juan, Caspian en Dorian.

**De tekeningen** (op de proefpagina): eigen tekeningen van voren, in de kleren uit de coulissen en Rommelwheels. Juan met zijn sombrero en het geschminkte doodshoofd, Caspian met zijn kroon en de groene schaduw rond zijn ogen, de dokter in zijn witte jas met bril en naamkaartje, Winston met de rode littekenschmink en een sigaar in zijn zakje, Erik in zijn fluwelen jas met gouden koord, Roeter in zijn vest met ruiten en een waaier kaarten, Hans met zijn krullenpruik, Tiroler hoedje en dikke bril, Callum met zijn gouden brilletje en damasten jasje, en Dorian met zijn natte haar, de rode sjerp en de scheve das.

Wat ze doen als ze zingen (op de proefpagina al te zien):
- de **mond** krijgt de vorm van de klinker (breed bij de i, wijd open bij de a, rond bij de o en oe) en gaat open met het geluid; de **kaak** zakt mee, met de sik;
- de **ogen** kijken naar je vinger of muis en knipperen af en toe; bij lage noten worden ze loom (Dorian valt bijna in slaap), bij hoge noten wijd;
- de **wangen** trillen mee met het vibrato;
- het **lijf** veert mee met de toon en leunt opzij met de klinker; het hoofd kantelt een beetje;
- de **armen** gaan omhoog bij hoge noten; de veer op het hoedje van Hans wiebelt, de sjerp van Juan zwaait mee, en de groene vonken van Caspian lichten op.

Bij minder beweging (`prefers-reduced-motion`) blijft alleen de mond bewegen.

**In het spel** staat bij elk personage alleen zijn naam, zijn rol en de voorstelling, net als in de coulissen op de homepage. Het woord "Bold" staat er niet in (net als in JAJA PRODUCTIEFIETS!).

## Zingen

- **Slepen**: omhoog en omlaag is hoger en lager, opzij is een andere klinker (i, e, a, o, oe). Standaard **op de noten** van de toonladder, met een zachte overgang; je kunt ook vrij laten glijden.
- **Wie je pakt, is de voorzanger.** De andere drie zingen vanzelf mee.
- **Met meerdere vingers**: elk personage dat je pakt, zingt jouw toon. Wie je niet pakt, zingt mee in de harmonie.
- **Toetsenbord**: spatie ingedrukt houden is zingen, pijltjes voor toon en klinker, 1 tot 4 kiest de zanger.
- **Het geluid start pas na de eerste tik** (zoals een iPhone dat wil). Op een iPhone speelt het ook als de knop voor stil aan staat (`navigator.audioSession`, waar dat kan).

### De harmonie

Bij elke noot van de voorzanger kiest het spel een akkoord uit de toonsoort (I, ii, iii, IV, V, vi en V7). Het moet passen bij de melodienoot, en logisch volgen op het vorige akkoord (bijvoorbeeld I naar IV naar V naar I). Daarna zet het de andere stemmen in dat akkoord:
- met zo klein mogelijke stapjes (stemvoering);
- binnen het bereik van elke stem;
- zonder dat stemmen elkaar kruisen;
- zonder parallelle kwinten en octaven (die klinken hol).

Een mannenkoor zingt dicht op elkaar; daarom mogen de twee tenoren en de bariton dicht bij elkaar liggen, en zakt de bas vaak naar de grondtoon.

Er is ook een toonsoort te kiezen (C, F, G, D, majeur en mineur). Laat je los, dan zingen de anderen de frase netjes uit naar een slotakkoord.

**Geen valse akkoorden**: een test speelt duizenden willekeurige melodieën en controleert elk akkoord en elke stap.

## De stemmen

Helemaal zelf gemaakt met de Web Audio API, zonder opnames (zie de proefpagina en de fragmenten):
1. **De stembanden**: een golfvorm met de vorm van een echte stembandpuls, waarvan de klank 6 dB per octaaf zakt.
2. **Adem**: ruis die met de stembanden meetrilt.
3. **De klinker**: vijf formanten (de pieken in de klank die van een a een a maken). Die worden als filters achter elkaar gezet. Hoe hoog en breed elke piek moet zijn, rekent de stem zelf uit, met dezelfde formules als de browser. Bij hoge noten gaat de eerste formant mee omhoog.
4. **De kopstem**: bij de hoogste noten van elke stem wordt het geluid lichter, met meer lucht en minder vibrato, zoals bij een echte zanger.
5. **Leven**: vibrato (dat pas na een fractie van een seconde begint), een langzame wiebel in de toon, een aanzet van iets onder de noot, en een zachte val aan het eind.
6. **De zaal**: een zachte compressor en een eigen galm.

Elk personage heeft een **eigen kleur** in zijn stem: hoe snel en hoe diep het vibrato is, hoeveel lucht, hoe helder, en hoe ver onder de noot hij inzet (zie de tabel).

**Gemeten**:
- geen klikjes, ook niet bij inzetten, loslaten, glijden en wisselen van klinker;
- alle klinkers even hard (hooguit 0,5 dB verschil, zonder de galm gemeten);
- de formanten op de goede plek;
- vier stemmen samen blijven onder 0,6 (er kraakt niets);
- een stem maken duurt ongeveer 60 ms, en een stem kost ongeveer een twaalfde van de rekentijd, dus vier stemmen gaan ook op een telefoon;
- de pagina rekent de filters alvast uit terwijl je nog kijkt.

## Het podium

- **Decors**: een operazaal (rode gordijnen, kroonluchter, balkons), een rommelzolder (dakbalken, oude spullen, een rond raam met de maan) en een kerstmarkt (kraampjes, lichtjes, sneeuw).
- **Licht** dat meebeweegt: een spot op wie zingt, en de zaal kleurt mee met het akkoord.
- **Publiek**: silhouetten in de zaal die na een liedje klappen (het applaus zelf gemaakt), en bij een mooi slot bloemen gooien.

## Opnemen en delen

- **Opnemen**: het spel onthoudt alleen wat jij doet: wanneer je wie pakt, op welke noot en klinker, en wanneer je loslaat. De harmonie rekent het bij het afspelen opnieuw uit, met precies dezelfde regels, dus afspelen klinkt precies gelijk.
- **Delen met een link**: het hele liedje staat in de link, achter het `#`, zonder server. Daarin staan een versienummer, de toonsoort, het decor, je koor (wie er staat), de gebeurtenissen als kleine getallen, en een controlegetal. Waar de browser het kan, wordt het ook ingepakt.
- **Een kapotte of te lange link** geeft een vriendelijke melding, en er gaat niets stuk. Een opname duurt hooguit 2 minuten.

## Liedjes om mee te zingen

Alleen oude, traditionele melodieën die vrij zijn van rechten. De personages zingen klinkers, dus er zijn geen teksten nodig:
- Vader Jacob (ook als canon: de vier stemmen komen er één voor één bij)
- Altijd is Kortjakje ziek
- In de maneschijn
- Daar was laatst een meisje loos
- Greensleeves
- Ode an die Freude (Beethoven, 1824)
- Stille nacht (1818)
- O dennenboom
- Jingle Bells (1857)
- Ere zij God
- Sinterklaas kapoentje

Twee manieren:
- **Luisteren**: het koor zingt het voor.
- **Meezingen**: de noten schuiven voorbij als stippen, jij zingt de melodie met de voorzanger, en de anderen zingen de harmonie. Er is geen score, wel een "Bravo!" als het mooi ging.

## Opslag en koppelen

- Een sleutel met de naam van het spel (bijvoorbeeld `coulissenkoor-v1`), klein gehouden:
  - `koor`: wie er per stem staat;
  - `liedjes`: je opgenomen liedjes, alleen de codes, hooguit 30;
  - `inst`: decor, toonsoort, op de noten, volume;
  - `voortgangTotaal`: het aantal liedjes om mee te zingen.
- In `SLEUTELS`, met een regel in de REGELS (liedjes samen, je koor en de instellingen als keuze), in het gedeelde blok en in de scoreserver tegelijk.
- **Daarvoor is een nieuwe scoreserver nodig** (een kleine verandering). De pagina gaat pas online als die in Cloudflare staat.
- Geen scorebord.

## Op de rest van de site

- **Homepage**: een eigen icoon (een zingend gezichtje met muzieknoten), in de categorie Even rustig. Onderschrift "Negen zangers uit de coulissen", voortgang "x van 11 liedjes gezongen".
- Een banner, `privacy.html` en de werkplaats (`SPELINFO`).

## Wat ik van je wil weten

1. **De naam**: Coulissenkoor, of een van de andere?
2. **De stemmen**: is een mannenkoor goed? (De andere mogelijkheid: twee personages zingen de hoge stemmen in hun kopstem, als sopraan en alt. Dat klinkt grappiger, maar minder mooi.)
3. **Wie welke stem zingt**: klopt de tabel, of hoort iemand bij een andere stem?
4. **De tekeningen**: lijkt iedereen genoeg op zichzelf? Wat moet er anders?
5. **De stemmen zelf**: luister naar de fragmenten. Wat klinkt raar of te nep?

## Volgorde

1. **Nu**: het plan, de proefpagina met één zingend personage, en de geluidsfragmenten. Jij luistert en zegt wat er anders moet.
2. De vier zangers samen op het podium, met de harmonie, je koor kiezen, meerdere vingers en het toetsenbord.
3. De decors, het licht en het publiek.
4. Opnemen, afspelen en delen met een link; de opslag, de REGELS en de nieuwe scoreserver.
5. De liedjes om mee te zingen; de homepage, de banner en de privacyverklaring; alles testen, en online.

## Testen

- **De harmonie**: duizenden willekeurige melodieën. Elk akkoord moet uit de toonsoort komen, met de melodienoot erin, binnen ieders bereik, zonder kruisen en zonder parallellen.
- **De stemmen**: geen klikjes, geen pieken boven 1, de klinkers even hard, en vier stemmen samen op een telefoon (gemeten met de processor vier keer vertraagd).
- **Opnemen en afspelen**: precies gelijk (hetzelfde geluid, sample voor sample).
- **Links**: duizenden kapotte en nagemaakte links breken niets.
- **In de browser**: op telefoon, tablet en computer, met muis, vinger (ook meerdere) en toetsenbord, in licht en donker, met minder beweging, en zonder fouten of overtredingen van het veiligheidsbeleid.
- **Niet te testen in deze omgeving**: hoe het klinkt op een echte iPhone. Dat hoor ik graag van jou.
