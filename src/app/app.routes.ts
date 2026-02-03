import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Computer } from './components/computer/computer';

export const routes: Routes = [
  {
    path: '',              // route racine
    redirectTo: 'accueil', // redirige vers accueil
    pathMatch: 'full'      // obligatoire pour éviter une redirection infinie
  },
  {
    path: 'accueil',
    component: Accueil,
  },
  {
    path: 'computer',
    component: Computer,
  },
];
