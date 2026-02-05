// Once a user is authenticated; he gets a token(JWT)
// Now to get its ID from the frontend; he don't
// send it directly for security reasons; that
// is where JWT comes in; it will be bind
// to the endpoint of our game gateway.
// So the backend its turn will exploit this
// token to get info about the user like ID, etc.
import jwt from "jsonwebtoken";
import { GameStatus } from "../game/GameState.js";
import { ClientMessageType, ServerMessageType } from "../messages/messages.js";
// The GameGateway class represents the entry point
import { WebSocketServer } from "ws";
import GameClient from "../game/GameClient.js";
import dotenv from "dotenv";
dotenv.config();
import Player from "../game/Player.js";
import GameEngine from "../game/GameEngine.js";

class GameGateway {
  wss;
  rooms = new Map(); // Map<string, { engine: GameEngine, clients: Map<WebSocket, GameClient> }>
  // Each room has it own setInterval Id as we use
  // setInterval to loop and update each room engine which runs independently .
  // Each room has it own engine if not rooms will be mingle
  frameIntervals = new Map(); // Map to store intervals for each room so we can
  // stop it if needed

  constructor(port) {
    this.wss = new WebSocketServer({ port });
    this.wss.on("connection", (socket, request) => {
      this.handleConnection(socket, request);
    });
    console.log(`GameGateway running on wss://localhost:${port}`);
  }

