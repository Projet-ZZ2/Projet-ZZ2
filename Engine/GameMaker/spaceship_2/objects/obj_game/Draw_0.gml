draw_set_color(c_white);
draw_set_font(-1); // police par défaut
draw_text(20, 20, "Score: " + string(score_total));
for (var i = 0; i < vie; i++)
{
    draw_sprite(coeur, 0, 20 + (i * 40), 60);
}

if(gagne == true){
	draw_text(40, 20, "Victoire !");
}
if (perdu == true){
	draw_text(40, 20, "Perdu !");
}