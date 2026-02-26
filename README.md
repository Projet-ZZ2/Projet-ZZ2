# Bucs DDL — The Basic but Ultra Captivating Story of a Developer's Daily Life

## Présentation

Ce projet est une plateforme web ludo-éducative développée dans le cadre du cursus ZZ2 à l'ISIMA. Elle propose une série de mini-jeux destinés à initier les utilisateurs à différentes disciplines du développement logiciel et du génie logiciel : bonnes pratiques de code, cybersécurité, gestion de versions, interaction homme-machine, etc.

L'utilisateur est plongé dans une fiction interactive (environnement 3D, bureau d'ordinateur virtuel) qui lui permet de naviguer entre les différents jeux.

**Démo en ligne :** [https://projet-zz2-b76a2607de6f.herokuapp.com/](https://projet-zz2-b76a2607de6f.herokuapp.com/)

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework front-end | Angular 21 avec SSR (`@angular/ssr`) |
| Serveur | Express 5 (Node.js ≥ 22) |
| Jeu 2D (analyse insights) | Phaser.js 3 |
| Jeu Git | GameMaker (export HTML5) |
| Environnement 3D | Unity (export WebGL) |
| Linting / formatage | Prettier + lint-staged + Husky |
| Déploiement | Heroku (`heroku-postbuild` → `ng build --configuration production`) |

---

## Installation et lancement

### Prérequis

- Node.js ≥ 22
- npm ≥ 10

### Développement

```bash
npm install
ng serve
```

### Production (comme sur Heroku)

```bash
npm run build   # compile Angular en mode production
npm start       # lance le serveur Express SSR
```

---

## Structure du projet

```
src/
  app/
    components/       # Un sous-dossier par mini-jeu/écran
    data/             # Données statiques (dialogues, personnages, défis…)
    model/            # Interfaces et types TypeScript
    services/         # Logique métier partagée entre composants
  assets/             # Ressources statiques (images, audio, exports GameMaker…)
Engine/
  GameMaker/          # Source et build du jeu Git (Space Shooter)
  Unity/              # Source du jeu d'exploration 3D
```

---

## Mini-jeux

Ce fichier a pour but de décrire chacun des mini-jeux produits ainsi que la structure globale du site.

## Mini-jeux

### Jeu de formatage

Le but de ce mini-jeu est d'apprendre à l'utilisateur a rendre un code propre et formatté selon certaines règles. L'utilisateur a à sa disposition un morceau de code qu'il peut modifier, et à sa droite une liste de consignes qui se débloquent au fur et à mesure que l'utilisateur améliore le code. Si l'utilisateur modifie le fichier et rajoute une erreur de formattage qui avait été validée auparavant, il retombe à la consigne concernant ce point.

Plusieurs concepts sont introduits à l'utilisateur :
* Nom sensé : Avoir des noms de variables clairs et en lien avec leur rôle.
* PascalCase : MaSuperClasse (Majuscule partout).
* camelCase : maSuperMethode (Minuscule au début).
* Ne pas écrire des lignes trop longues : ne pas excéder 120 caractères par ligne.
* Indentation : Garder un espacement de 4 colonnes partout pour les indentations.
* Style Allman : L'accolade \{ doit être seule sur sa ligne, juste en dessous de la déclaration.
* Commenter : Le code doit avoir au moins un commentaire.
* Espace après les structures de contrôle : Il doit y avoir un espace après le mot-clé "if" pour une meilleure lisibilité.
* Blocs logiques aérés : Les fonctions doivent être séparées par un saut de ligne.

### Jeu du développeur

Le but de ce mini-jeu est d'apprendre à l'utilisateur à corriger les erreurs de type sémantique. On lui fournit plusieurs petits bouts de code avec une erreur dedans, et il doit corriger l'erreur afin de débloquer le niveau suivant.

Note : l'utilisateur dispose d'un fichier d'aide pour par exemple mieux comprendre la syntaxe '=' vs '==='.
Il lui est aussi précisé le langage utilisé : Javascript.

Voilà les différentes erreurs (etb leur correction si l'utilisateur est bloqué) :
* Erreur d'index (Out of Bounds)
- Problème : Utilisation de i <= users.length dans une boucle for.
- Conséquence : La boucle tente d'accéder à un élément après le dernier index du tableau (qui n'existe pas), ce qui renvoie undefined ou fait planter le programme.
- Correction : Utiliser < au lieu de <=.
* Erreur d'accès à la structure de données
- Problème : Tentative d'accès à une propriété (users.id) directement sur un tableau.
- Conséquence : Un tableau n'a pas de propriété id. L'erreur est d'oublier de préciser quel élément du tableau on cible.
- Correction : Cibler le premier élément avec users[0].id.
* Erreur d'assignation vs Comparaison
- Problème : Utilisation d'un seul signe égal (=) dans une condition if.
- Conséquence : Au lieu de vérifier si l'utilisateur est admin, le code force la valeur à true. La condition est donc toujours validée.
- Correction : Utiliser l'opérateur de comparaison stricte ===.
* Erreur de logique mathématique
- Problème : Multiplication par 1 (score * 1) pour essayer d'incrémenter une valeur.
- Conséquence : Le score reste identique, car n'importe quel nombre multiplié par 1 ne change pas.
- Correction : Utiliser l'addition (+ 1).
* Erreur de type de variable
- Problème : Appel de la méthode .push() sur une variable initialisée comme un nombre (0).
- Conséquence : La méthode .push() n'existe que sur les tableaux. Le code génère une erreur de type (TypeError).
- Correction : Initialiser la variable comme un tableau vide [].
* Erreur de portée (Scope) de boucle
- Problème : Le console.log de fin est placé à l'intérieur des accolades {} de la boucle for.
- Conséquence : Le message s'affiche à chaque répétition (5 fois) au lieu de s'afficher une seule fois à la fin du traitement.
- Correction : Déplacer l'instruction après l'accolade de fermeture de la boucle.
* Erreur de syntaxe (Variable vs Chaîne de caractères)
- Problème : Retour de "result" (avec guillemets) au lieu de result.
- Conséquence : La fonction renvoie le mot "result" littéralement au lieu de renvoyer la valeur contenue dans la variable (le chiffre 42).
- Correction : Retirer les guillemets pour référencer la variable.

### Jeu de recherche d'informations — "Respecte ton client"

Le but de ce mini-jeu est de faire découvrir la discipline de l'Interaction Homme-Machine (IHM) à travers quatre phases successives.

* **L'entretien** : quatre personnages générés aléatoirement livrent chacun quatre informations. Le joueur doit collecter uniquement les informations pertinentes (+20 pts par bonne réponse, -10 pts par erreur ou information manquée).
* **Analyse des insights** : le joueur place des features sur une matrice (abscisse = facilité de mise en place, ordonnée = importance). Le score est calculé en fonction de la distance euclidienne entre la position posée et la position idéale.
* **Création du persona** : le joueur compose un personnage fictif représentatif des personnes interrogées. Chaque caractéristique incohérente avec les infos collectées entraîne un malus.
* **Conception de la maquette** : le joueur choisit parmi plusieurs options de design (thème visuel, taille des boutons, chatbot, barre de recherche…). Les choix cohérents avec les besoins identifiés rapportent plus de points.

La logique métier est centralisée dans `ClientGameService`. Les trois premières phases sont codées en Angular pur ; l'analyse des insights utilise **Phaser.js** pour gérer le glisser-déposer des features sur la matrice (attention au SSR : Phaser ne doit s'exécuter que côté navigateur).

