# Plan: Helpdesk Hopeloos

Uit de ideeënbox: je speelt een oplichter die via de app ouderen probeert op te lichten. Elk gesprek zijn ze slimmer, en uiteindelijk lichten zíj jóu op. **De grap ligt altijd bij de oplichter, nooit bij de ouderen.**

**Bijgewerkt op 8 november 2026**, na Ruben's eerste speelronde: "natuurlijker en realistischer, alsof het een echt gesprek is, realistische namen, en realistischere foto's met meer detail". Ruben koos:

- **Herkenbaar, zonder trucjes**: Dennis zegt dingen die je kent uit waarschuwingen (een probleem met je rekening, haast, geheimzinnig doen), maar vraagt **nooit** om codes, gegevens, links, overmaken of ophalen. Op het moment dat hij iets concreets zou vragen ("Eerst…"), wordt hij onderbroken.
- **Ze trappen er bijna in**: een gesprek is "gehaald" als de klant bijna begint, en dan komt er iemand tussen (een kleindochter, de buschauffeur, een schriftje). Niemand raakt iets kwijt.
- **Euro's, met "spelgeld" erbij**.
- **De Duinbank en Dennis van Dam** (verzonnen; de Duinbank bestaat niet).

## Hoe het speelt

- **De telefoon van Dennis**, met een eigen berichtenapp (**Kwebbel**, een eigen ontwerp): een vergrendelscherm met duinen als beginscherm (met een melding van de klant die aan de beurt is), een lijst met chats, en de chat zelf: tijden, vinkjes die blauw worden als het bericht gelezen is, "typt…", "stuurt een foto…", spraakberichten (met de tekst erbij), foto's (groot te bekijken) en een profiel per klant. Op een computer staat naast de telefoon een spelkaart met het vertrouwen en de sterren; op een telefoon vult de app het hele scherm.
- **Je kiest uit drie of vier antwoorden**; het antwoord wordt in het invoerveld getypt en verstuurd. Met de toetsen 1 tot 4 kan ook. Tik op het gesprek, dan staat het berichtje er meteen.
- **Vertrouwen**: zakt het naar nul, dan haakt de klant af. **Rode vlaggen** (haast, geheimzinnig doen, raar praten) staan als vlaggetje bij je bericht: dat zijn precies de echte waarschuwingssignalen.
- **Sterren per gesprek**: bijna gelukt, snel (binnen een aantal beurten) en zonder rode vlag. Tien gesprekken, dus hooguit 30 sterren.
- **Schermafbeeldingen**: elk grappig antwoord en elk einde (ook de mislukte en de geheime) komt erin.
- **Na elk gesprek**: wat de klant goed deed, en een knop naar de echte waarschuwingssignalen.
- Bovenaan elk gesprek staat: "Alles in dit gesprek is verzonnen, en bedragen zijn spelgeld."

## De klanten

Verzonnen, met realistische namen en een eigen portret. Slim, eigenwijs en grappig. **Geen grappen over vergeetachtigheid, eenzaamheid, ziekte of andere kwetsbaarheden.**

| Gesprek | Wie | Karakter | Wie of wat er tussenkomt |
|---|---|---|---|
| 1 | **Harm Veldkamp** (af) | Ondertekent elk berichtje met "Mvg Harm Veldkamp", pakt eerst zijn leesbril, stuurt per ongeluk een foto van het plafond | Kleindochter Sanne komt binnen |
| 2 | **Riet Hendriks** (af) | Net terug van de busreis naar de Ardennen, met foto's van de waterval, de grot en de soep | Buschauffeur Ton belt, of de groepsapp |
| 3 | **G. Pelgrim** (af) | Oud-boekhouder, rekent alles na tot op de cent, en schrijft alles op in zijn schriftje | Wil alles eerst op papier, met een handtekening |
| 4 | **Annie Kuipers** (af) | Vraagt alles aan haar kleinzoon Jesse | Jesse stelt via oma steeds slimmere vragen |
| 5 | **Gonnie Verbeek** (af) | Quizkampioen van het buurthuis | Beantwoordt alles met een wedervraag |
| 6 | **Wim Hoekstra** (af) | "Ik bel even terug, met het nummer op mijn pas" | Dennis moet zich eruit kletsen |
| 7 | **C. Bakhuizen** (af) | Wil bewijs: een foto van je pasje, een handtekening van de directeur | Het "bewijs" wordt steeds slechter |
| 8 | **Jan & Ans de Wit** (af) | Samen achter één telefoon, het nooit met elkaar eens | Twee meningen tegelijk |
| 9 | **B. Verhoef**, oud-rechercheur (af) | Heeft het in zijn eerste berichtje al door | Hij ondervraagt jóu |
| 10 | **Lies van der Meer** (af) | De liefste van allemaal: "Ach jongen, je klinkt moe" | De wending |

