import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientGameService } from '../../../../services/client-game.service';
import { Person, DialogueLine } from '../../../../model/client-game.model';

@Component({
  selector: 'interview-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css',
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