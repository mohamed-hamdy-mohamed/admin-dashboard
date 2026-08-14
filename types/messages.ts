export type UserStatus = "online" | "offline";

export type MessageSender = "incoming" | "outgoing";

export interface Message {
  id: string;
  conversationId: string;
  content: string;
  timestamp: string;
  sender: MessageSender;
}

export interface Conversation {
  id: string;
  userName: string;
  avatar: string;
  status: UserStatus;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export interface MessagesData {
  conversations: Conversation[];
}
