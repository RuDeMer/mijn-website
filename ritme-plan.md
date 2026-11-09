# Rommelritme: meer pit (plan, 9 november 2026)

Ruben vroeg om een flinke upgrade van de graphics en veel meer pit, zonder dat de records iets anders gaan betekenen. Dit is het plan. Pas als Ruben het goedkeurt, ga ik bouwen.

## Wat ik zag (speelronde en meting)

- Ik heb alle levels laten spelen door een robot die precies op de bedoelde tellen springt (zoals de levelbouwer), op computer- en telefoonformaat.
- Het spel werkt goed, maar ziet er kaal uit: een paarse lucht met lijnvierkantjes, een streep als grond, en op een staande telefoon is driekwart van het scherm leeg.
- Elke sprong voelt hetzelfde: er gebeurt niets als je precies op de maat springt.
- Gemeten (Chromium, met het tekenen meegeteld): **2,5 ms per beeld op een computer** en **12,5 ms op een telefoon** (4 keer vertraagde processor). Het duurst zijn de gloed-effecten (`shadowBlur`) en het verloop over het hele scherm.

## Belangrijk vooraf: in Rommelritme tik je niet op noten, je springt

Rommelritme is geen spel waarin noten op je af komen, maar een platformspel op de maat: je blokje rent vanzelf, en elke sprong hoort op een tel van de muziek. De levelbouwer weet precies wanneer elke sprong bedoeld is (`L.invoer`). Daarom vertaal ik de wensen zo:

| Wens | In Rommelritme |
|---|---|
| een goede tik | een sprong (of een springring) die op de bedoelde tel valt |
| Perfect! | je sprong valt binnen **30 ms** van de bedoelde tel; **Goed!** binnen 70 ms; **Net!** daarbuiten maar wel gehaald |
| een gemiste noot | een bedoelde sprong die je niet maakte (en je leeft nog), of een springring die je liet liggen: een kort, laag geluidje en een rood tikje op die plek |
| combo | het aantal bedoelde sprongen op rij met Perfect of Goed |
| lange noten | de raketstukken (en ingedrukt houden): het spoor van je blokje of raketje gloeit zolang je vasthoudt, en uit de poort komen geeft "Doorgevlogen!" |
| noten met een spoor | de spijkers, ringen en kussens krijgen een lichtspoor en pulseren op de maat; je blokje trekt een lichtstreep |

Er komen **geen hulplijntjes die laten zien waar je moet springen**: dat zou het spel makkelijker maken, en dan betekenen de records niets meer.

## Wat er verandert

### 1. Een eigen wereld per level, die meebeweegt met de muziek

Alles getekend in lagen die op verschillende snelheden meeschuiven (diepte), en die reageren op de beat: een `AnalyserNode` meet hoe hard de bas, het midden en de hoge tonen klinken, en het spel weet bovendien precies wanneer elke kick, clap en elk refrein komt (die plant de muziek zelf in). Zonder muziek pulseert alles gewoon op de tel.

- **Zoldertrap**: een zolder met schuine balken, een rond dakraam met de maan, gloeilampjes aan snoeren die op de kick opgloeien en zachtjes zwaaien, stofjes in een lichtbundel, dozen en een oude koffer.
- **Kermiskoorts**: een draaiend reuzenrad en een draaimolen met lampjes die op de maat knipperen, gestreepte tenten, slingers met lampjes boven in beeld, ballonnen die opstijgen.
- **Neonnacht**: een neonstad met een gestreepte ondergaande zon, twee lagen gebouwen met ramen, lichtreclames die op de beat aanflitsen, en een lichtgevend raster als vloer.
- **Vastelaovend**: een Limburgs carnaval: vlaggetjes en serpentines in rood, geel en groen, huizen met trapgevels, maskers aan de gevels, en confetti die losbarst op het refrein.
- **Hyperrommel**: een tunnel van lichtringen die op je af raast, sterrenstrepen, en lasers op de drop.
- **Rommelstorm**: donkere wolken in lagen, regen, bliksem op de zware momenten, en rommel die voorbij waait (een sok, een stoel, een emmer).

Het blokje zelf krijgt een glimmer randje, een gezichtje dat reageert (knippert, kijkt blij bij een combo), en de grond een eigen tegelpatroon per wereld.

### 2. Raak voelen

- **Elke goede sprong**: een kringetje vonkjes, een lichtflits op de baan onder je blokje, en een woordje met een eigen animatie: **Perfect!** (springt groot op en spat uiteen), **Goed!** (wipt op), **Net!** (klein).
- **Combo**: de teller loopt op met een tikje. Bij 10 op rij gaat de baan gloeien, bij 25 komen er vlammetjes achter je blokje, bij 50 schiet er een kleurgolf door de wereld. Vanaf 10 schudt de camera heel zacht mee op de kick (hooguit een paar pixels, zodat het springen er niet moeilijker van wordt).
- **Gemist**: een kort, laag geluidje, een rood tikje op de plek, en de combo is weg.
- **Doodgaan**: je blokje spat in stukjes, met een kort schokje, zonder harde witte flits.
- **Nieuw record** (je verst gekomen procent) krijgt een banner die met een klap in beeld komt, in plaats van het kleine meldinkje.

### 3. Een spectaculair eind

Als je een level haalt: een uitslag waarin de getallen oplopen (procenten, Perfect, Goed, Net, Gemist, langste combo, pogingen), en dan een **beoordeling** die met een klap als stempel op het scherm komt, uit je ritmescore (Perfect telt voor 1, Goed voor 0,6):

