import { Component, viewChild } from "@angular/core";
import { ClientGameplay } from "./client-gameplay";
//import { Game } from "../../../assets/phaser/scenes/Game";
import {CommonModule} from '@angular/common'
import { EventBus } from "../../../assets/phaser/EventBus";

@Component({
  selector: 'client-game',
  standalone: true,
  imports: [CommonModule, ClientGameplay],
  templateUrl:'./client-game.html'
})
export class ClientGame{
  public spritePosition = { x: 0, y: 0 };
  public canMoveSprite = false;

  
  gameRef = viewChild.required(ClientGameplay);

  constructor(){
    EventBus.on('current-scene-ready', (scene : Phaser.Scene) => {
      this.canMoveSprite = scene.scene.key !== 'MainMenu';
    });
  }
}