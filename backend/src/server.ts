import Fastify from "fastify";
import cors from "@fastify/cors";
import prisma from "./utils/prisma";
import { SocketServer } from "./realtime/socketServer";
import { ChatGateway } from "./chat/chatGateway";
import { ChatService } from "./chat/chatService";
import { chatController } from "./chat/chatController";

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
