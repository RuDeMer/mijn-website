# Plan: een nieuw hart voor het koppelen

Voorstel van Claude Code, 30 oktober 2026. **Goedgekeurd door Ruben op 30 oktober 2026**, met de keuzes die steeds als eerste stonden.

**Stand: fase 1 is gebouwd** (scoreserver 2026-10-30, het gedeelde blok, de spellen). Wat er bij het bouwen anders is gegaan dan hieronder staat:
- Bij Rommelpoker en Rommelbeesten roept het spel nu toch zelf `Scorebord.opnieuw` aan (bij "Nieuw spel", na verlies en bij "Alles wissen"). Een weggehaalde opslag zonder `opnieuw` wint namelijk alleen als het apparaat niet achterliep: zo veegt een apparaat dat achterloopt geen nieuwere voortgang weg.
- De controle tegen valsspelen kijkt ook naar "opnieuw beginnen" (anders kon je hem daarmee overslaan).
- De generatie onthoudt de server als `gt`, het volgnummer waarmee hij begon. Een apparaat hoeft hem dus niet zelf te kennen.

**Stand: fase 2 is gebouwd** (scoreserver 2026-10-30b, de knop Tijdmachine in het venster "Je account", de werkplaats). Wat er bij het bouwen anders is gegaan dan hieronder staat:
- De tabel heet `geschiedenis`, in de database `rommeltijd` (binding `TIJD`). Zonder die binding staat hij in de gewone database.
- `POST /tijdmachine` in plaats van `GET /tijdmachine?sleutel=`: dan staat de koppelcode nooit in een adres.
- Bij spellen zonder geld, muntjes of kaarten voegt terugzetten het moment samen met wat er nu staat. Je krijgt terug wat je kwijt was, en de puzzel van vandaag kun je niet overdoen. Bij de andere spellen ga je precies terug.
- Hooguit 10 keer terugzetten per dag per account.
- Per keer gelijkzetten pakt de server hooguit 100 kB aan gewone versies in (vanwege de rekentijd); een opslag vanaf 200 kB bewaart hij onverpakt, hooguit eens per uur.
- De scorebordnaam, instellingen en Rommelwoord staan niet in de tijdmachine van de speler (wel in de werkplaats).

