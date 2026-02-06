import { AUTO, Game } from 'phaser';
import {Game as MainGame} from './scenes/Game'


const windowWidth = typeof window !== 'undefined' ? window.innerWidth: 1920;
const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1080; 

const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: windowWidth,
    height: windowHeight,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        MainGame
     ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });
}

export default StartGame;
