// import Fastify from "fastify";
const fastify = require('fastify')(); 
// import cors from "@fastify/cors";
const cors = require("@fastify/cors");

// import { prisma } from "./utils/prisma.js";
const prisma = require("./utils/prisma.js");
// import { SocketServer } from "./realtime/socketServer.js";
// import { ChatGateway } from "./chat/chatGateway.js";
// import { ChatService } from "./chat/chatService.js";
// import { chatController } from "./chat/chatController.js";

const SocketServer  = require("./realtime/socketServer.js");
const ChatGateway  = require("./chat/chatGateway.js");
const ChatService = require("./chat/chatService.js");
const  chatController = require("./chat/chatController.js");


// const fastify = Fastify({ logger: true });

const start = async () => {
  // await fastify.register(cors, {
  //   origin: "http://localhost:3000",
  // });
    await fastify.register(cors, {
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
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

