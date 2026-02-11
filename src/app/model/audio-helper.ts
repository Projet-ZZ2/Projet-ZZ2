// src/utils/audioHelper.ts

/**
 * Joue un effet sonore situé dans le dossier public/assets/sounds
 * @param fileName Nom du fichier avec l'extension (ex: "unlock.mp3")
 */
export const playSound = (fileName: string, status: boolean) => {
    // On crée l'objet audio
    const audio = new Audio(`/assets/audio/${fileName}`);
    
    if(status === true){
        audio.volume = 0.4; 
    } else {
        audio.volume = 0.6;
    }

    // On joue le son
    audio.play().catch(err => {
        // Le catch est important car les navigateurs bloquent 
        // le son si l'utilisateur n'a pas encore interagi avec la page.
        console.warn("L'audio n'a pas pu être lancé :", err);
    });
};