import { PrismaClient } from "@prisma/client";
import { ChatGateway } from "../chat/chatGateway";

export class ChatService {
  constructor(private prisma: PrismaClient, private chatGateway: ChatGateway) {}

  async createConversation(userId: number, dto: { name?: string; type?: "DIRECT" | "GROUP"; members?: number[] }) {
    const type = dto.type || "GROUP";

    const participants = dto.members
      ? dto.members.map((id) => ({ userId: id }))
      : [];

    participants.push({ userId });

    const conversation = await this.prisma.conversation.create({
      data: {
        name: dto.name,
        type,
        participants: {
          create: participants.map(p => ({ userId: p.userId })),
        },
      },
      include: { participants: { include: { user: true } } },
    });

    this.chatGateway.handleMemberJoinRoomChat(userId, conversation.id);
    return conversation;
  }

  async joinConversation(userId: number, conversationId: number) {
    const conversation = await this.prisma.conversation.findUnique({ where: { id: conversationId } });
    if (!conversation) throw new Error("Conversation not found");

    const existing = await this.prisma.participant.findUnique({
      where: { userId_conversationId: { userId, conversationId } },
    });
    if (existing) return existing;

    const participant = await this.prisma.participant.create({
      data: { userId, conversationId },
    });

    this.chatGateway.handleMemberJoinRoomChat(userId, conversationId);
    return participant;
  }

async getConversationMessages(conversationId: number) {
  return this.prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: { sender: { select: { id: true, username: true } } },
  });
}

async sendMessage(userId: number, dto: { conversationId: number; content: string }) {
  const message = await this.prisma.message.create({
    data: {
      content: dto.content,
      senderId: userId,
      conversationId: dto.conversationId,
    },
    include: { sender: { select: { id: true, username: true } } },
  });

  this.chatGateway.handleEmitNewMessage(message);

  return message;
}

  async getUserConversations(userId: number) {
    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId }
        },
      },
      include: {
        participants: { include: { user: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async leaveConversation(userId: number, conversationId: number) {
    await this.prisma.participant.delete({
      where: { userId_conversationId: { userId, conversationId } },
    });

    this.chatGateway.handleRemoveSocketIdFromRoom(userId, conversationId);
    return { success: true };
  }
}
