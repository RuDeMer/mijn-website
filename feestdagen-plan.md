# Plan: de feestdagen op Ruben's rommelhoekje (Sinterklaas, kerst, oud en nieuw)

Stand: woensdag 11 november 2026. **Goedgekeurd door Ruben** (zijn keuzes staan in hoofdstuk 9). Deel 1 is gebouwd.

## In het kort

- Eén **feestkalender** (`feestdagen.json`) voor de hele site, in Nederlandse tijd, aan te passen in de werkplaats.
- Eén **verzameling** (`rommelhoekje-feest-v1`) met alles wat je met de feestdagen krijgt. Die gaat mee met koppelen, en elk cadeautje krijg je per account maar één keer.
- Op de homepage komt een **feestbord** op de plek van het casinobord. Daar zie je de intocht, je schoen, pakjesavond, de kerstkalender en oud en nieuw.
- De spellen lezen de verzameling en zetten zelf vrij wat erin staat.
- Het komt in vier delen online: vóór 14 november, vóór 5 december, vóór 6 december en vóór 31 december.

---

## 1. Eerst: dingen op de homepage repareren (deel 1)

1. **Het uiltje** (tussen middernacht en vijf uur). Nu wordt hij op een vaste afstand van het logo neergezet. Daardoor zit hij op een computer midden op "ROMMELHOEKJE", en op een telefoon over de tekst van het briefje (nagekeken op 1600, 1280 en 390 breed).
   - **Nieuw**: hij zit rechtsboven óp de rommelkast, en de kast houdt daar 's nachts een plekje voor hem vrij. Zo bedekt hij nooit iets, op elk formaat.
   - In de natuurkunde is hij een klein vast blokje: een rommeltje dat je op de kast gooit, botst tegen hem op en komt er nooit overheen te liggen.
   - Zijn kunstje ("Oehoe! Jij bent ook laat op, hè?") blijft hetzelfde.
   - Het grapje staat in het gedeelde grapjesblok, dus dat verandert in alle pagina's tegelijk (met het script uit CLAUDE.md). Zonder rommelkast, wat niet kan gebeuren, zit hij in de voet naast het versienummer.
2. **Het casinobord** gaat weg van de homepage. Het casino blijft gewoon als tegel bij "Alle spellen" staan.
   - Op die plek komt het **feestbord**, alleen in de feestperiodes.
   - Buiten de feestdagen staat daar niets (zie keuze 4).
3. **De rommelkast** staat altijd liggend in het midden van de pagina, direct onder de reclamebalk, ook op een groot scherm (de linker kantlijn blijft leeg).
   - **Op een telefoon** wordt het één lange plank met alle 15 hebbedingetjes. Die schuif je met je vinger opzij, en aan de randen zie je dat er meer is. Ongeveer 130 punten hoog in plaats van 300.
   - Tikken doet het kunstje, opzij vegen schuift de plank, en omhoog slepen pakt een hebbedingetje op (zoals nu).
   - Met het toetsenbord schuift de plank vanzelf mee naar het ding dat de focus heeft.
   - Wat je nu op de kast hebt liggen, blijft liggen. Het rekent alleen anders hoe breed de kast is.

## 2. De feestkalender

`feestdagen.json` staat naast `banners.json`. Alle tijden zijn in **Nederlandse tijd**, en een dag begint om middernacht in Nederland. Iemand in een andere tijdzone ziet dus hetzelfde moment als iemand in Nederland.

