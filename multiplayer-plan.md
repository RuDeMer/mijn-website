# Rommelblok samen spelen: het plan

Dit is een plan, nog geen bouwwerk. Rommelblok is nu een spel voor één speler, maar de code is zo opgezet dat samen spelen later kan. Hieronder staat wat er al klaarstaat, welke twee manieren er zijn om het te bouwen, wat er over de lijn gaat, hoe we valsspelen tegengaan, hoe chatten veilig blijft voor kinderen, wat het kost en wat we als eerste bouwen.

## 1. Wat er al klaarstaat

- **De wereld komt uit het zaadje.** Alles wat de wereld maakt (`G.maakWereld(zaad)` in `gedeeld.js`) geeft voor hetzelfde zaadje precies dezelfde wereld: land, grotten, ruïnes, mijnen, kraters en zelfs de buit in oude kisten. Dat stuk code gebruikt geen pagina of browser. Het draait ook in Node (de tests doen dat al) en dus ook op een server of in een Cloudflare Worker.
- **Elke verandering is een actie.** Alles wat een speler aan de wereld verandert, gaat door één punt (`src/p6a_acties.js`). Een actie is bijvoorbeeld `{ t: 'breek', x, y, z, met }`. Wat de actie verandert staat erbij als `gevolg`:
  - `['b', x, y, z, v]`: een blok;
  - `['k', x, y, z, vak, inhoud]`: een vak van een kist of oven;
  - `['w', x, y, z]`: de inhoud van een kist of oven is weg;
  - `['v', x, y, z, v]`: een oude kist vult zich met buit;
  - `['l', x, y, z, id, n, dur]`: er valt iets op de grond.
- **Meeluisteren en uitvoeren kan al.** `acties.luister(f)` geeft elke actie door. `acties.ontvang(a)` voert een actie van iemand anders uit, zonder hem opnieuw te melden.
- **Getest.** De test `test/acties.js` speelt een paar dingen (hakken, bouwen, een kist vullen, een deur openen, een kist kapotmaken). Dan opent hij dezelfde wereld opnieuw en voert alleen de acties uit. Elk blok en elke kist is daarna precies hetzelfde. Zo weten we: **zaadje + acties = de hele wereld**.
- **Wat geen actie is:** water dat stroomt, gewassen en bomen die groeien, gras dat uitloopt en een oven die bakt. Dat doet de wereld zelf. Bij samen spelen rekent de server dat uit en stuurt hij het resultaat naar iedereen (in hetzelfde formaat als de wereldbaas nu naar de pagina stuurt: `blokken`).

## 2. Twee manieren om het te bouwen

### A. Cloudflare: een Durable Object per wereld, met WebSockets

Een Durable Object is een klein stukje server dat Cloudflare voor je draait, met eigen opslag. Elke gedeelde wereld krijgt er één (een "kamer"). Alle spelers van die wereld hebben een WebSocket-verbinding met dat ene object.

- **Voordelen:**
  - Het past bij wat er al is: de scoreserver is ook een Cloudflare Worker.
  - Geen server om bij te houden: geen updates, geen herstarten, geen back-ups van een machine.
  - Per wereld is er één object dat alles op volgorde afhandelt. Twee spelers kunnen dus nooit tegelijk hetzelfde blok veranderen.
  - Met de "hibernation"-manier slaapt een lege wereld en kost hij (bijna) niets.
  - De opslag (SQLite in het object) bewaart per stuk alleen de veranderde blokken, net als IndexedDB nu.
  - Het object kan met `gedeeld.js` zelf stukken wereld maken, en dus elke actie nakijken.
- **Nadelen:**
  - Er zijn grenzen aan rekentijd en geheugen per object (ongeveer 128 MB). Voor een paar honderd stukken wereld is dat genoeg, voor een heel grote wereld met veel spelers niet.
  - Het water laten stromen en de gewassen laten groeien moet met een wekker (`setAlarm`) in stapjes.
  - In de Content-Security-Policy moet het WebSocket-adres er expliciet bij (`connect-src wss://…`).

### B. Rubens VPS: een Node-programma met WebSockets

Een klein Node.js-programma met de bibliotheek `ws`, achter nginx (zoals het hotel), bijvoorbeeld op `blok.rubensrommelhoekje.nl`. De opslag staat in een SQLite-bestand of in de MySQL die er al is.

- **Voordelen:**
  - Geen kosten per bericht.
  - Volledige controle.
  - Een programma dat altijd draait kan makkelijk water, groei en de oven uitrekenen.
  - Dezelfde code (`gedeeld.js` en de wereldbaas) draait er zonder veranderingen.
