# Plan: nep-reclame voor de spellen (7 november 2026, versie 2)

> **Gebouwd op 7 november 2026**, met de antwoorden van Ruben (de teksten zijn goed; ook een hoge advertentie; de plekken op de homepage en het rouleren ja; de lijst na een spel ja; Rommelhotel Online ja; geen klikken tellen; en nieuwe spellen moeten de eerste 7 dagen vaker langskomen). Hoe het nu precies werkt staat in CLAUDE.md, bij **Nep-reclame voor de spellen**. Op een paar punten wijkt het af van dit plan: de keuze is een **gewogen loting** (nieuw 4 keer, uitgelicht 6 keer zo vaak) in plaats van een vaste volgorde, er is een **hoge advertentie** (160 × 600) naast de homepage, de advertenties wisselen tot 30 keer per bezoek, en klikken worden niet geteld.

Het rommelhoekje krijgt reclame, net als een echte website: een advertentiebalk zoals bovenaan een nieuwssite, een advertentieblok op je telefoon, en "Dit vind je misschien ook leuk" met gesponsorde links. Alleen is elke advertentie nep: hij gaat altijd over een van jouw eigen spellen. Dit is het plan; er is nog niets aan de site veranderd. Zeg wat je ervan vindt, en vooral welke teksten je niet grappig vindt. Die verbeter ik dan eerst.

De schetsen heb ik meegestuurd: de advertenties in de echte pagina's (homepage op een computer en een telefoon, het eindscherm van Rob, het scorebord en de 404-pagina), alle 28 als balk en als blok, en een voorbeeldbestand waarin ze bewegen.

## 1. Zo zien de advertenties eruit

Bewust **niet** in de stijl van de site, maar zoals echte reclame: eigen felle kleuren en een kleurverloop, een vette reclameletter, een grote knop, en het woordje **ADVERTENTIE** erboven, zoals op een nieuwssite. Er zijn drie vormen, in de maten die echte advertenties ook hebben:

- **De balk (728 × 90)**, voor de homepage en het scorebord op een computer. Links het plaatje van het spel, in het midden de grap in reclameletters met daaronder de naam en wat het spel is, rechts de knop (zoals **BEGIN MET BAKKEN ›**). In de hoek een ster met **GRATIS!** of **NIEUW!**, en klein **rubensrommelhoekje.nl**.
- **Het blok (300 × 250)**, voor een telefoon en de eindschermen van spellen. Bovenin het plaatje, daaronder de grap en de naam, onderaan een brede knop.
- **De lijst: "Dit vind je misschien ook leuk"**, met vier (op een telefoon twee) kaartjes met een plaatje en een klikaas-titel, en klein "Gesponsorde links". Zoals onder een nieuwsartikel. Voor de 404-pagina.

Verder:

- **Per spel een eigen advertentie**: eigen reclamekleuren en een eigen knoptekst. Het plaatje is het toneeltje van het spel, met een kleine animatie (de vlaai draait, Floortje tikt een glas van tafel, er vliegt een arend door de balk). Zoals bij echte reclame glimt de knop af en toe en pulseert de ster. Na 30 seconden staat alles stil. Beweegt je muis erover, dan beweegt hij weer. Staat **minder beweging** aan, dan beweegt er niets.
- **Rechtsboven ⓘ en ✕**, zoals bij echte advertenties, maar groot genoeg om op te tikken.
  - **ⓘ** opent een uitleg: *"Waarom zie ik deze advertentie? Dit is geen echte reclame. Het is een spel van Ruben, en hij vindt dat je het eens moet proberen. Er wordt niets over je bijgehouden: alleen dit apparaat onthoudt welke advertenties je al zag."*
  - **✕** verbergt die advertentie twee weken, en er komt meteen een andere voor in de plaats.
- **Eerlijk, ook al is het nep**: geen nep-downloadknoppen, geen nepmeldingen ("je computer heeft een virus"), geen nep-prijzen ("je hebt gewonnen!"), geen sluitknop die niet sluit, geen aftelklok, en geen echte merken of logo's van echte advertentiebedrijven. Het grapje zit in de teksten (klikaas zoals *"Wat er daarna gebeurt, is ongelooflijk"*, "aanbiedingen" zoals *"Last minute! Kamer 12 nog vrij. Prijs: € 0,00."*). De hele advertentie is één link naar het spel, en een schermlezer zegt *"Advertentie voor Huis op stelten. …"*.
- **De ruimte is vooraf vrijgehouden**: de vormen hebben een vaste maat (balk 90 px, blok 250 px, plus het woordje erboven), dus de pagina verspringt niet als de advertentie verschijnt.
- **Licht en donker**: de advertentie zelf houdt zijn eigen kleuren (zoals echte reclame). Het woordje ADVERTENTIE en de lijst "Dit vind je misschien ook leuk" volgen licht en donker.

