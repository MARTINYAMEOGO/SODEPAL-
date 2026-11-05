# Assemble les pages anglaises du dossier en/ : en-tête et pied de page repris de en/index.html,
# contenu traduit dans pages-en/<page>.html, titre et description dans pages-en/<page>.meta.txt
import sys, os, re

site, parts = sys.argv[1], sys.argv[2]
en = os.path.join(site, 'en')
home = open(os.path.join(en, 'index.html'), encoding='utf-8').read()
head, rest = home.split('<main id="contenu">', 1)
foot = rest.split('</main>', 1)[1]
BASE = 'https://www.sodepalsa.com/'

for name in ['societe.html', 'fondatrice.html', 'directrice.html', 'actualites.html', 'produits.html', 'qualite.html', 'contact.html']:
    title, desc = open(os.path.join(parts, name.replace('.html', '.meta.txt')), encoding='utf-8').read().strip().split('\n')[:2]
    h = head
    h = re.sub(r'<title>.*?</title>', '<title>SODEPAL SA</title>', h, flags=re.S)  # onglet : le nom seul ; le titre détaillé reste dans og:title
    h = re.sub(r'(<meta name="description" content=")[^"]*', lambda m: m.group(1) + desc, h)
    h = re.sub(r'(<meta property="og:description" content=")[^"]*', lambda m: m.group(1) + desc, h)
    h = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda m: m.group(1) + title, h)
    h = h.replace(BASE + 'en/"', BASE + 'en/' + name + '"').replace(BASE + '"', BASE + name + '"')
    h = re.sub(r'\s*<script type="application/ld\+json">.*?</script>', '', h, flags=re.S)
    h = h.replace('<a href="index.html" aria-current="page">Home</a>', '<a href="index.html">Home</a>')
    h = h.replace('<a href="%s">' % name, '<a href="%s" aria-current="page">' % name, 1)
    if name in ('fondatrice.html', 'directrice.html'):
        h = h.replace('<a href="societe.html">About us</a>', '<a href="societe.html" aria-current="page">About us</a>', 1)
    h = h.replace('<a href="../index.html" lang="fr"', '<a href="../%s" lang="fr"' % name).replace('<a href="index.html" lang="en"', '<a href="%s" lang="en"' % name)
    body = open(os.path.join(parts, name), encoding='utf-8').read()
    # Les images et fichiers partagés sont un dossier plus haut
    body = re.sub(r'((?:src|href|data-full)=")assets/', r'\1../assets/', body)
    out = h + '<main id="contenu">\n' + body + '  </main>' + foot
    open(os.path.join(en, name), 'w', encoding='utf-8', newline='\n').write(out)
    print('ok en/' + name, len(out))
