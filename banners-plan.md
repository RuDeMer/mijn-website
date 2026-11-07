# Plan: reclamebanners voor de spellen (7 november 2026)

Kleine, vrolijke banners die spelers op een leuke manier naar andere spellen sturen, vooral naar nieuwe spellen en spellen die ze nog niet kennen. Dit is het plan; er is nog niets aan de site veranderd. Zeg wat je ervan vindt, en vooral: **welke teksten je niet grappig vindt**. Die verbeter ik dan eerst.

De schetsen (computer en telefoon, licht en donker) heb ik meegestuurd als plaatjes: alle 28 banners breed in licht en in donker, alle 28 smal, en een paar in de echte pagina's. Plus een voorbeeldbestand waarin je alle animaties ziet bewegen.

## 1. Zo ziet een banner eruit

- **Breed** (homepage en scorebord op een computer): links het icoon van het spel in een gekleurde tegel, in het midden de grap in grote letters met daaronder de naam en een zin over wat het spel is, rechts een klein toneeltje met een animatie, en een knop **Speel ›**. Bovenaan een stukje labeltape: **Probeer ook** (of **Uitgelicht** als jij het spel uitlicht).
- **Smal** (telefoon en de eindschermen van spellen): het icoon kleiner, de grap ernaast, daaronder de naam met een kortere zin, en een rond pijltje. In plaats van het toneeltje beweegt het icoon zelf een beetje.
- **In de stijl van versie 0.6**: dikke inktrand, ronde hoeken, de kleuren van het spel, licht en donker (volgt de keuze op de homepage).
- **Stempel Nieuw!** bij spellen die korter dan drie weken online staan.
- **De hele banner is één link**, met een duidelijke tekst voor schermlezers ("Probeer ook Rommelarend. Even wegvliegen van alle verplichtingen? Vlieg als arend over …"). Rechtsboven een **kruisje** (die banner zie je dan twee weken niet).
- **De ruimte is vooraf vrijgehouden**: de banner heeft een vaste hoogte (breed 140 px, smal 162 px, met het tapeje erbij), dus niets verspringt als hij verschijnt. Lange teksten worden niet afgekapt: elke tekst in de lijst past (hooguit 70 tekens, de editor in de werkplaats bewaakt dat).
- **Animaties**: subtiel en met rustpauzes ertussen, alleen als de banner in beeld is. Staat op je apparaat **minder beweging** aan, dan staat alles stil. Per spel staat de animatie hieronder bij de teksten. De tekst staat altijd vóór de tekening, dus wat door de banner vliegt (de arend, het vliegtuigje) maakt de tekst nooit onleesbaar. Moeki, Joop op de fiets en het karretje van Rommelwheels lopen bovenop de rand van de banner; in donker krijgen ze een lichte rand, zodat je ze ziet.

## 2. Waar ze komen

| Plek | Waar precies | Wisselen |
|---|---|---|
| **Homepage** | tussen *Puzzels van vandaag* en *Alle spellen* (boven de filterknoppen). Valt op, maar duwt de tegels niet weg. | Rustig: elke 20 seconden een andere, hooguit 5 keer per bezoek, met een pauzeknop. Hij wisselt niet als je muis erop staat, je hem met het toetsenbord koos, of hij niet in beeld is. Met minder beweging wisselt hij niet. |
| **Scorebord** | onder *Doe mee* en de Bakwedstrijd van de week, boven het zoekveld | nee |
| **404-pagina** | onder de deur van Kamer 404, met een kopje "Deze kamer bestaat niet. Deze spellen wel:" | nee |
| **In de spellen** | alleen op het eindscherm, nooit tijdens het spelen en nooit als nieuw venster (zie de lijst hieronder) | nee |

**In de spellen** (het spel roept zelf `Scorebord.banner(...)` aan; een spel dat dat niet doet, verandert niet):

