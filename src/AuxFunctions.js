import { fireball } from './classes/Fireball.js';
import { tripleFireball } from './classes/TripleFireball.js';
import { bigFireball } from './classes/BigFireball.js';


export function makeFunctions(that) {

    that.Keystrokes.keyA = that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    that.Keystrokes.keyD = that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    that.Keystrokes.keyW = that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    that.Keystrokes.keyS = that.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    that.playerMoving = function() {
        const moveKeys = [this.cursors.left, this.Keystrokes.keyA, this.cursors.right, this.Keystrokes.keyD, this.cursors.up, this.Keystrokes.keyW, this.cursors.down,
            this.Keystrokes.keyS];

        for (var key of moveKeys) {
            if (key.isDown) {
                return true;
            }
        }

        return false;
    }

    that.running = function () {
        var p = this.PASSING_OBJ.playerData;

        if (!that.PASSING_OBJ.playerData.dead) {
            that.player.body.setVelocity(0);

            that.player.speed = p.velocity * p.velMultip;

            //console.log(p.velocity);
            //console.log(p.velMultip);

            if (that.player.speed != 0) {

                //Setting unit vectors for player's direction depending on which keys are pressed, giving upward left movement priority.
                if ((that.cursors.left.isDown || that.Keystrokes.keyA.isDown)&&(that.cursors.up.isDown || that.Keystrokes.keyW.isDown))
                {
                    that.player.directionX = -0.707106781187
                    that.player.directionY = -0.707106781187
                }
                else if ((that.cursors.right.isDown || that.Keystrokes.keyD.isDown)&&(that.cursors.up.isDown || that.Keystrokes.keyW.isDown))
                {
                    that.player.directionX = 0.707106781187
                    that.player.directionY = -0.707106781187
                }
                else if ((that.cursors.left.isDown || that.Keystrokes.keyA.isDown)&&(that.cursors.down.isDown || that.Keystrokes.keyS.isDown))
                {
                    that.player.directionX = -0.707106781187
                    that.player.directionY = 0.707106781187
                }
                else if ((that.cursors.right.isDown || that.Keystrokes.keyD.isDown)&&(that.cursors.down.isDown || that.Keystrokes.keyS.isDown))
                {
                    that.player.directionX = 0.707106781187
                    that.player.directionY = 0.707106781187
                }
                else if (that.cursors.left.isDown || that.Keystrokes.keyA.isDown)
                {
                    that.player.directionX = -1
                    that.player.directionY = 0
                }
                else if (that.cursors.up.isDown || that.Keystrokes.keyW.isDown)
                {
                    that.player.directionX = 0
                    that.player.directionY = -1
                }
                else if (that.cursors.right.isDown || that.Keystrokes.keyD.isDown)
                {
                    that.player.directionX = 1
                    that.player.directionY = 0
                }
                else if (that.cursors.down.isDown || that.Keystrokes.keyS.isDown)
                {
                    that.player.directionX = 0
                    that.player.directionY = 1
                }
                else
                {
                    that.player.directionX = 0
                    that.player.directionY = 0
                }

                //Setting the player's velocity based on their speed, and the previously determined unit vector for direction
                that.player.body.setVelocityX(that.player.speed * that.player.directionX);
                that.player.body.setVelocityY(that.player.speed * that.player.directionY);


                // Update the animation last and give left/right animations precedence over up/down animations
                if (that.cursors.left.isDown || that.Keystrokes.keyA.isDown)
                {
                    that.player.anims.play('left', true);
                }
                else if (that.cursors.right.isDown || that.Keystrokes.keyD.isDown)
                {
                    that.player.anims.play('right', true);
                }
                else if (that.cursors.up.isDown || that.Keystrokes.keyW.isDown)
                {
                    that.player.anims.play('up', true);
                }
                else if (that.cursors.down.isDown || that.Keystrokes.keyS.isDown)
                {
                    that.player.anims.play('down', true);
                }
                else
                {
                    that.player.anims.stop();
                }
            } else {
                that.player.anims.stop();
            }
        }
    }

    that.otherChecks = function () {
        var p = that.p;

        if (p.health <= 0 && !that.PASSING_OBJ.dead) {
            Death(that);
        }else if (p.health <= 0) {

        }

        if (p.mana < p.maxMana) {
            p.mana += p.manaRegenRate;
        }

        var sprintBarChange = this.p.maxSprint / this.p.maxSprintSecs / this.PASSING_OBJ.fps;

        if (this.p.sprinting && this.playerMoving()) {
            if (this.p.sprint > 0) {
                this.p.sprint -= sprintBarChange;
            }
        } else {
            if (this.p.sprint < this.p.maxSprint) {
                this.p.sprint += sprintBarChange;
            }
        }

        this.p.sprint = Math.max(0, Math.min(this.p.sprint, this.p.maxSprint));

        if (this.p.sprint == 0 && this.p.sprinting) {
            this.p.velMultip /= 2;
            this.p.sprinting = false;
        }
    }

    that.input.keyboard.on('keyup', keypressEnd, that);
    that.input.keyboard.on('keydown', keypressLoop, that);


    that.getAPack = function (player, pack) {
        that.PASSING_OBJ.playerData.healthPacks += 1;
        this.healthPack.destroy();
    }
}

