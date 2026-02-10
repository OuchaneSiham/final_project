
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const cors = require('@fastify/cors');
const fastify = require('fastify')({ logger: false });
const multipart = require('@fastify/multipart');
const static = require('@fastify/static');
const prisma = require('./config/db'); 
const SocketServer = require("./realtime/socketServer");
const ChatGateway = require("./chat/chatGateway");
const ChatService = require("./chat/chatService");
const chatController = require("./chat/chatController");
const jwtw = require("./routes/plugin");
const userRoutes = require("./routes/user-route");
fastify.register(cors, {
    hook: 'preHandler',
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
});

fastify.register(multipart);
fastify.register(static, {
    root: path.join(__dirname, "..", 'uploads'),
    prefix: "/uploads/"
});
fastify.register(jwtw);
fastify.register(userRoutes, { prefix: "/api/v1/users" });
const socketServer = new SocketServer();
socketServer.init(fastify);

const chatGateway = new ChatGateway(socketServer);
const chatService = new ChatService(prisma, chatGateway);
fastify.register(async (instance) => {
    instance.register(chatController(chatService));
}, { prefix: "/api/v1/chat" });
const start = async () => {
    try {
        await fastify.listen({
            port: 8281,
            host: '0.0.0.0'
        });
        console.log(`
        🚀  SH_GH PROJECT BACKEND
        -------------------------
        ✅  Port: 8281
        ✅  JWT Auth: Active
        ✅  Chat Service: Active
        ✅  WebSockets: Running
        `);
    } catch (err) {
        console.error("❌ Error starting server:", err);
        process.exit(1);
    }
};

start();