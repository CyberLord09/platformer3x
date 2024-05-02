import GameEnv from './GameEnv.js';
import Character from './Character.js';
import GameControl from './GameControl.js';
import Enemy from './Enemy.js';


export class Boss extends Enemy {
    // instantiation: constructor sets up player object 
    constructor(canvas, image, data, xPercentage, yPercentage, name, minPosition) {
        super(canvas, image, data, xPercentage, yPercentage, name, minPosition);

        this.storeSpeed = this.speed;

        this.direction = "right"; // initially facing right\

        this.death = false;
    }
    //overwrite the method
    updateFrameX() {
        // Update animation frameX of the object
        if(!this.death || this.direction != "death"){
            if (this.frameX < this.maxFrame) {
                if(this.counter > 0){
                    this.frameX = this.frameX; 
                    this.counter--;
                }
                else{
                    this.frameX++
                    this.counter = this.animationSpeed;
                }
            } else {
                this.frameX = this.minFrame;
            }
        }
        else if(this.death && this.direction == "death"){
            this.animationSpeed = 50;
            if (this.frameX < this.maxFrame) {
                if(this.counter > 0){
                    this.frameX = this.frameX; 
                    this.counter--;
                }
                else{
                    this.frameX++
                    this.counter = this.animationSpeed;
                }
            } else {
                this.destroy();
            }
        }

    }

    //overwrite the method
    updateMovement(){
        if (this.direction === "right") {
            this.speed = Math.abs(this.storeSpeed)
        }
        else if (this.direction === "left") {
            this.speed = -Math.abs(this.storeSpeed);
        }
        else if (this.direction === "death") {
            this.speed = 0
        }
        else if (this.direction === "idleL") {
            this.speed = 0
        }
        else if (this.direction === "idleR") {
            this.speed = 0
        }

        // Move the enemy\
        this.x += this.speed;

        this.playerBottomCollision = false;
    }

    randomEvent(){
        if (GameControl.randomEventId === 1 && GameControl.randomEventState === 2){ //event: stop the zombie
            this.direction = "idleL"; 
            GameControl.endRandomEvent();
        }
        else if (GameControl.randomEventId === 2 && GameControl.randomEventState === 2){ //event: stop the zombie
            this.direction = "idleR"; 
            GameControl.endRandomEvent();
        }
        else if (GameControl.randomEventId === 3 && GameControl.randomEventState === 2){ //event: stop the zombie
            this.direction = "left"; 
            GameControl.endRandomEvent();
        }
        else if (GameControl.randomEventId === 4 && GameControl.randomEventState === 2){ //event: stop the zombie
            this.direction = "right"; 
            GameControl.endRandomEvent();
        }
    }

    update() {
        super.update();

        this.randomEvent();


    }

    //overwrite the method
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
            if (this.collisionData.touchPoints.other.right && !this.collisionData.touchPoints.other.bottom) {
                this.x--
                this.direction = "attackL"; 
                this.speed = 0;
            }
            else if(this.collisionData.touchPoints.other.left && !this.collisionData.touchPoints.other.bottom){
                this.x++
                this.direction = "attackR"; 
                this.speed = 0;
            }
            else if(this.collisionData.touchPoints.other.bottom && this.immune == 0){
                this.direction = "death";
                if(!this.death && this.direction == "death"){
                    this.frameX = 0;
                }
                this.death = true;
                GameEnv.invincible = true;
                GameEnv.goombaBounce = true;
                GameEnv.playSound("goombaDeath");
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

export default Boss;