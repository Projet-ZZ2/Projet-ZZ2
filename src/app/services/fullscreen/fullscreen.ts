import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class FullscreenService {
  constructor(@Inject(DOCUMENT) private document: any) {}

  toggleFullscreen(): void {
    if (!this.document.fullscreenElement) {
      // On passe en plein écran (sur l'élément racine <html>)
      this.document.documentElement.requestFullscreen().catch((err: any) => {
        console.error(`Erreur : impossible d'activer le plein écran (${err.message})`);
      });
    } else {
      // On quitte le plein écran
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      }
    }
  }

  // Optionnel : vérifier si on est déjà en plein écran
  isFullscreen(): boolean {
    return !!this.document.fullscreenElement;
  }
}