| Ritmescore | Stempel |
|---|---|
| 95 en hoger | Ritmekoning |
| 85 tot 95 | Swingend |
| 70 tot 85 | Strak |
| 50 tot 70 | In de maat |
| onder 50 | Gehaald! |

Bij een nieuwe beste beoordeling of een nieuwe langste combo een feestje met confetti en een eigen deuntje. In het levelmenu zie je per level je beste stempel en langste combo.

### 4. Twee nieuwe instellingen (knop Instellingen in het menu)

- **Beeld: Zuinig, Normaal of Mooi**, met **Automatisch** als standaard. Automatisch kijkt naar het apparaat (een telefoon met weinig kernen of geheugen begint op Zuinig) en zakt vanzelf een stand als het tekenen het niet bijhoudt, maar alleen tussen twee pogingen in, nooit midden in een sprong.
- **Vertraging van je scherm of koptelefoon** (bijvoorbeeld bij een Bluetooth-koptelefoon): een korte proef "tik mee op de tik", die de vertraging uitmeet, en een schuifje (van −50 tot +300 ms). Standaard 0, dus precies zoals nu. Wat het doet: het spel loopt dan zoveel later dan de geluidskaart, zodat wat je ziet en wat je hoort weer gelijk zijn. De sprongen en spijkers veranderen niet, dus het maakt niets makkelijker.

Beide staan per apparaat in `rommelritme-apparaat` (net als `rommelland-apparaat`), bewust niet bij het koppelen: de vertraging hoort bij het apparaat en de koptelefoon, niet bij jou.

## Wat er níet verandert (de records blijven eerlijk)

- **De motor blijft letter voor letter hetzelfde** (`// Rommelritme: de motor`: de natuurkunde, de levels, waar de spijkers staan). De muziek blijft ook hetzelfde.
- **Hoe je invoer bij de motor komt blijft hetzelfde** (de spellus en de klok van de geluidskaart). Alles wat nieuw is, kijkt alleen mee en verandert niets aan de stand van je blokje.
- **Het record blijft je verst gekomen procent per level**, en het scorebord de som daarvan (hooguit 600).
- **Test**: ik knip de motor uit de oude en de nieuwe pagina en laat ze dezelfde duizenden tikreeksen spelen (dezelfde uitkomst, tot op de laatste decimaal), en in een browser speel ik met een nagemaakte klok dezelfde toetsaanslagen in de oude en de nieuwe pagina: elk beeld moet dezelfde plek, dezelfde dood en hetzelfde procent geven.
- **Geen animatie mag de timing laten haperen**: het zware werk (de wereld vooraf tekenen) gebeurt bij het starten van een level, en het verloop van een poging tekent alleen nog kleine dingen. Op schermen van 120 Hz tekenen Zuinig en Normaal elk tweede beeld, maar het spel kijkt nog steeds elk beeld naar je invoer (dus de timing blijft gelijk, en een MacBook blijft koeler).
- Bij **prefers-reduced-motion** schudt er niets, zijn er geen flitsen, bewegen de wereld en de effecten rustig, en komen de stempels zonder klap.

## Sneller, niet trager

- Geen `shadowBlur` meer: gloed komt uit kleine plaatjes die één keer gemaakt worden.
- De achtergrondlagen worden één keer getekend (bij het starten van een level) en daarna alleen nog verschoven door de browser zelf (als losse lagen achter het speelveld), zodat ze bijna niets kosten.
- Doel: Normaal is op telefoon en computer **niet trager dan nu** (nu 2,5 ms en 12,5 ms), en Zuinig duidelijk sneller. Ik meet het vóór en na, op computer- en telefoonformaat, en zet de getallen in de overdracht.

## Opslag, koppelen en de scoreserver

- `rommelritme-v1` blijft zoals hij is (`best`, `pogingen`, `gehaald`, `geluid`, `voortgangTotaal`), met twee velden erbij: `combo` (per level je langste combo) en `ritme` (per level je beste ritmescore, 0 tot 100). Alleen bij een gewone poging (niet bij oefenen), en de ritmescore alleen als je het level haalt.
- In de REGELS voor het koppelen: `combo: elk(max)` en `ritme: elk(max)`, in het gedeelde blok (alle pagina's tegelijk) **en** in de scoreserver.
- **Daarvoor heb ik de scoreserver nodig die nu in Cloudflare draait (versie 2026-11-10).** Plak die alsjeblieft, dan lever ik versie 2026-11-11 als volledig bestand. De pagina gaat pas online als die in Cloudflare staat. Het scorebord zelf verandert niet (geen nieuwe grens nodig, zolang er geen levels bij komen).

## Een keuze voor Ruben: nieuwe levels?

- **A (mijn voorstel): nu geen nieuwe levels**, alle aandacht naar de zes werelden en het gevoel. Dan blijft het scorebord precies zoals het is.
- **B: twee nieuwe levels erbij** (bijvoorbeeld een rustig level om in te komen en een heel zwaar eindlevel, met eigen muziek en wereld, nagerekend met de robot). Dan moet de grens van `ritme` in de scoreserver eerst van 600 naar 800, en gaan het scorebord ("van 800%"), de homepage en de werkplaats mee. Je oude som blijft dan staan, maar het maximum wordt hoger.

## Daarna: Vouwvlieger

Als Rommelritme klaar en gecommit is, maak ik een eigen plan voor Vouwvlieger (dat spel is nu op een telefoon flink traag: 63 ms per beeld bij een 4 keer vertraagde processor, dus daar valt veel te winnen).
