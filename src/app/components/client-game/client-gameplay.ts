import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type Phaser from 'phaser';
import { EventBus } from '../../../assets/phaser_engine/EventBus';

@Component({
  selector: 'client-gameplay',
  template: '<div id="game-container"></div>',
  standalone: true,
})
export class ClientGameplay implements OnInit, OnDestroy {
  // On utilise les types de Phaser pour garder l'intelligence de l'IDE
  scene?: Phaser.Scene;
  game?: Phaser.Game;
  sceneCallBack?: (scene: Phaser.Scene) => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    // BLOCAGE SSR : On n'exécute le moteur de jeu QUE sur le navigateur
    if (isPlatformBrowser(this.platformId)) {
      // Import dynamique de la fonction StartGame
      // Cela évite que le serveur ne lise le fichier 'main.ts' de Phaser
      const { default: StartGame } = await import('../../../assets/phaser_engine/main');

      // Initialisation du jeu
      this.game = StartGame('game-container');

      // Écoute de l'EventBus (déjà sécurisé de son côté)
      EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
        this.scene = scene;
        if (this.sceneCallBack) {
          this.sceneCallBack(scene);
        }
      });
    }
  }

  ngOnDestroy(): void {
    // On ne détruit le jeu que s'il a été créé (donc côté navigateur)
    if (isPlatformBrowser(this.platformId) && this.game) {
      this.game.destroy(true);
      // Optionnel : Nettoyer l'EventBus pour éviter les fuites mémoire
      EventBus.off('current-scene-ready');
    }
  }
}
