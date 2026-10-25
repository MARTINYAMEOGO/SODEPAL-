# Analyse de sodepalsa.com et proposition de refonte

*Analyse du 25 octobre 2026 : site WordPress 7.1.3 avec le thème Avada et Fusion Builder.*

## 1. Diagnostic du site actuel

### Structure et navigation
| Constat | Effet |
|---|---|
| Le site tient sur une seule page de plus de 8 000 px de haut, **sans menu de navigation**. | Le visiteur doit tout faire défiler pour trouver les produits ou le contact. |
| Les titres ne suivent pas de logique : h1 « sodepal SA », puis beaucoup de h2 au même niveau, et des coordonnées placées dans des h3. | Google et les lecteurs d’écran ne voient pas la hiérarchie du contenu. |
| Le contact arrive tout en bas. Le téléphone et l’e-mail ne sont **pas cliquables**, et il n’y a ni formulaire ni carte. | Sur mobile, on ne peut pas appeler d’un simple toucher. Des commandes sont sans doute perdues. |
| Il n’y a pas d’appel à l’action (commander, devis pâtisserie, devenir revendeur). | Le site informe, mais ne fait pas venir de clients. |

### Performance
| Mesure | Site actuel |
|---|---|
| Temps de chargement complet | **≈ 8,3 s** |
| Requêtes HTTP | **157** |
| Scripts JavaScript | Plus de 30, dont jQuery, GSAP, Isotope, Swiper, Flexslider et iLightbox. |
| Photos | 16 photos JPEG de 1440 à 2560 px, soit **≈ 5,8 Mo** au total. Le logo PNG fait à lui seul 650 Ko en 2560 × 2365 px. |

Au Burkina Faso, beaucoup de visiteurs naviguent en 3G/4G avec des forfaits limités. Ce poids les pénalise directement. Pendant l’analyse, des sections sont aussi restées **vides** au défilement : le contenu était masqué par des animations qui ne se déclenchaient pas.

### Référencement (SEO)
- Il n’y a **pas de meta description** : Google affiche un extrait choisi au hasard.
- Le titre de la page se limite à « SODEPAL SA », sans mots-clés comme farine infantile, Ouagadougou ou Burkina.
- Les 17 images n’ont **aucun texte alternatif** et ont des noms de fichier comme `IMG_20200527_154151_0-scaled-e1590659707349.jpg`.
- Il n’y a pas de données structurées (schema.org) : pas d’adresse, d’horaires ni de téléphone lisibles par Google Maps et la recherche locale.
- Le partage sur les réseaux sociaux (Open Graph) se fait sans image ni description, et les champs Facebook et Twitter sont vides.

### Contenu et rédaction
- Il y a des coquilles : « création de richess », « Rue13.24 », un espace avant « ; ».
- Le texte est dense et répétitif, avec « valorisation des ressources locales » quatre fois.
- La certification **NBF** des farines, un vrai argument de confiance, est cachée dans un petit h4.
- Le titre « Notre laboratoire » n’est suivi que d’une phrase.
- Les formats (50 g à 1 kg) sont écrits en majuscules dans un bloc de texte au lieu d’être mis en valeur.

### Image de marque et crédibilité
- L’adresse de contact est sur **Yahoo** (`sodepal3@yahoo.fr`) au lieu du domaine de la société (`contact@sodepalsa.com`).
- La bannière d’accueil est un montage de viennoiseries alors que le cœur de métier est la **farine infantile enrichie**. Le message principal est brouillé.
- Les photos produits datent de mai 2020 : sachets pris sur un fond gris, sans mise en scène.
- Il n’y a ni liens vers des réseaux sociaux, ni WhatsApp (très utilisé localement), ni points de vente.

### Accessibilité
- Les contrastes sont faibles : gris #676371 sur fond clair.
- Les images n’ont pas d’alternative textuelle.
- Les coordonnées sont des titres et non des liens.

