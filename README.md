# Documentation

Ce fichier a pour but de décrire chacun des mini-jeux produits ainsi que la structure globale du site.

## Mini-jeux

### Jeu de QuLice

Le but de ce mini-jeu est d'apprendre à l'utilisateur a rendre un code propre et formatté selon certaines règles. L'utilisateur a à sa disposition un morceau de code qu'il peut modifier, et à sa droite une liste de consignes qui se débloquent au fur et à mesure que l'utilisateur améliore le code. Si l'utilisateur modifie le fichier et rajoute une erreur de formattage qui avait été validée auparavant, il retombe à la consigne concernant ce point.

Plusieurs concepts sont introduits à l'utilisateur :
* Nom sensé : Avoir des noms de variables clairs et en lien avec leur rôle.
* PascalCase : MaSuperClasse (Majuscule partout).
* camelCase : maSuperMethode (Minuscule au début).
* Ne pas écrire des lignes trop longues : ne pas excéder 120 caractères par ligne.
* Indentation : Garder un espacement de 4 colonnes partout pour les indentations.
* Style Allman : L'accolade \{ doit être seule sur sa ligne, juste en dessous de la déclaration.
* Commenter : Le code doit avoir au moins un commentaire.

### Jeu du développeur

Le but de ce mini-jeu est d'apprendre à l'utilisateur à corriger les erreurs de type sémantique. On lui fournit plusieurs petits bouts de code avec une erreur dedans, et il doit corriger l'erreur afin de débloquer le niveau suivant.

Note : l'utilisateur dispose d'un fichier d'aide pour par exemple mieux comprendre la syntaxe '=' vs '==='.
Il lui est aussi précisé le langage utilisé : Javascript.

Voilà les différentes erreurs (etb leur correction si l'utilisateur est bloqué) :
* Erreur d'index (Out of Bounds)<br>
Problème : Utilisation de i <= users.length dans une boucle for.<br>
Conséquence : La boucle tente d'accéder à un élément après le dernier index du tableau (qui n'existe pas), ce qui renvoie undefined ou fait planter le programme.<br>
Correction : Utiliser < au lieu de <=.<br>
* Erreur d'accès à la structure de données
Problème : Tentative d'accès à une propriété (users.id) directement sur un tableau.<br>
Conséquence : Un tableau n'a pas de propriété id. L'erreur est d'oublier de préciser quel élément du tableau on cible.<br>
Correction : Cibler le premier élément avec users[0].id.<br>
* Erreur d'assignation vs Comparaison
Problème : Utilisation d'un seul signe égal (=) dans une condition if.<br>
Conséquence : Au lieu de vérifier si l'utilisateur est admin, le code force la valeur à true. La condition est donc toujours validée.<br>
Correction : Utiliser l'opérateur de comparaison stricte ===.<br>
* Erreur de logique mathématique
Problème : Multiplication par 1 (score * 1) pour essayer d'incrémenter une valeur.<br>
Conséquence : Le score reste identique, car n'importe quel nombre multiplié par 1 ne change pas.<br>
Correction : Utiliser l'addition (+ 1).<br>
* Erreur de type de variable
Problème : Appel de la méthode .push() sur une variable initialisée comme un nombre (0).<br>
Conséquence : La méthode .push() n'existe que sur les tableaux. Le code génère une erreur de type (TypeError).<br>
Correction : Initialiser la variable comme un tableau vide [].<br>
* Erreur de portée (Scope) de boucle<br>
Problème : Le console.log de fin est placé à l'intérieur des accolades {} de la boucle for.<br>
Conséquence : Le message s'affiche à chaque répétition (5 fois) au lieu de s'afficher une seule fois à la fin du traitement.<br>
Correction : Déplacer l'instruction après l'accolade de fermeture de la boucle.<br>
* Erreur de syntaxe (Variable vs Chaîne de caractères)
Problème : Retour de "result" (avec guillemets) au lieu de result.<br>
Conséquence : La fonction renvoie le mot "result" littéralement au lieu de renvoyer la valeur contenue dans la variable (le chiffre 42).<br>
Correction : Retirer les guillemets pour référencer la variable.<br>