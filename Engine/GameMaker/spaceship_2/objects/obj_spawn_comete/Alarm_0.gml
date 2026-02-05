// Récupérer le nombre de branches depuis obj_git
nb_branche = obj_git.nb_branche_tot;
// Choisir une branche aléatoire
branche_aleatoire = irandom(nb_branche - 1);
// Calculer la position x
espacement = room_width / nb_branche;
x_comete = espacement * branche_aleatoire + espacement / 2;
// LIGNE DE DEBUG (maintenant APRÈS tous les calculs)
show_debug_message("nb_branche: " + string(nb_branche) + " | branche: " + string(branche_aleatoire) + " | x: " + string(x_comete));
// Créer la comète en haut de l'écran
instance_create_layer(x_comete, 0, "Instances", obj_comete);
// Relancer l'alarm pour créer une autre comète plus tard
alarm[0] = game_get_speed(gamespeed_fps) * 2;