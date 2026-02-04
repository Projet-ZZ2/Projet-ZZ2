obj_game.vie -= 1

if(obj_game.vie <= 0){
	game_restart();
} 

instance_destroy();
