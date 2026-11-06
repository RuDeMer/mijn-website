# Plan: de woordspellen van vandaag (versie 2)

Voorstel van Claude Code, 6 november 2026, aangepast na de feedback van Ruben. Nog niets gebouwd: eerst je akkoord.
Bij dit plan horen drie speelbare proefpagina's (één per nieuw spel, elk in een eigen stijl). Die stuur ik los; ze komen niet op de site.

---

## 1. Wat er veranderd is na je feedback

| Je feedback | Wat ik nu voorstel |
|---|---|
| Drie unieke stijlen die lijken op het origineel, gekruist met de stijl van het rommelhoekje | Elk spel een eigen stijl (§3). Ze lijken in sfeer op het soort spel (een krantencryptogram, vallende lettertegels, mijnenvegen), maar het ontwerp is van ons: geen kleuren, schermen of plaatjes van de originelen. |
| Geen tabbladen: op zichzelf staande spellen | Vier losse spellen met een eigen pagina en een eigen tegel op de homepage: **Rommelwoord** (zoals nu, met de nieuwe lengtes), **Cryptisch**, **Letterval** en **Klinkermijnen**. Onderaan elk spel een strookje "Woordspellen van vandaag" met de andere drie. |
| Elke puzzel is maar één dag te spelen | Elke puzzel is alleen op zijn eigen dag te spelen. Er is geen keuzelijst en geen archief om oude puzzels na te spelen. (De keuzelijst in de eerste proef was alleen om de voorbeelden te bekijken.) |
| 1. Namen | Cryptisch, Letterval en Klinkermijnen. |
| 2. Klinkermijnen | Eén keer mis, dan is het voorbij. |
| 3. Vijf letters ook in kistjes | Niet nodig: het woord van vijf letters blijft precies zoals het is. |
| 4. Eén kaart op de homepage, drie borden | Ja: bij Puzzels van vandaag één kaart "Woordspellen" met de vier spellen, en drie nieuwe borden op het scorebord. |
| 5. Moeilijker, vooral Cryptisch | Twintig nieuwe, moeilijkere omschrijvingen (§6), opgebouwd met de logica van een goede cryptische omschrijving. Moeilijk en makkelijk wisselen elkaar af in de week. |
| 6. De scoreserver | Ontvangen (versie 2026-11-05b). Ik heb hem bewaard; de nieuwe versie bouw ik daarop. |

---

## 2. De vier spellen

### Rommelwoord (`rommelwoord.html`)
- Het bekende spel, met daarbij woorden van **4, 6, 7 en 8 letters**: elk een eigen woord van de dag. Bovenin kies je de lengte; 5 letters staat voorop.
- **Vijf letters blijft precies zoals het is**: dezelfde lijst, dezelfde volgorde en dezelfde opslag. Ik test met code dat elke dag hetzelfde woord geeft als nu.
- **De moeilijke stand**: wat je al weet, moet je gebruiken (groen op dezelfde plek, rood ergens in het woord).
- **Na afloop**: wat het woord betekent, in één of twee zinnen die ik zelf schrijf.
- Elk woord is alleen op zijn eigen dag te spelen.
- Oefenen: zie de vraag in §10.

### Cryptisch (`cryptisch.html`)
- Elke dag één cryptische omschrijving met het aantal letters, alleen die dag te spelen.
- Vier hints, net als in de proef:
  1. de soort omschrijving;
  2. waar de betekenis staat (met een rode golflijn eronder);
  3. de aanwijzer en de stof (de aanwijzer omcirkeld, de stof met markeerstift);
  4. de laatste duw.
- Met **Laat het woord zien** zie je het antwoord, maar dan telt hij niet. Na afloop krijg je de uitleg, en sterren: zonder hint, binnen par of daarboven.
- **De Cryptoschool** heeft een lesje per soort, met de voorbeelden als oefeningen.

### Letterval (`letterval.html`)
- Elke dag een rooster met een thema, alleen die dag te spelen.
- Je veegt woorden. Een gevonden woord verdwijnt, en de letters erboven vallen omlaag.
- Er zijn hints: eerst een letter, dan het woord, dan de route. Ongedaan maken kan altijd.
- Loop je vast, dan zegt het spel dat. Elk rooster lukt in minstens één volgorde.

