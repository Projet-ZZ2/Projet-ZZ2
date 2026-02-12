// Gestion uniquement dans la room de jeu
if (room == R3_Jeu) {
    // Vérifier victoire
    if (score_total >= score_a_atteindre && !gagne) {
        gagne = true;
        instance_deactivate_object(obj_comete);
        instance_deactivate_object(obj_bullet);
        instance_deactivate_object(obj_git);
		alarm[2] = 180;
    }
    
    // Pause
    if (keyboard_check_pressed(vk_escape)) {
        room_goto(R4_Pause);
    }
    
    // Recommencer si perdu
    if (obj_console.com_reset && perdu) {
		obj_console.com_reset = false;
        game_restart();
    }
}


if (room == R2_Tutoriel) {
	if (keyboard_check_pressed(vk_escape)) {
        room_goto(R1_Menu);
    }
}