// On définit une interface pour le Bus pour garder le typage
interface IEventBus {
    on: (event: string, callback: Function) => void;
    emit: (event: string, ...args: any[]) => void;
    off: (event: string) => void;
    once: (event: string, callback: Function) => void;
}

// 1. On crée un mock (objet vide) pour le serveur
const serverMock: IEventBus = {
    on: () => {},
    emit: () => {},
    off: () => {},
    once: () => {}
};

export let EventBus: IEventBus = serverMock;

// 2. Si on est dans le navigateur, on remplace le mock par le vrai bus Phaser
if (typeof window !== 'undefined') {
    // On utilise l'import dynamique (ESM) plutôt que require
    import('phaser').then(Phaser => {
        EventBus = new Phaser.Events.EventEmitter();
    });
}