### Klinkermijnen (`klinkermijnen.html`)
- Elke dag een klein kruiswoordrooster waarin elke klinker een mijn is.
- Open je een medeklinker, dan zie je de letter en het aantal klinkers eromheen. Op klinkers zet je een vlaggetje, en dan kies je de klinker.
- **Eén keer een klinker openen, en het is voorbij**: dan springt er een duveltje uit het doosje. Je ziet de oplossing, en morgen is er een nieuw veld.
- Elk veld is zonder gokken op te lossen; dat kijkt een oplosser met code na.
- Omschrijvingen per woord kun je als hint bekijken.

---

## 3. Drie eigen stijlen

Elk spel heeft het lettertype, de kleuren, licht en donker, en de grapjes van het rommelhoekje. Daarbovenop een eigen stijl:

| Spel | Stijl | Wat je ziet |
|---|---|---|
| **Cryptisch** | **Het krantenknipsel** | Krantenpapier met fijne stippen, een kop met dubbele lijnen zoals een krant, de omschrijving op een uitgeknipt stukje krant met plakband en een gekartelde rand, de vakjes als een strook uit een kruiswoordraadsel, een rood PAR-stempel, en de hints in vier enveloppen. De hints tekenen in de omschrijving: rood potlood onder de betekenis, een blauwe cirkel om de aanwijzer, geel markeerstift op de stof. Na afloop een uitleg als krantenkolom. |
| **Letterval** | **De marktkraam** | Een rood-witte luifel, een houten kist vol geverfde letterblokjes in groente- en fruitkleuren, het thema op een prijskaartje aan een touwtje, en de woorden op een krijtbordje. Je veegt een touwtje door de letters. Een gevonden woord poeft weg, en de blokjes erboven vallen met een klein stuitertje omlaag. |
| **Klinkermijnen** | **Het duveltjesveld** | Een kast in de stijl van een oud spelletje: verhoogde vakjes met een lichte en een donkere rand, rode cijferschermpjes voor de klinkers en de tijd, en gekleurde getallen. Op het gaatjesbord van het rommelhoekje, met zwarte vakjes van labeltape. In het midden zit een duveltje uit een doosje in plaats van een smiley; het schrikt als je drukt en springt eruit bij een fout. |

De **Woord**-pagina houdt de stijl die hij nu heeft (de stijl van 0.6), want die kennen de spelers al.

---

## 4. Samen: de woordspellen van vandaag

- **Op de homepage** komt bij Puzzels van vandaag één kaart "Woordspellen", met vier tekentjes (✓ gedaan, ◐ bezig, ○ open). Bij Alle spellen krijgt elk spel een eigen tegel (in de categorie Puzzels).
- **Onderaan elk spel** staat een strookje met de andere drie en of je ze vandaag al deed.
- **Reeksen**: elk spel heeft een eigen reeks (op de dag zelf gelukt). Daarbij komt een gezamenlijke **woordreeks**: elke dag minstens één woordspel gespeeld. Wie nu een reeks in Rommelwoord heeft, houdt die ook in de woordreeks.
- **Cijfers en mijlpalen** per spel, uitgerekend uit wat je speelde, bijvoorbeeld: alle vier op één dag, een woordreeks van 7, 30, 100 of 365 dagen, Cryptisch zonder hint, Klinkermijnen tien keer zonder fout.
- **Delen** als rijtje tekens, zonder de oplossing te verraden.
- **"Je was sneller dan x% van de spelers"**: anoniem, met hetzelfde systeem als de dagtijden van Rommelkroon (zie §8).
- **Geen spieken**: de puzzels van komende dagen zitten versleuteld in kistjes, net als bij Rommelgroepjes. Ze staan in een apart bestand, zodat de pagina's niet te groot worden.

---

## 5. De logica van een goede cryptische omschrijving

Ik heb goed gekeken naar hoe Minute Cryptic zijn omschrijvingen opbouwt (de uitleg op hun site). Ik neem niets over, maar volg wel deze regels:

