// Fond semi-transparent pour les instructions
draw_set_alpha(0.8);
draw_set_color(c_black);
draw_rectangle(0, 0, display_get_gui_width(), 150, false);
draw_set_alpha(1);

draw_set_halign(fa_center);

if (titre_etape != "") {
    draw_set_font(Titre);
    draw_set_color(c_yellow);
    draw_text(display_get_gui_width() / 2, 30, titre_etape);
	
	draw_set_font(Corps);
	draw_set_color(c_orange);
	draw_text(display_get_gui_width() / 2, 80, explication_git);
	draw_set_color(c_silver);
	draw_text(display_get_gui_width() / 2, 110, instruction_jeu);
	
} else {
	
	draw_set_font(Corps);
	draw_set_color(c_silver);
	draw_text(display_get_gui_width() / 2, 50, explication_git);
	draw_text(display_get_gui_width() / 2, 80, instruction_jeu);	
}


if(affiche_rectangle) {
        
        var encadre_largeur = 400;
        var encadre_hauteur = 150;
        var encadre_x = (display_get_gui_width() - encadre_largeur) / 2;
        var encadre_y = (display_get_gui_height() - encadre_hauteur) / 2;
        draw_set_color(c_dkgray);
        draw_rectangle(encadre_x, encadre_y, encadre_x + encadre_largeur, encadre_y + encadre_hauteur, false);
        draw_set_color(c_black);
        draw_rectangle(encadre_x + 5, encadre_y + 5, encadre_x + encadre_largeur - 5, encadre_y + encadre_hauteur - 5, false);
        draw_set_font(Corps);
        draw_set_valign(fa_middle);
        draw_set_color(c_fuchsia);
        draw_text(encadre_x + encadre_largeur / 2, encadre_y + encadre_hauteur / 2, "PAUSE");
}

draw_set_halign(fa_left);
draw_set_color(c_white);
	