import { useEffect, useState } from "react";
import { ClientMessageType, ServerMessageType } from "../messages/messages";

export default function useGameState(wsRef, connected) {
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
      console.log("data:");
      // Wait to connect before continue
      if (!connected) return; 
      const ws = wsRef.current;
      if (!ws) return;

    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === ServerMessageType.GAME_SNAPSHOT) {
        // console.log("Snapshot received: ", data.snapshot);
        setGameState(data.snapshot);
      }
    };

    ws?.addEventListener("message", handleMessage);
    return () => ws?.removeEventListener("message", handleMessage);
  }, [connected]);

  function sendReady() {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    ws.send(JSON.stringify({ type: ClientMessageType.PLAYER_READY }));
  }

  return { gameState, sendReady };
}
