import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    titleText: Phaser.GameObjects.Text;
    uiContainer: Phaser.GameObjects.Container;
    buttonsContainer: Phaser.GameObjects.Container;
    playButton: Phaser.GameObjects.Container;
    quitButton: Phaser.GameObjects.Container;
    particles: Phaser.GameObjects.Particles.ParticleEmitter | null = null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.camera = this.cameras.main;
        
        
        // Fond dégradé élégant
        this.createBackground();
        
        // Créer un container principal pour tous les éléments UI
        this.uiContainer = this.add.container(this.scale.width / 2, this.scale.height / 2);
        this.uiContainer.setDepth(100); // UI au premier plan

        // Créer le titre du jeu
        this.createTitle();
        
        // Créer les boutons du menu
        this.createMenuButtons();
        
        // Créer des effets de particules d'arrière-plan
        this.createParticleEffects();

        // Ajouter une animation d'entrée
        this.animateMenuEntrance();

        // Écouter les changements de taille
        this.scale.on('resize', this.resize, this);
        EventBus.emit('current-scene-ready', this);
    }

    createBackground()
    {
        // Créer un fond dégradé
        const graphics = this.add.graphics();
        graphics.setDepth(0); // Fond à la profondeur 0
        
        // Dégradé vertical du bleu foncé au noir
        graphics.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x16213e, 0x0f3460, 1);
        graphics.fillRect(0, 0, this.scale.width, this.scale.height);
    }

    
    createTitle()
    {
        this.titleText = this.add.text(0, -150, 'RESPECTE TON CLIENT !!!', {
            fontFamily: 'Arial Black',
            fontSize: 48,
            color: '#ffffff',
            stroke: '#4a90e2',
            strokeThickness: 4,
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#000000',
                blur: 5,
                fill: true
            }
        }).setOrigin(0.5);

        this.uiContainer.add(this.titleText);

        // Animation du titre
        this.tweens.add({
            targets: this.titleText,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    createMenuButtons()
    {
        this.buttonsContainer = this.add.container(0, 50);
        
        // Créer les boutons
        this.playButton = this.createMenuButton('JOUER', 0, -30, () => {
            this.startGame();
        });

        this.quitButton = this.createMenuButton('QUITTER', 0, 120, () => {
            this.quitGame();
        });

        this.buttonsContainer.add([this.playButton, this.quitButton]);
        this.uiContainer.add(this.buttonsContainer);
    }

    createMenuButton(text: string, x: number, y: number, callback: () => void): Phaser.GameObjects.Container
    {
        const button = this.add.container(x, y);
        
        // Fond du bouton
        const buttonBg = this.add.graphics();
        buttonBg.fillStyle(0x2c3e50, 0.8);
        buttonBg.fillRoundedRect(-100, -20, 200, 40, 10);
        buttonBg.lineStyle(2, 0x4a90e2, 1);
        buttonBg.strokeRoundedRect(-100, -20, 200, 40, 10);
        
        // Texte du bouton
        const buttonText = this.add.text(0, 0, text, {
            fontFamily: 'Arial',
            fontSize: 18,
            color: '#ffffff'
        }).setOrigin(0.5);

        button.add([buttonBg, buttonText]);
        
        // Interactivité
        button.setSize(200, 40);
        button.setInteractive();
        
        // Effets de survol
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 200,
                ease: 'Power2'
            });
            
            buttonBg.clear();
            buttonBg.fillStyle(0x4a90e2, 0.9);
            buttonBg.fillRoundedRect(-100, -20, 200, 40, 10);
            buttonBg.lineStyle(2, 0x74b9ff, 1);
            buttonBg.strokeRoundedRect(-100, -20, 200, 40, 10);
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scaleX: 1,
                scaleY: 1,
                duration: 200,
                ease: 'Power2'
            });
            
            buttonBg.clear();
            buttonBg.fillStyle(0x2c3e50, 0.8);
            buttonBg.fillRoundedRect(-100, -20, 200, 40, 10);
            buttonBg.lineStyle(2, 0x4a90e2, 1);
            buttonBg.strokeRoundedRect(-100, -20, 200, 40, 10);
        });

        button.on('pointerdown', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.95,
                scaleY: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: callback
            });
        });

        return button;
    }

    createParticleEffects()
    {
        // Créer quelques éléments décoratifs simples
        for (let i = 0; i < 10; i++) {
            const decoration = this.add.circle(
                Phaser.Math.Between(50, this.scale.width - 50),
                Phaser.Math.Between(50, this.scale.height - 50),
                Phaser.Math.Between(2, 5),
                0x4a90e2,
                0.3
            );
            
            // Animation flottante
            this.tweens.add({
                targets: decoration,
                y: decoration.y - 20,
                duration: Phaser.Math.Between(3000, 5000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }

    animateMenuEntrance()
    {
        // Animation d'entrée du titre
        this.titleText.setAlpha(0);
        this.titleText.setScale(0.5);
        
        this.tweens.add({
            targets: this.titleText,
            alpha: 1,
            scaleX: 1,
            scaleY: 1,
            duration: 1000,
            ease: 'Back.easeOut'
        });

        // Animation d'entrée des boutons avec délai - utiliser les positions initiales
        const buttons = [this.playButton, this.quitButton];
        buttons.forEach((button, index) => {
            const originalY = button.y;
            button.setAlpha(0);
            button.setY(originalY + 50);
            
            this.tweens.add({
                targets: button,
                alpha: 1,
                y: originalY,
                duration: 600,
                delay: 200 + (index * 100),
                ease: 'Power2.easeOut'
            });
        });
    }

    startGame()
    {
        this.cameras.main.fadeOut(500, 0, 0, 0);
        this.time.delayedCall(500, () => {
            this.scene.start('Game');
        });
    }

    quitGame()
    {
        // Animation de fermeture
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
            // En contexte web, on peut juste retourner à l'écran précédent
            window.history.back();
        });
    }

    resize(gameSize: { width: number, height: number })
    {
        // Repositionner le container principal
        this.uiContainer.setPosition(gameSize.width / 2, gameSize.height / 2);
        
        // Redessiner le fond
        this.children.getChildren().forEach((child) => {
            if (child instanceof Phaser.GameObjects.Graphics) {
                child.destroy();
            }
        });
        this.createBackground();
    }
}
