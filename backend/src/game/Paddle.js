class Paddle {
    width; // Width of the paddle 
    height; // Height of the paddle 
    x; // X position of the paddle 
    y; // Y position of the paddle
    speed; // Speed of the paddle 
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
    // Speed is in pixels per second. It indicates how 
    // fast the paddle moves up and down the screen. 
    // For example if speed = 300 it means the paddle moves
    // 300 pixels in one second. 
    // deltaTime is in seconds. It represents the time 
    // elapsed since the last update call. For example, 
    // if the game is running at 60 frames per second 
    // deltaTime would be approximately 1/60 or 0.0167 
    // seconds.
    // Move the paddle up by adjusting its Y position
    // moveUp is called with deltaTime to ensure
    // consistent movement speed regardless of frame rate 
    // of our machine.
    // For example if speed = 300 pixels/second and
    // deltaTime = 1/60 seconds (for 60 FPS), then 
    // the paddle will move up or down by 300 * (1/60) = 5 pixels.
    // We used deltaTime to scale the movement because 
    // if the game runs at different frame rates on different 
    // machines, the paddle would move at different speeds 
    // without deltaTime scaling. So using deltaTime ensures 
    // consistent movement speed across various frame rates. 
    moveUp(deltaTime) {
        this.y -= this.speed * deltaTime;
    }
    // Move the paddle down by adjusting its Y position 
    moveDown(deltaTime) {
        this.y += this.speed * deltaTime;
    }
    // Get the current bounds of the paddle for 
    // collision detection. Bounds include position 
    // and size of the paddle. 
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    };
    reset(y) {
        this.y = y;
    }
}
export default Paddle;
