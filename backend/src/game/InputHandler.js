// InputHandler.ts manages player inputs
// and translates them into paddle movements.
// It acts as an intermediary between the
// players and the game engine. It receives
// input commands (like move up or move down)
// from players and calls the appropriate
// methods on the Player objects to move
// their paddles accordingly. It only handles
// input-related logic, keeping it separate
// from the core game mechanics in GameEngine.ts.
// This separation of concerns makes the code
// cleaner and easier to maintain. It translates
// player inputs as intentions to move paddles.
// The actual movement logic is still handled
// by the Player and Paddle classes.
// This design keeps input handling modular
// and allows for easier future expansions,
// like adding new input methods or controls.
// This file is essential for managing how
// player interact with the game through their
// paddles. By intentions; it means that
// when a player wants to move their paddle,
// the InputController.ts captures that intention
// and calls the relevant methods on the Player
// object to execute the movement. This class must
// not contain any game logic beyond interpreting
// player inputs and directing them to the
// appropriate Player methods. Because its sole
// purpose is to handle inputs, it should not
// manage game state, scoring, or physics.
// Those responsibilities belong to the GameEngine.ts.
// This clear division ensures that each part
// of the game code has a focused role, making
// it easier to manage and update in the future.
// Physics here refers to the rules and calculations
// that govern how objects in the game move and interact,
// such as collision detection, movement speed,
// and bouncing behavior.
class InputHandler {
  player1;
  player2;
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }
  // Translate player input into paddle movements
  handleInput(playerId, action) {
    const player =
      playerId === this.player1.getPlayerId() ? this.player1 : this.player2;

    if (!player) return;
    if (action === "MOVE_UP") player.setInput("MOVE_UP", true);
    if (action === "MOVE_DOWN") player.setInput("MOVE_DOWN", true);
    // let paddle;
    // if (playerId === this.player1.getPlayerId()) {
    //   paddle = this.player1.getPlayerPaddle();
    // } else if (playerId === this.player2.getPlayerId()) {
    //   paddle = this.player2.getPlayerPaddle();
    // } else {
    //   console.warn(`Unknown playerId: ${playerId}`);
    //   return;
    // }
    // // Move paddle based on action
    // switch (action) {
    //   case "MOVE_UP":
    //     if (data[playerId].y > 0) {
    //       paddle.moveUp(deltaTime);
    //     }
    //     break;
    //   case "MOVE_DOWN":
    //     if (data[playerId].y + data[playerId].height < data.field.height) {
    //       paddle.moveDown(deltaTime);
    //     }
    //     break;
    //   // After adding new actions like STOP
    //   default:
    //     console.warn(`Unknown action: ${action}`);
    //     break;
    // }
  }
}
export default InputHandler;