- **Rommelwoord, Cryptisch, Letterval, Klinkermijnen**: in de uitslag, onder het strookje *Woordspellen van vandaag*. Daar nooit een banner voor een ander woordspel (dat doet het strookje al).
- **Rommelgroepjes**: in de uitslag. **Op Gevoel**: in de uitslag van de dagronde.
- **Rommelkroon**: in het venster na de puzzel van de dag (alleen daar, het venster is krap).
- **JAJA PRODUCTIEFIETS!, Rob 👍, Huis op stelten**: op het eindscherm na een potje.
- **Rommelbel, Rommelritme, Rommelwheels, Zoals in de reclame**: na een gehaald level, maar hooguit eens per 10 minuten (anders zie je hem na elk level).
- **Rommelpoker**: als je rommelmarkt voorbij is (gewonnen of verloren).
- **Casino Rommelroyaal**: na de hand van de dag. **Ruben de Duiker**: in de uitslag na de avond. **Rommelarend**: na een wedstrijd.
- **Bewust niet**: Vouwvlieger (het eindscherm is vol), Rommelsteek en Rommelrecht (die zijn juist rustig), en de spellen zonder eindscherm (Vlaaienbakker, Rommelbeesten, Mengelmoes, Rommelhotel, Rommelland, Rommelblok).
- **Nooit** een banner voor het spel waar je in zit.

## 3. Slim kiezen (alleen op je eigen apparaat)

De pagina kiest met wat er al op het apparaat staat. Er gaat niets naar een server om iemand te volgen.

1. **Uitgelicht**: een spel dat jij in de werkplaats uitlicht (met een begin- en einddatum) komt het vaakst.
2. **Nieuw**: spellen die korter dan drie weken online staan, als je ze nog niet speelde.
3. **Nog nooit gespeeld**: spellen waarvan nog geen opslag op het apparaat staat.
4. **De puzzel van vandaag wacht nog**: Rommelwoord, Cryptisch, Letterval, Klinkermijnen, Rommelgroepjes, Op Gevoel, Rommelkroon, de hand van de dag in het casino, de reclame van de dag en de uitdaging van Huis op stelten. Alleen als je dat spel al eens speelde; dan komt er vaak een tekst als "Je Rommelkroon van vandaag ligt nog op je te wachten".
5. **Een willekeurig ander spel.**

Een klein voorstel daarbij: een nieuw spel dat je **al speelt**, zakt naar achteren (na "nog nooit gespeeld"). De banner is er om je naar iets nieuws te sturen.