- **Twee delen**: een *betekenis* (altijd helemaal vooraan of helemaal achteraan) en *woordspel*.
- **Het woordspel** bestaat uit *stof* (de letters of woorden waarmee je werkt) en een *aanwijzer* die zegt wat je ermee doet: husselen, verstoppen, omdraaien, eromheen zetten, iets weghalen, om en om nemen, of laten klinken als.
- Vaak zit er een tussenstap in, en dat maakt het moeilijker:
  - een ander woord voor iets ("uitgeput" wordt OP);
  - een afkorting (oost wordt O, een seconde wordt S);
  - een andere taal (een Duits 'het' wordt DAS).
- **De zin moet gewoon lezen** en je op het verkeerde been zetten: "ballen" lijken voetballen, "schatten" lijkt goud, "een zanger" lijkt een mens.
- **Elk woord doet iets**. Er mogen alleen een paar verbindingswoorden tussen (en, plus, met, of een dubbele punt).
- **Precies één antwoord.** Dat laat ik nakijken door een aparte Claude die de omschrijvingen blind oplost: hij krijgt de antwoorden niet, en moet ook zeggen of er een tweede woord past.
- **De moeilijkheid wisselt per dag**, zoals in de krant: maandag is het makkelijkst en zondag het lastigst, met de par daarbij (1 tot 3).

---

## 6. De twintig nieuwe omschrijvingen

Elk stukje woordspel is met code nagekeken: de letters van een anagram, een verstopt woord over de spatie heen, achterstevoren, eromheen, eraf, om en om, en de stukjes achter elkaar. Alle woorden staan in OpenTaal. Daarna heeft een aparte Claude ze twee keer blind opgelost.

