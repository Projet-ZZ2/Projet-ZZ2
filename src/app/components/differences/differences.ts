import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DifferencesService } from './differences.service';
import { DifferencesGameModel } from '../../model/differencesGameModel';

@Component({
  selector: 'app-differences',
  standalone: true,
  imports: [CommonModule, FormsModule], // Indispensable pour ngModel et *ngIf
  templateUrl: './differences.html',
  styleUrls: ['./differences.css']
})
export class DifferencesGame {
  selectedFile: DifferencesGameModel | null = null;
  userCode: string = '';
  feedback: string = '';

  constructor(public differencesService: DifferencesService) {}

  openFile(file: DifferencesGameModel) {
    if (file.isLocked) {
      this.feedback = "Ce fichier est verrouillé !";
      return;
    }
    this.selectedFile = file;
    this.userCode = file.content?.buggyCode ?? '';
    this.feedback = '';
  }

  checkCorrection() {
    if (!this.selectedFile) return;

    const success = this.differencesService.verifyCode(this.selectedFile.id, this.userCode);
    
    if (success) {
      this.feedback = "Bravo ! Erreur corrigée.";
    } else {
      this.feedback = "Il reste encore une erreur sémantique...";
    }
  }
}