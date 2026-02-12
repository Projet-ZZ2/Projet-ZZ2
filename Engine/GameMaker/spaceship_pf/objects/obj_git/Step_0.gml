// Déplacement sur les branches
if (obj_console.com_checkout) {
    if (obj_console.num_branche >= 0 && obj_console.num_branche < nb_branche_uti) {
        position_actuelle = obj_console.num_branche;
        x = espacement * position_actuelle + espacement / 2;
    }
	obj_console.com_checkout = false;
}

// Ajouter une balle
if (obj_console.com_add) {
    instance_create_layer(x, y, "Instances", obj_bullet);
	obj_console.com_add = false;
}

// Créer une nouvelle branche
if (obj_console.com_branch) {
    nb_branche_uti += 1;
    espacement = room_width / nb_branche_uti;
    x = espacement * position_actuelle + espacement / 2;
	obj_console.com_branch = false;
}

// Supprimer une branche
if (obj_console.com_merge) {
    nb_branche_uti -= 1;
	//Eviter de sortir de la room
	if (position_actuelle >= nb_branche_uti) position_actuelle = nb_branche_uti - 1;
    espacement = room_width / nb_branche_uti;
    x = espacement * position_actuelle + espacement / 2;
	obj_console.com_merge = false;
}


if (a_augmente) {
    nb_branche_tot += 1;
    a_augmente = false;
}

if (a_diminuer) {
    nb_branche_tot -= 1;
    a_diminuer = false;
}