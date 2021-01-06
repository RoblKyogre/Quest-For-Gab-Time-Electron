import { initPathfinding } from './classes/Pathfinding.js';

export class init extends Phaser.Scene {




    constructor ()
    {
        super('init');
    }


     preload ()
    {
        this.load.spritesheet('player', 'assets/Entities/player.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('book', 'assets/Entities/FlyingBook.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('fireBall', 'assets/Entities/FireBallV2.png',{ frameWidth: 32, frameHeight: 32 });
    }

    init ()
    {
        'use strict';
            this.PASSING_OBJ = {
                fps : 60,
                controller : false,
                playerData : {
                    x : 272,
                    y : 128,
                    respawnScene: 'Scene4',
                    maxHealth : 300,
                    healthPacks : 0,
                    velocity : 100,
                    speed : 0,
                    directionX : 0,
                    directionY : 0,
                    velMultip: 1,
                    manaEnabled : true,
                    maxMana : 100,
                    mana : 100,
                    health : 300,
                    invinsFrames: false,
                    dead : false,
                    manaRegenRate : 0.2,
                    zStartTime: null,
                    zChargeMax: 1000,
                    zVelMultip: 0.5,
                    sprint: 100,
                    maxSprint: 100,
                    sprinting: false,
                    sprintVelMultip: 2,
                    maxSprintSecs: 5,
                    manaCosts: {
                        smallFireball: 10,
                        tripleFireball: 35,
                        bigFireball: 80,
                    },
                    checkpoint: {},
                    /*
                    checkpoint : {
                        x : 495,
                        y : 120,
                        scene: 'Scene1',
                        maxHealth : 300,
                        healthPacks : 0,
                        manaEnabled : true,
                        maxMana : 100,
                        maxSprint: 100,
                        velocity: 100
                    }
                    */
                }
            };

            this.p = this.PASSING_OBJ.playerData; //shortcut
            initPathfinding(this)

            //console.log(this.p);

            Object.assign(this.p.checkpoint, this.p); //checkpoint is basically a copy of a "fresh" player's stats, to draw from when the player respawns

    }

     create ()
    {


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 11, end: 19 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 1, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 21, end: 29 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 31, end: 39 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('book', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'FireThrowRight',
            frames: this.anims.generateFrameNumbers('fireBall', { start: 0, end: 4 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'FireThrowUp',
            frames: this.anims.generateFrameNumbers('fireBall', { start: 5, end: 9 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'FireThrowLeft',
            frames: this.anims.generateFrameNumbers('fireBall', { start: 10, end: 14 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'FireThrowDown',
            frames: this.anims.generateFrameNumbers('fireBall', { start: 15, end: 19 }),
            frameRate: 20,
            repeat: -1
        });

        // Global vars as properties of my object that
        // gets passed between all scenes


        // Pass it to every scene

        'use strict';

        this.scene.start('gui', this.PASSING_OBJ);
        this.scene.start('Scene4', this.PASSING_OBJ);



    }

}
