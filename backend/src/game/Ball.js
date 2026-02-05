// Modify this class to add radius
// because the ball is not a point
// but has a size. For now we will
// consider the ball as a point for
// simplicity
class Ball {
  x; // X coordinate of the ball(horizontal position)
  y; // Y coordinate of the ball(vertical position)
  // The ! below tells TypeScript that we are sure
  // these properties will be initialized before they
  // are used, even though they are not initialized
  // in the constructor
  vx; // Velocity in the X direction
  vy; // Velocity in the Y direction
  speed; // Speed of the ball
  radius = 10; // Radius of the ball

  // Speed is in pixels per second. It indicates how
  // fast the paddle moves up and down the screen.
  // For example if speed = 300 it means the paddle moves
  // 300 pixels in one second.
  // deltaTime is in seconds. It represents the time
  // elapsed since the last update call. For example,
  // if the game is running at 60 frames per second
  // deltaTime would be approximately 1/60 or 0.0167
  // seconds.

  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.reset(); // Initialize ball position randomly and velocity
  }

  update(deltaTime) {
    this.x += this.vx * deltaTime; // Update X position based on velocity X and time
    this.y += this.vy * deltaTime; // Update Y
  }

  reset() {
    // This two coordinates can be adjusted based on the game field size
    this.x = 400; // Reset to center X position
    this.y = 300; // Reset to center Y position

    // Randomize initial angle between -30 to 30
    // defined in radians
    // It is calculated by generating a random number
    // between 0 and 1, scaling it to the range of
    // π/3 (60 degrees), and then shifting it down
    // by π/6 (30 degrees). This is important to
    // ensure the ball does not move too vertically
    // or horizontally at the start of the game.
    const angle = (Math.random() * Math.PI) / 3 - Math.PI / 6;

    // Randomly decide the initial direction of the ball
    // along the X axis (left or right). We dont need to
    // randomize the Y direction because the angle already
    // takes care of that. But we need to set the direction
    // for the X axis to ensure the ball moves either left
    // or right at the start of the game; because Math.cos(angle)
    // will always return a positive value for angles
    // between -30 and 30 degrees. To achieve this, we generate
    // a random number between 0 and 1.
    const dir = Math.random() < 0.5 ? 1 : -1;

    // Calculate velocity components based on angle and speed.
    // The velocity in the X direction is calculated
    // using the cosine of the angle that gives the horizontal
    // component of the ball's movement. This value is then
    // multiplied by the speed of the ball which determines
    // how fast the ball moves horizontally.
    this.vx = Math.cos(angle) * this.speed * dir;
    // The velocity in the Y direction is calculated
    // using the sine of the angle that gives the vertical
    // component of the ball's movement. This value is then
    // multiplied by the speed of the ball which determines
    // how fast the ball moves vertically.
    this.vy = Math.sin(angle) * this.speed;
    // this.speed = initialSpeed;
  }

  resetSpeed(initialSpeed) {
    this.speed = initialSpeed;
  }
  // Invert the X velocity to simulate a bounce
  // when hitting a paddle
  bounceX() {
    this.vx = -this.vx;
  }

  // Invert the Y velocity to simulate a bounce
  // when hitting the top or bottom walls
  bounceY() {
    this.vy *= -1;
  }

  // Get current position or state of the ball
  // Returns an object with x and y properties
  getState() {
    return { x: this.x, y: this.y, radius: this.radius };
  }

  getVelocity() {
    return { vx: this.vx, vy: this.vy };
  }

  setPosition(x, y) {
    this.x = x;
    if (y !== undefined) {
      this.y = y;
    }
  }
  setSpeed(ratio) {
    this.speed *= ratio;
  }
}

export default Ball;
