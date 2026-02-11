if (!munition_lancee) {
    if (!munition_commit) couleur_sprite = c_red;
    else couleur_sprite = c_lime;
	
} else {
    couleur_sprite = c_white;
}

draw_sprite_ext(sprite_index, image_index, x, y, image_xscale, image_yscale, 
	image_angle, couleur_sprite, 1);
