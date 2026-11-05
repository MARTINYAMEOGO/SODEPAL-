# Assemble les pages intérieures : en-tête et pied de page repris de index.html
import sys, os, re

site, parts = sys.argv[1], sys.argv[2]
home = open(os.path.join(site, 'index.html'), encoding='utf-8').read()
head, rest = home.split('<main id="contenu">', 1)
foot = rest.split('</main>', 1)[1]

PAGES = [
    ('societe.html', 'La société SODEPAL SA : histoire, mission et acteurs | Ouagadougou',
     'Créée en 1991, SODEPAL SA valorise les ressources locales du Burkina Faso pour lutter contre la malnutrition. Découvrez notre histoire, notre mission, nos équipes et nos partenaires.'),
    ('fondatrice.html', 'Simone Zoundi, fondatrice de SODEPAL SA : parcours et distinctions',
     'Simone Zoundi née Kafando, pionnière de l’agroalimentaire au Burkina Faso, fondatrice de SODEPAL (1991) et de la FIAB, Chevalier de l’Ordre national (1996). Parcours, engagements et distinctions.'),
    ('directrice.html', 'Yolande Alexise Zoundi, Directrice générale de SODEPAL SA',
     'Yolande Alexise Zoundi dirige SODEPAL SA. Portrait, mot de la Directrice générale et grands chantiers : extension de l’usine (36 t/jour), ISO 22000, emplois et nouveaux marchés.'),
    ('actualites.html', 'Actualités SODEPAL SA : extension de l’usine, qualité, événements',
     'Les actualités de SODEPAL SA : inauguration de l’extension de l’usine le 6 mars 2026 avec le PAM (36 tonnes de farines infantiles par jour), démarche ISO 22000, JAAL 2025.'),
    ('produits.html', 'Nos produits : farines Vitaline et Vita Casui, biscuits, pâtisserie | SODEPAL SA',
     'Farines infantiles enrichies certifiées NBF (Vitaline au maïs, Vita Casui au petit mil, de 50 g à 1 kg), biscuits Bisdelice au moringa, vanille et sésame, bonbons Toedo, pâtisserie sur commande et Bessé.'),
    ('qualite.html', 'Démarche qualité : HACCP, normes NBF et laboratoire | SODEPAL SA',
     'Règles HACCP, normes nationales et internationales, farines certifiées NBF et laboratoire interne : découvrez comment SODEPAL contrôle la qualité de ses produits.'),
    ('contact.html', 'Contact et commandes | SODEPAL SA, Zogona, Ouagadougou',
     'Contactez SODEPAL SA à Zogona, Ouagadougou : +226 25 36 10 82, contact@sodepal.com. Commandes, devis pâtisserie, revendeurs, partenariats, candidatures.'),
]

for name, title, desc in PAGES:
    h = head
    h = re.sub(r'<title>.*?</title>', '<title>SODEPAL SA</title>', h, flags=re.S)  # onglet : le nom seul ; le titre détaillé reste dans og:title
    h = re.sub(r'(<meta name="description" content=")[^"]*', lambda m: m.group(1) + desc, h)
    h = re.sub(r'(<meta property="og:description" content=")[^"]*', lambda m: m.group(1) + desc, h)
    h = re.sub(r'(<meta property="og:title" content=")[^"]*', lambda m: m.group(1) + title, h)
    h = h.replace('href="https://www.sodepalsa.com/">', 'href="https://www.sodepalsa.com/' + name + '">')
    h = h.replace('content="https://www.sodepalsa.com/">', 'content="https://www.sodepalsa.com/' + name + '">')
    h = h.replace('href="https://www.sodepalsa.com/en/">', 'href="https://www.sodepalsa.com/en/' + name + '">')
    # Sélecteur FR / EN : même page dans l'autre langue
    h = h.replace('<a href="index.html" lang="fr"', '<a href="%s" lang="fr"' % name).replace('href="en/index.html"', 'href="en/%s"' % name)
    # Les données structurées de l'entreprise restent sur l'accueil
    h = re.sub(r'\s*<script type="application/ld\+json">.*?</script>', '', h, flags=re.S)
    # Lien actif du menu
    h = h.replace('<a href="index.html" aria-current="page">Accueil</a>', '<a href="index.html">Accueil</a>')
    h = h.replace('<a href="%s">' % name, '<a href="%s" aria-current="page">' % name, 1)
    if name in ('fondatrice.html', 'directrice.html'):  # pages rattachées à « La société »
        h = h.replace('<a href="societe.html">La société</a>', '<a href="societe.html" aria-current="page">La société</a>', 1)
    body = open(os.path.join(parts, name), encoding='utf-8').read()
    out = h + '<main id="contenu">\n' + body + '  </main>' + foot
    open(os.path.join(site, name), 'w', encoding='utf-8', newline='\n').write(out)
    print('ok', name, len(out))
