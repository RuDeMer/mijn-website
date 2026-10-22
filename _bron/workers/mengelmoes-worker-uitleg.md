# De drukpers van Mengelmoes online zetten

Mengelmoes heeft een eigen 'drukpers' nodig: een kleine server bij Cloudflare die bedenkt wat er uit twee stickers komt. Hij onthoudt dat ook voorgoed, zodat iedereen hetzelfde antwoord krijgt.

Die server bestaat uit drie delen:

| Onderdeel | Wat het doet |
|---|---|
| **Worker** `mengelmoes` | Het programma zelf (het bestand `mengelmoes-worker.js`). |
| **D1-database** `mengelmoes` | Het geheugen: alle combinaties, wie iets als eerste maakte, en de blokkades. |
| **Workers AI** | De AI die nieuwe combinaties bedenkt. Je hebt er geen sleutel voor nodig. |

Je Cloudflare-account heb je al (daar draait ook je scorebord). Het kost ongeveer een kwartier. Je hoeft niets te installeren: alles gaat in je browser, op dash.cloudflare.com.

> **Let op:** `mengelmoes-worker.js` hoort bij Cloudflare, niet op de site. Zet hem dus niet in GitHub of de werkplaats. Er staan geen geheimen in, maar hij is niet voor bezoekers bedoeld.
>
> Cloudflare is in het Engels. De knoppen hieronder staan daarom tussen aanhalingstekens, precies zoals je ze ziet. Ziet een scherm er net iets anders uit? Zoek dan naar hetzelfde woord.

---

## Stap 1. Maak de database

1. Ga naar **dash.cloudflare.com** en log in.
2. Kies in het menu links **"Storage & databases"** en dan **"D1 SQL database"**.
3. Klik op **"Create database"** (soms heet de knop "Create").
4. Vul als naam in: `mengelmoes`. Laat de rest staan en klik op **"Create"**.

De tabellen hoef je niet zelf te maken: dat doet de worker vanzelf bij het eerste bezoek.

## Stap 2. Maak de worker

1. Kies in het menu links **"Workers & Pages"**.
2. Klik op **"Create"** (of "Create application") en kies **"Create Worker"** of **"Start with Hello World!"**.
3. Geef hem de naam `mengelmoes`. Dan wordt het adres **`https://mengelmoes.rubendm.workers.dev`**, en dat adres verwacht het spel ook.
4. Klik op **"Deploy"**. Er staat nu een voorbeeldworker die "Hello World" zegt.
5. Klik op **"Edit code"**.
6. Gooi alle code in het linkerdeel weg (Ctrl+A en Delete).
7. Open `mengelmoes-worker.js` op je computer, kopieer alles (Ctrl+A en Ctrl+C), en plak het in Cloudflare (Ctrl+V).
8. Klik rechtsboven op **"Deploy"**.

Kies je toch een andere naam dan `mengelmoes`? Dan moet het spel het nieuwe adres weten. Laat Claude dan in `instellingen.json` de regel `"mengelmoesUrl": "https://<jouw-naam>.rubendm.workers.dev"` toevoegen.

## Stap 3. Koppel de database en de AI aan de worker

Ga terug naar je worker. Kies **"Workers & Pages"**, klik op `mengelmoes`, en open het tabblad **"Settings"**. Zoek het blok **"Bindings"** en klik op **"Add binding"** (of "Add").

**De database:**
1. Kies **"D1 database"**.
2. Bij **"Variable name"** vul je precies in: `DB` (twee hoofdletters).
3. Kies bij de database `mengelmoes`.
4. Klik op **"Add binding"** of **"Save"**.

**De AI:**
1. Klik nog een keer op **"Add binding"**.
2. Kies **"Workers AI"**.
3. Bij **"Variable name"** vul je precies in: `AI`.
4. Klik op **"Add binding"** of **"Save"**.

## Stap 4. Je beheerwachtwoord (een geheim)

Met dit wachtwoord kun je later combinaties bekijken, aanpassen of verwijderen, en namen blokkeren.

1. Blijf in **"Settings"** en zoek **"Variables and Secrets"**. Klik op **"Add"**.
2. Bij **"Type"** kies je **"Secret"**. Dat is belangrijk: dan kan niemand het wachtwoord teruglezen.
3. Bij **"Variable name"** vul je in: `BEHEER`.
4. Bij **"Value"** vul je een wachtwoord in van **minstens 12 tekens**. Neem een ander wachtwoord dan voor je scorebord, bijvoorbeeld een zinnetje als `paarse-drukpers-leest-boeken-42`.
5. Klik op **"Deploy"** of **"Save"**.

