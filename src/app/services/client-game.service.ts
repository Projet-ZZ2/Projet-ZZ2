import { Injectable, signal, computed } from '@angular/core';
import {
  GameState,
  Person,
  DialogueLine,
  ImportantInfo,
  Insight,
  Persona,
  DesignElement,
  PersonaCharacteristic,
} from '../model/client-game.model';
import { dialogueDatabase } from '../data/client-game/dialogues';
import { persons } from '../data/client-game/persons';

@Injectable({
  providedIn: 'root',
})
export class ClientGameService {
  // Mapping des caractéristiques du persona vers les infos collectées
  private readonly personaMapping: Record<
    string,
    Record<string, Array<{ type: string; value: string }>>
  > = {
    age: {
      child: [{ type: 'theme', value: 'enfants' }],
      senior: [{ type: 'theme', value: 'vieux' }],
      young: [{ type: 'theme', value: 'geek' }],
      adult: [{ type: 'theme', value: 'épuré' }],
    },
    profession: {
      student: [{ type: 'theme', value: 'enfants' }],
      retiree: [{ type: 'theme', value: 'vieux' }],
      developer: [{ type: 'theme', value: 'geek' }],
      designer: [{ type: 'theme', value: 'épuré' }],
    },
    needs: {
      simplicity: [{ type: 'ux', value: 'simple-nav' }],
      performance: [{ type: 'ux', value: 'speed' }],
      accessibility: [{ type: 'ui', value: 'large-font' }],
      fun: [{ type: 'theme', value: 'enfants' }],
      efficiency: [{ type: 'ux', value: 'speed' }],
    },
    frustrations: {
      complexity: [{ type: 'ux', value: 'simple-nav' }],
      slowness: [{ type: 'ux', value: 'speed' }],
      'small-text': [{ type: 'ui', value: 'large-font' }],
      confusion: [{ type: 'ux', value: 'simple-nav' }],
      technical: [{ type: 'theme', value: 'vieux' }],
    },
    goals: {
      'quick-task': [{ type: 'ux', value: 'speed' }],
      learning: [{ type: 'theme', value: 'enfants' }],
      entertainment: [{ type: 'theme', value: 'enfants' }],
      productivity: [{ type: 'ui', value: 'spacing' }],
      social: [{ type: 'theme', value: 'épuré' }],
    },
  };

  // État principal du jeu
  private gameState = signal<GameState>({
    currentStep: 'menu',
    score: 0,
    maxScore: 1000,
    selectedPersonIds: [],
    completedInterviews: [],
    collectedInfos: [],
    insights: [],
    persona: null,
    designElements: [],
    errors: 0,
    theme: null,
  });

  // Signaux dérivés
  readonly currentStep = computed(() => this.gameState().currentStep);
  readonly score = computed(() => this.gameState().score);
  readonly canProceedToNextStep = computed(() => this.validateCurrentStep());

  // Dialogues générés aléatoirement

  // Méthodes publiques

  startGame(): void {
    const shuffled = [...persons].sort(() => 0.5 - Math.random());
    const selectedPersonIds = shuffled.slice(0, 4).map((p) => p.id);

    this.gameState.update((state) => ({
      ...state,
      currentStep: 'entretien',
      score: 0,
      selectedPersonIds,
      completedInterviews: [],
      collectedInfos: [],
      insights: [],
      persona: null,
      designElements: [],
      errors: 0,
      theme: null,
    }));
  }

  getDialoguesForPerson(personId: string): DialogueLine[] {
    const important = dialogueDatabase.filter((d) => d.personId === personId && d.isImportant);
    const notImportant = dialogueDatabase.filter((d) => d.personId === personId && !d.isImportant);

    const shuffledImportant = [...important].sort(() => 0.5 - Math.random());
    const shuffledNotImportant = [...notImportant].sort(() => 0.5 - Math.random());

    // 2 ou 3 dialogues importants aléatoirement
    const importantCount = Math.random() < 0.5 ? 2 : 3;
    const selected = shuffledImportant.slice(0, Math.min(importantCount, shuffledImportant.length));

    // Compléter jusqu'à 4 avec des dialogues non importants
    const remaining = 4 - selected.length;
    selected.push(...shuffledNotImportant.slice(0, remaining));

    // Mélanger le résultat final
    return selected.sort(() => 0.5 - Math.random());
  }

