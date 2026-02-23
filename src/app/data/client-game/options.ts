import { Option } from '../../model/client-game.model';

export const personaOptionsData: Record<string, Option[]> = {
  age: [
    { value: 'young', label: 'Jeune (18-30)', carcType: 'age', caracValue: '🎂 Âge' },
    { value: 'adult', label: 'Adulte (30-50)', carcType: 'age', caracValue: '🎂 Âge' },
    { value: 'senior', label: 'Senior (50+)', carcType: 'age', caracValue: '🎂 Âge' },
    { value: 'child', label: 'Enfant (8-17)', carcType: 'age', caracValue: '🎂 Âge' },
  ],
  profession: [
    { value: 'student', label: 'Étudiant', carcType: 'profession', caracValue: '💼 Profession' },
    {
      value: 'developer',
      label: 'Développeur',
      carcType: 'profession',
      caracValue: '💼 Profession',
    },
    { value: 'designer', label: 'Designer', carcType: 'profession', caracValue: '💼 Profession' },
    { value: 'retiree', label: 'Retraité', carcType: 'profession', caracValue: '💼 Profession' },
    { value: 'manager', label: 'Manager', carcType: 'profession', caracValue: '💼 Profession' },
    { value: 'other', label: 'Autre', carcType: 'profession', caracValue: '💼 Profession' },
  ],
  needs: [
    {
      value: 'simplicity',
      label: 'Simplicité',
      carcType: 'needs',
      caracValue: '⭐ Besoins principaux',
    },
    {
      value: 'performance',
      label: 'Performance',
      carcType: 'needs',
      caracValue: '⭐ Besoins principaux',
    },
    {
      value: 'accessibility',
      label: 'Accessibilité',
      carcType: 'needs',
      caracValue: '⭐ Besoins principaux',
    },
    { value: 'fun', label: 'Amusement', carcType: 'needs', caracValue: '⭐ Besoins principaux' },
    {
      value: 'efficiency',
      label: 'Efficacité',
      carcType: 'needs',
      caracValue: '⭐ Besoins principaux',
    },
  ],
  frustrations: [
    {
      value: 'complexity',
      label: 'Complexité',
      carcType: 'frustrations',
      caracValue: '😤 Frustrations',
    },
    {
      value: 'slowness',
      label: 'Lenteur',
      carcType: 'frustrations',
      caracValue: '😤 Frustrations',
    },
    {
      value: 'small-text',
      label: 'Texte trop petit',
      carcType: 'frustrations',
      caracValue: '😤 Frustrations',
    },
    {
      value: 'confusion',
      label: 'Interface confuse',
      carcType: 'frustrations',
      caracValue: '😤 Frustrations',
    },
    {
      value: 'technical',
      label: 'Trop technique',
      carcType: 'frustrations',
      caracValue: '😤 Frustrations',
    },
  ],
  goals: [
    { value: 'quick-task', label: 'Tâche rapide', carcType: 'goals', caracValue: '🎯 Objectifs' },
    { value: 'learning', label: 'Apprendre', carcType: 'goals', caracValue: '🎯 Objectifs' },
    { value: 'entertainment', label: 'Se divertir', carcType: 'goals', caracValue: '🎯 Objectifs' },
    {
      value: 'productivity',
      label: 'Être productif',
      carcType: 'goals',
      caracValue: '🎯 Objectifs',
    },
    { value: 'social', label: 'Se connecter', carcType: 'goals', caracValue: '🎯 Objectifs' },
  ],
};
