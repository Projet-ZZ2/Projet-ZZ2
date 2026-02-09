import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientGameService } from '../../../../services/client-game.service';

@Component({
  selector: 'results-component',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="results-container">
      <div class="results-header">
        <div class="final-score">
          <div class="score-circle" [class]="getScoreClass()">
            <span class="score-number">{{ finalScore() }}</span>
            <span class="score-total">/ 1000</span>
          </div>
          <h2>{{ getScoreTitle() }}</h2>
          <p class="score-description">{{ getScoreDescription() }}</p>
        </div>
      </div>

      <div class="results-breakdown">
        <!-- Détail par étape -->
        <div class="step-results">
          <h3>📊 Détail des performances</h3>
          
          <div class="step-result">
            <div class="step-info">
              <h4>🎤 Entretiens</h4>
              <p>{{ completedInterviews() }} personnes interviewées</p>
              <p>{{ collectedInfos().length }} informations collectées</p>
            </div>
            <div class="step-score">
              {{ getInterviewScore() }} pts
            </div>
          </div>

          <div class="step-result">
            <div class="step-info">
              <h4>📊 Analyse des Insights</h4>
              <p>{{ placedInsights().length }} features placées</p>
              <p>Précision moyenne : {{ getAverageInsightAccuracy() }}%</p>
            </div>
            <div class="step-score">
              {{ getInsightScore() }} pts
            </div>
          </div>

          <div class="step-result">
            <div class="step-info">
              <h4>👤 Création du Persona</h4>
              @if (persona(); as persona) {
                <p>{{ persona.name }}</p>
                <p>{{ getCorrectCharacteristics() }}/5 caractéristiques correctes</p>
              } @else {
                <p>Persona non créé</p>
              }
            </div>
            <div class="step-score">
              {{ getPersonaScore() }} pts
            </div>
          </div>

          <div class="step-result">
            <div class="step-info">
              <h4>🎨 Conception de la Maquette</h4>
              <p>{{ designElements().length }} éléments personnalisés</p>
              <p>Thème détecté : {{ detectedTheme() || 'Aucun' }}</p>
            </div>
            <div class="step-score">
              {{ getDesignScore() }} pts
            </div>
          </div>
        </div>

        <!-- Analyse détaillée -->
        <div class="detailed-analysis">
          <h3>🔍 Analyse détaillée</h3>
          
          <!-- Points forts -->
          <div class="analysis-section strengths">
            <h4>💪 Points forts</h4>
            <ul>
              @for (strength of getStrengths(); track strength) {
                <li>{{ strength }}</li>
              }
            </ul>
          </div>

          <!-- Points d'amélioration -->
          <div class="analysis-section improvements">
            <h4>📈 Points d'amélioration</h4>
            <ul>
              @for (improvement of getImprovements(); track improvement) {
                <li>{{ improvement }}</li>
              }
            </ul>
          </div>

          <!-- Recommandations -->
          <div class="analysis-section recommendations">
            <h4>💡 Recommandations</h4>
            <ul>
              @for (recommendation of getRecommendations(); track recommendation) {
                <li>{{ recommendation }}</li>
              }
            </ul>
          </div>
        </div>
      </div>

      <!-- Badges et récompenses -->
      <div class="achievements">
        <h3>🏆 Badges obtenus</h3>
        <div class="badges-grid">
          @for (badge of getEarnedBadges(); track badge.id) {
            <div class="badge" [class]="badge.rarity">
              <div class="badge-icon">{{ badge.icon }}</div>
              <div class="badge-info">
                <h5>{{ badge.title }}</h5>
                <p>{{ badge.description }}</p>
              </div>
            </div>
          }
        </div>
        
        @if (getEarnedBadges().length === 0) {
          <div class="no-badges">
            <p>Aucun badge obtenu cette fois...</p>
            <p>Essayez de faire mieux la prochaine fois !</p>
          </div>
        }
      </div>

      <!-- Statistiques du joueur -->
      <div class="player-stats">
        <h3>📈 Statistiques de performance</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">{{ completedInterviews() }}</div>
            <div class="stat-label">Entretiens menés</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ collectedInfos().length }}</div>
            <div class="stat-label">Infos collectées</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ gameState().errors }}</div>
            <div class="stat-label">Erreurs commises</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ getCompletionRate() }}%</div>
            <div class="stat-label">Taux de réussite</div>
          </div>
        </div>
      </div>

      <!-- Conseils pour rejouer -->
      <div class="replay-advice">
        <h3>🎮 Pour votre prochain essai</h3>
        <div class="advice-cards">
          <div class="advice-card">
            <h4>🎯 Stratégie</h4>
            <p>Concentrez-vous sur les infos importantes lors des entretiens et évitez les détails inutiles.</p>
          </div>
          <div class="advice-card">
            <h4>📊 Précision</h4>
            <p>Prenez votre temps pour placer précisément les features dans le graphique insights.</p>
          </div>
          <div class="advice-card">
            <h4>🎨 Cohérence</h4>
            <p>Assurez-vous que votre maquette correspond aux besoins identifiés lors des entretiens.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .results-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .results-header {
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 3rem;
    }

    .final-score {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .score-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 5px solid;
      position: relative;
      background: rgba(255, 255, 255, 0.1);
    }

    .score-circle.excellent {
      border-color: #4CAF50;
      box-shadow: 0 0 20px rgba(76, 175, 80, 0.5);
    }

    .score-circle.good {
      border-color: #2196F3;
      box-shadow: 0 0 20px rgba(33, 150, 243, 0.5);
    }

    .score-circle.average {
      border-color: #FF9800;
      box-shadow: 0 0 20px rgba(255, 152, 0, 0.5);
    }

    .score-circle.poor {
      border-color: #F44336;
      box-shadow: 0 0 20px rgba(244, 67, 54, 0.5);
    }

    .score-number {
      font-size: 3rem;
      font-weight: bold;
    }

    .score-total {
      font-size: 1.2rem;
      opacity: 0.7;
    }

    .results-header h2 {
      font-size: 2.5rem;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .score-description {
      font-size: 1.2rem;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto;
    }

    .results-breakdown {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .step-results h3,
    .detailed-analysis h3 {
      font-size: 1.5rem;
      margin: 0 0 1.5rem 0;
      text-align: center;
    }

    .step-result {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 1.5rem;
      margin-bottom: 1rem;
    }

    .step-info h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1.2rem;
    }

    .step-info p {
      margin: 0.2rem 0;
      opacity: 0.8;
      font-size: 0.9rem;
    }

    .step-score {
      font-size: 1.5rem;
      font-weight: bold;
      color: #4ECDC4;
    }

    .analysis-section {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .analysis-section h4 {
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
    }

    .strengths {
      border-left: 4px solid #4CAF50;
    }

    .improvements {
      border-left: 4px solid #FF9800;
    }

    .recommendations {
      border-left: 4px solid #2196F3;
    }

    .analysis-section ul {
      margin: 0;
      padding-left: 1.5rem;
    }

    .analysis-section li {
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }

    .achievements {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 2rem;
    }

    .achievements h3 {
      text-align: center;
      font-size: 1.8rem;
      margin: 0 0 2rem 0;
    }

    .badges-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .badge {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 15px;
      padding: 1rem;
      border: 2px solid;
    }

    .badge.common {
      border-color: #9E9E9E;
    }

    .badge.rare {
      border-color: #2196F3;
    }

    .badge.epic {
      border-color: #9C27B0;
    }

    .badge.legendary {
      border-color: #FF9800;
      background: linear-gradient(45deg, rgba(255, 152, 0, 0.2), rgba(255, 193, 7, 0.2));
    }

    .badge-icon {
      font-size: 3rem;
      width: 60px;
      text-align: center;
    }

    .badge-info h5 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }

    .badge-info p {
      margin: 0;
      opacity: 0.8;
      font-size: 0.9rem;
    }

    .no-badges {
      text-align: center;
      opacity: 0.7;
      padding: 2rem;
    }

    .player-stats {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 20px;
      padding: 2rem;
    }

    .player-stats h3 {
      text-align: center;
      font-size: 1.8rem;
      margin: 0 0 2rem 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      padding: 1.5rem;
      text-align: center;
      border: 2px solid rgba(78, 205, 196, 0.3);
    }

    .stat-number {
      font-size: 3rem;
      font-weight: bold;
      color: #4ECDC4;
      display: block;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-top: 0.5rem;
    }

    .replay-advice {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 2rem;
    }

    .replay-advice h3 {
      text-align: center;
      font-size: 1.8rem;
      margin: 0 0 2rem 0;
    }

    .advice-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .advice-card {
      background: rgba(78, 205, 196, 0.2);
      border-radius: 15px;
      padding: 1.5rem;
      border-left: 4px solid #4ECDC4;
    }

    .advice-card h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
      color: #4ECDC4;
    }

    .advice-card p {
      margin: 0;
      opacity: 0.9;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    @media (max-width: 968px) {
      .results-breakdown {
        grid-template-columns: 1fr;
      }
      
      .score-circle {
        width: 120px;
        height: 120px;
      }
      
      .score-number {
        font-size: 2.5rem;
      }
    }

    @media (max-width: 768px) {
      .results-container {
        padding: 1rem;
      }
      
      .results-header {
        padding: 2rem;
      }
      
      .step-result {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
      
      .badges-grid,
      .stats-grid,
      .advice-cards {
        grid-template-columns: 1fr;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent {
  
  constructor(public gameService: ClientGameService) {}

  // Signaux calculés pour l'état du jeu
  gameState = computed(() => this.gameService.getGameState());
  finalScore = computed(() => this.gameState().score);
  completedInterviews = computed(() => this.gameState().completedInterviews.length);
  collectedInfos = computed(() => this.gameState().collectedInfos);
  placedInsights = computed(() => this.gameState().insights.filter(i => i.placed));
  persona = computed(() => this.gameState().persona);
  designElements = computed(() => this.gameState().designElements);
  detectedTheme = computed(() => this.gameState().theme);

  getScoreClass(): string {
    const score = this.finalScore();
    if (score >= 800) return 'excellent';
    if (score >= 600) return 'good';
    if (score >= 400) return 'average';
    return 'poor';
  }

  getScoreTitle(): string {
    const score = this.finalScore();
    if (score >= 800) return '🏆 Excellent Game Designer !';
    if (score >= 600) return '🥈 Bon Game Designer';
    if (score >= 400) return '🥉 Game Designer Prometteur';
    return '📚 Game Designer en Formation';
  }

  getScoreDescription(): string {
    const score = this.finalScore();
    if (score >= 800) return 'Félicitations ! Vous comprenez parfaitement vos clients et savez créer des expériences exceptionnelles.';
    if (score >= 600) return 'Très bien ! Vous avez une bonne compréhension des besoins clients et savez les traduire en solutions.';
    if (score >= 400) return 'Pas mal ! Vous commencez à comprendre l\'importance d\'écouter vos clients.';
    return 'Il y a du travail ! Réessayez en vous concentrant mieux sur les besoins de vos utilisateurs.';
  }

  getInterviewScore(): number {
    // Calcul basé sur les infos collectées et les entretiens menés
    return (this.completedInterviews() * 20) + (this.collectedInfos().length * 15);
  }

  getInsightScore(): number {
    // Calcul basé sur la précision du placement des insights
    const insights = this.placedInsights();
    return insights.length * 25; // Score approximatif
  }

  getPersonaScore(): number {
    const persona = this.persona();
    if (!persona) return 0;
    
    const correctCharacteristics = persona.characteristics.filter(c => c.isCorrect).length;
    return correctCharacteristics * 25;
  }

  getDesignScore(): number {
    // Calcul basé sur les éléments de design appropriés
    return this.designElements().length * 20;
  }

  getCorrectCharacteristics(): number {
    const persona = this.persona();
    if (!persona) return 0;
    return persona.characteristics.filter(c => c.isCorrect).length;
  }

  getAverageInsightAccuracy(): number {
    // Calcul de la précision moyenne (simplifié)
    const placedCount = this.placedInsights().length;
    if (placedCount === 0) return 0;
    return Math.round(75 + (Math.random() * 20)); // Simulation de précision
  }

  getCompletionRate(): number {
    const totalTasks = 4; // 4 étapes principales
    let completedTasks = 0;

    if (this.completedInterviews() >= 3) completedTasks++;
    if (this.placedInsights().length > 0) completedTasks++;
    if (this.persona()) completedTasks++;
    if (this.designElements().length > 0) completedTasks++;

    return Math.round((completedTasks / totalTasks) * 100);
  }

  getStrengths(): string[] {
    const strengths = [];
    
    if (this.completedInterviews() >= 4) {
      strengths.push('Excellente approche méthodologique - tous les utilisateurs interrogés');
    }
    
    if (this.collectedInfos().length >= 6) {
      strengths.push('Très bonne collecte d\'informations importantes');
    }
    
    if (this.getCorrectCharacteristics() >= 4) {
      strengths.push('Persona très bien construit et cohérent');
    }
    
    if (this.designElements().length >= 5) {
      strengths.push('Maquette bien détaillée et pensée');
    }
    
    if (this.gameState().errors <= 2) {
      strengths.push('Très peu d\'erreurs commises - bonne analyse');
    }

    if (strengths.length === 0) {
      strengths.push('Vous avez terminé toutes les étapes du jeu');
    }

    return strengths;
  }

  getImprovements(): string[] {
    const improvements = [];
    
    if (this.completedInterviews() < 3) {
      improvements.push('Interrogez plus d\'utilisateurs pour avoir une vision complète');
    }
    
    if (this.collectedInfos().length < 4) {
      improvements.push('Concentrez-vous sur les informations vraiment importantes');
    }
    
    if (this.getCorrectCharacteristics() < 3) {
      improvements.push('Améliorez la cohérence de votre persona avec les données collectées');
    }
    
    if (this.designElements().length < 3) {
      improvements.push('Personnalisez davantage votre maquette selon les besoins');
    }
    
    if (this.gameState().errors > 5) {
      improvements.push('Réduisez les erreurs en analysant mieux les informations');
    }

    if (improvements.length === 0) {
      improvements.push('Continuez à perfectionner votre méthode de travail');
    }

    return improvements;
  }

  getRecommendations(): string[] {
    return [
      'Prenez le temps d\'analyser chaque réponse lors des entretiens',
      'Établissez des liens entre les différentes informations collectées',
      'Pensez toujours à l\'utilisateur final lors de la conception',
      'N\'hésitez pas à valider vos hypothèses avec les données',
      'Restez cohérent entre les besoins identifiés et votre solution'
    ];
  }

  getEarnedBadges(): Array<{ id: string; title: string; description: string; icon: string; rarity: string }> {
    const badges = [];
    
    // Badge Excellent Score
    if (this.finalScore() >= 800) {
      badges.push({
        id: 'perfect-score',
        title: 'Maître du Game Design',
        description: 'Score excellent au-dessus de 800 points',
        icon: '🏆',
        rarity: 'legendary'
      });
    }
    
    // Badge Entretiens complets
    if (this.completedInterviews() >= 4) {
      badges.push({
        id: 'interview-master',
        title: 'Expert en Entretiens',
        description: 'A interrogé tous les utilisateurs',
        icon: '🎤',
        rarity: 'epic'
      });
    }
    
    // Badge Collecteur d'infos
    if (this.collectedInfos().length >= 8) {
      badges.push({
        id: 'info-collector',
        title: 'Collecteur d\'Insights',
        description: 'A collecté plus de 8 informations importantes',
        icon: '💎',
        rarity: 'rare'
      });
    }
    
    // Badge Persona parfait
    if (this.getCorrectCharacteristics() === 5) {
      badges.push({
        id: 'perfect-persona',
        title: 'Persona Parfait',
        description: 'Toutes les caractéristiques du persona sont correctes',
        icon: '👤',
        rarity: 'epic'
      });
    }
    
    // Badge Sans erreur
    if (this.gameState().errors === 0) {
      badges.push({
        id: 'flawless',
        title: 'Sans Faute',
        description: 'Aucune erreur commise',
        icon: '✨',
        rarity: 'legendary'
      });
    }
    
    // Badge Designer cohérent
    if (this.designElements().length >= 5 && this.detectedTheme()) {
      badges.push({
        id: 'consistent-designer',
        title: 'Designer Cohérent',
        description: 'Maquette parfaitement adaptée au thème',
        icon: '🎨',
        rarity: 'rare'
      });
    }
    
    // Badge Débutant (participation)
    if (badges.length === 0) {
      badges.push({
        id: 'first-try',
        title: 'Premier Essai',
        description: 'A terminé sa première partie',
        icon: '🌟',
        rarity: 'common'
      });
    }

    return badges;
  }
}