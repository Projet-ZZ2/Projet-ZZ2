import { Component, signal, computed, ChangeDetectionStrategy } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ClientGameService } from '../../services/client-game.service';
import { InterviewComponent } from './components/interview/interview.component';
import { InsightsComponent } from './components/insights/insights.component';
import { PersonaComponent } from './components/persona/persona.component';
import { MaquetteComponent } from './components/maquette/maquette.component';
import { ResultsComponent } from './components/results/results.component';

@Component({
  selector: 'client-game',
  standalone: true,
  imports: [
    CommonModule,
    InterviewComponent,
    InsightsComponent,
    PersonaComponent,
    MaquetteComponent,
    ResultsComponent
  ],
  templateUrl: './client-game.html',
  styleUrls: ['./client-game.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientGame {
  
  // Signaux pour l'état du jeu
  currentStep = this.gameService.currentStep;
  score = this.gameService.score;
  canProceed = this.gameService.canProceedToNextStep;

  constructor(private gameService: ClientGameService) {}

  startGame(): void {
    this.gameService.startGame();
  }

  proceedToInsights(): void {
    this.gameService.proceedToInsights(); 
  }

  proceedToPersona(): void {
    this.gameService.proceedToPersona(); 
  }

  proceedToMaquette(): void {
    this.gameService.proceedToMaquette();
  }

  finishGame(): void {
    this.gameService.finishGame();
  }

  restartGame(): void {
    this.gameService.startGame();
  }
}