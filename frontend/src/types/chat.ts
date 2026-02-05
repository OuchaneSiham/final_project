import { User } from "./user";

export interface Conversation {
  id: number;
  name?: string;
  type: "DIRECT" | "GROUP";
  participants: Participant[];
  messages?: Message[];
}

export interface Participant {
  id: number;
  userId: number;
  role: "OWNER" | "ADMIN" | "MEMBER";
  muted: boolean;
  banned: boolean;
  user: User;
}

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  sender: User;
  conversationId: number;
}