| Wat | Van | Tot en met |
|---|---|---|
| **Intocht**: de stoomboot vaart binnen, met het intochtcadeautje | za 14 nov, 00:00 | za 14 nov |
| **Sinterklaas is in het land**: je schoen zetten, pepernoten, Pieten | za 14 nov | vr 4 dec |
| Een cadeautje uit je schoen halen | zo 15 nov | za 5 dec |
| **Pakjesavond**: uitpakken | za 5 dec, 17:00 | wo 6 jan (wat je dan nog niet uitpakte, gaat vanzelf open: je raakt niets kwijt) |
| Sinterklaas neemt afscheid | za 5 dec, na het uitpakken | (op zo 6 dec is hij weg) |
| **Kerstkalender** (19 deurtjes, 6 tot en met 24) | zo 6 dec | do 24 dec (elk deurtje alleen op zijn eigen dag; een gemist deurtje blijft dicht) |
| **Winterse versiering**: lichtjes, een beetje sneeuw, de kerstboom | zo 6 dec | wo 6 jan |
| **Het bijzondere kerstcadeau** (alleen met alle 19 deurtjes) | do 24 dec | wo 6 jan |
| **Kerstdagen**: een cadeau onder de boom en een kerstgroet | vr 25 dec | za 26 dec |
| **Oudjaar**: oliebollen | do 31 dec | do 31 dec |
| **Aftellen** | do 31 dec, 23:55 | vr 1 jan, 00:00 |
| **Vuurwerk** op de hele site | vr 1 jan, 00:00 | vr 1 jan, 00:20 (wie daarna nog die nacht komt, krijgt een klein vuurwerkje) |
| **De nieuwjaarsmunt 2027** (verzamelstuk, één keer) | do 31 dec, 23:00 | vr 1 jan, 03:00 |
| **Nieuwjaarsgroet** | vr 1 jan | wo 6 jan |
| Rommelkroon: Sinterklaastijd | 14 nov | 5 dec (zoals nu) |
| Rommelkroon: kersttijd | 6 dec | 6 jan (zoals nu) |
| Alles weer gewoon | do 7 jan | |

- **In de werkplaats**: een nieuw tabje **Site, 🎉 Feestdagen**.
  - Je ziet de kalender als lijstje, kunt elke datum en tijd aanpassen, en zet hem online met Zet online (alleen `feestdagen.json`, net als bij Reclame).
  - Met **Bekijk de site op…** kies je een datum en tijd. Dan zie je de homepage zoals die er dan uitziet (intocht, schoen, pakjesavond, kalender, aftellen, vuurwerk), in licht of donker en op telefoon- of computermaat.
  - Dat voorbeeld draait afgeschermd (zoals het voorbeeld van de homepage nu): het mag niets bewaren, dus het levert **nooit** echte cadeautjes op.
- **Voor elk spel** komt er in het gedeelde scorebord-blok een kleine functie: `Scorebord.feest()`. Die zegt welke feestdag het nu is (`sint`, `kerst`, `oud` of `nieuwjaar`, met de fase), en met `heb(id)` of je iets in je verzameling hebt. Een spel dat er niets mee doet, verandert niet.
- **De echte tijd**: cadeautjes krijg je alleen als de klok van je apparaat ongeveer klopt.
  - De site vraagt daarvoor de tijd aan GitHub, met een klein verzoekje naar de site zelf. Daarbij wordt niets verstuurd.
  - Wie zijn klok verzet, krijgt dus niets extra's: geen schoen van morgen, en geen nieuwjaarsmunt in juli.
  - Zonder internet kijk je wel rond, maar zet je je schoen pas bij je volgende bezoek mét internet.

## 3. De verzameling

- **Opslag** `rommelhoekje-feest-v1`, klein gehouden (ook na alle feestdagen ruim onder de 1 kB), in `SLEUTELS`, dus hij gaat mee met koppelen:
  - `s`: per jaar je schoen, één cijfer per dag (`sint26`: `'1101…'`, 21 dagen);
  - `o`: welke pakjes je uitpakte, op dezelfde manier;
  - `k`: welke deurtjes van de kerstkalender je opende (`kerst26`, 19 cijfers);
  - `st`: alles wat je kreeg, als lijstje namen (`'intocht26'`, `'vb-chocoletter'`, `'munt2027'`, …).
