// Dessiner les lignes de branches
draw_set_color(c_white);
draw_set_alpha(0.7);

for (var i = 0; i < nb_branche_uti; i++) {
    var x_trait = espacement * i + espacement / 2;
    draw_line_width(x_trait, y + 20, x_trait, room_height, 3);
}

draw_set_alpha(1);

// Dessiner le sprite du joueur
draw_self();