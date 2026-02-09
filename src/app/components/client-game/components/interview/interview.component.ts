import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientGameService } from '../../../../services/client-game.service';
import { Person, DialogueLine } from '../../../../model/client-game.model';

@Component({
  selector: 'interview-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="interview-container">
      <!-- Sélection de la personne -->
      <div class="person-selection">
        <h3>Choisissez une personne à interviewer :</h3>
        <div class="persons-grid">
          @for (person of availablePersons(); track person.id) {
            <button 
              class="person-card"
              [class.completed]="isPersonCompleted(person.id)"
              [class.active]="selectedPersonId() === person.id"
              (click)="selectPerson(person.id)"
            >
              <div class="avatar">{{ person.avatar }}</div>
              <div class="person-info">
                <h4>{{ person.name }}</h4>
                <p>{{ person.age }} ans - {{ person.profession }}</p>
                @if (isPersonCompleted(person.id)) {
                  <span class="completed-badge">✓ Complété</span>
                }
              </div>
            </button>
          }
        </div>
      </div>

      <!-- Interface d'entretien -->
      @if (selectedPersonId(); as personId) {
        <div class="interview-interface">
          <div class="current-person">
            <div class="person-avatar">{{ getSelectedPerson()?.avatar }}</div>
            <div class="person-details">
              <h3>{{ getSelectedPerson()?.name }}</h3>
              <p>{{ getSelectedPerson()?.age }} ans - {{ getSelectedPerson()?.profession }}</p>
            </div>
            <div class="interview-progress">
              <p>{{ collectedInfosCount() }} infos collectées</p>
              @if (canCompleteInterview()) {
                <button class="complete-interview-btn" (click)="completeCurrentInterview()">
                  Terminer l'entretien
                </button>
              }
            </div>
          </div>

          <div class="dialogue-section">
            <h4>Écoutez attentivement et cliquez sur les informations importantes :</h4>
            <div class="dialogues-list">
              @for (dialogue of currentDialogues(); track dialogue.id) {
                <div 
                  class="dialogue-line"
                  [class.selected]="selectedDialogues.has(dialogue.id)"
                  [class.important]="isDialogueRevealed(dialogue.id) && dialogue.isImportant"
                  [class.not-important]="isDialogueRevealed(dialogue.id) && !dialogue.isImportant"
                  (click)="selectDialogue(dialogue.id)"
                >
                  <div class="dialogue-content">
                    <span class="dialogue-text">{{ dialogue.text }}</span>
                    @if (selectedDialogues.has(dialogue.id)) {
                      <div class="feedback">
                        @if (dialogue.isImportant) {
                          <span class="good-feedback">✓ Bonne information ! +20 pts</span>
                        } @else {
                          <span class="bad-feedback">✗ Information inutile... -10 pts</span>
                        }
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }

      <!-- Résumé des informations collectées -->
      <div class="collected-infos">
        <h4>Informations collectées :</h4>
        @if (gameService.getCollectedInfos().length === 0) {
          <p class="no-infos">Aucune information collectée pour le moment...</p>
        } @else {
          <div class="infos-grid">
            @for (info of gameService.getCollectedInfos(); track info.id) {
              <div class="info-card" [class]="info.type">
                <div class="info-type">{{ getInfoTypeLabel(info.type) }}</div>
                <div class="info-content">{{ info.content }}</div>
              </div>
            }
          </div>
        }
      </div>

      <!-- Instructions -->
      <div class="instructions">
        <div class="instruction-card">
          <h4>🎯 Objectif</h4>
          <p>Collectez au minimum 4 informations importantes sur l'UI/UX en interviewant au moins 3 personnes.</p>
        </div>
        <div class="instruction-card">
          <h4>⚠️ Attention</h4>
          <p>Cliquer sur une information inutile vous fait perdre des points et mécontente le client !</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .interview-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .person-selection h3 {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
    }

    .persons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .person-card {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid transparent;
      border-radius: 15px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      text-align: left;
      cursor: pointer;
      transition: all 0.3s ease;
      color: white;
    }

    .person-card:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
    }

    .person-card.active {
      border-color: #4ECDC4;
      background: rgba(78, 205, 196, 0.2);
    }

    .person-card.completed {
      background: rgba(76, 175, 80, 0.2);
      border-color: #4CAF50;
    }

    .avatar {
      font-size: 3rem;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
    }

    .person-info h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }

    .person-info p {
      margin: 0;
      opacity: 0.8;
      font-size: 0.9rem;
    }

    .completed-badge {
      background: #4CAF50;
      color: white;
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      font-size: 0.8rem;
      margin-top: 0.5rem;
      display: inline-block;
    }

    .interview-interface {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      padding: 2rem;
    }

    .current-person {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      flex-wrap: wrap;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 1.5rem;
      border-radius: 10px;
    }

    .person-avatar {
      font-size: 4rem;
    }

    .person-details h3 {
      margin: 0;
      font-size: 1.5rem;
    }

    .person-details p {
      margin: 0.5rem 0 0 0;
      opacity: 0.8;
    }

    .interview-progress {
      text-align: right;
    }

    .complete-interview-btn {
      background: linear-gradient(45deg, #4CAF50, #45a049);
      border: none;
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 20px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 0.5rem;
      transition: all 0.3s ease;
    }

    .complete-interview-btn:hover {
      transform: translateY(-2px);
    }

    .dialogue-section h4 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    .dialogues-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .dialogue-line {
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid transparent;
      border-radius: 10px;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
    }

    .dialogue-line:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .dialogue-line.selected {
      border-color: #FFC107;
    }

    .dialogue-line.important {
      border-color: #4CAF50;
      background: rgba(76, 175, 80, 0.2);
    }

    .dialogue-line.not-important {
      border-color: #F44336;
      background: rgba(244, 67, 54, 0.2);
    }

    .dialogue-text {
      font-size: 1.1rem;
    }

    .feedback {
      margin-top: 0.5rem;
      font-weight: bold;
    }

    .good-feedback {
      color: #4CAF50;
    }

    .bad-feedback {
      color: #F44336;
    }

    .collected-infos {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 2rem;
    }

    .collected-infos h4 {
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
    }

    .no-infos {
      text-align: center;
      opacity: 0.7;
      font-style: italic;
    }

    .infos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
    }

    .info-card {
      background: rgba(255, 255, 255, 0.1);
      border-left: 4px solid;
      border-radius: 8px;
      padding: 1rem;
    }

    .info-card.ui {
      border-left-color: #2196F3;
    }

    .info-card.ux {
      border-left-color: #FF9800;
    }

    .info-card.theme {
      border-left-color: #9C27B0;
    }

    .info-card.persona {
      border-left-color: #4CAF50;
    }

    .info-type {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
      opacity: 0.7;
    }

    .info-content {
      font-weight: 500;
    }

    .instructions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .instruction-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 1.5rem;
    }

    .instruction-card h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }

    .instruction-card p {
      margin: 0;
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      .interview-container {
        padding: 1rem;
      }
      
      .current-person {
        flex-direction: column;
        text-align: center;
      }
      
      .interview-progress {
        text-align: center;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewComponent {
  
  selectedPersonId = signal<string | null>(null);
  selectedDialogues = new Set<string>();
  
  constructor(public gameService: ClientGameService) {}

  availablePersons = computed(() => this.gameService.persons);
  
  currentDialogues = computed(() => {
    const personId = this.selectedPersonId();
    if (!personId) return [];
    return this.gameService.getDialoguesForPerson(personId);
  });

  collectedInfosCount = computed(() => 
    this.gameService.getCollectedInfos().length
  );

  selectPerson(personId: string): void {
    if (this.isPersonCompleted(personId)) return;
    this.selectedPersonId.set(personId);
    this.selectedDialogues.clear();
  }

  selectDialogue(dialogueId: string): void {
    if (this.selectedDialogues.has(dialogueId)) return;
    
    this.selectedDialogues.add(dialogueId);
    const result = this.gameService.selectDialogueLine(dialogueId);
    
    // Feedback visuel déjà géré par les classes CSS
  }

  isDialogueRevealed(dialogueId: string): boolean {
    return this.selectedDialogues.has(dialogueId);
  }

  isPersonCompleted(personId: string): boolean {
    return this.gameService.getGameState().completedInterviews.includes(personId);
  }

  canCompleteInterview(): boolean {
    const personId = this.selectedPersonId();
    if (!personId) return false;
    
    // Au moins une information collectée pour cette personne
    const dialogues = this.currentDialogues();
    return dialogues.some(d => 
      this.selectedDialogues.has(d.id) && d.isImportant
    );
  }

  completeCurrentInterview(): void {
    const personId = this.selectedPersonId();
    if (!personId || !this.canCompleteInterview()) return;
    
    this.gameService.completeInterview(personId);
    this.selectedPersonId.set(null);
    this.selectedDialogues.clear();
  }

  getSelectedPerson(): Person | undefined {
    const personId = this.selectedPersonId();
    if (!personId) return undefined;
    return this.gameService.getPerson(personId);
  }

  getInfoTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      'ui': 'Interface',
      'ux': 'Expérience',
      'theme': 'Thème',
      'persona': 'Persona'
    };
    return labels[type] || type;
  }
}