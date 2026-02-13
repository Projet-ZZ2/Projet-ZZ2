import { Component, Input } from '@angular/core';
import { ComputerIconModel } from '../../model/computerIconModel';
import { Router } from '@angular/router';
import { playSound } from '../../model/audio-helper';

@Component({
  selector: 'app-computer-icon',
  imports: [],
  templateUrl: './computer-icon.html',
  styleUrl: './computer-icon.css',
})
export class ComputerIcon {
  @Input() icon!: ComputerIconModel;
  constructor(private router: Router) {}

  onGameClick(game: ComputerIconModel): void {
    console.log("navigate");
    playSound("Windows XP Balloon.wav", false);
    this.router.navigate(['/game', game.id])
  }
}
