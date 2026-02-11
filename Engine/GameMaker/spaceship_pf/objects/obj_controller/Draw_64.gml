if (room == R3_Jeu) {
	
	if (!gagne && !perdu) {
	    // Score
	    draw_set_alpha(1); 
	    draw_set_color(c_white); 
	    draw_set_halign(fa_left); 
	    draw_set_valign(fa_top); 
	    draw_set_font(S_Titre);
	    draw_text(20, 20, "Score: " + string(score_total));
    
	    // Vies (coeurs)
	    for (var i = 0; i < vie; i++) {
	        draw_sprite(coeur, 0, 20 + (i * 40), 60);
	    }
	}

    // Écran de fin (victoire ou défaite)
    if (gagne || perdu) {
        // Fond semi-transparent
        draw_set_alpha(0.7);
        draw_set_color(c_black);
        draw_rectangle(0, 0, gui_width, gui_height, false);
        draw_set_alpha(1);
        
        // Paramètres de l'encadré
        var encadre_largeur = 500;
        var encadre_hauteur = 200;
        var encadre_x = (gui_width - encadre_largeur) / 2;
        var encadre_y = (gui_height - encadre_hauteur) / 2;
        
        // Couleur et texte selon l'état
        var couleur_bordure = gagne ? c_aqua : c_red;
        var texte_principal = gagne ? "VICTOIRE !" : "Game Over !";
        
        // Bordure
        draw_set_color(couleur_bordure);
        draw_rectangle(encadre_x, encadre_y, encadre_x + encadre_largeur, encadre_y + encadre_hauteur, false);
        
        // Fond de l'encadré
        draw_set_color(c_black);
        draw_rectangle(encadre_x + 5, encadre_y + 5, encadre_x + encadre_largeur - 5, encadre_y + encadre_hauteur - 5, false);
        
        // Texte principal
        draw_set_font(Titre);
        draw_set_halign(fa_center);
        draw_set_valign(fa_middle);
        draw_set_color(couleur_bordure);
        
        var texte_y = gagne ? encadre_y + encadre_hauteur / 2 : encadre_y + encadre_hauteur / 2 - 20;
        draw_text(encadre_x + encadre_largeur / 2, texte_y, texte_principal);
        
        // Texte secondaire (uniquement pour défaite)
        if (perdu) {
            draw_set_font(Corps);
            draw_set_color(c_white);
            draw_text(encadre_x + encadre_largeur / 2, encadre_y + encadre_hauteur / 2 + 30, "Appuyez sur M pour rejouer");
        }
    }
    
    // Réinitialiser l'alignement
    draw_set_halign(fa_left);
    draw_set_valign(fa_top);
}