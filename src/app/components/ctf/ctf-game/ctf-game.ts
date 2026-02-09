import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CodeToken, GameLevel } from '../../../services/level-generator.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ctf-game',
  imports: [CommonModule],
  templateUrl: './ctf-game.html',
  styleUrl: './ctf-game.css',
})
export class CtfGame implements OnChanges {
  @Input() level!: GameLevel;
  @Output() levelComplete = new EventEmitter<boolean>();

  // UI State
  foundTarget = false;
  clickedWrongId: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    // If the parent passed a new level, reset the game state
    if (changes['level']) {
      this.foundTarget = false;
      this.clickedWrongId = null;
    }
  }

  handleTokenClick(token: CodeToken) {
    if (this.foundTarget) return; // Game over already

    if (token.id === this.level.targetId) {
      this.foundTarget = true;
      this.clickedWrongId = null;
      
      // Add a small delay so they see the animation before moving on
      setTimeout(() => {
        this.levelComplete.emit(true);
      }, 1500);
    } else {
      // Logic for wrong guess (shake effect)
      this.clickedWrongId = token.id;
      setTimeout(() => this.clickedWrongId = null, 500); // Reset shake
    }
  }
}