Zet dit wachtwoord nooit in GitHub, de werkplaats of een bestand van je site.

## Stap 5 (mag je overslaan). Extra instellingen

Dit zijn gewone variabelen, dus bij **"Type"** kies je **"Text"**:

| Naam | Waarde | Wat het doet |
|---|---|---|
| `AI_PER_DAG` | `1000` (standaard) | Hoeveel nieuwe combinaties de AI per dag mag bedenken, voor alle spelers samen. 1000 past ruim in de gratis ruimte. |
| `AI_MODEL` | `@cf/google/gemma-4-26b-a4b-it` (standaard) | Welk AI-model nieuwe dingen bedenkt. |
| `AI_RESERVE` | `@cf/mistralai/mistral-small-3.1-24b-instruct` (standaard) | Het reservemodel, voor als het eerste model twee keer een onbruikbaar antwoord geeft. |
| `LIMIET_IP_MINUUT` | `300` (standaard) | Hoeveel verzoeken per minuut er vanaf één internetadres mogen komen. Een hele klas op één schoolnetwerk deelt één adres. |

## Stap 6. Testen

1. Open in je browser **`https://mengelmoes.rubendm.workers.dev/`**. Je hoort dit te zien: `{"ok":true,"naam":"mengelmoes-worker","versie":"2026-10-20"}`.
2. Open **`https://mengelmoes.rubendm.workers.dev/status`**. Je ziet dan `Deze drukpers werkt alleen op rubensrommelhoekje.nl.` Dat klopt: de worker werkt alleen voor je eigen site.
3. Staat `mengelmoes.html` op je site? Open het spel en laat **Water** op **Vuur** vallen. Ben je de eerste? Dan krijg je een stempel **"1e druk!"**.
4. Probeer daarna een combinatie die niet in het receptenboek staat, bijvoorbeeld **Stoom** op **Lava**. Na een paar tellen denken komt er iets nieuws uit. Dat bedacht de AI.

Werkt het niet? Kijk dan bij **"Wat als het niet werkt?"** onderaan.

## Stap 7. Beheer: combinaties bekijken, aanpassen, verwijderen en namen blokkeren

Open **`https://www.rubensrommelhoekje.nl/mengelmoes.html#beheer`** en vul je beheerwachtwoord in (het geheim `BEHEER` uit stap 4). Het wachtwoord blijft alleen in dit tabblad bewaard, en gaat weg als je het tabblad sluit.

- **Overzicht**: hoeveel elementen en combinaties er zijn, en hoeveel AI-vragen er vandaag al gesteld zijn.
- **AI aan/uit**: zet de AI uit als er iets raars gebeurt. Bekende combinaties en het receptenboek werken dan gewoon door.
- **Combinatie bekijken of aanpassen**: vul twee namen in (bijvoorbeeld `Stoom` en `Lava`) en klik op Zoek. Je ziet de uitkomst, waar die vandaan komt (`boek`, `ai`, `standaard` of `beheer`), en wanneer hij gemaakt is. Je kunt een nieuwe uitkomst invullen (1 tot 3 woorden en één emoji) of de combinatie verwijderen. Na verwijderen krijgt de volgende speler een nieuw antwoord.
- **Een naam blokkeren**: is er toch een naam doorgekomen die je niet wilt? Blokkeer hem. De combinaties die hem maakten worden weggehaald, en bij spelers verdwijnt de sticker uit beeld. Wie daarna opnieuw combineert, krijgt een nieuw antwoord.
- **Laatst bedacht**: de 30 nieuwste combinaties. Kijk daar af en toe even naar.

Typ je 8 keer het verkeerde wachtwoord, dan is je internetadres een kwartier geblokkeerd. Zo kan niemand je wachtwoord raden.

---

## Wat kost het?

Voor een site als de jouwe meestal **niets**.

| Onderdeel | Gratis per dag | Hoeveel gebruikt Mengelmoes? |
|---|---|---|
| Worker | 100.000 verzoeken | Eén verzoek per combinatie. |
| D1-database | 5 miljoen keer lezen, 100.000 keer schrijven, 5 GB | Een bekende combinatie leest een paar keer. Alleen nieuwe combinaties schrijven. |
| Workers AI | 10.000 'neurons' | Een nieuwe combinatie kost ongeveer 7 tot 15 neurons (de AI bedenkt iets, en een tweede AI-vraag controleert of het geschikt is). Dat zijn dus zo'n 700 tot 1.400 nieuwe combinaties per dag gratis. |

