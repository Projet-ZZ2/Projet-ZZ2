if (!munition_lancee) {
    if (instance_exists(obj_git)) {
        x = obj_git.x;
        y = obj_git.y;
    }
	
	if (obj_console.com_commit) {
        munition_commit = true;
        obj_console.com_commit = false;
		obj_console.com_push = false;
    }
    
    if (obj_console.com_push && munition_commit) {
        speed = 10;
        direction = 90;
        munition_lancee = true;
		obj_console.com_push = false;
    }
}