---

## 2. La proposition : ce qui a été construit

Les fichiers sont dans ce dossier :

```
index.html          page complète
css/style.css       design (aucun framework)
js/main.js          interactions (aucune dépendance)
assets/img/         images optimisées en WebP
assets/originaux/   photos d’origine téléchargées du site
```

### Organisation de la page
1. **En-tête fixe** : logo, menu (Société, Produits, Qualité, Contact) et un bouton **Appeler** cliquable. Sur mobile, un menu « hamburger » le remplace.
2. **Accroche** : « Des aliments locaux, enrichis pour bien grandir ». Elle met en avant le cœur de métier, avec deux boutons (Découvrir les produits, Passer commande) et trois garanties visibles (certifiées NBF, HACCP, laboratoire interne).
3. **Bandeau de chiffres** : 1991, 4 farines, formats de 50 g à 1 kg, marchés national et sous-régional.
4. **La société** : trois cartes (Notre pays, Notre société, Notre mission) avec le texte d’origine resserré et corrigé.
5. **Produits en onglets** : farines, biscuits et confiserie, pâtisserie, Bessé. Chaque produit a sa fiche avec photo, étiquette (maïs, petit mil, moringa…) et description. Les formats apparaissent en pastilles, et la galerie pâtisserie s’agrandit au clic.
6. **Qualité** : quatre engagements illustrés (HACCP, normes et NBF, laboratoire, personnel formé).
7. **Bandeau** « pionnière… » avec un bouton **Devenir revendeur**.
8. **Contact** : téléphone, e-mail et itinéraire Google Maps, tous cliquables. Les horaires affichent « Ouvert / Fermé en ce moment ». Un formulaire précise l’objet (commande de farines, pâtisserie, revendeur…) et ouvre la messagerie avec le message déjà rédigé.

### Gains techniques
| | Avant | Après |
|---|---|---|
| Poids des images | ≈ 5,8 Mo | **≈ 500 Ko** (WebP, 900 px maximum) |
| Poids total du site, toutes images comprises | — | **≈ 660 Ko** |
| Requêtes à l’ouverture de la page | 157 | **≈ 10** (les autres images se chargent au défilement) |
| JavaScript | Plus de 30 fichiers, jQuery | 1 fichier de 5 Ko, sans dépendance |
| Meta description, Open Graph, schema.org | Absents | **Présents** (FoodEstablishment avec adresse, horaires et téléphone) |
| Textes alternatifs des images | 0 sur 17 | Tous renseignés |
| Mobile | Adaptatif mais lourd, sans navigation | Pensé d’abord pour le mobile, sans défilement horizontal |
| Accessibilité | Faible | Lien « Aller au contenu », onglets utilisables au clavier, focus visible, contrastes renforcés, animations coupées si l’utilisateur le demande |

### Identité visuelle
La palette reprend les couleurs du logo et des matières premières :
- vert forêt pour la feuille et la confiance ;
- jaune maïs pour le maïs et l’énergie ;
- brun mil pour le petit mil ;
- fond crème, plus chaleureux qu’un blanc pur.

Les polices sont *Fraunces*, un serif chaleureux pour les titres, et *Plus Jakarta Sans*, très lisible, pour le texte.

---

