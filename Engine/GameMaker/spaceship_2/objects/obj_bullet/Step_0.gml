if (keyboard_check(ord("E"))) {
	speed = 10;
	direction = 90;
	munition_lancee = true;
	obj_message.message = "git push"; 
	obj_message.m_timer = 60; // environ 1.5 secondes
}

if (!munition_lancee){
	if (instance_exists(obj_git))
    {
        x = obj_git.x;
        y = obj_git.y;
    }
}