export function controller (that) {
    var controller = that.input.gamepad.getPad(0)


    if (that.input.gamepad.total === 0)
    {
        return;
    } else {
        if (controller.L2 === 1) {
            throwFireball (that)
        } else if (controller.L1 === 1) {
            throwTripleFireball (that)
        }
    }

    if (controller.axes.length) {
        var axisH = controller.axes[0].getValue();
        var axisV = controller.axes[1].getValue();

        that.player.body.setVelocityX(that.PASSING_OBJ.playerData.velocity * axisH);
        that.player.body.setVelocityY(that.PASSING_OBJ.playerData.velocity * axisV);

        if (Math.abs(axisH) > Math.abs(axisV)) {
            if (axisH < 0) {
                that.player.anims.play('left', true);
            } else {
                that.player.anims.play('right', true);
            }

        }else if (Math.abs(axisH) < Math.abs(axisV)) {
            if (axisV < 0) {
                that.player.anims.play('up', true);
            } else {
                that.player.anims.play('down', true);
            }

        } else {
            that.player.anims.stop();
        }
    }

    if (controller.A === true) {
        that.PASSING_OBJ.playerData.velocity = 260;
    } else {
        that.PASSING_OBJ.playerData.velocity = 130;
    }

    console.log(controller);

}

export function Death (that) {
    that.player.setTint(0x444444);
    var checkpoint = that.PASSING_OBJ.playerData.checkpoint;
    that.PASSING_OBJ.playerData.dead = true;
    that.scene.pause();

    setTimeout( () => {
        /*
        that.PASSING_OBJ.playerData.maxHealth = checkpoint.maxHealth;
        that.PASSING_OBJ.playerData.healthPacks = checkpoint.healthPacks;
        that.PASSING_OBJ.playerData.velocity = checkpoint.velocity;
        that.PASSING_OBJ.playerData.manaEnabled = checkpoint.manaEnabled;
        that.PASSING_OBJ.playerData.maxMana = checkpoint.maxMana;
        that.PASSING_OBJ.playerData.mana = checkpoint.maxMana;
        that.PASSING_OBJ.playerData.health = checkpoint.maxHealth;
        that.PASSING_OBJ.playerData.x = checkpoint.x;
        that.PASSING_OBJ.playerData.y = checkpoint.y;
        that.PASSING_OBJ.playerData.sprint = checkpoint.maxSprint;
        that.scene.start(checkpoint.scene, that.PASSING_OBJ);
        that.PASSING_OBJ.playerData.dead = false;
        */

        //console.log(that.PASSING_OBJ);

        Object.assign(that.p, that.p.checkpoint); //sets all of the player's stats back to "checkpoint" stats

        //console.log('e');
        //console.log(that.PASSING_OBJ);

        that.scene.start(that.p.respawnScene, that.PASSING_OBJ);

        that.player.clearTint();
    }, 2000)
}

const fireCooldown = 200;

