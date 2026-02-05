export default class Player {
  id; // Unique identifier for the player
  score = 0; // Player's score
  paddle; // The paddle controlled by the player
  input = { up: false, down: false };
  constructor(id, paddle) {
    this.id = id;
    this.paddle = paddle;
  }
  setInput(action, value) {
    if (action === "MOVE_UP") this.input.up = value;
    if (action === "MOVE_DOWN") this.input.down = value;
  }
  // Get the player's unique identifier
  getPlayerId() {
    return this.id;
  }
  // Get the player's current score
  getPlayerScore() {
    return this.score;
  }
  // Increment the player's score by 1
  incrementScore() {
    this.score++;
  }
  // Get the paddle controlled by the player
  getPlayerPaddle() {
    return this.paddle;
  }
  // Reset the player's score to 0
  resetPlayer(y) {
    this.score = 0;
    this.getPlayerPaddle().reset(y);
  }
  // Set a new paddle for the player
  setPlayerPaddle(paddle) {
    this.paddle = paddle;
  }
  // Move the player's paddle up by deltaTime seconds
  // deltaTime is the time elapsed since the last update call
  // we use it to ensure consistent movement speed. It means
  // that the paddle will move the same distance regardless
  // of the frame rate. Without deltaTime, the paddle would move
  // faster on machines with higher frame rates.
  movePaddleUp(deltaTime) {
    this.paddle.moveUp(deltaTime);
  }
  // Move the player's paddle down by deltaTime seconds
  movePaddleDown(deltaTime) {
    this.paddle.moveDown(deltaTime);
  }
}
