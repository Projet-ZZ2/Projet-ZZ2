if (!signal_envoye) {
    signal_envoye = true;
    show_debug_message("Envoi du signal gameFinished");

    // Envoi d'un message simple à la page
    window_post_message("gameFinished");
}
