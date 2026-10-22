#!/usr/bin/env python3
"""Bouw de pagina's van Ruben's rommelhoekje uit de map _bron.

Elke pagina in _bron/paginas/ is de echte pagina, maar met plaatshouders op de plek van de
gedeelde blokken. Dit script vult die plaatshouders in met de bestanden uit _bron/gedeeld/:

    <!--BOUW:SCOREBORD-->   ->  <script> + gedeeld/scorebord.js + </script>   (scorebord, koppelen, tabbladbewaker)
    <!--BOUW:GRAPJES-->     ->  <script> + gedeeld/grapjes.js + </script>      (de verborgen grapjes)
    <!--BOUW:V6-KOP-->      ->  gedeeld/v6-kop.html                            (versie 0.6: licht en donker, in de <head>)
    <!--BOUW:V6-->          ->  <script> + gedeeld/v6.js + </script>           (versie 0.6: thema volgen en rommeltjes)

In _bron/homepage-onderdelen.js staan /*BOUW:SCOREBORD*/ en /*BOUW:GRAPJES*/ (zonder <script>-tags).

Gebruik (vanuit de map van de site, of waar dan ook):
    python3 _bron/bouw.py                 alles bouwen in de map van de site
    python3 _bron/bouw.py --controleer    alleen kijken wat er anders zou worden, niets wegschrijven
    python3 _bron/bouw.py --naar MAP      bouwen in een andere map
    python3 _bron/bouw.py rommelbel.html  alleen deze pagina('s)

index.html wordt nooit gebouwd of aangeraakt: die houdt de werkplaats bij.
Alleen de standaardbibliotheek van Python 3 is nodig.
"""
import argparse
import os
import sys

HIER = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HIER)
PAGINAS = os.path.join(HIER, 'paginas')
GEDEELD = os.path.join(HIER, 'gedeeld')
NOOIT = {'index.html'}


def lees(pad):
    with open(pad, encoding='utf-8', newline='') as f:
        return f.read()


def schrijf(pad, tekst):
    with open(pad, 'w', encoding='utf-8', newline='') as f:
        f.write(tekst)


def gedeelde_blokken():
    sb, gr = lees(os.path.join(GEDEELD, 'scorebord.js')), lees(os.path.join(GEDEELD, 'grapjes.js'))
    v6kop, v6 = lees(os.path.join(GEDEELD, 'v6-kop.html')), lees(os.path.join(GEDEELD, 'v6.js'))
    pagina = {
        '<!--BOUW:SCOREBORD-->': '<script>' + sb + '</script>',
        '<!--BOUW:GRAPJES-->': '<script>' + gr + '</script>',
        '<!--BOUW:V6-KOP-->': v6kop,
        '<!--BOUW:V6-->': '<script>' + v6 + '</script>',
    }
    bundel = {'/*BOUW:SCOREBORD*/': sb, '/*BOUW:GRAPJES*/': gr}
    return pagina, bundel, sb


def vul(tekst, plaatshouders, naam):
    for merk, inhoud in plaatshouders.items():
        n = tekst.count(merk)
        if n > 1:
            sys.exit(f'FOUT in {naam}: de plaatshouder {merk} staat er {n} keer in (hooguit 1).')
        tekst = tekst.replace(merk, inhoud)
    if '<!--BOUW:' in tekst or '/*BOUW:' in tekst:
        sys.exit(f'FOUT in {naam}: er staat nog een onbekende plaatshouder in.')
    return tekst


def main():
    a = argparse.ArgumentParser(description="Bouw de pagina's van Ruben's rommelhoekje uit _bron.")
    a.add_argument('alleen', nargs='*', help='alleen deze pagina(s) bouwen, bijvoorbeeld rommelbel.html')
    a.add_argument('--controleer', action='store_true', help='niets wegschrijven, alleen laten zien wat er anders zou worden')
    a.add_argument('--naar', default=SITE, help='de map waar de gebouwde bestanden in komen (standaard: de map van de site)')
    arg = a.parse_args()
    pagina_blokken, bundel_blokken, sb = gedeelde_blokken()

    taken = []
    for naam in sorted(os.listdir(PAGINAS)):
        if naam.endswith('.html') and naam not in NOOIT and (not arg.alleen or naam in arg.alleen):
            bron = lees(os.path.join(PAGINAS, naam))
            gebouwd = vul(bron, pagina_blokken, naam)
            if '<!--BOUW:SCOREBORD-->' in bron and gebouwd.count(sb) != 1:
                sys.exit(f'FOUT in {naam}: het gedeelde scorebord-script staat er niet precies één keer in.')
            taken.append((naam, gebouwd))
    if not arg.alleen or 'homepage-onderdelen.js' in arg.alleen:
        taken.append(('homepage-onderdelen.js', vul(lees(os.path.join(HIER, 'homepage-onderdelen.js')), bundel_blokken, 'homepage-onderdelen.js')))
    if arg.alleen:
        onbekend = set(arg.alleen) - {n for n, _ in taken}
        if onbekend:
            sys.exit('Onbekend: ' + ', '.join(sorted(onbekend)) + " (index.html bouw ik nooit; kijk in _bron/paginas/ welke pagina's er zijn)")

    anders, gelijk, nieuw = [], 0, []
    for naam, tekst in taken:
        doel = os.path.join(arg.naar, naam)
        if os.path.exists(doel) and lees(doel) == tekst:
            gelijk += 1
            continue
        (anders if os.path.exists(doel) else nieuw).append(naam)
        if not arg.controleer:
            os.makedirs(arg.naar, exist_ok=True)
            schrijf(doel, tekst)

    werkwoord = 'zou veranderen' if arg.controleer else 'veranderd'
    print(f'{len(taken)} bestanden bekeken: {gelijk} al goed, {len(anders)} {werkwoord}, {len(nieuw)} nieuw.')
    for n in anders:
        print('  ' + ('anders: ' if arg.controleer else 'bijgewerkt: ') + n)
    for n in nieuw:
        print('  nieuw: ' + n)
    if arg.controleer and (anders or nieuw):
        sys.exit(1)


if __name__ == '__main__':
    main()
