draw_set_color(c_white);
draw_set_font(-1); // police par défaut
draw_text(20, 20, "Score: " + string(score_total));
for (var i = 0; i < vie; i++)
{
    draw_sprite(coeur, 0, 20 + (i * 40), 60);
}

if (gagne == true)
{
    // Fond semi-transparent noir
    draw_set_alpha(0.7);
    draw_set_color(c_black);
    draw_rectangle(0, 0, display_get_gui_width(), display_get_gui_height(), false);
    draw_set_alpha(1);
    
    // Encadré de victoire
    var encadre_largeur = 400;
    var encadre_hauteur = 200;
    var encadre_x = (display_get_gui_width() - encadre_largeur) / 2;
    var encadre_y = (display_get_gui_height() - encadre_hauteur) / 2;
    
    // Bordure de l'encadré
    draw_set_color(c_aqua);
    draw_rectangle(encadre_x, encadre_y, encadre_x + encadre_largeur, encadre_y + encadre_hauteur, false);
    
    // Fond de l'encadré
    draw_set_color(c_black);
    draw_rectangle(encadre_x + 5, encadre_y + 5, encadre_x + encadre_largeur - 5, encadre_y + encadre_hauteur - 5, false);
    
    // Texte "VICTOIRE !"
    draw_set_halign(fa_center);
    draw_set_valign(fa_middle);
    draw_set_color(c_aqua);
    draw_text(encadre_x + encadre_largeur / 2, encadre_y + encadre_hauteur / 2 - 20, "VICTOIRE !");
    
    
    // Réinitialiser l'alignement
    draw_set_halign(fa_left);
    draw_set_valign(fa_top);
}
if (perdu == true){
	    // Fond semi-transparent noir
    draw_set_alpha(0.7);
    draw_set_color(c_black);
    draw_rectangle(0, 0, display_get_gui_width(), display_get_gui_height(), false);
    draw_set_alpha(1);
    
    // Encadré de victoire
    var encadre_largeur = 400;
    var encadre_hauteur = 200;
    var encadre_x = (display_get_gui_width() - encadre_largeur) / 2;
    var encadre_y = (display_get_gui_height() - encadre_hauteur) / 2;
    
    // Bordure de l'encadré
    draw_set_color(c_red);
    draw_rectangle(encadre_x, encadre_y, encadre_x + encadre_largeur, encadre_y + encadre_hauteur, false);
    
    // Fond de l'encadré
    draw_set_color(c_black);
    draw_rectangle(encadre_x + 5, encadre_y + 5, encadre_x + encadre_largeur - 5, encadre_y + encadre_hauteur - 5, false);
    
    // Texte "VICTOIRE !"
    draw_set_halign(fa_center);
    draw_set_valign(fa_middle);
    draw_set_color(c_red);
    draw_text(encadre_x + encadre_largeur / 2, encadre_y + encadre_hauteur / 2 - 20, "Game Over !");
    
	draw_set_color(c_white);
    draw_text(encadre_x + encadre_largeur / 2, encadre_y + encadre_hauteur / 2 + 30, "Appuyez sur M pour rejouer");
    
    // Réinitialiser l'alignement
    draw_set_halign(fa_left);
    draw_set_valign(fa_top);
}