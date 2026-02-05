import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./utils/prisma.js";
import { SocketServer } from "./realtime/socketServer.js";
import { ChatGateway } from "./chat/chatGateway.js";
import { ChatService } from "./chat/chatService.js";
import { chatController } from "./chat/chatController.js";
import { prisma } from "./utils/prisma.js";// i add it when i change prisma.js

const fastify = Fastify({ logger: true });

const start = async () => {
  await fastify.register(cors, {
    origin: "http://localhost:3000",
  });

  const socketServer = new SocketServer();
  socketServer.init(fastify);

  const chatGateway = new ChatGateway(socketServer);
  const chatService = new ChatService(prisma, chatGateway);

  fastify.register(chatController(chatService));

  await fastify.listen({ port: 3001, host: "0.0.0.0" });
  console.log("Server running on http://localhost:3001");
};

start().catch(console.error);