  handleConnection(socket, request) {
    const url = request.url;
    const params = new URLSearchParams(url?.split("?")[1]);
    const token = params.get("token");
    const roomId = params.get("roomId") || "default-room";
    if (!token) {
      socket.send(
        JSON.stringify({
          type: ServerMessageType.AUTHENTIFICATION,
          message: "Authentication required",
        }),
      );
      socket.close(1008, "Unauthorized");
      return;
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      socket.send(
        JSON.stringify({
          type: ServerMessageType.AUTHENTIFICATION,
          message: "Invalid token",
        }),
      );
      socket.close(1008, "Invalid token");
      return;
    }

    const userId = payload.sub;

    // Create room if it doesn't exist
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, {
        engine: new GameEngine(),
        clients: new Map(),
        aiAdded: false, // To control extra users
      });
      this.startRoomLoop(roomId);
    }

    const room = this.rooms.get(roomId);
    const clients = room.clients;
    const engine = room.engine;

    // Check for reconnection
    const existingClient = [...clients.values()].find(
      (c) => c.userId === userId,
    );

    // Check if there are players disconnected
    // and set them as spectator when reconnecting
    const playersDisconnected = [...clients.values()].filter(
      (c) => c.getRole() === "PLAYER" && c.isDisconnected(),
    );
    if (playersDisconnected.length === 2) {
      playersDisconnected.forEach((p) => {
        if (p.getClientId() !== existingClient.getClientId()) {
          p.setRole("SPECTATOR");
          p.setClientId(null);
        }
      });
    }
    if (playersDisconnected.length === 1) {
      if (
        playersDisconnected[0].getClientId() !== existingClient?.getClientId()
      ) {
        playersDisconnected[0].setRole("SPECTATOR");
        playersDisconnected[0].setClientId(null);
      }
    }
    if (existingClient) {
      console.log(`Reconnecting client ${userId} in room ${roomId}`);
      const oldEntry = [...clients.entries()].find(
        ([_, c]) => c === existingClient,
      );
      if (oldEntry) clients.delete(oldEntry[0]);

      existingClient.socket = socket;
      existingClient.setDisconnected(false);
      clients.set(socket, existingClient);

      if (engine.state.status === GameStatus.PAUSED) {
        setTimeout(() => {
          const playersConnected = [...clients.values()].filter(
            (c) => c.getRole() === "PLAYER" && !c.disconnected,
          ).length;
          console.log(
            "Client Reconnected",
            playersConnected,
            engine.isAIEnabled,
          );
          if (
            playersConnected === 2 ||
            (playersConnected === 1 && engine.isAIEnabled)
          ) {
            engine.state.status = GameStatus.RUNNING;
          }
        }, 3000);
      }
      this.sendSnapshotToClient(existingClient, roomId);
      this.assignSocketListeners(socket, existingClient, roomId);
      return;
    }

    // Assign role
    let playerCount = [...clients.values()].filter(
      (c) => c.getRole() === "PLAYER",
    ).length;
    let newClient;
    if (room.aiAdded && engine.state.status === GameStatus.RUNNING) {
      newClient = new GameClient(
        userId,
        socket,
        "SPECTATOR",
        roomId,
        undefined,
        undefined,
      );
      clients.set(socket, newClient);
      socket.send(
        JSON.stringify({
          type: ServerMessageType.ASSIGN_ROLE,
          role: "SPECTATOR",
        }),
      );
      return;
    }
    if (playerCount < 2) {
      const playerId = playerCount === 0 ? "player1" : "player2";
      newClient = new GameClient(userId, socket, "PLAYER", roomId, playerId);
      clients.set(socket, newClient);
      socket.send(
        JSON.stringify({ type: ServerMessageType.ASSIGN_ID, playerId }),
      );
      // IF a second humane player joins the room
      // cancel or remove the timeout to add AI
      if (engine.aiTimeout) {
        clearTimeout(engine.aiTimeout);
        engine.aiTimeout = null;
        engine.disableAI();
      }
      // After a delay if there is no
      // second player add an AI to play as second player
      // Here if the timeout is not null it means
      // we still waiting for adding the AI
      console.log("AI", playerCount, engine.aiTimeout);
      if (playerCount < 2 && !engine.aiTimeout) {
        // Delay before adding AI. Store the timeout
        // in engine aiTimeout avoiding create many
        engine.aiTimeout = setTimeout(() => {
          const currentPlayers = [...clients.values()].filter(
            (c) => c.getRole() === "PLAYER",
          ).length;
          // If there is only one Humane player after the
          // delay add AI
          if (currentPlayers === 1) {
            // For AI we don't need socket it logic
            // will be handled by the backend but the
            // frontend needs positions of players and ball.
            // So we will add it directly as a player
            // in the game engine AIs array.
            // AI dont send inputs from frontend it is
            // handled server side
            console.log("No opponent found enabling AI in room", roomId);
            engine.enableAI();
            room.aiAdded = true; // Denied access to other clients
            console.log("AI added to room", roomId);
            // engine.state.status = GameStatus.WAITING_OPPONENT;
            // Broadcast the snapshot to update the frontend
            // This ensures that the Humane player aware about
            // the AI as second player
            // engine.broadcastSnapshot(roomId);
            this.checkGameStart(roomId);
          }
          // Reset the timeout by emptied the variable.
          // This ensures we can create another new timer
          // if the room needs a second player
          engine.aiTimeout = null;
        }, 60000);
      }
    } else {
      newClient = new GameClient(userId, socket, "SPECTATOR", roomId);
      clients.set(socket, newClient);
    }
    socket.send(
      JSON.stringify({
        type: ServerMessageType.ASSIGN_ROLE,
        role: newClient.getRole(),
      }),
    );

    this.assignSocketListeners(socket, newClient, roomId);
    this.sendSnapshotToClient(newClient, roomId);
  }

  assignSocketListeners(socket, client, roomId) {
    socket.on("message", (data) =>
      this.handleMessage(socket, data.toString(), roomId),
    );
    socket.on("close", () => {
      console.log(
        `Client ${client.getClientId()} disconnected from room ${roomId}`,
      );
      const room = this.rooms.get(roomId);
      const engine = room.engine;
      client.setDisconnected(true);
      if (client.getRole() === "PLAYER") {
        //   console.log("Player disconnected:", client);
        engine.disconnectedClient = client;
        engine.onPlayerDisconnected(client.getClientId());
      }
    });
  }

  handleMessage(socket, data, roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    const client = room.clients.get(socket);
    if (!client) return;

    let payload;
    try {
      payload = JSON.parse(data);
    } catch {
      console.error("Failed to parse message");
      return;
    }

    switch (payload.type) {
      case ClientMessageType.PLAYER_READY:
        if (client.getRole() === "PLAYER") {
          client.setIsReady(true);
          this.checkGameStart(roomId);
        }
        break;
      case ClientMessageType.PLAYER_INPUT:
        if (client.getRole() === "PLAYER") {
          room.engine.handlePlayerInput(client.getClientId(), payload.action);
        }
        break;
      case ClientMessageType.PLAYER_INPUT_STOP:
        if (client.getRole() === "PLAYER") {
          room.engine.handlePlayerInputStop(client.getClientId());
        }
        break;
      default:
        console.log("Unknown message type");
    }
  }

  checkGameStart(roomId) {
    const room = this.rooms.get(roomId);
    const engine = room.engine;
    const clients = room.clients;
    const readyPlayers = [...clients.values()].filter(
      (c) => c.getRole() === "PLAYER" && c.getIsReady(),
    );

    // Check if the AI is enabled
    const aiEnabled = engine.isAIEnabled;

    if (
      (readyPlayers.length === 2 || (readyPlayers.length === 1 && aiEnabled)) &&
      (engine.state.status === GameStatus.WAITING ||
        engine.state.status === GameStatus.WAITING_OPPONENT)
    ) {
      engine.startGame();
      // Immediately send the snapshot to avoid sync problems
      this.broadcastSnapshot(roomId);
    } else if (
      readyPlayers.length === 1 &&
      engine.state.status === GameStatus.WAITING
    ) {
      engine.state.status = GameStatus.WAITING_OPPONENT;
    }
  }

  // This function executes a game loop for each room
  startRoomLoop(roomId) {
    const room = this.rooms.get(roomId);
    const engine = room.engine;

    const FPS = 60;
    let lastUpdateTime = Date.now();
    // resetScheduled ensures that the setTimeout of
    // resetGame() inside the setInterval don't run
    // many times. As the game loop runs all ~16ms;
    // without this flag we will execute many simultaneously
    // and it breaks the logic
    let resetScheduled = false;

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastUpdateTime) / 1000;
      lastUpdateTime = currentTime;

      engine.update(deltaTime);
      this.broadcastSnapshot(roomId);

      if (engine.state.status === GameStatus.FINISHED && !resetScheduled) {
        resetScheduled = true;
        setTimeout(() => {
          resetScheduled = false;
          engine.resetGame();
          room.clients.forEach((c) => c.setIsReady(false));
          this.broadcastSnapshot(roomId);
        }, 10000);
      }
    }, 1000 / FPS);

    this.frameIntervals.set(roomId, interval);
  }

  broadcastSnapshot(roomId) {
    const room = this.rooms.get(roomId);
    if (!room) return;
    const snapshot = room.engine.getSnapshot();
    room.clients.forEach((client) =>
      this.sendSnapshotToClient(client, roomId, snapshot),
    );
  }

  sendSnapshotToClient(client, roomId, snapshot = null) {
    const room = this.rooms.get(roomId);
    const engine = room.engine;
    if (!snapshot) snapshot = engine.getSnapshot();
    const data = { type: ServerMessageType.GAME_SNAPSHOT, snapshot };

    if (client.getRole() === "PLAYER") {
      const id = client.getClientId();
      const players = [...room.clients.values()].filter(
        (c) => c.getRole() === "PLAYER",
      );
      const opponent = players.find((p) => p.getClientId() !== id);
      const opponentId = opponent?.getClientId();

      client.send({
        ...data,
        snapshot: {
          ...data.snapshot,
          you: id,
          [id]: { ...data.snapshot[id], ready: client.getIsReady() },
          [opponentId]: {
            ...data.snapshot[opponentId],
            ready: opponent?.getIsReady(),
          },
          aiEnabled: engine.isAIEnabled,
        },
      });
    } else {
      client.send({
        ...data,
        snapshot: { ...data.snapshot, you: "SPECTATOR" },
      });
    }
  }
}