### Jeu du CTF

Le jeu de Capture The Flag (CTF) initie l'utilisateur à la cybersécurité et à l'analyse de code. Chaque niveau présente un extrait de code source contenant une vulnérabilité ou une erreur spécifique (fuite mémoire, logique incorrecte, etc.). Le joueur doit identifier et cliquer sur le token exact qui constitue la solution.

La génération des niveaux est gérée par le `LevelGeneratorService`. Ce service utilise une mini-expression régulière (lexer) pour décomposer un extrait de code textuel en une série de tokens typés (mot-clé, fonction, chaîne, nombre, opérateur…), chacun coloré selon sa nature pour la coloration syntaxique. Le token correspondant à la solution est marqué comme cible (`targetId`). Cette architecture permet de créer de nouveaux défis en fournissant simplement le code source brut et le texte de la solution, sans modifier la logique du jeu.

### Jeu du git

Le Jeu du Git (Git Shooter) est une initiation ludique aux commandes Git les plus utilisées en projet. Inspiré des jeux de type Space Shooter, le joueur doit détruire des comètes en lançant des munitions. La particularité du jeu est que chaque action correspond à une commande Git réelle. Par exemple, pour récupérer des munitions, le joueur doit utiliser la commande git add ou pour changer de trajectoire, il doit entrer la commande git checkout.

Un tutoriel est disponible dès l’écran d’accueil pour découvrir les mécaniques du jeu et comprendre le rôle des différentes commandes Git dans un projet réel. Pendant la partie, un menu pause est également accessible : il permet de revoir à tout moment l’utilité de chaque commande.

Pour gagner, le joueur doit atteindre un certain nombre de points. Attention toutefois : chaque comète manquée fait perdre une vie, et le nombre de vies est limité. Il faut donc viser juste et utiliser les bonnes commandes pour atteindre le score requis avant d’être à court de vies.

---

## Déploiement

Le projet est déployé sur **Heroku**. La commande `heroku-postbuild` déclenche automatiquement le build Angular lors du déploiement. Le serveur Express sert ensuite l'application avec le rendu côté serveur (SSR) activé.

```
https://projet-zz2-b76a2607de6f.herokuapp.com/
```