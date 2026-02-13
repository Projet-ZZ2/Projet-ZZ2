// Gestion uniquement dans la room de jeu
if (room == R3_Jeu) {
    // Vérifier victoire
    if (score_total >= score_a_atteindre && !gagne) {
        gagne = true;
		audio_stop_sound(mus_game);
        instance_deactivate_object(obj_comete);
        instance_deactivate_object(obj_bullet);
        instance_deactivate_object(obj_git);
		audio_play_sound(mus_succes, 1, true);
		audio_sound_gain(mus_succes, 0.6, 0);
		alarm[2] = 200;
    }
    
    // Pause
    if (keyboard_check_pressed(vk_escape)) {
        room_goto(R4_Pause);
    }
    
    // Recommencer si perdu
    if (obj_console.com_reset && perdu) {
		obj_console.com_reset = false;
		audio_stop_sound(mus_lost);
        game_restart();
    }
}


if (room == R2_Tutoriel) {
	if (keyboard_check_pressed(vk_escape)) {
		audio_stop_sound(mus_tuto);
        room_goto(R1_Menu);
    }
}