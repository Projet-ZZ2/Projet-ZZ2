with (obj_controller) {
    vie -= 1;
    if (vie <= 0 && !perdu) {
		perdu = true;
		audio_stop_sound(mus_game);
		
		alarm[3] = 60;
	}
}
instance_destroy();