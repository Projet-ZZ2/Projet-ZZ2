import { Component, signal, computed, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientGameService } from '../../../../services/client-game.service';
import { Insight } from '../../../../model/client-game.model';

@Component({
  selector: 'insights-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InsightsComponent {
  
  draggedInsight = signal<string | null>(null);
  private placementResults = new Map<string, { distance: number; points: number }>();
  
  constructor(public gameService: ClientGameService) {
    // Initialisation après le rendu pour s'assurer que les éléments DOM existent
    afterNextRender(() => {
      // Ici on peut ajouter une logique d'initialisation si nécessaire
    });
  }

  insights = computed(() => this.gameService.getInsights());
  
  unplacedInsights = computed(() => 
    this.insights().filter(insight => !insight.placed)
  );
  
  placedInsights = computed(() => 
    this.insights().filter(insight => insight.placed)
  );

  startDrag(insightId: string, event: DragEvent): void {
    this.draggedInsight.set(insightId);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', insightId);
    }
  }

  endDrag(): void {
    this.draggedInsight.set(null);
  }

  allowDrop(event: DragEvent): void {
    event.preventDefault();
  }

  dropInsight(event: DragEvent): void {
    event.preventDefault();
    const insightId = event.dataTransfer?.getData('text/plain');
    if (!insightId) return;

    const dropZone = event.currentTarget as HTMLElement;
    const rect = dropZone.getBoundingClientRect();
    
    // Calculer la position relative dans le graphique (0-10 sur chaque axe)
    const x = ((event.clientX - rect.left) / rect.width) * 10;
    const y = (1 - (event.clientY - rect.top) / rect.height) * 10;

    const position = {
      x: Math.max(0, Math.min(10, x)),
      y: Math.max(0, Math.min(10, y))
    };

    const result = this.gameService.placeInsight(insightId, position);
    this.placementResults.set(insightId, result);
    
    this.draggedInsight.set(null);
  }

  resetInsight(insightId: string): void {
    // Réinitialiser l'insight pour le replacer
    const insights = this.gameService.getInsights();
    const insight = insights.find(i => i.id === insightId);
    if (insight) {
      insight.placed = false;
      insight.playerPosition = undefined;
      this.placementResults.delete(insightId);
    }
  }

  getInsightXPosition(insight: Insight): number {
    return insight.playerPosition ? (insight.playerPosition.x / 10) * 100 : 0;
  }

  getInsightYPosition(insight: Insight): number {
    return insight.playerPosition ? (insight.playerPosition.y / 10) * 100 : 0;
  }

  getInsightFeedback(insight: Insight): { message: string; type: string } | null {
    const result = this.placementResults.get(insight.id);
    if (!result) return null;

    const accuracy = Math.max(0, (1 - result.distance / Math.sqrt(200)) * 100);
    
    if (accuracy >= 80) {
      return { message: '🔥 Très précis !', type: 'hot' };
    } else if (accuracy >= 60) {
      return { message: '👍 Bien placé', type: 'warm' };
    } else if (accuracy >= 40) {
      return { message: '🤔 Pas mal', type: 'warm' };
    } else {
      return { message: '❄️ Trop loin...', type: 'cold' };
    }
  }

  getAverageAccuracy(): number {
    if (this.placementResults.size === 0) return 0;
    
    const accuracies = Array.from(this.placementResults.values()).map(result => 
      Math.max(0, (1 - result.distance / Math.sqrt(200)) * 100)
    );
    
    const average = accuracies.reduce((sum, acc) => sum + acc, 0) / accuracies.length;
    return Math.round(average);
  }
}