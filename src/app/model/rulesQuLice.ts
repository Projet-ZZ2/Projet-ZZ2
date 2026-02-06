import { Rule } from './rulesQuLiceModel';

export const VALIDATION_RULES: Rule[] = [
    {
        id: 1,
        name: 'Champ à clarifier',
        description: 'Un champ doit être clarifié pour éviter les ambiguïtés.',
    },
    {
        id: 2,
        name: 'PascalCase pour la classe',
        description: 'Les noms de classes doivent être en PascalCase.',
    },
    {
        id: 3,
        name: 'CamleCase pour les méthodes',
        description: 'Les noms de méthodes doivent être en camelCase.',
    },
    {
        id: 4,
        name: 'Longueur maximale de ligne',
        description: 'Les lignes de code ne doivent pas dépasser 120 caractères pour améliorer la lisibilité.',
    },
    {
        id: 5,
        name: 'Indentations cohérentes',
        description: 'Le style de code doit être cohérent avec les conventions de l\'équipe, comme l\'utilisation de l\'indentation et des espaces.',
    },
    {
        id: 6,
        name: 'Style AllMan',
        description: 'Le style de code doit suivre le style AllMan pour les accolades, c\'est-à-dire que les accolades ouvrantes doivent être sur une nouvelle ligne.',
    },
    {
        id: 7,
        name: 'Commntaires clairs',
        description: 'Il doit y avoir des commentaires clairs et concis pour expliquer les parties complexes du code.',
    }
];