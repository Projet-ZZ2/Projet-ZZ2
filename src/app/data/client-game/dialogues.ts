import { DialogueLine } from "../../model/client-game.model";

export const dialogueDatabase: DialogueLine[] = [
    // Sophie (enfants)
    {
      id: 'd1',
      personId: 'p1',
      text: "J'aime quand c'est coloré et rigolo !",
      isImportant: true,
      infoType: 'theme',
      info: { id: 'i1', type: 'theme', content: 'Interface colorée', importance: 8, difficulty: 3, value: 'enfants' }
    },
    {
      id: 'd2',
      personId: 'p1',
      text: "Les gros boutons c'est mieux, mes doigts sont petits.",
      isImportant: true,
      infoType: 'ui',
      info: { id: 'i2', type: 'ui', content: 'Gros boutons', importance: 9, difficulty: 2, value: 'large' }
    },
    {
      id: 'd3',
      personId: 'p1',
      text: "Mon chat s'appelle Minou.",
      isImportant: false,
      infoType: 'inutile'
    },
    
    // Jean (épuré)
    {
      id: 'd4',
      personId: 'p2',
      text: "Je préfère les interfaces minimalistes, sans fioritures.",
      isImportant: true,
      infoType: 'theme',
      info: { id: 'i3', type: 'theme', content: 'Interface minimaliste', importance: 7, difficulty: 5, value: 'épuré' }
    },
    {
      id: 'd5',
      personId: 'p2',
      text: "L'espace blanc est important pour la lisibilité.",
      isImportant: true,
      infoType: 'ui',
      info: { id: 'i4', type: 'ui', content: 'Espace blanc', importance: 6, difficulty: 4, value: 'spacing' }
    },
    {
      id: 'd6',
      personId: 'p2',
      text: "J'ai pris un café ce matin.",
      isImportant: false,
      infoType: 'inutile'
    },
    
    // Alex (geek)
    {
      id: 'd7',
      personId: 'p3',
      text: "J'adore les interfaces sombres, ça fatigue moins les yeux.",
      isImportant: true,
      infoType: 'theme',
      info: { id: 'i5', type: 'theme', content: 'Mode sombre', importance: 8, difficulty: 3, value: 'geek' }
    },
    {
      id: 'd8',
      personId: 'p3',
      text: "Il faut que ce soit rapide et efficace, pas de temps à perdre.",
      isImportant: true,
      infoType: 'ux',
      info: { id: 'i6', type: 'ux', content: 'Performance', importance: 9, difficulty: 7, value: 'speed' }
    },
    {
      id: 'd9',
      personId: 'p3',
      text: "Je joue beaucoup aux jeux vidéo.",
      isImportant: false,
      infoType: 'inutile'
    },
    
    // Marie (vieux)
    {
      id: 'd10',
      personId: 'p4',
      text: "Les lettres doivent être grandes, j'ai du mal à lire.",
      isImportant: true,
      infoType: 'ui',
      info: { id: 'i7', type: 'ui', content: 'Grande police', importance: 10, difficulty: 2, value: 'large-font' }
    },
    {
      id: 'd11',
      personId: 'p4',
      text: "J'ai besoin d'aide pour naviguer, c'est compliqué.",
      isImportant: true,
      infoType: 'ux',
      info: { id: 'i8', type: 'ux', content: 'Navigation simple', importance: 9, difficulty: 6, value: 'simple-nav' }
    },
    {
      id: 'd12',
      personId: 'p4',
      text: "Mes petits-enfants viennent me voir dimanche.",
      isImportant: false,
      infoType: 'inutile'
    }
  ];