export default GameGateway;

// class GameGateway {
//   // WebSocketServer is a class from the 'ws' library
//   // that allows us to create a WebSocket server
//   wss; // WebSocket server instance
//   // gameEngine is a reference to the GameEngine instance
//   // that manages the game logic. GameGateway does not calculate
//   // game state itself; it delegates that to GameEngine.
//   gameEngine; // Instance of the game engine
//   // A queue is a data structure that holds items
//   // in a specific order. Here, we use it to store
//   // incoming player inputs before processing them.
//   // Why need a queue ? Because inputs may arrive
//   // at different times and we want to process them
//   // in the order they were received.
//   inputQueue = []; // Queue to store incoming player inputs
//   // WebSocket is a class representing a single WebSocket connection.
//   // A Map is a collection of key-value pairs.
//   // The difference between a Map and a regular object
//   // is that a Map allows keys of any type,
//   // whereas object keys are always strings or symbols.
//   // A websocket connection is a unique connection
//   // between th server and a client(player).
//   // The difference between a websocket connection
//   // and a regular HTTP connection is that
//   // a websocket connection is persistent,
//   // meaning it stays open for continuous communication,
//   // whereas an HTTP connection is short-lived.
//   // Map to associate WebSocket connections with player IDs
//   //   private players = new Map<WebSocket, string>();
//   clients = new Map();
//   // engine is passed in via the constructor
//   // because GameGateway don't need to create
//   // its own GameEngine; it just uses an existing one.
//   constructor(engine, port) {
//     this.wss = new WebSocketServer({ port }); // Initialize websocket server on specified port
//     this.gameEngine = engine; // Assign the passed GameEngine instance to the class property
//     // wss.on is an event listener that listens for incoming connections.
//     // When a new connection is established,
//     // it calls the handleConnection method to handle that connection.
//     // This sets up the server to accept and manage multiple player connections.
//     // The socket parameter represents the individual connection
//     // between the server and a specific client(player).
//     this.wss.on("connection", (socket, request) => {
//       this.handleConnection(socket, request);
//     });
//     console.log(`GameGateway running on wss://localhost:${port}`);
//   }
//   // handleConnection manages a new player connection.
//   handleConnection(socket, request) {
//     console.log("New game client connected");
//     // Extract the userId in the token
//     // Get the URL
//     const url = request.url;
//     // Get URL params
//     // URLSearchParams reads params after '?'
//     // in the URL
//     const params = new URLSearchParams(url?.split("?")[1]);
//     // Extract the token
//     const token = params.get("token");
//     // Check for error
//     if (!token) {
//       // Close the socket if there
//       // no token.
//       // Send the reason of the connexion failure
//       // to the client
//       const message = "Authentification required";
//       socket.send(
//         JSON.stringify({ type: ServerMessageType.AUTHENTIFICATION, message }),
//       );
//       socket.close(1008, "Unauthorized. Authentification required");
//       return;
//     }
//     // Now extract the payload
//     // by verifying the token
//     let payload;
//     try {
//       payload = jwt.verify(token, process.env.JWT_SECRET);
//     } catch {
//       const message = "Invalid token";
//       socket.send(
//         JSON.stringify({ type: ServerMessageType.AUTHENTIFICATION, message }),
//       );
//       socket.close(1008, "Invalid token. Authentification required!");
//       return;
//     }
//     // Now extract the userId that is what we
//     // want here. The sub(subject) holds
//     // the user ID from DB
//     const userId = payload.sub;
//     // Before check if the user is already
//     // existed and try to reconnect him
//     // to the game with it previous state
//     const existingClient = [...this.clients.values()].find(
//       (c) => c.userId === userId,
//     );
//     const snapshot = this.gameEngine.getSnapshot();
//     const data = { type: ServerMessageType.GAME_SNAPSHOT, snapshot };
//     if (existingClient) {
//       console.log(`Reconnecting client: ${userId}`);
//       // Before reconnect the client
//       // remove the old socket associated to him
//       // to avoid duplication
//       const oldEntry = [...this.clients.entries()].find(
//         ([_, c]) => c === existingClient,
//       );
//       if (oldEntry) {
//         const [oldSocket] = oldEntry;
//         this.clients.delete(oldSocket);
//       }
//       existingClient.socket = socket;
//       existingClient.setDisconnected(false);
//       // After the reconnexion no need to reset the
//       // game the player is back.
//       // He can retake the game where it paused with
//       // the previous state.
//       if (this.gameEngine.state?.status === GameStatus.PAUSED) {
//         console.log("Player reconnected, resuming soon...");
//         // Set a delay before running the game
//         // when players reconnected and make sure all players
//         // are not disconnected before running the game
//         setTimeout(() => {
//           const playersConnected = [...this.clients.values()].filter(
//             (c) => c.getRole() === "PLAYER" && !c.disconnected,
//           ).length;
//           if (playersConnected === 2) {
//             this.gameEngine.state.status = GameStatus.RUNNING;
//           }
//         }, 3000);
//       }

