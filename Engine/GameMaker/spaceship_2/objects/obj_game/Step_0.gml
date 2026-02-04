if(score_total >= score_a_atteindre){
	gagne = true;
}

if (gagne)
{
    instance_deactivate_object(obj_comete);
    instance_deactivate_object(obj_bullet);
    instance_deactivate_object(obj_spawn_comete);
    instance_deactivate_object(obj_git);
}

if (keyboard_check_pressed(ord("P")))
{
    room_goto(Pause); // change "room1" par le nom de ta room de jeu si différent
}