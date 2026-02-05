import { Server } from "socket.io";
import { FastifyInstance } from "fastify";

export class SocketServer {
  private io!: Server;

  private users = new Map<number, string>();

  private onlineUsers = new Set<number>();

  init(fastify: FastifyInstance) {
    this.io = new Server(fastify.server, {
      cors: { origin: "*" },
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

  getSocketIdFromUserId(userId: number) {
    return this.users.get(userId);
  }

  isUserOnline(userId: number) {
    return this.onlineUsers.has(userId);
  }
}