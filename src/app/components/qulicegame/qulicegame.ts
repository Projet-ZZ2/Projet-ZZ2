import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Indispensable pour ngModel
import { Rule } from '../../model/rulesQuLiceModel';
import { VALIDATION_RULES } from '../../model/rulesQuLice';

@Component({
  selector: 'app-qulicegame',
  standalone: true,
  imports: [CommonModule, FormsModule], // Vérifie bien que FormsModule est ici
  templateUrl: './qulicegame.html',
  styleUrl: './qulicegame.css',
  host: {
    'ngSkipHydration': 'true'
  }
})
export class Qulicegame implements OnInit {
  codeContent: string = "";
  initialCode: string = "";
  
  // Utilisation du nom EXACT utilisé dans ton HTML (*ngFor="let rule of validationRules")
  validationRules: Rule[] = VALIDATION_RULES;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCode();
  }

  // Fonction appelée par le (click) du bouton dans le HTML
  submitGame() {
    if (this.allRulesValid) {
      alert("Félicitations ! Tout est correct.");
    }
  }

  // Getter utilisé par le [disabled] du bouton dans le HTML
  get allRulesValid(): boolean {
    return this.validationRules.every(rule => rule.status === 'success');
  }

  loadCode() {
    this.http.get('assets/qulicegame/code.txt', { responseType: 'text' })
      .subscribe({
        next: (data) => {
          this.codeContent = data;
          this.initialCode = data;
          this.checkRules(); // Vérification initiale
        },
        error: (err) => console.error("Erreur de chargement du fichier code.txt", err)
      });
  }

  checkRules() {
    let allPreviousPassed = true;

    for (let rule of this.validationRules) {
      if (allPreviousPassed) {
        // Sécurité au cas où validator n'est pas défini
        const isValid = rule.validator ? rule.validator(this.codeContent) : false;
        
        rule.status = isValid ? 'success' : 'failed';
        
        // Si cette règle échoue, on arrête de débloquer les suivantes
        if (!isValid) allPreviousPassed = false; 
      } else {
        rule.status = 'locked';
      }
    }
  }
}