## 2. Waar ze komen

| Plek | Waar precies | Vorm |
|---|---|---|
| **Homepage** | tussen *Puzzels van vandaag* en *Alle spellen* | balk op een computer, blok op een telefoon. Wisselt rustig: elke 20 seconden een andere, hooguit 5 keer. Niet als je muis erop staat, je hem met het toetsenbord koos, of hij niet in beeld is. Met minder beweging wisselt hij niet. |
| **Scorebord** | onder *Doe mee* en de Bakwedstrijd van de week, boven het zoekveld | balk (telefoon: blok) |
| **404-pagina** | onder de deur van Kamer 404 | de lijst "Dit vind je misschien ook leuk" |
| **In de spellen** | alleen op het eindscherm, nooit tijdens het spelen en nooit als nieuw venster | blok |

**In de spellen** (het spel roept zelf `Scorebord.banner(...)` aan; een spel dat dat niet doet, verandert niet):

- **Rommelwoord, Cryptisch, Letterval, Klinkermijnen**: in de uitslag, onder het strookje *Woordspellen van vandaag*. Daar nooit reclame voor een ander woordspel (dat doet het strookje al).
- **Rommelgroepjes**: in de uitslag. **Op Gevoel**: in de uitslag van de dagronde.
- **Rommelkroon**: in het venster na de puzzel van de dag (alleen daar, het venster is krap).
- **JAJA PRODUCTIEFIETS!, Rob 👍, Huis op stelten**: op het eindscherm na een potje.
- **Rommelbel, Rommelritme, Rommelwheels, Zoals in de reclame**: na een gehaald level, maar hooguit eens per 10 minuten (anders zie je hem na elk level).
- **Rommelpoker**: als je rommelmarkt voorbij is (gewonnen of verloren).
- **Casino Rommelroyaal**: na de hand van de dag. **Ruben de Duiker**: in de uitslag na de avond. **Rommelarend**: na een wedstrijd.
- **Bewust niet**: Vouwvlieger (het eindscherm is vol), Rommelsteek en Rommelrecht (die zijn juist rustig), en de spellen zonder eindscherm (Vlaaienbakker, Rommelbeesten, Mengelmoes, Rommelhotel, Rommelland, Rommelblok).
- **Nooit** een advertentie voor het spel waar je in zit.

## 3. Slim kiezen (alleen op je eigen apparaat)

De pagina kiest met wat er al op het apparaat staat. Er gaat niets naar een server om iemand te volgen.

1. **Uitgelicht**: een spel dat jij in de werkplaats uitlicht (met een begin- en einddatum) komt het vaakst. Op de ster staat dan **TOP!**.
2. **Nieuw**: spellen die korter dan drie weken online staan, als je ze nog niet speelde. Op de ster staat **NIEUW!**.
3. **Nog nooit gespeeld**: spellen waarvan nog geen opslag op het apparaat staat.
4. **De puzzel van vandaag wacht nog**: Rommelwoord, Cryptisch, Letterval, Klinkermijnen, Rommelgroepjes, Op Gevoel, Rommelkroon, de hand van de dag in het casino, de reclame van de dag en de uitdaging van Huis op stelten. Alleen als je dat spel al eens speelde; dan komt er vaak een tekst als "Je Rommelkroon van vandaag ligt nog op je te wachten".
5. **Een willekeurig ander spel.**

Een klein voorstel daarbij: een nieuw spel dat je **al speelt**, zakt naar achteren (na "nog nooit gespeeld").

