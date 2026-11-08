# Plan: het monsterkoor

Uit de ideeënbox: monsters die samen a capella zingen, naar het idee van Blob Opera (Google Arts & Culture). **Alleen het idee**: eigen monsters, eigen stemmen, een eigen podium en een eigen naam. Niets van Blob Opera (geen namen, tekeningen, stemmen, geluiden of schermen).

**Stand 8 november 2026**: dit plan, de proefpagina `zangproef.html` (één monster zingt) en een paar geluidsfragmenten. Nog niets op de site.

## Namen

1. **Monsterkoor** (voorkeur): zegt meteen wat het is.
2. **Rommelkoor**: past bij de site.
3. **Het Zolderkoor**: vier monsters die op zolder repeteren.
4. **De Galmgasten**.

## De vier monsters

De schetsen staan op de proefpagina (onderaan kies je wie er zingt). Eigen tekeningen, geen "blobs": elk monster heeft een eigen vorm.

| Monster | Stem | Uiterlijk | Karakter |
|---|---|---|---|
| **Fleur** | sopraan (C4 tot B5) | een slanke roze peer met krulletjes bovenop en lange wimpers | een diva die de laatste noot altijd net te lang aanhoudt |
| **Amber** | alt (F3 tot E5) | een rond, oranje pluizenbolletje met oortjes en sproeten | warm en rustig, houdt iedereen bij elkaar |
| **Teun** | tenor (C3 tot A4) | een groen ei met twee voelsprieten en stippen | stralend en vrolijk, wil altijd de hoogste noot |
| **Brom** | bas (E2 tot D4) | breed en blauw, met hoorntjes, een plukje haar en dikke wenkbrauwen | een zachte reus die bij lage noten bijna in slaap valt |

Wat ze doen als ze zingen (op de proefpagina al te zien):
- de **mond** krijgt de vorm van de klinker (breed bij de i, wijd open bij de a, rond bij de o en oe) en gaat open met het geluid;
- de **ogen** kijken naar je vinger of muis, en knipperen af en toe; bij lage noten worden ze loom, bij hoge noten wijd;
- de **wangen** trillen mee met het vibrato;
- het **lijf** rekt mee met de toon en wiebelt een beetje na; het leunt opzij met de klinker;
- de **armen** gaan omhoog bij hoge noten; de krulletjes, voelsprieten en hoorntjes bewegen mee.

Bij minder beweging (`prefers-reduced-motion`) blijft alleen de mond bewegen.

### De personages van Bold

Je schreef dat het personages uit musicals zijn, en dat je toestemming hebt. Twee mogelijkheden:
- **A. Verkleden** (mijn voorstel): de vier monsters blijven het koor, en in een **kostuumkast** kun je ze verkleden met spullen van jouw personages: de kroon van Caspian, het hoedje van Hans, het brilletje van Callum, de jas van Dorian, en meer. Net zoals de props uit de coulissen op de homepage.
- **B. Als zangers**: jouw personages zelf als monsters op het podium. Dan heb ik per personage een korte beschrijving nodig (uiterlijk, karakter) en welke stem bij hem of haar past.

## Zingen

- **Slepen**: omhoog en omlaag is hoger en lager, opzij is een andere klinker (i, e, a, o, oe). Standaard **op de noten** van de toonladder, met een zachte overgang; je kunt ook vrij laten glijden.
- **Het monster dat je pakt, is de voorzanger.** De andere drie zingen vanzelf mee.
- **Met meerdere vingers**: elk monster dat je pakt, zingt jouw toon. Wie je niet pakt, zingt mee in de harmonie.
- **Toetsenbord**: spatie ingedrukt houden is zingen, pijltjes voor toon en klinker, 1 tot 4 kiest het monster.
- **Het geluid start pas na de eerste tik** (zoals een iPhone dat wil). Op een iPhone speelt het ook als de knop voor stil aan staat (`navigator.audioSession`, waar dat kan).

### De harmonie

Bij elke noot van de voorzanger kiest het spel een akkoord uit de toonsoort (I, ii, iii, IV, V, vi en V7). Het moet passen bij de melodienoot, en logisch volgen op het vorige akkoord (bijvoorbeeld I naar IV naar V naar I). Daarna zet het de andere stemmen in dat akkoord:
- met zo klein mogelijke stapjes (stemvoering);
- binnen het bereik van elke stem;
- zonder dat stemmen elkaar kruisen;
- zonder parallelle kwinten en octaven (die klinken hol).

