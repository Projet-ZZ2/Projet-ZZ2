import { Component } from '@angular/core';
import { Taskbar } from '../taskbar/taskbar';

@Component({
  selector: 'app-computer',
  standalone: true,
  imports: [Taskbar],
  templateUrl: './computer.html',
  styleUrls: ['./computer.css'],
})
export class Computer {

}
