// import { useState } from "react";
// import "./App.css";
// import Game from "./components/Game";
// import { GameOver } from "./components/GameOver";
// import { GameWaiting } from "./components/GameWaiting";
// import PlayerWaiting from "./components/PlayerWaiting";
// import useGameState from "./hooks/useGameState";
// import RoomPage from "./components/RoomPage";
// import GamePaused from "./components/GamePaused";
// import GameSpectator from "./components/GameSpectator";
// import { useGameSocket } from "./hooks/useGameSocket";

// function App() {
//   // Fetch the roomId from local storage if it exists
//   // because when a client refreshes the page the roomId
//   // is loss so instead set the roomId in local storage
//   // to persist it and fetch it  if needed.
//   const [roomId, setRoomId] = useState(() => {
//     return sessionStorage.getItem("roomId") || null;
//   });
//   // Update the roomId in the local storage when it changes
//   const handleSelectRoom = (id) => {
//     setRoomId(id);
//     sessionStorage.setItem("roomId", id);
//   };
//   const { wsRef, connected, leaveRoom } = useGameSocket(roomId, setRoomId);
//   const { gameState, sendReady } = useGameState(wsRef, connected);
//   if (!roomId) {
//     return <RoomPage onSelectRoom={handleSelectRoom} />; // Choix ou création de room
//   }

//   if (!connected) return <div>Connecting to room {roomId}...</div>;
//   if (!gameState) return <div>Loading Game State...</div>;

//   // Spectator mode
//   if (gameState.you === "SPECTATOR") {
//     if (gameState.status === "WAITING")
//       return <GameWaiting sendReady={sendReady} spectator={true} leaveRoom={leaveRoom} />;
//     if (gameState.status === "PAUSED") return <GamePaused text="Game paused" />;
//     if (gameState.status === "FINISHED")
//       return <GameOver gameState={gameState} />;
//     return (
//       <GameSpectator
//         gameState={gameState}
//         wsRef={wsRef}
//         leaveRoom={leaveRoom}
//       />
//     );
//   }

//   const me = gameState[gameState.you];
//   const opponent =
//     gameState.you === "player1" ? gameState.player2 : gameState.player1;

//   if (!me.ready) return <GameWaiting sendReady={sendReady} spectator={false} leaveRoom={leaveRoom} />;
//   if (me.ready && !opponent.ready) return <PlayerWaiting />;
//   if (gameState.status === "PAUSED")
//     return <GamePaused text="Player disconnected" />;
//   if (gameState.status === "FINISHED")
//     return <GameOver gameState={gameState} />;

//   // If not display the game page
//   return (
//     <>
//       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
//         <h1 className="mb-6 text-5xl font-extrabold tracking-widest uppercase">
//           Pong
//         </h1>

//         <button
//           className="mb-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
//           onClick={leaveRoom}
//         >
//           Quit Room
//         </button>

//         <Game gameState={gameState} wsRef={wsRef} />
//       </div>
//     </>
//   );
// }

// export default App;
import { useState } from "react";
import "./App.css";

import Game from "./components/Game";
import { GameOver } from "./components/GameOver";
import { GameWaiting } from "./components/GameWaiting";
import PlayerWaiting from "./components/PlayerWaiting";
import RoomPage from "./components/RoomPage";
import GamePaused from "./components/GamePaused";
import GameSpectator from "./components/GameSpectator";

import useGameState from "./hooks/useGameState";
import { useGameSocket } from "./hooks/useGameSocket";

function App() {
  // Persist roomId across refresh
  const [roomId, setRoomId] = useState(() => {
    return sessionStorage.getItem("roomId") || null;
  });

  const handleSelectRoom = (id) => {
    setRoomId(id);
    sessionStorage.setItem("roomId", id);
  };

  const { wsRef, connected, leaveRoom } = useGameSocket(roomId, setRoomId);
  const { gameState, sendReady } = useGameState(wsRef, connected);
  //   const status = gameState.status;
  //   const isWaiting = status === "WAITING" || "WAITING_OPPONENT";

  // If no room send the client on the room page
  if (!roomId) {
    return <RoomPage onSelectRoom={handleSelectRoom} />;
  }

  // Connection state
  if (!connected) {
    return <div>Connecting to room {roomId}...</div>;
  }

  if (!gameState) {
    return <div>Loading Game State...</div>;
  }

  /* ----------------------------------
ABSOLUTE PRIORITY: GAME STATUS
(fix READY desync bug)
---------------------------------- */
  if (gameState.status === "RUNNING") {
    if (
      gameState.you === "SPECTATOR" 
    //   || (gameState.aiEnabled && gameState.you === "player2")
    ) {
      return (
        <GameSpectator
          gameState={gameState}
          wsRef={wsRef}
          leaveRoom={leaveRoom}
        />
      );
    }
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <h1 className="mb-6 text-5xl font-extrabold tracking-widest uppercase">
          Pong
        </h1>

        <button
          className="mb-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          onClick={leaveRoom}
        >
          Quit Room
        </button>

        <Game gameState={gameState} wsRef={wsRef} />
      </div>
    );
  }

  /* ----------------------------------
SPECTATOR MODE
---------------------------------- */
  if (gameState.you === "SPECTATOR") {
    console.log(gameState);
    if (
      gameState.status === "WAITING" ||
      gameState.status === "WAITING_OPPONENT"
    ) {
      return (
        <GameWaiting sendReady={sendReady} spectator leaveRoom={leaveRoom} />
      );
    }
    if (gameState.status === "PAUSED") {
      return <GamePaused text="Game paused" />;
    }
    if (gameState.status === "FINISHED") {
      return <GameOver gameState={gameState} />;
    }

    return <div>Unknown game state for spectator</div>;
  }

  /* ----------------------------------
PLAYER MODE (WAITING / READY)
---------------------------------- */
  const me = gameState[gameState.you];
  console.log(gameState.you);
  const opponent =
    gameState.you === "player1" ? gameState.player2 : gameState.player1;

  const opponentReady = opponent?.ready || gameState.aiEnabled;

  if (!me.ready) {
    return (
      <GameWaiting
        sendReady={sendReady}
        spectator={false}
        leaveRoom={leaveRoom}
      />
    );
  }

  if (me.ready && !opponentReady && gameState.status === "WAITING_OPPONENT") {
    return <PlayerWaiting />;
  }

  if (gameState.status === "PAUSED") {
    return <GamePaused text="Player disconnected" />;
  }

  if (gameState.status === "FINISHED") {
    return <GameOver gameState={gameState} />;
  }

  // Fallback (should never happen)
  return (
    <div>
      Unknown game state <br />
      Status: ${gameState.status} <br />
      You: ${gameState.you}
    </div>
  );
}

export default App;
