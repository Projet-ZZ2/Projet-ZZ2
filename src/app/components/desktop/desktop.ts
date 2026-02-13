import { Component } from '@angular/core';
import { COMPUTER_ICONS } from '../../data/computerIconsData';
import { ComputerIcon } from '../computer-icon/computer-icon';
import { ComputerIconModel } from '../../model/computerIconModel';
import { Computer } from '../computer/computer';
import { Taskbar } from '../taskbar/taskbar';


@Component({
  selector: 'app-desktop',
  imports: [ComputerIcon, Taskbar],
  templateUrl: './desktop.html',
  styleUrl: './desktop.css',
})
export class Desktop {
  computerIcons: ComputerIconModel[] = COMPUTER_ICONS;
}
