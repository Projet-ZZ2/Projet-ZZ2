import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientGameService } from '../../../../services/client-game.service';
import { DesignElement } from '../../../../model/client-game.model';

@Component({
  selector: 'maquette-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './maquette.component.html',
  styleUrls: ['../steps.css', './maquette.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaquetteComponent {
  selectedTheme = signal<string>('épuré');
  enabledFeatures = signal<Set<string>>(new Set());
  designScore = signal<number>(0);

  // Options de thème
  themeOptions = [
    { value: 'enfants', label: 'Enfants', color: 'linear-gradient(45deg, #FF6B6B, #FFE66D)' },
    { value: 'épuré', label: 'Épuré', color: 'linear-gradient(45deg, #E0E0E0, #F5F5F5)' },
    { value: 'geek', label: 'Geek', color: 'linear-gradient(45deg, #1a1a1a, #00FF00)' },
    { value: 'vieux', label: 'Senior', color: 'linear-gradient(45deg, #8D6E63, #A1887F)' },
  ];

  // Options de couleurs de fond
  backgroundColors = [
    { value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', label: 'Bleu-Violet' },
    { value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', label: 'Rose-Rouge' },
    { value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', label: 'Bleu clair' },
    { value: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', label: 'Vert' },
    { value: '#FFFFFF', label: 'Blanc' },
    { value: '#1a1a1a', label: 'Sombre' },
    { value: 'linear-gradient(135deg, #FFE66D 0%, #FF6B6B 100%)', label: 'Enfant' },
    { value: 'linear-gradient(135deg, #E8E8E8 0%, #F5F5F5 100%)', label: 'Épuré' },
  ];

  // Tailles de boutons
  buttonSizes = [
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand' },
    { value: 'extra-large', label: 'Très grand' },
  ];

  // Tailles de titre
  titleSizes = [
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand' },
    { value: 'extra-large', label: 'Très grand' },
  ];

  // Fonctionnalités disponibles
  availableFeatures = [
    { value: 'chatbot', label: "Chatbot d'aide" },
    { value: 'news', label: 'Section actualités' },
    { value: 'searchbar', label: 'Barre de recherche' },
  ];

  constructor(public gameService: ClientGameService) {
    // Initialiser avec le thème détecté
    const detectedTheme = this.gameService.getGameState().theme;
    if (detectedTheme) {
      this.selectedTheme.set(detectedTheme);
    }
  }

  currentTheme = computed(() => this.gameService.getGameState().theme);

  selectTheme(theme: string): void {
    this.selectedTheme.set(theme);
  }

  updateDesignElement(
    type: DesignElement['type'],
    property: DesignElement['property'],
    value: string,
  ): void {
    const element: DesignElement = {
      type,
      property,
      value,
      theme: this.selectedTheme() as 'enfants' | 'épuré' | 'geek' | 'vieux',
    };
    const points = this.gameService.updateDesignElement(element);
    this.designScore.update((score) => score + points);
  }

  getDesignElementValue(
    type: DesignElement['type'],
    property: DesignElement['property'],
  ): string | null {
    const elements = this.gameService.getGameState().designElements;
    const element = elements.find((e) => e.type === type && e.property === property);
    return element ? element.value : null;
  }

  toggleFeature(featureValue: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const features = this.enabledFeatures();

    if (checkbox.checked) {
      features.add(featureValue);
    } else {
      features.delete(featureValue);
    }

    this.enabledFeatures.set(new Set(features));
    this.updateDesignElement(
      featureValue as DesignElement['type'],
      'position',
      checkbox.checked ? 'enabled' : 'disabled',
    );
  }

  isFeatureEnabled(featureValue: string): boolean {
    return this.enabledFeatures().has(featureValue);
  }

  // Méthodes pour le style de la prévisualisation
  getMockupBackground(): string {
    return (
      this.getDesignElementValue('background', 'color') ||
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    );
  }

  getTitleSize(): string {
    const size = this.getDesignElementValue('title', 'size');
    switch (size) {
      case 'small':
        return '1.5rem';
      case 'medium':
        return '2rem';
      case 'large':
        return '2.5rem';
      case 'extra-large':
        return '3rem';
      default:
        return '2rem';
    }
  }

  getButtonPadding(): string {
    const size = this.getDesignElementValue('button', 'size');
    switch (size) {
      case 'small':
        return '0.5rem 1rem';
      case 'medium':
        return '0.8rem 1.5rem';
      case 'large':
        return '1rem 2rem';
      case 'extra-large':
        return '1.2rem 2.5rem';
      default:
        return '0.8rem 1.5rem';
    }
  }

  getButtonFontSize(): string {
    const size = this.getDesignElementValue('button', 'size');
    switch (size) {
      case 'small':
        return '0.8rem';
      case 'medium':
        return '1rem';
      case 'large':
        return '1.2rem';
      case 'extra-large':
        return '1.4rem';
      default:
        return '1rem';
    }
  }

  getDesignFeedback(): Array<{
    id: string;
    type: 'good' | 'warning' | 'error';
    icon: string;
    message: string;
  }> {
    const feedback: Array<{
      id: string;
      type: 'good' | 'warning' | 'error';
      icon: string;
      message: string;
    }> = [];
    const collectedInfos = this.gameService.getCollectedInfos();
    const currentTheme = this.selectedTheme();

    // Vérifier la cohérence du thème
    const hasChildrenInfo = collectedInfos.some((info) => info.value === 'enfants');
    const hasLargeFontInfo = collectedInfos.some((info) => info.value === 'large-font');
    const hasMinimalistInfo = collectedInfos.some((info) => info.value === 'épuré');

    if (hasChildrenInfo && currentTheme === 'enfants') {
      feedback.push({
        id: 'theme-children',
        type: 'good' as const,
        icon: '✅',
        message: 'Excellent ! Le thème enfant correspond aux besoins identifiés.',
      });
    }

    if (
      hasLargeFontInfo &&
      (this.getDesignElementValue('title', 'size') === 'large' ||
        this.getDesignElementValue('title', 'size') === 'extra-large')
    ) {
      feedback.push({
        id: 'large-font',
        type: 'good' as const,
        icon: '✅',
        message: "Parfait ! Les grandes polices améliorent l'accessibilité.",
      });
    }

    if (hasMinimalistInfo && currentTheme === 'épuré') {
      feedback.push({
        id: 'minimalist',
        type: 'good' as const,
        icon: '✅',
        message: 'Bien joué ! Le thème épuré répond au besoin de simplicité.',
      });
    }

    // Avertissements
    if (collectedInfos.length > 0 && this.designScore() < 50) {
      feedback.push({
        id: 'low-score',
        type: 'warning' as const,
        icon: '⚠️',
        message: 'Vos choix ne correspondent pas aux besoins identifiés.',
      });
    }

    // Erreurs
    if (hasChildrenInfo && currentTheme === 'geek') {
      feedback.push({
        id: 'theme-mismatch',
        type: 'error' as const,
        icon: '❌',
        message: 'Attention ! Le thème geek ne convient pas aux enfants.',
      });
    }

    return feedback;
  }

  getThemeBackground(theme: string): string {
    switch (theme) {
      case 'enfants':
        return 'linear-gradient(135deg, #FFE66D 0%, #FF6B6B 100%)';
      case 'épuré':
        return 'linear-gradient(135deg, #E8E8E8 0%, #F5F5F5 100%)';
      case 'geek':
        return '#1a1a1a';
      case 'vieux':
        return 'linear-gradient(135deg, #8D6E63 0%, #A1887F 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  }

  getContextualTips(): string[] {
    const tips = [];
    const collectedInfos = this.gameService.getCollectedInfos();

    if (collectedInfos.some((info) => info.value === 'large-font')) {
      tips.push('Utilisez des grandes polices pour améliorer la lisibilité');
    }

    if (collectedInfos.some((info) => info.value === 'large')) {
      tips.push('Privilégiez de gros boutons faciles à cliquer');
    }

    if (collectedInfos.some((info) => info.value === 'speed')) {
      tips.push('Gardez une interface simple pour la performance');
    }

    if (collectedInfos.some((info) => info.value === 'simple-nav')) {
      tips.push("Ajoutez des fonctionnalités d'aide comme un chatbot");
    }

    if (collectedInfos.some((info) => info.type === 'theme' && info.value === 'enfants')) {
      tips.push('Utilisez des couleurs vives et amusantes');
    }

    if (tips.length === 0) {
      tips.push('Basez-vous sur les informations collectées lors des entretiens');
      tips.push("Pensez à l'accessibilité et à l'utilisabilité");
    }

    return tips;
  }
}