- **REGELS** (in het gedeelde blok én de scoreserver, letterlijk gelijk): `s`, `o` en `k` per plek de hoogste (de bestaande regel `cijfers`), `st` samen (`samenLijst`). Er is dus geen nieuwe soort regel nodig.
  - Een cadeautje heeft een vaste naam (een dag, een deurtje of een ding). Zet je op twee apparaten op dezelfde dag je schoen, dan blijft het één schoen, en dus één cadeautje.
  - Samenvoegen maakt nooit iets dubbel, en er gaat nooit iets verloren.
- **De spellen** lezen de verzameling en zetten zelf vrij wat erin staat, in hun eigen opslag en op hun eigen manier.
  - Bij spellen met geld of spullen die in de REGELS `geheel` zijn, zoals Rommelbeesten en de Vlaaienbakker, onthoudt het spel zelf dat het iets al gaf. Wint bij het koppelen de ene versie, dan staat het daar ook in. Zo krijg je ook met twee apparaten een kaart niet twee keer.
- **Mijn feestspullen**: onder het feestbord staat een knopje met wat je hebt, per feest. Bij elk ding staat in welk spel het zit, met een knop "Naar het spel".
- **Per apparaat, bewust niet in `SLEUTELS`**: `rommelhoekje-feest-apparaat` (versiering aan of uit, geluid) en `rommelhoekje-feest-kal` (de laatste kalender, zodat spellen het meteen weten).
- `privacy.html` krijgt een stukje hierover, en de tabel "Hoe lang" ook.

## 4. Hoe het eruitziet

Alle tekeningen, gedichtjes, deuntjes en animaties zijn eigen werk.

- **De Sint**: een rode mantel, een mijter en een staf, met een witte baard.
- **De Pieten** zijn **roetveegpieten**: een gewone huidskleur met een paar roetvegen van de schoorsteen op de wangen, een kleurig pak met een pofbroek en een baret met een veer.
- **De boot** heet **de Stoomboot** (besluit van Ruben): een eigen tekening, geen bestaande boot, geen namen of figuren uit tv-programma's.
- **Liedjes**: alleen oude liedjes die vrij zijn van rechten.

### De intocht (za 14 november)

