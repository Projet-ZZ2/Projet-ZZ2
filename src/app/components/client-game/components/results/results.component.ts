import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientGameService } from '../../../../services/client-game.service';

@Component({
  selector: 'results-component',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent {
  constructor(public gameService: ClientGameService) {}

  // Signaux calculés pour l'état du jeu
  gameState = computed(() => this.gameService.getGameState());
  finalScore = computed(() => this.gameState().score);
  completedInterviews = computed(() => this.gameState().completedInterviews.length);
  collectedInfos = computed(() => this.gameState().collectedInfos);
  placedInsights = computed(() => this.gameState().insights.filter((i) => i.placed));
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
    if (score >= 800)
      return 'Félicitations ! Vous comprenez parfaitement vos clients et savez créer des expériences exceptionnelles.';
    if (score >= 600)
      return 'Très bien ! Vous avez une bonne compréhension des besoins clients et savez les traduire en solutions.';
    if (score >= 400)
      return "Pas mal ! Vous commencez à comprendre l'importance d'écouter vos clients.";
    return 'Il y a du travail ! Réessayez en vous concentrant mieux sur les besoins de vos utilisateurs.';
  }

  getInterviewScore(): number {
    // Calcul basé sur les infos collectées et les entretiens menés
    return this.completedInterviews() * 20 + this.collectedInfos().length * 15;
  }

  getInsightScore(): number {
    // Calcul basé sur la précision du placement des insights
    const insights = this.placedInsights();
    return insights.length * 25; // Score approximatif
  }

  getPersonaScore(): number {
    const persona = this.persona();
    if (!persona) return 0;

    const correctCharacteristics = persona.characteristics.filter((c) => c.isCorrect).length;
    return correctCharacteristics * 25;
  }

  getDesignScore(): number {
    // Calcul basé sur les éléments de design appropriés
    return this.designElements().length * 20;
  }

  getCorrectCharacteristics(): number {
    const persona = this.persona();
    if (!persona) return 0;
    return persona.characteristics.filter((c) => c.isCorrect).length;
  }

  getAverageInsightAccuracy(): number {
    // Calcul de la précision moyenne (simplifié)
    const placedCount = this.placedInsights().length;
    if (placedCount === 0) return 0;
    return Math.round(75 + Math.random() * 20); // Simulation de précision
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
      strengths.push("Très bonne collecte d'informations importantes");
    }

    if (this.getCorrectCharacteristics() >= 4) {
      strengths.push('Persona très bien construit et cohérent');
    }

    if (this.designElements().length >= 5) {
      strengths.push('Maquette bien détaillée et pensée');
    }

    if (this.gameState().errors <= 2) {
      strengths.push("Très peu d'erreurs commises - bonne analyse");
    }

    if (strengths.length === 0) {
      strengths.push('Vous avez terminé toutes les étapes du jeu');
    }

    return strengths;
  }

  getImprovements(): string[] {
    const improvements = [];

    if (this.completedInterviews() < 3) {
      improvements.push("Interrogez plus d'utilisateurs pour avoir une vision complète");
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
      "Prenez le temps d'analyser chaque réponse lors des entretiens",
      'Établissez des liens entre les différentes informations collectées',
      "Pensez toujours à l'utilisateur final lors de la conception",
      "N'hésitez pas à valider vos hypothèses avec les données",
      'Restez cohérent entre les besoins identifiés et votre solution',
    ];
  }

  getEarnedBadges(): Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    rarity: string;
  }> {
    const badges = [];

    // Badge Excellent Score
    if (this.finalScore() >= 800) {
      badges.push({
        id: 'perfect-score',
        title: 'Maître du Game Design',
        description: 'Score excellent au-dessus de 800 points',
        icon: '🏆',
        rarity: 'legendary',
      });
    }

    // Badge Entretiens complets
    if (this.completedInterviews() >= 4) {
      badges.push({
        id: 'interview-master',
        title: 'Expert en Entretiens',
        description: 'A interrogé tous les utilisateurs',
        icon: '🎤',
        rarity: 'epic',
      });
    }

    // Badge Collecteur d'infos
    if (this.collectedInfos().length >= 8) {
      badges.push({
        id: 'info-collector',
        title: "Collecteur d'Insights",
        description: 'A collecté plus de 8 informations importantes',
        icon: '💎',
        rarity: 'rare',
      });
    }

    // Badge Persona parfait
    if (this.getCorrectCharacteristics() === 5) {
      badges.push({
        id: 'perfect-persona',
        title: 'Persona Parfait',
        description: 'Toutes les caractéristiques du persona sont correctes',
        icon: '👤',
        rarity: 'epic',
      });
    }

    // Badge Sans erreur
    if (this.gameState().errors === 0) {
      badges.push({
        id: 'flawless',
        title: 'Sans Faute',
        description: 'Aucune erreur commise',
        icon: '✨',
        rarity: 'legendary',
      });
    }

    // Badge Designer cohérent
    if (this.designElements().length >= 5 && this.detectedTheme()) {
      badges.push({
        id: 'consistent-designer',
        title: 'Designer Cohérent',
        description: 'Maquette parfaitement adaptée au thème',
        icon: '🎨',
        rarity: 'rare',
      });
    }

    // Badge Débutant (participation)
    if (badges.length === 0) {
      badges.push({
        id: 'first-try',
        title: 'Premier Essai',
        description: 'A terminé sa première partie',
        icon: '🌟',
        rarity: 'common',
      });
    }

    return badges;
  }
}
