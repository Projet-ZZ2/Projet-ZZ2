// DEBUG - Retirer une fois que ça marche
draw_set_color(c_lime);
draw_set_font(Corps);
draw_text(10, 10, "Step: " + string(step));
draw_text(10, 30, "obj_git existe: " + string(instance_exists(obj_git)));
draw_text(10, 50, "comete existe: " + string(instance_exists(comete_tutorial)));

// Fond semi-transparent pour les instructions
draw_set_alpha(0.8);
draw_set_color(c_black);
draw_rectangle(0, 0, display_get_gui_width(), 150, false);
draw_set_alpha(1);

// Titre
if (instruction_titre != "") {
    draw_set_font(Titre);
    draw_set_color(c_yellow);
    draw_set_halign(fa_center);
    draw_text(display_get_gui_width() / 2, 30, instruction_titre);
}

// Instruction
draw_set_font(Corps);
draw_set_color(c_white);
draw_set_halign(fa_center);
draw_text(display_get_gui_width() / 2, 80, instruction);

// Reset
draw_set_halign(fa_left);
draw_set_color(c_white);