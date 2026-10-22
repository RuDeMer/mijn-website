/* ================================================================ MENGELMOES-WORKER
   De drukpers achter mengelmoes.html: een eigen Cloudflare Worker met een eigen D1-database.
   - Dezelfde twee stickers geven altijd hetzelfde antwoord, voor iedereen en in elke volgorde.
     Eerst kijkt de worker in de database, dan in het receptenboek, en pas bij een echt nieuwe combinatie vraagt hij de AI.
     Dat antwoord wordt daarna voorgoed bewaard.
   - Elk antwoord wordt gecontroleerd: de vorm, een eigen woordenlijst en een controle door de AI (geschikt voor kinderen).
   - De worker onthoudt wie een sticker als eerste maakte, als een anoniem, versleuteld apparaatnummer.
   - Alleen rubensrommelhoekje.nl mag hem gebruiken; er zijn limieten per IP-adres, per apparaat en per dag.
   Instellen in Cloudflare (zie mengelmoes-worker-uitleg.md):
     D1-binding  DB          (verplicht)
     AI-binding  AI          (Workers AI)
     geheim      BEHEER      (beheerwachtwoord, minstens 12 tekens)
     variabelen  AI_PER_DAG (standaard 1000), AI_MODEL, AI_RESERVE, ORIGINS (extra adressen, komma-gescheiden), LIMIET_IP_MINUUT (standaard 300)
     tweede keus AI_AANBIEDER=anthropic met het geheim ANTHROPIC_KEY (en eventueel CLAUDE_MODEL)
   Deze worker staat los van scorebord-worker.js en verandert daar niets aan. */

const VERSIE = '2026-10-20b';
const ORIGINS_STANDAARD = ['https://rubensrommelhoekje.nl', 'https://www.rubensrommelhoekje.nl'];
// Gemma 4 is een denkmodel: bij Workers AI gaat zijn ruimte vaak op aan nadenken en komt er geen antwoord (zie Cloudflare's eigen templates).
// Daarom een snel model dat meteen antwoordt.
const MODEL_STANDAARD = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const MODEL_RESERVE = '@cf/mistralai/mistral-small-3.1-24b-instruct';
const CLAUDE_STANDAARD = 'claude-opus-5-5';
// limieten: per minuut in het geheugen van de worker (kost geen database), per dag voor de AI in de database
// (een hele klas op één schoolnetwerk deelt één IP-adres, dus per IP-adres ruimer dan per apparaat)
// aiPerDag 1000: dat past ruim binnen de gratis 10.000 'neurons' per dag van Workers AI (ongeveer 7 tot 15 per nieuwe combinatie)
const LIMIET = { ipMinuut: 300, appMinuut: 60, aiApparaatDag: 150, aiIpDag: 1000, aiPerDag: 1000 };
const BASIS = [['Water', '💧'], ['Vuur', '🔥'], ['Wind', '🌬️'], ['Aarde', '🌍']];

