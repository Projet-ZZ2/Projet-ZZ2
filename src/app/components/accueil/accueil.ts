import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FullscreenService } from '../../services/fullscreen/fullscreen';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './accueil.html',
  styleUrls: ['./accueil.css'],
})
export class Accueil {
  constructor(public fullscreenService: FullscreenService) {}

  onFullscreenClick() {
    this.fullscreenService.toggleFullscreen();
  }
}
