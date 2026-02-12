curseur_timer++;
if (curseur_timer >= 40) {
	curseur_timer = 0;
    curseur_visible = !curseur_visible;
}


//Parcours de l'historique des commandes
if (keyboard_check_pressed(vk_up)) {
	if (array_length(historique) > 0) {
		if (index == -1) temp_input = keyboard_string;
			
		if (index < array_length(historique)-1) {
			index++;
			keyboard_string = historique[array_length(historique) - 1 - index];
			console_input = keyboard_string;
		}
	}
}
	
if (keyboard_check_pressed(vk_down)){
	if (index > -1) {
		index--;
		
		if(index == -1) {
			keyboard_string = temp_input;
			console_input = keyboard_string;
		} else {
			keyboard_string = historique[array_length(historique) - 1 - index];
			console_input = keyboard_string;
		}
	}
}

console_input = keyboard_string;

if (keyboard_check_pressed(vk_enter) && console_input != "") {
	var commande = string_lower(console_input);
	
	// Ajouter la commande à l'historique
    array_push(historique, commande);
	index = -1;
    temp_input = "";
	
	
	// Séparation de la commande checkout et x
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
			if(obj_git.nb_branche_uti < 5) com_branch = true;
			break;
		
		case "merge":
			if(obj_git.nb_branche_uti > 1) com_merge = true;
			break;
		
		case "checkout":
            if (cmd_parametre == "") num_branche = 0;
			else num_branche = real(cmd_parametre);
			com_checkout = true;
            break;
		
		case "help":
			com_help = true;
			break;
		
		case "reset":
			com_reset = true;
			break;
		
		default:
			break;
	}
	console_input = "";
	keyboard_string = "";
}

// Effacer avec Échap
if (keyboard_check_pressed(vk_delete)) {
	console_input = "";
	keyboard_string = "";
	index = -1;
	temp_input = "";
}
