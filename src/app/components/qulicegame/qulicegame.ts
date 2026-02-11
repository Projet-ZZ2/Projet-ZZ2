import { Component, OnInit, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Indispensable pour ngModel
import { PLATFORM_ID, Inject } from '@angular/core';
import { Rule } from '../../model/rulesQuLiceModel';
import { VALIDATION_RULES } from '../../model/rulesQuLice';
import { playSound } from '../../model/audio-helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qulicegame',
  standalone: true,
  imports: [CommonModule, FormsModule], // Vérifie bien que FormsModule est ici
  templateUrl: './qulicegame.html',
  styleUrl: './qulicegame.css',
  // host: {
  //   'ngSkipHydration': 'true'
  // }
})
export class Qulicegame implements OnInit {
  codeContent: string = "";
  initialCode: string = "";
  
  // Utilisation du nom EXACT utilisé dans ton HTML (*ngFor="let rule of validationRules")
  validationRules: Rule[] = VALIDATION_RULES;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    afterNextRender(() => {
      this.loadCode();
    });
  }

  ngOnInit(): void {
    // loadCode is called in afterNextRender which only runs on the client
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

  async loadCode() {
    // Only load file on client-side (browser), not on server
    if (!isPlatformBrowser(this.platformId)) {
      console.log("Not in browser, skipping loadCode");
      return;
    }

    try {
      console.log("Fetching code.txt...");
      const response = await fetch('/assets/qulicegame/code.txt');
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.text();
      console.log("Code loaded successfully, length:", data.length);
      console.log("Code content:", data);
      
      this.codeContent = data;
      this.initialCode = data;
      this.checkRules(); // Vérification initiale

      this.cdr.markForCheck();
      this.cdr.detectChanges();
      console.log("codeContent after load:", this.codeContent);
    } catch (err) {
      console.error("Erreur de chargement du fichier code.txt", err);
    }
  }

  checkRules() {
    let allPreviousPassed = true;

    for (let rule of this.validationRules) {
      const previousStatus = rule.status;
      if (allPreviousPassed) {
        // Sécurité au cas où validator n'est pas défini
        const isValid = rule.validator ? rule.validator(this.codeContent) : false;
        
        rule.status = isValid ? 'success' : 'failed';

        if (isValid && previousStatus !== 'success') {
          playSound('success.mp3', true); // On joue le son de réussite
        }

        if (!isValid && previousStatus === 'success') {
          playSound('defeat.mp3', false); // Ou 'error.mp3'
        }
        
        // Si cette règle échoue, on arrête de débloquer les suivantes
        if (!isValid) allPreviousPassed = false; 
      } else {
        rule.status = 'locked';
      }
    }

    if (this.allRulesValid) {
      // On attend un peu pour que l'utilisateur voie la dernière règle passer au vert
      setTimeout(() => {
        this.router.navigate(['/desktop']);
      }, 2000);
    }
  }
}