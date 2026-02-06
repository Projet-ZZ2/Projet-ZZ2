import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Espace3d } from './components/espace3d/espace3d';
import { ClientGame } from './components/client-game/client-game';
import { Gitgame } from './components/gitgame/gitgame';
import { Qulicegame } from './components/qulicegame/qulicegame';
import { Desktop } from './components/desktop/desktop';
import { Ctf } from './components/ctf/ctf';

export const routes: Routes = [
  {
    path: '',
    component: Accueil,
  },
  {
    path: 'desktop',
    component: Desktop,
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
  },
  {
    path: 'game/4',
    component: Ctf
  }
];
