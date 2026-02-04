if (keyboard_check(ord("E"))) {
	speed = 10;
	direction = 90;
	munition_lancee = true;
}

if (!munition_lancee){
	if (instance_exists(obj_git))
    {
        x = obj_git.x;
        y = obj_git.y;
    }
}