import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Computer } from './components/computer/computer';
import { Espace3d } from './components/espace3d/espace3d';
import { ClientGame } from './components/client-game/client-game';
import { Gitgame } from './components/gitgame/gitgame';
import { Qulicegame } from './components/qulicegame/qulicegame';

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
  },
  {
    path: 'game/1',
    component: ClientGame
  },
  {
    path: 'game/2',
    component: Gitgame
  },
    {
    path: 'game/3',
    component: Qulicegame
  }
];
