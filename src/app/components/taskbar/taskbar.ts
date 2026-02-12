import { Component } from '@angular/core';
import { Task } from "./task/task";
import { ComputerIconModel } from '../../model/computerIconModel';
import { GameStateService } from '../../services/game-state.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-taskbar',
  imports: [Task, AsyncPipe],
  templateUrl: './taskbar.html',
  styleUrl: './taskbar.css',
})
export class Taskbar {
  openGame$: Observable<ComputerIconModel | null>;

  constructor(private gameStateService: GameStateService) {
    this.openGame$ = this.gameStateService.openGame$;
  }
}