# Site web SODEPAL SA

Proposition de refonte du site de **SODEPAL SA** (Société d'exploitation des produits alimentaires), à Ouagadougou au Burkina Faso. Depuis 1991, l'entreprise fabrique des farines infantiles enrichies, des biscuits, des confiseries et des pâtisseries à partir de ressources locales.

- Site actuel : https://www.sodepalsa.com/
- Technologie : **site statique** en HTML, CSS et JavaScript, sans framework ni dépendance, et sans étape de compilation.
- Langue : français.

---

## Sommaire
1. [Pages du site](#pages-du-site)
2. [Fonctionnalités](#fonctionnalités)
3. [Organisation des fichiers](#organisation-des-fichiers)
4. [Voir le site en local](#voir-le-site-en-local)
5. [Modifier le contenu](#modifier-le-contenu)
6. [Charte graphique](#charte-graphique)
7. [Mise en ligne](#mise-en-ligne)
8. [Sécurité](#sécurité)
9. [Avant la mise en ligne](#avant-la-mise-en-ligne)
10. [Sources](#sources)

---

## Pages du site

| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `index.html` | Carrousel en 4 diapositives (plus celle du temps fort du moment), bandeau d'engagements, bloc « À la une » sur l'extension de l'usine (2026), univers, présentation, « Une entreprise familiale depuis 1991 », publics, qualité, « Ils parlent de nous », appel final |
| La société | `societe.html` | Qui sommes-nous, Directrice générale, parcours, mission / objectif / valeurs, chaîne des acteurs, équipe, **mérites & distinctions**, partenaires, recrutement |
| La fondatrice | `fondatrice.html` | Simone Zoundi née Kafando : portrait, parcours de 1968 à 2026, organisations, décorations, sources |
| La Directrice générale | `directrice.html` | Yolande Alexise Zoundi : portrait, mot de la Directrice générale, grands chantiers, parcours |
| Produits | `produits.html` | Catalogue filtrable : farines, biscuits & confiserie, pâtisserie, boissons, autres spécialités |
| Qualité | `qualite.html` | Laboratoire, HACCP, normes NBF, démarche ISO 22000, étapes de fabrication, avis clients |
| Actualités | `actualites.html` | Extension de l'usine avec le PAM (6 mars 2026), ISO 22000, portrait de la fondatrice, JAAL 2025 |
| Contact | `contact.html` | Coordonnées, formulaire, carte, « Comment commander », FAQ |

**Version anglaise** : les 8 pages existent aussi en anglais dans le dossier `en/`, avec les mêmes noms de fichiers (`en/index.html`, `en/produits.html`…). Le bouton **FR / EN** de la barre du haut ouvre la même page dans l'autre langue et garde la section en cours. Les moteurs de recherche sont informés des deux versions par les balises `hreflang`.

---

## Fonctionnalités

- **Mobile d'abord** : la mise en page est vérifiée de 320 à 1366 px, sans défilement horizontal.
- **Thème clair / sombre** : il suit le réglage de l'appareil, et le choix du visiteur est mémorisé.
- **Menu** avec sous-menus « La société » et « Produits ». Sur mobile, il s'ouvre en panneau.
- **Carrousel d'accueil** : défilement automatique, pause, flèches du clavier, balayage au doigt. Il reste à l'arrêt si le visiteur a demandé de réduire les animations.
- **Temps forts de l'année** : Noël, Nouvel An, Saint-Valentin, 8 mars, carême, Ramadan, Korité, Pâques, Tabaski, Maouloud et rentrée scolaire. Pendant chaque période, un ruban s'affiche en haut de toutes les pages et une diapositive à ses couleurs, avec son propre décor, passe en tête du carrousel. Tout se règle dans `js/saisons.js`.
- **Catalogue filtrable**, avec un lien direct vers une gamme : `produits.html#farines`, `#biscuits`, `#patisserie`, `#boissons`, `#specialites`.
- **Formulaire de contact** qui ouvre la messagerie du visiteur avec le message déjà rédigé. L'objet peut être pré-rempli par l'adresse, par exemple `contact.html?sujet=Devenir%20revendeur`.
- **Indicateur « Ouvert / Fermé »** en direct, calculé à l'heure de Ouagadougou.
- **Compteurs animés**, apparitions au défilement, barre de progression de lecture, bouton d'appel flottant, retour en haut.
- **Référencement** : titre et description propres à chaque page, aperçu pour les réseaux sociaux (Open Graph), données structurées schema.org sur l'accueil, textes alternatifs sur toutes les images.
- **Accessibilité** : lien « Aller au contenu », navigation au clavier, contour de focus visible, contrastes vérifiés.
- **Performance** : moins de 1 Mo d'images en WebP pour tout le site (contre 5,8 Mo sur le site actuel), avec chargement différé. Logo de 8 Ko, une seule graisse pour la police italique, animations limitées à `transform` et `opacity` (elles ne redessinent pas la page), et animations du carrousel arrêtées quand il sort de l'écran.

---

## Organisation des fichiers

```
.
├── index.html, societe.html, fondatrice.html, directrice.html,
│   produits.html, qualite.html, actualites.html, contact.html
├── en/                  les mêmes 8 pages en anglais
├── css/style.css        styles communs (couleurs, thème sombre, mise en page mobile)
├── js/main.js           interactions communes à toutes les pages
├── js/saisons.js        temps forts de l'année (dates, textes, décors)
├── assets/
│   ├── img/             images optimisées utilisées par le site (WebP, PNG)
│   └── originaux/       photos d'origine récupérées sur le site actuel
├── archives/
│   ├── v1/              1re maquette (une seule page)
│   └── v2/              2e maquette (une seule page, inspirée de GELPAZ et Digital Station)
├── outils/              scripts de génération des pages et textes sources (voir CLAUDE.md)
├── ANALYSE.md           analyse du site actuel, choix de conception, recherches, contenus à fournir
├── CLAUDE.md            passation : tout ce qu'un nouvel agent doit savoir pour reprendre le projet
└── README.md
```

> L'**en-tête** (barre d'information et menu) et le **pied de page** sont copiés à l'identique dans chacune des 8 pages. Toute modification du menu, du téléphone ou de l'adresse doit être reportée dans **tous les fichiers `.html`**, y compris ceux du dossier `en/`. Le plus sûr est de modifier `index.html` et `en/index.html`, puis de régénérer les autres pages avec les scripts du dossier `outils/` (commandes dans `CLAUDE.md`).
>
> Toute modification de contenu faite sur une page française doit aussi être faite sur la page anglaise du même nom. Dans le formulaire de contact anglais, les options gardent leur valeur en français (`value="Commande de farines"`) : l'objet des e-mails reçus reste ainsi en français pour l'équipe.

---

## Voir le site en local

Python est installé sur la plupart des postes. Depuis le dossier du projet :

```bash
python -m http.server 8080
```

Ouvrir ensuite http://localhost:8080.

On peut aussi ouvrir `index.html` directement dans un navigateur. Tout fonctionne, sauf la carte Google Maps de la page Contact, qui demande un serveur.

---

## Modifier le contenu

| Je veux… | Où le faire |
|---|---|
| Changer le téléphone, l'e-mail ou l'adresse | Tous les `.html` (barre du haut, pied de page, Contact). Les adresses utilisées sont `contact@sodepal.com` (général) et `y.zoundi@sodepal.com` (Direction générale) |
| Changer la boîte qui reçoit le formulaire | `js/main.js`, ligne `var dest = …`. L'objet « Direction générale / presse » part vers `y.zoundi@sodepal.com`, tous les autres vers `contact@sodepal.com` |
| Ajouter un produit | `produits.html` : copier un bloc `<article class="product" data-cat="…">`. Les catégories sont `farines`, `biscuits`, `patisserie`, `boissons` et `specialites` |
| Ajouter une distinction | `societe.html` (section `#distinctions`) ou `fondatrice.html` : remplacer une carte `medal medal-empty` par une carte `medal` |
| Publier une actualité | `actualites.html` : ajouter une carte `news-card` et un bloc `<article class="article" id="…">`. Penser au bloc « À la une » de l'accueil et à la barre du haut |
| Ajouter une photo de l'équipe | Placer l'image dans `assets/img/equipe/`, puis ajouter `<img src="…" alt="…">` dans le bloc `.m-photo`, `.portrait` ou `.dg-photo` concerné |
| Changer les horaires | `contact.html`, FAQ, données schema.org de `index.html`, et le calcul « Ouvert / Fermé » dans `js/main.js` |
| Changer les couleurs | Variables en haut de `css/style.css` (`:root`) |
| Activer, couper ou modifier un temps fort (Noël, Ramadan…) | Liste `SAISONS` en haut de `js/saisons.js` : `actif: false` pour couper, `debut`/`fin` pour les dates fixes, `dates` par année pour les fêtes du calendrier lunaire. Pâques et le carême se calculent seuls |
| Voir un temps fort avant sa date | Ajouter `?saison=` à l'adresse, par exemple `index.html?saison=noel`, `?saison=ramadan` ou `?saison=tabaski` |

Pour garder un site léger, il faut **convertir les nouvelles photos en WebP**, en 900 px de large au plus. Un outil en ligne comme Squoosh suffit.

---

## Charte graphique

| Rôle | Couleur |
|---|---|
| Vert forêt (texte, fonds sombres) | `#12371D` / `#0B2414` |
| Vert principal (boutons, liens) | `#1F5A2E` |
| Vert feuille (accents) | `#7DB343` |
| Jaune maïs (accents, chiffres) | `#F2B632` |
| Brun mil (intitulés) | `#7A4B2A` |
| Fond de page (blanc) | `#FFFFFF` |
| Fond des sections alternées (blanc grisé) | `#F4F5F3` |
| Bordures | `#E2E4E0` |

Les couleurs reprennent le logo et les matières premières : la feuille, le maïs et le petit mil.

| Rôle | Police (Google Fonts) |
|---|---|
| Titres | Plus Jakarta Sans, 800 |
| Mots en italique dans les titres | Fraunces, italique |
| Petits intitulés, badges, numéros | DM Mono |
| Texte courant | Plus Jakarta Sans |

---

## Mise en ligne

C'est un site statique : il suffit de copier tous les fichiers (sauf `archives/`, `assets/originaux/`, `outils/` et les fichiers `.md`, inutiles en ligne), **y compris `.htaccess` et `.well-known/`**, chez n'importe quel hébergeur web. Par exemple :
- l'hébergement actuel de sodepalsa.com, en remplacement de WordPress ;
- Netlify ou Cloudflare Pages, qui sont gratuits et se branchent sur ce dépôt GitHub ;
- GitHub Pages, à condition que le dépôt soit public ou que le compte ait une offre payante.

Le formulaire de contact n'envoie rien lui-même : il ouvre la messagerie du visiteur. Pour un envoi direct, il faut brancher un service de formulaires (Formspree, Netlify Forms…) ou un petit script chez l'hébergeur.

---

## Sécurité

Le site est **statique** : il n'a ni base de données, ni code côté serveur, ni espace de connexion. L'**injection SQL est donc impossible**, et aucune donnée saisie par un visiteur n'est enregistrée ou réaffichée. Le formulaire de contact ouvre la messagerie du visiteur et n'envoie rien lui-même.

Protections en place :

| Risque | Protection |
|---|---|
| Injection de script (XSS) | Politique de sécurité du contenu (CSP) dans chaque page : seuls les scripts du site s'exécutent, un script injecté est bloqué. Les paramètres d'adresse (`?sujet=`, `?saison=`) ne sont jamais réaffichés tels quels |
| Site affiché dans le cadre d'un autre site (clickjacking) | `frame-ancestors 'none'` et `X-Frame-Options: DENY` (en-têtes serveur) |
| Ressources externes piégées | Seuls Google Fonts et la carte Google sont autorisés. La carte est isolée dans un bac à sable (`sandbox`) |
| Liens externes | `rel="noopener"` sur tous les liens qui ouvrent un nouvel onglet |
| Fichiers privés exposés | `.htaccess` renvoie une erreur 404 pour `.git`, les notes `.md`, `archives/` et `assets/originaux/`, et interdit la liste des dossiers |
| Connexion non chiffrée | Redirection vers HTTPS et en-tête HSTS |
| Fuite d'informations | `Referrer-Policy`, `Permissions-Policy` (caméra, micro, position désactivés), `X-Content-Type-Options` |

Fichiers à envoyer chez l'hébergeur avec le site :
- **`.htaccess`** pour un hébergement Apache ou LiteSpeed (cas le plus courant, comme l'hébergement WordPress actuel) ;
- **`_headers`** à la place, pour Netlify ou Cloudflare Pages ;
- **`.well-known/security.txt`**, qui indique où signaler une faille.

> Si le petit script du thème clair / sombre (en haut de chaque page) est modifié, son empreinte `sha256-…` doit être recalculée dans la CSP des pages, de `.htaccess` et de `_headers`, sinon il sera bloqué.

Le site WordPress actuel (sodepalsa.com) n'est pas concerné par ces protections. Tant qu'il reste en ligne, il faut tenir à jour WordPress, son thème et ses extensions.

---

## Avant la mise en ligne

La liste détaillée est dans [ANALYSE.md](ANALYSE.md). Les points principaux :

- [ ] Retirer tous les encadrés jaunes **« À compléter »** ou **« Texte proposé »** (classe `todo-note`).
- [ ] Photos officielles de **Simone Zoundi** et de **Yolande Alexise Zoundi**, puis de l'équipe.
- [ ] Faire valider le **Mot de la Directrice générale**, qui est une proposition de texte.
- [ ] Noms, photos et rôles des responsables de l'équipe, et logos des partenaires.
- [ ] Confirmer le **capital social** : le site actuel indique 100 M FCFA, la presse (2025) 1 milliard.
- [ ] Confirmer l'année **Ashoka** et la **stèle de la Rue des Étoiles**, marquées « À confirmer ».
- [ ] Fiches réelles des produits marqués **« À confirmer »** : Vita Soja, Koko Baga, Gonré rapide, biscuits au soja, poudre de baobab.
- [ ] Noms des deux nouvelles farines fortifiées lancées en 2026.
- [ ] Ajouter les prix et trophées de SODEPAL dans l'espace **Mérites & distinctions**.
- [ ] Numéro **WhatsApp**, pour remplacer le bouton d'appel flottant.
- [x] Adresses e-mail au nom de domaine : `contact@sodepal.com` (général) et `y.zoundi@sodepal.com` (Direction générale). L'adresse Yahoo n'est plus utilisée.
- [ ] Vérifier que les boîtes `contact@sodepal.com` et `y.zoundi@sodepal.com` sont bien créées et relevées.
- [ ] Chaque année, ajuster dans `js/saisons.js` les dates de Ramadan, Korité, Tabaski et Maouloud dès leur annonce officielle (celles de 2027 et 2028 sont indicatives).
- [ ] Confirmer les horaires (samedi compris ?) et le mode de retrait ou de livraison des commandes.
- [ ] Accord de la famille Zoundi pour la publication des biographies.

---

## Sources

Les informations sur la fondatrice, la Directrice générale et l'extension de 2026 viennent de :
- Sidwaya, « Simone Zoundi : une icône de la transformation locale des produits alimentaires », 31 décembre 2025
- Sidwaya, « L'unité de production de farines infantiles est fonctionnelle », 9 mars 2026
- Wakat Séra, « SODEPAL : enfants bien nourris, familles soutenues… », 6 mars 2026
- Burkina 24, « Agroalimentaire au Burkina Faso : Rencontre avec Simone Zoundi », 4 mai 2020
- CNULCD (ONU), fiche d'experte « Simone Zoundi née Kafando », 2015
- IPS, Journée internationale des femmes, 7 mars 2006
- Wikipédia, « Simone Zoundi »

Les liens complets sont sur la page `fondatrice.html` et dans `ANALYSE.md`.

Les photos de produits viennent du site actuel de SODEPAL. Aucune photo de presse n'a été reprise.
