import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Computer } from './components/computer/computer';

export const routes: Routes = [
  {
    path: '',
    component: Accueil,
  },
  {
    path: 'computer',
    component: Computer,
  },
];
