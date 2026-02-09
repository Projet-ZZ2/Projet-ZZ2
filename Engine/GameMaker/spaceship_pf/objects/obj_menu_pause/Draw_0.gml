var gui_w = display_get_gui_width();
var gui_h = display_get_gui_height();

if(menu_type == "menu") {
	
	draw_set_font(Titre);
	draw_set_halign(fa_center);
	draw_set_valign(fa_middle);
	draw_set_color(c_fuchsia);
	draw_text(gui_w / 2, 170, "GIT SHOOTER");
	
	draw_set_font(Corps);
	draw_set_color(c_white);
	draw_text(gui_w / 2, 300, "texte a ajouter");
	
} else {
	
	draw_set_font(Titre);
	draw_set_halign(fa_center);
	draw_set_valign(fa_middle);
	draw_set_color(c_fuchsia);
	draw_text(gui_w / 2, 170, "Pause");
	
	draw_set_font(Corps);
	draw_set_color(c_white);
	draw_text(gui_w / 2, 300, "COMMANDES :");
	draw_text(gui_w / 2, 330, "git checkout x : Basculer la branche x");
	draw_text(gui_w / 2, 360, "git add : Recuperer une munition");
	draw_text(gui_w / 2, 390, "git commit : Preparer la munition");
	draw_text(gui_w / 2, 420, "git push: Envoyer la munition");
	draw_text(gui_w / 2, 450, "git branch: Creer une nouvelle branche");
	draw_text(gui_w / 2, 480, "git merge : Fusionner deux branches");
	draw_text(gui_w / 2, 510, "git pull : Reprendre la partie");
	
	draw_text(gui_w / 2, 570, "M : Recommencer");
	
}

// Réinitialiser l'alignement
draw_set_halign(fa_left);
draw_set_valign(fa_top);