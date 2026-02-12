import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComputerIconModel } from '../model/computerIconModel';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private openGameSubject = new BehaviorSubject<ComputerIconModel | null>(null);
  public openGame$: Observable<ComputerIconModel | null> = this.openGameSubject.asObservable();

  setOpenGame(icon: ComputerIconModel | null): void {
    this.openGameSubject.next(icon);
  }

  getOpenGame(): ComputerIconModel | null {
    return this.openGameSubject.value;
  }
}