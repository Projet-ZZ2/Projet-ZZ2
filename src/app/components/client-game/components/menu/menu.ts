import { Component } from '@angular/core';
import { ClientGameService } from '../../../../services/client-game.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  startGame = () => this.startGame;

  constructor(public gameService: ClientGameService) {}
}
