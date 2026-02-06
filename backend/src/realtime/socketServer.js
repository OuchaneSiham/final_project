// import { Server } from "socket.io";
const {Server} = require ("socket.io");
class SocketServer {
  constructor() {
    this.io = null;
    this.users = new Map();
    this.onlineUsers = new Set();
  }
  init(fastify) {
    this.io = new Server(fastify.server, {
      cors: {
        origin: true,
        credentials: true,
      },
    });
    
    this.io.on("connection", (socket) => {
      const userId = Number(socket.handshake.auth?.userId);
      
      if (!userId || Number.isNaN(userId)) {
        socket.disconnect();
        return;
      }
      
      this.users.set(userId, socket.id);
      this.onlineUsers.add(userId);
      
      console.log(`🟢 User ${userId} connected`);
      
      this.io.emit("user:online", { userId });
      
      socket.on("disconnect", () => {
        this.users.delete(userId);
        this.onlineUsers.delete(userId);

        console.log(`🔴 User ${userId} disconnected`);

        this.io.emit("user:offline", { userId });
      });
    });
  }

  getIO() {
    return this.io;
  }
  
  getSocketIdFromUserId(userId) {
    return this.users.get(userId);
  }
  
  isUserOnline(userId) {
    return this.onlineUsers.has(userId);
  }
}

module.exports = SocketServer