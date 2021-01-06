import { makeFunctions } from '../AuxFunctions.js';
import { controller } from '../AuxFunctions.js';
import { healthCrate } from '../classes/healthCrate.js';
import { bookEnemy } from '../classes/bookEntity.js';
import { makeDoor } from '../classes/door.js';

export class Scene3 extends Phaser.Scene {




    constructor ()
    {
        super('Scene3');
    }


     preload ()
{
    this.load.image('tiles', 'assets/TileSheets/grass_tiles.png');
    this.load.tilemapCSV('layer3', 'assets/MapCSVs/Maps3_TileLayer4.csv');
    this.load.tilemapCSV('layer1', 'assets/MapCSVs/Maps3_BottomGrass.csv');
    this.load.tilemapCSV('layer2', 'assets/MapCSVs/Maps3_Grass.csv');
    this.load.tilemapCSV('layer4', 'assets/MapCSVs/Maps3_ExtraBuilding.csv');
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
    var layer2map;
    var map;
    var spikeLayerMap
    this.Keystrokes = [];
    this.fireballEnabled = true

    layer1map = this.make.tilemap({ key: 'layer1', tileWidth: 32, tileHeight: 32 });  //dark grass
    var tileset1 = layer1map.addTilesetImage('tiles');
    var layer1 = layer1map.createStaticLayer(0, tileset1, 0, 0);
    //layer1map.setCollisionBetween(5, 6);

    layer2map = this.make.tilemap({ key: 'layer2', tileWidth: 32, tileHeight: 32 });  //concrete
    var tileset2 = layer2map.addTilesetImage('tiles');
    this.layer = layer2map.createStaticLayer(0, tileset2, 0, 0);
    layer2map.setCollisionBetween(-1, -1);

    map = this.make.tilemap({ key: 'layer3', tileWidth: 32, tileHeight: 32 });   //grass
    var tileset = map.addTilesetImage('tiles');
    var layer2 = map.createStaticLayer(0, tileset, 0, 0);


    this.player = this.physics.add.sprite(this.PASSING_OBJ.playerData.x, this.PASSING_OBJ.playerData.y, 'player', 1);
    this.player.setDepth(1);
    this.player.setSize(11, 30);
    this.player.setScale(1.5);

    this.player.anims.play('down', true);
    this.player.anims.stop();

    this.physics.add.collider(this.player, this.layer);

    this.cameras.main.setBounds(0, 0, layer1map.widthInPixels, layer1map.heightInPixels);
    this.cameras.main.startFollow(this.player);


    this.cursors = this.input.keyboard.createCursorKeys();
    makeFunctions(this);

    this.objects = [];

    this.objects.push(new healthCrate(this,400,400));

    this.entities = [];

    this.entities.push(new bookEnemy(this,800,400,60));
    /*this.entities.push(new bookEnemy(this,800,400));  //Pass in this object, x and y
    this.entities.push(new bookEnemy(this,800,500));
    this.entities.push(new bookEnemy(this,800,600));
    this.entities.push(new bookEnemy(this,800,700));
    this.entities.push(new bookEnemy(this,800,800));
    this.entities.push(new bookEnemy(this,800,900));
    this.entities.push(new bookEnemy(this,800,1000));
    this.entities.push(new bookEnemy(this,800,1100));
    this.entities.push(new bookEnemy(this,800,1200));
    this.entities.push(new bookEnemy(this,800,1300));*/

}

 update ()  {
     this.otherChecks();
     if (this.PASSING_OBJ.controller === false) {
        this.running();
     } else {
        controller(this);
     }

     if(this.entities.length === 0) {
         this.entities.push(new makeDoor(this,14.5,2,'Scene1',15.5,3,4));
         this.entities.push(new makeDoor(this,16.5,2,'Scene4',15.5,3,10)); //pushing it to entities only so it doesn't keep making doors
                                                                       //doors SHOULD be pushed to objects
     }
}


}
