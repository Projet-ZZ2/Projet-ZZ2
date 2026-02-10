if (room == R2_Tutoriel) {
    exit; // Sortir sans spawner
}

if (!gagne && !perdu) {
	
	if (!instance_exists(obj_git)) exit;

    // Spawn une comète
    var nb_branche = obj_git.nb_branche_tot;
    var branche_aleatoire = irandom(nb_branche - 1);
    var espacement = room_width / nb_branche;
    var x_comete = espacement * branche_aleatoire + espacement / 2;

    instance_create_layer(x_comete, 0, "Instances", obj_comete);

    // Reprogrammer le prochain spawn
    alarm[1] = spawn_interval;
}