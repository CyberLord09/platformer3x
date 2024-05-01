import Character from './Character.js';
import GameEnv from './GameEnv.js';
import GameControl from './GameControl.js';

export class Enemy extends Character {
    // constructors sets up Character object 
    constructor(canvas, image, data, xPercentage, yPercentage, name, minPosition) {
        super(canvas, image, data, xPercentage, yPercentage, name, minPosition);

    }

    setAnimation(key) {
        // animation comes from playerData
        var animation = this.playerData[key]

        // set frame and idle frame
        this.setFrameY(animation.row);
        this.setMinFrame(animation.min ? animation.min : 0);
        this.setMaxFrame(animation.frames);
        if (this.isIdle && animation.idleFrame) {
            this.setFrameX(animation.idleFrame.column)
            this.setMinFrame(animation.idleFrame.frames);
        }
    }

    checkBoundaries(){
        // Check for boundaries
        if (this.x <= this.minPosition || (this.x + this.canvasWidth >= this.maxPosition)) {
            if (this.direction === "left") {
                this.direction = "right";
            }
            else if (this.direction === "right") {
                this.direction = "left";
            }
        };
    }

    updateMovement(){
        if (this.direction === "right") {
            this.speed = Math.abs(this.storeSpeed)
        }
        else if (this.direction === "left") {
            this.speed = -Math.abs(this.storeSpeed);
        }
        else if (this.direction === "idle") {
            this.speed = 0
        }
        else if (this.direction === "death") {
            this.speed = 0
        }

        // Move the enemy\
        this.x += this.speed;

        this.playerBottomCollision = false;
    }

    update() {
        super.update();

        this.setAnimation(this.direction);
        
        this.checkBoundaries();

        this.updateMovement();

    }

    // Player action on collisions
    collisionAction() {
        if (this.collisionData.touchPoints.other.id === "tube") {
            if (this.direction === "left" && this.collisionData.touchPoints.other.right) {
                this.direction = "right";
            }
            else if (this.direction === "right" && this.collisionData.touchPoints.other.left) {
                this.direction = "left";
            }

        }

        if (this.collisionData.touchPoints.other.id === "player") {
            // Collision: Top of Goomba with Bottom of Player
            //console.log(this.collisionData.touchPoints.other.bottom + 'bottom')
            //console.log(this.collisionData.touchPoints.other.top + "top")
            //console.log(this.collisionData.touchPoints.other.right + "right")
            //console.log(this.collisionData.touchPoints.other.left + "left")
            if (this.collisionData.touchPoints.other.bottom && this.immune == 0) {
                GameEnv.invincible = true;
                GameEnv.goombaBounce = true;
                GameEnv.playSound("goombaDeath");

                setTimeout((function () {
                    GameEnv.invincible = false;
                    this.destroy();
                }).bind(this), 1500);


            }
        }

        if (this.collisionData.touchPoints.other.id === "jumpPlatform") {
            if (this.direction === "left" && this.collisionData.touchPoints.other.right) {
                this.direction = "right";
            }
            else if (this.direction === "right" && this.collisionData.touchPoints.other.left) {
                this.direction = "left";
            }
        }
    }
}

export default Enemy;