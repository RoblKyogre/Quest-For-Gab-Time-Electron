import { makeFunctions } from '../AuxFunctions.js';
import { controller } from '../AuxFunctions.js';
import { healthCrate } from '../classes/healthCrate.js';
import { bookEnemy } from '../classes/bookEntity.js';
import { makeDoor } from '../classes/door.js';

export class Scene5 extends Phaser.Scene {




    constructor ()
    {
        super('Scene5');
    }


     preload ()
{
    this.load.image('mainTileSheet', 'assets/TileSheets/Tiles_main_extruded.png');
    this.load.tilemapCSV('scene5layer2', 'assets/MapCSVs/level5layer2.csv');
    this.load.tilemapCSV('scene5layer1', 'assets/MapCSVs/level5layer1.csv');
    this.load.tilemapCSV('scene5col', 'assets/MapCSVs/level5col.csv');
    this.load.spritesheet('player', 'assets/Entities/player.png', { frameWidth: 32, frameHeight: 32 });

    this.load.image('healthCrate', '/assets/Images/HealthCrateV1.png');
    this.load.spritesheet('book', '/assets/Entities/FlyingBook.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('fireBall', '/assets/Entities/FireBallV2.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('doors', '/assets/Entities/doors.png',{ frameWidth: 32, frameHeight: 64 });
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

    layer1map = this.make.tilemap({ key: 'scene5layer1', tileWidth: 32, tileHeight: 32 });  //dark grass
    var tileset1 = layer1map.addTilesetImage('mainTileSheet', undefined, 32, 32, 1, 2);
    var layer1 = layer1map.createStaticLayer(0, tileset1, 0, 0);

    map = this.make.tilemap({ key: 'scene5layer2', tileWidth: 32, tileHeight: 32 });   //grass
    var tileset = map.addTilesetImage('mainTileSheet', undefined, 32, 32, 1, 2);
    var layer = map.createStaticLayer(0, tileset, 0, 0);

    collision = this.make.tilemap({ key: 'scene5col', tileWidth: 32, tileHeight: 32 });   //colision
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

    this.objects.push(new makeDoor(this,10.5,2.6,'Scene4',7,3,6));

    var csvSplitTwice = []

    var client = new XMLHttpRequest();
    client.open('GET', '/assets/MapCSVs/level5col.csv');
    client.onreadystatechange = function() {
      // console.log(client.responseText);
      var csvSplitOnce = client.responseText.split("\n")
      // console.log(csvSplitOnce);
      var csvSpiltCounter = 0
      while (csvSpiltCounter < csvSplitOnce.length) {
        csvSplitTwice.push(csvSplitOnce[csvSpiltCounter].split(","));
        csvSpiltCounter++;
      }

      // console.log(csvSplitTwice)

    }
    this.currentObstacleCSV = csvSplitTwice
    client.send();

    this.entities = [];

    var csvFetchArray = []

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
