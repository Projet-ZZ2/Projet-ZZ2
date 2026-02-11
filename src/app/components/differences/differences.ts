import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DifferencesService } from './differences.service';
import { DifferencesGameModel } from '../../model/differencesGameModel';
import { Router } from '@angular/router';

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

  constructor(
  public differencesService: DifferencesService, 
  private router: Router // On ajoute simplement le router ici
  ) {}

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

      if (this.differencesService.isAllResolved()) {
        this.feedback = "Système entièrement restauré ! Retour imminent...";
        
        setTimeout(() => {
          this.router.navigate(['/desktop']); 
        }, 2000);
      } // Fin du bloc isAllResolved

    } else {
      this.feedback = "Il reste encore une erreur sémantique...";
    }
  }

  openHelp() {
    const helpFile: DifferencesGameModel = {
      id: -1,
      label: 'Aide',
      type: 'help' as any,
      content: {
        title: 'Aide - Bloc-notes',
        instructions: 'Indications pour le développement.',
        buggyCode: `Ce jeu fonctionne à l'aide de Javascript.\n\nIndications :\n- === sert à comparer.\n- Tableau : let tab = [].`,
        correctCode: '', 
        language: 'text',
        errorsFound: []
      }
    } as any;
    this.selectedFile = helpFile;
    this.userCode = helpFile.content?.buggyCode ?? '';
  }
}