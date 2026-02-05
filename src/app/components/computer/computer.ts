import { Component } from '@angular/core';
import { ComputerIcon } from '../computer-icon/computer-icon';
import { ComputerIconModel } from '../../model/computerIconModel';
import { COMPUTER_ICONS } from '../../data/computerIconsData';

@Component({
  selector: 'app-computer',
  standalone: true,
  imports: [ComputerIcon],
  templateUrl: './computer.html',
  styleUrls: ['./computer.css'],
})
export class Computer {
  computerIcons: ComputerIconModel[] = COMPUTER_ICONS;

}
