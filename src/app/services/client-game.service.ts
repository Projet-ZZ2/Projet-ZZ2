import { Injectable, signal, computed } from '@angular/core';
import { 
  GameState, 
  Person, 
  DialogueLine, 
  ImportantInfo, 
  Insight, 
  Persona, 
  DesignElement,
  PersonaCharacteristic 
} from '../model/client-game.model';
import { dialogueDatabase } from '../data/client-game/dialogues';
import { persons } from '../data/client-game/persons';

@Injectable({
  providedIn: 'root'
})
export class ClientGameService {
  
  // État principal du jeu
  private gameState = signal<GameState>({
    currentStep: 'menu',
    score: 0,
    maxScore: 1000,
    completedInterviews: [],
    collectedInfos: [],
    insights: [],
    persona: null,
    designElements: [],
    errors: 0,
    theme: null
  });

  // Signaux dérivés
  readonly currentStep = computed(() => this.gameState().currentStep);
  readonly score = computed(() => this.gameState().score);
  readonly canProceedToNextStep = computed(() => this.validateCurrentStep());

  // Dialogues générés aléatoirement
  

  // Méthodes publiques
  
  startGame(): void {
    this.gameState.update(state => ({
      ...state,
      currentStep: 'entretien',
      score: 0,
      completedInterviews: [],
      collectedInfos: [],
      insights: [],
      persona: null,
      designElements: [],
      errors: 0,
      theme: null
    }));
  }

