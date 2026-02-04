// Démarrer le jeu avec la touche I
if (keyboard_check_pressed(ord("I")))
{
    room_goto(Jeu);
	obj_message.message = "git init"; 
	obj_message.m_timer = 60; // environ 1.5 secondes
}