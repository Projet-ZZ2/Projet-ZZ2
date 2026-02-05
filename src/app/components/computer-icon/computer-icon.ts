import { Component, Input } from '@angular/core';
import { ComputerIconModel } from '../../model/computerIconModel';

@Component({
  selector: 'app-computer-icon',
  imports: [],
  templateUrl: './computer-icon.html',
  styleUrl: './computer-icon.css',
})
export class ComputerIcon {
  @Input() icon!: ComputerIconModel;
}
