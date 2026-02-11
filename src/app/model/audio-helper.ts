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

// model/audio-helper.ts

let backgroundMusic: HTMLAudioElement | null = null;

export const playBackgroundMusic = (fileName: string) => {
  // On évite de lancer la musique plusieurs fois
  if (backgroundMusic) return; 

  backgroundMusic = new Audio(`/assets/audio/${fileName}`);
  backgroundMusic.loop = true; // Active la répétition automatique
  backgroundMusic.volume = 0.2; // Musique plus douce que les bruitages
  
  backgroundMusic.play().catch(err => {
    console.warn("La musique n'a pas pu démarrer (interaction requise) :", err);
  });
};

export const stopBackgroundMusic = () => {
  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic = null;
  }
};