// import { SocketServer } from "../realtime/socketServer.js";
const {socketServer} = require ("../realtime/socketServer");

class ChatGateway {
  constructor(socketServer) {
    this.socketServer = socketServer;
  }

  handleEmitNewMessage(message) {
  this.socketServer
    .getIO()
    .to(`chat_${message.conversationId}`)
    .emit("message:new", message);
  }

}

module.exports = ChatGateway;