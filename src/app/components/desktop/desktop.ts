import { Component } from '@angular/core';
import { COMPUTER_ICONS } from '../../data/computerIconsData';
import { ComputerIcon } from '../computer-icon/computer-icon';
import { ComputerIconModel } from '../../model/computerIconModel';
import { Computer } from '../computer/computer';
import { playBackgroundMusic } from '../../model/audio-helper';

@Component({
  selector: 'app-desktop',
  imports: [ComputerIcon, Computer],
  templateUrl: './desktop.html',
  styleUrl: './desktop.css',
})
export class Desktop {
  computerIcons: ComputerIconModel[] = COMPUTER_ICONS;
  startExperience() {
      // On lance la musique lors du premier clic de l'utilisateur
      playBackgroundMusic('main theme.mp3');
      
      // Logique pour rediriger vers le jeu ou masquer l'accueil...
  }
}