  selectDialogueLine(dialogueId: string): { correct: boolean; points: number } {
    const dialogue = dialogueDatabase.find((d) => d.id === dialogueId);
    if (!dialogue) return { correct: false, points: 0 };

    if (dialogue.isImportant && dialogue.info) {
      // Bonne réponse - ajouter l'info
      this.gameState.update((state) => ({
        ...state,
        collectedInfos: [...state.collectedInfos, dialogue.info!],
        score: state.score + 20,
      }));
      return { correct: true, points: 20 };
    } else {
      // Mauvaise réponse - perdre des points
      this.gameState.update((state) => ({
        ...state,
        score: Math.max(0, state.score - 10),
        errors: state.errors + 1,
      }));
      return { correct: false, points: -10 };
    }
  }

  completeInterview(personId: string, foundEverything: boolean): void {
    if (!foundEverything) {
      this.gameState.update((state) => ({
        ...state,
        score: Math.max(0, state.score - 10),
        errors: state.errors + 1,
      }));
      return;
    }
    this.gameState.update((state) => ({
      ...state,
      completedInterviews: [...state.completedInterviews, personId],
    }));
  }

  canProceedFromInterview(): boolean {
    const state = this.gameState();
    return state.completedInterviews.length == 4;
  }

  proceedToInsights(): void {
    if (!this.canProceedFromInterview()) return;

    const insights: Insight[] = this.gameState()
      .collectedInfos.filter((info) => info.type === 'ui' || info.type === 'ux')
      .map((info) => ({
        id: info.id,
        name: info.content,
        importance: info.importance,
        difficulty: info.difficulty,
        placed: false,
        correctPosition: { x: 10 - info.difficulty, y: info.importance },
      }));

    this.gameState.update((state) => ({
      ...state,
      currentStep: 'insights',
      insights,
    }));
  }

  computeInsightScore(
    insightId: string,
    position: { x: number; y: number },
  ): { distance: number; points: number } {
    const insight = this.gameState().insights.find((i) => i.id === insightId);

    if (!insight || !insight.correctPosition) return { distance: 0, points: 0 };

    if (insight.playerPosition !== undefined) position = insight.playerPosition;

    const distance = Math.sqrt(
      Math.pow(position.x - insight.correctPosition.x, 2) +
        Math.pow(position.y - insight.correctPosition.y, 2),
    );

    const maxDistance = Math.sqrt(200);
    const points = Math.max(0, Math.round((1 - distance / maxDistance) * 50));

    return { distance, points };
  }

  placeInsight(
    insightId: string,
    position: { x: number; y: number },
  ): { distance: number; points: number } {
    const dataScore = this.computeInsightScore(insightId, position);

    this.gameState.update((state) => ({
      ...state,
      insights: state.insights.map((i) =>
        i.id === insightId ? { ...i, placed: true, playerPosition: position } : i,
      ),
      score: state.score + dataScore.points,
    }));

    return dataScore;
  }

  proceedToPersona(): void {
    this.gameState.update((state) => ({
      ...state,
      currentStep: 'persona',
    }));
  }

  submitPersona(characteristics: PersonaCharacteristic[]): number {
    const collectedInfos = this.gameState().collectedInfos;

    // Indexer les infos pour une recherche O(1)
    const infoSet = new Set(collectedInfos.map((i) => `${i.type}:${i.value}`));

    let points = 0;

    characteristics.forEach((char) => {
      char.isCorrect = this.isPersonaCharacteristicCorrect(char, infoSet);
      if (char.isCorrect) points += 25;
    });

    const persona: Persona = {
      name: 'User Persona',
      characteristics,
    };

    this.gameState.update((state) => ({
      ...state,
      persona,
      score: state.score + points,
    }));

    return points;
  }

  proceedToMaquette(): void {
    // Déterminer le thème principal basé sur les infos collectées
    const themeInfos = this.gameState().collectedInfos.filter((i) => i.type === 'theme');
    const theme = this.determinePrimaryTheme(themeInfos);

    this.gameState.update((state) => ({
      ...state,
      currentStep: 'maquette',
      theme,
    }));
  }

  updateDesignElement(element: DesignElement): number {
    const state = this.gameState();
    const existingElement = state.designElements.find(
      (e) => e.type === element.type && e.property === element.property,
    );
    const previousPoints = existingElement ? this.getDesignElementScore(existingElement) : 0;
    const points = this.getDesignElementScore(element);
    const netPoints = points - previousPoints;

    this.gameState.update((s) => ({
      ...s,
      designElements: [
        ...s.designElements.filter(
          (e) => !(e.type === element.type && e.property === element.property),
        ),
        element,
      ],
      score: Math.max(0, s.score + netPoints),
    }));

    return points;
  }

