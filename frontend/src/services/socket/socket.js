

import { io } from "socket.io-client";
import { API_URL } from "@/utils/constants";

let socket = null;

export function connectSocket(userId) {
  if (socket) return socket;

  socket = io(API_URL, {
    auth: {
      userId,
    },
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