```
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 |  🏠🏠  kade met vlaggetjes        ☁️      💨💨                   |
 |  👋👋 (mensen zwaaien)                 ___|▀|___  ⛵ STOOMBOOT  |
 |                                       \  Sint  Pieten  /  ← vaart|
 |  ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈ |
 |  "Welkom Sinterklaas!"   [ Nog een keer ]   [ Zet je schoen ]   |
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

- **De eerste keer dat je die dag komt**: de stoomboot komt over het water aanvaren, met rookwolkjes uit de schoorsteen. Hij legt aan bij de kade, de Pieten gooien de lijnen vast, en de Sint zwaait. Dan verschijnen het welkom en een regen van pepernoten.
- Tik je op de boot, dan toetert hij. **Geluid alleen na een aanraking.**
- **Het intochtcadeautje**: een verzamelstuk, het **Stoombootvlaggetje 2026**, met een gedichtje. Je pakt het meteen uit, want het is een welkomstcadeautje.
- Daarna verschijnt je schoen.
- Met de knop "Nog een keer" zie je de intocht opnieuw.
- Bij minder beweging ligt de boot er meteen, met een rustig "Welkom".

### Sinterklaas is in het land (14 november tot en met 4 december)

- **Op het feestbord**: de boot ligt aan de kade, een Piet zit op een dak naast de schoorsteen, je **schoen** staat bij de kachel, en ernaast groeit je **stapel ingepakte cadeautjes**. Erboven staat "Nog 12 nachtjes slapen tot pakjesavond".
- **Elke dag zet je met één tik je schoen** (met een wortel voor het paard).
  - Kom je de volgende dag (of later) terug, dan zit er een ingepakt cadeautje in. Met een tik gaat dat naar je stapel, en dan kun je de schoen opnieuw zetten.
  - Dag gemist? Dan is er voor die dag geen cadeautje, en dat haal je ook niet meer in (besluit van Ruben: je moet elke dag komen om alles te krijgen). Verder gebeurt er niets: geen straf, en wat je al in je schoen had, blijft van jou.
- **De pepernoten**: een paar pepernoten liggen tussen de rommeltjes, als echte rommeltjes die rollen en stuiteren. Ze zijn niet zichtbaar als de versiering uit staat.
- **De Sinterklaasbanner** is het feestbord zelf, op de plek van het casinobord.
- **Op de andere pagina's**: alleen een rustig slingertje vlaggetjes bovenaan (alleen op de pagina's met het papier van 0.6, nooit over een spel heen). De spellen doen zelf wat ze willen.

### Pakjesavond (za 5 december, vanaf 17:00)

- **Vóór 17:00**: "Vanavond is het pakjesavond! Om vijf uur mag je uitpakken." Je ziet de stapel al liggen.
- **Vanaf 17:00** opent de knop "Pak uit!" een groot venster. Daarin pak je je cadeautjes **een voor een** uit:
  - je tikt (of trekt) aan het lint, en het papier scheurt open en vliegt in snippers rond;
  - dan verschijnt wat erin zit, met een **eigen gedichtje** (met je scorebordnaam als je meedoet: "Sint zag {naam} elke dag…");
  - bij elk ding staat in welk spel je het vindt, met een knop "Naar het spel".
- Wie **alle 21 dagen** zijn schoen zette (zie keuze 2), houdt als laatste een groot, glimmend pakje over: **de Gouden Mijter**.
- **Daarna neemt de Sint afscheid**: de boot vaart weg, met "Dag Sinterklaasje! Tot volgend jaar".
- Wat je nog niet uitpakte, kun je tot en met 6 januari uitpakken.

### De kerstkalender (6 tot en met 24 december)

```
 ┌───────────────────────────────────────┐      *
 │ 6  │ 7  │ 8  │ 9  │ 10 │ 11 │ 12 │     │     /▲\     ← de kerstboom: elk deurtje
 │ 13 │ 14 │ 15 │ 16 │ 17 │ 18 │ 19 │     │    /o▲o\      hangt er een bal of slinger
 │ 20 │ 21 │ 22 │ 23 │ 24 │   (dicht)    │   /▲o▲o▲\     in; met het bijzondere cadeau
 └───────────────────────────────────────┘      ▐▌       een gouden piek