## 3. À fournir par SODEPAL pour finaliser
1. **Photos professionnelles** des produits, sur fond uni ou en situation (bol de bouillie, enfant, goûter). C’est le levier n°1 de crédibilité.
2. **Adresse e-mail au nom de domaine**, par exemple `contact@sodepalsa.com`.
3. **Numéro WhatsApp** pour ajouter un bouton de commande directe.
4. **Points de vente et distributeurs**, au Burkina et dans la sous-région, pour une section « Où trouver nos produits ».
5. **Le samedi est-il ouvert ?** La page indique « En semaine : 6h30–18h », et les données Google supposent du lundi au samedi : à confirmer.
6. **Composition et valeurs nutritionnelles** de chaque farine, pour une fiche produit détaillée et un PDF téléchargeable pour les ONG et les centres de santé.
7. **Numéro et date de certification NBF**, et éventuellement des logos de partenaires (ministère de la Santé, ONG, programmes nutrition).
8. Des liens vers les **réseaux sociaux**, s’ils existent.
9. **Retrait ou livraison ?** L’étape 4 de « Comment commander » indique un retrait à Zogona : à corriger si SODEPAL livre.
10. **Vrais témoignages** de clients ou partenaires et **actualités**, pour ajouter ces sections inspirées de GELPAZ.

## 4. Version 2 : idées reprises des sites de référence

*25 octobre 2026. La version 1 est conservée dans `archives/v1/`.*

Trois sites ont été étudiés. **alliance-co.ikasolution.bf était injoignable** (la connexion expire, depuis le navigateur comme en ligne de commande) et n'a donc pas pu être pris en compte.

### Repris de gelpaz.com (GELPAZ IMMO)
| Idée | Adaptation pour SODEPAL |
|---|---|
| Barre d’information au-dessus du menu (e-mail, téléphone, annonce) | Barre verte foncée avec e-mail, téléphone, l’annonce « Vitaline & Vita Casui certifiées NBF » et un indicateur **Ouvert / Fermé** en direct |
| Accueil plein écran en carrousel, compteur « 02 / 03 » et grand slogan en filigrane | Trois diapositives (Farines, Biscuiterie, Pâtisserie), un compteur 01/03 avec barre de progression, des points, un bouton pause et le slogan **« POUR VOTRE BIEN-ÊTRE »** en filigrane |
| « Nos gammes » en cartes numérotées 01 à 04 | Quatre gammes (farines, biscuits, pâtisserie, Bessé). Un clic filtre directement le catalogue. |
| « Qui sommes-nous » avec photos superposées, badge rotatif, encadré « 23+ années » et liste à coches | Le même principe : un badge rotatif « SODEPAL · POUR VOTRE BIEN-ÊTRE · DEPUIS 1991 » et un encadré **34+ années d’expérience**, calculé automatiquement à partir de la date de création |
| Chiffres clés animés | 1991, 100 M FCFA, 4 farines, 5 formats, avec compteurs animés |
| Catalogue filtrable avec badges | Filtres Tout / Farines / Biscuits / Pâtisserie / Boissons et badges « Certifiée NBF » |
| « Comment acheter » en 4 étapes | « Comment commander » : Choisissez → Contactez-nous → Confirmez → Récupérez |
| Formulaire avec « Objet », bandeau final et bouton WhatsApp flottant | Formulaire avec objet pré-rempli, bandeau « Prêt à commander ? », **bouton d’appel flottant** et bouton retour en haut |

### Repris de digitalstation.bf (Digital Station)
| Idée | Adaptation pour SODEPAL |
|---|---|
| Titres très grands, en majuscules, avec un mot en italique serif | « NOURRIR *la* CROISSANCE DE NOS ENFANTS » : majuscules grasses, un mot en italique Fraunces et une ligne en lettres détourées |
| Petits intitulés en police à chasse fixe | Police DM Mono pour les intitulés, badges et numéros |
| Services en lignes numérotées 01, 02… | Section Qualité sur fond sombre, en lignes numérotées qui s’animent au survol |
| Cartes par public (PME / international / institutions) | **« Des réponses adaptées à vos besoins »** : Familles, Santé & ONG, Revendeurs, Événements |
| FAQ | Sept questions fréquentes, rédigées uniquement à partir des informations du site actuel |
| Bandeau défilant de logos | Bandeau défilant des matières premières : Maïs · Petit mil · Moringa · Sésame · Miel · Vanille |
| Grand appel final « Travaillons ensemble » | « PRÊT À *commander* ? » avec Appeler / Écrire |
| Mode sombre et étiquette verticale sur le côté | Bouton clair / sombre (le choix est mémorisé) et étiquette verticale « À propos de nous » |

