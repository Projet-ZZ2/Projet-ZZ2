// Dessiner les lignes de branches
draw_set_color(c_white);
draw_set_alpha(0.7);

for (var i = 0; i < nb_branche_uti; i++) {
    var x_trait = espacement * i + espacement / 2;
    draw_line_width(x_trait, y + 20, x_trait, room_height - obj_console.console_hauteur, 3);
	draw_line_width(x_trait, 0, x_trait, room_height/20, 3);
	draw_set_alpha(1);
	draw_set_font(S_Titre);
	draw_text(x_trait - 25 , room_height - room_height/10, i);
	
}

draw_set_color(c_white);
draw_self();