```

- **Elke dag gaat één deurtje open** (in de vorm van een cadeautje, een raampje of een ster), met iets voor een van de spellen erin.
  - Een deurtje gaat alleen op zijn eigen dag open. Een gemist deurtje blijft dicht (besluit van Ruben).
  - Deurtjes van morgen zitten nog dicht.
- **De kerstboom** naast de kalender wordt voller met elk deurtje dat je opent.
- **Op 24 december**, met **alle 19** deurtjes open: het bijzondere kerstcadeau. Er komt een gouden piek op je boom, en je krijgt iets bijzonders (zie de lijst).
- **25 en 26 december**: een cadeau onder de boom (voor iedereen die die dagen komt), met een warme kerstgroet.
- **Winterse versiering** op de homepage en de pagina's met het papier van 0.6:
  - een slinger lichtjes bovenaan, die zacht om de beurt branden;
  - een beetje sneeuw achter de inhoud (hooguit 40 vlokjes, op een klein doekje, stil als het tabblad niet in beeld is).
  - Bij minder beweging: geen vallende sneeuw, en de lichtjes branden gewoon.
  - **Uit te zetten** met een knopje op het feestbord ("Versiering uit"). Dat geldt dan voor de hele site, net als licht en donker. Op de andere pagina's tik je op de lichtjes om ze uit te zetten.
  - In de spellen zelf komt geen sneeuw over het speelveld.

### Oud en nieuw

- **31 december**: op het feestbord staat een **schaal oliebollen**. Tik erop en je neemt een hap, met een wolkje poedersuiker. Er komt ook een kleine oliebollenkraam.
- **Vanaf 23:55** telt het feestbord groot af: 4:59, 4:58, … Op de andere pagina's staat dan een klein, rustig klokje onderin dat niets bedekt.
- **Om 00:00 Nederlandse tijd**:
  - **vuurwerk over de hele site**: op de homepage en de pagina's met het papier achter de inhoud en over het feestbord, en in de spellen als een kleine melding met vuurwerkjes in een hoek;
  - "Gelukkig nieuwjaar! 2027", met een knal als je al iets had aangeraakt.
  - Bij minder beweging: geen vuurwerk, alleen "Gelukkig nieuwjaar 2027" met een paar stilstaande sterretjes.
- **De nieuwjaarsmunt 2027**: van 31 december 23:00 tot 1 januari 3:00 ligt er op het feestbord een gouden munt met **2027** erop. Pak hem, en hij is van jou.
  - Je krijgt hem echt maar één keer, en alleen in die nacht, met de echte tijd.
  - Daarna rolt hij als rommeltje over je homepage.
- **1 tot en met 6 januari**: een nieuwjaarsgroet op het feestbord.
- **7 januari**: alles weer gewoon. Wat je verzamelde, blijft.

## 5. Dingen voor de spellen (voorstel)

Wat er in welk pakje of deurtje zit, ligt vast per dag en is voor iedereen hetzelfde. Op pakjesavond merk je pas wat je kreeg.

**Sinterklaas**: 21 cadeautjes in de schoen, plus het intochtvlaggetje en de Gouden Mijter.

| Spel | Wat | Hoe |
|---|---|---|
| Vlaaienbakker | **Chocoladeletter-vlaai** (vorm: een R), korst **Speculaas**, decor **Schoorsteen op pakjesavond** | nieuwe dingen achteraan in de Gildewinkel (voor het oog), met "Van de Sint" in plaats van een prijs; komt in `mooi.heb` |
| Rommelbeesten | drie **feestkaarten**: Pepernotenuil, Speculaasvos, Marsepeinen Varkentje | een kleine **Feestset** (`fs001` en verder), alleen via de feestdagen te krijgen; telt niet voor het scorebord |
| Casino Rommelroyaal | **Pepernootfiches**, tafelkleed **Pakjesavond** | achteraan in het kluisje (`KAST`) |
| Rommelpoker | kaartrug **Pakjespapier** | een nieuwe keuze bij de instellingen (`inst.rug`) |
| Coulissenkoor | **Zie ginds komt de stoomboot**, **Sinterklaasje, kom maar binnen**, **Hoor de wind waait door de bomen** | achteraan in `LIEDJES`; alle drie oud en vrij van rechten |
| Ruben de Duiker | toetje **Pepernotentaartje**, decorstuk **Chocoladeletters op de bar** | een recept en een cadeau in `VONDSTEN` |
| Rommelkroon | de **mijter**, de **pepernoot** en de **pepernotenregen** voor altijd van jou | bestaat al in de kast; de verzameling telt nu ook mee |
| Rommelsteek | patronen **Stoomboot** en **Mijter** | een nieuwe groep "Feest", achteraan |
| Homepage | rommeltjes **chocoladeletter** en **marsepeinen worteltje** | echte rommeltjes op je plankje |
| **Gouden Mijter** (elke dag) | een **gouden mijter** als rommeltje op je homepage, en een **gouden kroontje** in Rommelkroon | |

**Kerst**: 19 deurtjes, plus het bijzondere cadeau en het cadeau onder de boom.

| Spel | Wat |
|---|---|
| Vlaaienbakker | **kerstschort**, decor **Kerstmarkt**, korst **Sneeuw** |
| Rommelbeesten | feestkaarten **Kerstbalbeest** en **Sneeuwvlokkat** |
| Casino | **kerstfiches**, en **kerstmutsen** voor Moeki en Floortje bij de deur |
| Rommelpoker | kaartrug **Sneeuwvlokken** |
| Coulissenkoor | **Stille nacht**, **Komt allen tezamen**, **Hoor de engelen zingen** (alle drie oud en vrij van rechten) |
| Ruben de Duiker | hoofdgerecht **Kerstdiner** (gevulde kreeft met spruitjes), en een **kerstboompje** voor in het restaurant |
| Huis op stelten | een **kerstboom** om te laten wiebelen in de woonkamer: alleen bij vrij spelen, niet in de uitdaging van de dag (zodat het scorebord eerlijk blijft) |
| Rommelkroon | de **kerstbal** en het **sneeuwvlokje** voor altijd van jou |
| Rommelsteek | patronen **Kerstster** en **Sneeuwpop** |
| Homepage | rommeltje **kerstbal** |
| **Bijzonder** (24 dec) | een **gouden piek** voor je boom, en een **holo-feestkaart Sterrenrendier** in Rommelbeesten |
| **Onder de boom** (25/26 dec) | een **sneeuwbol** als rommeltje: schud je telefoon of tik hem aan, en het sneeuwt erin |

**Oud en nieuw**

| Spel | Wat |
|---|---|
| Ruben de Duiker | toetje **Oliebollen** (voor wie op 31 december komt) |
| Vlaaienbakker | op 31 december een **oliebollenbakker**: de gouden vlaaien worden oliebollen, voor iedereen en zonder dat er iets aan de balans verandert. Wie die dag komt, krijgt het decor **Oliebollenkraam** voor altijd. |
| Rommelland | op oudjaarsavond **vuurwerk** boven je park, en om middernacht een gratis vuurwerkshow (alleen om te kijken) |
| Rommelarend | op oudjaarsavond en die nacht **vuurwerk** boven de stad |
| Casino | **vuurwerkfiches** (bij de nieuwjaarsmunt) |
| Homepage | de **nieuwjaarsmunt 2027** als rommeltje dat rolt |

**Rommelblok** doet niet mee (besluit van Ruben, keuze 6).

**De opslag van de spellen**: bijna alles komt in velden die er al zijn (`mooi.heb`, `kast`, `inst`, `recepten`, `bezit`). De REGELS van de spellen hoeven dus niet te veranderen; alleen de verzameling krijgt een nieuwe regel. Verandert er bij het bouwen toch iets aan de opslag van een spel, dan krijgt dat een regel in de REGELS en zet ik het in de overdracht.

## 6. Hoe ik het bouw

- **`feestdagen.json`**: de kalender (aan te passen in de werkplaats).
- **`feest.js`**: op elke pagina, geladen door het scorebord-blok en door het 0.6-blok onderaan. Daarin:
  - de klok in Nederlandse tijd en de echte tijd;
  - de verzameling;
  - de versiering (sneeuw, lichtjes, vlaggetjes, het aftellen en het vuurwerk);
  - het voorbeeld voor de werkplaats.
- **`feest-home.js`**: alleen op de homepage. Daarin het feestbord met alle tekeningen: de intocht, de schoen, pakjesavond, de kalender met de boom, en oud en nieuw. Zo hoeven de andere pagina's de grote tekeningen niet te laden.
- **De gedeelde blokken** (met het script uit CLAUDE.md, overal tegelijk, ook in `homepage-onderdelen.js`):
  - het **scorebord-blok** krijgt `'rommelhoekje-feest-v1'` in `SLEUTELS`, de regel in de REGELS, `Scorebord.feest()`, het laden van `feest.js`, en `BV = 15`;
  - het **0.6-blok onderaan** laadt `feest.js` (één keer);
  - het **grapjesblok** krijgt de nieuwe plek van het uiltje.
- **`homepage-onderdelen.js`**: het casinobord eruit, de plek voor het feestbord erin, de kast altijd liggend (en op een telefoon één rij), het plekje voor het uiltje, en de pepernoten en feestrommeltjes.
  - `index.html` hoeft niet te veranderen. Moet het toch, dan heel voorzichtig, en ik tel vóór en na het aantal `class="label-kaart"`.
- **Het veiligheidsbeleid** hoeft niet te veranderen: alles komt van de site zelf (`'self'`). Er komen geen scripts van buiten bij.
- **De scoreserver**: alleen de nieuwe regel in de REGELS, `BLOK_NU = 15`, en `/status` zegt `feest: 1`. Ik maak hem op de versie die nu in Cloudflare draait (2026-11-12), en lever hem als volledig bestand aan Ruben.
  - **Lukt dat niet vóór zaterdag**, dan gaat deel 1 online zónder de verzameling in `SLEUTELS`: de schoen werkt dan per apparaat. Zodra de scoreserver klaar is, komt hij erbij, en dan voegt het koppelen alles van beide apparaten samen. Er gaat niets verloren.
- **Werkplaats**: het tabje Feestdagen, `SPELINFO` voor de verzameling (dan kun je iemand helpen of een gemist pakje geven, altijd met een bericht), en de controle van Gezondheid kent `feest.js`.
- **Zuinig**:
  - het feestbord tekent alleen als het in beeld is, en hooguit 60 beelden per seconde;
  - de sneeuw tekent op een klein doekje van lage resolutie;
  - niets beweegt in een verborgen tabblad;
  - alleen `transform` en `opacity`.

## 7. Wanneer wat online komt

Elk deel komt via een pull request. Zodra Ruben die samenvoegt, staat het live.

| Deel | Klaar vóór | Wat |
|---|---|---|
| 1 | **vrijdag 13 november** (de intocht is zaterdag) | de drie reparaties, de feestkalender met het tabje in de werkplaats, de verzameling, `Scorebord.feest()`, de intocht met het intochtcadeautje, de schoen met de stapel, de pepernoten en de Pieten |
| 2 | 5 december | pakjesavond (uitpakken, gedichtjes, afscheid), en alle Sinterklaasdingen in de spellen |
| 3 | 6 december | de kerstkalender, de boom, de winterse versiering, 25 en 26 december, en alle kerstdingen in de spellen; Rommelkroon leest de kalender (wat spelers al verdienden, blijft) |
| 4 | 31 december | oliebollen, aftellen, vuurwerk, de nieuwjaarsmunt, de nieuwjaarsgroet, en de dingen voor oud en nieuw in de spellen |

## 8. Testen (per deel)

**Met code:**
- de kalender op **elke dag van 13 november tot 7 januari**, ook rond middernacht in Nederland (23:59:59 en 00:00:00), en vanuit New York, Tokio en Auckland (een dag begint altijd om middernacht in Nederland);
- de schoen en het uitpakken, met dagen gemist;
- **elk cadeautje maar één keer per account**, ook met twee en drie apparaten, in elke volgorde, met de echte REGELS;
- de nieuwjaarsmunt alleen in die nacht, en niet met een verzette klok;
- het voorbeeld in de werkplaats levert nooit iets op.

**In een echte browser (Chromium):**
- telefoon (360 en 390 breed) en computer (1280 en 1600), licht en donker;
- 's nachts met het uiltje, met minder beweging, en met de versiering uit;
- alle pagina's zonder fouten of overtredingen van het veiligheidsbeleid, en de gedeelde blokken overal gelijk.

Niet te testen: Safari op een echte iPhone.

## 9. Keuzes van Ruben (11 november 2026)

Ruben zei: "Doe maar wat jij aanraadt, behalve dat je cadeaus die je miste nog steeds kunt krijgen. Je MOET iedere dag komen om alles te krijgen. Laat Rommelblok maar achterwege." Daarna: de boot heet de Stoomboot, en de tekeningen van de intocht en de schoen moesten mooier (gedaan).

1. **De lijst met dingen per spel**: (A) zoals voorgesteld.
2. **De Gouden Mijter**: (A) alleen als je alle 21 dagen je schoen zette.
3. **Het bijzondere kerstcadeau**: alleen met alle 19 deurtjes, en een deurtje gaat alleen op zijn eigen dag open. Gemiste cadeautjes en deurtjes haal je niet in.
4. **Buiten de feestdagen**, op de plek van het casinobord: (A) niets.
5. **De schoen**: (A) zetten met een tik.
6. **Rommelblok**: (B) overslaan.

De scoreserver: Ruben plakte versie 2026-11-12; daarop is versie 2026-11-13 gemaakt (zie de overdracht van deel 1).
