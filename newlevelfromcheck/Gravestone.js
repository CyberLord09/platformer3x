import GameEnv from './GameEnv.js';
import GameObject from './GameObject.js';

export class Gravestone extends GameObject {
    constructor(canvas, image) {
        super(canvas, image, 0, 5, 2);
    }
    
    // Required, but no update action
    update() {
    }

    // Draw position is always 0,0
    draw() {
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }

    // Set Tree position
    size() {
        const desiredWidth = 200; 
        const desiredHeight = 200;
    
        const gravestoneX = 0.80 * GameEnv.innerWidth; // Position X coordinate
        const gravestoneY = GameEnv.bottom - desiredHeight; // Position Y coordinate
    
        // Set variables used in Display and Collision algorithms
        this.bottom = gravestoneY;
        this.collisionHeight = desiredHeight;
        this.collisionWidth = desiredWidth;
    
        this.canvas.style.width = `${desiredWidth}px`; // Set canvas width
        this.canvas.style.height = `${desiredHeight}px`; // Set canvas height
        this.canvas.style.position = 'absolute';
        this.canvas.style.left = `${gravestoneX}px`;
        this.canvas.style.top = `${gravestoneY}px`;
    }
    
}

export default Gravestone;