**Afwisselen**: wat je net zag, zakt flink naar achteren, en een beetje toeval doet de rest. Ook de teksten wisselen: de laatste 16 teksten die je zag komen niet meteen terug. Teksten die bij het moment passen ('s avonds, in het weekend, de puzzel wacht) gaan voor als ze passen.

**Wat er bewaard wordt**: alleen op het apparaat, in `rommelbanner-v1`: welke advertenties en teksten je laatst zag, welke je wegklikte en tot wanneer. Bewust niet in `SLEUTELS` (gaat niet mee met koppelen). Ik zet het in de privacyverklaring.

## 4. Beheer in de werkplaats: Site, 📣 Reclame

- **Een eigen bestand**: `banners.json` op de site, met per spel de naam, de zinnen, de knoptekst, het icoon, sinds wanneer het online staat, of de advertentie aan staat, en de teksten. Alle pagina's lezen het (zelfde site, het veiligheidsbeleid verandert niet).
- **Uitlichten**: kies een spel, een begin- en een einddatum.
- **Per spel**: advertentie aan of uit; naam, zin, korte zin en knoptekst; *online sinds* (daarmee rekent hij drie weken Nieuw); de teksten: aanpassen, toevoegen, uitzetten of weghalen, met per tekst een moment (altijd, 's ochtends, 's middags, 's avonds, 's nachts, weekend, doordeweeks, puzzel wacht, nog nooit gespeeld, al gespeeld). Bij elke tekst een teller (hooguit 72 tekens).
- **Voorbeeld**: zie de advertentie meteen als balk, blok en in de lijst, op een lichte en een donkere pagina, met de tekst die je aan het bewerken bent.
- **Zet online** zet `banners.json` online, net als het Homepage-paneel.
- **Een nieuw spel**: zet je een spel op de homepage (bij het uploaden of met *Zet op de homepage*), dan krijgt het in dezelfde stap vanzelf een advertentie met de titel en het onderschrift, gemarkeerd als nieuw, met de knop **Speel gratis** en het icoon als plaatje. Daarna kun je er grappige teksten bij zetten.

## 5. Klikken tellen (optioneel)

Wil je zien welke advertenties werken, dan kan de scoreserver per dag tellen hoe vaak er op de advertentie van een spel geklikt wordt, alleen als getal (de bestaande `dagteller`, zonder wie het was). In de werkplaats zie je dan per spel de klikken van de laatste 7 en 30 dagen. Dat vraagt een kleine aanpassing van de scoreserver (een nieuwe route `/banner/klik`, met een grens per adres tegen onzin). **Als je dit wilt, plak dan de code die nu in Cloudflare draait (versie 2026-11-06)**; dan lever ik het hele bestand aan en zet ik het in de privacyverklaring. Zonder dat werkt alles gewoon, alleen zonder tellen.

## 6. Wat er technisch verandert

- **Nieuw**: `banners.js` (het kiezen, de drie vormen en de plaatjes en animaties van alle 28 spellen, ongeveer 190 kB, ingepakt over het internet zo'n 33 kB, alleen geladen als er een advertentie komt) en `banners.json` (de teksten).
- **Het gedeelde scorebord-script**: één kleine functie `Scorebord.banner(plek, opties)` die `banners.js` laadt (ongeveer 15 regels). Met het script uit CLAUDE.md in alle 24 pagina's tegelijk, ook in `homepage-onderdelen.js` en de kopie in de werkplaats.
- **`homepage-onderdelen.js`**: de plek op de homepage (home_v6), en de rommeltjes kunnen op de advertentie liggen. `index.html` blijft zoals hij is.
- **`scorebord.html` en `404.html`**: een plek voor de advertentie.
- **18 spellen**: een plekje in het eindscherm en één regel die `Scorebord.banner` aanroept.
- **`werkplaats.html`**: het tabje Reclame, en een nieuw spel krijgt vanzelf een advertentie.
- **`privacy.html`** en **CLAUDE.md**: bijgewerkt.
- Het veiligheidsbeleid verandert niet, en er komen geen scripts van buiten bij.

## 7. Testen

- **Met code**: de keuze (nieuw eerst, nooit het spel waar je zit, afwisselen, het kruisje, uitgelicht met datums, de puzzel die wacht, de momenten), en een nieuw spel dat vanzelf een advertentie krijgt.
- **In een echte browser**: telefoon en computer, licht en donker, met het toetsenbord en met minder beweging, zonder fouten of overtredingen van het veiligheidsbeleid, en zonder dat de pagina verspringt.

## 8. Vragen aan jou

1. **De teksten hieronder**: welke vind je niet grappig? Wil je er zelf nog bij?
2. **De vormen**: balk, blok en de lijst "Dit vind je misschien ook leuk". Goed zo, of wil je er nog een (bijvoorbeeld een hoge advertentie in de kantlijn op een groot scherm, waar nu de rommeltjes liggen)?
3. **De homepage**: is de plek tussen *Puzzels van vandaag* en *Alle spellen* goed, en mag hij daar rustig wisselen?
4. **De eindschermen**: is de lijst in hoofdstuk 2 goed? (Rommelsteek en Rommelrecht heb ik bewust rustig gelaten.)
5. **Rommelhotel Online** ook een advertentie geven? Hij is er nu bij, maar kan uit.
6. **Klikken tellen**: ja (plak dan de code van de scoreserver) of nee?

## 9. Alle teksten

Per spel minstens vier teksten die afwisselen, in reclametaal. Jouw voorbeeldzinnen staan erin, als slogan. Een tekst met een moment erachter komt alleen op dat moment; die gaan dan wel voor.

### Casino Rommelroyaal

*Wat het is (balk):* Een casino met alleen speelfiches: blackjack, roulette, kien en meer. Nooit echt geld.  
*Korte zin (blok):* Een casino met alleen speelfiches  
*Knop:* **GA NAAR BINNEN ›**  
*Plaatje:* een roulettewiel draait, het balletje rolt mee en de lampjes knipperen  
*Ster NIEUW!:* tot en met 24 november

1. Nieuw casino geopend! Toegang gratis, echt geld nooit.
2. Nep-fiches, echte spanning.
3. Deze uil wint altijd met blackjack. Zijn geheim? Rekenen.
4. Het huis wint altijd. Maar het huis is van Moeki.
5. Vanavond open tot laat. Dresscode: pyjama. *('s avonds)*
6. De hand van de dag ligt klaar. De uil kijkt al mee. *(als die van vandaag nog op je wacht)*

### Rommelbeesten

*Wat het is (balk):* Open pakjes en verzamel meer dan 300 Rommelbeesten, van gewoon tot geheim.  
*Korte zin (blok):* Pakjes openen en beesten verzamelen  
*Knop:* **OPEN EEN PAKJE ›**  
*Plaatje:* een pakje wiebelt, scheurt open en er komt een glimmende kaart uit  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Eén pakje nog. Zei iedereen, ooit.
2. WOW! Verzamelaar vindt geheime kaart in zijn eerste pakje.
3. 1 op de 400 pakjes is een wonderpakje. Is het jouw beurt?
4. Gratis pakje! Elke 4 uur. Ja, echt elke 4 uur.
5. Je gratis pakje ligt klaar. Niet laten liggen, dat vinden ze zielig. *(als je het spel al eens speelde)*

### Rommelhotel

*Wat het is (balk):* Een pixelhotel vol mysteries: loop rond, praat met de gasten en los de puzzels op.  
*Korte zin (blok):* Een pixelhotel vol mysteries  
*Knop:* **CHECK IN ›**  
*Plaatje:* de ramen gaan één voor één aan en de vlag op het dak wappert  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Last minute! Kamer 12 nog vrij. Prijs: € 0,00.
2. Gasten geven dit hotel 5 sterren. De tijdmachine in de kelder: 6.
3. Wie heeft de vlaai opgegeten? Dit hotel weet het. Jij nog niet.
4. Ook de lift heeft geheimen. Vraag maar aan Mien.
5. Laat nog een bed nodig? Ontbijt niet inbegrepen, raadsels wel. *('s avonds)*

### Rommelhotel Online

*Wat het is (balk):* Het Rommelhotel, live met je vrienden: maak een poppetje, richt je kamer in en klets.  
*Korte zin (blok):* Het Rommelhotel, live met vrienden  
*Knop:* **KOM BINNEN ›**  
*Plaatje:* het hotel, met praatwolkjes die opploppen ("Hoi!", een hartje, "Haha")  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Hetzelfde hotel, maar nu met echte buren.
2. Nieuw: kletsen in de lobby. Pantoffels toegestaan.
3. Richt je kamer gratis in! Opruimen hoeft niet.
4. Soms loopt de eigenaar zelf rond. Doe maar gewoon.
5. Avond in het hotel: de lobby zit vol, op de bank is nog plek. *('s avonds)*

### Rommelblok

*Wat het is (balk):* Een eindeloze wereld van blokken: graven, bouwen, ruilen en samen spelen.  
*Korte zin (blok):* Bouw je eigen blokkenwereld  
*Knop:* **BEGIN MET BOUWEN ›**  
*Plaatje:* er valt een blok op de stapel, en een houweel hakt erin  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Bouw je droomhuis. Zonder vergunning.
2. Gemeente boos: man graaft tunnel onder zijn eigen huis.
3. Bouwgrond gratis! Onbeperkt beschikbaar. Op = niet op.
4. Een karretje, een spoor en geen remmen. Wat kan er misgaan?
5. Het wordt donker. Bouw snel een huisje, de spookjes komen eraan. *('s avonds)*

### Rommelland

*Wat het is (balk):* Bouw je eigen pretpark in 3D, met attracties, kraampjes en bezoekers met een mening.  
*Korte zin (blok):* Bouw je eigen 3D-pretpark  
*Knop:* **OPEN JE PARK ›**  
*Plaatje:* het reuzenrad draait, en de bakjes blijven recht hangen  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Word pretparkdirecteur! Geen diploma nodig.
2. Bezoeker klaagt: 'De patat is te duur.' Directeur doet iets geks.
3. Bouw een achtbaan. Vergeet de wc's niet.
4. Te lange wachtrij? Dat ligt aan de directeur. Dat ben jij.
5. Vanavond vuurwerk! Boven je eigen park. *('s avonds)*

### Vlaaienbakker

*Wat het is (balk):* Klik vlaaien, neem bakkers in dienst en bouw een Limburgs vlaaienrijk.  
*Korte zin (blok):* Bak een Limburgs vlaaienrijk  
*Knop:* **BEGIN MET BAKKEN ›**  
*Plaatje:* een kersenvlaai met toefjes slagroom draait rond op een bord, met +1'tjes  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Wie wat bewaart, die bakt wat.
2. Limburgse oma bakt een quadriljoen vlaaien per seconde. Bakkers woedend!
3. Verdien miljoenen vanuit huis! (Vlaaien. Het zijn vlaaien.)
4. Nieuw: de oerknalvlaai. Op = op.
5. Je bakkers bakten door terwijl jij weg was. Kom eens kijken. *(als je het spel al eens speelde)*
6. Goedemorgen! De oven staat al aan. *('s ochtends)*

### Ruben de Duiker

*Wat het is (balk):* Duik overdag in de Noordzee en kook 's avonds je vangst in je eigen restaurant.  
*Korte zin (blok):* Overdag duiken, 's avonds koken  
*Knop:* **DUIK ERIN ›**  
*Plaatje:* de duiker dobbert met belletjes, het wier wiegt en er zwemt een visje voorbij  
*Ster NIEUW!:* tot en met 15 november

1. Chef vangt zijn eigen vis. Met een harpoen. Gasten in shock.
2. Restaurant zoekt duiker. Ervaring niet nodig, zwemmen wel.
3. Koning Kreeft gespot voor de kust van Schelpkerke!
4. Vers uit zee, recht in de pan. Sneller kan niet.
5. Vanavond open! De gasten zitten al. De vis zwemt nog. *('s avonds)*

### Rommelpoker

*Wat het is (balk):* Speel pokerhanden, verzamel rare snuisterijen en versla de kraampjes op de rommelmarkt.  
*Korte zin (blok):* Poker op de rommelmarkt  
*Knop:* **SPEEL EEN POTJE ›**  
*Plaatje:* vijf kaarten waaieren open tot een full house, met een rubberen eendje ernaast  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Sokken zonder paar. Toch een paar. Dat is poker.
2. Rubberen eendje blijkt fortuin waard. Experts stomverbaasd.
3. Rommelmarkt! 24 kraampjes, 25 bazen, 0 afdingen.
4. Afdingen kan niet. Een tuinkabouter kopen wel.
5. Zaterdag rommelmarktdag. Neem je kaarten mee. *(in het weekend)*

### Rommelwoord

*Wat het is (balk):* Raad elke dag nieuwe woorden van vier tot acht letters, in zes pogingen.  
*Korte zin (blok):* Raad elke dag nieuwe woorden  
*Knop:* **RAAD HET WOORD ›**  
*Plaatje:* de letters van RADEN draaien één voor één om en worden groen  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Vijf letters, zes kansen, nul excuses.
2. Taalexpert raadt het woord in één keer. Lukt het jou ook?
3. Elke dag een gratis woord! Op = op. (Morgen weer.)
4. Nieuw: nu ook met vier, zes, zeven en acht letters!
5. Je woord van vandaag wacht nog. Het telt de minuten. *(als die van vandaag nog op je wacht)*

### Vouwvlieger

*Wat het is (balk):* Vlieg met een papieren vliegtuigje door een neonstad, langs kranen en schoorstenen.  
*Korte zin (blok):* Vlieg met een papieren vliegtuigje  
*Knop:* **VLIEG MEE ›**  
*Plaatje:* een papieren vliegtuigje zweeft door de banner, met een neonstad 's nachts  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Vliegen zonder vliegtuig? Met dit ene A4'tje kan het.
2. Goedkope vluchten! Heen: één tik. Terug: kreuk.
3. Eén tik en je zweeft. Eén tik te veel en je kreukt.
4. Nieuw: vliegtuigje van bladgoud. Kreukt net zo hard, maar wel chic.

### Rommelritme

*Wat het is (balk):* Spring op de maat van de muziek over spijkers, door tunnels en langs springringen.  
*Korte zin (blok):* Spring op de maat van de muziek  
*Knop:* **SPRING MEE ›**  
*Plaatje:* een blokje springt op de maat over spijkers, met muzieknootjes  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Je hoeft niet te kunnen dansen. Wel te kunnen springen.
2. Speler doet 100 pogingen over één level. Poging 101: ongelooflijk.
3. Gratis concert! Inclusief spijkers.
4. Vastelaovend in je oren, spijkers onder je voeten.
5. Weekend. Eindelijk tijd voor Hyperrommel. *(in het weekend)*

### Rommelkroon

*Wat het is (balk):* Zet in elke rij, kolom en kleur precies één kroon. Elke dag een nieuwe puzzel.  
*Korte zin (blok):* Eén kroon per rij, kolom en kleur  
*Knop:* **ZET JE KROON ›**  
*Plaatje:* kronen vallen één voor één in het raster  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Voor wie zich graag een koning voelt.
2. Koningshuis onthult: zo zet je kronen zonder dat ze elkaar raken.
3. 620 kronen gratis! Wel zelf neerzetten.
4. Maak een puzzel en stuur hem naar een vriend. Wraak is zoet.
5. Je Rommelkroon van vandaag ligt nog op je te wachten. *(als die van vandaag nog op je wacht)*

### Rommelarend

*Wat het is (balk):* Vlieg als arend over Parijs, Amsterdam, Londen en New York.  
*Korte zin (blok):* Vlieg als arend over vier wereldsteden  
*Knop:* **VLIEG WEG ›**  
*Plaatje:* een arend met gespreide vleugels vliegt door de banner, boven een stad met de Eiffeltoren  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Even wegvliegen van alle verplichtingen?
2. Vier wereldsteden in één middag. Zonder vliegveld!
3. Stedentrip gratis! Parijs, Amsterdam, Londen, New York. Vleugels mee.
4. Arend landt op de Eiffeltoren. Niemand zegt er iets van.
5. Weekendje weg? Vier steden, en je bent thuis voor het eten. *(in het weekend)*

### Rob 👍

*Wat het is (balk):* Geef Rob zo snel mogelijk een duimpje, maar trap niet in de nep-Robs.  
*Korte zin (blok):* Geef Rob een duimpje, snel  
*Knop:* **GEEF EEN DUIMPJE ›**  
*Plaatje:* het bordje ROB wiebelt en er ploppen duimpjes omhoog  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Rob wil een duimpje. Doe het voor Rob.
2. Rob zoekt duimpjes! Gratis en snel. Bob: niet reageren.
3. Klik niet op Bob. Bob is geen Rob. Brood ook niet.
4. Silke is boos. Dit is waarom. xoxoxo

### Rommelbel

*Wat het is (balk):* Schiet bellen, maak groepjes van drie en laat het plafond niet te laag zakken.  
*Korte zin (blok):* Schiet bellen van dezelfde kleur  
*Knop:* **BEGIN MET PLOPPEN ›**  
*Plaatje:* een kanon schiet een bel via de muur naar de groep, en drie gele bellen ploppen  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Mikken, kaatsen, ploppen. Herhalen.
2. Ontspannen in 3 seconden? Plop. Gelukt.
3. Bel kaatst via de muur precies op zijn plek. Experts verbaasd.
4. Eindeloos ploppen. Echt eindeloos, we hebben het getest.
5. Even de dag wegploppen? *('s avonds)*

### Rommelsteek

*Wat het is (balk):* Borduur rustig kruissteekjes, zonder tijd en zonder score.  
*Korte zin (blok):* Rustig borduren, steek voor steek  
*Knop:* **PAK JE NAALD ›**  
*Plaatje:* een naald borduurt heel rustig kruisjes tot een hartje  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. Even niks moeten. Wel borduren.
2. Gratis zen-cursus! Benodigd: één naald, nul haast.
3. Borduren zonder in je vinger te prikken. Het kan!
4. Elke dag een nieuwe mandala. Rustig aan, die loopt niet weg.
5. Lange dag gehad? Pak de draad weer op. *('s avonds)*

### JAJA PRODUCTIEFIETS!

*Wat het is (balk):* Fiets als productieleider Joop over het Bata-terrein: springen, bukken, koffie halen.  
*Korte zin (blok):* Fiets over het Bata-terrein  
*Knop:* **JAJA, FIETSEN! ›**  
*Plaatje:* Joop fietst op de rode fiets over de bovenrand, en de fabriek van Bata rookt  
*Ster NIEUW!:* nee (langer dan drie weken online; dan staat er GRATIS!)

1. JAJA PRODUCTIEFIETS! Meer hoeven we niet te zeggen.
2. Vacature: productieleider. Eigen fiets vereist. Koffie halen ook.
3. De crew wacht op koffie. Trappen, Joop!
4. Spring over kabels, duik onder slagbomen. Gewoon een dinsdag.
5. Goedemorgen! De crew wil koffie. Nu. *('s ochtends)*

### Rommelrecht

*Wat het is (balk):* Een rustig opruimspel: zet alles recht, sorteer het en leg het op zijn plek.  
*Korte zin (blok):* Rustig opruimen, alles op zijn plek  
*Knop:* **RUIM OP ›**  
*Plaatje:* een scheef lijstje gaat vanzelf recht hangen, en de bel van de waterpas schuift naar het midden  
*Ster NIEUW!:* tot en met 10 november

1. Voor wie een scheef schilderij niet kan uitstaan.
2. Opruimcoach geeft toe: dit is de enige truc die werkt.
3. Opruimen, maar dan leuk. Ja, dat bestaat.
4. Gezocht: muisje Frunnik. Laatst gezien in de werkplaats.
5. Hoofd vol? Ruim even een plankje op. *('s avonds)*

### Op Gevoel

*Wat het is (balk):* Hoe goed is je oog, je timing en je geheugen? Elke dag vijf korte uitdagingen.  
*Korte zin (blok):* Vijf uitdagingen voor je gevoel  
*Knop:* **TEST JE GEVOEL ›**  
*Plaatje:* de naald van de meter zwaait en stopt bijna precies in het midden  
*Ster NIEUW!:* tot en met 10 november

1. Test: hoe goed is jouw gevoel? De uitslag zal je verbazen.
2. Teken een perfecte cirkel. Uit de losse hand. Succes.
3. Stop op precies tien seconden. Zonder te tellen.
4. Dit is precies het midden. Denk je.
5. Je dagronde staat klaar. Vijf uitdagingen, één gevoel. *(als die van vandaag nog op je wacht)*

### Mengelmoes

*Wat het is (balk):* Laat stickers op elkaar vallen en kijk wat eruit komt. Begin met water, vuur, wind en aarde.  
*Korte zin (blok):* Combineer alles tot iets nieuws  
*Knop:* **BEGIN TE MENGEN ›**  
*Plaatje:* een sticker water en een sticker vuur botsen, en er komt een sticker stoom uit  
*Ster NIEUW!:* tot en met 9 november

1. Water plus vuur is stoom. Stoom plus pizza is… probeer maar.
2. Uitvinder maakt een draak in pyjama. Met vier stickers.
3. Ben jij de eerste die het verzint? Dan krijg je een 1e druk.
4. Alles mengen mag. Opruimen hoeft niet.

### Rommelwheels

*Wat het is (balk):* Een slap poppetje, een raar voertuig en een baan vol valkuilen.  
*Korte zin (blok):* Slappe poppetjes, rare karretjes  
*Knop:* **STAP IN ›**  
*Plaatje:* een karretje met een slap poppetje rijdt over de bovenrand, en een wiel rolt over heuvels  
*Ster NIEUW!:* tot en met 7 november

1. Rijden zonder rijbewijs. Landen zonder stijl.
2. Occasion te koop: barkruk met wielen. Keuring niet gehaald.
3. Remmen is voor watjes. Behalve vlak voor een afgrond.
4. Gehaald met armen en benen er nog aan? Dan krijg je een ster.

### Zoals in de reclame

*Wat het is (balk):* Zes spelletjes uit de reclames, maar dan echt. Elke dag een nieuwe.  
*Korte zin (blok):* Reclamespelletjes, maar dan echt  
*Knop:* **SPEEL HET ECHT ›**  
*Plaatje:* een pin schuift weg en de muntjes vallen naar Snuf de mol  
*Ster NIEUW!:* tot en met 17 november

1. Dit is reclame voor een spel over reclame. Het is echt, beloofd.
2. 99% van de mensen haalt dit level niet. Grapje, iedereen kan het.
3. Red het frietje! Het kan zichzelf niet redden.
4. Je kent ze uit de reclame. Hier werken ze echt.
5. De reclame van vandaag staat klaar. Hij is zelfs echt. *(als die van vandaag nog op je wacht)*

### Huis op stelten

*Wat het is (balk):* Speel als Moeki en Floortje en zet het huis op stelten, zonder dat Ruben je betrapt.  
*Korte zin (blok):* Twee katten en een lijstje streken  
*Knop:* **WORD EEN KAT ›**  
*Plaatje:* Moeki sluipt over de bovenrand van de banner, en Floortje tikt een glas van tafel  
*Ster NIEUW!:* tot en met 16 november

1. Twee katten. Eén huis. Nul regels.
2. Kat duwt glas van tafel. Wat er daarna gebeurt, is ongelooflijk.
3. Miauw. (Vertaling: kom spelen.)
4. Baasje smelt elke keer. Deze katten weten waarom.
5. De uitdaging van vandaag ligt klaar. Moeki heeft hem al half gesloopt. *(als die van vandaag nog op je wacht)*

### Rommelgroepjes

*Wat het is (balk):* Elke dag zestien woorden. Vind de vier groepjes met een verborgen verband.  
*Korte zin (blok):* Zestien woorden, vier groepjes  
*Knop:* **VIND DE GROEPJES ›**  
*Plaatje:* vier oranje tegeltjes schuiven samen in de bovenste rij  
*Ster NIEUW!:* tot en met 18 november

1. Zestien woorden, vier groepjes, een klein beetje paniek.
2. Den, vlaai en kroon: wat is het verband? Het antwoord verrast je.
3. Bijna! Eén woord hoort er niet bij. Maar welke?
4. Vier levens. Morgen krijg je er gewoon weer vier.
5. Je groepjes van vandaag liggen nog door elkaar. *(als die van vandaag nog op je wacht)*

### Cryptisch

*Wat het is (balk):* Elke dag één cryptische omschrijving: een zin met een betekenis en een woordspel.  
*Korte zin (blok):* Elke dag één cryptische omschrijving  
*Knop:* **KRAAK DE ZIN ›**  
*Plaatje:* een vergrootglas met een vraagteken glijdt over een krantenknipsel  
*Ster NIEUW!:* tot en met 27 november

1. Eén zin, één woord, geen hints.
2. Puzzelaar las de zin tien keer. De elfde keer: eureka!
3. Voor wie woordgrapjes een topsport vindt.
4. Neem het niet letterlijk. Dat is precies de bedoeling.
5. De omschrijving van vandaag bedoelt het anders dan je denkt. *(als die van vandaag nog op je wacht)*

### Letterval

*Wat het is (balk):* Elke dag een kist met letterblokjes. Veeg woorden, en de letters erboven vallen omlaag.  
*Korte zin (blok):* Veeg woorden uit de letterkist  
*Knop:* **VEEG EEN WOORD ›**  
*Plaatje:* een woord wordt weggeveegd en de letterblokjes erboven vallen omlaag  
*Ster NIEUW!:* tot en met 27 november

1. Letters vallen naar beneden. Woorden vallen op hun plek.
2. Gratis kist letters! Elke dag een nieuwe. Zelf vegen.
3. Het goede woord, op het verkeerde moment. Dat is Letterval.
4. Hint: begin bovenaan. Of juist niet.
5. Je letterkist van vandaag is nog dicht. *(als die van vandaag nog op je wacht)*

### Klinkermijnen

*Wat het is (balk):* Elke dag een klein kruiswoordveld waarin de klinkers mijnen zijn.  
*Korte zin (blok):* Kruiswoord met klinkermijnen  
*Knop:* **STAP HET VELD IN ›**  
*Plaatje:* vakjes klappen open; op een klinker steekt een rood vlaggetje op  
*Ster NIEUW!:* tot en met 27 november

1. Klinkt goed, maar pas op voor de klinkers.
2. Let op: dit kruiswoordveld bevat klinkers. Voorzichtig!
3. Medeklinkers zijn je vrienden. Klinkers niet.
4. Eén verkeerde A en het is klaar.
5. Het veld van vandaag ligt klaar. Stap voorzichtig. *(als die van vandaag nog op je wacht)*
