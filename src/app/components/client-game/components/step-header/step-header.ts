import { Component } from '@angular/core';
import { ClientGameService } from '../../../../services/client-game.service';

@Component({
  selector: 'app-step-header',
  imports: [],
  templateUrl: './step-header.html',
  styleUrl: './step-header.css',
})
export class StepHeader {
  currentStep = this.gameService.currentStep;
  canProceed = this.gameService.canProceedToNextStep;
  proceedToInsights = () => this.gameService.proceedToInsights();
  proceedToPersona = () => this.gameService.proceedToPersona();
  proceedToMaquette = () => this.gameService.proceedToMaquette();
  finishGame = () => this.gameService.finishGame();
  restartGame = () => this.gameService.startGame();

  constructor(public gameService: ClientGameService) {}
}
