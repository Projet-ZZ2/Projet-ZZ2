import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Computer } from "../computer/computer";

@Component({
  selector: 'app-clicker-game',
  imports: [Computer],
  templateUrl: './clicker-game.html',
  styleUrl: './clicker-game.css',
})
export class ClickerGame {
  gameUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.gameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'assets/clicker-game/index.html'
    );
  }

}