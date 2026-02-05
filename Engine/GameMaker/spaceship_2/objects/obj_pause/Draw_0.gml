// Fond (optionnel)
draw_set_color(c_black);
draw_rectangle(0, 0, display_get_gui_width(), display_get_gui_height(), false);

// Titre du jeu
draw_set_font(Titre);
draw_set_halign(fa_center);
draw_set_valign(fa_middle);
draw_set_color(c_fuchsia);
draw_text(display_get_gui_width() / 2, 100, "GIT SHOOTER");

// Commandes
draw_set_font(Corps);
draw_set_color(c_white);
draw_text(display_get_gui_width() / 2, 200, "COMMANDES :");
draw_text(display_get_gui_width() / 2, 250, "D / Q - git checkout (basculer sur une autre branche)");
draw_text(display_get_gui_width() / 2, 280, "Clic gauche - git add et git commit (recuperer une munition)");
draw_text(display_get_gui_width() / 2, 310, "E - git push (envoyer la munition)");
draw_text(display_get_gui_width() / 2, 340, "A - git branch (creer une nouvelle branche)");

// Instructions pour démarrer
draw_set_color(c_teal);
draw_text(display_get_gui_width() / 2, 420, "Appuyez sur P (git pull) pour reprendre");

// Réinitialiser l'alignement
draw_set_halign(fa_left);
draw_set_valign(fa_top);