var largeur_gui = display_get_gui_width();
var centre_x = largeur_gui / 2;
var y_start = 350;
var y_spacing = 30;

if(menu_type == "menu") {
	
	draw_set_font(Titre);
	draw_set_halign(fa_center);
	draw_set_valign(fa_middle);
	draw_set_color(c_fuchsia);
	draw_text(centre_x, 170, "GIT SHOOTER");
	
	draw_set_font(Corps);
	draw_set_color(c_white);
	draw_text(centre_x, y_start, "Bucs decolle !")
	draw_text(centre_x, y_start + y_spacing * 1.5, " Il a une mission dans l'espace");
	draw_text(centre_x, y_start + y_spacing * 2.5, " et vous devez le guider.");
	draw_text(centre_x, y_start + y_spacing * 4, "Eliminez vite les meteorites qui vont s'abattre sur la Terre");
	draw_text(centre_x, y_start + y_spacing * 5, " a l'aide de votre ordinateur tout-puissant !");
	
	draw_set_color(#00F5FF);
	draw_set_font(S_Titre);
	draw_text(centre_x, 620, "Taper 'help' pour lancer le tutoriel");
	draw_text(centre_x, 700, "Taper 'init' pour lancer le jeu");
	draw_text(centre_x, 780, "Taper 'exit' pour quitter le jeu");
	
	draw_set_color(c_silver);
	draw_set_font(Corps);
	draw_text(centre_x, 650, "Appuyer sur 'Echap' pour quitter le tutoriel");
	draw_text(centre_x, 730, "Appuyer sur 'Echap' pour mettre en pause");
	
	
	
} else {
	
	draw_set_font(Titre);
	draw_set_halign(fa_center);
	draw_set_valign(fa_middle);
	draw_set_color(c_fuchsia);
	draw_text(centre_x, 170, "Pause");
	
	draw_set_font(Corps);
	draw_set_color(#00F5FF);
	draw_text(centre_x, 300, "COMMANDES :");
	//Colonne avec commandes git
	draw_set_color(c_white);
	draw_set_halign(fa_right);
	draw_text(centre_x, y_start, "git init :");
	draw_text(centre_x, y_start + y_spacing, "git checkout x :");
	draw_text(centre_x, y_start + y_spacing * 2, "git add :");
	draw_text(centre_x, y_start + y_spacing * 3, "git commit :");
	draw_text(centre_x, y_start + y_spacing * 4, "git push :");
	draw_text(centre_x, y_start + y_spacing * 5, "git branch :");
	draw_text(centre_x, y_start + y_spacing * 6, "git merge :");
	draw_text(centre_x, y_start + y_spacing * 7, "git pull :");

	// Colonne avec description
	draw_set_halign(fa_left);
	draw_text(centre_x + 10, y_start, "Initialiser le jeu");
	draw_text(centre_x + 10, y_start + y_spacing, "Basculer la branche x");
	draw_text(centre_x + 10, y_start + y_spacing * 2 , "Recuperer une munition");
	draw_text(centre_x + 10, y_start + y_spacing * 3, "Preparer la munition");
	draw_text(centre_x + 10, y_start + y_spacing * 4, "Envoyer la munition");
	draw_text(centre_x + 10, y_start + y_spacing * 5, "Creer une nouvelle branche");
	draw_text(centre_x + 10, y_start + y_spacing * 6, "Fusionner deux branches");
	draw_text(centre_x + 10, y_start + y_spacing * 7, "Reprendre la partie");
	
}

// Réinitialiser l'alignement
draw_set_halign(fa_left);
draw_set_valign(fa_top);