// ================================================================ HET RECEPTENBOEK (hetzelfde boek als in mengelmoes.html)
const BOEK_TEKST = `Water + Water = Zee 🌊
Vuur + Vuur = Zon ☀️
Wind + Wind = Storm 🌪️
Aarde + Aarde = Berg ⛰️
Water + Vuur = Stoom ♨️
Water + Wind = Regen 🌧️
Water + Aarde = Modder 🟫
Vuur + Wind = Rook 💨
Vuur + Aarde = Lava 🌋
Wind + Aarde = Zand ⏳
Stoom + Wind = Wolk ☁️
Stoom + Stoom = Mist 🌫️
Stoom + Aarde = Geiser ⛲
Stoom + Water = Wolk ☁️
Wolk + Wolk = Onweer ⛈️
Wolk + Vuur = Bliksem ⚡
Wolk + Water = Regen 🌧️
Wolk + Wind = Lucht 🌤️
Wolk + Zon = Regenboog 🌈
Onweer + Aarde = Bliksem ⚡
Regen + Zon = Regenboog 🌈
Regen + Regen = Plas 💦
Regen + Aarde = Plant 🌱
Regen + Wind = Storm 🌪️
Plas + Plas = Meer 🏞️
Plas + Water = Meer 🏞️
Zee + Wind = Golf 🏄
Zee + Zand = Strand 🏖️
Zee + Zon = Zout 🧂
Zee + Aarde = Eiland 🏝️
Zee + Vuur = Stoom ♨️
Zee + Steen = Schelp 🐚
Zee + Storm = Orkaan 🌀
Zee + Muur = Dijk 🚧
Zout + Water = Zee 🌊
Lava + Water = Steen 🪨
Lava + Zee = Eiland 🏝️
Lava + Berg = Vulkaan 🗻
Lava + Lava = Vulkaan 🗻
Lava + Wind = Steen 🪨
Berg + Berg = Gebergte 🏔️
Berg + Wind = Kou 🥶
Berg + Vuur = Vulkaan 🗻
Berg + Water = Waterval 🌁
Steen + Steen = Muur 🧱
Steen + Vuur = Metaal 🔩
Steen + Wind = Zand ⏳
Steen + Aarde = Berg ⛰️
Zand + Vuur = Glas 🪟
Zand + Zand = Woestijn 🏜️
Zand + Water = Strand 🏖️
Glas + Zand = Zandloper ⌛
Woestijn + Water = Oase 🌴
Kou + Water = IJs 🧊
Kou + Regen = Sneeuw ❄️
Kou + Wolk = Sneeuw ❄️
Kou + Kou = Winter 🧣
IJs + Wolk = Hagel 🌨️
IJs + Regen = Hagel 🌨️
IJs + Vuur = Water 💧
IJs + Zee = Noordpool 🐻‍❄️
IJs + IJs = Gletsjer 🏂
Sneeuw + Sneeuw = Sneeuwpop ⛄
Sneeuw + Vuur = Water 💧
Sneeuw + Berg = Gebergte 🏔️
Bliksem + Zee = Leven 🧬
Bliksem + Modder = Leven 🧬
Bliksem + Plas = Leven 🧬
Bliksem + Metaal = Stroom 🔌
Bliksem + Zand = Glas 🪟
Plant + Plant = Struik 🌿
Plant + Aarde = Gras 🍃
Plant + Zon = Bloem 🌻
Plant + Water = Algen 🦠
Plant + Stoom = Thee 🍵
Plant + Vuur = Rook 💨
Plant + Modder = Moeras 🪷
Plant + Zee = Zeewier 🥬
Plant + Regen = Gras 🍃
Struik + Plant = Boom 🌳
Struik + Aarde = Aardappel 🥔
Boom + Boom = Bos 🌲
Boom + Wind = Herfst 🍂
Boom + Zon = Fruit 🍎
Boom + Bloem = Fruit 🍎
Boom + Metaal = Bijl 🪓
Boom + Bijl = Hout 🪵
Boom + Gereedschap = Hout 🪵
Boom + Huis = Boomhut 🛖
Bos + Bos = Oerwoud 🐊
Bos + Modder = Paddenstoel 🍄
Bos + Regen = Paddenstoel 🍄
Gras + Gras = Weide 🌼
Gras + Zon = Graan 🌾
Weide + Zon = Graan 🌾
Bloem + Bloem = Tuin 🏡
Bloem + Regen = Tulp 🌷
Bloem + Tijd = Lente 🌸
Tulp + Tulp = Bollenveld 🏵️
Modder + Modder = Klei 🟤
Klei + Vuur = Pot 🏺
Pot + Plant = Kamerplant 🪴
Metaal + Steen = Gereedschap 🔨
Metaal + Metaal = Ketting ⛓️
Metaal + Vuur = Zwaard 🗡️
Metaal + Stoom = Trein 🚂
Metaal + Glas = Bril 👓
Steen + Gereedschap = Wiel 🛞
Hout + Vuur = Kampvuur 🏕️
Hout + Steen = Huis 🏠
Hout + Water = Boot 🛶
Hout + Wind = Fluit 🎵
Hout + Gereedschap = Stoel 🪑
Hout + Stoom = Papier 📄
Hout + Meer = Brug 🌉
Stoel + Stoel = Bank 🛋️
Muur + Muur = Kasteel 🏰
Kasteel + Zand = Zandkasteel 🪣
Strand + Kasteel = Zandkasteel 🪣
Huis + Huis = Dorp 🏘️
Dorp + Dorp = Stad 🏙️
Stad + Stad = Wereldstad 🌆
Huis + Water = Badkamer 🛁
Huis + Bloem = Tuin 🏡
Boot + Wind = Zeilboot ⛵
Boot + Zee = Schip 🚢
Boot + Stroom = Motorboot 🚤
Papier + Papier = Boek 📖
Boek + Boek = Bibliotheek 📚
Papier + Wind = Vlieger 🪁
Leven + Zee = Vis 🐟
Leven + Water = Vis 🐟
Leven + Aarde = Worm 🪱
Leven + Boom = Aap 🐒
Leven + Bos = Hert 🦌
Leven + Wolk = Schaap 🐑
Leven + Gras = Konijn 🐇
Leven + Weide = Koe 🐄
Leven + Bloem = Bij 🐝
Leven + Leven = Liefde ❤️
Leven + Lucht = Vogel 🐦
Leven + Huis = Kat 🐈
Leven + Kaas = Muis 🐭
Leven + Moeras = Mug 🦟
Leven + Plas = Kikker 🐸
Leven + Woestijn = Kameel 🐫
Leven + Steen = Schildpad 🐢
Leven + Oerwoud = Tijger 🐅
Leven + Metaal = Robot 🤖
Leven + Heelal = Alien 👽
Leven + Zand = Slang 🐍
Leven + Nacht = Vleermuis 🦇
Leven + IJs = Pinguïn 🐧
Aap + Gereedschap = Mens 🧑
Aap + Fruit = Banaan 🍌
Mens + Mens = Vrienden 🧑‍🤝‍🧑
Mens + Vuur = Kok 🧑‍🍳
Mens + Steen = Standbeeld 🗿
Mens + Zee = Zwemmer 🏊
Mens + IJs = Schaatser ⛸️
Mens + Sneeuw = Skiër ⛷️
Mens + Boot = Zeeman ⚓
Mens + Koe = Boer 🧑‍🌾
Mens + Graan = Boer 🧑‍🌾
Mens + Computer = Programmeur 🧑‍💻
Mens + Fluit = Lied 🎶
Mens + Paard = Ruiter 🏇
Mens + Zwaard = Ridder 🛡️
Mens + Raket = Astronaut 🧑‍🚀
Mens + Tijd = Opa 👴
Mens + Boek = Leraar 🧑‍🏫
Mens + Fiets = Fietser 🚴
Mens + Bliksem = Superheld 🦸
Mens + Ster = Beroemdheid 🌟
Mens + Nacht = Slaap 😴
Mens + Water = Douche 🚿
Mens + Regen = Paraplu ☂️
Mens + Mist = Spook 👻
Mens + Kasteel = Koning 🤴
Mens + Huis = Familie 👨‍👩‍👧
Mens + Vis = Visser 🎣
Mens + Schip = Piraat 🏴‍☠️
Mens + Robot = Cyborg 🦾
Mens + Lied = Zanger 🧑‍🎤
Mens + Taart = Verjaardag 🥳
Mens + Internet = Gamer 🎮
Mens + Kampvuur = Kamperen ⛺
Mens + Golf = Surfer 🏄‍♂️
Mens + Kou = Snotneus 🤧
Mens + Zon = Zonnebrand 🧴
Mens + Bloem = Boeket 💐
Mens + Lucht = Piloot 🧑‍✈️
Mens + Alien = Buitenaards bezoek 👾
Vrienden + Leven = Hond 🐕
Vrienden + Vrienden = Feest 🎉
Vrienden + Kampvuur = Kamperen ⛺
Hond + Bos = Wolf 🐺
Hond + Hond = Puppy 🐶
Kat + Vis = Blije kat 😺
Kat + Water = Boze kat 😾
Kat + Internet = Kattenfilmpje 📹
Kat + Kat = Kitten 🐱
Kat + Woestijn = Leeuw 🦁
Tijger + Zand = Leeuw 🦁
Koe + Gras = Melk 🥛
Koe + Water = Melk 🥛
Koe + Wind = Paard 🐎
Koe + Weide = Polder 🐮
Dijk + Gras = Polder 🐮
Dijk + Weide = Polder 🐮
Melk + Tijd = Kaas 🧀
Melk + Storm = Boter 🧈
Melk + IJs = IJsje 🍦
Melk + Vuur = Warme melk ☕
Melk + Fruit = Milkshake 🥤
Kaas + Kaas = Kaasmarkt 🛒
Kaas + Brood = Tosti 🥪
Kaas + Heelal = Maan 🌕
Kaas + Vuur = Fondue 🫕
Graan + Steen = Meel 🥣
Meel + Water = Deeg 🫓
Deeg + Vuur = Brood 🍞
Meel + Ei = Pannenkoek 🥞
Meel + Boter = Koekje 🍪
Meel + Fruit = Vlaai 🥧
Deeg + Honing = Stroopwafel 🧇
Brood + Brood = Bakkerij 🥐
Brood + Hagel = Hagelslag 🍫
Vlaai + Vlaai = Taart 🎂
Pannenkoek + Fruit = Taart 🎂
Taart + Vuur = Verjaardag 🥳
Fruit + Vuur = Jam 🫙
Fruit + IJs = Waterijsje 🍧
Fruit + Tijd = Rozijn 🍇
Fruit + Fruit = Fruitmand 🍓
Bij + Bloem = Honing 🍯
Vogel + Vogel = Ei 🥚
Vogel + Water = Eend 🦆
Vogel + Meer = Eend 🦆
Vogel + Metaal = Vliegtuig ✈️
Vogel + IJs = Pinguïn 🐧
Vogel + Nacht = Uil 🦉
Vogel + Oerwoud = Papegaai 🦜
Ei + Vuur = Gebakken ei 🍳
Ei + Lava = Draak 🐉
Ei + Leven = Kuiken 🐣
Ei + Konijn = Paashaas 🧺
Kuiken + Tijd = Kip 🐔
Kip + Kip = Ei 🥚
Kip + Vuur = Kippenpoot 🍗
Vis + Zee = Walvis 🐋
Vis + Glas = Aquarium 🐠
Vis + Vuur = Kibbeling 🍤
Vis + Steen = Krab 🦀
Worm + Bloem = Vlinder 🦋
Paard + Regenboog = Eenhoorn 🦄
Paard + Wiel = Koets 🎠
Mug + Berg = Olifant 🐘
Draak + Ridder = Sprookje 🧚
Ridder + Kasteel = Koning 🤴
Koning + Metaal = Kroon 👑
Koning + Koning = Kroon 👑
Zandloper + Zandloper = Tijd ⏰
Zandloper + Zon = Dag 🌅
Tijd + Zon = Dag 🌅
Tijd + Metaal = Klok 🕰️
Tijd + Steen = Fossiel 🦴
Fossiel + Leven = Dinosaurus 🦕
Dinosaurus + Vuur = Draak 🐉
Dag + Tijd = Nacht 🌙
Dag + Dag = Week 📅
Week + Week = Maand 🗓️
Maand + Maand = Jaar 📆
Nacht + Steen = Maan 🌕
Nacht + Zon = Maan 🌕
Nacht + Ster = Sterrenhemel 🌌
Nacht + Lamp = Lantaarn 🏮
Nacht + Kampvuur = Spookverhaal 📜
Zon + Zon = Ster ⭐
Ster + Ster = Sterrenbeeld ✨
Ster + Wind = Vallende ster 🌠
Sterrenhemel + Sterrenhemel = Heelal 🪐
Aarde + Heelal = Planeet 🌏
Heelal + Metaal = Satelliet 🛰️
Vliegtuig + Heelal = Raket 🚀
Vliegtuig + Ster = Raket 🚀
Raket + Maan = Maanlanding 🌝
Alien + Schip = Ufo 🛸
Alien + Raket = Ufo 🛸
Stroom + Glas = Lamp 💡
Stroom + Metaal = Batterij 🔋
Stroom + Zand = Computer 💻
Computer + Computer = Internet 🌐
Robot + Robot = Fabriek 🏭
Lied + Lied = Concert 🎤
Lied + Stroom = Disco 🪩
Metaal + Lied = Bel 🔔
Fluit + Fluit = Lied 🎶
Vuur + Sterrenhemel = Vuurwerk 🎆
Vuurwerk + Jaar = Oud en nieuw 🎇
Deeg + Oud en nieuw = Oliebol 🍩
Wiel + Wiel = Fiets 🚲
Fiets + Regen = Nederland 🇳🇱
Fiets + Stroom = Scooter 🛵
Wiel + Metaal = Auto 🚗
Auto + Auto = File 🚦
Auto + Huis = Camper 🚐
Auto + Boer = Trekker 🚜
Trein + Trein = Station 🚉
Aardappel + Vuur = Friet 🍟
Friet + Friet = Snackbar 🏪
Aardappel + Storm = Stamppot 🥘
Stamppot + Stamppot = Mengelmoes 🎨
Regenboog + Storm = Mengelmoes 🎨
Spook + Huis = Spookhuis 🏚️
Paraplu + Storm = Kapotte paraplu 🌂
Lente + Zon = Zomer 🕶️
Strand + Zon = Zomer 🕶️
Zomer + Wind = Herfst 🍂
Herfst + Kou = Winter 🧣
Winter + Zon = Lente 🌸
Liefde + Liefde = Bruiloft 💒
Liefde + Kat = Knuffel 🤗
Liefde + Bloem = Boeket 💐
Schaatser + Schaatser = Elfstedentocht 🏆
Rook + Rook = Smog 😷
Rook + Wolk = Smog 😷
Lucht + Vuur = Zon ☀️
Lucht + Water = Regen 🌧️
Zon + Water = Wolk ☁️
Zon + Aarde = Woestijn 🏜️
Zon + Wind = Lucht 🌤️
Zon + Zand = Woestijn 🏜️
Storm + Zand = Woestijn 🏜️
Storm + Wolk = Onweer ⛈️
Storm + Boot = Schipbreuk 🛟
Geiser + Geiser = Warme bron 🫧
Mist + Wind = Wolk ☁️
Oase + Leven = Kameel 🐫
Muur + Water = Dijk 🚧`;
const norm = s => String(s || '').normalize('NFKC').toLocaleLowerCase('nl').trim().replace(/\s+/g, ' ');
const sleutelVan = (a, b) => [norm(a), norm(b)].sort().join('+');
const BOEK = new Map(), BOEK_EL = new Map();
for (const [n, e] of BASIS) BOEK_EL.set(norm(n), { naam: n, emoji: e });
for (const r of BOEK_TEKST.split('\n')) {
  const m = r.match(/^(.+?) \+ (.+?) = (.+) (\S+)$/u); if (!m) continue;
  BOEK.set(sleutelVan(m[1], m[2]), { naam: m[3], emoji: m[4] });
  if (!BOEK_EL.has(norm(m[3]))) BOEK_EL.set(norm(m[3]), { naam: m[3], emoji: m[4] });
}

