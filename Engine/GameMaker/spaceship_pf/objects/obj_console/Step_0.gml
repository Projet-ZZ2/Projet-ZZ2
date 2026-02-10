curseur_timer++;
if (curseur_timer >= 40) {
	curseur_timer = 0;
    curseur_visible = !curseur_visible;
}

console_input = keyboard_string;

// Valider la commande avec Entrée
if (keyboard_check_pressed(vk_enter) && console_input != "") {
	var commande = string_lower(console_input);
	
	// Séparer la commande et les paramètres
    var espace_pos = string_pos(" ", commande);
    var cmd_principale = commande;
    var cmd_parametre = "";
    
    if (espace_pos > 0) {
        cmd_principale = string_copy(commande, 1, espace_pos - 1);
        cmd_parametre = string_trim(string_delete(commande, 1, espace_pos));
    }
	
	//Verification pour le tuto si commande autorisée
	if (instance_exists(objt_tuto)) {
	    var commande_autorisee = false;
	    for (var i = 0; i < array_length(objt_tuto.allowed_commands); i++) {
	        if (cmd_principale == objt_tuto.allowed_commands[i]) {
	            commande_autorisee = true;
	            break;
	        }
	    }
	    if (!commande_autorisee) {
	        console_input = "";
	        keyboard_string = "";
	        return;
	    }
	}
	
	switch(cmd_principale) {
		case "init":
			com_init = true;
			break;
		
		case "pull":
			com_pull = true;
			break;
		
		case "add":
			com_add = true;
			break;
		
		case "commit":
			com_commit = true;
			break;
		
		case "push":
			com_push = true;
			break;
		
		case "branch":
			com_branch = true;
			break;
		
		case "merge":
			com_merge = true;
			break;
		
		case "checkout":
            // Traiter le paramètre
            if (cmd_parametre != "") {
				com_checkout = true;
                num_branche = real(cmd_parametre);
            }
            break;
		
		default:
			break;
	}
	
	// Réinitialiser l'input
	console_input = "";
	keyboard_string = "";
}

// Effacer avec Échap
if (keyboard_check_pressed(vk_escape)) {
	console_input = "";
	keyboard_string = "";
}


// Curseur clignotant
curseur_timer++;
if (curseur_timer >= 30) {
	curseur_timer = 0;
    curseur_visible = !curseur_visible;
}
