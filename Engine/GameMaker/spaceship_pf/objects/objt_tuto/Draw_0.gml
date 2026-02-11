// Fond semi-transparent pour les instructions
draw_set_alpha(0.8);
draw_set_color(c_black);
draw_rectangle(0, 0, display_get_gui_width(), 150, false);
draw_set_alpha(1);

// Titre
if (titre_etape != "") {
    draw_set_font(Titre);
    draw_set_color(c_yellow);
    draw_set_halign(fa_center);
    draw_text(display_get_gui_width() / 2, 30, titre_etape);
}

// Instruction
draw_set_font(Corps);
draw_set_color(c_orange);
draw_set_halign(fa_center);
draw_text(display_get_gui_width() / 2, 80, explication_git);

draw_set_font(Corps);
draw_set_color(c_white)
draw_set_halign(fa_center);
draw_text(display_get_gui_width() / 2, 110, instruction_jeu);

// Reset
draw_set_halign(fa_left);
draw_set_color(c_white);

if(affiche_rectangle) {
	draw_set_color(c_black);
	draw_rectangle(1000, 1000, 150, 150, false);
}
	