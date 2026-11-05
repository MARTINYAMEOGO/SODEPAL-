# Passation du projet SODEPAL SA

Ce fichier permet à un nouvel agent de reprendre le projet sans l'historique des conversations. Il est lu automatiquement par Claude Code. À tenir à jour à la fin de chaque tâche.

Dernière mise à jour : 5 novembre 2026.

## En bref

- **Projet** : refonte du site de SODEPAL SA (Ouagadougou, Burkina Faso), qui fabrique des farines infantiles enrichies, des biscuits, des confiseries et des pâtisseries depuis 1991. Le site actuel, sodepalsa.com, tourne sous WordPress.
- **État** : le site vitrine est terminé dans le code (8 pages en français, 8 en anglais) mais **pas encore en ligne**. Il attend des contenus et des validations de SODEPAL.
- **Pas commencé** : la boutique en ligne et l'administration. Elles sont décrites dans le cahier des charges.
- **Dépôt** : https://github.com/MARTINYAMEOGO/SODEPAL-.git (privé, branche `main`).
- **Cahier des charges** : https://claude.ai/artifact/YNj2X6136iy4TxE2986Kf8. Il est privé. Si vous n'y avez pas accès, l'essentiel est résumé plus bas.
- **Documentation** : `README.md` (mode d'emploi, charte, sécurité, mise en ligne) et `ANALYSE.md` (diagnostic, recherches, sources).

## Règles fixées par l'utilisateur

À respecter sans redemander :

1. **Répondre en français**, simplement. L'utilisateur n'est pas développeur et écrit souvent des messages courts.
2. **Commiter et pousser sur GitHub à la fin de chaque tâche terminée**, sans demander : `GIT_TERMINAL_PROMPT=0 git push origin main`. Ne pas pousser un travail cassé ou à moitié fait.
3. **Tout est écrit à la main** en HTML, CSS et JavaScript. **Pas de PHP**, pas de WordPress, pas de Shopify.
4. **Couleurs** : fond de page blanc `#FFFFFF`, sections alternées blanc grisé `#F4F5F3`, bordures `#E2E4E0`. Le reste est dans la charte du README.
5. **Titre d'onglet** : « SODEPAL SA » seul sur toutes les pages. Le titre détaillé reste dans `og:title`.
6. **E-mails** : `contact@sodepal.com` (général) et `y.zoundi@sodepal.com` (direction). Ne plus utiliser Yahoo.
7. **Petits intitulés** (`.eyebrow`) : pas de tiret jaune devant, retiré à la demande de l'utilisateur.

## Règles de contenu

- **Ne rien inventer** sur l'entreprise ou les personnes. Un fait non vérifié porte un badge « À confirmer ». Les encadrés « À compléter » et « Texte proposé » ont été retirés à la demande de l'utilisateur : n'en remettre aucun, suivre ces points dans ce fichier.
- Yolande Alexise Zoundi est la fille aînée de Simone Zoundi, d'après les recherches sur la fondatrice. Le site le dit sur les pages Fondatrice, Directrice et Société.
- **Le Bessé est une liqueur** : ne jamais le mettre en avant pendant les fêtes musulmanes.
- **Farines infantiles** : aucune promotion, réduction ni fidélité, à cause du décret de 2022 sur les aliments pour nourrissons (voir « Points légaux »).
- Toute modification de contenu se fait **dans les deux langues**.

## Lancer le site

```bash
python -m http.server 8080
```

Depuis le dossier du projet, puis ouvrir http://localhost:8080. Dans l'application Claude, le serveur `sodepal` existe déjà dans `.claude/launch.json` (fichier non versionné) : utiliser `preview_start` avec ce nom.

Aperçu d'un temps fort avant sa date : `index.html?saison=noel` (aussi `ramadan`, `korite`, `tabaski`, `paques`, `careme`, `maouloud`, `nouvel-an`, `saint-valentin`, `femmes`, `rentree`).

## Comment les pages sont fabriquées

**Important : ne pas modifier directement les pages intérieures générées**, elles seraient écrasées.

| Pour changer… | Modifier… |
|---|---|
| En-tête, pied de page, `<head>`, accueil français | `index.html` |
| Les mêmes en anglais | `en/index.html` |
| Contenu d'une page intérieure française | `outils/pages/<page>.html` |
| Contenu d'une page intérieure anglaise | `outils/pages-en/<page>.html` |
| Titre de partage et description anglais | `outils/pages-en/<page>.meta.txt` (ligne 1 titre, ligne 2 description) |
| Titre de partage et description français | Liste `PAGES` de `outils/build.py` |

Puis régénérer et contrôler les liens, depuis la racine du projet :

```bash
python -I outils/build.py . outils/pages
```

```bash
python -I outils/build_en.py . outils/pages-en
```

```bash
python -I outils/links.py . && python -I outils/links.py en
```

`links.py` doit afficher `erreurs: 0` deux fois. Les pages générées sont : `societe`, `fondatrice`, `directrice`, `actualites`, `produits`, `qualite`, `contact`.

## Pièges connus

- **Sécurité (CSP)** : chaque page interdit les scripts en ligne et les domaines inconnus. Tout nouveau domaine (Supabase, paiement, statistiques…) doit être ajouté à **quatre endroits** : `index.html`, `en/index.html`, `.htaccess`, `_headers`. Puis régénérer.
- **Empreinte du script de thème** : si le petit `<script>` du `<head>` change, recalculer son `sha256-…` aux mêmes quatre endroits, sinon il est bloqué.
- **Injection SQL** : le site n'en a pas besoin de protection aujourd'hui, car il n'a pas de base de données. Dès qu'une base arrive, le risque devient réel (voir le cahier des charges).
- **Formulaire de contact anglais** : les options gardent leur valeur en français (`value="Commande de farines"`). Les objets d'e-mail et les liens `?sujet=` en dépendent. Ne pas traduire ces valeurs.
- **Ordre des scripts** : `js/saisons.js` doit rester chargé avant `js/main.js`, car il ajoute les diapositives avant le démarrage du carrousel.
- **Animations** : n'animer que `transform` et `opacity`. Les animations de `box-shadow` ou `width` ont rendu le site lent.
- **Images** : WebP, 900 px de large au plus. Le logo affiché est `logo-sodepal.webp` (8 Ko). `logo-sodepal.png` ne sert que pour les aperçus et les données structurées.
- **Petits écrans** : tester à 320 et 375 px. Sur mobile, un débordement agrandit `innerWidth` : comparer sa valeur à la largeur prévue, pas seulement à `scrollWidth`.
- **Version des fichiers** : `css/style.css`, `js/main.js` et `js/saisons.js` sont appelés avec `?v=AAAAMMJJ` dans `index.html` et `en/index.html`. Après toute modification de ces fichiers, changer ce numéro et régénérer, sinon les navigateurs gardent l'ancienne version (une semaine en ligne, à cause de `.htaccess`).
- **Navigateur intégré** : il garde les fichiers en cache. Forcer avec `fetch(url, {cache: 'reload'})` puis recharger. Masqué, il ralentit `requestAnimationFrame` : ne pas y mesurer la fluidité. Son journal de console garde d'anciens messages d'une page à l'autre.
- **Dates lunaires** : Ramadan, Korité, Tabaski et Maouloud sont saisis à la main dans `js/saisons.js` jusqu'en 2028, avec des dates indicatives. Les ajuster à chaque annonce officielle.
- **Fichiers à ne pas publier** : `archives/`, `assets/originaux/`, `outils/` et les `.md`. `.htaccess` les bloque, mais il vaut mieux ne pas les envoyer.

## Ce qui reste à faire

### 1. Publier le site vitrine

Tout dépend de l'utilisateur ou de SODEPAL. Dès qu'un élément arrive, l'intégrer dans les deux langues :

- [ ] Numéro **WhatsApp**, pour remplacer le bouton d'appel flottant (`.fab-call`, dans le pied de `index.html` et `en/index.html`).
- [ ] Photos de Simone Zoundi, de Yolande Alexise Zoundi et de l'équipe.
- [ ] **Bloquant avant publication** : validation du « Mot de la Directrice générale ». C'est un texte proposé, rédigé sans Mme Zoundi, et plus rien ne le signale. Il est dans `outils/pages/directrice.html` (section `#mot`). Sa citation d'ouverture figure aussi dans `outils/pages/societe.html` (section `#mot-du-dg`). Idem en anglais.
- [ ] Accord de la famille Zoundi pour les biographies.
- [ ] Noms et rôles des responsables, logos des partenaires. Les cartes « Nom et prénom » de la page Société sont encore visibles.
- [ ] Capital social : 100 M FCFA sur le site actuel, 1 milliard dans la presse en 2025.
- [ ] Année Ashoka et stèle de la Rue des Étoiles.
- [ ] Fiches de Vita Soja, Koko Baga, Gonré rapide, biscuits au soja, poudre de baobab.
- [ ] Noms des deux farines fortifiées lancées en 2026.
- [ ] Prix et trophées de SODEPAL.
- [ ] Horaires du samedi, mode de retrait ou de livraison.
- [ ] Création des boîtes e-mail, choix du domaine (sodepal.com ou sodepalsa.com).
- [ ] Relecture de l'anglais par un anglophone.

Mise en ligne : voir le README. Ne rien publier sans l'accord explicite de l'utilisateur.

### 2. Boutique et administration

**Ne pas commencer sans le feu vert de l'utilisateur.** Le 26 octobre 2026, il a mis ce chantier de côté parce qu'il le jugeait trop grand, puis il a demandé le cahier des charges le 5 novembre. **La question de l'enregistrement des données n'a jamais reçu de réponse.** Les options présentées étaient :

| Option | Avantage | Limite |
|---|---|---|
| Supabase (recommandé par le cahier des charges) | Vrai stock partagé, site toujours en HTML, CSS et JS | Compte à créer ; hébergé à l'étranger, donc autorisation de la CIL ; offre Pro à partir de 25 $ par mois |
| Petit serveur Python avec SQLite | Tourne déjà sur le poste | Demande un serveur dédié (VPS) |
| Données dans le navigateur | Immédiat, sans compte | Simple maquette : le stock n'est pas partagé |

Résumé des lots du cahier des charges :

- **Lot 1, pour vendre** : catalogue avec prix en FCFA, recherche, panier, commande sans compte, retrait ou livraison par zone, paiement à la réception, Mobile Money manuel, suivi de commande, confirmations, WhatsApp. Côté administration : rôles et double authentification, produits, stock, commandes, validation des paiements, zones de livraison, tableau de bord.
- **Lot 2, pour automatiser** : pâtisserie sur commande, paiement automatique, comptes clients, collections de saison, codes promo, lots et dates limites, gestion des temps forts et des contenus, factures, fiches clients, statistiques, journal d'activité, espaces revendeurs et ONG, points de vente, recettes, mesure d'audience.
- **Lot 3, pour fidéliser** : réapprovisionnement régulier, avis, fidélité, lettre d'information, application installable, mooré et dioula, stock unifié avec la boutique physique, export comptable.

Exigences clés : prix et stock recalculés côté serveur, stock déduit en une seule opération, aucune requête construite avec du texte saisi, aucun numéro de carte stocké, commande marquée payée uniquement sur notification signée du prestataire, sauvegarde quotidienne, test d'intrusion avant l'ouverture.

Ordre prévu : mise en ligne du site vitrine, cadrage, lot 1, essais avec l'équipe, ouverture (après le récépissé de la CIL et un test d'intrusion réussi), lots 2 et 3.

