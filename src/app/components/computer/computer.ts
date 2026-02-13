import { Component } from '@angular/core';
import { Taskbar } from '../taskbar/taskbar';
import { Cross } from './cross/cross';

@Component({
  selector: 'app-computer',
  standalone: true,
  imports: [Taskbar, Cross],
  templateUrl: './computer.html',
  styleUrls: ['./computer.css'],
})
export class Computer {

}
