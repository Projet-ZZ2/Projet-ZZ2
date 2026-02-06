import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import StartGame from '../../../assets/phaser/main';
import { EventBus } from '../../../assets/phaser/EventBus';

@Component({
  selector: 'app-client-game',
  templateUrl: './client-game.html',
  styleUrl: './client-game.css',
  standalone: true
})
export class ClientGame implements OnInit {
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
