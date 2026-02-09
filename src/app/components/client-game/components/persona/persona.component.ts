import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientGameService } from '../../../../services/client-game.service';
import { PersonaCharacteristic } from '../../../../model/client-game.model';

@Component({
  selector: 'persona-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="persona-container">
      <div class="persona-explanation">
        <h3>👤 Création du Persona</h3>
        <p>
          Créez un persona représentatif de vos utilisateurs en vous basant sur les informations collectées 
          lors des entretiens. Plus votre persona correspond aux besoins identifiés, plus vous gagnez de points !
        </p>
      </div>

      <!-- Informations collectées -->
      <div class="collected-infos-summary">
        <h4>📋 Rappel des informations collectées :</h4>
        <div class="infos-overview">
          @for (info of gameService.getCollectedInfos(); track info.id) {
            <div class="info-pill" [class]="info.type">
              {{ info.content }}
            </div>
          }
        </div>
      </div>

      <!-- Formulaire de création du persona -->
      <div class="persona-form">
        <div class="persona-preview">
          <div class="persona-avatar">
            <div class="avatar-placeholder">
              {{ getPersonaInitials() }}
            </div>
          </div>
          <h4>{{ personaName() || 'Nom du persona' }}</h4>
        </div>

        <div class="form-section">
          <label for="persona-name">Nom du persona :</label>
          <input 
            id="persona-name"
            type="text" 
            [value]="personaName()" 
            (input)="updatePersonaName($event)"
            placeholder="Ex: Marie Dupont"
            class="persona-input"
          />
        </div>

        <div class="characteristics-grid">
          <!-- Âge -->
          <div class="characteristic-section">
            <h5>🎂 Âge</h5>
            <div class="options-grid">
              @for (option of ageOptions; track option.value) {
                <button 
                  class="option-button"
                  [class.selected]="getSelectedCharacteristic('age') === option.value"
                  (click)="selectCharacteristic('age', option.value, option.label)"
                >
                  {{ option.label }}
                </button>
              }
            </div>
          </div>

          <!-- Profession -->
          <div class="characteristic-section">
            <h5>💼 Profession</h5>
            <div class="options-grid">
              @for (option of professionOptions; track option.value) {
                <button 
                  class="option-button"
                  [class.selected]="getSelectedCharacteristic('profession') === option.value"
                  (click)="selectCharacteristic('profession', option.value, option.label)"
                >
                  {{ option.label }}
                </button>
              }
            </div>
          </div>

          <!-- Besoins -->
          <div class="characteristic-section">
            <h5>⭐ Besoins principaux</h5>
            <div class="options-grid">
              @for (option of needsOptions; track option.value) {
                <button 
                  class="option-button"
                  [class.selected]="getSelectedCharacteristic('needs') === option.value"
                  (click)="selectCharacteristic('needs', option.value, option.label)"
                >
                  {{ option.label }}
                </button>
              }
            </div>
          </div>

          <!-- Frustrations -->
          <div class="characteristic-section">
            <h5>😤 Frustrations</h5>
            <div class="options-grid">
              @for (option of frustrationOptions; track option.value) {
                <button 
                  class="option-button"
                  [class.selected]="getSelectedCharacteristic('frustrations') === option.value"
                  (click)="selectCharacteristic('frustrations', option.value, option.label)"
                >
                  {{ option.label }}
                </button>
              }
            </div>
          </div>

          <!-- Objectifs -->
          <div class="characteristic-section">
            <h5>🎯 Objectifs</h5>
            <div class="options-grid">
              @for (option of goalsOptions; track option.value) {
                <button 
                  class="option-button"
                  [class.selected]="getSelectedCharacteristic('goals') === option.value"
                  (click)="selectCharacteristic('goals', option.value, option.label)"
                >
                  {{ option.label }}
                </button>
              }
            </div>
          </div>
        </div>

        <!-- Validation -->
        <div class="validation-section">
          <button 
            class="validate-persona-button"
            [disabled]="!canValidatePersona()"
            (click)="validatePersona()"
          >
            @if (isPersonaSubmitted()) {
              ✅ Persona validé ({{ lastScore() }} pts)
            } @else {
              Valider le persona
            }
          </button>
          
          @if (canValidatePersona() && !isPersonaSubmitted()) {
            <p class="validation-hint">
              Toutes les caractéristiques sont sélectionnées ! 
              Cliquez pour valider et voir votre score.
            </p>
          } @else if (!canValidatePersona()) {
            <p class="validation-hint">
              Sélectionnez une option pour chaque caractéristique.
            </p>
          }
        </div>

        <!-- Résultats après validation -->
        @if (isPersonaSubmitted()) {
          <div class="persona-results">
            <h4>📊 Évaluation de votre persona :</h4>
            <div class="results-grid">
              @for (char of personaCharacteristics(); track char.type) {
                <div class="result-item" [class.correct]="char.isCorrect">
                  <span class="result-icon">{{ char.isCorrect ? '✅' : '❌' }}</span>
                  <span class="result-text">{{ getCharacteristicLabel(char.type) }}</span>
                  <span class="result-value">{{ char.value }}</span>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <!-- Conseils -->
      <div class="tips-section">
        <h4>💡 Conseils</h4>
        <ul>
          <li>Basez-vous sur les informations collectées lors des entretiens</li>
          <li>Pensez aux thèmes identifiés (enfants, épuré, geek, âgé)</li>
          <li>Les besoins et frustrations doivent correspondre aux infos UX collectées</li>
          <li>Un persona cohérent rapporte plus de points</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .persona-container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .persona-explanation {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
      text-align: center;
    }

    .persona-explanation h3 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }

    .persona-explanation p {
      margin: 0;
      opacity: 0.9;
    }

    .collected-infos-summary {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      padding: 1.5rem;
    }

    .collected-infos-summary h4 {
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
    }

    .infos-overview {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .info-pill {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 500;
      border-left: 3px solid;
    }

    .info-pill.ui {
      background: rgba(33, 150, 243, 0.2);
      border-left-color: #2196F3;
    }

    .info-pill.ux {
      background: rgba(255, 152, 0, 0.2);
      border-left-color: #FF9800;
    }

    .info-pill.theme {
      background: rgba(156, 39, 176, 0.2);
      border-left-color: #9C27B0;
    }

    .persona-form {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 2rem;
    }

    .persona-preview {
      text-align: center;
      margin-bottom: 2rem;
    }

    .persona-avatar {
      margin-bottom: 1rem;
    }

    .avatar-placeholder {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(45deg, #4ECDC4, #44A08D);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: bold;
      color: white;
      margin: 0 auto;
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .form-section label {
      display: block;
      font-weight: bold;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    .persona-input {
      width: 100%;
      padding: 0.8rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    .persona-input:focus {
      outline: none;
      border-color: #4ECDC4;
    }

    .persona-input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .characteristics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .characteristic-section h5 {
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
      text-align: center;
    }

    .options-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.5rem;
    }

    .option-button {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid transparent;
      color: white;
      padding: 0.8rem;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.9rem;
      text-align: center;
    }

    .option-button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .option-button.selected {
      background: rgba(78, 205, 196, 0.3);
      border-color: #4ECDC4;
      font-weight: bold;
    }

    .validation-section {
      text-align: center;
      margin-bottom: 2rem;
    }

    .validate-persona-button {
      background: linear-gradient(45deg, #4CAF50, #45a049);
      border: none;
      color: white;
      font-size: 1.2rem;
      font-weight: bold;
      padding: 1rem 2rem;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
    }

    .validate-persona-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    }

    .validate-persona-button:disabled {
      background: rgba(255, 255, 255, 0.3);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .validation-hint {
      margin-top: 1rem;
      font-style: italic;
      opacity: 0.8;
    }

    .persona-results {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 15px;
      padding: 1.5rem;
      margin-top: 2rem;
    }

    .persona-results h4 {
      margin: 0 0 1rem 0;
      text-align: center;
    }

    .results-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .result-item {
      background: rgba(244, 67, 54, 0.2);
      border: 1px solid #F44336;
      border-radius: 10px;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .result-item.correct {
      background: rgba(76, 175, 80, 0.2);
      border-color: #4CAF50;
    }

    .result-icon {
      font-size: 1.2rem;
    }

    .result-text {
      flex: 1;
      font-weight: 500;
    }

    .result-value {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .tips-section {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
    }

    .tips-section h4 {
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
    }

    .tips-section ul {
      margin: 0;
      padding-left: 1.5rem;
    }

    .tips-section li {
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .persona-container {
        padding: 1rem;
      }
      
      .characteristics-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .options-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonaComponent {
  
  personaName = signal<string>('');
  personaCharacteristics = signal<PersonaCharacteristic[]>([]);
  isPersonaSubmitted = signal<boolean>(false);
  lastScore = signal<number>(0);

  // Options pour chaque caractéristique
  ageOptions = [
    { value: 'young', label: 'Jeune (18-30)' },
    { value: 'adult', label: 'Adulte (30-50)' },
    { value: 'senior', label: 'Senior (50+)' },
    { value: 'child', label: 'Enfant (8-17)' }
  ];

  professionOptions = [
    { value: 'student', label: 'Étudiant' },
    { value: 'developer', label: 'Développeur' },
    { value: 'designer', label: 'Designer' },
    { value: 'manager', label: 'Manager' },
    { value: 'retiree', label: 'Retraité' },
    { value: 'other', label: 'Autre' }
  ];

  needsOptions = [
    { value: 'simplicity', label: 'Simplicité' },
    { value: 'performance', label: 'Performance' },
    { value: 'accessibility', label: 'Accessibilité' },
    { value: 'fun', label: 'Amusement' },
    { value: 'efficiency', label: 'Efficacité' }
  ];

  frustrationOptions = [
    { value: 'complexity', label: 'Complexité' },
    { value: 'slowness', label: 'Lenteur' },
    { value: 'small-text', label: 'Texte trop petit' },
    { value: 'confusion', label: 'Interface confuse' },
    { value: 'technical', label: 'Trop technique' }
  ];

  goalsOptions = [
    { value: 'quick-task', label: 'Tâche rapide' },
    { value: 'learning', label: 'Apprendre' },
    { value: 'entertainment', label: 'Se divertir' },
    { value: 'productivity', label: 'Être productif' },
    { value: 'social', label: 'Se connecter' }
  ];

  constructor(public gameService: ClientGameService) {}

  updatePersonaName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.personaName.set(target.value);
  }

  selectCharacteristic(type: PersonaCharacteristic['type'], value: string, label: string): void {
    const characteristics = this.personaCharacteristics();
    const existingIndex = characteristics.findIndex(c => c.type === type);
    
    const newCharacteristic: PersonaCharacteristic = {
      type,
      value: label,
      isCorrect: false // Will be determined when validating
    };

    if (existingIndex >= 0) {
      // Replace existing
      characteristics[existingIndex] = newCharacteristic;
    } else {
      // Add new
      characteristics.push(newCharacteristic);
    }

    this.personaCharacteristics.set([...characteristics]);
  }

  getSelectedCharacteristic(type: PersonaCharacteristic['type']): string | null {
    const characteristic = this.personaCharacteristics().find(c => c.type === type);
    return characteristic ? characteristic.value : null;
  }

  canValidatePersona(): boolean {
    const requiredTypes: PersonaCharacteristic['type'][] = ['age', 'profession', 'needs', 'frustrations', 'goals'];
    const characteristics = this.personaCharacteristics();
    
    return requiredTypes.every(type => 
      characteristics.some(c => c.type === type)
    ) && this.personaName().trim().length > 0;
  }

  validatePersona(): void {
    if (!this.canValidatePersona() || this.isPersonaSubmitted()) return;

    const points = this.gameService.submitPersona(this.personaCharacteristics());
    this.lastScore.set(points);
    this.isPersonaSubmitted.set(true);
  }

  getPersonaInitials(): string {
    const name = this.personaName();
    if (!name) return '?';
    
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0][0]?.toUpperCase() || '?';
    } else {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
  }

  getCharacteristicLabel(type: PersonaCharacteristic['type']): string {
    const labels: Record<PersonaCharacteristic['type'], string> = {
      age: 'Âge',
      profession: 'Profession',
      needs: 'Besoins',
      frustrations: 'Frustrations',
      goals: 'Objectifs'
    };
    return labels[type];
  }
}