import { Component, Input } from '@angular/core';
import { ComputerIconModel } from '../../../model/computerIconModel';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  @Input() icon!: ComputerIconModel;

}