Er is ook een toonsoort te kiezen (C, F, G, D, majeur en mineur). Laat je los, dan zingen de anderen de frase netjes uit naar een slotakkoord.

**Geen valse akkoorden**: een test speelt duizenden willekeurige melodieën en controleert elk akkoord en elke stap.

## De stemmen

Helemaal zelf gemaakt met de Web Audio API, zonder opnames (zie de proefpagina en de fragmenten):
1. **De stembanden**: een golfvorm met de vorm van een echte stembandpuls, waarvan de klank 6 dB per octaaf zakt.
2. **Adem**: ruis die met de stembanden meetrilt.
3. **De klinker**: vijf formanten (de pieken in de klank die van een a een a maken). Die worden als filters achter elkaar gezet. Hoe hoog en breed elke piek moet zijn, rekent de stem zelf uit, met dezelfde formules als de browser. Bij hoge noten gaat de eerste formant mee omhoog, zoals een echte sopraan doet.
4. **Leven**: vibrato (dat pas na een fractie van een seconde begint), een langzame wiebel in de toon, een aanzet van iets onder de noot, en een zachte val aan het eind.
5. **De zaal**: een zachte compressor en een eigen galm.

Elke stem heeft een eigen kleur en bereik: de sopraan is helder met snel vibrato, de bas donker en rond met langzaam vibrato.

**Gemeten**:
- geen klikjes, ook niet bij inzetten, loslaten, glijden en wisselen van klinker;
- alle klinkers even hard (hooguit 1,3 dB verschil);
- de formanten op de goede plek;
- vier stemmen samen blijven onder 0,6 (er kraakt niets);
- een stem kost ongeveer een twaalfde van de rekentijd, dus vier stemmen gaan ook op een telefoon;
- de pagina rekent de filters alvast uit terwijl je nog kijkt.

## Het podium

- **Decors**: een operazaal (rode gordijnen, kroonluchter, balkons), een rommelzolder (dakbalken, oude spullen, een rond raam met de maan) en een kerstmarkt (kraampjes, lichtjes, sneeuw).
- **Licht** dat meebeweegt: een spot op wie zingt, en de zaal kleurt mee met het akkoord.
- **Publiek**: silhouetten in de zaal die na een liedje klappen (het applaus zelf gemaakt), en bij een mooi slot bloemen gooien.

## Opnemen en delen

- **Opnemen**: het spel onthoudt alleen wat jij doet: wanneer je welk monster pakt, op welke noot en klinker, en wanneer je loslaat. De harmonie rekent het bij het afspelen opnieuw uit, met precies dezelfde regels, dus afspelen klinkt precies gelijk.
- **Delen met een link**: het hele liedje staat in de link, achter het `#`, zonder server (`monsterkoor.html#l=…`). Daarin staan een versienummer, de toonsoort, het decor, de gebeurtenissen als kleine getallen, en een controlegetal. Waar de browser het kan, wordt het ook ingepakt.
- **Een kapotte of te lange link** geeft een vriendelijke melding, en er gaat niets stuk. Een opname duurt hooguit 2 minuten.

## Liedjes om mee te zingen

Alleen oude, traditionele melodieën die vrij zijn van rechten. De monsters zingen klinkers, dus er zijn geen teksten nodig:
- Vader Jacob
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

- `monsterkoor-v1`, klein gehouden:
  - `liedjes`: je opgenomen liedjes, alleen de codes, hooguit 30;
  - `inst`: decor, toonsoort, op de noten, volume;
  - `voortgangTotaal`: het aantal liedjes om mee te zingen.
- In `SLEUTELS`, met een regel in de REGELS (liedjes samen, instellingen als keuze), in het gedeelde blok en in de scoreserver tegelijk.
- **Daarvoor is een nieuwe scoreserver nodig** (een kleine verandering). De pagina gaat pas online als die in Cloudflare staat.
- Geen scorebord.

## Op de rest van de site

- **Homepage**: een eigen icoon (een zingend monstertje met muzieknoten), in de categorie Even rustig. Onderschrift "Vier monsters, één koor", voortgang "x van 11 liedjes gezongen".
- Een banner, `privacy.html` en de werkplaats (`SPELINFO`).

## Volgorde

1. **Nu**: het plan, de proefpagina met één zingend monster, en de geluidsfragmenten. Jij luistert en zegt wat er anders moet.
2. De vier monsters samen op het podium, met de harmonie, meerdere vingers en het toetsenbord.
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
