// Variables de jeu
score_total = 0;
point_par_comete = 10;
vie = 3;
score_a_atteindre = 200;
gagne = false;
perdu = false;
tmp = round(score_a_atteindre / 3);

// Cache GUI dimensions
gui_width = display_get_gui_width();
gui_height = display_get_gui_height();


// Spawn des comètes
spawn_interval = game_get_speed(gamespeed_fps) * 10;
alarm[1] = spawn_interval;

randomize();