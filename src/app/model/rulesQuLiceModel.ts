export interface Rule {
    id: number;
    name: string;
    description: string;
}

export interface RuleCategory {
    category: string;
    rules: Rule[];
}