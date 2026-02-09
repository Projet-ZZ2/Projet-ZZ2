import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtfGame } from './ctf-game/ctf-game';
import { LevelGeneratorService } from '../../services/level-generator.service';
import { GameLevel } from '../../services/level-generator.service';
import { Computer } from "../computer/computer";
import { LEVEL_CONFIGS } from '../../data/ctf-data';

@Component({
  selector: 'app-ctf',
  imports: [CommonModule, CtfGame, Computer],
  templateUrl: './ctf.html',
  styleUrl: './ctf.css',
})
export class Ctf implements OnInit {
  currentLevel!: GameLevel;
  currentLevelIndex = 0;

  constructor(private levelGen: LevelGeneratorService) {}

  ngOnInit() {
    this.loadLevel(0);
  }

  loadLevel(index: number) {

    if (index >= LEVEL_CONFIGS.length) {
      alert("Tu as trouvé tous les bugs !");
      return;
    }

    const config = LEVEL_CONFIGS[index];

    this.currentLevel = this.levelGen.generateLevel(
      config.id,
      config.name,
      config.description,
      config.code,
      config.target
    );
  }

  onLevelComplete() {
    this.loadLevel(++this.currentLevelIndex);
  }
}
