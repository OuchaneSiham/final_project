// import { SocketServer } from "../realtime/socketServer.js";
const {socketServer} = require ("../realtime/socketServer");

class ChatGateway {
  constructor(socketServer) {
    this.socketServer = socketServer;
  }

  roomName(conversationId) {
    return `chatRoom_${conversationId}`;
  }

  getSocketId(userId) {
    return this.socketServer.getSocketIdFromUserId(userId);
  }

  handleMemberJoinRoomChat(userId, conversationId) {
    this.joinRoom(userId, conversationId);
  }

  handleRemoveSocketIdFromRoom(userId, conversationId) {
    this.leaveRoom(userId, conversationId);
  }

  joinRoom(userId, conversationId) {
    const socketId = this.getSocketId(userId);
    if (!socketId) return;

    this.socketServer
      .getIO()
      .in(socketId)
      .socketsJoin(this.roomName(conversationId));
  }

  leaveRoom(userId, conversationId) {
    const socketId = this.getSocketId(userId);
    if (!socketId) return;

    this.socketServer
      .getIO()
      .in(socketId)
      .socketsLeave(this.roomName(conversationId));
  }

  handleEmitNewMessage(message) {
    this.socketServer
      .getIO()
      .to(this.roomName(message.conversationId))
      .emit("message:new", message);
  }

  handleEmitUpdateConversation(conversation, senderId) {
    const senderSocket = this.getSocketId(senderId);

    const sockets = conversation.participants
      .map(p => this.getSocketId(p.userId))
      .filter(Boolean);

    this.socketServer
      .getIO()
      .to(sockets)
      .except(senderSocket ?? undefined)
      .emit("conversation:update", conversation);
  }
}

module.exports = ChatGateway;