import { makeFunctions } from '../AuxFunctions.js';
import { controller } from '../AuxFunctions.js';
import { healthCrate } from '../classes/healthCrate.js';
import { bookEnemy } from '../classes/bookEntity.js';
import { makeDoor } from '../classes/door.js';

export class Scene1 extends Phaser.Scene {




    constructor ()
    {
        super('Scene1');
    }


     preload ()
{
    this.load.image('tiles', 'assets/TileSheets/grass_tiles.png');
    this.load.image('concrete', 'assets/TileSheets/concrete_tiles.png');
    this.load.image('spike', 'assets/TileSheets/Spikes.png');
    this.load.tilemapCSV('map', 'assets/MapCSVs/level1layer2.csv');
    this.load.tilemapCSV('layer1', 'assets/MapCSVs/level1layer1.csv');
    this.load.tilemapCSV('layer15', 'assets/MapCSVs/level1layer15.csv');
    this.load.tilemapCSV('spikeCSV', 'assets/MapCSVs/spike.csv');
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
    var spikeLayerMap
    this.Keystrokes = [];
    this.fireballEnabled = true

    layer1map = this.make.tilemap({ key: 'layer1', tileWidth: 32, tileHeight: 32 });  //dark grass
    var tileset1 = layer1map.addTilesetImage('tiles');
    var layer1 = layer1map.createStaticLayer(0, tileset1, 0, 0);
    //layer1map.setCollisionBetween(5, 6);

    layer15map = this.make.tilemap({ key: 'layer15', tileWidth: 32, tileHeight: 32 });  //concrete
    var tileset15 = layer15map.addTilesetImage('concrete');
    var layer15 = layer15map.createStaticLayer(0, tileset15, 0, 0);
    //layer1map.setCollisionBetween(5, 6);

    map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });   //grass
    var tileset = map.addTilesetImage('tiles');
    this.layer = map.createStaticLayer(0, tileset, 0, 0);
    map.setCollisionBetween(70, 70);
    map.setCollisionBetween(-1, -1);

    spikeLayerMap = this.make.tilemap({ key: 'spikeCSV', tileWidth: 32, tileHeight: 32 });  //doors
    var spikeMap = spikeLayerMap.addTilesetImage('spike');
    var spikeLayer = spikeLayerMap.createStaticLayer(0, spikeMap, 0, 0);
    spikeLayerMap.setCollisionBetween(7, 10);

    //console.log(this.PASSING_OBJ.playerData);

    this.player = this.physics.add.sprite(this.PASSING_OBJ.playerData.x, this.PASSING_OBJ.playerData.y, 'player', 1);
    this.player.setDepth(1);
    this.player.setSize(11, 32);
    this.player.setScale(1.5);


    this.player.anims.play('down', true);
    this.player.anims.stop();

    this.physics.add.collider(this.player, this.layer);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);


    this.cursors = this.input.keyboard.createCursorKeys();
    makeFunctions(this);

    this.objects = [];
    //for doors, pass in (this, doorPosX, doorPosY, exitScene, exitPosX, exitPosY ,spritesheetValue)
    //Positions are in values of tiles, so they're multiplied by 32 later

    this.objects.push(new makeDoor(this,15.5,2,'Scene3',7,3,4));

    this.entities = [];

    this.entities.push(new healthCrate(this,400,400));
    this.entities.push(new bookEnemy(this,800,400,120));




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
