export interface Rule {
    id: number;
    name: string;
    description: string;
    status?: 'success' | 'failed' | 'pending' | 'locked';
    validator: (code: string) => boolean; // Fonction de validation optionnelle
    indice: string; // Indice pour aider le joueur
}

export interface RuleCategory {
    category: string;
    rules: Rule[];
}