- **Nadelen:**
  - Onderhoud: updates, beveiliging, herstarten na een crash (met systemd of pm2) en back-ups.
  - Het draait naast het hotel en deelt dus geheugen en rekenkracht.
  - Eén plek en één machine: valt die uit, dan ligt alles stil.

### Advies

Begin met **A (Durable Objects)**. Voor een paar vrienden per wereld is het waarschijnlijk gratis, het past bij de scoreserver en er is geen server om bij te houden. Kies B als Ruben alles op zijn eigen server wil hebben, of als het spel later zo groot wordt dat de kosten van A gaan tellen. De code voor de spelregels (`gedeeld.js`) is in beide gevallen hetzelfde. Overstappen kost dus vooral werk aan de verbinding, niet aan het spel.

## 3. Wat er over de lijn gaat

De wereld zelf gaat **nooit** over de lijn: iedereen maakt hem zelf uit het zaadje. Er gaan alleen veranderingen heen en weer.

| Wanneer | Van | Bericht | Inhoud |
|---|---|---|---|
| Binnenkomen | speler → server | `hallo` | wereldcode (uitnodiging), spelersnaam, versie van het spel |
| | server → speler | `welkom` | zaadje, tijd van de dag, wie er is, jouw plek |
| Een stuk wereld laden | speler → server | `stuk` | cx, cz |
| | server → speler | `stuk` | alleen de veranderde blokken van dat stuk (zelfde vorm als nu in IndexedDB) |
| Iets doen | speler → server | `actie` | de actie met nummer en gevolg (zie boven) |
| | server → iedereen dichtbij | `actie` | de goedgekeurde gevolgen |
| | server → speler | `nee` | nummer van de actie en de echte blokken, om terug te zetten |
| Bewegen | speler → server | `plek` | x, y, z, kijkrichting, houding; 5 keer per seconde |
| | server → spelers in de buurt | `spelers` | de plekken van de anderen (binnen ongeveer 128 blokken) |
| De wereld zelf | server → spelers in de buurt | `blokken` | water, groei, ovens |
| Praten | beide kanten | `zeg` | zie hoofdstuk 5 |

- **Meteen zien, daarna bevestigen.** Wat je zelf doet, zie je meteen (zoals nu). De server bevestigt het, of zet het terug met `nee`. Zo voelt het spel net zo snel als alleen spelen.
- **Volgorde.** De server nummert alles wat hij doorstuurt. Iedereen voert het in die volgorde uit.
- **Hoeveel.** Een plek-bericht is ongeveer 40 bytes, een actie meestal minder dan 100 bytes. Met 4 spelers is dat een paar kilobyte per seconde: niets voor een telefoon.

## 4. Valsspelen tegengaan

De server is de baas: hij gelooft niets zomaar. Bij elke actie kijkt hij:

- **Bereik:** is het blok binnen ongeveer 6 blokken van waar de speler volgens de server staat?
- **Klopt het blok:** staat er echt dat blok? Je kunt geen lucht of bodemsteen breken, en niet bouwen in een andere speler.
- **Tijd:** hakken duurt minstens zo lang als `hakTijd` met dat gereedschap (met wat speling voor vertraging). En niet meer dan een paar blokken per seconde.
- **Heb je het wel:** de server houdt in een gedeelde wereld de rugzak van elke speler bij. Bouwen kan alleen met een blok dat je hebt. Maken (craften) kan alleen met een recept uit `REC` en de spullen die je hebt.
- **Kisten:** de inhoud staat op de server. Pakken en leggen kan alleen dichtbij.
- **Buit:** een oude kist vult de server zelf, vast per wereld en plek. Die kun je dus niet vervalsen. Elke kist gaat maar één keer open.
- **Bewegen:** niet sneller dan lopen, rennen, zwemmen of vallen kan. Niet door muren. Vliegen kan alleen in de bouwstand. Klopt het niet, dan zet de server je terug.
- **Berichten:** een grens per verbinding (aantal per seconde en grootte). Wie zich niet aan de regels houdt, wordt eruit gezet.
- **De eigenaar van een wereld** kan spelers eruit zetten en weren.

In de bouwstand is alles onbeperkt. Daar controleert de server alleen het bereik, het tempo en wie er mag bouwen.

## 5. Veilig chatten voor kinderen

- **Standaard geen vrije tekst.** Je kiest uit een vaste lijst korte zinnen en plaatjes, bijvoorbeeld:
  - "Hoi!", "Kom eens kijken!", "Help!", "Dank je!", "Goed gedaan!";
  - "Ik ga even eten", "Tot morgen!".

  Over de lijn gaat alleen het nummer van de zin. Iedereen ziet hem in zijn eigen taal (Nederlands of Engels).
