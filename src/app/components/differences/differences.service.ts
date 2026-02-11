import { Injectable } from '@angular/core';
import { DifferencesGameModel } from '../../model/differencesGameModel';
import { DIFFERENCES } from '../../data/differencesGameData'; 
import { playSound } from '../../model/audio-helper';

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

// Dans ton differences.service.ts
  getIcons() {
    return this.icons.filter(icon => icon.id !== 0);
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
      // On joue le son de succès seulement si le niveau n'était pas déjà résolu
      if (!level.isResolved) {
        playSound('success.mp3', true); // true pour indiquer un succès
      }
      
      level.isResolved = true;
      this.unlockNextLevel(id);
      return true;
    } else {
      // Le code est différent : on joue le son d'erreur
      playSound('defeat.mp3', false); // false pour indiquer une erreur
      return false;
    }
  }

  private unlockNextLevel(currentId: number) {
    const nextLevel = this.icons.find(icon => icon.id === currentId + 1);
    if (nextLevel) {
      nextLevel.isLocked = false;
    }
  }
}