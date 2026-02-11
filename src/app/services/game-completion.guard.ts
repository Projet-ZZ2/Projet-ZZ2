import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GameCompletionService } from './game-completion.service';

@Injectable({
  providedIn: 'root'
})
export class GameCompletionGuard implements CanActivate {
  constructor(
    private gameCompletionService: GameCompletionService,
    private router: Router
  ) {}

  canActivate(): boolean {
    // Vérifier si tous les jeux sont complétés
    if (this.gameCompletionService.allGamesCompleted()) {
      return true;
    }

    // Si non, rediriger vers l'accueil
    console.warn('⚠️ Accès à la page victory refusé - tous les mini-jeux ne sont pas complétés');
    
    // Afficher l'alerte uniquement si elle existe (côté navigateur)
    if (typeof window !== 'undefined' && typeof window.alert === 'function') {
      window.alert('❌ Vous devez d\'abord compléter tous les mini-jeux !');
    }
    
    this.router.navigate(['']);
    return false;
  }
}
