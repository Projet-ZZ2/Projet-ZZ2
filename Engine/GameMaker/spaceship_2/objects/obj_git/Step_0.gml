// Recalculer l'espacement (au cas où nb_branche change)
espacement = room_width / nb_branche;

// Touche D - déplacer à droite
if (keyboard_check_pressed(ord("D"))) {
    if (position_actuelle < nb_branche - 1) {
        position_actuelle += 1;
		obj_message.message = "git checkout"; 
		obj_message.m_timer = 60; // environ 1.5 secondes
    }
}

// Touche Q - déplacer à gauche
if (keyboard_check_pressed(ord("Q"))) {
    if (position_actuelle > 0) {
        position_actuelle -= 1;
		obj_message.message = "git checkout"; 
		obj_message.m_timer = 60; // environ 1.5 secondes
    }
}

// Placer l'objet à la bonne position
x = espacement * position_actuelle + espacement / 2;

// Tirer
if (mouse_check_button_pressed(mb_left))
{
    instance_create_layer(x, y, "Instances", obj_bullet);
	obj_message.message = "git add/commit"; 
	obj_message.m_timer = 60; // environ 1.5 secondes
}