  getDialoguesForPerson(personId: string): DialogueLine[] {
    const personDialogues = dialogueDatabase.filter(d => d.personId === personId);
    // Mélanger les dialogues et en prendre 4-6 aléatoirement
    const shuffled = [...personDialogues].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(6, shuffled.length));
  }

  selectDialogueLine(dialogueId: string): { correct: boolean; points: number } {
    const dialogue = dialogueDatabase.find(d => d.id === dialogueId);
    if (!dialogue) return { correct: false, points: 0 };

    if (dialogue.isImportant && dialogue.info) {
      // Bonne réponse - ajouter l'info
      this.gameState.update(state => ({
        ...state,
        collectedInfos: [...state.collectedInfos, dialogue.info!],
        score: state.score + 20
      }));
      return { correct: true, points: 20 };
    } else {
      // Mauvaise réponse - perdre des points
      this.gameState.update(state => ({
        ...state,
        score: Math.max(0, state.score - 10),
        errors: state.errors + 1
      }));
      return { correct: false, points: -10 };
    }
  }

  completeInterview(personId: string, foundEverything : boolean): void {
    if (!foundEverything){
      this.gameState.update(state => ({
        ...state,
        score: Math.max(0, state.score - 10),
        errors: state.errors + 1
      }));
      return;
    }
    this.gameState.update(state => ({
      ...state,
      completedInterviews: [...state.completedInterviews, personId]
    }));
  }

  canProceedFromInterview(): boolean {
    const state = this.gameState();
    return state.completedInterviews.length ==4;
  }

  proceedToInsights(): void {
    if (!this.canProceedFromInterview()) return;
    
    const insights: Insight[] = this.gameState().collectedInfos
      .filter(info => info.type === 'ui' || info.type === 'ux')
      .map(info => ({
        id: info.id,
        name: info.content,
        importance: info.importance,
        difficulty: info.difficulty,
        placed: false,
        correctPosition: { x: info.difficulty, y: info.importance }
      }));

    this.gameState.update(state => ({
      ...state,
      currentStep: 'insights',
      insights
    }));
  }

  placeInsight(insightId: string, position: { x: number; y: number }): { distance: number; points: number } {
    const insight = this.gameState().insights.find(i => i.id === insightId);
    if (!insight || !insight.correctPosition) return { distance: 0, points: 0 };

    const distance = Math.sqrt(
      Math.pow(position.x - insight.correctPosition.x, 2) +
      Math.pow(position.y - insight.correctPosition.y, 2)
    );

    // Plus la distance est petite, plus on gagne de points
    const maxDistance = Math.sqrt(200); // Distance max sur un graphique 10x10
    const points = Math.max(0, Math.round((1 - distance / maxDistance) * 50));

    this.gameState.update(state => ({
      ...state,
      insights: state.insights.map(i => 
        i.id === insightId 
          ? { ...i, placed: true, playerPosition: position }
          : i
      ),
      score: state.score + points
    }));

    return { distance, points };
  }

  proceedToPersona(): void {
    this.gameState.update(state => ({
      ...state,
      currentStep: 'persona'
    }));
  }

  submitPersona(characteristics: PersonaCharacteristic[]): number {
    const collectedInfos = this.gameState().collectedInfos;
    let points = 0;

    characteristics.forEach(char => {
      // Logique pour déterminer si la caractéristique est correcte
      // basée sur les infos collectées
      char.isCorrect = this.isPersonaCharacteristicCorrect(char, collectedInfos);
      if (char.isCorrect) points += 25;
    });

    const persona: Persona = {
      name: 'User Persona',
      characteristics
    };

    this.gameState.update(state => ({
      ...state,
      persona,
      score: state.score + points
    }));

    return points;
  }

  proceedToMaquette(): void {
    // Déterminer le thème principal basé sur les infos collectées
    const themeInfos = this.gameState().collectedInfos.filter(i => i.type === 'theme');
    const theme = this.determinePrimaryTheme(themeInfos);

    this.gameState.update(state => ({
      ...state,
      currentStep: 'maquette',
      theme
    }));
  }

  updateDesignElement(element: DesignElement): number {
    const isCorrect = this.isDesignElementCorrect(element);
    const points = isCorrect ? 30 : -5;

    this.gameState.update(state => ({
      ...state,
      designElements: [...state.designElements.filter(e => 
        !(e.type === element.type && e.property === element.property)
      ), element],
      score: state.score + points
    }));

    return points;
  }

  finishGame(): void {
    this.gameState.update(state => ({
      ...state,
      currentStep: 'results'
    }));
  }

  // Méthodes privées

  private validateCurrentStep(): boolean {
    const state = this.gameState();
    switch (state.currentStep) {
      case 'entretien':
        return this.canProceedFromInterview();
      case 'insights':
        return state.insights.every(i => i.placed);
      case 'persona':
        return state.persona !== null;
      case 'maquette':
        return state.designElements.length >= 3;
      default:
        return true;
    }
  }

  private isPersonaCharacteristicCorrect(char: PersonaCharacteristic, infos: ImportantInfo[]): boolean {
    // Logique simplifiée - à améliorer selon vos besoins
    switch (char.type) {
      case 'age':
        return infos.some(i => i.type === 'theme');
      case 'profession':
        return infos.some(i => i.type === 'theme');
      case 'needs':
        return infos.some(i => i.type === 'ux');
      case 'frustrations':
        return infos.some(i => i.type === 'ux');
      case 'goals':
        return infos.some(i => i.type === 'ui');
      default:
        return false;
    }
  }

  private determinePrimaryTheme(themeInfos: ImportantInfo[]): 'enfants' | 'épuré' | 'geek' | 'vieux' | null {
    if (themeInfos.length === 0) return null;
    
    const themeCounts = themeInfos.reduce((acc, info) => {
      const theme = info.value as string;
      acc[theme] = (acc[theme] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(themeCounts).reduce((a, b) => 
      themeCounts[a[0]] > themeCounts[b[0]] ? a : b
    )[0] as any;
  }

  private isDesignElementCorrect(element: DesignElement): boolean {
    const state = this.gameState();
    const collectedInfos = state.collectedInfos;

    // Logique pour déterminer si l'élément de design est correct
    switch (element.type) {
      case 'background':
        return element.value.includes(state.theme || '');
      case 'button':
        if (element.property === 'size') {
          return collectedInfos.some(i => i.value === 'large' || i.value === 'large-font');
        }
        break;
      case 'title':
        if (element.property === 'size') {
          return collectedInfos.some(i => i.value === 'large-font');
        }
        break;
    }
    return true; // Par défaut, accepter
  }

  // Getters pour l'état
  getGameState() {
    return this.gameState();
  }

  getPerson(id: string): Person | undefined {
    return persons.find(p => p.id === id);
  }

  getCollectedInfos() {
    return this.gameState().collectedInfos;
  }

  getInsights() {
    return this.gameState().insights;
  }

  resetInsight(insightId: string): void {
    this.gameState.update(currentState => {
      const insights = currentState.insights.map(insight => {
        if (insight.id === insightId) {
          return { ...insight, placed: false, playerPosition: undefined };
        }
        return insight; 
      });

      return { ...currentState, insights };
    });
  }
}