// ================================================================ DE OPDRACHT AAN DE AI
const SYSTEEM = `Je bent de drukpers van Mengelmoes, een Nederlands combineerspel voor kinderen en volwassenen. Een speler laat twee dingen op elkaar vallen en jij bedenkt wat eruit komt.

Regels:
- Antwoord alleen met JSON in deze vorm: {"naam": "...", "emoji": "..."}. Geen uitleg, geen andere tekst.
- naam: een Nederlands woord of begrip van 1 tot 3 woorden, met een hoofdletter aan het begin, zonder leestekens of cijfers. Gebruik altijd Nederlandse woorden en spelling (Vliegtuig, niet Airplane).
- emoji: precies één emoji die er goed bij past.
- Het resultaat is logisch (wat ontstaat er echt als je deze twee samenvoegt?) of grappig (een woordspeling, een bekende uitdrukking, een bekend ding, een figuur uit een sprookje of verhaal).
- Kies het meest voor de hand liggende, algemeen bekende antwoord. Het mag ook een van de twee dingen zelf zijn, als er niets nieuws ontstaat.
- Geschikt voor kinderen: niets grofs, seksueels, bloederigs, haatdragends of kwetsends, geen scheldwoorden, geen drugs, alcohol of roken.
- Geen namen van echte mensen en geen merknamen. Bekende sprookjesfiguren en verzonnen personages mogen wel.`;
const VOORBEELDEN = [
  ['Water', 'Vuur', '{"naam":"Stoom","emoji":"♨️"}'],
  ['Koe', 'Gras', '{"naam":"Melk","emoji":"🥛"}'],
  ['Mug', 'Berg', '{"naam":"Olifant","emoji":"🐘"}'],
  ['Steen', 'Steen', '{"naam":"Muur","emoji":"🧱"}'],
  ['Fiets', 'Regen', '{"naam":"Nederland","emoji":"🇳🇱"}'],
];
const KEURDER = `Je controleert namen voor Mengelmoes, een combineerspel voor kinderen vanaf 6 jaar. Je krijgt één naam. Is die geschikt?
Antwoord alleen met JSON: {"ok": true} of {"ok": false, "reden": "..."} met als reden een van: grof, seksueel, haat, kwetsend, geweld, drugs, persoon.
Niet geschikt: scheldwoorden en grove taal (ook verstopt, afgekort of expres verkeerd gespeld), alles wat seksueel is, haat of discriminatie tegen een groep mensen, iets waarmee je iemand kunt pesten of kwetsen, bloederig of gruwelijk geweld, drugs, alcohol en roken, en namen van echte mensen (gewone mensen, en ook levende bekende mensen).
Wel geschikt: gewone dingen, dieren, eten, natuur, beroepen, fantasie, sprookjesfiguren, verzonnen personages, zeer bekende historische figuren, en kinderlijke grapjes zoals Poep, Scheet of Snot. Woorden als Zwaard, Draak, Spook of Piraat zijn ook prima.`;

