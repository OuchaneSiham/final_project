import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useGameSocket(roomId, setRoomId) {
  const wsRef = useRef(null);
  const [connected, setConnected] = useState(false);

  // Générer un userId unique et persistant
  let userId = sessionStorage.getItem("userId");
  if (!userId) {
    userId = uuidv4();
    sessionStorage.setItem("userId", userId);
  }

  useEffect(() => {
    if (!roomId) return; // ne pas se connecter si pas de room
    // In react there is a strict mode which unmount and mount 
    // components to ensure that side effects are well used
    // so during this re-render we want want to create only once 
    // our connection and persist it avoiding creating new one
    // on each re-render 
    if (wsRef.current) return; // éviter double connexion en strict mode

    const connectWS = async () => {
      try {
        // Récupérer le token
        const res = await fetch(
          `http://localhost:3000/fake-login?user=${userId}`,
        );
        const data = await res.json();
        const { token } = data;

        // Connexion WebSocket vers la room spécifique
        const WS_URL = `${import.meta.env.VITE_WS_URL}/?token=${token}&roomId=${roomId}`;
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
          console.log(`WS connected to room ${roomId}`);
          setConnected(true);
        };
        // ws.onmessage = (e) => {
        //   console.log(e.data);
        // };
        ws.onclose = () => {
          console.log("WS closed");
          setConnected(false);
          wsRef.current = null;
        };
        ws.onerror = (err) => console.error("WS error:", err);

        wsRef.current = ws;
      } catch (err) {
        console.error("Failed to connect WS:", err);
      }
    };

    connectWS();

    return () => {
      console.log("Clean up -> closing WS");
      if (wsRef.current) wsRef.current.close();
    };
  }, [roomId, userId]);

  // Function to call when the client want to leave room
  const leaveRoom = () => {
    if (wsRef.current) wsRef.current.close;
    // And remove the roomId store from the local storage
    sessionStorage.removeItem("roomId");
    setRoomId(null);
  };

  return { wsRef, connected, leaveRoom };
}