### Décisions attendues de la direction

Hébergement de la base, vente en ligne des farines infantiles, vente du Bessé (recommandation : non au lancement), modes de paiement, zones de livraison, prix et stock de départ, responsables au quotidien, budget annuel.

## Points légaux à faire valider par un juriste

- **Loi 001-2021/AN** (lue) : déclaration à la CIL (art. 27), autorisation pour tout transfert vers un pays étranger (art. 31), droits des personnes (art. 17, 20, 21, 22), sécurité (art. 24), durée de conservation (art. 25).
- **Décret signé le 9 juin 2022** sur la commercialisation des aliments pour nourrissons : texte final non lu, seulement un article d'Alive & Thrive.
- **Loi 045-2009/AN** sur les transactions électroniques : **non consultée**, le site qui l'héberge était indisponible.
- **Tarifs de paiement** : non vérifiés. CinetPay annonce Orange Money, Moov Money, VISA et Mastercard au Burkina Faso. Demander une offre écrite et comparer avec PayDunya et LigdiCash.

## Autres points en suspens

- Une version « v3 sobre » se trouve dans `Downloads\SODEPAL--main\SODEPAL--main`. Elle n'est pas sur GitHub et l'utilisateur n'a pas décidé s'il voulait l'importer. Il a choisi de continuer avec la version actuelle.
- Compromis proposé pour les titres d'onglet (« Produits · SODEPAL SA » sur les pages intérieures) : sans réponse. Ne pas l'appliquer sans demande.
