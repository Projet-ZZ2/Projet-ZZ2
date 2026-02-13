if (menu_type == "menu") {
    // Menu principal
    if (obj_console.com_init) {
        room_goto(R3_Jeu);
		obj_console.com_init = false;
		audio_play_sound(mus_game, 1, true);
		audio_sound_gain(mus_game, 0.5, 0);
    }
	
	if (obj_console.com_help) {
	    room_goto(R2_Tutoriel);
		obj_console.com_help = false;
		audio_play_sound(mus_tuto, 1, true);
		audio_sound_gain(mus_tuto, 0.45, 0);
	}
	
} else {
    // Écran de pause
    if (obj_console.com_pull) {
        room_goto_previous();
		obj_console.com_pull = false;
    }
    
    if (obj_console.com_init) {
		obj_console.com_init = false;
        game_restart();
		audio_stop_sound(mus_game);
    }
}