**Stand: fase 3 is gebouwd** (alleen de pagina's: `rommelhoekje-sw.js`, het manifest en de iconen, het gedeelde blok). Wat er anders is gegaan dan hieronder staat:
- De wachtrij gaat ook in bij een verandering in een spel zonder internet (niet alleen bij het sluiten), en een open pagina zet zelf gelijk zodra de verbinding terug is.
- Een noodstop: `const UIT = true;` in `rommelhoekje-sw.js`.
- `display: minimal-ui` in het manifest, zodat een geïnstalleerde app een terugknop heeft.
- De knop Tijdmachine staat er pas als de server hem kent; zo kunnen fase 2 en 3 online vóór de nieuwe scoreserver.
- Het gedeelde blok werd groter dan 100.000 tekens: de controle van de gedeelde blokken kijkt nu naar `const HOME_ONDERDELEN`.

**Stand: fase 4 is gebouwd** (scoreserver 2026-10-30c, de worker `rommellive`, het gedeelde blok, de vier dagpuzzels). Wat er anders is gegaan dan hieronder staat:
- De server belt ook zelf aan als de pagina nog geen open deurbel had (`bel: 1`) en bij het sluiten van een pagina, niet alleen na hulp en terugzetten.
- Het live-haakje zit nu in de vier dagpuzzels (Rommelwoord, Rommelgroepjes, Op Gevoel en Rommelkroon), niet in alle puzzelspellen.
- Twee tabbladen op één apparaat: met Web Locks laat een ander tabblad een spel dat elders open staat met rust (dat kon vroeger misgaan).
- De vraag "waar wil je verder spelen" is een echt venster (`showModal`), zodat hij ook boven een venster van het spel komt.

**Stand: fase 5 is gebouwd** (scoreserver 2026-10-30d, het gedeelde blok). Wat er anders is gegaan dan hieronder staat:
- Elk apparaat heeft na 2,5 seconden vanzelf een eigen account. Daarom staan het invulveld en "Haal je account terug" nu ook in het venster van een apparaat dat al een account heeft (onder **Al een account op een ander apparaat?**). Vroeger moest je daarvoor eerst ontkoppelen.
- Komt een apparaat binnen met een QR-code, dan maakt het geen eigen account zolang de vraag "Dit apparaat koppelen?" openstaat.
- Het bewijs staat alleen in het stuk achter `#` van het adres. Dat stuk komt nooit bij GitHub of in een logboek; de pagina haalt het meteen uit het adres.
- Een koppelbewijs werkt ook zonder `KOPPEL_SLEUTEL`; een passkey niet.
- De passkey mag ook op een ander apparaat staan (zoals je telefoon die je computer helpt), niet alleen op het apparaat zelf.
- Onderweg gerepareerd: in Rommelpoker waren de rode knoppen van het venster op een telefoon onzichtbaar, door een regel uit de stijl van het spel (`.hoofd`). De knoppen van het venster heten nu `kp-hoofd`.

---

## 0. Eerst: wat er al is

In je opdracht staat dat nu de versie met het nieuwste tijdstip wint, en dat dat tijdstip van de klok van het apparaat komt. **Dat was zo tot 27 oktober.** Sinds de scoreserver 2026-10-27b ("Koppelen zonder verlies") gaat het al anders:

- **De server bepaalt de volgorde.** Elke versie krijgt een nummer van de server (`t`), dat per spel altijd oploopt. De klok van een apparaat telt niet mee.
- **Bij een botsing wint de meeste voortgang** (`MAAT`, dezelfde maat als op de homepage), en bij zeven spellen wordt al samengevoegd (`VOEG`: Rommelkroon, Rommelrecht, Rommelarend, Rommelbel, Rommelritme, Rommelsteek, Rommelwheels, en sinds 29b Rommelgroepjes).
- **De andere versie gaat niet verloren**: die bewaart de server 14 dagen, en jij kunt hem in de werkplaats terugzetten (⚖️ Versies, "Maak deze leidend").
- **Opnieuw beginnen in Rommelland** is op 28 oktober al gerepareerd, met een eigen oplossing alleen voor Rommelland (`nieuw`, `herstuur`, `naNieuwPark`).

Op dit moment draait in Cloudflare **versie 2026-10-29b** (dat zegt `/status`).

Ik bouw dus niet alles opnieuw. Ik bouw verder op wat er staat, en los op wat er nog echt misgaat.

### Wat er nog echt misgaat

1. **Twee apparaten zijn vaak niet gekoppeld.** Elk apparaat maakt na 2,5 seconden vanzelf een eigen account. Typ je de code van je andere apparaat niet over, dan heb je twee losse accounts, met elk een eigen voortgang. Dat is waarschijnlijk wat er bij **MST043** speelde (een spelerscode van Rommelbeesten). Het koppelen zelf werkt dan goed, maar het is te lastig om te doen. De **QR-code** (fase 5) lost dit op. Zeker weten doe ik het pas als ik zijn profiel zie (zie de vragen onderaan).
2. **Samenvoegen gebeurt nog met de hele opslag in één keer.** Bij een botsing wint per spel de meeste voortgang, behalve bij de acht spellen die samenvoegen. Bij de rest gaat wat het andere apparaat deed alleen naar de reservekopie. Bijvoorbeeld een veranderde instelling, of een record in Rob 👍.
3. **"Opnieuw beginnen" werkt alleen goed in Rommelland en de Vlaaienbakker.** Bij Ruben de Duiker, Mengelmoes, het lopende potje van Rommelpoker en "Alles wissen" in het beheermenu van Rommelbeesten is er dezelfde zwakke plek als vroeger in Rommelland: een ander apparaat dat nog de oude stand heeft, kan die terugzetten (zie §2c).
4. **Groter dan 380 kB gaat niet mee.** In de praktijk gaat het om de oude werelden van Rommelblok (`rommelblok-v2`, waar vroeger de hele wereld in zat). Ook `pagehide` stuurt hooguit 60 kB mee bij het sluiten.
5. **Alles gaat elke keer helemaal over de lijn**, zonder inpakken, en elke 30 seconden per open tabblad. Dat kost onnodig veel verzoeken aan de server.
6. **Een speler kan zelf niets terugzetten.** Alleen jij kunt dat, en de reservekopieën gaan maar 14 dagen terug, met één per dag.
7. **Zonder internet**: de pagina's openen niet, en wat je offline speelt, gaat pas mee bij een volgend bezoek.
8. **Niets gaat live.** Je ziet je voortgang van een ander apparaat pas na 30 seconden tot een paar minuten, en vaak pas na een herlaadbeurt.

---

## 1. De bouwstenen, in gewone taal

- **Regels per spel** (fase 1). Per spel staat beschreven welk soort gegevens het bewaart, en hoe je twee versies samenvoegt. Die regels staan op één plek: in het gedeelde scorebord-blok tussen `// ==== REGELS begin` en `// ==== REGELS eind`. Dezelfde tekst staat letterlijk in de scoreserver. De controle van de gedeelde blokken kijkt of die twee kopieën gelijk zijn, net als nu bij `HOME_ONDERDELEN`.
- **Een generatie per spel** (fase 1). Begin je opnieuw, dan wordt het generatienummer van dat spel één hoger. Een versie uit een oudere generatie kan de nieuwe stand nooit meer terugzetten. Hij gaat naar de tijdmachine, en het apparaat krijgt de nieuwe stand. Dit is de oplossing van Rommelland, maar dan voor alle spellen tegelijk.
- **Alleen wat veranderd is, ingepakt** (fase 1). Het apparaat bewaart de laatste versie waarover het het met de server eens was. Daarvan maakt het een lijstje veranderingen, en dat lijstje wordt ingepakt (deflate). Bewaard wordt het in **IndexedDB**. De spellen zelf lezen en schrijven gewoon `localStorage`, zoals nu: aan de spellen verandert niets.
- **De tijdmachine** (fase 2). De server bewaart per speler en per spel 30 dagen geschiedenis, zuinig uitgedund.
- **Een service worker voor de hele site** (fase 3). Daardoor openen bezochte pagina's ook zonder internet, en gaat wat je speelt mee zodra je weer verbinding hebt.
- **Live** (fase 4). Een **Durable Object** per account is een "deurbel": hij stuurt geen voortgang, alleen het bericht "er is iets nieuws". Het apparaat haalt het daarna zelf op.
- **QR-code en passkey** (fase 5).
- **Het dashboard in de werkplaats** (fase 6).

---

## 2. De regels per spel

### 2a. De soorten regels

| Regel | Wat het doet | Voorbeeld |
|---|---|---|
| **samen** | Wat op één van de apparaten gehaald is, blijft. | opgeloste puzzels, gevonden plekken, badges |
| **beste** | Per onderdeel het beste: de hoogste score, de snelste tijd, de meeste sterren. | record, sterren per level |
| **teller** | Wat er op elk apparaat bij kwam, telt op. Daarvoor is de gezamenlijke basis nodig; zonder basis wordt het de hoogste. | aantal keer gespeeld, pogingen |
| **keuze** | Een instelling: de laatste verandering wint (in de volgorde van de server), per instelling. | geluid, thema, gekozen poppetje |
| **lopend** | Iets dat nog bezig is: per onderdeel de versie die het laatst bewaard werd. Nooit gemengd. | een half opgeloste puzzel |
| **eerste** | Bij dagpuzzels: de eerste definitieve uitslag van een dag telt, net als in het spel zelf ("alleen de eerste poging telt"). Zo krijg je met twee apparaten geen twee kansen. | Rommelgroepjes, Rommelwoord |
| **geheel** | Eén hele versie wint: die met de **meeste voortgang** (de maat, dezelfde als op de homepage). De andere gaat naar de tijdmachine. Voor alles met geld, muntjes, kaarten of spullen. | Vlaaienbakker, Rommelbeesten |

Verder geldt overal:
- `voortgangTotaal` wordt de hoogste.
- Een veld dat een spel later toevoegt en dat nog niet in de regels staat, wordt **keuze**.
- Een spel dat nog niet in de regels staat, wordt **geheel**, met de nieuwste versie.
- **Opnieuw beginnen** maakt altijd een nieuwe generatie, en die gaat voor elke regel.

### 2b. Per spel

*(Gebaseerd op de opslag zoals die nu in de pagina's staat. Aan de opslag van de spellen verandert niets.)*

| Opslag | Regel | Details |
|---|---|---|
| `vlaaienbakker-v1` | **geheel** | Maat: opnieuw, oerdeeg ooit, Oerknallen, alles, deze ronde (als 10-log, zoals nu). Alleen `getal` (de schrijfwijze) is keuze. Alles hangt aan elkaar (vlaaien, bakkers, sterren), en de controle tegen valsspelen kijkt hiernaar. |
| `vlaaienbakker-week-v1` | **geheel** | Maat: weeknummer, dan wat je die week bakte. |
| `rommelbeesten-v1` | **geheel** | Maat zoals nu. Muntjes en kaarten kun je verkopen en ruilen: samenvoegen zou dubbel opleveren. `geluid` is keuze. De eigen koppeling van Rommelbeesten-accounts op de server blijft zoals hij is. |
| `rommelhotel-v1` | **geheel** | Maat: verhaalstap, opgeloste puzzels, badges. Munten, de rugzak en het verhaal hangen aan elkaar. `look`, `geluid` en `zoom` zijn keuze. |
| `rommelland-v1` | **geheel** | Maat: `nieuw`, dag, doelen, gasten (het voorstel uit CLAUDE.md). `nieuw` loopt gelijk op met de generatie. |
| `rubendeduiker-v1` | **geheel** | Maat: hoofdstuk, dag, Zeeboek. Geld, voorraad en materialen hangen aan elkaar. `inst` is keuze. |
| `rommelpoker-record` | **samen** en **beste** | `verst`, `beste`, `win` en de grootste waarden in `tel` (`max…`, `standGewonnen`): beste. De andere getallen in `tel`: teller. `gezien` (ontdekt): samen, bit voor bit. `inst`: keuze. |
| `rommelpoker-spel-v2` | **geheel** | Het lopende potje. Maat: stand, kraampje, score. Verlies je, of begin je een nieuw spel, dan wist het spel de opslag. Dat wordt nu een nieuwe generatie, dus een oud potje van een ander apparaat komt niet meer terug. |
| `rommelkroon-v1` | **samen** | `opgelost`: per puzzel de snelste tijd (met de hints van die keer). `dag`: per dag de snelste tijd, en "op de dag zelf" blijft aan als het één keer aan stond. `bezig`: lopend, per puzzel, en weg als hij is opgelost. `auto`, `inst` en `laatste`: keuze. |
| `rommelrecht-v1` | **samen** | `gehaald`, `manieren` en `dag`: samen. `laatste`, `geluid` en `frunnik`: keuze. |
| `rommelgroepjes-v1` | **eerste** | Per dag telt de eerste definitieve uitslag (opgelost of niet gelukt). Is er nog geen uitslag, dan de langste poging. `uitleg`: samen. `laatst`: beste. |
| `rommelwoord-dag-v1` | **eerste** | Zelfde dag: wie het eerst klaar was. Anders de langste poging. Een nieuwere dag wint van een oudere. |
| `rommelwoord-stats-v1` | **teller** en **beste** | `gespeeld`, `gewonnen` en `verdeling`: teller. `besteReeks` en `laatsteWinst`: beste. `reeks`: uit de versie met de nieuwste winst. |
| `opgevoel-v1` | **eerste** en **samen** | `dagen`: per dag de eerste uitslag, en daarna de nieuwste 120 dagen (zoals het spel). `records` en `stat`: `best` is beste, `n` en `som` zijn teller. `reeks.beste`: beste. `reeks`: uit de nieuwste versie. `bezig`: lopend. `inst`: keuze. |
| `reclame-v1` | **samen** | `s`: per level de meeste sterren. `dag`: uit de versie met de nieuwste dag; `b` (langste reeks) is beste, `n` is teller, maar dezelfde dag telt één keer. `look`, `inst` en `laatste`: keuze. |
| `huisopstelten-v1` | **samen** | Per kamer: sterren samen, snelste tijd, meeste chaos. `album`: samen. `besteDag`: beste. `dag`: de nieuwste (zelfde dag: de eerste). `dagen`: teller, maar dezelfde dag telt één keer. `inst`: keuze. |
| `rommelsteek-v1` | **samen** | `werk`: per patroon steekje voor steekje samen (een steekje gaat nooit weg). `af`: beste. `huidig` en de instellingen: keuze. |
| `rommelwheels-v1` | **samen** | `levels`: per level de vlaggen samen, de snelste tijd en de meeste punten en sterren. `gespeeld`: teller. `eigen` (zelfgemaakte levels): per level apart. Nieuw op één apparaat blijft. Weggehaald op één apparaat (en niet veranderd op het andere) is weg. Op allebei veranderd: de nieuwste. `bezig`, `inst` en `pers`: keuze. |
| `rommelarend-v1` | **samen** | `ontdekt` en `veren`: samen. `races`: snelste tijd en beste medaille. `gestart`: samen. De instellingen: keuze. |
| `rommelbel-v1` | **beste** | `open`, `sterren`, `scores` en `eindeloos`: beste. `gespeeld`: teller. `geluid`: keuze. |
| `rommelritme-v1` | **beste** | `best`: beste. `gehaald`: samen. `pogingen`: teller. `geluid`: keuze. |
| `vouwvlieger-v1` | **samen** | `best`: beste. `sterren` en `gespeeld`: teller. `skins` en `upg`: samen. `spaar` (sterren om uit te geven): teller, dus wat je op elk apparaat verdiende en uitgaf, telt allebei. Dat kan veilig, omdat je niets terug kunt verkopen. Kocht je op allebei hetzelfde, dan krijg je één keer je sterren terug. `skin` en `geluid`: keuze. |
| `rommelrob-v1` | **beste** | `best` en `bestSpam`: beste. `totaal` en `gespeeld`: teller. `stem`: keuze. |
| `productiefiets-v1` | **beste** | `best` en `bestMeter`: beste. `gespeeld` en `koffie`: teller. `geluid`: keuze. |
| `steiger-v1` | **beste** | Per level de meeste sterren en de hoogste score. Het spel staat nog niet online. |
| `mengelmoes-v1` | **samen** | `el` (je stickers): samen, op naam. De verwijzingen in de recepten en op het werkvlak worden daarbij goed gezet, en "1e druk" blijft aan als het één keer aan stond. `werk` en `cam`: lopend. `inst`: keuze. `stats`: teller. "Opnieuw" wordt een nieuwe generatie; anders zou samenvoegen je oude stickers terugzetten. |
| `rommelblok-v3` | **keuze** | Per instelling. `samen` (je gedeelde werelden): samen, per wereld; de sleutel van de eigenaar blijft bewaard. |
| `rommelblok-v2` | **geheel** | De oude wereld van vóór de vernieuwing (wordt niet meer geschreven). Kan nu ook mee als hij groter is dan 380 kB. |
| `rommelblok-taal`, `rommelhoekje-thema`, `gereedschap-v2` | **keuze** | Het thema "Automatisch" is een weggehaalde opslag. Dat telt als een gewone keuze, en die gaat mee naar je andere apparaten. |
| `rommelhoekje-speler` | **keuze** | Je naam op het scorebord. Stop je met meedoen, dan stop je op al je apparaten. Anders zou een ander apparaat je scores meteen opnieuw insturen. |
| `rommelhoekje-eitjes` | **samen** | (Wordt nu niet meer gebruikt.) |

### 2c. Opnieuw beginnen in de spellen

| Spel | Hoe het nu gaat | Wat er nu mis kan gaan | Wat ik verander |
|---|---|---|---|
| Ruben de Duiker ("Opnieuw beginnen", "Nieuw spel") | Schrijft een nieuwe, lege stand. | Een ander apparaat met je oude spel heeft meer voortgang, en zet dat oude spel terug. | `Scorebord.opnieuw('rubendeduiker-v1')` |
| Mengelmoes ("Opnieuw") | Schrijft een nieuwe, lege stand. | Hetzelfde. | `Scorebord.opnieuw('mengelmoes-v1')` |
| Rommelpoker ("Nieuw spel", en na verlies) | Wist het lopende potje. | Een ander apparaat zet het oude potje terug. | `Scorebord.opnieuw('rommelpoker-spel-v2')` vóór het wissen. |
| Rommelbeesten (beheermenu, "Alles wissen") | Wist de opslag. | Hetzelfde. | `Scorebord.opnieuw('rommelbeesten-v1')` vóór het wissen. |
| Vlaaienbakker ("Opnieuw beginnen") | Nieuwe stand, met `opnieuw` + 1. | Gaat al goed (`opnieuw` staat vooraan in de maat). | Voor de zekerheid ook `Scorebord.opnieuw`. |
| Rommelland ("Opnieuw beginnen", "Ongedaan maken", "Vorig park") | Eigen oplossing met `nieuw`. | Gaat al goed. | `Scorebord.opnieuw` in `zetPark`. De eigen oplossing blijft voorlopig staan, voor oude apparaten. |
| Rommelkroon, Rommelsteek, Rommelwheels ("Opnieuw" bij één puzzel of level) | Maakt alleen dat ene bord leeg. | Niets: dat is geen nieuwe start van het hele spel. | Niets. |

---

## 3. Het nieuwe protocol (v3), en de overgang

### Wat een apparaat bewaart
- **`localStorage`**: de opslag van de spellen, precies zoals nu. Daarnaast `rommelhoekje-koppel`, met alleen de code en een paar kleine dingen. Dat is nodig omdat het bovenste stukje van het gedeelde blok synchroon moet kunnen lezen, vóór het spel begint.
- **IndexedDB `rommelhoekje`** (nieuw). Daarin staan per spel:
  - `basis`: de inhoud waarover apparaat en server het laatst eens waren, met `t` (het volgnummer van de server), `h` (de vingerafdruk) en `g` (de generatie);
  - `uit`: wat nog verstuurd moet worden. Dit is de wachtrij voor als je offline bent; de service worker kan die ook versturen.

### Een gewone keer gelijkzetten
1. Het apparaat kijkt per spel of `localStorage` anders is dan `basis`. Is het anders, dan gaat er een lijstje veranderingen mee ten opzichte van `basis`, met `basis.t`, `basis.h` en `basis.g`.
2. De server kijkt of `basis.h` overeenkomt met wat hij nu heeft:
   - **Ja**: het is gewoon de volgende stap. De server voert de veranderingen uit, geeft een nieuw volgnummer, en antwoordt met `gezet`.
   - **Nee, en de generatie is ouder**: de versie gaat naar de tijdmachine. Het apparaat krijgt de nieuwe generatie, met de melding "Je bent op een ander apparaat opnieuw begonnen. Je oude voortgang staat in de tijdmachine."
   - **Nee, zelfde generatie** (een echte botsing): de server vraagt in hetzelfde antwoord om de hele versie en de basis (`stuur-alles`). Het apparaat stuurt die meteen. De server voegt samen met de regels van het spel (een "driewegvergelijking": wat veranderde er op elk apparaat sinds de gezamenlijke basis). Het resultaat is een nieuwe versie, die het apparaat terugkrijgt. Wat niet samen kon, gaat naar de tijdmachine.
3. Stuurt een apparaat precies wat de server al heeft (bijvoorbeeld nog eens vanuit de wachtrij), dan is het antwoord `gelijk`. Twee keer versturen is dus nooit een probleem.

### Het inpakken
- Het hele verzoek wordt ingepakt met `CompressionStream('deflate-raw')`. Dat kan in alle browsers van de laatste drie jaar; oudere browsers sturen het gewoon onverpakt.
- Het blijft een "eenvoudig" verzoek (`Content-Type: text/plain`, `?z=1` in het adres). Er komt dus geen vooraf-vraag van de browser bij.
- **Op de server staat elke versie ingepakt.** De grens van 380 kB verdwijnt. Wat overblijft is de grens van één rij in D1, namelijk 2 MB *ingepakt*. Dat komt neer op zo'n 10 tot 20 MB echte opslag, en dat is meer dan een browser per site bewaart.
- Bij het sluiten van een pagina stuurt `pagehide` ook ingepakte veranderingen. Daar was de grens 60 kB. In de praktijk past nu bijna alles.

### Minder verzoeken
- Niet meer elke 30 seconden per open tabblad. Zonder live verbinding wordt het elke 2 minuten, of 5 seconden nadat er iets veranderde, en bij het sluiten. Met een live verbinding (fase 4) alleen nog als er iets veranderde, of als de deurbel gaat, met daarnaast één keer per 10 minuten ter controle.

### De overgang (oude pagina's blijven werken)
- **Het oude koppelen (`v: 2`) blijft gewoon werken**, met dezelfde antwoorden. Een pagina die nog open staat, of een apparaat dat nog een oude versie heeft (bijvoorbeeld uit de cache van de browser), merkt niets. De server houdt `v: 2` in de lucht tot hij 60 dagen geen oud apparaat meer zag; dat zie jij in het dashboard (fase 6).
- Oude en nieuwe apparaten schrijven in dezelfde tabellen en gebruiken dezelfde regels. Ook bij een oud apparaat voegt de server dus samen met de nieuwe regels, en geldt de generatie: een oud apparaat met een oudere generatie wordt behandeld als een botsing die hij altijd verliest, en zijn versie gaat naar de tijdmachine.
- **Eerst de server, dan de pagina's.** Een nieuwe pagina vraagt de versie van de server op (`/status`). Is die te oud, dan gebruikt hij gewoon `v: 2`. Zet je de server later in Cloudflare dan ik de pagina's push, dan gaat er dus niets mis.
- **De eerste keer met v3** stuurt elk apparaat één keer alles mee, zoals bij de overgang van 27 oktober. Zo kan de server per spel kijken of het klopt, en vult het apparaat zijn `basis` in IndexedDB.
- **Rommelbeesten**: de koppeling van accounts (`rb_koppel`, `rbSamen`, `rb_alias`, `rb_oud`) blijft precies zoals hij is. Bestaande dubbele accounts worden nog steeds netjes samengevoegd, zonder dat er kaarten bij komen.
- **Rommelland** houdt zijn eigen oplossing (`nieuw`, `herstuur`) tot er geen oude apparaten meer zijn. Ze zitten elkaar niet in de weg: de generatie van het gedeelde blok en `nieuw` van Rommelland gaan dezelfde kant op.

### Hulp van Ruben
Het hulpsysteem (`/beheer/hulp`: zet, wijzig, wis, met een bericht) blijft precies zo werken. Hulp wordt een gewone nieuwe versie met `soort: 'hulp'`, en staat dus ook in de tijdmachine. Daardoor kan de speler (en jij) ook hulp weer terugdraaien.

### De controle tegen valsspelen
- **Hij staat nu uit**, en dat blijft zo tot jij iets anders besluit (`VALSSPEEL_CONTROLE = false`, besluit van 14 oktober). De code blijft wel werken, en ik test hem aan én uit.
- De twee spellen die de controle kent (de Vlaaienbakker en Rommelbeesten) **voegen niet samen**: daar wint altijd één hele versie. De controle kijkt dus naar een versie die echt van één apparaat komt, en vergelijkt die met de vorige stand van dat apparaat (`sync_apparaat`), net als nu. Een samengevoegde stand kan daar nooit iets aan toevoegen. Daarmee blijft hij precies even streng.
- Bij de andere spellen kijkt de server, net als nu, alleen naar het maximum van de scores.

### Grenzen van het gratis abonnement
Een Worker mag in het gratis abonnement maar ongeveer **10 ms rekentijd** per verzoek gebruiken. Daarom:
- pakt de server alleen uit wat hij echt moet bekijken: bij een botsing, de maat, of de controle;
- bewaart hij de ingepakte stukken zoals het apparaat ze stuurde;
- doet hij een driewegvergelijking alleen bij een echte botsing (dat is zeldzaam).

Ik meet de rekentijd in de tests met de grootste opslag die er is.

---

## 4. Wat de server bewaart, en hoe lang

| Wat | Waar | Hoe lang |
|---|---|---|
| De huidige stand per spel, ingepakt, met volgnummer, vingerafdruk en generatie | `sync_data` (bestaat al, krijgt kolommen `g`, `h` en `z`) | Zoals nu: tot je het laat weghalen, of 2 jaar na de laatste keer bewaren |
| **De tijdmachine**: eerdere versies, ingepakt, met een korte omschrijving ("84 van 139 puzzels netjes") | `geschiedenis` in een **tweede D1-database** `rommeltijd` (nieuw; vervangt `sync_versies`, zie hieronder) | 30 dagen, uitgedund (zie hieronder) |
| Versies die ooit "verloren": een botsing, een oudere generatie, wat er stond vóór opnieuw beginnen, vóór terugzetten of vóór hulp | `geschiedenis` in `rommeltijd` | Altijd de volle 30 dagen, nooit uitgedund |
| Apparaten per account: een vingerafdruk van het apparaatnummer, laatst gezien, protocol (v2 of v3), versie van de site | `koppel_apparaat` (nieuw) | 90 dagen na laatst gezien |
| Het koppelbewijs van de QR-code: alleen een vingerafdruk, en de code versleuteld met het bewijs zelf | `koppel_bewijs` (nieuw) | 5 minuten, en na één keer gebruiken meteen weg |
| Passkeys (optioneel): de publieke sleutel, en de koppelcode versleuteld met een geheim van de server | `passkeys` (nieuw) | Tot de speler hem weghaalt, met zijn account mee |
| Meldingen over het koppelen | `sync_meldingen` (bestaat al) | 60 dagen, zoals nu |
| Live: wie er verbonden is, en welke pagina open staat | Alleen in het geheugen van de Durable Object | Zolang de verbinding open is; niets op schijf |

**Uitdunnen van de tijdmachine:**
- de laatste **2 dagen**: hooguit één versie per 10 minuten per spel;
- **2 tot 7 dagen** terug: één per uur;
- **7 tot 30 dagen** terug: één per dag.

**Minder schrijven:** de server kopieert de huidige versie pas naar de geschiedenis als er een nieuwe versie komt, en alleen als de laatste kopie ouder is dan 10 minuten (en altijd bij de bijzondere soorten). Dat is hooguit één extra rij per 10 minuten per spel dat je speelt.

**Een grens per account**: hooguit 20 MB (ingepakt) aan geschiedenis. Komt een account daarboven, dan dunt de server eerder uit, maar nooit de bijzondere versies.

**Waarom een tweede database?** In het gratis abonnement mag één D1-database hooguit **500 MB** groot worden (alle databases samen 5 GB). De tijdmachine kan bij veel spelers een paar honderd MB worden. In een eigen database `rommeltijd` kan hij nooit de scores, de ideeën of de huidige voortgang in de weg zitten. Gaat er met de tijdmachine iets mis, dan werkt de rest gewoon door. Jij maakt hem in het dashboard aan (D1 → Create) en koppelt hem aan de scoreserver als `TIJD`. De server houdt zelf in de gaten hoe groot hij is, en dunt eerder uit boven 400 MB.

**De privacyverklaring** wordt bijgewerkt:
- de tabel "Hoe lang" (30 dagen in plaats van 14);
- een stukje over de tijdmachine;
- de QR-code (5 minuten);
- de passkey;
- de apparatenlijst;
- live (alleen in het geheugen, alleen met je eigen apparaten);
- de datum bovenaan.

---

## 5. Kosten in Cloudflare

Je gebruikt (zo te zien) het **gratis abonnement**. CLAUDE.md noemt de grens van 50 databaseverzoeken per aanroep. Durable Objects kunnen sinds 2025 ook in het gratis abonnement, maar alleen met SQLite.

| | Gratis per dag | Schatting nu (100 spelers per dag) | Schatting na fase 4 |
|---|---|---|---|
| Worker-verzoeken | 100.000 | ~6.000 tot 10.000 (vooral `/sync` elke 30 s) | ~3.000 tot 5.000 (minder vaak `/sync`) |
| D1 rijen geschreven | 100.000 | onbekend: kun je dit opzoeken? | + hooguit ~1 rij per 10 minuten per gespeeld spel voor de tijdmachine |
| D1 opslag | 500 MB per database, 5 GB in totaal | onbekend: kun je dit opzoeken? | de tijdmachine in een eigen database: ongeveer 50 tot 200 kB per actieve speler per spel (30 dagen, ingepakt) |
| Rekentijd per verzoek | 10 ms | – | ik houd `/sync` daaronder; dat meet ik in de tests |
| Durable Object-verzoeken | 100.000 | 0 | ~1 per geopende pagina, plus 1 per 20 berichten: een paar duizend |
| Durable Object-duur | 13.000 GB-s | 0 | bijna 0: met *hibernation* telt een stille verbinding niet mee |

Zelfs bij tien keer zoveel spelers blijft alles binnen het gratis deel. Fase 4 maakt het zelfs **goedkoper** dan nu, omdat de apparaten niet meer elke 30 seconden hoeven te vragen of er iets nieuws is.

Mijn schattingen zijn grof. Bekijk in het Cloudflare-dashboard (Workers & Pages → rommelscores → Metrics, en D1 → je database → Metrics) hoeveel verzoeken en geschreven rijen er nu per dag zijn. Dan reken ik het precies na.

### Durable Objects kun je niet in het dashboard maken
Een Durable Object kun je (voor zover ik kan nagaan) **niet alleen met het dashboard** aanmaken: de klasse moet met Wrangler worden "aangemeld" (een *migratie*). Daarom stel ik voor:

- **De scoreserver blijft zoals hij is**: jij plakt hem in het dashboard, en je andere Claude kijkt hem na.
- **Er komt één kleine, aparte worker `rommellive`** met alleen de deurbel (de Durable Object). Hij heeft geen database en kent geen voortgang. Hij wordt **één keer** met Wrangler gezet, en daarna bijna nooit meer veranderd. Dat kan op twee manieren (zie de vragen onderaan):
  - **(a)** samen met Claude Code op je Mac: `npx wrangler login` en `npx wrangler deploy`, ongeveer 10 minuten;
  - **(b)** via het dashboard: "Create → Import a repository" uit een nieuwe, kleine GitHub-repository. Cloudflare zet hem dan zelf neer bij elke push.
- De scoreserver en `rommellive` delen één geheim (`LIVE_GEHEIM`). Daarmee geeft de scoreserver een **kaartje** uit (twee minuten geldig) waarmee een apparaat de deurbel van zijn eigen account mag openen. De koppelcode gaat dus nooit naar `rommellive`.

---

## 6. De fases

Elke fase levert iets op dat werkt. Per fase komt eerst de scoreserver (ik lever het hele bestand, jij laat het nakijken en zet het in Cloudflare), en dan pas de pagina's. Na elke fase schrijf ik een overdracht en werk ik CLAUDE.md bij, en ik laat je zien wat er in de commit gaat voordat ik push.

### Fase 1: het fundament (de grootste fase)
- **Scoreserver**:
  - `/sync` met `v: 3` (veranderingen, inpakken, generaties, driewegvergelijking);
  - de REGELS;
  - ingepakte opslag zonder 380 kB-grens;
  - `v: 2` blijft werken en gebruikt dezelfde regels;
  - nieuwe kolommen en tabellen, die zichzelf aanmaken;
  - `MAAT` en `VOEG` gaan op in de REGELS.
- **Het gedeelde blok** (met het script uit CLAUDE.md in alle 24 pagina's en `homepage-onderdelen.js`, en dan de kopie in de werkplaats):
  - het nieuwe gelijkzetten, met IndexedDB, veranderingen en inpakken;
  - `Scorebord.opnieuw(sleutel)` voor opnieuw beginnen;
  - wissen wordt een nieuwe, lege versie;
  - minder vaak `/sync`;
  - terugvallen op `v: 2` bij een oude server.
- **Opnieuw beginnen gerepareerd** in de spellen waar dat speelt (de lijst staat in §2b): elk spel roept `Scorebord.opnieuw(sleutel)` aan, en schrijft een lege stand in plaats van te wissen.
- **De werkplaats**: `SPELINFO` krijgt bij elk spel de soort regel, voor uitleg in het profiel; de rest komt in fase 2 en 6.

### Fase 2: de tijdmachine
- **Scoreserver**:
  - `sync_geschiedenis`, met uitdunnen in het dagelijkse `opruimen`;
  - `GET /tijdmachine?sleutel=` (met de koppelcode) geeft de momenten, met omschrijving;
  - `POST /tijdmachine/terug` zet een moment terug, als een nieuwe versie (dus ook dat is weer terug te draaien);
  - `/beheer/versies` leest dezelfde geschiedenis.
- **Het venster "Koppel je apparaten"** krijgt een knop **Tijdmachine**, in dezelfde stijl (manilla, inktrand, rode knop):
  1. kies een spel;
  2. dan zie je een lijst momenten ("vandaag 14:02 · 84 van 139 puzzels netjes");
  3. kies er een, dan **Zet terug**, met een vraag ter bevestiging;
  4. al je apparaten krijgen dat moment.
  - Een moment van vóór "opnieuw beginnen" heeft een eigen labeltje.
- **De werkplaats** (profiel van een speler, ⚖️ Versies): dezelfde lijst, nu 30 dagen. "Maak deze leidend" blijft via de hulp gaan, met een bericht, zodat de speler het merkt.
- **De privacyverklaring** bijgewerkt.

### Fase 3: alles werkt offline
- `rommelhoekje-sw.js` (scope: de hele site), geregistreerd vanuit het gedeelde blok. Hij doet niets met de werkplaats: alles van `/werkplaats` laat hij met rust, en de werkplaats houdt zijn eigen service worker (de nauwste scope wint).
  - **Pagina's**: eerst het internet proberen (met een snelle controle, GitHub antwoordt dan "niet veranderd"), en na 3 seconden of zonder verbinding de bewaarde versie. Zo kom je nooit vast te zitten op een oude versie, en opent een bezochte pagina ook offline.
  - **Plaatjes, lettertypes, three.js en Planck** (vaste versies met SRI): uit de opslag, en op de achtergrond verversen.
  - **De scoreserver en de andere servers**: nooit bewaard.
  - `instellingen.json`: bewaard, zodat het adres van de scoreserver ook offline bekend is.
  - Alleen pagina's die je al eens opende zijn offline te gebruiken. Ik bewaar niet vooraf de hele site (ongeveer 12 MB), want dat kost op een telefoon veel data.
- **Background Sync** (Chrome en Android): wat in de wachtrij staat, verstuurt de service worker zodra er weer verbinding is, ook als de pagina dicht is. In Safari gebeurt dat bij het volgende bezoek, of zodra de verbinding terugkomt terwijl de pagina open is.
- **Een manifest** `rommelhoekje.webmanifest`, met een icoon in de stijl van de site (Rubens sticker op het papier met stippen van de site). Het gedeelde blok zet de verwijzing in de pagina. Het uiterlijk van de site verandert niet.
- **Veiligheidsbeleid**: niets nodig. `worker-src 'self'` staat er al, en `manifest-src` valt terug op `default-src 'self'`.

### Fase 4: live doorspelen
- **`rommellive`** (nieuw): een Durable Object per account, met WebSockets en *hibernation*, en automatische ping-pong (`setWebSocketAutoResponse`). Een stille verbinding wekt hem dus niet.
- **De scoreserver** geeft in `/sync` een kaartje mee. Na hulp of terugzetten belt hij zelf aan bij de deurbel.
- **Het gedeelde blok**: na elk gelijkzetten "er is iets nieuws" naar de deurbel. Krijgt het zelf dat bericht, dan meteen gelijkzetten. Valt de verbinding weg, dan opnieuw verbinden, met steeds langer wachten (tot 2 minuten). Zonder verbinding gaat alles gewoon door, zoals in fase 3.
- **Precies waar je was**: wat een ander apparaat deed, staat al in `localStorage` voordat je het spel opent (als er ergens een pagina van de site open is). Anders gebeurt het bij het openen, in de eerste seconde, met de herlaadbeurt die er nu ook al is.
- **Samen in een open spel**:
  - Spellen die echt kunnen samenvoegen krijgen een klein haakje, `Scorebord.live(sleutel, nieuweStand => …)`. Dan komt wat je op je telefoon oplost meteen in het open spel op je computer, zonder te herladen. Dat zijn de puzzelspellen; zie §2b.
  - Spellen met geld of kaarten kunnen dat niet. Daar komt de bestaande melding "Op een ander apparaat is verder gespeeld" binnen een paar seconden in plaats van na een halve minuut.
  - *Voorstel (keuze 2 hieronder)*: staat zo'n spel open op twee apparaten tegelijk, dan vraagt het tweede waar je verder wilt spelen, net als de tabbladbewaker nu al doet bij twee tabbladen.
- **Veiligheidsbeleid**: `wss://rommellive.rubendm.workers.dev` erbij in `connect-src` in de 24 pagina's met het gedeelde blok. Een `https://`-adres dekt geen `wss://`.

### Fase 5: koppelen met een QR-code, en een passkey
- **QR-code**: in het venster "Je account" komt een QR-code (getekend door eigen code in het gedeelde blok, dus geen scripts van buiten).
  - Hij bevat een adres met een **koppelbewijs** van 5 minuten, voor één keer.
  - Scan hem met de camera van je telefoon. De site opent, vraagt "Dit apparaat koppelen?", en dan ben je gekoppeld. Het andere apparaat zegt meteen "Gekoppeld!" (via live).
  - Het bewijs staat er ook als korte tekst onder, om over te typen.
  - Wie het bewijs na 5 minuten fotografeert, heeft er niets meer aan. Na 8 foute pogingen per adres moet je een kwartier wachten.
  - De oude koppelcodes blijven gewoon werken.
- **Passkey (optioneel)**: "Bewaar je account met Face ID, Touch ID of je pincode".
  - Op een nieuw apparaat: "Haal je account terug". De passkey zit in de sleutelhanger van Apple of Google, die hem naar je nieuwe telefoon brengt.
  - De server controleert de handtekening, en geeft dan de koppelcode, die hij versleuteld bewaart met een geheim (`KOPPEL_SLEUTEL`).
  - Geen e-mailadres, geen wachtwoord.
  - Ook voor kinderen geschikt: er is alleen een schermvergrendeling op het apparaat nodig.
  - De passkey heet "Rommelhoekje-account" en staat los van de passkey van je werkplaats.

### Fase 6: het dashboard in de werkplaats
Een nieuw tabje **Koppelen** bij Servers, met:
- accounts (totaal, actief in 7 en 30 dagen);
- apparaten per account (hoeveel accounts er 1, 2, of 3 of meer apparaten hebben);
- botsingen (samengevoegd, meeste voortgang, oudere generatie);
- geweigerde versies;
- versies die te groot waren;
- **apparaten die achterlopen** (nog `v: 2`, of een oude versie van de site);
- hoe groot de tijdmachine is;
- of de live deurbel werkt (de wachter van de cron belt elke 5 minuten even aan), en hoeveel kaartjes er vandaag zijn uitgegeven.

Een nieuwe soort melding `koppel` (bijvoorbeeld bij veel botsingen, of als de deurbel niet antwoordt), via de meldingen die er al zijn.

---

## 7. Testen

- **De echte Cloudflare-omgeving, maar dan lokaal**: de scoreserver en `rommellive` draaien in de tests in **Miniflare** (`workerd`, dezelfde runtime als in Cloudflare, met een echte D1, een echte Durable Object, echte WebSockets en de echte `CompressionStream`). Snelle tests draaien daarnaast in Node met een nagemaakte D1 (`node:sqlite`), zoals bij eerdere versies. Ik meet ook de rekentijd per verzoek, want het gratis abonnement staat 10 ms toe.
- **Een simulatie met chaos**, met de echte scoreserver en het echte gedeelde blok in nagemaakte browsers:
  - twee en drie apparaten die door elkaar spelen;
  - verbindingen die wegvallen en terugkomen;
  - een klok die dagen voor of achter loopt;
  - een oude pagina (`v: 2`) naast een nieuwe;
  - opnieuw beginnen en terugzetten;
  - een opslag van 2 MB.

  Na elke ronde controleer ik twee dingen:
  - **Niets kwijt**: alles wat op een apparaat gehaald is (een puzzel, een record, een ster) staat in de eindstand. Of het staat in de tijdmachine, als het bij een spel met geld of kaarten hoort.
  - **Niets dubbel**: muntjes, geld en kaarten in de eindstand zijn nooit meer dan op het beste apparaat, en een verkochte kaart komt niet terug.
- **De regels per spel**, elk apart: met echte opslagen uit de spellen, en elke regel met willekeurige standen (samenvoegen in elke volgorde geeft hetzelfde, en hetzelfde twee keer samenvoegen verandert niets).
- **De controle tegen valsspelen**, aan en uit, met samengevoegde standen en met oude apparaten.
- **Een echte browser** (Chromium, 390 en 1280 breed, licht en donker):
  - offline openen;
  - een nieuwe versie laden;
  - koppelen met een QR-code (tussen twee browsers);
  - live doorspelen tussen twee vensters;
  - de tijdmachine;
  - alle 28 pagina's zonder fouten of overtredingen van het veiligheidsbeleid.
- **Niet te testen** vanuit hier: een echte iPhone (Safari), en het echte Cloudflare. Dat moet jij na het neerzetten even proberen; ik geef een lijstje.

---

## 8. Wat ik bewust niet doe

- **Geen geld, muntjes of kaarten samenvoegen.** Twee apparaten kunnen allebei dezelfde kaart verkopen of dezelfde muntjes uitgeven. Samenvoegen zou dan dubbel opleveren. Bij die spellen wint de meeste voortgang, en de andere versie staat 30 dagen in de tijdmachine. Je bent hem dus niet kwijt, maar hij wordt ook niet vanzelf opgeteld.
- **De werelden van Rommelblok** (IndexedDB, megabytes groot) gaan niet mee. De instellingen wel, net als nu. Werelden delen kan al met Samen spelen.
- **De spellen zelf herschrijf ik niet**, behalve de knoppen voor opnieuw beginnen, en het kleine live-haakje in de puzzelspellen.

---

## 9. Wat ik van jou nodig heb, voordat ik begin

1. **Je goedkeuring van dit plan**, of wat je anders wilt.
2. **De scoreserver die nu in Cloudflare draait (versie 2026-10-29b)**, het hele bestand. Ik bouw daarop verder. Plak hem in het gesprek, of zet hem als bestand in de map waar je Claude Code gebruikt.
3. **Een paar getallen uit het Cloudflare-dashboard**, om de kosten precies na te rekenen:
   - verzoeken per dag van `rommelscores`;
   - rijen geschreven per dag;
   - hoe groot je D1-database nu is.
4. **Keuzes** (mijn voorstel staat steeds eerst):
   - **a. De deurbel (fase 4)**: een kleine, aparte worker `rommellive`, die één keer met Wrangler wordt gezet: samen met Claude Code op je Mac (a), of via "Import a repository" in het dashboard (b). De scoreserver blijft gewoon in het dashboard.
   - **b. Hetzelfde spel open op twee apparaten**: vragen waar je verder wilt spelen, zoals de tabbladbewaker nu al doet bij twee tabbladen. Of niet vragen, en alleen de melding "Op een ander apparaat is verder gespeeld".
   - **c. Offline**: alleen de pagina's die je al eens opende (zuinig met data). Of alles vooraf bewaren.
   - **d. Volgorde**: zoals jij vroeg (1 tot en met 6). De QR-code (fase 5) lost waarschijnlijk het probleem van MST043 op en hangt nergens van af; die kan ook direct na fase 1.
   - **e. Dit plan** als `koppelen-plan.md` in de repository zetten (zoals `multiplayer-plan.md`), zodat een volgende sessie het ook kan lezen.
5. **MST043**: wil je in de werkplaats bij Spelers zoeken op MST043 en mij vertellen wat je ziet? Ik bedoel: hoeveel koppelcodes, welke oude codes, en of er "⚖️ Versies" staan. Dan weet ik zeker of het twee losse accounts waren, of iets anders.
