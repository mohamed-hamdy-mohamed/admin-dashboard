"use client";

import { useMemo } from "react";
import { Conversation } from "@/types/messages";
import { Mail, MessageCircle, MessagesSquare } from "lucide-react";
import StatsCard from "../ui/StatsCard";
import { Stats } from "@/types/stats";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatNumber } from "@/util/formatNumber";

interface MessagesStatsProps {
  conversations: Conversation[];
}

const MessagesStats = ({ conversations }: MessagesStatsProps) => {
  const { locale, t } = useTranslation();

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

  const stats = useMemo<Stats[]>(
    () => [
      {
        title: t("messages.stats.totalMessages.title"),
        value: formatNumber(totalMessages, locale),
        description: t("messages.stats.totalMessages.description"),
        icon: MessagesSquare,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
      },
      {
        title: t("messages.stats.unread.title"),
        value: formatNumber(unreadMessages, locale),
        description: t("messages.stats.unread.description"),
        icon: Mail,
        iconBg: "bg-violet-100",
        iconColor: "text-violet-600",
      },
      {
        title: t("messages.stats.activeConversations.title"),
        value: formatNumber(activeConversations, locale),
        description: t("messages.stats.activeConversations.description"),
        icon: MessageCircle,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
      },
    ],
    [activeConversations, locale, t, totalMessages, unreadMessages],
  );

  return <StatsCard stats={stats} />;
};

export default MessagesStats;
