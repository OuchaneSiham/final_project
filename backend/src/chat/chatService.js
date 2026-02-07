// import { ChatGateway } from "./chatGateway.js";
const ChatGateway = require("./chatGateway.js")
class ChatService {
  constructor(prisma, chatGateway) {
    this.prisma = prisma;
    this.chatGateway = chatGateway;
  }

  async createConversation(userId, dto) {
    const type = dto.type || "GROUP";

    const participants = dto.members
      ? dto.members.map(id => ({ userId: id }))
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

  async joinConversation(userId, conversationId) {
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
  async getConversationMessages(conversationId) {
    return this.prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: {
          select: {
            id: true,
            username: true
          }
        }
      },
      orderBy: { createdAt: "asc" }
    })
  }


  async sendMessage(userId, dto) {
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

  async getUserConversations(userId) {
    return this.prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId },
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

  async leaveConversation(userId, conversationId) {
    await this.prisma.participant.delete({
      where: { userId_conversationId: { userId, conversationId } },
    });

    this.chatGateway.handleRemoveSocketIdFromRoom(userId, conversationId);
    return { success: true };
  }

  async blockUser(blockerId, blockedId) {
    return prisma.blockedUser.create({
      data: {
        blockerId,
        blockedId,
      },
    });
  }

  async getBlockedUsers(userId) {
    return prisma.blockedUser.findMany({
      where: { blockerId: userId },
      include: { blocked: { select: { id: true, username: true } } },
    });
  }

}

module.exports = ChatService;