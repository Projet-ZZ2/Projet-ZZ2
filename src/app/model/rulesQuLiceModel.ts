export interface Rule {
    id: number;
    name: string;
    description: string;
    status?: 'success' | 'failed' | 'pending' | 'locked';
    validator: (code: string) => boolean;
    indice: string;
}

// Variable globale accessible par tous les validateurs
export let globalExpectedCode = "";

export class RuleCategory {
    category: string;
    rules: Rule[];

    constructor(category: string, rules: Rule[]) {
        this.category = category;
        this.rules = rules;
        // On lance le chargement dès la création de la catégorie
        this.loadExpectedCode();
    }

    loadExpectedCode() {
        // Ajout d'un cache: 'no-cache' pour être sûr de charger la dernière version du txt
        fetch('/assets/qulicegame/code_attendu.txt', { cache: "no-cache" })
            .then(response => {
                if (!response.ok) throw new Error("Fichier introuvable à l'adresse assets/qulicegame/code_attendu.txt");
                return response.text();
            })
            .then(data => {
                // MODIFICATION ICI : On nettoie les caractères invisibles de début de fichier (BOM)
                globalExpectedCode = data.replace(/^\uFEFF/, ''); 
                console.log("Fichier de référence chargé et nettoyé !");
            })
            .catch(err => {
                console.error("Erreur de chargement du code attendu :", err);
            });
    }
}