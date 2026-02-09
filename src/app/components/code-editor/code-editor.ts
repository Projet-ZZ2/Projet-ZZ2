import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DifferencesGameModel } from '../../model/differencesGameModel';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './code-editor.html',
  styleUrls: ['./code-editor.css']
})
export class CodeEditorComponent {
  @Input() file: DifferencesGameModel | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() solved = new EventEmitter<number>();

  userCode: string = '';
  feedback: string = '';
  isCorrect: boolean = false;

  ngOnChanges() {
    if (this.file && this.file.content) {
      this.userCode = this.file.content.buggyCode;
      this.isCorrect = false;
      this.feedback = '';
    }
  }

  checkCode() {
    if (!this.file || !this.file.content) return;

    // Nettoyage pour comparaison (on ignore les espaces et sauts de ligne)
    const clean = (s: string) => s.replace(/\s+/g, '').trim();

    if (clean(this.userCode) === clean(this.file.content.correctCode)) {
      this.isCorrect = true;
      this.feedback = "Félicitations ! Erreur sémantique corrigée. ✅";
      this.solved.emit(this.file.id);
    } else {
      this.isCorrect = false;
      this.feedback = "Le code ne semble pas encore correct. Réessaie ! ❌";
    }
  }
}
