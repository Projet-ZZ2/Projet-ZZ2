if (menu_type == "menu") {
    // Menu principal
    if (obj_console.com_init) {
        room_goto(R3_Jeu);
		obj_console.com_init = false;
    }
	
	if (obj_console.com_help) {
	    room_goto(R2_Tutoriel);
		obj_console.com_help = false;
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
    }
}