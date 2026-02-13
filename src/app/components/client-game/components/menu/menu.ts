import { Component } from '@angular/core';
import { ClientGameService } from '../../../../services/client-game.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrls: ['../steps.css', './menu.css'],
})
export class Menu {
  startGame = () => this.gameService.startGame();

  constructor(public gameService: ClientGameService) {}
}
