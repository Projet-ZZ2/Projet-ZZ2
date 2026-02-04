// Démarrer le jeu avec la touche I
if (keyboard_check_pressed(ord("P")))
{
    room_goto_previous();
	obj_message.message = "git pull"; 
	obj_message.m_timer = 60; // environ 1.5 secondes
}