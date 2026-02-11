import { DifferencesGameModel } from "../model/differencesGameModel";

export const DIFFERENCES: DifferencesGameModel[] = [
  {
    id: 0, // ID spécial pour l'aide
    label: 'Aide système',
    type: 'file',
    content: {
      title: 'Aide - Bloc-notes',
      instructions: 'Consultez les indications pour réussir les tests.',
      buggyCode: `Ce jeu fonctionne à l'aide de Javascript.\n\nVoici quelques indications :\n- === sert à comparer deux variables.\n- Pour créer un tableau, on fait let tab = [].`,
      correctCode: `Ce jeu fonctionne à l'aide de Javascript.\n\nVoici quelques indications :\n- === sert à comparer deux variables.\n- Pour créer un tableau, on fait let tab = [].`,
      language: 'text',
      errorsFound: []
    }
  },
  {
    id: 1,
    label: 'Dépassement d\'indice',
    type: 'file',
    content: {
      title: 'Erreur 1 : L\'Index',
      instructions: 'Ce code plante car il cherche un utilisateur qui n\'existe pas à la fin du tableau. Corrige la condition de la boucle.',
      buggyCode: `function getFirstNames(users) {\n  for (let i = 0; i <= users.length; i++) {\n    console.log(users[i].name);\n  }\n}`,
      correctCode: `function getFirstNames(users) {\n  for (let i = 0; i < users.length; i++) {\n    console.log(users[i].name);\n  }\n}`,
      language: 'javascript',
      errorsFound: ["L'index i va jusqu'à length, ce qui dépasse les limites du tableau."]
    }
  },
  {
    id: 2,
    label: 'Référence Objet',
    type: 'file',
    content: {
      title: 'Erreur 2 : L\'accès aux données',
      instructions: 'On essaie de récupérer l\'ID, mais le code ne regarde pas au bon endroit. Et si users n\'était pas un objet mais un tableau ? Corrige l\'accès au premier ID du tableau.',
      buggyCode: `function userId(users) {\n  const id = users.id;\n  return id;\n}`,
      correctCode: `function userId(users) {\n  const id = users[0].id;\n  return id;\n}`,
      language: 'javascript',
      errorsFound: ["On essaie d'accéder à .id sur le tableau lui-même au lieu d'un élément."]
    }
  },
  {
    id: 3,
    label: 'Test de Sécurité',
    type: 'file',
    content: {
      title: 'Erreur 3 : L\'Assignation',
      instructions: 'La condition de ce IF est toujours vraie. Trouve pourquoi.',
      buggyCode: `if (user.isAdmin = true) {\n  grantAccess();\n}`,
      correctCode: `if (user.isAdmin === true) {\n  grantAccess();\n}`,
      language: 'javascript',
      errorsFound: ["Utilisation de = (assignation) au lieu de === (comparaison)."]
    }
  },
  {
    id: 4,
    label: 'Calculateur de Score',
    type: 'file',
    content: {
      title: 'Erreur 4 : Multiplication Inutile',
      instructions: 'Le score ne monte jamais, pourtant on traite bien les données. Corrige l\'opération.',
      buggyCode: `function incrementScore(score) {\n  return score = score * 1;\n}`,
      correctCode: `function incrementScore(score) {\n  return score = score + 1;\n}`,
      language: 'javascript',
      errorsFound: ["Multiplier par 1 ne change pas la valeur du score."]
    }
  },
  {
    id: 5,
    label: 'Stockage Data',
    type: 'file',
    content: {
      title: 'Erreur 5 : Type de Variable',
      instructions: 'Le programme essaie d\'ajouter un élément dans une variable qui n\'est pas une liste.',
      buggyCode: `let listOfValues = 0;\listOfValues.push("item");`,
      correctCode: `let listOfValues = [];\listOfValues.push("item");`,
      language: 'javascript',
      errorsFound: ["On ne peut pas faire .push() sur un nombre, il faut un tableau []."]
    }
  },
  {
    id: 6,
    label: 'Rapport Logs',
    type: 'file',
    content: {
      title: 'Erreur 6 : Spam Console',
      instructions: 'Le message de fin s\'affiche beaucoup trop souvent. Sors-le de la boucle.',
      buggyCode: `for(let i=0; i<5; i++) {\n  // process...\n  console.log("Terminé");\n}`,
      correctCode: `for(let i=0; i<5; i++) {\n  // process...\n}\nconsole.log("Terminé");`,
      language: 'javascript',
      errorsFound: ["Le log est situé à l'intérieur des accolades de la boucle."]
    }
  },
  {
    id: 7,
    label: 'Finalisation',
    type: 'file',
    content: {
      title: 'Erreur 7 : Type de Retour',
      instructions: 'La fonction doit renvoyer le chiffre 42, mais elle renvoie du texte.',
      buggyCode: `function getResult() {\n  let result = 42;\n  return "result";\n}`,
      correctCode: `function getResult() {\n  let result = 42;\n  return result;\n}`,
      language: 'javascript',
      errorsFound: ["Les guillemets transforment la variable en simple texte."]
    }
  },
  {
  id: 8,
  label: 'Action Incomplète',
  type: 'file',
  content: {
    title: 'Erreur 8 : L\'appel de fonction',
    instructions: 'Le jeu ne démarre pas. On essaie d\'utiliser "startGame", mais on a oublié de dire au programme de l\'exécuter avec des parenthèses ().',
    buggyCode: `function pressButton() {\n  startGame;\n}`,
    correctCode: `function pressButton() {\n  startGame();\n}`,
    language: 'javascript',
    errorsFound: ["Écrire le nom d'une fonction sans () ne l'exécute pas, cela fait juste citer son nom."]
  }
}
];