**Afwisselen**: wat je net zag, zakt flink naar achteren, en een beetje toeval doet de rest. Ook de teksten wisselen: de laatste 16 teksten die je zag komen niet meteen terug. Teksten die bij het moment passen ('s avonds, in het weekend, de puzzel wacht) gaan voor als ze passen.

**Het kruisje**: die banner zie je **twee weken** niet, en er komt meteen een andere voor in de plaats.

**Wat er bewaard wordt**: alleen op het apparaat, in `rommelbanner-v1`: welke banners en teksten je laatst zag, welke je wegklikte en tot wanneer. Bewust niet in `SLEUTELS` (gaat niet mee met koppelen). Ik zet het in de privacyverklaring.

## 4. Beheer in de werkplaats: Site, 📣 Banners

- **Een eigen bestand**: `banners.json` op de site, met per spel de naam, de zinnen, het icoon, sinds wanneer het online staat, of de banner aan staat, en de teksten. Alle pagina's lezen het (zelfde site, het veiligheidsbeleid verandert niet).
- **Uitlichten**: kies een spel, een begin- en een einddatum.
- **Per spel**: banner aan of uit; naam, zin en korte zin; *online sinds* (daarmee rekent hij drie weken Nieuw); de teksten: aanpassen, toevoegen, uitzetten of weghalen, met per tekst een moment (altijd, 's ochtends, 's middags, 's avonds, 's nachts, weekend, doordeweeks, puzzel wacht, nog nooit gespeeld, al gespeeld). Bij elke tekst een teller (hooguit 70 tekens).
- **Voorbeeld**: zie de banner meteen, breed en smal, in licht en donker, met de tekst die je aan het bewerken bent.
- **Zet online** zet `banners.json` online, net als het Homepage-paneel.
- **Een nieuw spel**: zet je een spel op de homepage (bij het uploaden of met *Zet op de homepage*), dan krijgt het in dezelfde stap vanzelf een banner met de titel en het onderschrift, gemarkeerd als nieuw. Daarna kun je er grappige teksten bij zetten. Een spel zonder teksten toont zijn naam als kop.
- **Spellen zonder banner**: een blokje "Nog geen banner" met een knop, zoals "Nog niet op de homepage".

## 5. Klikken tellen (optioneel)

Wil je zien welke banners werken, dan kan de scoreserver per dag tellen hoe vaak er op de banner van een spel geklikt wordt, alleen als getal (de bestaande `dagteller`, zonder wie het was). In de werkplaats zie je dan per spel de klikken van de laatste 7 en 30 dagen. Dat vraagt een kleine aanpassing van de scoreserver (een nieuwe route `/banner/klik`, met een grens per adres tegen onzin). **Als je dit wilt, plak dan de code die nu in Cloudflare draait (versie 2026-11-06)**; dan lever ik het hele bestand aan en zet ik het in de privacyverklaring. Zonder dat werkt alles gewoon, alleen zonder tellen.

## 6. Wat er technisch verandert

- **Nieuw**: `banners.js` (het kiezen, de ontwerpen en animaties van alle 28 spellen, ongeveer 180 kB, ingepakt over het internet zo'n 31 kB, alleen geladen als er een banner komt) en `banners.json` (de teksten).
- **Het gedeelde scorebord-script**: één kleine functie `Scorebord.banner(plek, opties)` die `banners.js` laadt (ongeveer 15 regels). Met het script uit CLAUDE.md in alle 24 pagina's tegelijk, ook in `homepage-onderdelen.js` en de kopie in de werkplaats.
- **`homepage-onderdelen.js`**: de plek op de homepage (home_v6), en de rommeltjes kunnen op de banner liggen. `index.html` blijft zoals hij is.
- **`scorebord.html` en `404.html`**: een plek voor de banner.
- **18 spellen**: een plekje in het eindscherm en één regel die `Scorebord.banner` aanroept.
- **`werkplaats.html`**: het tabje Banners, en een nieuw spel krijgt vanzelf een banner.
- **`privacy.html`** en **CLAUDE.md**: bijgewerkt.
- Het veiligheidsbeleid verandert niet, en er komen geen scripts van buiten bij.

## 7. Testen

- **Met code**: de keuze (nieuw eerst, nooit het spel waar je zit, afwisselen, het kruisje, uitgelicht met datums, de puzzel die wacht, de momenten), en een nieuw spel dat vanzelf een banner krijgt.
- **In een echte browser**: telefoon en computer, licht en donker, met het toetsenbord en met minder beweging, zonder fouten of overtredingen van het veiligheidsbeleid, en zonder dat de pagina verspringt.

## 8. Vragen aan jou

1. **De teksten hieronder**: welke vind je niet grappig? Wil je er zelf nog bij?
2. **De homepage**: is de plek tussen *Puzzels van vandaag* en *Alle spellen* goed, en mag hij daar rustig wisselen (elke 20 seconden, hooguit 5 keer)?
3. **De eindschermen**: is de lijst in hoofdstuk 2 goed? (Rommelsteek en Rommelrecht heb ik bewust rustig gelaten.)
4. **Rommelhotel Online** ook een banner geven? Hij is er nu bij, maar kan uit.
5. **Klikken tellen**: ja (plak dan de code van de scoreserver) of nee?

## 9. Alle teksten

Per spel minstens vier teksten die afwisselen. Een tekst met een moment erachter komt alleen op dat moment; die gaan dan wel voor.

### Casino Rommelroyaal

*Wat het is:* Een casino met alleen speelfiches: blackjack, roulette, kien en meer. Nooit echt geld.  
*Op een telefoon:* Een casino met alleen speelfiches  
*Animatie:* een roulettewiel draait, het balletje rolt mee en de lampjes knipperen  
*Stempel Nieuw:* tot en met 24 november

1. Nep-fiches, echte spanning.
2. Je portemonnee mag gewoon thuisblijven.
3. Het huis wint altijd. Maar het huis is van Moeki.
4. Een uil die blackjack uitrekent. Oehoe, wat slim.
5. Avondje uit? Het casino is open. Dresscode: pyjama. *('s avonds)*
6. De hand van de dag ligt klaar. De uil kijkt al mee. *(als die van vandaag nog op je wacht)*

### Rommelbeesten

*Wat het is:* Open pakjes en verzamel meer dan 300 Rommelbeesten, van gewoon tot geheim.  
*Op een telefoon:* Pakjes openen en beesten verzamelen  
*Animatie:* een pakje wiebelt, scheurt open en er komt een glimmende kaart uit  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Eén pakje nog. Zei iedereen, ooit.
2. Een kans van 1 op 400 op een wonderpakje. Vandaag misschien?
3. Er zit vast een holo in. Vast. Misschien. Scheur!
4. Beestachtig verslavend. Maar dan schattig.
5. Je gratis pakje ligt klaar. Niet laten liggen, dat vinden ze zielig. *(als je het spel al eens speelde)*

### Rommelhotel

*Wat het is:* Een pixelhotel vol mysteries: loop rond, praat met de gasten en los de puzzels op.  
*Op een telefoon:* Een pixelhotel vol mysteries  
*Animatie:* de ramen gaan één voor één aan en de vlag op het dak wappert  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Kamer 12 is voor jou gereserveerd. Al een tijdje.
2. Wie heeft de vlaai opgegeten? Het hotel weet het. Jij nog niet.
3. Een tijdmachine in de kelder. Dat stond niet in de folder.
4. Ook de lift heeft geheimen. Vraag maar aan Mien.
5. Overnachten? Kamer 12 is vrij. Ontbijt niet inbegrepen, raadsels wel. *('s avonds)*

### Rommelhotel Online

*Wat het is:* Het Rommelhotel, live met je vrienden: maak een poppetje, richt je kamer in en klets.  
*Op een telefoon:* Het Rommelhotel, live met vrienden  
*Animatie:* het hotel, met praatwolkjes die opploppen ("Hoi!", een hartje, "Haha")  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Hetzelfde hotel, maar nu met echte buren.
2. Kom kletsen in de lobby. Pantoffels mogen.
3. Richt je kamer in en nodig je vrienden uit. Opruimen hoeft niet.
4. Soms loopt Ruben zelf rond. Doe maar gewoon.
5. Avond in het hotel: de lobby zit vol, op de bank is nog plek. *('s avonds)*

### Rommelblok

*Wat het is:* Een eindeloze wereld van blokken: graven, bouwen, ruilen en samen spelen.  
*Op een telefoon:* Bouw je eigen blokkenwereld  
*Animatie:* er valt een blok op de stapel, en een houweel hakt erin  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Bouw je droomhuis. Zonder vergunning.
2. Graaf een gat. Graaf nog een gat. Oeps, een grot.
3. Een karretje, een spoor en geen remmen. Wat kan er misgaan?
4. Bouw samen met vrienden. Of sloop samen, dat kan ook.
5. Het wordt donker. Bouw snel een huisje, de spookjes komen eraan. *('s avonds)*

### Rommelland

*Wat het is:* Bouw je eigen pretpark in 3D, met attracties, kraampjes en bezoekers met een mening.  
*Op een telefoon:* Bouw je eigen 3D-pretpark  
*Animatie:* het reuzenrad draait, en de bakjes blijven recht hangen  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Bouw een achtbaan. Vergeet de wc's niet.
2. Lees de gedachten van je bezoekers. Ze vinden de patat te duur.
3. Pretparkdirecteur worden? Geen diploma nodig.
4. Te lange wachtrij? Dat ligt aan de directeur. Dat ben jij.
5. Het wordt donker: tijd voor vuurwerk boven je eigen park. *('s avonds)*

### Vlaaienbakker

*Wat het is:* Klik vlaaien, neem bakkers in dienst en bouw een Limburgs vlaaienrijk.  
*Op een telefoon:* Bak een Limburgs vlaaienrijk  
*Animatie:* een kersenvlaai met toefjes slagroom draait rond op een bord, met +1'tjes  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Wie wat bewaart, die bakt wat.
2. Van één vlaai naar een trevigintiljard. Gewoon door te klikken.
3. Kersenvlaai, rijstevlaai, oerknalvlaai. Die laatste is pittig.
4. Eén vlaai per klik. Een heelal vol vlaai per seconde.
5. Je bakkers bakten door terwijl jij weg was. Kom eens kijken. *(als je het spel al eens speelde)*
6. Goedemorgen! De oven staat al aan. *('s ochtends)*

### Ruben de Duiker

*Wat het is:* Duik overdag in de Noordzee en kook 's avonds je vangst in je eigen restaurant.  
*Op een telefoon:* Overdag duiken, 's avonds koken  
*Animatie:* de duiker dobbert met belletjes, het wier wiegt en er zwemt een visje voorbij  
*Stempel Nieuw:* tot en met 15 november

1. Een chef die zijn eigen vis vangt. Met een harpoen.
2. Diep in zee woont Koning Kreeft. Hij wil niet op je bord.
3. Duik de Noordzee in. Het water is koud, de soep is warm.
4. Wat ligt er onder Schelpkerke? Een klok, een geheim en veel haring.
5. Het is avond. De gasten zitten al aan tafel, en de vis zwemt nog. *('s avonds)*
6. Goedemorgen! Het getij is goed en de zuurstoffles zit vol. *('s ochtends)*

### Rommelpoker

*Wat het is:* Speel pokerhanden, verzamel rare snuisterijen en versla de kraampjes op de rommelmarkt.  
*Op een telefoon:* Poker op de rommelmarkt  
*Animatie:* vijf kaarten waaieren open tot een full house, met een rubberen eendje ernaast  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Sokken zonder paar. Toch een paar. Dat is poker.
2. Een full house en een rubberen eendje. Ja, dat telt mee.
3. Afdingen kan niet. Een tuinkabouter kopen wel.
4. Elke kraam een baas, elke baas een gemene regel.
5. Zaterdag? Rommelmarktdag. Neem je kaarten mee. *(in het weekend)*

### Rommelwoord

*Wat het is:* Raad elke dag nieuwe woorden van vier tot acht letters, in zes pogingen.  
*Op een telefoon:* Raad elke dag nieuwe woorden  
*Animatie:* de letters van RADEN draaien één voor één om en worden groen  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Vijf letters, zes kansen, nul excuses.
2. Vier tot acht letters. Hoe zwaar wil je het jezelf maken?
3. Zes pogingen. Je hebt er vast maar vier nodig. Of zeven.
4. Een groen vakje voelt beter dan het zou moeten.
5. Je woord van vandaag wacht nog. Het telt de minuten. *(als die van vandaag nog op je wacht)*
6. Koffie en een woord van vijf letters. Zo begint een goede dag. *('s ochtends)*

### Vouwvlieger

*Wat het is:* Vlieg met een papieren vliegtuigje door een neonstad, langs kranen en schoorstenen.  
*Op een telefoon:* Vlieg met een papieren vliegtuigje  
*Animatie:* een papieren vliegtuigje zweeft door de banner, met een neonstad 's nachts  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Eén tik en je zweeft. Eén tik te veel en je kreukt.
2. Van een A4'tje naar de wolken. Of tegen een schoorsteen.
3. Kreuk niet. Dat is alles. Kreuk gewoon niet.
4. Vouw je vliegtuigje van bladgoud. Kreukt net zo hard, maar wel chic.
5. Het is avond in de neonstad. Prima vliegweer. *('s avonds)*

### Rommelritme

*Wat het is:* Spring op de maat van de muziek over spijkers, door tunnels en langs springringen.  
*Op een telefoon:* Spring op de maat van de muziek  
*Animatie:* een blokje springt op de maat over spijkers, met muzieknootjes  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Je hoeft niet te kunnen dansen. Wel te kunnen springen.
2. Spring op de maat. Of er net naast. Au.
3. Vastelaovend in je oren, spijkers onder je voeten.
4. Honderd pogingen voor één level. De honderdeerste lukt.
5. Weekend. Eindelijk tijd voor Hyperrommel. *(in het weekend)*

### Rommelkroon

*Wat het is:* Zet in elke rij, kolom en kleur precies één kroon. Elke dag een nieuwe puzzel.  
*Op een telefoon:* Eén kroon per rij, kolom en kleur  
*Animatie:* kronen vallen één voor één in het raster  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Voor wie zich graag een koning voelt.
2. Kronen mogen elkaar niet raken. Koninklijke afstand, heet dat.
3. 620 puzzels. Dat zijn veel kronen voor één hoofd.
4. Maak zelf een puzzel en stuur hem naar een vriend. Wraak is zoet.
5. Op de Kroonschool leer je trucjes. Huiswerk is niet verplicht.
6. Je Rommelkroon van vandaag ligt nog op je te wachten. *(als die van vandaag nog op je wacht)*

### Rommelarend

*Wat het is:* Vlieg als arend over Parijs, Amsterdam, Londen en New York.  
*Op een telefoon:* Vlieg als arend over vier wereldsteden  
*Animatie:* een arend met gespreide vleugels vliegt door de banner, boven een stad met de Eiffeltoren  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Even wegvliegen van alle verplichtingen?
2. Vier wereldsteden, nul paspoortcontrole.
3. Land op de Eiffeltoren. Niemand die er iets van zegt.
4. Ergens op een kerktoren ligt een gouden veer. Ga maar zoeken.
5. Weekendje weg? Vier steden, en je bent thuis voor het eten. *(in het weekend)*

### Rob 👍

*Wat het is:* Geef Rob zo snel mogelijk een duimpje, maar trap niet in de nep-Robs.  
*Op een telefoon:* Geef Rob een duimpje, snel  
*Animatie:* het bordje ROB wiebelt en er ploppen duimpjes omhoog  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Rob wil een duimpje. Doe het voor Rob.
2. Bob is geen Rob. Brood ook niet. Let goed op.
3. Eén verkeerd duimpje en Silke wordt boos. xoxoxo
4. Tien seconden duimspammen. Je duim voelt het morgen nog.
5. Rob heeft vandaag nog geen duimpje gehad. Zielig, toch?

### Rommelbel

*Wat het is:* Schiet bellen, maak groepjes van drie en laat het plafond niet te laag zakken.  
*Op een telefoon:* Schiet bellen van dezelfde kleur  
*Animatie:* een kanon schiet een bel via de muur naar de groep, en drie gele bellen ploppen  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Mikken, kaatsen, ploppen. Herhalen.
2. Het plafond zakt. Jij hopelijk niet.
3. Kaats via de muur. Zo doen de profs dat.
4. Eindeloos ploppen. Echt eindeloos, we hebben het getest.
5. Even de dag wegploppen? *('s avonds)*

### Rommelsteek

*Wat het is:* Borduur rustig kruissteekjes, zonder tijd en zonder score.  
*Op een telefoon:* Rustig borduren, steek voor steek  
*Animatie:* een naald borduurt heel rustig kruisjes tot een hartje  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. Even niks moeten. Wel borduren.
2. Borduren zonder in je vinger te prikken.
3. Geen tijd, geen score, geen haast. Alleen garen en een melodietje.
4. Elke dag een nieuwe mandala. Rustig aan, die loopt niet weg.
5. Lange dag gehad? Pak de draad weer op. *('s avonds)*

### JAJA PRODUCTIEFIETS!

*Wat het is:* Fiets als productieleider Joop over het Bata-terrein: springen, bukken, koffie halen.  
*Op een telefoon:* Fiets over het Bata-terrein  
*Animatie:* Joop fietst op de rode fiets over de bovenrand, en de fabriek van Bata rookt  
*Stempel Nieuw:* nee (langer dan drie weken online)

1. JAJA PRODUCTIEFIETS! Meer hoeven we niet te zeggen.
2. De crew wacht op koffie. Trappen, Joop!
3. Spring over kabels, duik onder slagbomen. Gewoon een dinsdag.
4. Bellen, trappen, roepen. In die volgorde.
5. Goedemorgen! De crew wil koffie. Nu. *('s ochtends)*

### Rommelrecht

*Wat het is:* Een rustig opruimspel: zet alles recht, sorteer het en leg het op zijn plek.  
*Op een telefoon:* Rustig opruimen, alles op zijn plek  
*Animatie:* een scheef lijstje gaat vanzelf recht hangen, en de bel van de waterpas schuift naar het midden  
*Stempel Nieuw:* tot en met 10 november

1. Voor wie een scheef schilderij niet kan uitstaan.
2. Opruimen, maar dan leuk. Ja, dat bestaat.
3. Schroeven sorteren op maat. Waarom is dat zo fijn?
4. Muisje Frunnik woont in de werkplaats. Opruimen doet hij niet.
5. Hoofd vol? Ruim even een plankje op. *('s avonds)*

### Op Gevoel

*Wat het is:* Hoe goed is je oog, je timing en je geheugen? Elke dag vijf korte uitdagingen.  
*Op een telefoon:* Vijf uitdagingen voor je gevoel  
*Animatie:* de naald van de meter zwaait en stopt bijna precies in het midden  
*Stempel Nieuw:* tot en met 10 november

1. Teken een perfecte cirkel. Uit de losse hand. Succes.
2. Stop op precies tien seconden. Zonder te tellen.
3. Je gevoel zegt dat je hier goed in bent. Laten we kijken.
4. Dit is precies het midden. Denk je.
5. Je dagronde staat klaar. Vijf uitdagingen, één gevoel. *(als die van vandaag nog op je wacht)*

### Mengelmoes

*Wat het is:* Laat stickers op elkaar vallen en kijk wat eruit komt. Begin met water, vuur, wind en aarde.  
*Op een telefoon:* Combineer alles tot iets nieuws  
*Animatie:* een sticker water en een sticker vuur botsen, en er komt een sticker stoom uit  
*Stempel Nieuw:* tot en met 9 november

1. Water plus vuur is stoom. Stoom plus pizza is… probeer maar.
2. Begin met vier stickers. Eindig met een draak in pyjama.
3. Ben jij de eerste die het verzint? Dan krijg je een 1e druk.
4. Alles mengen mag. Opruimen hoeft niet.

### Rommelwheels

*Wat het is:* Een slap poppetje, een raar voertuig en een baan vol valkuilen.  
*Op een telefoon:* Slappe poppetjes, rare karretjes  
*Animatie:* een karretje met een slap poppetje rijdt over de bovenrand, en een wiel rolt over heuvels  
*Stempel Nieuw:* tot en met 7 november

1. Rijden zonder rijbewijs. Landen zonder stijl.
2. Een barkruk met wielen. Door de keuring kwam hij niet.
3. Remmen is voor watjes. Behalve vlak voor een afgrond.
4. Gehaald? Mooi. Met armen en benen er nog aan? Nog mooier.

### Zoals in de reclame

*Wat het is:* Zes spelletjes uit de reclames, maar dan echt. Elke dag een nieuwe.  
*Op een telefoon:* Reclamespelletjes, maar dan echt  
*Animatie:* een pin schuift weg en de muntjes vallen naar Snuf de mol  
*Stempel Nieuw:* tot en met 17 november

1. Dit is reclame voor een spel over reclame. Het is echt, beloofd.
2. 99% van de mensen haalt dit level niet. Grapje, iedereen kan het.
3. Red het frietje! Het kan zichzelf niet redden.
4. Trek de goede pin. Of de verkeerde, dat is ook leuk.
5. De reclame van vandaag staat klaar. Hij is zelfs echt. *(als die van vandaag nog op je wacht)*

### Huis op stelten

*Wat het is:* Speel als Moeki en Floortje en zet het huis op stelten, zonder dat Ruben je betrapt.  
*Op een telefoon:* Twee katten en een lijstje streken  
*Animatie:* Moeki sluipt over de bovenrand van de banner, en Floortje tikt een glas van tafel  
*Stempel Nieuw:* tot en met 16 november

1. Twee katten. Eén huis. Nul regels.
2. Duw een glas van tafel. Gewoon omdat het kan.
3. Miauw. (Vertaling: kom spelen.)
4. Moeki slaapt waar het niet mag. Floortje klimt waar het niet kan.
5. Het is avond. Tijd voor zoomies door de gang. *('s avonds)*
6. De uitdaging van vandaag ligt klaar. Moeki heeft hem al half gesloopt. *(als die van vandaag nog op je wacht)*

### Rommelgroepjes

*Wat het is:* Elke dag zestien woorden. Vind de vier groepjes met een verborgen verband.  
*Op een telefoon:* Zestien woorden, vier groepjes  
*Animatie:* vier oranje tegeltjes schuiven samen in de bovenste rij  
*Stempel Nieuw:* tot en met 18 november

1. Zestien woorden, vier groepjes, een klein beetje paniek.
2. Wat hebben een den, een vlaai en een kroon gemeen? Vast niks.
3. Bijna! Eén woord hoort er niet bij. Maar welke?
4. Vier levens. Morgen krijg je er gewoon weer vier.
5. Je groepjes van vandaag liggen nog door elkaar. *(als die van vandaag nog op je wacht)*

### Cryptisch

*Wat het is:* Elke dag één cryptische omschrijving: een zin met een betekenis en een woordspel.  
*Op een telefoon:* Elke dag één cryptische omschrijving  
*Animatie:* een vergrootglas met een vraagteken glijdt over een krantenknipsel  
*Stempel Nieuw:* tot en met 27 november

1. Eén zin, één woord, geen hints.
2. Lees het nog eens. En nog eens. O wacht, nu zie je het.
3. Voor wie woordgrapjes een topsport vindt.
4. Neem het niet letterlijk. Dat is precies de bedoeling.
5. De omschrijving van vandaag bedoelt het anders dan je denkt. *(als die van vandaag nog op je wacht)*

### Letterval

*Wat het is:* Elke dag een kist met letterblokjes. Veeg woorden, en de letters erboven vallen omlaag.  
*Op een telefoon:* Veeg woorden uit de letterkist  
*Animatie:* een woord wordt weggeveegd en de letterblokjes erboven vallen omlaag  
*Stempel Nieuw:* tot en met 27 november

1. Letters vallen naar beneden. Woorden vallen op hun plek.
2. Veeg een woord weg en kijk wat er naar beneden komt.
3. Het goede woord, op het verkeerde moment. Dat is Letterval.
4. Hint: begin bovenaan. Of juist niet.
5. Je letterkist van vandaag is nog dicht. *(als die van vandaag nog op je wacht)*

### Klinkermijnen

*Wat het is:* Elke dag een klein kruiswoordveld waarin de klinkers mijnen zijn.  
*Op een telefoon:* Kruiswoord met klinkermijnen  
*Animatie:* vakjes klappen open; op een klinker steekt een rood vlaggetje op  
*Stempel Nieuw:* tot en met 27 november

1. Klinkt goed, maar pas op voor de klinkers.
2. Een kruiswoordpuzzel, maar dan met mijnen.
3. Medeklinkers zijn je vrienden. Klinkers niet.
4. Eén verkeerde A en het is klaar.
5. Het veld van vandaag ligt klaar. Stap voorzichtig. *(als die van vandaag nog op je wacht)*
