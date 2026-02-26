if (en_pause) {
    speed = 0;
}

with(obj_controller) {
	if(score_total < 20) speed = 0.2;
	if(score_total < 40) speed = 0.3;
	if(score_total < 60) speed = 0.4;
	if(score_total < 80) speed = 0.5;
	else speed = 0.6;
}