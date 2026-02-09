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
    espacement = room_width / nb_branche_uti;
    x = espacement * position_actuelle + espacement / 2;
	obj_console.com_merge = false;
}

// Augmentation automatique des branches selon le score
var val = obj_controller.score_total;
var seuil = obj_controller.tmp;

if (val >= seuil && !a_augmente1) {
    nb_branche_tot += 1;
    a_augmente1 = true;
}

if (val >= seuil * 2 && !a_augmente2) {
    nb_branche_tot += 1;
    a_augmente2 = true;
}