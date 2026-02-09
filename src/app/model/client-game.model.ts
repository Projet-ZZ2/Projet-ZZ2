export interface Person {
  id: string;
  name: string;
  age: number;
  profession: string;
  theme: 'enfants' | 'épuré' | 'geek' | 'vieux';
  avatar: string;
}

export interface DialogueLine {
  id: string;
  personId: string;
  text: string;
  isImportant: boolean;
  infoType: 'ui' | 'ux' | 'persona' | 'theme' | 'inutile';
  info?: ImportantInfo;
}

export interface ImportantInfo {
  id: string;
  type: 'ui' | 'ux' | 'persona' | 'theme';
  content: string;
  importance: number; // 1-10
  difficulty: number; // 1-10
  value: string | number;
}

export interface Insight {
  id: string;
  name: string;
  importance: number; // 1-10 (axe Y)
  difficulty: number; // 1-10 (axe X)
  placed?: boolean;
  correctPosition?: { x: number; y: number };
  playerPosition?: { x: number; y: number };
}

export interface PersonaCharacteristic {
  type: 'age' | 'profession' | 'needs' | 'frustrations' | 'goals';
  value: string;
  isCorrect: boolean;
}

export interface Persona {
  name: string;
  characteristics: PersonaCharacteristic[];
}

export interface DesignElement {
  type: 'background' | 'button' | 'title' | 'chatbot' | 'news' | 'searchbar';
  property: 'color' | 'size' | 'position';
  value: string;
  theme?: 'enfants' | 'épuré' | 'geek' | 'vieux';
}

export interface GameState {
  currentStep: 'menu' | 'entretien' | 'insights' | 'persona' | 'maquette' | 'results';
  score: number;
  maxScore: number;
  completedInterviews: string[]; // IDs des personnes interviewées
  collectedInfos: ImportantInfo[];
  insights: Insight[];
  persona: Persona | null;
  designElements: DesignElement[];
  errors: number;
  theme: 'enfants' | 'épuré' | 'geek' | 'vieux' | null;
}