// Recalculer l'espacement (au cas où nb_branche change)
espacement = room_width / nb_branche_uti;

// Touche D - déplacer à droite
if (keyboard_check_pressed(ord("D"))) {
    if (position_actuelle < nb_branche_uti - 1) {
        position_actuelle += 1;
		obj_message.message = "git checkout"; 
		obj_message.m_timer = 60;
    }
}

// Touche Q - déplacer à gauche
if (keyboard_check_pressed(ord("Q"))) {
    if (position_actuelle > 0) {
        position_actuelle -= 1;
		obj_message.message = "git checkout"; 
		obj_message.m_timer = 60;
    }
}

// Placer l'objet à la bonne position
x = espacement * position_actuelle + espacement / 2;

// Tirer
if (mouse_check_button_pressed(mb_left))
{
    instance_create_layer(x, y, "Instances", obj_bullet);
	obj_message.message = "git add/commit"; 
	obj_message.m_timer = 60;
}

if (keyboard_check_pressed(ord("R")) && nb_branche_uti < 5) {
	nb_branche_uti += 1;
	obj_message.message = "git branch"; 
	obj_message.m_timer = 60;
}

//show_debug_message("tmp: " + string(obj_game.tmp));

if(obj_game.score_total >= obj_game.tmp && !a_augmente1) {
	nb_branche_tot += 1;
	a_augmente1 = true;
}


if(obj_game.score_total >= obj_game.tmp*2 && !a_augmente2) {
	nb_branche_tot += 1;
	a_augmente2 = true;
}
