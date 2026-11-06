# HANDOFF — Site SODEPAL SA

Mis à jour le 6 novembre 2026. Le détail du projet (règles, fabrication des pages, pièges, lots de la boutique, points légaux) est dans `CLAUDE.md`.

## Objectif en cours

Finaliser le site vitrine bilingue pour le publier. L'utilisateur l'améliore page par page, à partir de captures d'écran.

## État actuel

- Site complet dans le code : 8 pages en français, 8 en anglais. Il n'est pas en ligne.
- Tout est poussé sur GitHub, branche `main`. Aucun travail inachevé.
- Boutique et administration : pas commencées, décrites dans le cahier des charges. Attendre le feu vert de l'utilisateur.

## Reste à faire

1. Attendre les contenus de SODEPAL, listés dans `CLAUDE.md` (« Ce qui reste à faire »). Le numéro WhatsApp manque toujours.
2. Avant publication, faire valider le « Mot de la Directrice générale », qui est un texte proposé.
3. Décider du sort des emplacements vides, jamais tranché par l'utilisateur :
   - cartes « Nom et prénom » de la page Société ;
   - cartes vides des distinctions ;
   - étapes « Formation » et « Année » de l'arbre de la page Directrice.

## Vérifié

- Parcours en arbre : Fondatrice (français et anglais) et Directrice sur grand écran, sans chevauchement de texte ; Fondatrice à 375 px, sans débordement.
- Liens internes : `erreurs: 0` dans les deux langues.
- Tirets décoratifs : aucun sur les pages contrôlées. Toutes les pages partagent le même style.

## Non vérifié

- La fluidité réelle sur téléphone : le navigateur intégré masqué ne permet pas de la mesurer.
- Le rendu de `.htaccess` et `_headers` chez un vrai hébergeur.
- L'anglais n'a pas été relu par un anglophone.
- Si le tiret a bien disparu sur l'écran de l'utilisateur : il ne l'a pas confirmé.

## Pièges à connaître

- Ne pas modifier les pages intérieures générées : passer par `outils/pages/` et `outils/pages-en/`, puis régénérer.
- Après tout changement de `css/style.css` ou des fichiers `js/`, changer le `?v=` dans `index.html` et `en/index.html`, puis régénérer.
- Si l'utilisateur voit un élément déjà retiré, soupçonner d'abord la mémoire de son navigateur. Vérifier le fichier servi avant de chercher ailleurs.
- Le serveur local s'arrête avec la session : le relancer avec `preview_start` (nom `sodepal`).

## Journal

- 06/11/2026 : signature e-mail préparée à part, hors du site, dans le dossier `Signature SODEPAL` du Bureau, à la demande de l'utilisateur. Ne pas la remettre dans ce dépôt.
- 06/11/2026 : parcours de la Fondatrice et de la Directrice en arbre, après un essai en cartes refusé ; carte 4 de la chaîne des acteurs en vert foncé ; création de ce fichier.
- 05/11/2026 : cahier des charges, passation `CLAUDE.md`, outils versionnés dans `outils/`, retrait des encadrés et de tous les traits décoratifs, nouvelles citations et chiffres clés, serveur local sans mémoire.
- 27/10/2026 : titre d'onglet réduit à « SODEPAL SA ».
- 26/10/2026 : fonds blancs, accueil enrichi, temps forts, version anglaise, vitesse, sécurité.
- 25/10/2026 : refonte en 8 pages, README, adresses e-mail.
