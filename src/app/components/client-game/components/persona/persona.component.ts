import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientGameService } from '../../../../services/client-game.service';
import { Option, PersonaCharacteristic } from '../../../../model/client-game.model';
import { personaOptionsData } from '../../../../data/client-game/options';

@Component({
  selector: 'persona-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './persona.component.html',
  styleUrls: ['../steps.css', './persona.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonaComponent {
  personaName = signal<string>('');
  personaCharacteristics = signal<PersonaCharacteristic[]>([]);
  isPersonaSubmitted = signal<boolean>(false);
  lastScore = signal<number>(0);

  readonly personaOptions: [string, Option[]][] = Object.entries(personaOptionsData);

  constructor(public gameService: ClientGameService) {}

  updatePersonaName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.personaName.set(target.value);
  }

  selectCharacteristic(type: PersonaCharacteristic['type'], value: string, label: string): void {
    const characteristics = this.personaCharacteristics();
    const existingIndex = characteristics.findIndex((c) => c.type === type);

    const newCharacteristic: PersonaCharacteristic = {
      type,
      value: value,
      isCorrect: false,
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
    const characteristic = this.personaCharacteristics().find((c) => c.type === type);
    return characteristic ? characteristic.value : null;
  }

  canValidatePersona(): boolean {
    const requiredTypes: PersonaCharacteristic['type'][] = [
      'age',
      'profession',
      'needs',
      'frustrations',
      'goals',
    ];
    const characteristics = this.personaCharacteristics();

    return (
      requiredTypes.every((type) => characteristics.some((c) => c.type === type)) &&
      this.personaName().trim().length > 0
    );
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
    return personaOptionsData[type]?.[0]?.caracValue || type;
  }

  getCharacteristicValueLabel(type: PersonaCharacteristic['type'], value: string): string {
    return personaOptionsData[type]?.find((opt) => opt.value === value)?.label || value;
  }
}
