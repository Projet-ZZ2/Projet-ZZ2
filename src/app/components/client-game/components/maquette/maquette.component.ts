import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientGameService } from '../../../../services/client-game.service';
import { DesignElement } from '../../../../model/client-game.model';

@Component({
  selector: 'maquette-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="maquette-container">
      <div class="maquette-explanation">
        <h3>🎨 Conception de la Maquette</h3>
        <p>
          Créez la maquette parfaite en personnalisant chaque élément selon les besoins 
          identifiés lors des entretiens. Le thème détecté est : 
          <strong>{{ currentTheme() || 'Non défini' }}</strong>
        </p>
      </div>

      <div class="maquette-workspace">
        <!-- Panel de contrôles -->
        <div class="controls-panel">
          <h4>🎛️ Personnalisation</h4>
          
          <!-- Thème général -->
          <div class="control-section">
            <h5>🌈 Thème général</h5>
            <div class="theme-options">
              @for (theme of themeOptions; track theme.value) {
                <button 
                  class="theme-button"
                  [class.selected]="selectedTheme() === theme.value"
                  [style.background]="theme.color"
                  (click)="selectTheme(theme.value)"
                >
                  {{ theme.label }}
                </button>
              }
            </div>
          </div>

          <!-- Couleur de fond -->
          <div class="control-section">
            <h5>🎨 Couleur de fond</h5>
            <div class="color-options">
              @for (color of backgroundColors; track color.value) {
                <button 
                  class="color-button"
                  [style.background]="color.value"
                  [class.selected]="getDesignElementValue('background', 'color') === color.value"
                  (click)="updateDesignElement('background', 'color', color.value)"
                  [title]="color.label"
                >
                </button>
              }
            </div>
          </div>

          <!-- Taille des boutons -->
          <div class="control-section">
            <h5>🔘 Taille des boutons</h5>
            <div class="size-options">
              @for (size of buttonSizes; track size.value) {
                <button 
                  class="size-button"
                  [class.selected]="getDesignElementValue('button', 'size') === size.value"
                  (click)="updateDesignElement('button', 'size', size.value)"
                >
                  {{ size.label }}
                </button>
              }
            </div>
          </div>

          <!-- Taille du titre -->
          <div class="control-section">
            <h5>📝 Taille du titre</h5>
            <div class="size-options">
              @for (size of titleSizes; track size.value) {
                <button 
                  class="size-button"
                  [class.selected]="getDesignElementValue('title', 'size') === size.value"
                  (click)="updateDesignElement('title', 'size', size.value)"
                >
                  {{ size.label }}
                </button>
              }
            </div>
          </div>

          <!-- Fonctionnalités -->
          <div class="control-section">
            <h5>⚙️ Fonctionnalités</h5>
            <div class="features-list">
              @for (feature of availableFeatures; track feature.value) {
                <label class="feature-checkbox">
                  <input 
                    type="checkbox" 
                    [checked]="isFeatureEnabled(feature.value)"
                    (change)="toggleFeature(feature.value, $event)"
                  />
                  <span>{{ feature.label }}</span>
                </label>
              }
            </div>
          </div>

          <!-- Score en temps réel -->
          <div class="score-section">
            <div class="current-score">
              <span class="score-label">Score design :</span>
              <span class="score-value">{{ designScore() }} pts</span>
            </div>
          </div>
        </div>

        <!-- Prévisualisation de la maquette -->
        <div class="preview-panel">
          <h4>👁️ Prévisualisation</h4>
          <div 
            class="mockup-container"
            [style.background]="getMockupBackground()"
            [class]="selectedTheme()"
          >
            <!-- En-tête -->
            <div class="mockup-header">
              <h1 
                class="mockup-title"
                [style.font-size]="getTitleSize()"
              >
                Mon Application
              </h1>
            </div>

            <!-- Contenu principal -->
            <div class="mockup-content">
              <div class="mockup-section">
                <h2>Bienvenue sur notre plateforme</h2>
                <p>Découvrez nos fonctionnalités incroyables...</p>
                
                <!-- Boutons -->
                <div class="mockup-buttons">
                  <button 
                    class="mockup-button primary"
                    [style.padding]="getButtonPadding()"
                    [style.font-size]="getButtonFontSize()"
                  >
                    Commencer
                  </button>
                  <button 
                    class="mockup-button secondary"
                    [style.padding]="getButtonPadding()"
                    [style.font-size]="getButtonFontSize()"
                  >
                    En savoir plus
                  </button>
                </div>
              </div>

              <!-- Fonctionnalités -->
              <div class="mockup-features">
                @if (isFeatureEnabled('chatbot')) {
                  <div class="mockup-feature chatbot">
                    💬 Chatbot
                  </div>
                }
                @if (isFeatureEnabled('news')) {
                  <div class="mockup-feature news">
                    📰 Actualités
                  </div>
                }
                @if (isFeatureEnabled('searchbar')) {
                  <div class="mockup-feature searchbar">
                    🔍 Recherche
                  </div>
                }
              </div>
            </div>

            <!-- Pied de page -->
            <div class="mockup-footer">
              <p>&copy; 2024 Mon Application. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback et conseils -->
      <div class="feedback-section">
        <div class="design-feedback">
          <h4>📋 Feedback Design</h4>
          <div class="feedback-items">
            @for (feedback of getDesignFeedback(); track feedback.id) {
              <div class="feedback-item" [class]="feedback.type">
                <span class="feedback-icon">{{ feedback.icon }}</span>
                <span class="feedback-text">{{ feedback.message }}</span>
              </div>
            }
          </div>
        </div>

        <div class="design-tips">
          <h4>💡 Conseils basés sur vos entretiens</h4>
          <ul>
            @for (tip of getContextualTips(); track tip) {
              <li>{{ tip }}</li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .maquette-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .maquette-explanation {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
      text-align: center;
    }

    .maquette-explanation h3 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }

    .maquette-explanation p {
      margin: 0;
      opacity: 0.9;
    }

    .maquette-workspace {
      display: grid;
      grid-template-columns: 350px 1fr;
      gap: 2rem;
    }

    .controls-panel {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      height: fit-content;
    }

    .controls-panel h4 {
      margin: 0;
      text-align: center;
      font-size: 1.3rem;
    }

    .control-section h5 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      color: #4ECDC4;
    }

    .theme-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .theme-button {
      border: 2px solid transparent;
      color: white;
      padding: 0.8rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .theme-button:hover {
      transform: translateY(-2px);
    }

    .theme-button.selected {
      border-color: #4ECDC4;
      box-shadow: 0 0 10px rgba(78, 205, 196, 0.5);
    }

    .color-options {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.5rem;
    }

    .color-button {
      width: 40px;
      height: 40px;
      border: 3px solid transparent;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .color-button:hover {
      transform: scale(1.1);
    }

    .color-button.selected {
      border-color: #4ECDC4;
      box-shadow: 0 0 8px rgba(78, 205, 196, 0.6);
    }

    .size-options {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .size-button {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid transparent;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
    }

    .size-button:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .size-button.selected {
      border-color: #4ECDC4;
      background: rgba(78, 205, 196, 0.3);
    }

    .features-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .feature-checkbox {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 5px;
      transition: background 0.3s ease;
    }

    .feature-checkbox:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .feature-checkbox input {
      width: 18px;
      height: 18px;
      accent-color: #4ECDC4;
    }

    .score-section {
      background: rgba(78, 205, 196, 0.2);
      border-radius: 10px;
      padding: 1rem;
      text-align: center;
    }

    .current-score {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .score-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4ECDC4;
    }

    .preview-panel {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
    }

    .preview-panel h4 {
      margin: 0 0 1.5rem 0;
      text-align: center;
      font-size: 1.3rem;
    }

    .mockup-container {
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      overflow: auto;
      transition: all 0.3s ease;
    }

    .mockup-container.enfants {
      border-color: #FF6B6B;
    }

    .mockup-container.épuré {
      border-color: #E0E0E0;
    }

    .mockup-container.geek {
      border-color: #00FF00;
    }

    .mockup-container.vieux {
      border-color: #8D6E63;
    }

    .mockup-header {
      background: rgba(0, 0, 0, 0.2);
      padding: 1rem;
      text-align: center;
    }

    .mockup-title {
      margin: 0;
      font-weight: bold;
    }

    .mockup-content {
      padding: 2rem;
    }

    .mockup-section h2 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }

    .mockup-section p {
      margin: 0 0 2rem 0;
      opacity: 0.8;
      line-height: 1.6;
    }

    .mockup-buttons {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .mockup-button {
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .mockup-button.primary {
      background: #4ECDC4;
      color: white;
    }

    .mockup-button.secondary {
      background: rgba(255, 255, 255, 0.2);
      color: inherit;
    }

    .mockup-features {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-top: 2rem;
    }

    .mockup-feature {
      background: rgba(255, 255, 255, 0.2);
      padding: 0.8rem 1.2rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .mockup-footer {
      background: rgba(0, 0, 0, 0.3);
      padding: 1rem;
      text-align: center;
      font-size: 0.9rem;
      opacity: 0.7;
    }

    .mockup-footer p {
      margin: 0;
    }

    .feedback-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    .design-feedback,
    .design-tips {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
    }

    .design-feedback h4,
    .design-tips h4 {
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
    }

    .feedback-items {
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .feedback-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 0.8rem;
      border-radius: 8px;
      border-left: 3px solid;
    }

    .feedback-item.good {
      background: rgba(76, 175, 80, 0.2);
      border-left-color: #4CAF50;
    }

    .feedback-item.warning {
      background: rgba(255, 152, 0, 0.2);
      border-left-color: #FF9800;
    }

    .feedback-item.error {
      background: rgba(244, 67, 54, 0.2);
      border-left-color: #F44336;
    }

    .feedback-icon {
      font-size: 1.2rem;
    }

    .design-tips ul {
      margin: 0;
      padding-left: 1.5rem;
    }

    .design-tips li {
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }

    @media (max-width: 1200px) {
      .maquette-workspace {
        grid-template-columns: 300px 1fr;
      }
    }

    @media (max-width: 968px) {
      .maquette-workspace {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
      }

      .feedback-section {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 768px) {
      .maquette-container {
        padding: 1rem;
      }

      .mockup-buttons {
        flex-direction: column;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    { value: 'vieux', label: 'Senior', color: 'linear-gradient(45deg, #8D6E63, #A1887F)' }
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
    { value: 'linear-gradient(135deg, #E8E8E8 0%, #F5F5F5 100%)', label: 'Épuré' }
  ];

  // Tailles de boutons
  buttonSizes = [
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand' },
    { value: 'extra-large', label: 'Très grand' }
  ];

  // Tailles de titre
  titleSizes = [
    { value: 'small', label: 'Petit' },
    { value: 'medium', label: 'Moyen' },
    { value: 'large', label: 'Grand' },
    { value: 'extra-large', label: 'Très grand' }
  ];

  // Fonctionnalités disponibles
  availableFeatures = [
    { value: 'chatbot', label: 'Chatbot d\'aide' },
    { value: 'news', label: 'Section actualités' },
    { value: 'searchbar', label: 'Barre de recherche' }
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
    this.updateDesignElement('background', 'color', this.getThemeBackground(theme));
  }

  updateDesignElement(type: DesignElement['type'], property: DesignElement['property'], value: string): void {
    const element: DesignElement = { 
      type, 
      property, 
      value, 
      theme: this.selectedTheme() as 'enfants' | 'épuré' | 'geek' | 'vieux' 
    };
    const points = this.gameService.updateDesignElement(element);
    this.designScore.update(score => score + points);
  }

  getDesignElementValue(type: DesignElement['type'], property: DesignElement['property']): string | null {
    const elements = this.gameService.getGameState().designElements;
    const element = elements.find(e => e.type === type && e.property === property);
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
    this.updateDesignElement(featureValue as DesignElement['type'], 'position', checkbox.checked ? 'enabled' : 'disabled');
  }

  isFeatureEnabled(featureValue: string): boolean {
    return this.enabledFeatures().has(featureValue);
  }

  // Méthodes pour le style de la prévisualisation
  getMockupBackground(): string {
    return this.getDesignElementValue('background', 'color') || 
           'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }

  getTitleSize(): string {
    const size = this.getDesignElementValue('title', 'size');
    switch (size) {
      case 'small': return '1.5rem';
      case 'medium': return '2rem';
      case 'large': return '2.5rem';
      case 'extra-large': return '3rem';
      default: return '2rem';
    }
  }

  getButtonPadding(): string {
    const size = this.getDesignElementValue('button', 'size');
    switch (size) {
      case 'small': return '0.5rem 1rem';
      case 'medium': return '0.8rem 1.5rem';
      case 'large': return '1rem 2rem';
      case 'extra-large': return '1.2rem 2.5rem';
      default: return '0.8rem 1.5rem';
    }
  }

  getButtonFontSize(): string {
    const size = this.getDesignElementValue('button', 'size');
    switch (size) {
      case 'small': return '0.8rem';
      case 'medium': return '1rem';
      case 'large': return '1.2rem';
      case 'extra-large': return '1.4rem';
      default: return '1rem';
    }
  }

  getDesignFeedback(): Array<{ id: string; type: 'good' | 'warning' | 'error'; icon: string; message: string }> {
    const feedback: Array<{ id: string; type: 'good' | 'warning' | 'error'; icon: string; message: string }> = [];
    const collectedInfos = this.gameService.getCollectedInfos();
    const currentTheme = this.selectedTheme();

    // Vérifier la cohérence du thème
    const hasChildrenInfo = collectedInfos.some(info => info.value === 'enfants');
    const hasLargeFontInfo = collectedInfos.some(info => info.value === 'large-font');
    const hasMinimalistInfo = collectedInfos.some(info => info.value === 'épuré');

    if (hasChildrenInfo && currentTheme === 'enfants') {
      feedback.push({
        id: 'theme-children',
        type: 'good' as const,
        icon: '✅',
        message: 'Excellent ! Le thème enfant correspond aux besoins identifiés.'
      });
    }

    if (hasLargeFontInfo && (this.getDesignElementValue('title', 'size') === 'large' || this.getDesignElementValue('title', 'size') === 'extra-large')) {
      feedback.push({
        id: 'large-font',
        type: 'good' as const,
        icon: '✅',
        message: 'Parfait ! Les grandes polices améliorent l\'accessibilité.'
      });
    }

    if (hasMinimalistInfo && currentTheme === 'épuré') {
      feedback.push({
        id: 'minimalist',
        type: 'good' as const,
        icon: '✅',
        message: 'Bien joué ! Le thème épuré répond au besoin de simplicité.'
      });
    }

    // Avertissements
    if (collectedInfos.length > 0 && this.designScore() < 50) {
      feedback.push({
        id: 'low-score',
        type: 'warning' as const,
        icon: '⚠️',
        message: 'Vos choix ne correspondent pas aux besoins identifiés.'
      });
    }

    // Erreurs
    if (hasChildrenInfo && currentTheme === 'geek') {
      feedback.push({
        id: 'theme-mismatch',
        type: 'error' as const,
        icon : '❌',
        message: 'Attention ! Le thème geek ne convient pas aux enfants.'
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

    if (collectedInfos.some(info => info.value === 'large-font')) {
      tips.push('Utilisez des grandes polices pour améliorer la lisibilité');
    }

    if (collectedInfos.some(info => info.value === 'large')) {
      tips.push('Privilégiez de gros boutons faciles à cliquer');
    }

    if (collectedInfos.some(info => info.value === 'speed')) {
      tips.push('Gardez une interface simple pour la performance');
    }

    if (collectedInfos.some(info => info.value === 'simple-nav')) {
      tips.push('Ajoutez des fonctionnalités d\'aide comme un chatbot');
    }

    if (collectedInfos.some(info => info.type === 'theme' && info.value === 'enfants')) {
      tips.push('Utilisez des couleurs vives et amusantes');
    }

    if (tips.length === 0) {
      tips.push('Basez-vous sur les informations collectées lors des entretiens');
      tips.push('Pensez à l\'accessibilité et à l\'utilisabilité');
    }

    return tips;
  }
}