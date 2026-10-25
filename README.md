# Site web SODEPAL SA

Proposition de refonte du site de [SODEPAL SA](https://www.sodepalsa.com/), à Ouagadougou au Burkina Faso. L'entreprise fabrique des farines infantiles enrichies, des biscuits et des pâtisseries depuis 1991.

C'est un site statique, sans base de données ni étape de compilation : HTML, CSS et JavaScript, sans dépendance.

## Pages

| Page | Fichier |
|---|---|
| Accueil | `index.html` |
| La société (acteurs, équipe, distinctions, partenaires) | `societe.html` |
| La fondatrice, Simone Zoundi | `fondatrice.html` |
| La Directrice générale, Yolande Alexise Zoundi | `directrice.html` |
| Produits (catalogue filtrable) | `produits.html` |
| Qualité | `qualite.html` |
| Actualités | `actualites.html` |
| Contact | `contact.html` |

## Organisation

```
css/style.css       styles (thème clair / sombre)
js/main.js          interactions (menu, carrousel, filtres, formulaire)
assets/img/         images optimisées (WebP)
assets/originaux/   photos d'origine du site actuel
archives/           versions précédentes de la maquette (v1, v2)
ANALYSE.md          analyse du site actuel, choix de conception, contenus à fournir
```

## Voir le site en local

```bash
python -m http.server 8080
```

Ouvrir ensuite http://localhost:8080.

## Avant la mise en ligne

Il faut retirer les encadrés jaunes « À compléter », ajouter les photos et faire valider les contenus. La liste complète est dans [ANALYSE.md](ANALYSE.md).
