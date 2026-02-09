import { Rule } from './rulesQuLiceModel';

export const VALIDATION_RULES: Rule[] = [
    {
        id: 1,
        name: 'Champ à clarifier',
        description: 'Un champ doit être clarifié pour éviter les ambiguïtés.',
        status: 'pending',
        validator: (code) => {
        // Vérifie que "string m;" n'existe plus
        const hasM = /string\s+m\s*;/.test(code);
        // Vérifie qu'il y a bien une string déclarée (pour éviter qu'il l'efface juste)
        const hasString = /private\s+string\s+[a-zA-Z]{2,}\s*;/.test(code);
        return !hasM && hasString;
    }
    },
    {
        id: 2,
        name: 'PascalCase pour la classe',
        description: 'Les noms de classes doivent être en PascalCase, c\'est à dire avec une majuscule au début de chaque mot du texte concaténé.',
        status: 'locked',
        validator: (code) => {
            const classMatch = code.match(/class\s+([a-zA-Z0-9_]+)/);
            if (!classMatch) return false;
            const className = classMatch[1];
            return /^[A-Z][a-zA-Z0-9]*$/.test(className);
        }
    },
    {
        id: 3,
        name: 'CamleCase pour les méthodes',
        description: 'Les noms de méthodes doivent être en camelCase, c\'est à dire en minuscule au début puis avec des majuscules en début de chaque mot du texte concaténé.',
        status: 'locked',
        validator: (code) => {
            // Trouve les noms de méthodes (mot suivi de parenthèses)
            const methods = code.match(/(?<=void|any|string|number|boolean)\s+([a-zA-Z0-9_]+)\s*\(/g);
            if (!methods) return true; // Pas de méthodes = pas d'erreur
            return methods.every(m => {
                const name = m.trim().split('(')[0];
                return /^[a-z][a-zA-Z0-9]*$/.test(name);
            });
        }
    },
    {
        id: 4,
        name: 'Longueur maximale de ligne',
        description: 'Les lignes de code ne doivent pas dépasser 120 caractères pour améliorer la lisibilité.',
        status: 'locked',
        validator: (code) => code.split('\n').every(line => line.length <= 120)
    },
    {
        id: 5,
        name: 'Indentations cohérentes',
        description: 'Le style de code doit être cohérent avec les conventions de l\'équipe, comme l\'utilisation de l\'indentation et des espaces.',
        status: 'locked',
        validator: (code) => !code.includes('\t') && /^\s*/m.test(code)
    },
    {
        id: 6,
        name: 'Style AllMan',
        description: 'Le style de code doit suivre le style AllMan pour les accolades, c\'est-à-dire que les accolades ouvrantes doivent être sur une nouvelle ligne.',
        status: 'locked',
        validator: (code: string) => {
        const lines = code.split('\n');
        
        // On cherche toutes les lignes qui contiennent "{"
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.includes('{')) {
                // Règle Allman : La ligne ne doit contenir QUE des espaces et l'accolade.
                // Si la ligne contient autre chose avant l'accolade (comme une parenthèse ou un nom), c'est faux.
                const trimmedBefore = line.split('{')[0].trim();
                
                if (trimmedBefore !== "") {
                    return false; // Il y a du texte avant l'accolade sur la même ligne
                }
            }
        }
        // On vérifie aussi qu'il y a bien des accolades dans le code
        return code.includes('{');
    }
    },
    {
        id: 7,
        name: 'Commentaires clairs',
        description: 'Il doit y avoir des commentaires clairs et concis pour expliquer les parties complexes du code. On peut écrire un commentaire avec //.',
        status: 'locked',
        validator: (code) => code.includes('//') && code.split('//')[1].trim().length > 5
    }
];