### Volontairement non repris
- **Témoignages clients et actualités** (présents sur GELPAZ) : SODEPAL n’en a fourni aucun, et inventer des avis serait trompeur. Ces sections pourront être ajoutées avec de vrais contenus.
- **Bouton WhatsApp** : aucun numéro connu. Un bouton d’appel le remplace pour l’instant.
- **Bandeau de cookies** : le site n’utilise aucun traceur, il n’est donc pas nécessaire.
- **Sélecteur FR / EN** : il n’existe pas de version anglaise pour l’instant.

## 5. Version 3 : un site en pages indépendantes

*25 octobre 2026. La version 2, sur une seule page, est conservée dans `archives/v2/`.*

### Arborescence
| Page | Fichier | Contenu |
|---|---|---|
| Accueil | `index.html` | Carrousel, gammes, aperçu de la société, publics, aperçu qualité, appel final |
| La société | `societe.html` | Qui sommes-nous, **Mot du Directeur général**, parcours depuis 1991, mission / objectif / valeurs, **Nos acteurs** (chaîne de valeur), **L’équipe** (6 départements), **Partenaires**, **Nous rejoindre** (candidature, stage) |
| Produits | `produits.html` | Catalogue filtrable (`produits.html#farines`, `#biscuits`, `#patisserie`, `#boissons`), points clés sur les farines, devis pâtisserie |
| Qualité | `qualite.html` | Laboratoire, 4 engagements (HACCP, normes, labo, personnel), étapes de fabrication, encart « Votre avis compte » |
| Contact | `contact.html` | Coordonnées, formulaire (objet pré-rempli par `?sujet=…`), carte, « Comment commander », FAQ |

Le menu a des sous-menus pour **La société** et **Produits**. Sur mobile, ils s’affichent en liste.

### Idées reprises de sonatur.bf (SONATUR)
- **Sous-menu « À propos »** (Présentation, Mot du DG, Qualité…) → sous-menu « La société » avec ancres vers chaque partie.
- **Mot du Directeur général** → section dédiée, avec photo et légende. Le texte est **une proposition à faire valider** par la Direction.
- **Offres de stage** → bouton « Demande de stage » et objet du même nom dans le formulaire.
- **Réclamations / enquête de satisfaction** → encart « Votre avis compte » sur la page Qualité, et objet « Réclamation / avis ».
- **Pages séparées par thème**, avec un bandeau titre et un fil d’Ariane sur chaque page intérieure.

### Contenus à fournir pour « La société »
Les emplacements sont prêts et signalés à l’écran par un encadré jaune **« À compléter »**. Il faut **supprimer cet encadré avant la mise en ligne**.
1. **Mot du DG** : nom, photo et validation (ou réécriture) du texte proposé.
2. **Équipe** : nom, photo (format paysage, dans `assets/img/equipe/`) et une phrase pour chacun des 6 responsables : Direction, RAQ-Nutrition et laboratoire, Production, Pâtisserie, Biscuiterie, Commercial. Il faut aussi confirmer l’organigramme réel.
3. **Partenaires** : logos et noms, en trois familles (normalisation, santé et nutrition, distribution).
4. **Parcours** : les dates clés après 1991 (lancement de Vitaline, de Vita Casui, certification NBF…). Pour l’instant, seule 1991 est datée.

> Note technique : l’en-tête et le pied de page sont identiques sur les 5 pages. Une modification du menu doit donc être reportée dans chaque fichier.

## 6. La fondatrice et les distinctions

*25 octobre 2026. Recherche en ligne sur Simone Zoundi et SODEPAL.*

