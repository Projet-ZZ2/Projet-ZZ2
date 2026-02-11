import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameCompletionService {
  // Signaux pour chaque mini-jeu (5 jeux)
  private game1Completed = signal(false); // ClientGame
  private game2Completed = signal(false); // Gitgame
  private game3Completed = signal(false); // Qulicegame
  private game4Completed = signal(false); // Ctf
  private game7Completed = signal(false); // DifferencesGame

  // Computed signal pour vérifier si TOUS les jeux sont complétés
  readonly allGamesCompleted = computed(() => 
    this.game1Completed() && 
    this.game2Completed() && 
    this.game3Completed() && 
    this.game4Completed() && 
    this.game7Completed()
  );

  // Computed signal pour voir le tableau de complétude
  readonly completionStatus = computed(() => ({
    game1: this.game1Completed(),
    game2: this.game2Completed(),
    game3: this.game3Completed(),
    game4: this.game4Completed(),
    game7: this.game7Completed()
  }));

  // Méthodes pour marquer un jeu comme complété
  completeGame(gameId: 1 | 2 | 3 | 4 | 7): void {
    switch (gameId) {
      case 1:
        this.game1Completed.set(true);
        break;
      case 2:
        this.game2Completed.set(true);
        break;
      case 3:
        this.game3Completed.set(true);
        break;
      case 4:
        this.game4Completed.set(true);
        break;
      case 7:
        this.game7Completed.set(true);
        break;
    }
    console.log(`Game ${gameId} completed!`, this.completionStatus());
  }

  // Réinitialiser tous les jeux (optionnel, pour les tests)
  resetAllGames(): void {
    this.game1Completed.set(false);
    this.game2Completed.set(false);
    this.game3Completed.set(false);
    this.game4Completed.set(false);
    this.game7Completed.set(false);
  }

  // Vérifier si un jeu spécifique est complété
  isGameCompleted(gameId: 1 | 2 | 3 | 4 | 7): boolean {
    switch (gameId) {
      case 1:
        return this.game1Completed();
      case 2:
        return this.game2Completed();
      case 3:
        return this.game3Completed();
      case 4:
        return this.game4Completed();
      case 7:
        return this.game7Completed();
    }
  }
}