// ================================================================ CONTROLE VAN NAMEN: vorm, woordenlijst, privépersonen
const VERVANG = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '8': 'b', '@': 'a', '$': 's', '€': 'e', '!': 'i', '|': 'i', '+': 't' };
// voor de woordenlijst: kleine letters, zonder accenten, cijfertrucjes terug naar letters, dubbele letters enkel
const kaal = s => norm(s).normalize('NFD').replace(/\p{M}/gu, '').replace(/[013457 8@$€!|+]/g, c => (c === ' ' ? ' ' : VERVANG[c] || c)).replace(/[^a-z ]/g, '').replace(/(.)\1+/g, '$1').replace(/\s+/g, ' ').trim();
// woorden die ergens IN een naam al te grof zijn (ook in samenstellingen)
const GROF_DEEL = ['kanker', 'teringl', 'tyfus', 'klootzak', 'klote', 'neuk', 'kut', 'hoer', 'sletje', 'godverdom', 'godver', 'kolere', 'pedofiel', 'verkracht', 'misbruik', 'zelfmoord', 'moordenaar', 'seks', 'sex', 'porn', 'naakt', 'penis', 'vagina', 'clitoris', 'condoom', 'dildo', 'vibrator', 'erotiek', 'erotisch', 'masturb', 'orgasme', 'prostitu', 'nazi', 'hitler', 'holocaust', 'terroris', 'jihad', 'neger', 'nikker', 'nigger', 'nigga', 'spleetog', 'zigeuner', 'fuck', 'shit', 'bitch', 'cunt', 'whore', 'asshole', 'bastard', 'motherf', 'wanker', 'faggot', 'retard', 'achterlijk', 'mongooltje', 'cocaine', 'heroine', 'dronken', 'zuipen', 'sigaret', 'sigaar'];
// woorden die alleen als los woord te grof zijn (anders zitten ze in gewone woorden, zoals pik in Pikzwart)
const GROF_WOORD = ['lul', 'pik', 'tiet', 'tieten', 'kont', 'reet', 'geil', 'homo', 'flikker', 'mietje', 'lesbo', 'pedo', 'kaffer', 'debiel', 'imbeciel', 'klere', 'pokken', 'tering', 'slet', 'moord', 'mongool', 'gvd', 'dick', 'cock', 'pussy', 'tits', 'boobs', 'rape', 'slut', 'anal', 'anaal', 'coke', 'wiet', 'joint', 'xtc', 'lsd', 'crack', 'hasj', 'meth', 'drugs', 'dealer', 'vape', 'wodka', 'whisky', 'jenever'];
// gewone woorden waar toevallig een grof stukje in zit
const UITZONDERING = ['hoera', 'sekstant', 'sextant', 'sextet', 'naaktslak', 'naaktmol', 'shiitake', 'sussex', 'essex', 'middlesex', 'negeren', 'negering', 'scunthorpe'].map(kaal);
const GROF_DEEL_K = GROF_DEEL.map(kaal), GROF_WOORD_K = new Set(GROF_WOORD.map(kaal));
function isGrof(naam) {
  const k = kaal(naam); if (!k) return false;
  let samen = k.replace(/ /g, '');
  for (const u of UITZONDERING) samen = samen.split(u).join('#');
  if (GROF_DEEL_K.some(d => samen.includes(d))) return true;
  if (k.split(' ').some(w => GROF_WOORD_K.has(w)) || GROF_WOORD_K.has(k.replace(/ /g, ''))) return true;
  return false;
}
// veelvoorkomende voornamen: "Voornaam Achternaam" is waarschijnlijk een echt persoon
const VOORNAMEN = new Set('jan piet klaas kees henk peter pieter johan willem hans gert gerrit bert ruben daan sem lucas levi noah finn milan jesse thijs bram lars tim tom max luuk stijn ruud sander dennis mark martijn jeroen bas rick niels kevin mike jordy joost marco frank erik eric paul anna emma julia sophie sara lotte eva lisa fleur noor tess zoe mila nina lieke anouk iris femke sanne linda ingrid marieke petra monique sandra wendy esther kim laura maria maartje janneke annemiek thomas david michael daniel robin dirk koen wouter hugo sven jasper mohammed mohamed ahmed fatima yasmine aisha'.split(' '));
function lijktPersoon(naam) {
  const w = naam.split(' ');
  return w.length >= 2 && VOORNAMEN.has(kaal(w[0])) && /^\p{Lu}/u.test(w[1]);
}
// één emoji, ook samengestelde (vlaggen, 🧑‍🍳)
let EMOJI_RE = null;
try { EMOJI_RE = new RegExp('^\\p{RGI_Emoji}$', 'v'); } catch (e) { EMOJI_RE = /^(?:\p{Regional_Indicator}{2}|\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?(?:‍\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})?)*|[#*0-9]️⃣)$/u; }
function netteEmoji(e) {
  e = String(e || '').trim(); if (!e || e.length > 16) return '';
  if (EMOJI_RE.test(e)) return e;
  if (EMOJI_RE.test(e + '️')) return e + '️';
  const z = e.replace(/️/g, ''); if (EMOJI_RE.test(z)) return z;
  return '';
}
// een nette naam: hoofdletter aan het begin (ook IJ), geen gekke tekens, 1 tot 3 woorden
function netteNaam(n) {
  n = String(n || '').normalize('NFKC').replace(/[“”"«»„.?!:;,]+/g, '').replace(/[‘’`´]/g, "'").replace(/\s+/g, ' ').trim();
  if (!n) return '';
  if (n.length > 3 && n === n.toLocaleUpperCase('nl') && n !== n.toLocaleLowerCase('nl')) n = n.toLocaleLowerCase('nl');
  n = /^ij/i.test(n) ? 'IJ' + n.slice(2) : n.charAt(0).toLocaleUpperCase('nl') + n.slice(1);
  return n;
}
function naamFout(n) {
  if (!n) return 'leeg';
  if (n.length < 2 || n.length > 30) return 'lengte';
  if (!/^\p{L}[\p{L}\p{M}' -]*[\p{L}\p{M}]$/u.test(n)) return 'tekens';
  const w = n.split(' ');
  if (w.length > 3 || w.some(x => !x || x.length > 22)) return 'woorden';
  if (/(.)\1\1\1/u.test(n.toLocaleLowerCase('nl'))) return 'herhaling';
  return '';
}

// ================================================================ HULPJES
const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), { status, headers: Object.assign({ 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }, extra) });
const fout = (status, reden, melding, extra) => json(Object.assign({ ok: false, reden, melding, fout: melding }, extra || {}), status);
const nu = () => Date.now();
const dag = () => new Date().toISOString().slice(0, 10);
const eindeDag = () => { const d = new Date(); d.setUTCHours(24, 0, 0, 0); return d.getTime(); };
async function sha(s) { const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(h)].map(b => b.toString(16).padStart(2, '0')).join(''); }
const hashje = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const MELDING = {
  teSnel: 'Rustig aan! De pers moet even op adem komen. Probeer het over een minuutje weer.',
  aiOp: 'De drukpers heeft vandaag al heel veel nieuwe dingen bedacht en is moe. Morgen kan het weer! Bekende combinaties werken gewoon.',
  aiOpJij: 'Je hebt vandaag al heel veel nieuwe dingen laten bedenken. Morgen kan het weer! Bekende combinaties werken gewoon.',
  aiUit: 'De denkmachine staat even uit. Bekende combinaties werken gewoon.',
  aiFout: 'De pers hapert even. Probeer het zo nog eens.',
  onbekend: 'Deze sticker kent de pers niet.',
  herkomst: 'Deze drukpers werkt alleen op rubensrommelhoekje.nl.',
};

// ---------- herkomst (CORS): alleen de eigen site, plus eventueel extra adressen uit ORIGINS
function herkomstOk(origin, env) {
  if (!origin) return false;
  const extra = String(env.ORIGINS || '').split(',').map(s => s.trim().replace(/\/+$/, '')).filter(Boolean);
  return ORIGINS_STANDAARD.includes(origin) || extra.includes(origin);
}

// ---------- limieten per minuut, in het geheugen (elke Cloudflare-locatie telt apart; geen databasekosten)
const teller = new Map();
function teVaak(sleutel, max, ms) {
  const t = nu(); let r = teller.get(sleutel);
  if (!r || r.tot < t) { r = { n: 0, tot: t + ms }; teller.set(sleutel, r); }
  r.n++;
  if (teller.size > 20000) for (const [k, v] of teller) if (v.tot < t) teller.delete(k);
  return r.n > max;
}

// ---------- de database (de tabellen worden vanzelf gemaakt)
const SCHEMA = [
  'CREATE TABLE IF NOT EXISTS combinaties (sleutel TEXT PRIMARY KEY, a TEXT NOT NULL, b TEXT NOT NULL, uitkomst TEXT NOT NULL, bron TEXT NOT NULL, gemaakt INTEGER NOT NULL, aangepast INTEGER)',
  'CREATE INDEX IF NOT EXISTS combi_uitkomst ON combinaties (uitkomst)',
  'CREATE INDEX IF NOT EXISTS combi_gemaakt ON combinaties (gemaakt)',
  'CREATE TABLE IF NOT EXISTS elementen (sleutel TEXT PRIMARY KEY, naam TEXT NOT NULL, emoji TEXT NOT NULL, eerste_door TEXT, gemaakt INTEGER NOT NULL)',
  'CREATE TABLE IF NOT EXISTS blokkades (sleutel TEXT PRIMARY KEY, naam TEXT NOT NULL, reden TEXT, gemaakt INTEGER NOT NULL)',
  'CREATE TABLE IF NOT EXISTS limieten (sleutel TEXT PRIMARY KEY, aantal INTEGER NOT NULL, tot INTEGER NOT NULL)',
  'CREATE TABLE IF NOT EXISTS instellingen (sleutel TEXT PRIMARY KEY, waarde TEXT)',
  'CREATE TABLE IF NOT EXISTS logboek (id INTEGER PRIMARY KEY AUTOINCREMENT, t INTEGER NOT NULL, wat TEXT NOT NULL)',
  'CREATE TABLE IF NOT EXISTS fouten (id INTEGER PRIMARY KEY AUTOINCREMENT, t INTEGER NOT NULL, code TEXT, bericht TEXT)',
];
const schemaKlaar = new WeakMap();   // per database-koppeling één keer
function schema(env) {
  let p = schemaKlaar.get(env.DB);
  if (!p) { p = env.DB.batch(SCHEMA.map(s => env.DB.prepare(s))).catch(e => { schemaKlaar.delete(env.DB); throw e; }); schemaKlaar.set(env.DB, p); }
  return p;
}
const veranderd = r => (r && r.meta ? r.meta.changes : r && r.changes) || 0;
async function instelling(env, k) { const r = await env.DB.prepare('SELECT waarde FROM instellingen WHERE sleutel = ?').bind(k).first(); return r ? r.waarde : null; }
async function log(env, wat) { try { await env.DB.prepare('INSERT INTO logboek (t, wat) VALUES (?, ?)').bind(nu(), String(wat).slice(0, 500)).run(); } catch (e) {} }
async function bewaarFout(env, code, e) {
  try {
    await env.DB.batch([env.DB.prepare('INSERT INTO fouten (t, code, bericht) VALUES (?, ?, ?)').bind(nu(), code, String((e && (e.stack || e.message)) || e).slice(0, 800)),
      env.DB.prepare('DELETE FROM fouten WHERE id NOT IN (SELECT id FROM fouten ORDER BY id DESC LIMIT 300)')]);
  } catch (x) {}
}
async function geblokkeerd(env, sleutels) {
  const r = await env.DB.prepare(`SELECT sleutel FROM blokkades WHERE sleutel IN (${sleutels.map(() => '?').join(',')})`).bind(...sleutels).all();
  return new Set((r.results || []).map(x => x.sleutel));
}
// de nette naam en emoji van een sticker: uit de database, anders uit het boek
async function element(env, k) {
  const r = await env.DB.prepare('SELECT sleutel, naam, emoji, eerste_door FROM elementen WHERE sleutel = ?').bind(k).first();
  if (r) return r;
  const b = BOEK_EL.get(k); return b ? { sleutel: k, naam: b.naam, emoji: b.emoji, eerste_door: null, boek: true } : null;
}

// ================================================================ DE AI
function tekstUit(r) {
  if (r == null) return '';
  if (typeof r === 'string') return r;
  if (typeof r.response === 'string') return r.response;
  if (r.response && typeof r.response === 'object') return JSON.stringify(r.response);
  const c = r.choices && r.choices[0] && r.choices[0].message && r.choices[0].message.content;
  if (typeof c === 'string') return c;
  if (r.result) return tekstUit(r.result);
  return '';
}
function leesJSON(t) {
  t = String(t || '').replace(/<think>[\s\S]*?<\/think>/gi, '').replace(/```(?:json)?/gi, '').trim();
  const s = t.indexOf('{'), e = t.lastIndexOf('}'); if (s < 0 || e <= s) return null;
  try { return JSON.parse(t.slice(s, e + 1)); } catch (x) { return null; }
}
const SCHEMA_UITKOMST = { type: 'object', properties: { naam: { type: 'string' }, emoji: { type: 'string' } }, required: ['naam', 'emoji'], additionalProperties: false };
const SCHEMA_KEURING = { type: 'object', properties: { ok: { type: 'boolean' }, reden: { type: 'string' } }, required: ['ok', 'reden'], additionalProperties: false };
const metAnthropic = env => String(env.AI_AANBIEDER || '').toLowerCase() === 'anthropic' && !!env.ANTHROPIC_KEY;
const aiAanwezig = env => metAnthropic(env) || !!(env.AI && env.AI.run);
const modelNaam = env => (metAnthropic(env) ? (env.CLAUDE_MODEL || CLAUDE_STANDAARD) : (env.AI_MODEL || MODEL_STANDAARD));

// één vraag aan Workers AI; geeft tekst terug of gooit een fout
// elke AI-vraag krijgt een tijdslimiet, zodat het spel nooit lang op een trage AI wacht
const AI_LIMIET_MS = 6000, AI_TOTAAL_MS = 12000;
const metLimiet = (belofte, ms) => { let t; return Promise.race([belofte, new Promise((_, nee) => { t = setTimeout(() => nee(new Error('AI te traag (' + ms + ' ms)')), ms); })]).finally(() => clearTimeout(t)); };
async function workersAI(env, model, berichten, schemaObj, maxTokens, temp) {
  const gemma = /gemma|gpt-oss|qwen3|glm/i.test(model);
  const invoer = { messages: berichten, temperature: temp, max_tokens: maxTokens };
  if (!gemma) { schemaObj = null; }   // gewone modellen: geen extra JSON-instelling (die kennen niet alle modellen); leesJSON haalt het antwoord eruit
  if (gemma) { maxTokens = Math.max(maxTokens, 600); invoer.max_completion_tokens = maxTokens; delete invoer.max_tokens; invoer.chat_template_kwargs = { enable_thinking: false }; invoer.response_format = { type: 'json_schema', json_schema: { name: 'antwoord', schema: schemaObj, strict: true } }; }
  try { return tekstUit(await metLimiet(env.AI.run(model, invoer), AI_LIMIET_MS)); }
  catch (e) {
    if (/te traag/.test(String(e && e.message)) || !gemma) throw e;
    // Gemma zonder het vaste JSON-formaat nog één keer proberen; de controle hieronder vangt het op
    delete invoer.response_format;
    return tekstUit(await metLimiet(env.AI.run(model, invoer), AI_LIMIET_MS));
  }
}
// één vraag aan Claude (Anthropic API, tweede keus); geeft tekst terug of gooit een fout
async function claude(env, systeem, berichten, schemaObj) {
  const model = env.CLAUDE_MODEL || CLAUDE_STANDAARD;
  const headers = { 'Content-Type': 'application/json', 'x-api-key': env.ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' };
  const body = { model, max_tokens: 2000, system: systeem, messages: berichten, output_config: { effort: 'low', format: { type: 'json_schema', schema: schemaObj } } };
  if (!/haiku/.test(model)) { headers['anthropic-beta'] = 'server-side-fallback-2026-07-01'; body.fallbacks = 'default'; }
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error('Anthropic ' + r.status + ': ' + ((j.error && j.error.message) || ''));
  if (j.stop_reason === 'refusal') return '{"weigering":true}';
  return (j.content || []).filter(c => c.type === 'text').map(c => c.text).join('');
}
// bedenk een uitkomst voor a + b; geeft { naam, emoji } of { ongeldig: reden } of gooit een fout
async function bedenk(env, a, b, opmerking, reserve) {
  const berichten = [];
  for (const [x, y, z] of VOORBEELDEN) berichten.push({ role: 'user', content: `${x} + ${y}` }, { role: 'assistant', content: z });
  berichten.push({ role: 'user', content: `${a} + ${b}` + (opmerking ? `\n\n(Let op: ${opmerking})` : '') });
  let t;
  if (metAnthropic(env)) t = await claude(env, SYSTEEM, berichten, SCHEMA_UITKOMST);
  else t = await workersAI(env, reserve ? (env.AI_RESERVE || MODEL_RESERVE) : (env.AI_MODEL || MODEL_STANDAARD), [{ role: 'system', content: SYSTEEM }, ...berichten], SCHEMA_UITKOMST, 80, .2);
  const j = leesJSON(t);
  if (!j || j.weigering) return { ongeldig: 'Antwoord alleen met geldige JSON: {"naam": "...", "emoji": "..."}.' };
  const naam = netteNaam(j.naam || j.name), emoji = netteEmoji(j.emoji);
  const nf = naamFout(naam);
  if (nf) return { ongeldig: 'De naam moet 1 tot 3 Nederlandse woorden zijn, alleen letters.' };
  if (!emoji) return { ongeldig: 'Geef precies één emoji.' };
  return { naam, emoji };
}
// de AI-controle: is deze naam geschikt voor kinderen? geeft true/false, of gooit een fout
async function keur(env, naam) {
  const vraag = [{ role: 'user', content: 'Naam: ' + naam }];
  let t;
  if (metAnthropic(env)) t = await claude(env, KEURDER, vraag, SCHEMA_KEURING);
  else t = await workersAI(env, env.AI_MODEL || MODEL_STANDAARD, [{ role: 'system', content: KEURDER }, ...vraag], SCHEMA_KEURING, 40, 0);
  const j = leesJSON(t);
  if (!j || typeof j.ok !== 'boolean') throw new Error('keuring onleesbaar: ' + String(t).slice(0, 80));
  return j.ok === true && !j.weigering;
}

// ================================================================ COMBINEREN
async function combineer(req, env, ctx, ip) {
  const tekst = await req.text();
  if (tekst.length > 2000) return fout(413, 'te-groot', 'Dat verzoek is te groot.');
  let d; try { d = JSON.parse(tekst); } catch (e) { return fout(400, 'ongeldig', 'Ongeldig verzoek.'); }
  if (!d || typeof d.a !== 'string' || typeof d.b !== 'string' || typeof d.apparaat !== 'string') return fout(400, 'ongeldig', 'Ongeldig verzoek.');
  const app = d.apparaat.toLowerCase();
  if (!/^[a-f0-9]{16,64}$/.test(app)) return fout(400, 'ongeldig', 'Ongeldig apparaatnummer.');
  const ka = norm(d.a), kb = norm(d.b);
  if (!ka || !kb || ka.length > 40 || kb.length > 40) return fout(400, 'ongeldig', 'Ongeldige namen.');
  const ipH = (await sha('ip:' + ip + ':' + dag() + ':' + (env.BEHEER || ''))).slice(0, 24);
  const door = (await sha('apparaat:' + app)).slice(0, 20);   // het anonieme nummer dat bewaard wordt
  if (teVaak('ip:' + ipH, parseInt(env.LIMIET_IP_MINUUT, 10) || LIMIET.ipMinuut, 60000) || teVaak('app:' + door, LIMIET.appMinuut, 60000)) return fout(429, 'te-snel', MELDING.teSnel);
  if ((await instelling(env, 'dicht')) === '1') return fout(503, 'dicht', 'De drukpers is even in onderhoud. Bekende combinaties werken gewoon.');
  const sleutel = [ka, kb].sort().join('+');
  // 1. kennen we deze combinatie al?
  const al = await env.DB.prepare('SELECT c.uitkomst, c.bron, e.naam, e.emoji, e.eerste_door FROM combinaties c JOIN elementen e ON e.sleutel = c.uitkomst WHERE c.sleutel = ?').bind(sleutel).first();
  const blok = await geblokkeerd(env, [ka, kb].concat(al ? [al.uitkomst] : []));
  if (blok.has(ka) || blok.has(kb)) return fout(400, 'onbekend', MELDING.onbekend);
  const oudStandaard = al && al.bron === 'standaard' && !blok.has(al.uitkomst) ? { ok: true, naam: al.naam, emoji: al.emoji, eerste: al.eerste_door === door, bron: 'db' } : null;
  if (al && !blok.has(al.uitkomst) && !oudStandaard) return json({ ok: true, naam: al.naam, emoji: al.emoji, eerste: al.eerste_door === door, bron: 'db' });
  // de twee stickers moeten bestaan (zo kan niemand eigen tekst naar de AI sturen)
  const [ea, eb] = await Promise.all([element(env, ka), element(env, kb)]);
  if (!ea || !eb) return fout(400, 'onbekend', MELDING.onbekend);
  // 2. staat hij in het receptenboek?
  const bk = BOEK.get(sleutel);
  if (bk && !(await geblokkeerd(env, [norm(bk.naam)])).has(norm(bk.naam))) return json(await bewaarUitkomst(env, sleutel, ka, kb, bk.naam, bk.emoji, 'boek', door));
  // 3. een echt nieuwe combinatie: vraag het de AI
  if (!aiAanwezig(env) || (await instelling(env, 'ai')) === 'uit') return oudStandaard ? json(oudStandaard) : fout(503, 'ai-uit', MELDING.aiUit);
  const max = Math.max(0, parseInt(env.AI_PER_DAG, 10) || LIMIET.aiPerDag);
  const tot = eindeDag(), d0 = dag();
  const tel = await env.DB.batch(['ai:dag:' + d0, 'ai:app:' + door + ':' + d0, 'ai:ip:' + ipH + ':' + d0].map(k => env.DB.prepare('INSERT INTO limieten (sleutel, aantal, tot) VALUES (?, 1, ?) ON CONFLICT(sleutel) DO UPDATE SET aantal = aantal + 1 RETURNING aantal').bind(k, tot)));
  const [nDag, nApp, nIp] = tel.map(r => (r.results && r.results[0] ? r.results[0].aantal : 0));
  if (Math.random() < .02) ctx.waitUntil(env.DB.prepare('DELETE FROM limieten WHERE tot < ?').bind(nu()).run().catch(() => {}));
  if (nDag > max) return oudStandaard ? json(oudStandaard) : fout(429, 'ai-op', MELDING.aiOp);
  if (nApp > LIMIET.aiApparaatDag || nIp > LIMIET.aiIpDag) return oudStandaard ? json(oudStandaard) : fout(429, 'ai-op', MELDING.aiOpJij);
  const uit = await vraagDeAI(env, ea.naam, eb.naam, ka, kb);
  if (oudStandaard) {
    // alleen een echt nieuw antwoord van de AI vervangt het oude standaardantwoord
    if (!uit || uit.op || uit.bron !== 'ai') return json(oudStandaard);
    await env.DB.prepare("DELETE FROM combinaties WHERE sleutel = ? AND bron = 'standaard'").bind(sleutel).run();
  }
  if (uit && uit.op) return fout(429, 'ai-op', MELDING.aiOp);
  if (!uit) return fout(503, 'ai-fout', MELDING.aiFout);
  return json(await bewaarUitkomst(env, sleutel, ka, kb, uit.naam, uit.emoji, uit.bron, door));
}
// vraag de AI om een uitkomst en controleer die; geeft { naam, emoji, bron } of null als de AI niet bereikbaar is
async function vraagDeAI(env, naamA, naamB, ka, kb) {
  let opmerking = '', antwoorden = 0, bruikbaar = 0, laatsteFout = null;
  const start = Date.now();
  for (let poging = 0; poging < 3; poging++) {
    if (Date.now() - start > AI_TOTAAL_MS) break;   // nooit langer dan ongeveer 12 seconden bezig
    let r;
    try { r = await bedenk(env, naamA, naamB, opmerking, poging === 2 && !metAnthropic(env)); }
    catch (e) {
      // de gratis dagruimte van Workers AI (of het tegoed bij Anthropic) is op: dan een nette melding
      if (/free allocation|neurons|4006|quota|credit balance|rate.?limit/i.test(String(e && e.message))) return { op: true };
      laatsteFout = e; continue;
    }
    antwoorden++;
    if (r.ongeldig) { opmerking = r.ongeldig; continue; }
    bruikbaar++;
    const k = norm(r.naam);
    // een bestaande sticker houdt zijn eigen naam en emoji
    const bestaand = await element(env, k);
    if ((await geblokkeerd(env, [k])).has(k) || isGrof(r.naam) || lijktPersoon(r.naam)) { opmerking = 'die naam past niet in een kinderspel. Kies iets anders, vrolijk en logisch.'; continue; }
    if (bestaand) return { naam: bestaand.naam, emoji: bestaand.emoji, bron: 'ai' };
    if (k === ka || k === kb) return { naam: r.naam, emoji: r.emoji, bron: 'ai' };
    let goed;
    // kan de AI-controle niet, dan bewaren we niets (veilig: geen controle, geen nieuwe naam)
    try { goed = await keur(env, r.naam); } catch (e) { console.log('AI-controle onbereikbaar:', e && e.message); return null; }
    if (!goed) { opmerking = 'die naam past niet in een kinderspel. Kies iets anders, vrolijk en logisch.'; continue; }
    return { naam: r.naam, emoji: r.emoji, bron: 'ai' };
  }
  if (!antwoorden) { if (laatsteFout) console.log('AI onbereikbaar:', laatsteFout && laatsteFout.message); return null; }
  // alleen lege of kapotte antwoorden: de AI werkt niet goed, dus niets voorgoed bewaren
  if (!bruikbaar) { console.log('AI gaf alleen onbruikbare antwoorden voor', ka, '+', kb); return null; }
  // de AI gaf wel antwoord, maar steeds een ongeschikt antwoord: dan een veilig standaardantwoord, een van de twee zelf
  const k = hashje(ka + '+' + kb) % 2 ? ka : kb;
  const e = await element(env, k);
  return e ? { naam: e.naam, emoji: e.emoji, bron: 'standaard' } : null;
}
// bewaar een uitkomst voorgoed; als iemand anders net tegelijk dezelfde combinatie maakte, wint de eerste
async function bewaarUitkomst(env, sleutel, ka, kb, naam, emoji, bron, door) {
  const k = norm(naam), t = nu();
  const res = await env.DB.batch([
    env.DB.prepare('INSERT INTO elementen (sleutel, naam, emoji, eerste_door, gemaakt) VALUES (?, ?, ?, ?, ?) ON CONFLICT(sleutel) DO NOTHING').bind(k, naam, emoji, door, t),
    env.DB.prepare('INSERT INTO combinaties (sleutel, a, b, uitkomst, bron, gemaakt) VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(sleutel) DO NOTHING').bind(sleutel, ka, kb, k, bron, t),
  ]);
  const nieuwElement = veranderd(res[0]) > 0;
  const r = await env.DB.prepare('SELECT e.naam, e.emoji, e.eerste_door FROM combinaties c JOIN elementen e ON e.sleutel = c.uitkomst WHERE c.sleutel = ?').bind(sleutel).first();
  if (!r) return { ok: true, naam, emoji, eerste: nieuwElement, bron };
  return { ok: true, naam: r.naam, emoji: r.emoji, eerste: r.eerste_door === door, nieuw: nieuwElement, bron };
}

// ================================================================ BEHEER (met het geheime beheerwachtwoord)
async function vergelijk(a, b) { const [x, y] = await Promise.all([sha('vgl:' + a), sha('vgl:' + b)]); let v = 0; for (let i = 0; i < x.length; i++) v |= x.charCodeAt(i) ^ y.charCodeAt(i); return v === 0; }
async function beheer(req, env, pad, ip) {
  if (!env.BEHEER || String(env.BEHEER).length < 12) return fout(503, 'geen-beheer', 'Stel in Cloudflare eerst het geheim BEHEER in, van minstens 12 tekens.');
  const ipH = (await sha('beheer:' + ip)).slice(0, 24), sl = 'beheer-mis:' + ipH;
  const mis = await env.DB.prepare('SELECT aantal, tot FROM limieten WHERE sleutel = ?').bind(sl).first();
  if (mis && mis.tot > nu() && mis.aantal >= 8) return fout(429, 'geblokkeerd', 'Te vaak een verkeerd wachtwoord. Probeer het over een kwartier opnieuw.');
  const ww = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!ww || !(await vergelijk(ww, String(env.BEHEER)))) {
    await env.DB.prepare('INSERT INTO limieten (sleutel, aantal, tot) VALUES (?, 1, ?) ON CONFLICT(sleutel) DO UPDATE SET aantal = CASE WHEN tot < ? THEN 1 ELSE aantal + 1 END, tot = CASE WHEN tot < ? THEN excluded.tot ELSE tot END').bind(sl, nu() + 15 * 60000, nu(), nu()).run();
    return fout(401, 'wachtwoord', 'Verkeerd beheerwachtwoord.');
  }
  let d = {};
  if (req.method === 'POST') { const t = await req.text(); if (t.length > 4000) return fout(413, 'te-groot', 'Te groot.'); try { d = JSON.parse(t || '{}') || {}; } catch (e) { return fout(400, 'ongeldig', 'Ongeldige JSON.'); } }
  const s = v => (typeof v === 'string' ? v.trim().slice(0, 80) : '');
  if (pad === 'overzicht' || pad === 'status') {
    const [el, co, ai, aan, bl, rec] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) AS n FROM elementen').first(), env.DB.prepare('SELECT COUNT(*) AS n FROM combinaties').first(),
      env.DB.prepare('SELECT aantal FROM limieten WHERE sleutel = ?').bind('ai:dag:' + dag()).first(), instelling(env, 'ai'),
      env.DB.prepare('SELECT naam, reden, gemaakt FROM blokkades ORDER BY gemaakt DESC LIMIT 200').all(),
      env.DB.prepare('SELECT c.a, c.b, c.bron, c.gemaakt, e.naam, e.emoji FROM combinaties c JOIN elementen e ON e.sleutel = c.uitkomst ORDER BY c.gemaakt DESC LIMIT 30').all(),
    ]);
    return json({ ok: true, versie: VERSIE, elementen: el ? el.n : 0, combinaties: co ? co.n : 0, aiVandaag: ai ? ai.aantal : 0, aiPerDag: parseInt(env.AI_PER_DAG, 10) || LIMIET.aiPerDag, ai: aan !== 'uit' && aiAanwezig(env), aiAanwezig: aiAanwezig(env), model: modelNaam(env), blokkades: bl.results || [], recent: rec.results || [] });
  }
  if (pad === 'zoek' || pad === 'aanpassen' || pad === 'verwijder') {
    const ka = norm(s(d.a)), kb = norm(s(d.b));
    if (!ka || !kb) return fout(400, 'ongeldig', 'Vul twee namen in.');
    const sleutel = [ka, kb].sort().join('+');
    if (pad === 'zoek') {
      const c = await env.DB.prepare('SELECT c.a, c.b, c.bron, c.gemaakt, c.aangepast, e.naam, e.emoji, e.eerste_door AS eersteDoor FROM combinaties c LEFT JOIN elementen e ON e.sleutel = c.uitkomst WHERE c.sleutel = ?').bind(sleutel).first();
      return json({ ok: true, combinatie: c || null, boek: BOEK.get(sleutel) || null });
    }
    if (pad === 'verwijder') {
      const r = await env.DB.prepare('DELETE FROM combinaties WHERE sleutel = ?').bind(sleutel).run();
      await log(env, 'verwijderd: ' + sleutel);
      return json({ ok: true, verwijderd: veranderd(r) });
    }
    const naam = netteNaam(s(d.naam)), emoji = netteEmoji(s(d.emoji));
    const nf = naamFout(naam);
    if (nf) return fout(400, 'ongeldig', 'Die naam kan niet: 1 tot 3 woorden, alleen letters (' + nf + ').');
    if (!emoji) return fout(400, 'ongeldig', 'Vul precies één emoji in.');
    const k = norm(naam), t = nu();
    await env.DB.batch([
      env.DB.prepare('INSERT INTO elementen (sleutel, naam, emoji, eerste_door, gemaakt) VALUES (?, ?, ?, ?, ?) ON CONFLICT(sleutel) DO UPDATE SET naam = excluded.naam, emoji = excluded.emoji').bind(k, naam, emoji, 'beheer', t),
      env.DB.prepare('INSERT INTO combinaties (sleutel, a, b, uitkomst, bron, gemaakt, aangepast) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(sleutel) DO UPDATE SET uitkomst = excluded.uitkomst, bron = excluded.bron, aangepast = excluded.aangepast').bind(sleutel, ka, kb, k, 'beheer', t, t),
    ]);
    await log(env, 'aangepast: ' + sleutel + ' = ' + emoji + ' ' + naam);
    return json({ ok: true });
  }
  if (pad === 'blokkeer') {
    const naam = s(d.naam), k = norm(naam);
    if (!k) return fout(400, 'ongeldig', 'Vul een naam in.');
    if (BASIS.some(([n]) => norm(n) === k)) return fout(400, 'ongeldig', 'De vier basisstickers kun je niet blokkeren.');
    const r = await env.DB.batch([
      env.DB.prepare('INSERT INTO blokkades (sleutel, naam, reden, gemaakt) VALUES (?, ?, ?, ?) ON CONFLICT(sleutel) DO UPDATE SET reden = excluded.reden').bind(k, netteNaam(naam), s(d.reden), nu()),
      env.DB.prepare('DELETE FROM combinaties WHERE uitkomst = ?').bind(k),
    ]);
    await log(env, 'geblokkeerd: ' + k);
    return json({ ok: true, verwijderd: veranderd(r[1]) });
  }
  if (pad === 'deblokkeer') {
    const k = norm(s(d.naam));
    const r = await env.DB.prepare('DELETE FROM blokkades WHERE sleutel = ?').bind(k).run();
    await log(env, 'gedeblokkeerd: ' + k);
    return json({ ok: true, verwijderd: veranderd(r) });
  }
  if (pad === 'schakelaar') {
    const aan = d.ai === true;
    await env.DB.prepare('INSERT INTO instellingen (sleutel, waarde) VALUES (?, ?) ON CONFLICT(sleutel) DO UPDATE SET waarde = excluded.waarde').bind('ai', aan ? 'aan' : 'uit').run();
    if (typeof d.dicht === 'boolean') await env.DB.prepare('INSERT INTO instellingen (sleutel, waarde) VALUES (?, ?) ON CONFLICT(sleutel) DO UPDATE SET waarde = excluded.waarde').bind('dicht', d.dicht ? '1' : '0').run();
    await log(env, 'AI ' + (aan ? 'aan' : 'uit'));
    return json({ ok: true, ai: aan });
  }
  if (pad === 'logboek') {
    const [l, f] = await Promise.all([env.DB.prepare('SELECT t, wat FROM logboek ORDER BY id DESC LIMIT 100').all(), env.DB.prepare('SELECT t, code, bericht FROM fouten ORDER BY id DESC LIMIT 50').all()]);
    return json({ ok: true, logboek: l.results || [], fouten: f.results || [] });
  }
  return fout(404, 'onbekend', 'Onbekende beheerroute.');
}

// ================================================================ DE INGANG
const VEILIG = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Frame-Options': 'DENY', 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains', 'Cross-Origin-Resource-Policy': 'cross-origin' };
async function verwerk(req, env, ctx) {
  const url = new URL(req.url), pad = url.pathname.replace(/\/+$/, '') || '/';
  const origin = req.headers.get('Origin') || '';
  const ip = req.headers.get('CF-Connecting-IP') || req.headers.get('X-Forwarded-For') || 'onbekend';
  if (!env.DB) return fout(503, 'geen-db', 'De D1-database (binding DB) is nog niet gekoppeld.');
  if (pad === '/' && req.method === 'GET') return json({ ok: true, naam: 'mengelmoes-worker', versie: VERSIE });
  const isBeheer = pad.startsWith('/beheer/');
  // alleen de eigen site; het beheer mag ook zonder Origin (bijvoorbeeld met curl), want daar is het wachtwoord nodig
  if (origin ? !herkomstOk(origin, env) : !isBeheer) return fout(403, 'herkomst', MELDING.herkomst);
  if (+(req.headers.get('Content-Length') || 0) > 8000) return fout(413, 'te-groot', 'Dat verzoek is te groot.');
  await schema(env);
  if (pad === '/status' && req.method === 'GET') {
    if (teVaak('status:' + ip, 120, 60000)) return fout(429, 'te-snel', MELDING.teSnel);
    const [aan, bl] = await Promise.all([instelling(env, 'ai'), env.DB.prepare('SELECT naam FROM blokkades ORDER BY gemaakt DESC LIMIT 1000').all()]);
    return json({ ok: true, versie: VERSIE, ai: aan !== 'uit' && aiAanwezig(env), blokkades: (bl.results || []).map(r => r.naam) }, 200, { 'Cache-Control': 'public, max-age=60' });
  }
  if (pad === '/combineer' && req.method === 'POST') return combineer(req, env, ctx, ip);
  if (isBeheer && (req.method === 'GET' || req.method === 'POST')) return beheer(req, env, pad.slice(8), ip);
  return fout(404, 'onbekend', 'Onbekende route.');
}
export default {
  async fetch(req, env, ctx) {
    const origin = req.headers.get('Origin') || '';
    const cors = herkomstOk(origin, env) ? { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin' } : { 'Vary': 'Origin' };
    // de vooraf-vraag van de browser (voor het beheer met wachtwoord en JSON)
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: herkomstOk(origin, env) ? 204 : 403, headers: Object.assign({ 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type, Authorization', 'Access-Control-Max-Age': '86400' }, cors, VEILIG) });
    }
    let res;
    try { res = await verwerk(req, env, ctx); }
    catch (e) {
      const code = Math.random().toString(36).slice(2, 8);
      console.log('fout', code, e && e.stack);
      if (env.DB) ctx.waitUntil(bewaarFout(env, code, e));
      res = fout(500, 'fout', 'Er ging iets mis in de drukpers (foutcode ' + code + ').');
    }
    const h = new Headers(res.headers);
    for (const [k, v] of Object.entries(Object.assign({}, cors, VEILIG))) h.set(k, v);
    return new Response(res.body, { status: res.status, headers: h });
  },
};
// voor de tests (wordt in Cloudflare niet gebruikt)
export const _test = { isGrof, netteNaam, naamFout, netteEmoji, lijktPersoon, kaal, BOEK, sleutelVan, LIMIET, teller };
