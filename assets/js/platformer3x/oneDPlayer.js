import GameEnv from './GameEnv.js';
import Player from './Player.js';
import BasePlayer from './BasePlayer.js';
import GameControl from './GameControl.js';
/**
 * @class oneDPlayer class
 * @description oneDPlayer.js key objective is to eent the user-controlled character in the game.   
 * 
 * The oneDPlayer class extends the Player class, which in turn extends the GameObject class.
 * Animations and events are activated by key presses, collisions, and gravity.
 * WASD keys are used by user to control The oneDPlayer object.  
 * 
 * @extends Player
 */
export class oneDPlayer extends BasePlayer {
    // instantiation: constructor sets up oneDPlayer object 
    constructor(canvas, image, data, widthPercentage = 0.3, heightPercentage = 0.8) {
        super(canvas, image, data, widthPercentage, heightPercentage);
        // oneDPlayer Data is required for Animations
        this.playerData = data;
        GameEnv.invincible = false; 

        // oneDPlayer control data
        this.moveSpeed = this.speed * 3;
        this.pressedKeys = {};
        this.movement = {up: true, down: true, left: true, right: true};
        this.isIdle = true;
        this.directionKey = "d"; // initially facing right

        // Store a reference to the event listener function
        this.keydownListener = this.handleKeyDown.bind(this);
        this.keyupListener = this.handleKeyUp.bind(this);

        // Add event listeners
        document.addEventListener('keydown', this.keydownListener);
        document.addEventListener('keyup', this.keyupListener);

        GameEnv.oneDPlayer = this;
        this.transitionHide = false;
        this.shouldBeSynced = true;
        this.isDying = false;
        this.isDyingR = false;
        this.timer = false;

        this.name = GameEnv.userID;
    }


   
    /**
     * gameloop: updates the oneDPlayer's state and position.
     * In each refresh cycle of the game loop, the oneDPlayer-specific movement is updated.
     * - If the oneDPlayer is moving left or right, the oneDPlayer's x position is updated.
     * - If the oneDPlayer is dashing, the oneDPlayer's x position is updated at twice the speed.
     * This method overrides Character.update, which overrides GameObject.update. 
     * @override
     */

    update() {
        //Update the oneDPlayer Position Variables to match the position of the oneDPlayer
        GameEnv.PlayerPosition.playerX = this.x;
        GameEnv.PlayerPosition.playerY = this.y;

        // GoombaBounce deals with oneDPlayer.js and goomba.js
        if (GameEnv.goombaBounce === true) {
            GameEnv.goombaBounce = false;
            this.y = this.y - 100;
        }

        if (GameEnv.goombaBounce1 === true) {
            GameEnv.goombaBounce1 = false; 
            this.y = this.y - 250
        } 

        // oneDPlayer moving right 
        if (this.isActiveAnimation("a")) {
            if (this.movement.left) this.x -= this.isActiveAnimation("s") ? this.moveSpeed : this.speed;  // Move to left
            this.canvas.style.transform = 'scaleX(-1)';
        }
        // oneDPlayer moving left
        if (this.isActiveAnimation("d")) {
            if (this.movement.right) this.x += this.isActiveAnimation("s") ? this.moveSpeed : this.speed;  // Move to right
            this.canvas.style.transform = 'none';
        }
        // oneDPlayer moving at dash speed left or right 
        if (this.isActiveAnimation("s")) {}

        // oneDPlayer jumping
        if (this.isActiveGravityAnimation("w")) {
            GameEnv.playSound("PlayerJump");
            if (this.gravityEnabled) {
                if (GameEnv.difficulty === "easy") {
                    this.y -= (this.bottom * .50);  // bottom jump height
                } else if (GameEnv.difficulty === "normal") {
                    this.y -= (this.bottom * .40);
                } else {
                    this.y -= (this.bottom * .30);
                }
            } else if (this.movement.down === false) {
                this.y -= (this.bottom * .15);  // platform jump height
            }
        }

        //Prevent oneDPlayer from Dashing Through Tube
        let tubeX = (.80 * GameEnv.innerWidth)
        if (this.x >= tubeX && this.x <= GameEnv.innerWidth) {
            this.x = tubeX - 1;

            GameEnv.backgroundHillsSpeed = 0;
            GameEnv.backgroundMountainsSpeed = 0;
        }

        //Prevent oneDPlayer from Leaving from Screen
        if (this.x < 0) {
            this.x = 1;

            GameEnv.backgroundHillsSpeed = 0;
            GameEnv.backgroundMountainsSpeed = 0;
        }

        // Perform super update actions
        super.update();

        // To put mario in the air after stepping on the goomba
        if (GameEnv.goombaBoost === true) {
            GameEnv.goombaBoost = false;
            this.y = this.y - 150;
        }
    }
}

export default oneDPlayer;