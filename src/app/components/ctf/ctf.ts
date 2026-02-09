import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtfGame } from './ctf-game/ctf-game';
import { LevelGeneratorService } from '../../services/level-generator.service';
import { GameLevel } from '../../services/level-generator.service';
import { Computer } from "../computer/computer";

@Component({
  selector: 'app-ctf',
  imports: [CommonModule, CtfGame, Computer],
  templateUrl: './ctf.html',
  styleUrl: './ctf.css',
})
export class Ctf implements OnInit {
  currentLevel!: GameLevel;

  level1Code = `
function calculateTotal(price, tax) {
  const total = price + tax;
  console.log("Calculated!");
  return total; // TODO: Remove before prod
}`;

  level2Code = `
import { User } from './models';

export class AuthService {
  login(user: User) {
    if (user.password === "admin123") {
       return true;
    }
    return false;
  }
}`;

  constructor(private levelGen: LevelGeneratorService) { }

  ngOnInit() {
    this.loadLevel1();
  }

  loadLevel1() {
    // Arguments: ID, Filename, Hint, Raw Code, The Winning Snippet
    this.currentLevel = this.levelGen.generateLevel(
      1,
      'cart.utils.js',
      'Someone left a console log in production code. Remove it.',
      this.level1Code,
      'console' // User has to click the word "console"
    );
  }

  loadLevel2() {
    this.currentLevel = this.levelGen.generateLevel(
      2,
      'auth.service.ts',
      'Security Alert: Hardcoded credentials found.',
      this.level2Code,
      '"admin123"' // Note: includes quotes because the lexer keeps quotes on strings
    );
  }

  onLevelComplete() {
    alert("Level Complete! Loading next...");
    this.loadLevel2();
  }
}
