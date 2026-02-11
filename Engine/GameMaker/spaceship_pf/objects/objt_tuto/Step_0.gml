var console = obj_console;
if (instance_exists(obj_git)) {
    git = obj_git;
}

switch(step) {
	
	// ========== ÉTAPE 0 : ACCUEIL ==========
	case 0:
		titre_etape = "TUTORIEL GIT";
		explication_git = "Bienvenue dans le tutoriel"
		instruction_jeu = "Vous allez decouvrir les commandes git necessaire au jeu";
		alarm[0] = 180;
		step = 0.5;
		break;
	
	//Etape intermediare pour l'alarme
	case 0.5:
		break;
		
    // ========== ÉTAPE 1 : GIT INIT ==========
    case 1:
        titre_etape = "GIT INIT";
		explication_git = "Cette commande permet d'initialiser un nouveau depot git";
        instruction_jeu = "Tapez 'init' pour initialiser et renitialiser le jeu";
        allowed_commands = ["init"];
        
        if (instance_exists(obj_git)) obj_git.visible = false;
        
        if (console.com_init) {
            console.com_init = false;
            step = 2;
        }
        break;
    
    // ========== ÉTAPE 2 : GIT INIT ==========
    case 2:
        // Créer obj_git s'il n'existe pas
        if (!instance_exists(obj_git))
            git = instance_create_layer(room_width / 2, room_height - 150, "Instances", obj_git);
		
		git.image_xscale = 0.2;
		git.image_yscale = 0.2;
        git.nb_branche_uti = 1;
        git.nb_branche_tot = 1;
        git.position_actuelle = 0;
        git.espacement = room_width / git.nb_branche_uti;
        git.x = git.espacement * git.position_actuelle + git.espacement / 2;
    
        step = 3;
        break;
    
    // ========== ÉTAPE 3 :PREMIÈRE COMÈTE ==========
    case 3:
		titre_etape = "";
		explication_git = "Attention !!";
        instruction_jeu = "Une comète approche ...";
        allowed_commands = [];
        
        // Créer comète qui descend
        if (instance_exists(obj_git) && !instance_exists(comete_tutorial))
            comete_tutorial = instance_create_layer( obj_git.x, 50, "Instances", obj_comete);
		
		comete_tutorial.speed = 1.5;
		if (instance_exists(comete_tutorial) && comete_tutorial.y >= 250) {
			comete_tutorial.en_pause = true; // Utiliser en_pause au lieu de speed
			step = 4;
		}
        break;
    
    // ========== ÉTAPE 4 : GIT ADD ==========
    case 4:
        titre_etape = "GIT ADD";
		explication_git = "Cette commande permet de mettre en staging les modifications de fichiers";
        instruction_jeu = "Tapez 'add' pour charger une munition";
        allowed_commands = ["add"];
        peut_push = false;
        
        if (instance_exists(obj_bullet)) step = 5;
        break;
    
    // ========== ÉTAPE 5 : GIT COMMIT ==========
	case 5:
	    titre_etape = "GIT COMMIT";
		explication_git = "Cette commande permet de creer un message de validation pour les modifications et les integrant à l’historique";
	    instruction_jeu = "Tapez 'commit' pour préparer la munition";
	    allowed_commands = ["commit"];
    
	    // Vérifier si une munition commiter
	    if (instance_exists(obj_bullet)) {
			if (obj_bullet.munition_commit) delai_commit++;
	    }
    
	    // Attendre 2 frames pour être sûr que la couleur a changé
	    if (delai_commit >= 2 && !commande_commit_faite) {
	        commande_commit_faite = true;
	        delai_commit = 0;
	        step = 6;
	    }
	    break;
		
    // ========== ÉTAPE 6 : GIT PUSH ==========
	case 6:
	    titre_etape = "GIT PUSH";
		explication_git = "Cette commande envoie les commits du depot locale vers un dépot distant.";
	    instruction_jeu = "Tapez 'push' pour lancer la munition.";
	    allowed_commands = ["push"];
	    peut_push = true;
    
	    // Vérifier si le joueur a tiré (munition lancée)
	    var tir_effectue = false;
	    if (instance_exists(obj_bullet)) {
			if (obj_bullet.munition_lancee) tir_effectue = true;
	    }
    
	    // Relancer la comète SEULEMENT après le premier tir
	    if (tir_effectue && instance_exists(comete_tutorial) && comete_tutorial.en_pause) {
	        comete_tutorial.en_pause = false;
	    }
		
		if(instance_exists(comete_tutorial) && !comete_tutorial.en_pause) comete_tutorial.speed = 1.5;
    
	    // Vérifier si la comète est détruite
	    if (!instance_exists(comete_tutorial)) step = 8;
	    break;
    
    // ========== ÉTAPE 8 : DEUXIEME COMÈTE ==========
	//A REVOIR
	case 8:
		titre_etape = "";
		explication_git = "Attention !!";
	    instruction_jeu = "Une nouvelle comète arrive sur une autre trajectoire.";
	    allowed_commands = [];
    
	    if (instance_exists(obj_git) && !instance_exists(comete_tutorial)) {
	        var pos_branche_1 = room_width * 0.75;
	        comete_tutorial = instance_create_layer(pos_branche_1, 50, "Instances", obj_comete);
	        comete_tutorial.en_pause = false;
	    }
		
		if(!comete_tutorial.en_pause) comete_tutorial.speed = 1.5;
		
		if (instance_exists(comete_tutorial) && comete_tutorial.y >= 250) {
			comete_tutorial.en_pause = true;
			step = 10;
		}
	    break;


	// ========== ÉTAPE 10 : GIT BRANCH ==========
	case 10:
	    titre_etape = "GIT BRANCH";
		explication_git = "Cette commande affiche tous les branches existante et git branch nom_branche creer une nouvelle branche";
	    instruction_jeu = "Tapez 'branch' pour creer de nouvelle trajectoire";
	    allowed_commands = ["branch"];
	    peut_push = false;
    
	    if (obj_git.nb_branche_uti >= 2) step = 11;
	    break;

	// ========== ÉTAPE 11 : GIT CHECKOUT ==========
	case 11:
	    titre_etape = "GIT CHECKOUT";
		explication_git ="Cette commande permet de passer d’une branche à l’autre";
	    instruction_jeu = "Tapez 'checkout 1' pour vous déplacer sur la branche 1";
	    allowed_commands = ["checkout"];
    
	    if (obj_git.position_actuelle == 1) step = 12;
	    break;
    
    // ========== ÉTAPE 12 : CYCLE ADD/COMMIT/PUSH ==========
    case 12:
		titre_etape = "";
		explication_git = "Vous avez compris le principe";
        instruction_jeu = "Maintenant, détruisez cette comète !";
        allowed_commands = ["add", "commit", "push"];
        peut_push = true;
        
        if (instance_exists(comete_tutorial) && comete_tutorial.speed == 0) 
			comete_tutorial.speed = 0.7;
        
        if (!instance_exists(comete_tutorial)) step = 13;
        break;
    
    // ========== ÉTAPE 13 : GIT MERGE ==========
    case 13:
        titre_etape = "GIT MERGE";
		explication_git = "Cette commande permet de combiner deux branches entre elles";
        instruction_jeu = "Tapez 'merge' pour fusionner et revenir à une branche";
        allowed_commands = ["merge"];
        
        if (obj_git.nb_branche_uti == 1) step = 14;
        break;
    
    // ========== ÉTAPE 14 : GIT PULL ==========
    case 14:
        titre_etape = "GIT PULL";
		explication_git = "Cette commande permet de recuperer et integrer les modifications du dépôt distant dans le depot local";
        instruction = "Taper 'pull'pour quitter le menu pause";
        allowed_commands = ["pull"];
		
		affiche_rectangle = true;
		if (console.com_pull) {
			show_debug_message("PASSAGE À L'ÉTAPE 15 !!!");
            console.com_pull = false;
			affiche_rectangle = false;
            step = 15;
        }
		break;
    
    // ========== ÉTAPE 15 : ATTENDRE FIN ==========
    case 15:
		titre_etape = "FIN";
		explication_git = "Vous avez fini le tutoriel ! Maintenant c'est a vous de jouer";
		instruction_jeu = "Chargement du jeu ...";
        allowed_commands = [];
		
        alarm[1] = 180;
		step = 15.5;
        break;
	
	case 15.5:
		break;
}