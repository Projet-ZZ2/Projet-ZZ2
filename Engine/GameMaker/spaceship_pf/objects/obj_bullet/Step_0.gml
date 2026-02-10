if (!munition_lancee) {
    // Suivre le joueur tant que non lancée
    if (instance_exists(obj_git)) {
        x = obj_git.x;
        y = obj_git.y;
    }
	
	//Change de couleur sur commit ou pas
	if (obj_console.com_commit) {
        munition_commit = true;
        obj_console.com_commit = false;
		obj_console.com_push = false;
    }
    
    // Lancer avec la touche E
    if (obj_console.com_push && munition_commit) {
        speed = 10;
        direction = 90;
        munition_lancee = true;
		obj_console.com_push = false;
    }
}