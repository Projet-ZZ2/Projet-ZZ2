step = 0;
instruction = "";
instruction_titre = ""; // Pour un titre optionnel
allowed_commands = [];

// Références aux objets du tutoriel
comete_tutorial = noone;
bullet_tutorial = noone;

// Flags de contrôle
peut_push = false; // Contrôler quand on peut tirer
attente_destruction = false;

// Pour gérer les branches
branche_initiale = 1; // Commencer avec 1 branche


//Commit
delai_commit = 0;
commande_commit_faite = false;
