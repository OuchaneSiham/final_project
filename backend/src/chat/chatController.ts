import { FastifyInstance } from "fastify";
import { ChatService } from "../chat/chatService";

export function chatController(chatService: ChatService) {
  return async function (fastify: FastifyInstance) {

    fastify.post("/conversation/create", async (request: any, reply) => {
      try {
        const { userId, name, type, members } = request.body;

        const conversation = await chatService.createConversation(
          Number(userId),
          { name, type, members }
        );

        return reply.status(200).send(conversation);
      } catch (err: any) {
        return reply.status(400).send({ error: err.message });
      }
    });

    fastify.post("/conversation/:id/join", async (request: any, reply) => {
      try {
        const userId = Number(request.body.userId);
        const conversationId = Number(request.params.id);

        const participant = await chatService.joinConversation(
          userId,
          conversationId
        );

        return reply.status(200).send(participant);
      } catch (err: any) {
        return reply.status(400).send({ error: err.message });
      }
    });


    fastify.put("/conversation/:id/leave", async (request: any, reply) => {
      try {
        const userId = Number(request.body.userId);
        const conversationId = Number(request.params.id);

        const result = await chatService.leaveConversation(
          userId,
          conversationId
        );

        return reply.status(200).send(result);
      } catch (err: any) {
        return reply.status(400).send({ error: err.message });
      }
    });

    fastify.post("/conversation/:id/message", async (request: any, reply) => {
      try {
        console.log('BODY:', request.body); //remove it 
        const userId = Number(request.body.userId);
        const conversationId = Number(request.params.id);
        const content = request.body.content;

        if (!userId || !content) {
            return reply.status(400).send({
              error: "userId and content are required",
            });
        }

        const message = await chatService.sendMessage(userId, {
          conversationId,
          content,
        });

        return reply.status(200).send(message);
      } catch (err: any) {
        return reply.status(400).send({ error: err.message });
      }
    });


    fastify.get("/conversation", async (request: any, reply) => {
      try {
        const userId = Number(request.query.userId);

        const conversations = await chatService.getUserConversations(userId);

        return reply.status(200).send(conversations);
      } catch (err: any) {
        return reply.status(400).send({ error: err.message });
      }
    });

    fastify.get("/conversation/:id/messages", async (request: any, reply) => {
      try {
        const conversationId = Number(request.params.id);
        const messages = await chatService.getConversationMessages(conversationId);
        return reply.status(200).send(messages);
      } catch (err: any) {
        return reply.status(400).send({ error: err.message });
      }
    });

  };
}