- In de eerste ronde had één omschrijving een tweede antwoord (STEMVORK of DIRIGENT). Die is herschreven.
- In de tweede ronde wees hij drie onnauwkeurigheden aan. Die zijn verbeterd.
- Hij vond ze gemiddeld nog makkelijk (zo'n 2 op 5; voor een computer, die heel snel woorden kan zoeken). Daarom heb ik er twee echt lastige bij gezet: nr. 10 en nr. 15.

De antwoorden staan in §11. In de proefpagina kun je ze ook spelen, met de hints.

1. Wat je bij verkiezingen uitbrengt, en een stuk bestek: geeft het koor de A (8)
2. Gaat bij elke opening door het lint (6)
3. Hier heeft de dominee het hoogste woord (10)
4. Schatten wat er in de gevel zit (5)
5. Koude heerser (5)
6. Volk dat in het bos staat (4)
7. De zorgen verbergen achterstevoren de kleur van een biggetje (4)
8. Opnieuw na oost en noord: er hangt iets in de lucht (6)
9. Je kunt hem missen: een visje om het oosten (4)
10. Als het donker is en helemaal vlak: een zanger in het bos (10)
11. Waar tomaten groeien, en ik kweek: hier woont de prinses (7)
12. Uitgeput, en dan een reis: met carnaval loop je erin mee (7)
13. Werpspies zonder kop: een vrucht met een steeltje (4)
14. Klinkt als verdriet om een dode, maar is nog niet gaar (4)
15. Sterk, door elkaar, met een eik bijvoorbeeld: daar hangen de ballen in (9)
16. Een Duits 'het' en een blaffer: een worstje op pootjes (7)
17. Een seconde voor de pook: het waart rond op zolder (5)
18. Dat lastige vak verbergt een boek vol kaarten (5)
19. Om en om uit kleuren: het hart van de zaak (4)
20. Niet vaak goed geregeld: de zomerreis (8)

De voorbeelden van **Letterval** (5 roosters) en **Klinkermijnen** (3 velden) zijn dezelfde als in de eerste versie van het plan. Ze zijn met code nagekeken: elk rooster lukt in ongeveer 1 op de 8 volgordes, en elk veld is zonder gokken op te lossen.

---

## 7. De opslag

- `rommelwoord-dag-v1` en `rommelwoord-stats-v1` **blijven precies zoals ze zijn**.
- Omdat het nu losse spellen zijn, krijgt elk een eigen, kleine sleutel. Zo schrijven twee open spellen nooit door elkaar in dezelfde opslag. Alle vier komen in `SLEUTELS`, en gaan dus mee met koppelen.

| Sleutel | Wat erin staat |
|---|---|
| `rommelwoord-extra-v1` | De lengtes 4, 6, 7 en 8, de geschiedenis van vijf letters (voor de woordreeks), de moeilijke stand |
| `cryptisch-v1` | Je uitslagen per dag, een omschrijving die nog loopt, de Cryptoschool |
| `letterval-v1` | Je uitslagen per dag, een rooster dat nog loopt |
| `klinkermijnen-v1` | Je uitslagen per dag, een veld dat nog loopt |

Per spel staat er **één teken per dag** (dag 0 is 8 oktober 2026). Na een jaar is dat zo'n 400 tekens per spel.

| Teken | Betekenis |
|---|---|
| `.` | Niet gespeeld |
| `1` t/m `9` | Op de dag zelf gelukt, met 1 t/m 9 pogingen, of 1 plus het aantal hints of fouten |
| `A` t/m `I` | Hetzelfde, in de moeilijke stand |
| `0` | Gelukt van vóór de nieuwe spellen (uit je lopende reeks) |
| `x` / `X` | Niet gelukt (`X`: in de moeilijke stand) |

Reeksen, cijfers en mijlpalen rekent het spel uit die tekens. Een lopend spel (`bezig`) bewaart alleen vandaag.

---

## 8. De REGELS voor het koppelen en de scoreserver

**De REGELS** veranderen letterlijk hetzelfde in het gedeelde blok en in de scoreserver.

Er komt één nieuwe regel bij, `woordDagen`: per dag telt de eerste uitslag, en een `0` van vóór de nieuwe spellen maakt plaats voor een echte uitslag.

| Spel | Wat er per veld gebeurt |
|---|---|
| Alle vier de nieuwe sleutels | `d` (de uitslagen per dag) met `woordDagen` |
| | `bezig` is lopend: de laatste versie wint |
| | `inst` is een keuze |
| `cryptisch-v1` | De school gaat samen: wat je op een van de twee apparaten deed, blijft |
| `MAAT` (alle vier) | Dagen gelukt, dan dagen gespeeld |

Geen geld en geen spullen, dus samenvoegen is veilig. Ik test het met twee en drie apparaten, en met een oud apparaat.

**De scoreserver, versie 2026-11-06**, gebouwd op 2026-11-05b. Ik lever hem als volledig bestand:
- **Drie nieuwe borden in `SPELLEN`**: `cryptisch`, `letterval` en `klinker`. Score = je beste reeks, extra = het aantal keer zonder hint of fout. De grens is 5.000, want een reeks groeit hooguit één per dag.
- **De nieuwe REGELS**, en de vier sleutels in `TIJD_SPEL` (dan kun je ze ook terugzetten met de tijdmachine). `BLOK_NU` gaat naar 10.
- **"Sneller dan x%"**: `POST /woord/tijd` en `GET /woord/dag`, net zo gebouwd als `/kroon/tijd`.
  - Wat er bewaard wordt: alleen het spel, de dag en de waarde. Geen naam en geen apparaatnummer.
  - Elk apparaat telt één keer per spel per dag, met hooguit 6 per adres per dag.
  - Het wordt 28 dagen bewaard. De noodknop `scores` zet het dicht.
- `/status` zegt `woorden: 1`. De spellen sturen pas iets als de server dat zegt.

**De spellen gaan pas online als die versie in Cloudflare staat.**

---

## 9. Bouwvolgorde

1. **De scoreserver.** Jij zet hem in Cloudflare.
2. **Rommelwoord**: de lengtes, de moeilijke stand en de uitleg bij de woorden, plus de kaart op de homepage en het strookje onderaan.
3. **Cryptisch**, met de school.
4. **Letterval.**
5. **Klinkermijnen.**
6. **De hele voorraad**, per spel minstens een jaar. Ik maak hem en kijk hem na zoals in §5, met een blinde oplosser per omschrijving.
7. **Alles testen.** Ik laat je vóór elke commit zien wat erin gaat.

---

## 10. Nog vier vragen

1. **Terugblik**: oude puzzels kun je niet meer spelen. Wil je dat je ze nog wel kunt **bekijken**, met de oplossing en de uitleg? Mijn advies: ja, alleen kijken.
2. **Oefenen in Rommelwoord**: willekeurige woorden, die niet meetellen en geen puzzel van de dag zijn. Houden of weglaten? Mijn advies: houden. De Cryptoschool heeft vaste oefeningen; die blijven sowieso.
3. **Moeilijkheid van Cryptisch**: is de mix van de twintig goed, met 10 en 15 als de lastigste? Of wil je ze nog moeilijker?
4. **De stijlen**: wat vind je van de drie proefpagina's?

---

## 11. Antwoorden en uitleg van de twintig

| # | Antwoord | Soort | Par | Zo werkt hij |
|---|---|---|---|---|
| 1 | STEMVORK | stukjes | 3 | Bij verkiezingen breng je een STEM uit, en een VORK is een stuk bestek. Een stemvork geeft het koor de A. |
| 2 | SCHAAR | cryptisch | 2 | Door het lint gaan is woedend worden. Bij een opening knipt de schaar letterlijk door het lint. |
| 3 | PREEKSTOEL | cryptisch | 2 | Het hoogste woord hebben is overal bovenuit praten. Op de preekstoel staat de dominee letterlijk het hoogst. |
| 4 | RAMEN | twee betekenissen | 2 | Schatten (hoeveel iets kost) is ramen, en in een gevel zitten ramen. |
| 5 | VORST | twee betekenissen | 1 | Vorst is strenge kou, en een vorst is een heerser. |
| 6 | STAM | twee betekenissen | 2 | Een volksstam, en de stam van een boom in het bos. |
| 7 | ROZE | verstopt en achterstevoren | 3 | DE ZORGEN achterstevoren is NEGROZED, en daarin staat ROZE: de kleur van een biggetje. |
| 8 | ONWEER | stukjes met afkortingen | 3 | O (oost) en N (noord), met daarachter WEER (opnieuw). Als er onweer in de lucht hangt, komt er ruzie of een bui. |
| 9 | BOOT | eromheen | 3 | 'De boot missen' is een kans laten lopen. BOT (een platvisje) om de O (oosten). |
| 10 | NACHTEGAAL | stukjes | 3 | Als het donker is, is het NACHT, en helemaal vlak is EGAAL. Een nachtegaal zingt in het bos (geen mens). |
| 11 | KASTEEL | stukjes | 3 | Tomaten groeien in een KAS, en 'ik teel' is ik kweek. Daar woont de prinses. |
| 12 | OPTOCHT | stukjes | 2 | Uitgeput is OP, een reis is een TOCHT. Met carnaval loop je erin mee. |
| 13 | PEER | eraf | 2 | Een werpspies is een SPEER. Zonder kop blijft PEER over. |
| 14 | RAUW | klinkt als | 3 | Verdriet om een dode is ROUW, en dat klinkt als RAUW: nog niet gaar. |
| 15 | KERSTBOOM | anagram en stukje | 3 | STERK door elkaar is KERST, een eik is bijvoorbeeld een BOOM. Daar hangen de ballen in (geen voetballen). |
| 16 | DASHOND | stukjes, met een vertaling | 2 | 'Het' in het Duits is DAS, een blaffer is een HOND. Een dashond is een worstje op pootjes. |
| 17 | SPOOK | stukjes met een afkorting | 2 | Een seconde is een S, en die komt voor de POOK. Een spook waart rond op zolder. |
| 18 | ATLAS | verstopt | 2 | In dAT LASTige staat ATLAS, over de spatie heen: een boek vol kaarten. |
| 19 | KERN | om en om | 2 | Om en om uit KLEUREN: K-E-R-N. Het hart van de zaak. |
| 20 | VAKANTIE | anagram | 2 | NIET VAAK, opnieuw geregeld, geeft VAKANTIE: de zomerreis. |

Deze twintig staan nu in dit plan, dat openbaar op GitHub staat. Daarom komen ze in de Cryptoschool, en worden het nooit puzzels van de dag.

Over de logica achter de omschrijvingen: [Minute Cryptic, How to Play](https://www.minutecryptic.com/guide). Ik heb daaruit alleen de regels gehaald, geen omschrijvingen of teksten.
