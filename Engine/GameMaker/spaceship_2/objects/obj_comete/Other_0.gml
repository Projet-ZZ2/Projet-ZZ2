obj_game.vie -= 1

if(obj_game.vie <= 0){
	obj_game.perdu = true;
} 

instance_destroy();
