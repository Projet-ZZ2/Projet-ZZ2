if (menu_type == "menu") {
    // Menu principal
    if (obj_console.com_init) {
        room_goto(R3_Jeu);
		obj_console.com_init = false;
    }
	
	if (keyboard_check_pressed(ord("H"))) {
	    room_goto(R2_Tutoriel);
	}
	
} else {
    // Écran de pause
    if (obj_console.com_pull) {
        room_goto_previous();
		obj_console.com_pull = false;
    }
    
    if (obj_console.com_init) {
        game_restart();
    }
}