import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import StartGame from '../../../assets/phaser_engine/main';
import { EventBus } from '../../../assets/phaser_engine/EventBus';

@Component({
  selector: 'client-gameplay',
  template: '<div id="game-container"></div>',
  standalone: true
})
export class ClientGameplay implements OnInit {
  scene: Phaser.Scene;
  game : Phaser.Game;
  sceneCallBack: (scene : Phaser.Scene) => void;

  ngOnInit(): void {
    this.game=StartGame('game-container');

    EventBus.on('current-scene-ready', (scene : Phaser.Scene) =>
    {
      this.scene = scene;

      if(this.sceneCallBack){
        this.sceneCallBack(scene);
      }
    }
    )
  }

  ngOnDestroy(){
    if(this.game){
      this.game.destroy(true);
    }
  }
}