  getDesignScore(): number {
    return this.gameState().designElements.reduce(
      (total, el) => total + this.getDesignElementScore(el),
      0,
    );
  }

  finishGame(): void {
    this.gameState.update((state) => ({
      ...state,
      currentStep: 'results',
    }));
  }

  // Méthodes privées

  private validateCurrentStep(): boolean {
    const state = this.gameState();
    switch (state.currentStep) {
      case 'entretien':
        return this.canProceedFromInterview();
      case 'insights':
        return state.insights.every((i) => i.placed);
      case 'persona':
        return state.persona !== null;
      case 'maquette':
        return state.designElements.length >= 3;
      default:
        return true;
    }
  }

  private isPersonaCharacteristicCorrect(
    char: PersonaCharacteristic,
    infoSet: Set<string>,
  ): boolean {
    const categoryMapping = this.personaMapping[char.type];
    if (!categoryMapping) return false;

    const expectedInfos = categoryMapping[char.value];
    if (!expectedInfos) return false;

    return expectedInfos.some((expected) => infoSet.has(`${expected.type}:${expected.value}`));
  }

  private determinePrimaryTheme(
    themeInfos: ImportantInfo[],
  ): 'enfants' | 'épuré' | 'geek' | 'vieux' | null {
    if (themeInfos.length === 0) return null;

    const themeCounts = themeInfos.reduce(
      (acc, info) => {
        const theme = info.value as string;
        acc[theme] = (acc[theme] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(themeCounts).reduce((a, b) =>
      themeCounts[a[0]] > themeCounts[b[0]] ? a : b,
    )[0] as any;
  }

  private getDesignElementScore(element: DesignElement): number {
    const state = this.gameState();
    const collectedInfos = state.collectedInfos;
    const theme = state.theme;

    switch (element.type) {
      case 'background': {
        if (!theme) return 10; // pas de thème détecté, neutre
        return element.value.includes(theme) ? 30 : -5;
      }
      case 'button': {
        if (element.property === 'size') {
          const needsLarge = collectedInfos.some(
            (i) => i.value === 'large' || i.value === 'large-font',
          );
          if (!needsLarge) return 10;
          switch (element.value) {
            case 'extra-large':
              return 30;
            case 'large':
              return 20;
            case 'medium':
              return 5;
            case 'small':
              return -5;
          }
        }
        break;
      }
      case 'title': {
        if (element.property === 'size') {
          const needsLargeFont = collectedInfos.some((i) => i.value === 'large-font');
          if (!needsLargeFont) return 10;
          switch (element.value) {
            case 'extra-large':
              return 30;
            case 'large':
              return 20;
            case 'medium':
              return 5;
            case 'small':
              return -5;
          }
        }
        break;
      }
      case 'chatbot': {
        const needsChatbot = collectedInfos.some((i) => i.value === 'simple-nav');
        return element.value === 'enabled' ? (needsChatbot ? 30 : 5) : needsChatbot ? -5 : 10;
      }
      case 'searchbar': {
        const needsSearch = collectedInfos.some((i) => i.value === 'speed');
        return element.value === 'enabled' ? (needsSearch ? 30 : 5) : needsSearch ? -5 : 10;
      }
      case 'news': {
        return element.value === 'enabled' ? 15 : 10;
      }
    }
    return 10; // neutre par défaut
  }

  // Getters pour l'état
  getGameState() {
    return this.gameState();
  }

  getSelectedPersons(): Person[] {
    return this.gameState().selectedPersonIds.map((id) => persons.find((p) => p.id === id)!);
  }

  getPerson(id: string): Person | undefined {
    return persons.find((p) => p.id === id);
  }

  getCollectedInfos() {
    return this.gameState().collectedInfos;
  }

  getInsights() {
    return this.gameState().insights;
  }

  resetInsight(insightId: string): void {
    const data = this.computeInsightScore(insightId, { x: -1, y: -1 });

    this.gameState.update((currentState) => {
      const insights = currentState.insights.map((insight) => {
        if (insight.id === insightId) {
          return { ...insight, placed: false, playerPosition: undefined };
        }
        return insight;
      });
      return {
        ...currentState,
        insights,
        score: Math.max(0, currentState.score - data.points - 10),
      };
    });
  }
}
