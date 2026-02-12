// Variables de jeu
score_total = 0;
point_par_comete = 10;
vie = 3;
score_a_atteindre = 100;
gagne = false;
perdu = false;
signal_envoye = false;

// Cache GUI dimensions
gui_width = display_get_gui_width();
gui_height = display_get_gui_height();


// Spawn des comètes
spawn_interval = game_get_speed(gamespeed_fps) * 8.5;
alarm[1] = spawn_interval;

chgt_nb_branche = game_get_speed(gamespeed_fps) * 25;
alarm[0] = chgt_nb_branche;

randomize();