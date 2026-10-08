# Ruben's rommelhoekje

Dit is de persoonlijke website van Ruben, gehost met GitHub Pages vanaf de main-branch (root). Ruben is beginner met code en GitHub: leg wijzigingen kort en in gewone taal uit, in het Nederlands.

## Hoe de site werkt

- `index.html` is de homepage. Elke tool of elk spel hangt daar als prijskaartje ("label") onder "Aan de haak".
- Elke tool is één zelfstandig HTML-bestand in de root, bijvoorbeeld `rommelpoker.html`. CSS en JavaScript staan in het bestand zelf.
- Er is geen build-stap. Wat in de repo staat, staat live.
- Onderaan de homepage staat een versienummer (`Versie N`). Verhoog dat bij elke wijziging die bezoekers zien, zodat Ruben kan controleren dat de update live staat.

## Regels voor nieuwe of aangepaste pagina's

- Alle tekst voor bezoekers is Nederlands.
- Geen functies die alleen binnen Claude werken: geen `window.claude`, geen `window.storage`, geen aanroepen naar api.anthropic.com. Voor bewaren per bezoeker mag `localStorage`, altijd binnen try/catch.
- Nooit wachtwoorden, API-sleutels of andere geheimen in de repo zetten. De repo is openbaar.
- Werkt goed op telefoon (vanaf 360 px breed) en ondersteunt `prefers-reduced-motion`.
- Bij een nieuwe tool: voeg een label toe op de homepage met een link en een korte beschrijving. Het "Binnenkort"-label blijft als laatste staan.
- Gebruik geen namen, plaatjes of personages van bestaande merken, games of films. Eigen namen en eigen ontwerpen.

## Huisstijl

- Thema: een gaatjesbord in een schuurtje of op een rommelmarkt. Labeltape, vastgeprikte briefjes, prijskaartjes aan touwtjes.
- Lettertype: Bricolage Grotesque via Google Fonts, met system-ui als terugval.
- Kleuren: bord `#2F4C8F` met gaatjes `#1E3263`, manila `#F2DDA0`, papier `#FBF6E9`, inkt `#1F2333`, rood `#C8323C`, labeltape `#23252B`, hout `#7A4E2D`, munt `#E9B949`.

## Rommelpoker

- Eigen kaartspel in `rommelpoker.html`: pokerhanden, fiches × mult, acht kraampjes, snuisterijen en handboekjes.
- De spelregels en balans (doelscores, prijzen, effecten) staan bovenin het script in `HANDEN`, `SNUIS`, `BAZEN` en `DOELEN`. Elke snuisterij heeft een `soort` (fiches, mult, maal, munt, speciaal) die de kleur in de winkel bepaalt, en een eigen icoon in `ICOON_PAD`.
- Test na een wijziging dat een potje te starten is, dat scoren werkt en dat de winkel opent.

## Werkwijze

- Commitberichten in het Nederlands, kort en duidelijk, bijvoorbeeld "Winkel overzichtelijker gemaakt".
- Zeg na afloop in één of twee zinnen wat er veranderd is en wat Ruben moet doen om het live te zetten.
