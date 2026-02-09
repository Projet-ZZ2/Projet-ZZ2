import { Injectable } from '@angular/core';
import { DifferencesGameModel } from '../../model/differencesGameModel';
import { DIFFERENCES } from '../../data/differencesGameData'; 

@Injectable({
  providedIn: 'root'
})
export class DifferencesService {
  // On initialise avec tes données exportées
  private icons: DifferencesGameModel[] = DIFFERENCES.map(icon => ({
    ...icon,
    isLocked: icon.id !== 1, // Débloque seulement le premier par défaut
    isResolved: false
  }));

  getIcons() {
    return this.icons;
  }

  // Permet au composant de récupérer les détails du fichier cliqué
  getLevelById(id: number): DifferencesGameModel | undefined {
    return this.icons.find(icon => icon.id === id);
  }

  verifyCode(id: number, userCode: string): boolean {
    const level = this.icons.find(icon => icon.id === id);
    if (!level || !level.content) return false;

    const clean = (str: string) => str.replace(/\s+/g, '').trim();
    
    if (clean(userCode) === clean(level.content.correctCode)) {
      level.isResolved = true;
      this.unlockNextLevel(id);
      return true;
    }
    return false;
  }

  private unlockNextLevel(currentId: number) {
    const nextLevel = this.icons.find(icon => icon.id === currentId + 1);
    if (nextLevel) {
      nextLevel.isLocked = false;
    }
  }
}