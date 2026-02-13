import { Rule,RuleCategory } from './rulesQuLiceModel';
import { globalExpectedCode } from './rulesQuLiceModel';

export let expectedCodeReference: string = "";

export const setExpectedCode = (content: string) => {
    expectedCodeReference = content;
};

export const VALIDATION_RULES: Rule[] = [
    {
        id: 1,
        name: 'Champ à clarifier',
        description: 'Le champ "m" doit être renommé en "motDePasse" pour être plus explicite.',
        status: 'pending',
        validator: (code) => {
            // 1. On vérifie que l'ancien champ "string m;" a bien disparu
            // La regex \bm\b assure qu'on ne cible pas le "m" au milieu d'un autre mot
            const hasOldM = /string\s+\bm\b\s*;/.test(code);

            // 2. On vérifie que le nouveau champ "private string motDePasse;" est présent
            // On autorise un nombre d'espaces variable mais on impose le nom exact
            const hasMotDePasse = /private\s+string\s+motDePasse\s*;/.test(code);

            // La règle est valide si "m" est parti ET "motDePasse" est arrivé
            return !hasOldM && hasMotDePasse;
        },
        indice: 'Indice : Le champ "m" est trop vague. Remplace-le par "private string motDePasse;" pour respecter les consignes.'
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
        description: 'Les lignes de code ne doivent pas dépasser 120 caractères. Coupez la ligne précisément après le mot "affiché".',
        status: 'locked',
        validator: (code: string) => {
            const lines = code.split('\n');

            // 1. Vérifie la longueur maximale
            const lengthOk = lines.every(line => line.length <= 120);

            // 2. Vérifie la coupure
            const hasCorrectSplit = lines.some((line, index) => {
                const trimmedLine = line.trim();
                
                // On cherche si "affiché" est le dernier mot de la ligne (avant d'éventuels guillemets)
                const endsWithAffiche = /affiché\s*"?\s*$/.test(trimmedLine);
                
                // On vérifie si la ligne suivante commence par "à l'écran"
                const nextLineStartsCorrectly = lines[index + 1] && 
                                                lines[index + 1].trim().replace(/^"/, '').trim().startsWith("à l'écran");

                return endsWithAffiche && nextLineStartsCorrectly;
            });

            return lengthOk && hasCorrectSplit;
        },
        indice: 'Indice : Coupe ta ligne de texte juste après le mot "affiché" pour qu\'elle ne soit pas trop longue.'
    },
    {
        id: 5,
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
        id: 6,
        name: 'Commentaires clairs',
        description: 'Il doit y avoir des commentaires clairs et concis pour expliquer les parties complexes du code. On demande d\'écrire \"// commentaire\" avant le bloc afficher.',
        status: 'locked',
        validator: (code) => code.includes('//') && code.split('//')[1].trim().length > 5,
        indice: 'Indice : Ajoute des commentaires avec // pour expliquer les parties complexes de ton code. Assure-toi que tes commentaires sont clairs et contiennent plus de 5 caractères.'
    },
    {
        id: 7,
        name: 'Espace après les structures de contrôle',
        description: 'Il doit y avoir un espace après le mot-clé "if" pour une meilleure lisibilité.',
        status: 'locked',
        validator: (code: string) => {
            // 1. On vérifie d'abord s'il y a des "if" dans le code
            const hasIf = /\bif\b/.test(code);
            if (!hasIf) return true; // S'il n'y a pas de if, la règle est considérée valide

            // 2. On cherche des "if" suivis directement d'une parenthèse sans espace
            // Exemple : if(condition) est invalide
            const invalidIf = /\bif\(/.test(code);

            return !invalidIf;
        },
        indice: 'Indice : Vérifie tes structures "if". Il manque un petit espace entre le mot "if" et la parenthèse ouvrante "(".'
    },
    {
        id: 8,
        name: 'Blocs logiques aérés',
        description: 'Séparez vos méthodes et vos déclarations de champs par exactement une ligne vide.',
        status: 'locked',
        validator: (code: string) => {
            const lines = code.split('\n');
            
            for (let i = 0; i < lines.length - 1; i++) {
                const current = lines[i].trim();
                const next = lines[i + 1].trim();

                // Détection d'une accolade fermante de bloc (méthode ou classe)
                // Si la ligne actuelle finit une méthode "}" et que la suivante n'est pas vide
                // et n'est pas une autre accolade fermante (fin de classe).
                if (current === '}' && next !== '' && next !== '}') {
                    return false; 
                }

                // Détection entre les champs (ex: string m;) et le début d'une méthode
                // Si la ligne actuelle est une instruction (finit par ;) 
                // et que la suivante commence une méthode ou une classe sans espace.
                if (current.endsWith(';') && (next.includes('public') || next.includes('private') || next.includes('void')) && next !== '') {
                    // On vérifie si la ligne suivante contient une déclaration de bloc
                    if (next.includes('{') || lines[i+2]?.includes('{')) {
                        return false;
                    }
                }
            }
            return true;
        },
        indice: 'Indice : Ton code est trop compact. Ajoute une ligne vide après chaque fermeture d\'accolade "}" et entre tes variables et tes méthodes.'
    },
    {
        id: 9,
        name: 'Structure attendue',
        description: 'Le code doit respecter exactement la structure de la classe Ordinateur définie.',
        status: 'locked',
        validator: (code: string): boolean => {
            const reference = globalExpectedCode || "";
            const userCode = code || "";

            if (!userCode || !reference) return false;

            // Fonction pour normaliser SANS supprimer l'indentation de début
            const normalizeWithIndentation = (str: string) => {
                return str
                    .replace(/\r\n/g, '\n')      // Harmonise les retours à la ligne (Windows/Linux)
                    .split('\n')                 // Découpe par ligne
                    .map(line => line.trimEnd()) // Garde l'espace au début, enlève celui à la fin
                    .filter(line => line.length > 0) // Enlève les lignes totalement vides
                    .join('\n');
            };

            const userClean = normalizeWithIndentation(userCode);
            const refClean = normalizeWithIndentation(reference);

            if (userClean !== refClean) {
                // --- DEBUG POUR TROUVER LA LIGNE FAUSSE ---
                const userLines = userClean.split('\n');
                const refLines = refClean.split('\n');

                for (let i = 0; i < Math.max(userLines.length, refLines.length); i++) {
                    if (userLines[i] !== refLines[i]) {
                        
                        break; // On s'arrête à la première erreur trouvée
                    }
                }
                return false;
            }

            return true;
        },
        indice: 'Indice : Ton code doit correspondre exactement au fichier de référence. Vérifie les noms de variables et la ponctuation.'
    }
];

export const ruleCategoryInstance = new RuleCategory("Programmation", VALIDATION_RULES);