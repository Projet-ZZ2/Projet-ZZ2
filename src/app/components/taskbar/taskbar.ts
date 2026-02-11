import { Component } from '@angular/core';
import { Task } from "./task/task";
import { ComputerIconModel } from '../../model/computerIconModel';
import { COMPUTER_ICONS } from '../../data/computerIconsData';

@Component({
  selector: 'app-taskbar',
  imports: [Task],
  templateUrl: './taskbar.html',
  styleUrl: './taskbar.css',
})
export class Taskbar {
  computerIcons: ComputerIconModel[] = COMPUTER_ICONS;
}