function throwFireball (that) {
    var p = that.PASSING_OBJ.playerData;

    if (p.mana >= p.manaCosts.smallFireball && that.fireballEnabled) {
        p.mana -= p.manaCosts.smallFireball;
        new fireball(that,that.player.x,that.player.y,2);
        that.fireballEnabled = false;
        setTimeout( () => {
            that.fireballEnabled = true;
        }, fireCooldown)
    }
}

function throwTripleFireball (that) {
    var p = that.PASSING_OBJ.playerData;

    if (p.mana >= p.manaCosts.tripleFireball && that.fireballEnabled) {
        p.mana -= p.manaCosts.tripleFireball;
        new tripleFireball(that,that.player.x,that.player.y,2);
        that.fireballEnabled = false;
        setTimeout( () => {
            that.fireballEnabled = true;
        }, fireCooldown)
    }
}

function throwBigFireball (that) {
    var p = that.PASSING_OBJ.playerData;

    if (that.fireballEnabled) {
        p.mana -= p.manaCosts.bigFireball;
        new bigFireball(that,that.player.x,that.player.y,5);
        that.fireballEnabled = false;
        setTimeout( () => {
            that.fireballEnabled = true;
        }, fireCooldown)
    }
}

function keypressLoop (event) {
    var code = event.keyCode;

    if (code === Phaser.Input.Keyboard.KeyCodes.SHIFT) {
        //console.log('e');

        if (!this.p.sprinting) {
            this.p.velMultip *= 2;
            this.p.sprinting = true;
        }

    } else if (code === Phaser.Input.Keyboard.KeyCodes.Z) {
        var p = this.PASSING_OBJ.playerData;

        if (!p.zStartTime) { //when the Z button starts being pressed
            p.zStartTime = Date.now();
            p.velMultip *= p.zVelMultip;

            //console.log('e');
        }
    }
}

function keypressEnd (event) {

    var code = event.keyCode;

    if (code === Phaser.Input.Keyboard.KeyCodes.T) {
        if (this.PASSING_OBJ.playerData.healthPacks > 0 && this.PASSING_OBJ.playerData.health < this.PASSING_OBJ.playerData.maxHealth) {
            this.PASSING_OBJ.playerData.health += 60;
            this.PASSING_OBJ.playerData.healthPacks -= 1;
        }
    } else if (code === Phaser.Input.Keyboard.KeyCodes.ESC) {
        this.scene.pause();
        this.scene.launch('pause',this.scene.key);

    } else if (code === Phaser.Input.Keyboard.KeyCodes.SHIFT) {
        if (this.p.sprinting) {
            this.p.velMultip /= 2;
            this.p.sprinting = false;
        }

    } else if (code === Phaser.Input.Keyboard.KeyCodes.M) {

        if (this.PASSING_OBJ.playerData.manaEnabled === false) {
            this.PASSING_OBJ.playerData.manaEnabled = true;
            this.PASSING_OBJ.playerData.mana = 100;
        } else {
            this.PASSING_OBJ.playerData.manaEnabled = false;
        }
    } else if (code === Phaser.Input.Keyboard.KeyCodes.O) {

        //cookie  =  this.PASSING_OBJ

        //put all of your code for input here
        //Pass through this.PASSING_OBJ

    } else if (code === Phaser.Input.Keyboard.KeyCodes.I) {

        //put all of your code for input here

        //this.PASSING_OBJ = cookie

    } else if (code === Phaser.Input.Keyboard.KeyCodes.Z) {
        var p = this.PASSING_OBJ.playerData;

        if (p.zStartTime) {
            var timeDiff = Date.now() - p.zStartTime;

            p.velMultip /= p.zVelMultip;
            p.zStartTime = null; //resets start time to nothing

            //console.log(timeDiff);

            if (timeDiff >= p.zChargeMax && p.mana >= p.manaCosts.bigFireball) { //needs 1,000 ms charge to get big fireball
                throwBigFireball(this);
            } else {
                throwFireball(this);
            }
        }

    } else if (code === Phaser.Input.Keyboard.KeyCodes.X) {
        throwTripleFireball(this);
    }
}
