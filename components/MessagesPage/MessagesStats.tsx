import { Conversation } from "@/types/messages";
import { Mail, MessageCircle, MessagesSquare } from "lucide-react";
import StatsCard from "../ui/StatsCard";
import { Stats } from "@/types/stats";

interface MessagesStatsProps {
  conversations: Conversation[];
}

const MessagesStats = ({ conversations }: MessagesStatsProps) => {
  const totalMessages = conversations.reduce(
    (total, conversation) => total + conversation.messages.length,
    0,
  );

  const unreadMessages = conversations.reduce(
    (total, conversation) => total + conversation.unreadCount,
    0,
  );

  const activeConversations = conversations.filter(
    (conversation) => conversation.status === "online",
  ).length;

  const stats: Stats[] = [
    {
      title: "Total Messages",
      value: totalMessages,
      description: "Messages across all conversations",
      icon: MessagesSquare,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Unread",
      value: unreadMessages,
      description: "Messages waiting for a reply",
      icon: Mail,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
    },
    {
      title: "Active Conversations",
      value: activeConversations,
      description: "Users currently online",
      icon: MessageCircle,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return <StatsCard stats={stats} />;
};

export default MessagesStats;
