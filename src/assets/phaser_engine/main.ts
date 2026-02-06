import { AUTO, Game } from 'phaser';
import { Game as MainGame } from './scenes/Game';

const StartGame = (parent: string) => {
    const config: Phaser.Types.Core.GameConfig = {
        type: AUTO,
        parent,
        backgroundColor: '#028af8',
        scene: [MainGame],
        scale: {
            mode: Phaser.Scale.RESIZE,
            autoCenter: Phaser.Scale.CENTER_BOTH
        }
    };
    
    return new Game(config);
}

export default StartGame;