- **Vrij typen alleen als de eigenaar van de wereld het aanzet** (standaard uit). Dan geldt:
  - een woordenlijst tegen scheldwoorden, net als bij de ideeënbox;
  - geen links, e-mailadressen of telefoonnummers;
  - hooguit 80 tekens per bericht en één bericht per 2 seconden.
- **Geen privéberichten.** Chat is alleen zichtbaar voor wie in dezelfde wereld is.
- **Melden, dempen en weren:** bij elke speler een knop om hem te dempen of te melden. De eigenaar kan iemand uit de wereld zetten.
- **Geen echte namen.** Een spelersnaam kies je uit woorden (zoals de koppelcode: "Rode Vlaai"), of hij gaat door hetzelfde filter. Er is geen e-mailadres of account nodig.
- **Werelden zijn privé.** Je komt alleen binnen met een uitnodigingscode van de eigenaar. Er zijn geen openbare servers waar vreemden binnenlopen.
- **Zo weinig mogelijk bewaren.** De server bewaart geen chatgeschiedenis, alleen meldingen (met het bericht erbij), en die maar kort, bijvoorbeeld een week. IP-adressen bewaart hij niet langer dan nodig is om te weren. Voor kinderen onder de 16 heb je in Nederland toestemming van een ouder nodig als je persoonsgegevens bewaart. Daarom bewaren we die zo veel mogelijk helemaal niet.

## 6. Kosten (een schatting: kijk voor het bouwen naar de actuele prijzen)

### A. Cloudflare Durable Objects

Kijk op developers.cloudflare.com/durable-objects/platform/pricing/ voor de actuele prijzen. Volgens die pagina (stand 2025):

- **Gratis abonnement:** Durable Objects met SQLite-opslag zitten erin, met een grens per dag. Dat was ongeveer 100.000 verzoeken en 13.000 GB-seconden per dag.
- **Betaald abonnement:** $5 per maand, met 1 miljoen verzoeken en 400.000 GB-seconden per maand inbegrepen. Daarboven betaal je per miljoen.
- **WebSocket-berichten:** met hibernation tellen 20 binnenkomende berichten als 1 verzoek.

Rekenvoorbeeld: één wereld, 4 spelers, 2 uur per dag, 5 plek-berichten per seconde per speler.

- Binnenkomende berichten: ongeveer 21 per seconde. Dat is 150.000 per dag, en dus ongeveer 7.600 verzoeken per dag.
- Rekentijd: de wereld is 2 uur actief. Dat is 7.200 s × 0,125 GB ≈ 900 GB-seconden per dag.
- Uitkomst: dat past ruim in het gratis abonnement, zelfs met ongeveer tien van zulke werelden tegelijk. Wordt het veel meer, dan is het betaalde abonnement van $5 per maand waarschijnlijk genoeg.

### B. Rubens VPS

Geen extra kosten: de VPS wordt al betaald. Het programma gebruikt ongeveer 50 tot 150 MB geheugen en weinig rekenkracht. Het kost wel tijd voor onderhoud.

## 7. Wat we als eerste bouwen

Elke stap is los te testen en levert iets op dat je kunt laten zien.

1. **Samen in een wereld.**
   - De eigenaar maakt een uitnodigingscode en vrienden komen binnen.
   - Je ziet elkaar lopen: een eigen, eenvoudig poppetje met een naamkaartje.
   - Nog geen veranderingen aan de wereld.
2. **Samen bouwen.**
   - De spelers sturen hun acties en de server controleert bereik en tempo.
   - De server bewaart per stuk de veranderde blokken en stuurt ze naar de anderen.
   - Stukken laden met de veranderingen van de server.
3. **Kisten, ovens en spullen op de grond** via de server. Losse spullen krijgen een nummer, zodat maar één speler ze kan oppakken.
4. **Snelle zinnen en plaatjes** om te praten.
5. **Eerlijk spelen.** De rugzak, het maken en het hakken worden volledig op de server gecontroleerd.
6. **De wereld op de server.** Water, groei, ovens en de tijd van de dag rekent de server uit voor iedereen.
7. **Eventueel** vrij typen voor vrienden, met filter, melden en dempen.

### Wat er in het spel nog moet veranderen

- **Losse spullen** op de grond krijgen een nummer van de server. Nu bestaan ze alleen op je eigen apparaat.
- **Andere spelers tekenen:** een eenvoudig poppetje in de eigen stijl. De arm bestaat al, de rest nog niet.
- **De tijd van de dag** komt dan van de server.
- **Opslag:** de server is de bron. IndexedDB blijft als snelle kopie op je apparaat.
- **Flauwvallen en de achtergelaten rugzak** worden door de server bijgehouden.
- **Het logboek, de kaart en de markeringen** blijven per speler op het eigen apparaat. Dat is prima, want ze veranderen de wereld niet.
