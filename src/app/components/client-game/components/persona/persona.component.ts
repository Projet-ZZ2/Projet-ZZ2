import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientGameService } from '../../../../services/client-game.service';
import { PersonaCharacteristic } from '../../../../model/client-game.model';

@Component({
  selector: 'persona-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './persona.component.html',
  styleUrl: './persona.component.css',
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