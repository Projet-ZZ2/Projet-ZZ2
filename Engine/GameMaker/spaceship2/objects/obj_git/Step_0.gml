if (keyboard_check(ord("D"))) {
    x += 5;
}

if (keyboard_check(ord("Q"))) {
    x -= 5;
}

if mouse_check_button_pressed(mb_left)
{
        instance_create_layer(x, y, "Instances", obj_bullet)
}