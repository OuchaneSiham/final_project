import Ball from "./Ball.js";
import GameState, { GameStatus } from "./GameState.js";
import InputHandler from "./InputHandler.js";
import Paddle from "./Paddle.js";
import Player from "./Player.js";
// Game class implementation
class GameEngine {
  fieldWidth = 800; // Width of the game field
  fieldHeight = 600; // Height of the game field
  ball; // The ball in the game.
  // Paddles are the players' controlled objects
  // Before adding players, we define only paddles
  // for simplicity. Now players are added
  // so the paddles are part of the player objects.
  // We can now associate paddles with players.
  // No need to define paddles separately.
  // This ensure that each paddle is controlled
  // by a specific player.
  /* private leftPaddle: Paddle; // The left paddle
    private rightPaddle: Paddle; // The right paddle */
  // Add players to the game engine
  player1; // Player 1 controlling left paddle
  player2; // Player 2 controlling right paddle
  state; // Current state of the game
  disconnectedClient; // Keep track the disconnected client
  inputHandler;
  aiTimeout = null; // Delay or time before adding an AI opponent
  isAIEnabled = false; // THis controls whether the ai should take the control
  // of player2
  aiDifficulty = "normal";
  aiTimer = 0; // Timer to control AI reaction time
  constructor() {
    // Initialize ball and paddles with starting
    // positions and speeds.
    this.ball = new Ball(this.fieldWidth / 2, this.fieldHeight / 2, 300); // Center of an 800x600 field
    /* this.leftPaddle = new Paddle(
          this.fieldWidth * 0.1,
          this.fieldHeight / 2,
          20,
          100,
          300
        ); // Left paddle
        this.rightPaddle = new Paddle(
          this.fieldWidth * 0.8,
          this.fieldHeight / 2,
          20,
          100,
          300
        ); // Right paddle */
    this.player1 = new Player(
      "player1",
      new Paddle(0, this.fieldHeight / 2 - 50, 10, 100, 500),
    );
    this.player2 = new Player(
      "player2",
      new Paddle(this.fieldWidth - 10, this.fieldHeight / 2 - 50, 10, 100, 500),
    );
    this.state = new GameState();
    this.inputHandler = new InputHandler(this.player1, this.player2);
    this.disconnectedClient = null;
  }
  // Update the player score
  checkScore() {
    const score1 = this.player1.getPlayerScore();
    const score2 = this.player2.getPlayerScore();
    if (this.ball.getState().x + this.ball.getState().radius < 0) {
      this.player2.incrementScore();
      this.ball.resetSpeed(300);
      this.ball.reset();
    }
    if (
      this.ball.getState().x - this.ball.getState().radius >
      this.fieldWidth
    ) {
      this.player1.incrementScore();
      this.ball.resetSpeed(300);
      this.ball.reset();
    }
    // Why check for winner here and not before incrementing score ?
    // Because if we check before incrementing score,
    // the game will not end when a player reaches
    // the max score, it will end only after
    // the next point is scored. This means a player
    // could exceed the max score by one point
    // before the game ends. By checking after
    // incrementing the score, we ensure that
    // the game ends immediately when a player
    // reaches the max score.
    if (score1 >= this.state.maxScore) {
      //   this.state.winnerId = this.player1.getPlayerId();
      //   this.state.finish();
      this.endGame("player1");
      return;
    }
    if (score2 >= this.state.maxScore) {
      //   this.state.winnerId = this.player2.getPlayerId();
      //   this.state.finish();
      this.endGame("player2");
      return;
    }
  }
  // Update the game state based on elapsed time
  update(deltaTime) {
    // Only update the game if it is running
    // This prevents the game from running
    // in paused or waiting or finished states.
    if (this.state.status !== GameStatus.RUNNING) return;
    // console.log("Game Updated!");
    this.updatePlayers(deltaTime);
    this.ball.update(deltaTime);

    // Update AI
    if (this.isAIEnabled) {
      this.updateAI(deltaTime);
    }
    this.checkWallCollisions();
    this.checkPaddleCollisions();
    this.checkScore();
  }
  // Update players or move paddles
  updatePlayers(deltaTime) {
    if (this.player1.input.up) {
      const paddle = this.player1.getPlayerPaddle();
      if (paddle.getBounds().y > 0) {
        // console.log("PLAYER 1 MOVE_UP", this.player1.input.up);
        paddle.moveUp(deltaTime);
      }
    }
    if (this.player1.input.down) {
      const paddle = this.player1.getPlayerPaddle();
      if (paddle.getBounds().y + paddle.getBounds().height < this.fieldHeight) {
        // console.log("PLAYER 1 MOVE_DOWN", this.player1.input.down);
        paddle.moveDown(deltaTime);
      }
    }
    if (this.player2.input.up) {
      const paddle = this.player2.getPlayerPaddle();
      if (paddle.getBounds().y > 0) {
        // console.log("PLAYER 2 MOVE_UP", this.player2.input.up);
        paddle.moveUp(deltaTime);
      }
    }
    if (this.player2.input.down) {
      const paddle = this.player2.getPlayerPaddle();
      if (paddle.getBounds().y + paddle.getBounds().height < this.fieldHeight) {
        // console.log("PLAYER 2 MOVE_DOWN", this.player2.input.down);
        paddle.moveDown(deltaTime);
      }
    }
  }
  // Call this method to set the control
  // of the player to AI
  enableAI() {
    this.isAIEnabled = true;
    this.player2.input.up = false;
    this.player2.input.down = false;
  }
  // To disable the AI
  disableAI() {
    this.isAIEnabled = false;
  }
  // Update AI
  updateAI(deltaTime) {
    const paddle = this.player2.getPlayerPaddle();
    const ball = this.ball.getState();

    // CURRENT POSITION
    const paddleCenter = paddle.y + paddle.height / 2;

    // AI CONFIG
    // We add a tolerance or dead zone around the paddle center
    // to prevent the AI from making constant small adjustments
    // when the ball is near the center of the paddle. This makes
    // the AI movement smoother and more natural, instead of jittery
    // when the ball is close to the paddle center. The tolerance
    // value can be adjusted to make the AI more or less responsive.
    const tolerance = 20;
    const aiSpeed = 0.8; // AI reaction speed (0 to 1, where 1 is instant reaction or perfect)
    const reactionTime = 0.10; // Time in seconds before the AI reacts to the ball movement
    const maxError = 25; // Maximum error in pixels to simulate imperfection.
    // TIMER REACTION
    this.aiTimer += deltaTime;
    if (this.aiTimer < reactionTime) {
      return; // Not yet time for the AI to react
    }
    this.aiTimer = 0; // Reset the timer after reacting

    let targetY; // Target Y position for the paddle to move towards
    if (this.ball.getVelocity().vx > 0) {
      // If the ball is moving towards the AI paddle, target the ball's Y position with some error
      const error = Math.random() - 0.5 * maxError; // Random error to make the AI less perfect
      targetY = ball.y + error;
    } else {
      // If the ball is moving away, return to the center of the field
      targetY = this.fieldHeight / 2;
    }
    // AI MOVEMENT
    if (targetY > paddleCenter + tolerance) {
      if (paddle.getBounds().y + paddle.getBounds().height < this.fieldHeight) {
        paddle.moveDown(deltaTime * aiSpeed); // Scale movement by aiSpeed to make it less perfect
      }
    } else if (targetY < paddleCenter - tolerance) {
      if (paddle.getBounds().y > 0) {
        paddle.moveUp(deltaTime * aiSpeed);
      }
    }
  }
  touchPaddle(paddle) {
    const radius = this.ball.getState().radius;
    const ball = this.ball.getState();
    const pad = paddle.getBounds();
    return (
      ball.x + radius >= pad.x &&
      ball.x - radius <= pad.x + pad.width &&
      ball.y + radius >= pad.y &&
      ball.y - radius <= pad.y + pad.height
      // The code is when the ball is represented as a point
      //   this.ball.getState().x >= paddle.getBounds().x &&
      //   this.ball.getState().x <=
      //     paddle.getBounds().x + paddle.getBounds().width &&
      //   this.ball.getState().y >= paddle.getBounds().y &&
      //   this.ball.getState().y <= paddle.getBounds().y
      //   + paddle.getBounds().height
    );
  }
  // This function checks for collisions between
  // the ball and the top/bottom walls of the game
  // field. If the ball's Y position is less than or
  // equal to 0 (top wall) or greater than or equal
  // to the field height (bottom wall),
  // the ball should bounce vertically.
  checkWallCollisions() {
    // Before the ball is just a point,
    // now it has a radius. So we need to
    // account for the radius when checking
    // wall collisions.
    const radius = this.ball.getState().radius;
    if (
      this.ball.getState().y - radius <= 0 ||
      this.ball.getState().y + radius >= this.fieldHeight
    ) {
      console.log("Wall collision detected at y =", this.ball.getState().y);
      this.ball.bounceY();
    }
  }
  // This function checks for collisions between
  // the ball and the paddles. If the ball's position
  // overlaps with either paddle's bounds (the area
  // occupied by the paddle position and size), the ball
  // should bounce horizontally.
  checkPaddleCollisions() {
    // Check collision with paddles
    // Check velocity direction to avoid multiple bounces
    // when the ball is already moving away from the paddle.
    // If the ball is moving left (vx < 0) and touches
    // the left paddle, it should bounce. Similarly,
    // if the ball is moving right (vx > 0) and touches
    // the right paddle, it should bounce.
    // This prevents the ball from bouncing multiple times
    // against the same paddle when it is already moving away from it.
    // This is done by checking the sign of the ball's
    // velocity along the X axis (vx) before applying the bounce.
    // vx < 0 means the ball is moving left towards the left paddle
    // so we only bounce if it touches the left paddle in that case.
    // vx > 0 means the ball is moving right towards the right paddle
    // so we only bounce if it touches the right paddle in that case.
    // This logic ensures that the ball only bounces off
    // a paddle when it is actually moving towards it,
    // preventing unrealistic multiple bounces.
    const leftPaddle = this.player1.getPlayerPaddle();
    const rightPaddle = this.player2.getPlayerPaddle();
    if (this.touchPaddle(leftPaddle) && this.ball.getVelocity().vx < 0) {
      this.ball.bounceX();
      this.ball.setSpeed(1.05); // Increase te ball speed (5%) when it hits a paddle
      // this made the game more dynamique and difficult when it progresses
      //   console.log("Paddle collision detected at x = ", this.ball.getState().x);
      // After bouncing off the left paddle,
      // ensure the ball is not stuck inside the paddle
      // by repositioning it just outside the paddle's right
      // edge.
      this.ball.setPosition(
        leftPaddle.getBounds().x +
          leftPaddle.getBounds().width +
          this.ball.getState().radius,
      );
    }
    if (this.touchPaddle(rightPaddle) && this.ball.getVelocity().vx > 0) {
      this.ball.bounceX();
      this.ball.setSpeed(1.05);
      //   console.log("Paddle collision detected at x = ", this.ball.getState().x);
      // Here also, after bouncing off the right paddle,
      // reposition the ball just outside the paddle's
      // left edge to prevent it from getting stuck
      // inside the paddle. Why ? Because if the ball's
      // velocity is high enough, it might move
      // past the paddle in a single update frame,
      // causing it to get stuck inside the paddle.
      this.ball.setPosition(
        rightPaddle.getBounds().x - this.ball.getState().radius,
      );
    }
  }
  // Get the snapshot of the current game state
  getSnapshot() {
    return {
      ball: this.ball.getState(),
      player1: {
        x: this.player1.getPlayerPaddle().getBounds().x,
        y: this.player1.getPlayerPaddle().getBounds().y,
        width: this.player1.getPlayerPaddle().getBounds().width,
        height: this.player1.getPlayerPaddle().getBounds().height,
        score: this.player1.getPlayerScore(),
      },
      player2: {
        x: this.player2.getPlayerPaddle().getBounds().x,
        y: this.player2.getPlayerPaddle().getBounds().y,
        width: this.player1.getPlayerPaddle().getBounds().width,
        height: this.player1.getPlayerPaddle().getBounds().height,
        score: this.player2.getPlayerScore(),
      },
      field: { width: this.fieldWidth, height: this.fieldHeight },
      status: GameStatus[this.state.status],
      winnerId: this.state.winnerId ?? null,
    };
  }
  handlePlayerInput(playerId, action) {
    const data = this.getSnapshot();
    this.inputHandler.handleInput(playerId, action, data);
  }
  handlePlayerInputStop(playerId) {
    const player =
      playerId === this.player1.getPlayerId() ? this.player1 : this.player2;
    if (!player) return;
    player.setInput("MOVE_UP", false);
    player.setInput("MOVE_DOWN", false);
  }
  endGame(winnerId) {
    if (this.state.status === GameStatus.FINISHED) return;
    // this.state.status = GameStatus.FINISHED;
    this.state.finish();
    this.state.winnerId = winnerId;
    this.disconnectedClient = null;
    if (this.isAIEnabled) this.disableAI();
  }
  // Handle player disconnection
  onPlayerDisconnected(playerId) {
    if (
      this.state.status !== GameStatus.RUNNING &&
      this.state.status !== GameStatus.WAITING_OPPONENT
    )
      return;
    this.state.status = GameStatus.PAUSED;

    // Take some time before declare the disconnected
    // client as looser; because we want to let him reconnects
    // gracefully
    console.log("On player disconnected:", playerId);
    setTimeout(() => {
      if (
        this.disconnectedClient &&
        this.disconnectedClient.getClientId() === playerId &&
        this.disconnectedClient.isDisconnected() &&
        this.state.status !== GameStatus.FINISHED
      ) {
        const winnerId = playerId === "player1" ? "player2" : "player1";
        this.endGame(winnerId);
      }
    }, 5000);
  }

  //   isStillDisconnected(playerId) {
  //     if (this.disconnectedClient.getClientId() === playerId) {
  //       return this.disconnectedClient?.isDisconnected();
  //     }
  //     return this.player2?.disconnected;
  //   }
  // Create StartGame method; executed whenever
  // players are ready
  startGame() {
    this.state.status = GameStatus.RUNNING;
  }
  // Reset Game When finished
  resetGame() {
    this.state.status = GameStatus.WAITING;
    this.player1.score = 0;
    this.player2.score = 0;
    this.ball.reset();
    this.player1.resetPlayer(this.fieldHeight / 2 - 50);
    this.player2.resetPlayer(this.fieldHeight / 2 - 50);
  }
}
export default GameEngine;