- Een combinatie die al eens gemaakt is, kost **nooit** AI. Die komt uit de database. Het receptenboek (ongeveer 340 handgemaakte combinaties) kost ook geen AI.
- Is de gratis AI-ruimte van de dag op, dan zien spelers: *"De drukpers heeft vandaag al heel veel nieuwe dingen bedacht en is moe. Morgen kan het weer!"* Bekende combinaties werken gewoon. Om middernacht (Engelse tijd) begint de teller opnieuw.
- Wil je meer? Met het betaalde plan van Cloudflare (**Workers Paid, $5 per maand**) betaal je daarboven ongeveer **$0,011 per 1.000 neurons**. Dat is ongeveer **1 cent per 100 nieuwe combinaties**. Zet `AI_PER_DAG` dan bijvoorbeeld op `5000`: dat kost hooguit zo'n 40 tot 80 cent per dag, en meestal veel minder.

## Tweede keus: Claude van Anthropic in plaats van Workers AI

Dit hoeft niet. Het spel werkt prima met Workers AI. Wil je toch Claude:

1. Maak op **console.anthropic.com** een account, en zet er vooraf tegoed op (minimaal $5).
2. Maak daar bij **"API keys"** een sleutel aan. Die begint met `sk-ant-`.
3. Zet in je worker bij "Variables and Secrets":
   - een **Secret** `ANTHROPIC_KEY` met je sleutel;
   - een **Text** `AI_AANBIEDER` met de waarde `anthropic`;
   - een **Text** `CLAUDE_MODEL` met de waarde `claude-haiku-5-5`. Dat model is snel en goedkoop: ongeveer 0,01 tot 0,02 cent per nieuwe combinatie. Laat je `CLAUDE_MODEL` weg, dan gebruikt de worker `claude-opus-5-5`, het slimste model. Dat is ongeveer 40 keer zo duur (zo'n 0,5 tot 1 cent per combinatie) en voor dit spel niet nodig.
4. Klik op **"Deploy"**. Terug naar Workers AI? Haal `AI_AANBIEDER` weg.

## Wat als het niet werkt?

| Wat zie je? | Wat is er aan de hand? |
|---|---|
| In het spel: "Zonder verbinding kent de pers alleen het receptenboek." | Het spel kan de worker niet bereiken. Klopt het adres (stap 2)? Staat de worker op "Deploy"? |
| `De D1-database (binding DB) is nog niet gekoppeld.` | Stap 3: de binding moet precies `DB` heten. |
| In het spel: "De denkmachine staat even uit." | De AI-binding mist (stap 3, de naam moet `AI` zijn), of je hebt de AI uitgezet in het beheer. |
| In het spel: "De pers hapert even." | De AI gaf een fout. Probeer het over een minuut opnieuw. Gebeurt het steeds? Kijk dan bij je worker op het tabblad **"Logs"** (of "Observability") wat er staat. |
| Beheer: `Stel in Cloudflare eerst het geheim BEHEER in` | Stap 4: het geheim mist, of is korter dan 12 tekens. |
| Beheer: `Verkeerd beheerwachtwoord.` | Let op hoofdletters en spaties. Vergeten? Maak bij stap 4 gewoon een nieuw wachtwoord. |
| `Deze drukpers werkt alleen op rubensrommelhoekje.nl.` | Normaal als je de worker los opent. Zie je dit in het spel zelf, dan draait het spel op een ander adres. Dat adres kun je toestaan met een Text-variabele `ORIGINS` (meerdere adressen met komma's ertussen). |

## Een nieuwe versie van de worker

Krijg je later een nieuwe `mengelmoes-worker.js`? Doe dan stap 2 vanaf punt 5 opnieuw: **"Edit code"**, alles vervangen, **"Deploy"**. De database, de koppelingen en je wachtwoord blijven gewoon staan.

## Een reservekopie

Cloudflare bewaart vanzelf 30 dagen geschiedenis van je D1-database ("Time Travel"). Zie je bij je database in **"Storage & databases"** → **"D1"** → `mengelmoes` een knop **"Export"**, dan kun je ook zelf een kopie downloaden.
