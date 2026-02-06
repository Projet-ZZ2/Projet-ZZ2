import { Component, viewChild, Inject, PLATFORM_ID } from "@angular/core";
import { ClientGameplay } from "./client-gameplay";
import { CommonModule, isPlatformBrowser } from '@angular/common'; // Ajoutez isPlatformBrowser
import { EventBus } from "../../../assets/phaser_engine/EventBus";

@Component({
  selector: 'client-game',
  standalone: true,
  imports: [CommonModule, ClientGameplay],
  templateUrl: './client-game.html'
})
export class ClientGame {
  public spritePosition = { x: 0, y: 0 };
  public canMoveSprite = false;

  gameRef = viewChild.required(ClientGameplay);

  // Injectez PLATFORM_ID
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // N'écoutez les événements QUE dans le navigateur
    if (isPlatformBrowser(this.platformId)) {
      EventBus.on('current-scene-ready', (scene: any) => {
        this.canMoveSprite = scene.scene.key !== 'MainMenu';
      });
    }
  }
}