//       // Reassigned the socket to the client
//       this.clients.set(socket, existingClient);

//       // Send the current state the client
//       if (existingClient.getRole() === "PLAYER") {
//         // We need to know each player identity
//         // to the frontend to custom some behaviors
//         // or display based on the player identity
//         const id = existingClient.getClientId();
//         const players = [...this.clients.values()].filter(
//           (client) => client.getRole() === "PLAYER",
//         );
//         const opponent = players.find((player, _) => {
//           return player.getClientId() != id;
//         });
//         const opponentId = opponent?.getClientId();
//         existingClient.send({
//           ...data,
//           snapshot: {
//             ...data.snapshot,
//             you: id,
//             [id]: {
//               ...data.snapshot[id],
//               ready: existingClient.getIsReady(),
//             },
//             [opponentId]: {
//               ...data.snapshot[opponentId],
//               ready: opponent?.getIsReady(),
//             },
//           },
//         });
//       } else {
//         existingClient.send({
//           ...data,
//           snapshot: {
//             ...data.snapshot,
//             you: "SPECTATOR",
//           },
//         });
//       }
//       // Restore clients inputs or ready state
//       if (existingClient.isPlayer() && existingClient.getIsReady()) {
//         this.checkGameStart(); // Check if the game can restart
//       }
//       // After reconnexion reassigned listeners on the new socket
//       socket.on("message", (data) =>
//         this.handleMessage(socket, data.toString()),
//       );
//       socket.on("close", () => {
//         console.log(`Client ${existingClient.getClientId()} disconnected`);
//         existingClient.setDisconnected(true);
//         if (existingClient.getRole() === "PLAYER") {
//           // Set the disconnected client in game engine
//           this.gameEngine.disconnectedClient = existingClient;
//           this.gameEngine.onPlayerDisconnected(existingClient.getClientId());
//         }
//         // console.log(
//         //   "New state after disconnecting: ",
//         //   this.gameEngine.getSnapshot(),
//         // );
//       });
//     } else {
//       // clients or users are players; if
//       // there is already two players; all
//       // new client connected after will be
//       // assigned a role of spectator
//       const playersCount = [...this.clients.values()].filter(
//         (client) => client.getRole() == "PLAYER",
//       ).length;
//       if (playersCount >= 2) {
//         // If there is already 2 players
//         // Add the new client as spectator
//         const spectator = new GameClient(
//           userId,
//           socket,
//           "SPECTATOR",
//           "default-room",
//           undefined,
//           undefined,
//         );
//         this.clients.set(socket, spectator);
//         socket.send(
//           JSON.stringify({
//             type: ServerMessageType.ASSIGN_ROLE,
//             role: spectator.getRole(),
//           }),
//         ); // Inform player of their ID
//         // 1000 is the normal closure status code
//         // socket.close(1000, "Game is full"); // Close connection if max players reached
//         return;
//       }
//       // Here we can assign to the new user
//       // the role of player
//       // Assign player ID based on
//       // current number of players
//       const playerId = playersCount === 0 ? "player1" : "player2";
//       const player = new GameClient(
//         userId,
//         socket,
//         "PLAYER",
//         "default-room",
//         playerId,
//         undefined,
//       );
//       this.clients.set(socket, player); // Associate socket with player ID
//       // JSON.stringify converts a Js object into a JSON string,
//       // which is the format used for WebSocket communication.
//       // Here, we inform the connected player of their assigned ID.
//       // This is important for the client to9 know which player they are
//       // in the game. socket.send() sends a message
//       // over the WebSocket connection to thr client.
//       // How it works ? When a player connects,
//       // they receive a message like:
//       // {"type": "ASSIGN_ID", "playerId": "player1"}
//       // here type indicates the kind of message.
//       // socket acts as the communication channel.
//       socket.send(
//         JSON.stringify({ type: ServerMessageType.ASSIGN_ID, playerId }),
//       ); // Inform player of their ID
//       socket.send(
//         JSON.stringify({
//           type: ServerMessageType.ASSIGN_ROLE,
//           role: player.getRole(),
//         }),
//       ); // Inform player of their ID
//       // Set up listener for incoming messages from this player
//       // When a message is received, handleMessage is called.
//       // The data parameter contains the message sent by the client.
//       // We convert it to a string before processing.
//       socket.on("message", (data) => {
//         this.handleMessage(socket, data.toString());
//       });
//       socket.on("close", () => {
//         console.log(`Client ${playerId} disconnected`);
//         const client = this.clients.get(socket);

