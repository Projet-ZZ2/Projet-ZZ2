// Récupérer le nombre de branches depuis obj_git
nb_branche = obj_git.nb_branche;

// Choisir une branche aléatoire
branche_aleatoire = irandom(nb_branche - 1);

// Calculer la position x
espacement = room_width / nb_branche;
x_comete = espacement * branche_aleatoire + espacement / 2;

// Créer la comète en haut de l'écran
instance_create_layer(x_comete, 0, "Instances", obj_comete);

// Relancer l'alarm pour créer une autre comète plus tard
alarm[0] = game_get_speed(gamespeed_fps) * 2; // toutes les 2 secondes