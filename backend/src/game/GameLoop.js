// (Can be removed)
// GameLoop.ts, handles the main game
// loop logic for the backend of the game.
import { randomInt } from "crypto";
import GameGateway from "../gateway/GameGateway.js";
import GameEngine from "./GameEngine.js";
import { GameStatus } from "./GameState.js";
// import jwt from "jsonwebtoken";
// const token = jwt.sign({
//     sub: 'test-user-1', // fake userID -> this must be provided by a real DB
//     username: "biman",
// }, process.env.JWT_SECRET, { expiresIn: "1h" });
// console.log("Fake token:", token);
// Create an instance of the GameEngine
const engine = new GameEngine();
// Create or instantiate the game gateway
// it behaves like the bridge between clients
// and the game engine. So clients send
// their actions by the game gateway;
// its turn communicates with the game loop
// to handle the clients inputs; and return
// them the game snapshot for visual update.
const gameGateway = new GameGateway(engine, 5000);
// Define the number of frames per second (FPS)
const FPS = 60;
// Time of the last update. It is needed to calculate
// deltaTime for each frame. We cannot use frameDuration
// directly because setInterval may not be perfectly
// accurate due to event loop delays.
let lastUpdateTime = Date.now();
// We can call it interval to simulate
// the game loop running at a fixed time step
const frameDuration = 1000 / FPS; // Duration of each frame in milliseconds
// Start the game loop using setInterval
setInterval(() => {
    // Update the game engine with the time elapsed since the last frame
    // engine.update(frameDuration / 1000); // Convert milliseconds to seconds
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastUpdateTime) / 1000;
    // Consume or process received inputs from clients
    gameGateway.consumeInputs(deltaTime);
    engine.update(deltaTime);
    lastUpdateTime = currentTime;
    // Simulate player inputs for testing purposes
    // In a real scenario, these inputs would come from clients
    // engine.handlePlayerInput('player1', 'MOVE_UP', deltaTime);
    // engine.handlePlayerInput('player2', 'MOVE_DOWN', deltaTime);
    // Get the current game snapshot
    const snapshot = engine.getSnapshot();
    // Here we would typically send the snapshot
    // to connected clients via WebSocket( Ex: wsServer.broadcast(JSON.stringify(snapshot));) or other means,
    // but for this example, we will just log it to the console.
    //   console.log(snapshot);
    // Now broadcast the game status snapshot to clients
    gameGateway.broadcastSnapshot(snapshot);
    // Here the game loop is a setInterval so 
    // it loops 60 times per second a with 
    // this flag we will avoid to execute the setTimeout
    // 60 times per second else if the game 
    // is finished it will reset 1000 times
    let resetScheduled = false;
    // Handle game over and reset after 3s
    if (engine.state.status === GameStatus.FINISHED && !resetScheduled) {
        resetScheduled = true;
        setTimeout(() => {
            resetScheduled = false;
            gameGateway.resetRoom();
        }, 10000);
    }
}, frameDuration); // Call this function every frameDuration milliseconds
