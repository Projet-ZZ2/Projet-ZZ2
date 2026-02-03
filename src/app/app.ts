import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Computer } from './components/computer/computer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Accueil, Computer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('zz2Project');
}

