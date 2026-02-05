import GameEngine from "./GameEngine.js";
let frames = 0;
const game = new GameEngine();
// Simulate a game update with a deltaTime of 0.016
// seconds (approximately 60 FPS)
// 0.016 seconds = 16 milliseconds is typical for 60 frames
// per second. So for each frame, is like if 0.016 seconds
// have passed in the game world.
const intervalId = setInterval(() => {
    game.update(0.016);
    frames++;
    if (frames === 60) {
        console.log("Game state after 1 second(60 frames):");
        console.log("Ball Position:", game["ball"].getState());
        console.log("Left Paddle Position:", game["player1"].getPlayerPaddle().getBounds());
        console.log("Right Paddle Position:", game["player2"].getPlayerPaddle().getBounds());
        clearInterval(intervalId);
        game['ball'].reset();
    }
}, 1000 / 60);
