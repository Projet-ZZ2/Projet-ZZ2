import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;
    uiContainer: Phaser.GameObjects.Container;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        // Créer un container pour les éléments UI
        this.uiContainer = this.add.container(this.scale.width / 2, this.scale.height / 2);

        // Ajouter les éléments au container (position relative au container)
        this.background = this.add.image(0, 0, 'background');
        this.background.setAlpha(0.5);
        
        this.gameText = this.add.text(0, 0, 'Make something fun!\nand share it with us:\nsupport@phaser.io', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // Ajouter au container
        this.uiContainer.add([this.background, this.gameText]);

        // Écouter les changements de taille
        this.scale.on('resize', this.resize, this);

        EventBus.emit('current-scene-ready', this);
    }

    resize(gameSize: { width: number, height: number })
    {
        // Repositionner seulement le container - tous les éléments suivent automatiquement !
        this.uiContainer.setPosition(gameSize.width / 2, gameSize.height / 2);
    }

    changeScene ()
    {
        this.scene.start('Game');
    }
}
