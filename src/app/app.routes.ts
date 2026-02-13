import { Routes } from '@angular/router';
import { Accueil } from './components/accueil/accueil';
import { Espace3d } from './components/espace3d/espace3d';
import { ClientGame } from './components/client-game/client-game';
import { Gitgame } from './components/gitgame/gitgame';
import { Qulicegame } from './components/qulicegame/qulicegame';
import { Desktop } from './components/desktop/desktop';
import { Ctf } from './components/ctf/ctf';
import { DifferencesGame } from './components/differences/differences';
import { Fin } from './components/fin/fin';
import { GameCompletionGuard } from './services/game-completion.guard';
import { gameResolver } from './services/game-resolver';
import { ClickerGame } from './components/clicker-game/clicker-game';

export const routes: Routes = [
  {
    path: '',
    component: Accueil,
  },
  {
    path: 'desktop',
    component: Desktop,
    resolve: { game: gameResolver }
  },
  {
    path: 'jeu',
    component: Espace3d,
  },
  {
    path: 'game/1',
    component: ClientGame,
    resolve: { game: gameResolver }
  },
  {
    path: 'game/2',
    component: Gitgame,
    resolve: { game: gameResolver }
  },
  {
    path: 'game/3',
    component: Qulicegame,
    resolve: { game: gameResolver }
  },
  {
    path: 'game/4',
    component: Ctf,
    resolve: { game: gameResolver }
  },
  {
    path: 'game/7',
    component: DifferencesGame,
    resolve: { game: gameResolver }
  },
  {
    path: 'game/8',
    component: ClickerGame,
    resolve: { game: gameResolver }
  },
  {
    path: "victory",
    component: Fin,
    canActivate: [GameCompletionGuard]
  }
];