### Nouvelles pages et sections
- **`fondatrice.html`** — portrait de Simone Zoundi née Kafando, parcours de 1968 à 2026, organisations fondées ou présidées, **mérites et décorations**, sources.
- **`societe.html#distinctions`** — nouvel espace **« Mérites & distinctions »** pour SODEPAL : 4 cartes renseignées et **2 emplacements vides** prêts à recevoir de nouveaux prix.
- Le sous-menu « La société » comprend désormais **La fondatrice** et **Mérites & distinctions**.

### Ce que la recherche a apporté
| Information | Source(s) | Statut |
|---|---|---|
| Fondatrice : Simone Zoundi née Kafando, diplômée de l’ESCAE en 1968 | CNULCD, Burkina 24, Sidwaya | Vérifié |
| SODEPAL créée le 23 décembre 1991 | Wakat Séra 2026, Sidwaya 2026 (IPS 2006 indique 1992) | Vérifié |
| SIBB fondée en 1980, nationalisée en 1983 | Sidwaya 2025, Wikipédia | Vérifié |
| Fondatrice et présidente de la FIAB (1991) | CNULCD, Burkina 24 | Vérifié |
| UAFM, AFCE (1990), RFD (1993), CES (1993–1996), CNPB-GERME, GPI (1976) | CNULCD, IPS | Vérifié |
| Présidente de l’AJAAL (2009) | Burkina 24, Wikipédia | Vérifié |
| **Chevalier de l’Ordre national (1996)** | CNULCD, Wikipédia | Vérifié |
| **Prix de la combativité CAPEO (1997)** | CNULCD | Vérifié |
| **Prix de la créativité FIRSIT (1998)** | CNULCD | Vérifié |
| **Ashoka Fellow** | Page ashoka.org existante, mais bloquée par un contrôle anti-robot | Fellowship probable, année 2016 selon Wikipédia, **à confirmer** |
| Stèle à la Rue des Étoiles (2025) | Wikipédia uniquement | **À confirmer** |
| Directrice générale actuelle : **Yolande Alexise Zoundi** | Sidwaya, Wakat Séra (2026) | Vérifié |
| Extension inaugurée le 6 mars 2026 avec le PAM : 36 t/jour, 46 emplois permanents, environ 300 indirects | Wakat Séra, Sidwaya (mars 2026) | Vérifié |
| Démarche de certification ISO 22000 engagée | Wakat Séra (2026) | Vérifié (en cours) |

**Aucun prix décerné à SODEPAL en tant qu’entreprise** n’a été trouvé en ligne. Les deux emplacements vides de l’espace distinctions servent à ajouter ceux que l’entreprise possède (trophées des salons, des JAAL, etc.).

### Mises à jour faites sur le site
- « Mot du Directeur général » devient **« Mot de la Directrice générale »**, avec le nom de Yolande Alexise Zoundi. Le texte reste une proposition à valider.
- La carte Direction de l’équipe porte son nom.
- Le parcours se termine sur l’**extension de 2026**.
- Les chiffres de la page Société affichent 36 t/jour, 46 emplois permanents et environ 300 indirects.
- La page Qualité mentionne la **démarche ISO 22000**.

### Points à faire vérifier par SODEPAL
1. **Capital social** : le site actuel indique 100 millions de FCFA, Sidwaya (décembre 2025) **1 milliard de FCFA**. Le chiffre de 100 M FCFA est conservé en attendant confirmation.
2. **Ville de l’ESCAE** : Burkina 24 et Wikipédia indiquent Toulouse, Sidwaya parle de Montpellier. La page ne cite pas de ville.
3. **Ashoka** (année) et **stèle de la Rue des Étoiles** : à confirmer, ils sont marqués « À confirmer » sur la page.
4. **Photo officielle** de Simone Zoundi et de la Directrice générale. Je n’ai pas repris les photos de presse, qui appartiennent à leurs auteurs.
5. **Accord de la famille** pour publier la biographie et la citation. La section « Sources » peut être retirée si elle n’est pas souhaitée.
6. **Produits actuels** : la presse cite aussi Koko Baga, Vita Soja, Gonré rapide, des biscuits au soja et de la poudre de baobab, qui ne figurent pas encore au catalogue.

