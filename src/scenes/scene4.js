import { makeFunctions } from '../AuxFunctions.js';
import { controller } from '../AuxFunctions.js';
import { healthCrate } from '../classes/healthCrate.js';
import { bookEnemy } from '../classes/bookEntity.js';
import { makeDoor } from '../classes/door.js';

export class Scene4 extends Phaser.Scene {




    constructor ()
    {
        super('Scene4');
    }


     preload ()
{
    this.load.image('mainTileSheet-old', 'assets/TileSheets/Tiles_V6_extruded.png');
    this.load.tilemapCSV('scene4layer2', 'assets/MapCSVs/level4layer2.csv');
    this.load.tilemapCSV('scene4layer1', 'assets/MapCSVs/level4layer1.csv');
    this.load.tilemapCSV('scene4col', 'assets/MapCSVs/level4col.csv');
    this.load.spritesheet('player', 'assets/Entities/player.png', { frameWidth: 32, frameHeight: 32 });

    this.load.image('healthCrate', 'assets/Images/HealthCrateV1.png');
    this.load.spritesheet('book', 'assets/Entities/FlyingBook.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('fireBall', 'assets/Entities/FireBallV2.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('doors', 'assets/Entities/doors.png',{ frameWidth: 32, frameHeight: 64 });
}

init (data)
    {

        'use strict';

        this.PASSING_OBJ = data;
        this.p = data.playerData;
    }

 create ()
{


    var layer1map;
    var layer15map;
    var map;
    var collision;
    var spikeLayerMap
    this.Keystrokes = [];
    this.fireballEnabled = true

    layer1map = this.make.tilemap({ key: 'scene4layer1', tileWidth: 32, tileHeight: 32 });  //dark grass
    var tileset1 = layer1map.addTilesetImage('mainTileSheet-old', undefined, 32, 32, 1, 2);
    var layer1 = layer1map.createStaticLayer(0, tileset1, 0, 0);

    map = this.make.tilemap({ key: 'scene4layer2', tileWidth: 32, tileHeight: 32 });   //grass
    var tileset = map.addTilesetImage('mainTileSheet-old', undefined, 32, 32, 1, 2);
    var layer = map.createStaticLayer(0, tileset, 0, 0);

    collision = this.make.tilemap({ key: 'scene4col', tileWidth: 32, tileHeight: 32 });   //colision
    var tilesetCollision = collision.addTilesetImage();
    this.layer = collision.createStaticLayer(0, tilesetCollision, 0, 0);
    collision.setCollisionBetween(-1, 0);

    //console.log(this.PASSING_OBJ.playerData);

    this.player = this.physics.add.sprite(this.PASSING_OBJ.playerData.x, this.PASSING_OBJ.playerData.y, 'player', 1);
    this.player.setDepth(1);
    this.player.setSize(11, 32);
    this.player.setScale(1.5);


    this.player.anims.play('down', true);
    this.player.anims.stop();

    this.physics.add.collider(this.player, this.layer);

    this.cameras.main.setBounds(0, 0, collision.widthInPixels, collision.heightInPixels);
    this.cameras.main.startFollow(this.player);


    this.cursors = this.input.keyboard.createCursorKeys();
    makeFunctions(this);

    this.objects = [];
    //for doors, pass in (this, doorPosX, doorPosY, exitScene, exitPosX, exitPosY ,spritesheetValue)
    //Positions are in values of tiles, so they're multiplied by 32 later

    var csvSplitTwice = []

    Promise.all([
      fetch('assets/MapCSVs/level4col.csv').then(x => x.text()),
    ]).then((response) => {
      var responeSplitByNewLines = response[0].split("\n")
      var csvSpiltCounter = 0
      while (csvSpiltCounter < responeSplitByNewLines.length) {
        csvSplitTwice.push(responeSplitByNewLines[csvSpiltCounter].split(","));
        csvSpiltCounter++;
      }
    });

    this.currentObstacleCSV = csvSplitTwice

    this.objects.push(new makeDoor(this,15.5,2,'Scene1',7,3,10));
    this.objects.push(new makeDoor(this,17.5,2,'Scene5',3,7,8));

    this.entities = [];

    this.entities.push(new healthCrate(this,240,464));
    this.entities.push(new healthCrate(this,208,464));
    this.entities.push(new healthCrate(this,176,464));
    this.entities.push(new healthCrate(this,240,496));
    this.entities.push(new healthCrate(this,208,496));
    this.entities.push(new healthCrate(this,176,496));
    this.entities.push(new healthCrate(this,240,528));
    this.entities.push(new healthCrate(this,208,528));
    this.entities.push(new healthCrate(this,176,528));

    this.entities.push(new bookEnemy(this,944,560,120));
    // this.entities.push(new bookEnemy(this,656,976,120));

    var csvFetchArray = []

    this.graphics = this.add.graphics();
    this.graphics.defaultStrokeWidth = 100;




}

 update ()  {
     this.otherChecks();
     if (this.PASSING_OBJ.controller === false) {
        this.running();
     } else {
        controller(this);
     }
}


}
