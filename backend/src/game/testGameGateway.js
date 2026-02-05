// Let simulate a fake authentification
// by crafting a token
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ClientMessageType, ServerMessageType } from "../messages/messages.js";
dotenv.config();
// Note that we can pass an env var
// like an argument in the cli
// for example env_var node js_file
// and node can read it in argv array
// process that holds args passed to our
// program
const token = jwt.sign({
    sub: "test-user-1", // fake userID -> this must be provided by a real DB
    username: "biman",
}, process.env.JWT_SECRET, { expiresIn: "1h" });
console.log("Fake token:", token);
// Create a ws client and connect to ws server
const ws = new WebSocket(`ws://localhost:8080?token=${token}`);
ws.onmessage = (event) => {
    //   console.log(
    //     "Game Snapshot received from the ws server: ",
    //     JSON.parse(event.data),
    //   );
    const msg = JSON.parse(event.data);
    console.log(msg);
    switch (msg.type) {
        case ServerMessageType.ASSIGN_ID:
            console.log("You are assigned ID as: ", msg.playerId);
            break;
        case ServerMessageType.ASSIGN_ROLE:
            console.log("Your role is: ", msg.role);
            break;
        case ServerMessageType.GAME_SNAPSHOT:
            console.log("Game snapshot received: ", msg.snapshot);
            break;
        case ServerMessageType.AUTHENTIFICATION:
            console.log("Error: ", msg.message);
            break;
        default:
            console.log("Unknown message type: ", msg.type);
    }
};
// Check the connection to the server
ws.onopen = () => {
    console.log("Connected to the ws server");
    // Tell to the server that the player is ready
    // by default the game is in WAITING state until
    // the player clicks on ready button from the frontend
    // here we do it backend side to simulate the frontend
    ws.send(JSON.stringify({ type: ClientMessageType.PLAYER_READY }));
    // Send an input after 1s
    setTimeout(() => {
        ws.send(JSON.stringify({ type: ClientMessageType.PLAYER_INPUT, action: "MOVE_UP" }));
    }, 1000);
};
// Handle errors
ws.onerror = (err) => {
    console.error("WebSocket err:", err);
};
// Handle connection close
ws.onclose = () => {
    console.log("Disconnected from the server");
};