**De wending** (gebouwd): Lies blijkt de baas van het digicafé in het buurthuis. Alle klanten van de vorige gesprekken zijn daar lid, en ze stuurden haar al hun schermafbeeldingen. In het laatste gesprek raakt Dennis alles kwijt: Lies laat hem zijn eigen smoesjes horen, het buurthuis meldt zijn nummer, en Kwebbel blokkeert zijn account. **Het slot** is een groepsapp met alle klanten en de oud-rechercheur, en een vacature voor Dennis: vlaaienbezorger, eerlijk werk.

## Alles verzonnen

- Alleen verzonnen namen: geen echte banken, bedrijven, instanties, telefoonnummers, websites of links (behalve de Fraudehelpdesk bij "Wat je hier leerde").
- Nooit echte, bruikbare trucjes: geen codes of gegevens uitvragen, geen betaalverzoeken, geen links, geen "iemand komt het ophalen", niets over het overnemen van een computer. De test zoekt daar ook naar.

## Wat je hier leerde (na elk gesprek, en bij de instellingen)

Een onbekend nummer dat zegt dat het je bank is; haast; geheimzinnig doen; een bank vraagt nooit om je pincode of inlogcodes, om over te maken naar een "veilige rekening" of om je pas op te halen; bij twijfel stoppen en zelf je bank bellen met het nummer op je pas. Met een link naar de **Fraudehelpdesk**.

## Techniek

- **Eén bestand** `helpdesk.html`, zonder scripts van buiten, met het veiligheidsbeleid van de andere spellen. Alle portretten en foto's zijn eigen tekeningen (SVG, met licht en schaduw, onscherpe achtergronden en korrel).
- **Opbouw**: de gesprekken (`GESPREKKEN`), de motor (`HH`, zonder pagina, in Node te testen), de tekeningen (`TEKEN`) en de weergave.
- **Een test loopt elk pad af**: elk gesprek heeft een einde, geen doodlopende keuzes of lussen, elk berichtje en elk einde is te bereiken, drie sterren zijn te halen, en geen verboden woorden.
- **Bewaren midden in een gesprek**: herlaad je, dan ga je verder waar je was, met dezelfde tijden.
- **Opslag** `helpdesk-v1` (in `SLEUTELS`): per gesprek de beste sterren en de minste beurten, de eindes en grappige antwoorden, een lopend gesprek, het geluid, de typsnelheid en `voortgangTotaal` (30).
- **Koppelen**: een regel in de REGELS (sterren de hoogste, eindes en grappen samen). Er is geen geld, dus samenvoegen is veilig.
- **Scorebord**: spel `helpdesk`, score = alle sterren (hooguit 30), extra = gevonden eindes. Een nieuwe scoreserver (2026-11-09); **de pagina gaat pas online als die in Cloudflare staat**.
- **Homepage**: een eigen icoon, het onderschrift, de voortgang "x van 30 sterren", en een banner.

## Volgorde

1. **Gesprekken 1 tot en met 3** in de nieuwe stijl: door Ruben goedgekeurd op 8 november 2026 ("Ja, maak de andere zeven gesprekken maar").
2. **Gesprekken 4 tot en met 10**, de wending, het slot, de homepage, de banner, het scorebord en de scoreserver 2026-11-09: gebouwd op 8 november 2026. Online zodra de scoreserver in Cloudflare staat.
