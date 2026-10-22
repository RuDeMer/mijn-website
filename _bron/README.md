# _bron: de bronnen van Ruben's rommelhoekje

Deze map staat in de repository, maar niet op de website: GitHub Pages zet mappen die met een `_` beginnen niet online.

Hier staan de bronnen waaruit de pagina's van de site gebouwd worden. Ze zijn op 22 oktober 2026 teruggehaald uit de gebouwde pagina's. Het bouwscript maakt daaruit weer precies dezelfde pagina's, byte voor byte; dat is getest.

## Wat staat waar

| Map of bestand | Wat |
|---|---|
| `paginas/` | Elke pagina van de site, met **plaatshouders** op de plek van de gedeelde blokken. **Werk hier**, niet in de gebouwde pagina's in de hoofdmap. |
| `gedeeld/scorebord.js` | Het gedeelde scorebord-script: het scorebord, koppelen (`SLEUTELS`), de tabbladbewaker en de knop "Koppel je apparaten". |
| `gedeeld/grapjes.js` | De verborgen grapjes. |
| `gedeeld/v6-kop.html` | Versie 0.6, in de `<head>`: licht en donker al voordat de pagina laadt, en het papier met de stippen. |
| `gedeeld/v6.js` | Versie 0.6, onderaan: het thema volgen en de rommeltjes in de kantlijn. |
| `homepage-onderdelen.js` | Alle onderdelen van de homepage samen (tegels, licht en donker, coulissen, sticker, iconen, voortgang), met plaatshouders voor het scorebord-script en de grapjes. |
| `bouw.py` | Het bouwscript. |
| `workers/` | De servers bij Cloudflare: `scorebord-worker.js` (de scoreserver) en `mengelmoes-worker.js` (de drukpers), met de uitleg. Die zet je in Cloudflare, niet op de site. |
| `vps/` | De PHP-bestanden van het hotel op de VPS: `status_api.php`, `hotel_stand.php` en `rolluik.php`. |
| `geparkeerd/` | Steigerstress (staat nog niet online; gebouwd bestand, geen bron met plaatshouders). |

`index.html` staat hier bewust **niet** in: die houdt de werkplaats bij (de labels op de homepage en het versienummer).

## De plaatshouders

| In een pagina | Wordt |
|---|---|
| `<!--BOUW:SCOREBORD-->` | `<script>` + `gedeeld/scorebord.js` + `</script>` |
| `<!--BOUW:GRAPJES-->` | `<script>` + `gedeeld/grapjes.js` + `</script>` |
| `<!--BOUW:V6-KOP-->` | `gedeeld/v6-kop.html` |
| `<!--BOUW:V6-->` | `<script>` + `gedeeld/v6.js` + `</script>` |

In `homepage-onderdelen.js`: `/*BOUW:SCOREBORD*/` en `/*BOUW:GRAPJES*/` (zonder `<script>`-tags).

Een pagina zonder een plaatshouder krijgt dat blok niet. Mengelmoes en Op Gevoel hebben bijvoorbeeld bewust geen grapjes, omdat ze een eigen stijl hebben.

## Zo werk je ermee

**Een pagina veranderen:** pas `_bron/paginas/<pagina>.html` aan, en bouw.

**Iets veranderen voor alle pagina's tegelijk**, bijvoorbeeld een nieuwe sleutel in `SLEUTELS`: pas het bestand in `gedeeld/` aan, en bouw. Alle pagina's met die plaatshouder worden dan bijgewerkt.

**Een nieuw spel:** zet de pagina in `paginas/`, met `<!--BOUW:SCOREBORD-->` (en eventueel `<!--BOUW:GRAPJES-->`) waar die blokken horen. Het scorebord-blok hoort vóór het eerste script dat `Scorebord` gebruikt.

**Bouwen** (vanuit de hoofdmap van de repository):

```bash
python3 _bron/bouw.py                 # alles bouwen in de hoofdmap
python3 _bron/bouw.py --controleer    # alleen kijken wat er anders zou worden (afsluitcode 1 als er iets anders is)
python3 _bron/bouw.py --naar /tmp/x   # bouwen in een andere map
python3 _bron/bouw.py rommelbel.html  # alleen deze pagina
```

Alleen Python 3 is nodig, zonder extra pakketten. Het script weigert te bouwen als een plaatshouder dubbel staat, als er een onbekende plaatshouder in staat, of als het scorebord-script niet precies één keer in een pagina terechtkomt.

## Goed om te weten

- **Werk nooit alleen in een gebouwde pagina** in de hoofdmap. De volgende bouw overschrijft dat. Werk in `paginas/` en bouw.
- **De werkplaats** heeft binnenin een eigen, oudere kopie van de homepage-onderdelen (`HOME_ONDERDELEN`) en van de iconen. Die gebruikt hij alleen als `homepage-onderdelen.js` nog helemaal niet op GitHub staat, of als een homepage nog de heel oude opbouw heeft. Het bouwscript werkt die kopie niet bij, en dat hoeft ook niet.
- **Upload na het bouwen** de veranderde pagina's (het bouwscript noemt ze). Een pagina die niet veranderd is, hoef je niet te uploaden.
