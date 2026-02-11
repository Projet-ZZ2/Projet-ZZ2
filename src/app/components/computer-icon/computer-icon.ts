import { Component, Input } from '@angular/core';
import { ComputerIconModel } from '../../model/computerIconModel';
import { Router } from '@angular/router';

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
    this.router.navigate(['/game', game.id])
  }
}
