import { Component, OnInit, afterNextRender, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Rule } from '../../model/rulesQuLiceModel';
import { VALIDATION_RULES } from '../../model/rulesQuLice';
import { playSound } from '../../model/audio-helper';
import { Router } from '@angular/router';
import { Computer } from '../computer/computer';

@Component({
  selector: 'app-qulicegame',
  standalone: true,
  imports: [CommonModule, FormsModule, Computer],
  templateUrl: './qulicegame.html',
  styleUrl: './qulicegame.css',
})
export class Qulicegame implements OnInit {
  codeContent: string = "";
  initialCode: string = "";
  isGameWon: boolean = false;
  
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

    // Déléguer la mise à jour de l'indice à showHint() (source unique de vérité)
    this.showHint();

    if (this.allRulesValid) {
      // Affiche la fenêtre de victoire au lieu de naviguer immédiatement
      this.isGameWon = true;
    }
  }

  continueGame() {
    this.router.navigate(['/desktop']);
  }

  resetCode() {
    if (confirm("Voulez-vous vraiment réinitialiser tout le code ?")) {
      // 1. On remet le code tel qu'il était au chargement
      this.codeContent = this.initialCode;
      
      // 2. On relance immédiatement la vérification pour mettre à jour les règles
      this.checkRules();
      
      // 3. (Optionnel) Jouer un petit son
      // playSound('reset.mp3', false);
      
      console.log("Code réinitialisé !");
      this.currentHint = null;
      this.computedHint = null;
      this.showHintModal = false;
    }
  }

  // Hint values: `computedHint` is updated automatically but not shown.
  // `currentHint` is only set when opening the modal.
  computedHint: string | null = null;
  currentHint: string | null = null; // visible only inside modal
  showHintModal: boolean = false;

  showHint(open: boolean = false) {
    // compute hint but do not show it inline
    const activeRule = this.validationRules.find(r => r.status === 'pending' || r.status === 'failed');

    if (activeRule && activeRule.indice) {
      this.computedHint = activeRule.indice;
    } else {
      this.computedHint = null;
    }

    if (open) {
      this.currentHint = this.computedHint;
      this.showHintModal = true;
    }
  }

  closeHintModal() {
    this.showHintModal = false;
    this.currentHint = null;
  }
}