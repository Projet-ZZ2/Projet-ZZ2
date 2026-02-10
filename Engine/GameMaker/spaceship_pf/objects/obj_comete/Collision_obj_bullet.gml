if (obj_bullet.munition_lancee) {
	obj_controller.score_total += obj_controller.point_par_comete;
	instance_create_layer(x, y, "Instances", obj_exp);
	instance_destroy(other);
	instance_destroy();
}
