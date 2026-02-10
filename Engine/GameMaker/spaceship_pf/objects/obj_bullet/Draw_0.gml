if (!munition_lancee) {
    if (!munition_commit) {
        draw_sprite_ext(sprite_index, image_index, x, y, image_xscale, image_yscale, image_angle, c_red, 1);
    } else {
        draw_sprite_ext(sprite_index, image_index, x, y, image_xscale, image_yscale, image_angle, c_lime, 1);
    }
} else {
    draw_self();
}
