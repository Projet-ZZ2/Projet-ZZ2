//Taille console
var console_hauteur = 60;
var console_y = gui_height - console_hauteur;

// Fond de la console
draw_set_alpha(0.9);
draw_set_color(c_black);
draw_rectangle(0, console_y, gui_width, gui_height, false);
draw_set_alpha(1);

//Bordure supérieure
draw_set_color(c_yellow);
draw_line_width(0, console_y, gui_width, console_y, 3);

//// Prompt "git > "
draw_set_font(Corps);
draw_set_halign(fa_left);
draw_set_valign(fa_middle);
draw_set_color(c_yellow);
draw_text(20, console_y + console_hauteur / 2, "git >");

// Input utilisateur
draw_set_color(c_white);
var input_x = 100;
draw_text(input_x, console_y + console_hauteur / 2, console_input);

// Curseur clignotant
if (curseur_visible) {
	var curseur_x = input_x + string_width(console_input);
	draw_text(curseur_x, console_y + console_hauteur / 2, "_");
}

//Reset
draw_set_halign(fa_left);
draw_set_valign(fa_top);