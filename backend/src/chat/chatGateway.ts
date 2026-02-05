import { SocketServer } from "../realtime/socketServer";
import { Conversation, Participant, Message } from "@prisma/client";

export class ChatGateway {
  constructor(private socketServer: SocketServer) {}

  private roomName(conversationId: number) {
    return `chatRoom_${conversationId}`;
  }

  private getSocketId(userId: number): string | null {
    return this.socketServer.getSocketIdFromUserId(userId);
  }

  handleMemberJoinRoomChat(userId: number, conversationId: number) {
    this.joinRoom(userId, conversationId);
  }

  handleRemoveSocketIdFromRoom(userId: number, conversationId: number) {
    this.leaveRoom(userId, conversationId);
  }

  private joinRoom(userId: number, conversationId: number) {
    const socketId = this.getSocketId(userId);
    if (!socketId) return;

    this.socketServer
      .getIO()
      .in(socketId)
      .socketsJoin(this.roomName(conversationId));
  }

  private leaveRoom(userId: number, conversationId: number) {
    const socketId = this.getSocketId(userId);
    if (!socketId) return;

    this.socketServer
      .getIO()
      .in(socketId)
      .socketsLeave(this.roomName(conversationId));
  }

  handleEmitNewMessage(message: Message) {
    this.socketServer
      .getIO()
      .to(this.roomName(message.conversationId))
      .emit("message:new", message);
  }

  handleEmitUpdateConversation(
    conversation: Conversation & { participants: Participant[] },
    senderId: number
  ) {
    const senderSocket = this.getSocketId(senderId);

    const sockets = conversation.participants
      .map(p => this.getSocketId(p.userId))
      .filter(Boolean) as string[];

    this.socketServer
      .getIO()
      .to(sockets)
      .except(senderSocket ?? undefined)
      .emit("conversation:update", conversation);
  }
}