## 7. Actualités, page de la Directrice générale et nouveaux produits

*25 octobre 2026.*

### Où l’actualité de l’extension est mise en avant
L’inauguration du 6 mars 2026 est **le message le plus fort du moment**. Elle apparaît à 6 endroits, du plus visible au plus détaillé :
1. **Barre du haut**, sur toutes les pages : « Nouveau : notre usine agrandie produit jusqu’à 36 t de farines par jour », avec un lien vers l’article.
2. **Carrousel d’accueil**, en 2ᵉ diapositive : « Une usine agrandie — 36 tonnes par jour ».
3. **Bloc « À la une »** sur l’accueil, juste sous le carrousel : chiffres clés (36 t, 46 / 40 / environ 300 emplois) et citation de la Directrice générale.
4. **Chiffres de l’accueil et de La société** : 36 t de farines par jour, 46 emplois permanents.
5. **Page Actualités** (`actualites.html`) : article complet, avec ce qui a été investi, la production, les emplois et la suite.
6. **Page de Mme Yolande Zoundi**, dans sa feuille de route.

### Nouvelles pages
| Page | Fichier | Contenu |
|---|---|---|
| **La Directrice générale** | `directrice.html` | Portrait de Yolande Alexise Zoundi, citation, **Mot de la Directrice générale** (déplacé ici), **4 grands chantiers** (produire plus, qualité / ISO 22000, emploi, croissance vers 5 pays), parcours à compléter, contact de la direction |
| **Actualités** | `actualites.html` | Article à la une (extension 2026), cartes (ISO 22000, portrait Sidwaya de la fondatrice, 13ᵉ JAAL), articles détaillés avec leurs sources, encart presse |

L’accueil gagne aussi une section **« Deux générations, une même mission »**, qui renvoie vers la fondatrice et vers la Directrice générale.

Les menus sont mis à jour : **Actualités** dans le menu principal, et **La Directrice générale** dans le sous-menu « La société ». Le bouton « Passer commande » devient « Commander » pour garder le menu sur une ligne. Le formulaire de contact a un nouvel objet, **« Direction générale / presse »**.

### Produits cités par la presse
Ils sont ajoutés au catalogue sous le filtre **« Autres spécialités »** (`produits.html#specialites`), avec un badge **« À confirmer »** et « Photo à venir » : **Vita Soja, Koko Baga, Gonré rapide, Biscuits au soja, Poudre de baobab**. Les descriptions restent volontairement prudentes. Il faut les remplacer par les fiches réelles (composition, formats, photo), ou retirer les produits qui ne sont plus fabriqués.

### À fournir pour la page de Mme Zoundi
- Photo officielle, en format portrait.
- Formation, parcours et date de prise de fonction : on ne trouve rien en ligne en dehors de l’inauguration de 2026.
- Validation du « Mot de la Directrice générale », qui est une proposition de texte.
- Les noms des deux nouvelles farines fortifiées lancées avec l’extension : la presse ne les cite pas.

## 8. Pistes pour la suite
- **Pages produits séparées** (une URL par farine) pour mieux se positionner sur « farine infantile Burkina ».
- **Version anglaise**, pour les ONG et partenaires internationaux de la nutrition.
- **Formulaire avec envoi réel**, via Formspree, Netlify Forms ou un petit script PHP chez l’hébergeur. Aujourd’hui, le formulaire ouvre la messagerie du visiteur.
- **Mise en ligne** : la page est statique et peut remplacer WordPress (hébergement moins cher, plus sûr, sans mises à jour d’extensions). On peut aussi la recréer dans le thème actuel si l’équipe veut garder WordPress pour éditer le contenu.
