# Vérifie que chaque lien interne pointe vers une page, une ancre ou une image existante
import sys, os, re
from urllib.parse import urlsplit, unquote

site = sys.argv[1]
pages = [f for f in os.listdir(site) if f.endswith('.html')]
ids = {p: set(re.findall(r'\bid="([^"]+)"', open(os.path.join(site, p), encoding='utf-8').read())) for p in pages}
filters = {'farines', 'biscuits', 'patisserie', 'boissons', 'specialites'}
bad = 0
for p in pages:
    html = open(os.path.join(site, p), encoding='utf-8').read()
    for ref in re.findall(r'(?:href|src)="([^"]+)"', html):
        if re.match(r'(https?:|mailto:|tel:|data:)', ref):
            continue
        u = urlsplit(ref)
        target = unquote(u.path) or p
        if not os.path.exists(os.path.join(site, target)):
            print(p, 'fichier manquant:', ref); bad += 1; continue
        if u.fragment and target.endswith('.html'):
            if u.fragment not in ids.get(target, set()) and not (target == 'produits.html' and u.fragment in filters):
                print(p, 'ancre manquante:', ref); bad += 1
print('pages:', sorted(pages), '| erreurs:', bad)
