import Enemy from './Enemy.js';

export class Boss extends Enemy {
    // constructors sets up Character object 
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
        this.minPosition = minPosition *
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        ameEnv.innerWidth;
        this.maxPosition = this.x + xPercentage * GameEnv.innerWidth;

        this.immune = 0;

        this.storeSpeed = this.speed;

        this.direction = "d"; // initially facing right

        //Define Speed of Enemy
        if (["easy", "normal"].includes(GameEnv.difficulty)) {
            this.storeSpeed = this.speed * Math.floor(Math.random() * 1.5 + 2);
        } else if (GameEnv.difficulty === "hard") {
            this.storeSpeed = this.speed * Math.floor(Math.random() * 3 + 3);
        } else {
            this.storeSpeed = this.speed * 5
        }
    }

    setAnimation(key) {
        // animation comes from playerData
        var animation = this.playerData[key]

        // set frame and idle frame
        this.setFrameY(animation.row);
        this.setMaxFrame(animation.frames);
        if (this.isIdle && animation.idleFrame) {
            this.setFrameX(animation.idleFrame.column)
            this.setMinFrame(animation.idleFrame.frames);
        }
    }

    update() {
        super.update();
    }

}

export default Boss;