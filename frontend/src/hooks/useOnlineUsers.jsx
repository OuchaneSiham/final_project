'use client';

import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

export function useOnlineUsers() {
  const socket = useSocket();
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleOnline = ({ userId }) => {
      setOnlineUsers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
    };

    const handleOffline = ({ userId }) => {
      setOnlineUsers((prev) => prev.filter((id) => id !== userId));
    };

    socket.on("user:online", handleOnline);
    socket.on("user:offline", handleOffline);

    return () => {
      socket.off("user:online", handleOnline);
      socket.off("user:offline", handleOffline);
    };
  }, [socket]);

  return onlineUsers;
}
