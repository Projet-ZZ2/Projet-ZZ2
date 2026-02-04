import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Computer } from './components/computer/computer';
import { Espace3d } from './components/espace3d/espace3d';

export const routes: Routes = [
  {
    path: '',
    component: Accueil,
  },
  {
    path: 'computer',
    component: Computer,
  },
  {
    path: 'jeu',
    component: Espace3d,
  }
];
