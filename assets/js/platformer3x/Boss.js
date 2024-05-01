import GameEnv from './GameEnv.js';
import Character from './Character.js';
import GameControl from './GameControl.js';
import Enemy from './Enemy.js';


export class Boss extends Enemy {
    // instantiation: constructor sets up player object 
    constructor(canvas, image, data, xPercentage, yPercentage, name, minPosition) {
        super(canvas, image, data, 0.0, 0.2);

        this.playerData = data;
        //Unused but must be Defined
        this.name = name;
        this.y = yPercentage;

        this.isIdle = false;
        //Initial Position of Goomba
        this.x = xPercentage * GameEnv.innerWidth;



        //Access in which a Goomba can travel    
        this.minPosition = minPosition * GameEnv.innerWidth;
        this.maxPosition = this.x + xPercentage * GameEnv.innerWidth;

        this.immune = 0;

        this.storeSpeed = this.speed;

        this.direction = "right"; // initially facing right\
        //Define Speed of Enemy
        if (["easy", "normal"].includes(GameEnv.difficulty)) {
            this.speed = this.speed * Math.floor(Math.random() * 1.5 + 2);
        } else if (GameEnv.difficulty === "hard") {
            this.speed = this.speed * Math.floor(Math.random() * 3 + 3);
        } else {
            this.speed = this.speed * 5
        }

    }

    updateFrameX() {
        // Update animation frameX of the object
        if(!GameEnv.BossDeath || this.direction != "death"){
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
        else if(GameEnv.BossDeath && this.direction == "death"){
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
                GameEnv.BossDeath = false;
            }
        }

    }

    update() {
        super.update();

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

        if (this.direction === "idleL") {
            this.speed = 0
        }
        else if (this.direction === "idleR") {
            this.speed = 0
        }
    }

    collisionAction() {
        super.collisionAction();


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
                if(!GameEnv.BossDeath && this.direction == "death"){
                    this.frameX = 0;
                }
                GameEnv.BossDeath = true;
                GameEnv.invincible = true;
                GameEnv.goombaBounce = true;
                GameEnv.playSound("goombaDeath");
            }
            
        }
    }

}

export default Boss;