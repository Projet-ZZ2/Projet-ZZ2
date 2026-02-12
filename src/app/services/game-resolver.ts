import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ComputerIconModel } from '../model/computerIconModel';
import { COMPUTER_ICONS } from '../data/computerIconsData';
import { GameStateService } from '../services/game-state.service';

export const gameResolver: ResolveFn<ComputerIconModel | null> = (route) => {
  const gameStateService = inject(GameStateService);
  const path = route.routeConfig?.path || '';
  const gameId = path.split('/')[1];

  const icon = COMPUTER_ICONS.find(icon => icon.id === Number(gameId));

  gameStateService.setOpenGame(icon || null);
  
  return icon || null;
};