if(score_total >= score_a_atteindre && !jeu_termine){
	jeu_termine = true;
}

if (jeu_termine)
{
    draw_set_halign(fa_center);
    draw_set_valign(fa_middle);
    draw_set_color(c_yellow);
    draw_text(room_width / 2, room_height / 2, "VICTOIRE !");
    draw_text(room_width / 2, room_height / 2 + 40, "Appuyez sur R pour rejouer");
    draw_set_halign(fa_left);
    draw_set_valign(fa_top);
}