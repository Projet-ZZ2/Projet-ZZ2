// Vérifier que obj_console existe
if (!instance_exists(obj_console)) {
    exit; // Sortir si pas de console
}

var console = obj_console;

// Déclarer git (sera utilisé dans plusieurs cases)
var git = noone;
if (instance_exists(obj_git)) {
    git = obj_git;
}

switch(step) {
    // ========== ÉTAPE 0 : ÉCRAN NOIR - GIT INIT ==========
    case 0:
        instruction_titre = "TUTORIEL GIT";
        instruction = "Tapez 'init' pour initialiser le dépôt et commencer";
        allowed_commands = ["init"];
        
        // MASQUER obj_git s'il existe déjà
        if (instance_exists(obj_git)) {
            obj_git.visible = false;
        }
        
        if (console.com_init) {
            console.com_init = false;
            step = 1;
        }
        break;
    
    // ========== ÉTAPE 1 : INITIALISATION - CRÉER LE JOUEUR ==========
    case 1:
        // Créer obj_git s'il n'existe pas
        if (!instance_exists(obj_git)) {
            git = instance_create_layer(
                room_width / 2,
                room_height - 150, // Position en bas
                "Instances",
                obj_git
            );
        }
		
		git.image_xscale = 0.2;
		git.image_yscale = 0.2;
    
        
        // Forcer le joueur sur 1 branche au début
        git.nb_branche_uti = 1;
        git.nb_branche_tot = 1;
        git.position_actuelle = 0;
        git.espacement = room_width / git.nb_branche_uti;
        git.x = git.espacement * git.position_actuelle + git.espacement / 2;
        
        step = 2;
        break;
    
    // ========== ÉTAPE 2 : CRÉER PREMIÈRE COMÈTE ==========
    case 2:
        instruction = "Une comète approche ! Préparez-vous...";
        allowed_commands = [];
        
        // Créer comète qui descend (seulement si elle n'existe pas déjà)
        if (instance_exists(obj_git) && !instance_exists(comete_tutorial)) {
            comete_tutorial = instance_create_layer(
                obj_git.x,
                50,
                "Instances",
                obj_comete
            );
        }
        step = 3;
        break;
    
    // ========== ÉTAPE 3 : ATTENDRE DESCENTE COMÈTE ==========
   case 3:
    if (instance_exists(comete_tutorial) && comete_tutorial.y >= 250) {
        comete_tutorial.en_pause = true; // Utiliser en_pause au lieu de speed
        step = 4;
    }
    break;
    
    // ========== ÉTAPE 4 : EXPLIQUER ADD ==========
    case 4:
        instruction_titre = "GIT ADD";
        instruction = "Tapez 'add' pour charger une munition";
        allowed_commands = ["add"];
        peut_push = false;
        
        if (instance_exists(obj_bullet)) {
            // La munition est créée automatiquement par obj_git
            step = 5;
        }
        break;
    
    // ========== ÉTAPE 5 : EXPLIQUER COMMIT ==========
	case 5:
	    instruction_titre = "GIT COMMIT";
	    instruction = "Tapez 'commit' pour enregistrer la munition\n(elle change de couleur)";
	    allowed_commands = ["commit"];
    
	    // Vérifier si une munition existe et est committed
	    if (instance_exists(obj_bullet)) {
	        with (obj_bullet) {
	            if (munition_commit) {
	                other.delai_commit++;
	            }
	        }
	    }
    
	    // Attendre 2 frames pour être sûr que la couleur a changé
	    if (delai_commit >= 2 && !commande_commit_faite) {
	        commande_commit_faite = true;
	        delai_commit = 0;
	        step = 6;
	    }
	    break;
    // ========== ÉTAPE 6 : EXPLIQUER PUSH ==========
	case 6:
	    instruction_titre = "GIT PUSH";
	    instruction = "Tapez 'push' pour lancer la munition et détruire la comète !";
	    allowed_commands = ["push"];
	    peut_push = true; // Autoriser le tir
    
	    // Vérifier si le joueur a tiré (munition lancée)
	    var tir_effectue = false;
	    if (instance_exists(obj_bullet)) {
	        with (obj_bullet) {
	            if (munition_lancee) tir_effectue = true;
	        }
	    }
    
	    // Relancer la comète SEULEMENT après le premier tir
	    if (tir_effectue && instance_exists(comete_tutorial) && comete_tutorial.en_pause) {
	        comete_tutorial.en_pause = false;
	    }
    
	    // Vérifier si la comète est détruite
	    if (!instance_exists(comete_tutorial)) {
	        step = 8;
	    }
	    break;
    
    // ========== ÉTAPE 8 : CRÉER 2E COMÈTE QUI DESCEND ==========
case 8:
    instruction = "Une nouvelle comète arrive sur une autre trajectoire !";
    allowed_commands = [];
    
    // Créer comète sur branche 1 (à droite) si elle n'existe pas
    if (instance_exists(obj_git) && !instance_exists(comete_tutorial)) {
        // Calculer position de la branche 1 (en supposant qu'on a encore 1 branche)
        var espacement_local = room_width / obj_git.nb_branche_uti;
        var pos_branche_1 = espacement_local * 1 + espacement_local / 2;
        
        // Mais on veut qu'elle arrive COMME SI il y avait 2 branches
        // Donc position à droite
        pos_branche_1 = room_width * 0.75; // Position à 3/4 de l'écran
        
        comete_tutorial = instance_create_layer(
            pos_branche_1,
            50,
            "Instances",
            obj_comete
        );
        comete_tutorial.en_pause = false; // Elle descend
    }
    step = 9;
    break;

// ========== ÉTAPE 9 : ATTENDRE DESCENTE 2E COMÈTE ==========
case 9:
    instruction = "Attention, elle arrive !";
    allowed_commands = [];
    
    if (instance_exists(comete_tutorial) && comete_tutorial.y >= 250) {
        comete_tutorial.en_pause = true; // ARRÊT !
        step = 10;
    }
    break;

// ========== ÉTAPE 10 : EXPLIQUER BRANCH ==========
case 10:
    instruction_titre = "GIT BRANCH";
    instruction = "Cette comète est sur une autre trajectoire !\nTapez 'branch' pour créer une deuxième branche";
    allowed_commands = ["branch"];
    peut_push = false;
    
    if (obj_git.nb_branche_uti >= 2) {
        // Le système passe automatiquement à 2 branches via obj_git
        step = 11;
    }
    break;

// ========== ÉTAPE 11 : EXPLIQUER CHECKOUT ==========
case 11:
    instruction_titre = "GIT CHECKOUT";
    instruction = "Tapez 'checkout 1' pour vous déplacer sur la branche 1";
    allowed_commands = ["checkout"];
    
    if (obj_git.position_actuelle == 1) {
        step = 12;
    }
    break;
    
    // ========== ÉTAPE 12 : CYCLE ADD/COMMIT/PUSH ==========
    case 12:
        instruction = "Maintenant, détruisez cette comète !\nadd → commit → push";
        allowed_commands = ["add", "commit", "push"];
        peut_push = true;
        
        // Relancer la comète si elle est encore arrêtée
        if (instance_exists(comete_tutorial) && comete_tutorial.speed == 0) {
            comete_tutorial.speed = 1;
        }
        
        if (!instance_exists(comete_tutorial)) {
            step = 13;
        }
        break;
    
    // ========== ÉTAPE 13 : EXPLIQUER MERGE ==========
    case 13:
        instruction_titre = "GIT MERGE";
        instruction = "Tapez 'merge' pour fusionner et revenir à une branche";
        allowed_commands = ["merge"];
        
        if (obj_git.nb_branche_uti == 1) {
            step = 14;
        }
        break;
    
    // ========== ÉTAPE 14 : EXPLIQUER PULL ET FIN ==========
    case 14:
        instruction_titre = "TUTORIEL TERMINÉ !";
        instruction = "Vous connaissez maintenant les commandes Git de base !\n\nPassage au jeu dans 3 secondes...";
        allowed_commands = [];
        
        // Attendre 3 secondes puis passer au jeu
        alarm[0] = 180; // 3 secondes à 60 fps
        step = 15;
        break;
    
    // ========== ÉTAPE 15 : ATTENDRE FIN ==========
    case 15:
        instruction = "Chargement du jeu...";
        allowed_commands = [];
        // Rien à faire, on attend l'alarm
        break;
}