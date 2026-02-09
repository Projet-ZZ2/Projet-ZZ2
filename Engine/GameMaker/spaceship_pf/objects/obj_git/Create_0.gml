nb_branche_uti = 3;
nb_branche_tot = 3;
position_actuelle = floor(nb_branche_uti / 2);
a_augmente1 = false;
a_augmente2 = false;

y = display_get_gui_height() - 60 - 90;

// Précalculer l'espacement et la position
espacement = room_width / nb_branche_uti;
x = espacement * position_actuelle + espacement / 2;