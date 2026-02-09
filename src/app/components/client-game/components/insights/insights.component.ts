import { Component, signal, computed, ChangeDetectionStrategy, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientGameService } from '../../../../services/client-game.service';
import { Insight } from '../../../../model/client-game.model';

@Component({
  selector: 'insights-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="insights-container">
      <div class="insights-explanation">
        <h3>📊 Tableau d'analyse des insights</h3>
        <p>
          Placez chaque feature sur le graphique selon son <strong>importance</strong> (axe Y) et sa <strong>facilité de mise en place</strong> (axe X).
          Plus vous placez précisément, plus vous gagnez de points !
        </p>
      </div>

      <div class="insights-workspace">
        <!-- Features à placer -->
        <div class="features-panel">
          <h4>Features à placer :</h4>
          <div class="features-list">
            @for (insight of unplacedInsights(); track insight.id) {
              <div 
                class="feature-card"
                [class.dragging]="draggedInsight() === insight.id"
                draggable="true"
                (dragstart)="startDrag(insight.id, $event)"
                (dragend)="endDrag()"
              >
                {{ insight.name }}
              </div>
            }
          </div>

          @if (placedInsights().length > 0) {
            <div class="placed-features">
              <h4>Features placées :</h4>
              @for (insight of placedInsights(); track insight.id) {
                <div class="placed-feature">
                  <span>{{ insight.name }}</span>
                  <button class="reset-button" (click)="resetInsight(insight.id)">
                    ↺ Replacer
                  </button>
                </div>
              }
            </div>
          }
        </div>

        <!-- Graphique -->
        <div class="chart-container">
          <div 
            class="chart"
            (dragover)="allowDrop($event)"
            (drop)="dropInsight($event)"
          >
            <!-- Axes et labels -->
            <div class="y-axis">
              <div class="axis-label y-label">Importance</div>
              <div class="y-scale">
                @for (i of [10,9,8,7,6,5,4,3,2,1]; track i) {
                  <div class="scale-mark">{{ i }}</div>
                }
              </div>
            </div>
            
            <div class="x-axis">
              <div class="x-scale">
                @for (i of [1,2,3,4,5,6,7,8,9,10]; track i) {
                  <div class="scale-mark">{{ i }}</div>
                }
              </div>
              <div class="axis-label x-label">Facilité de mise en place</div>
            </div>

            <!-- Zone de drop -->
            <div class="drop-zone" #dropZone>
              @for (insight of placedInsights(); track insight.id) {
                <div 
                  class="placed-insight"
                  [style.left.%]="getInsightXPosition(insight)"
                  [style.bottom.%]="getInsightYPosition(insight)"
                >
                  <div class="insight-dot">
                    <span class="insight-name">{{ insight.name }}</span>
                    @if (getInsightFeedback(insight); as feedback) {
                      <div class="feedback" [class]="feedback.type">
                        {{ feedback.message }}
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Zones d'aide visuelle -->
              <div class="quadrant top-right">
                <div class="quadrant-label">🔥 Important & Facile</div>
              </div>
              <div class="quadrant top-left">
                <div class="quadrant-label">⚡ Important & Difficile</div>
              </div>
              <div class="quadrant bottom-right">
                <div class="quadrant-label">💡 Pas urgent & Facile</div>
              </div>
              <div class="quadrant bottom-left">
                <div class="quadrant-label">❄️ Pas urgent & Difficile</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Résultats -->
      <div class="results-panel">
        <div class="stats">
          <div class="stat">
            <span class="stat-label">Features placées :</span>
            <span class="stat-value">{{ placedInsights().length }} / {{ insights().length }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Précision moyenne :</span>
            <span class="stat-value">{{ getAverageAccuracy() }}%</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .insights-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .insights-explanation {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
      text-align: center;
    }

    .insights-explanation h3 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }

    .insights-explanation p {
      margin: 0;
      opacity: 0.9;
    }

    .insights-workspace {
      display: grid;
      grid-template-columns: 300px 1fr;
      gap: 2rem;
    }

    .features-panel {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 15px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .features-panel h4 {
      margin: 0;
      font-size: 1.2rem;
      text-align: center;
    }

    .features-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .feature-card {
      background: linear-gradient(45deg, #4ECDC4, #44A08D);
      color: white;
      padding: 1rem;
      border-radius: 10px;
      text-align: center;
      cursor: grab;
      transition: all 0.3s ease;
      font-weight: 500;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .feature-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }

    .feature-card.dragging {
      opacity: 0.5;
      transform: rotate(5deg);
    }

    .placed-features {
      margin-top: 2rem;
    }

    .placed-feature {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(76, 175, 80, 0.3);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      margin-bottom: 0.5rem;
    }

    .reset-button {
      background: #FF9800;
      border: none;
      color: white;
      padding: 0.2rem 0.5rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.8rem;
    }

    .chart-container {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
      position: relative;
    }

    .chart {
      position: relative;
      width: 100%;
      height: 500px;
      display: grid;
      grid-template-areas: 
        "y-axis drop-zone"
        ". x-axis";
      grid-template-columns: 60px 1fr;
      grid-template-rows: 1fr 40px;
      gap: 10px;
    }

    .y-axis {
      grid-area: y-axis;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    .y-label {
      writing-mode: vertical-lr;
      text-orientation: mixed;
      font-weight: bold;
      font-size: 0.9rem;
      margin-bottom: 1rem;
    }

    .y-scale {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      width: 100%;
    }

    .x-axis {
      grid-area: x-axis;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .x-scale {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 0.5rem;
    }

    .x-label {
      font-weight: bold;
      font-size: 0.9rem;
    }

    .scale-mark {
      font-size: 0.8rem;
      opacity: 0.7;
    }

    .drop-zone {
      grid-area: drop-zone;
      position: relative;
      background: rgba(255, 255, 255, 0.05);
      border: 2px dashed rgba(255, 255, 255, 0.3);
      border-radius: 10px;
      height: 400px;
    }

    .quadrant {
      position: absolute;
      width: 50%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0.3;
      pointer-events: none;
    }

    .top-right {
      top: 0;
      right: 0;
      background: rgba(76, 175, 80, 0.1);
    }

    .top-left {
      top: 0;
      left: 0;
      background: rgba(255, 152, 0, 0.1);
    }

    .bottom-right {
      bottom: 0;
      right: 0;
      background: rgba(33, 150, 243, 0.1);
    }

    .bottom-left {
      bottom: 0;
      left: 0;
      background: rgba(158, 158, 158, 0.1);
    }

    .quadrant-label {
      font-size: 0.9rem;
      font-weight: bold;
      text-align: center;
      padding: 0.5rem;
    }

    .placed-insight {
      position: absolute;
      transform: translate(-50%, 50%);
      z-index: 10;
    }

    .insight-dot {
      background: #4ECDC4;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: bold;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      position: relative;
      cursor: pointer;
    }

    .insight-name {
      display: block;
    }

    .feedback {
      position: absolute;
      top: -2rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      padding: 0.3rem 0.8rem;
      border-radius: 15px;
      font-size: 0.7rem;
      white-space: nowrap;
      z-index: 20;
    }

    .feedback.hot {
      background: rgba(76, 175, 80, 0.9);
    }

    .feedback.warm {
      background: rgba(255, 152, 0, 0.9);
    }

    .feedback.cold {
      background: rgba(244, 67, 54, 0.9);
    }

    .results-panel {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
    }

    .stats {
      display: flex;
      justify-content: space-around;
      text-align: center;
    }

    .stat {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: bold;
    }

    @media (max-width: 1200px) {
      .insights-workspace {
        grid-template-columns: 250px 1fr;
      }
    }

    @media (max-width: 968px) {
      .insights-workspace {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
      }

      .chart {
        height: 400px;
      }
    }

    @media (max-width: 768px) {
      .insights-container {
        padding: 1rem;
      }

      .stats {
        flex-direction: column;
        gap: 1rem;
      }
    }
  `],
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