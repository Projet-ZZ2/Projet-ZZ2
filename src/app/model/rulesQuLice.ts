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
        },
        indice: 'Indice : Le champ "m" est trop vague. Trouve un nom plus explicite pour ce champ de type string.'
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
        },
        indice: 'Indice : Le nom de la classe doit commencer par une majuscule et ne pas contenir de caractères spéciaux ou d\'espaces.'
    },
    {
        id: 3,
        name: 'CamelCase pour les méthodes',
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
        },
        indice: 'Indice : Les méthodes doivent commencer par une minuscule et les mots suivants doivent être collés avec une majuscule au début de chacun.'
    },
    {
        id: 4,
        name: 'Longueur maximale de ligne',
        description: 'Les lignes de code ne doivent pas dépasser 120 caractères pour améliorer la lisibilité.',
        status: 'locked',
        validator: (code) => code.split('\n').every(line => line.length <= 120),
        indice: 'Indice : Si une ligne de code est trop longue, essaie de la diviser en plusieurs lignes plus courtes pour améliorer la lisibilité.'
    },
    {
        id: 5,
        name: 'Indentations cohérentes',
        description: 'Le style de code doit être cohérent : utilisez des paliers de 4 espaces (4, 8, 12...).',
        status: 'locked',
        validator: (code) => {
            if (code.includes('\t')) return false;

            const lines = code.split('\n');
            
            return lines.every(line => {
                const trimmed = line.trim();
                if (trimmed.length === 0) return true; // On ignore les lignes vides

                // On compte le nombre d'espaces avant le premier caractère
                const spaceCount = line.search(/\S/); 

                // La règle : le nombre d'espaces doit être un multiple de 4 (0, 4, 8, 12...)
                // ET la ligne ne doit pas commencer par un espace si elle est au niveau 0 (sauf la classe)
                return spaceCount % 4 === 0;
            });
        },
        indice: 'Indice : Assure-toi que chaque niveau d\'indentation utilise un nombre d\'espaces qui est un multiple de 4, et évite les tabulations.'
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
        },
        indice: 'Indice : Assure-toi que les accolades ouvrantes sont seules sur leur ligne, sans autre code ou texte avant elles.'
    },
    {
        id: 7,
        name: 'Commentaires clairs',
        description: 'Il doit y avoir des commentaires clairs et concis pour expliquer les parties complexes du code. On peut écrire un commentaire avec //.',
        status: 'locked',
        validator: (code) => code.includes('//') && code.split('//')[1].trim().length > 5,
        indice: 'Indice : Ajoute des commentaires avec // pour expliquer les parties complexes de ton code. Assure-toi que tes commentaires sont clairs et contiennent plus de 5 caractères.'
    }
];