//         // Don't delete the client socket
//         // instead set the client disconnected property
//         // to true to allow the reconnexion after
//         client?.setDisconnected(true);
//         //this.clients.delete(socket); // Remove player from map on disconnect.
//         if (client?.getRole() === "PLAYER") {
//           this.gameEngine.onPlayerDisconnected(client.getClientId());
//         }
//         // this.broadcastSnapshot(this.gameEngine.getSnapshot());
//       });
//     }
//   }
//   // handleMessage processes incoming messages from players.
//   handleMessage(socket, data) {
//     const client = this.clients.get(socket); // Get client associated with this socket
//     if (!client) {
//       console.error("Unknown game client");
//       return;
//     }
//     // console.log(data);
//     const playerId = client.getClientId();
//     let payload;
//     try {
//       payload = JSON.parse(data); // Parse incoming JSON message
//     } catch (error) {
//       console.error("Failed to parse message: ", error);
//       return;
//     }
//     // if (payload.type === ClientMessageType.PLAYER_INPUT) {
//     //   this.inputQueue.push({
//     //     playerId,
//     //     action: payload.action,
//     //   }); // Add player input to the queue
//     // }
//     // console.log("Backend handle message:", payload);
//     switch (payload.type) {
//       case ClientMessageType.PLAYER_READY:
//         if (client.getRole() === "PLAYER") {
//           client.setIsReady(true);
//           this.checkGameStart();
//         }
//         break;
//       case ClientMessageType.PLAYER_INPUT:
//         if (client.getRole() === "PLAYER") {
//           this.inputQueue.push({
//             playerId,
//             action: payload.action,
//           });
//         }
//         break;
//       default:
//         console.log("Unknown type");
//     }
//   }
//   // consumeInputs processes all queued player inputs.
//   // It will be called periodically by the game loop.
//   consumeInputs(deltaTime) {
//     if (this.gameEngine.state.status !== GameStatus.RUNNING) {
//       return; // Freeze the game when the state is not RUNNING
//       // Do not consume inputs coming from players
//     }
//     while (this.inputQueue.length > 0) {
//       const input = this.inputQueue.shift(); // Get the next input from the queue and remove it
//       if (!input) continue; // Safety check
//       this.gameEngine.handlePlayerInput(
//         input.playerId,
//         input.action,
//         deltaTime,
//       ); // Delegate input handling to GameEngine
//     }
//   }
//   checkGameStart() {
//     // Start the game only if we have
//     // 2 players and they are ready
//     const readyPlayers = [...this.clients.values()].filter(
//       (client) => client.getRole() === "PLAYER" && client.getIsReady(),
//     );
//     // Avoid double start of the game
//     // by running or starting the game
//     // only if the game status is WAITING
//     if (
//       readyPlayers.length === 2 &&
//       (this.gameEngine.state.status === GameStatus.WAITING ||
//         this.gameEngine.state.status === GameStatus.WAITING_OPPONENT)
//     ) {
//       this.gameEngine.startGame();
//     }
//     // If one of the players is ready
//     // set the game status to WAITING_OPPONENT
//     if (
//       readyPlayers.length === 1 &&
//       this.gameEngine.state.status === GameStatus.WAITING
//     ) {
//       this.gameEngine.state.status = GameStatus.WAITING_OPPONENT;
//     }
//     // this.broadcastSnapshot(snapshot);
//   }
//   // Data sent in a socket.send() must be a string or a
//   // Buffer. A Buffer is a way of representing binary
//   // data in Node.js. A binary data is any data
//   // that is not plain text, like images, audio files,
//   // or other non-text files. A plain text is just regular
//   // text that you can read and write, like the text in a book
//   // or a simple text file. When sending complex data structures
//   // (like game snapshots) over websockets, we often convert them
//   // to JSON strings because JSON is a widely used format
//   // that is easy to read and write for both humans and machines.
//   // Why not a Buffer ? Because JSON strings are more
//   // human-readable and easier to debug during development.
//   // However, for performance critical applications,
//   // using binary formats (like Protocol Buffers or MessagePack)
//   // may be more efficient. For images, videos, audio files or large datasets,
//   // binary formats are preferred.
//   broadcastSnapshot(snapshot) {
//     const data = { type: ServerMessageType.GAME_SNAPSHOT, snapshot }; // Convert snapshot to JSON string
//     // Broadcast the snapshot to all connected players
//     this.clients.forEach((client, _) => {
//       if (client.getRole() === "PLAYER") {
//         // We need to know each player identity
//         // to the frontend to custom some behaviors
//         // or display based on the player identity
//         const id = client.getClientId();
//         const players = [...this.clients.values()].filter(
//           (client) => client.getRole() === "PLAYER",
//         );
//         const opponent = players.find((player, _) => {
//           return player.getClientId() != id;
//         });
//         const opponentId = opponent?.getClientId();
//         client.send({
//           ...data,
//           snapshot: {
//             ...data.snapshot,
//             you: id,
//             [id]: {
//               ...data.snapshot[id],
//               ready: client.getIsReady(),
//             },
//             [opponentId]: {
//               ...data.snapshot[opponentId],
//               ready: opponent?.getIsReady(),
//             },
//           },
//         });
//       } else {
//         client.send({
//           ...data,
//           snapshot: {
//             ...data.snapshot,
//             you: "SPECTATOR",
//           },
//         });
//       }
//       // Send snapshot data to each player
//       // socket.send(data);
//     });
//     // Or
//     // for (const socket of this.players.keys()) {
//     //     socket.send(data); // Send snapshot data to each player
//     // }
//     // Data sent could look like:
//     // {
//     //     "type": "GAME_SNAPSHOT",
//     //     "players": {
//     //         "player1": { "x": 100, "y": 150, "score": 5 },
//     //         "player2": { "x": 200, "y": 250, "score": 3 }
//     //     },
//     //     "ball": { "x": 150, "y": 200, "vx": 5, "vy": -3 }
//     // }
//   }
//   resetRoom() {
//     this.gameEngine.resetGame();
//     this.clients.forEach((c) => {
//       if (c.getRole() === "PLAYER") {
//         c.setIsReady(false);
//       }
//     });
//     this.broadcastSnapshot(this.gameEngine.getSnapshot());
//   }
//   getClients() {
//     return this.clients;
//   }
// }
// export default GameGateway;
