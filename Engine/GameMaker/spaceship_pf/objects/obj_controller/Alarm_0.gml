if (room == R2_Tutoriel) {
    exit;
}

if (!gagne && !perdu) {
	
	if (!instance_exists(obj_git)) exit;
	
	if(obj_git.nb_branche_tot == 2) obj_git.a_augmente = true;
	else if (obj_git.nb_branche_tot == 5) obj_git.a_diminuer = true;
	else {
		var nb_alea = irandom(1);
		if(nb_alea == 0) obj_git.a_augmente = true;
		else obj_git.a_diminuer = true;
	}
    alarm[0] = chgt_nb_branche;
}