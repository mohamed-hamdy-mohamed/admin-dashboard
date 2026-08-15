"use client";

import { useEffect, useMemo, useState } from "react";
import { PAGE_CONTENT_CLASSNAME } from "@/constants/layout";
import { getLocalizedMessages } from "@/lib/localizedContent";
import { Conversation } from "@/types/messages";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ConversationList from "./ConversationList";
import ConversationPanel from "./ConversationPanel";
import MessagesStats from "./MessagesStats";
import { useTranslation } from "@/providers/LanguageProvider";

const MessagesPage = () => {
  const { locale } = useTranslation();
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    getLocalizedMessages(locale).conversations,
  );
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [search, setSearch] = useState<string>("");
  const [mobileView, setMobileView] = useState<"list" | "conversation">("list");

  useEffect(() => {
    setConversations(getLocalizedMessages(locale).conversations);
    setSelectedConversationId(null);
    setMobileView("list");
  }, [locale]);

  const filteredConversations = useMemo(
    () =>
      conversations.filter((conversation) => {
        const normalizedSearch = search.trim().toLowerCase();
        if (!normalizedSearch) {
          return true;
        }

        return (
          conversation.userName.toLowerCase().includes(normalizedSearch) ||
          conversation.lastMessage.toLowerCase().includes(normalizedSearch)
        );
      }),
    [conversations, search],
  );

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId,
  );

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    setMobileView("conversation");
    setConversations((currentConversations) =>
      currentConversations.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation,
      ),
    );
  };

  const handleSendMessage = (content: string) => {
    if (!selectedConversationId) {
      return;
    }

    const timestamp = new Date().toISOString();
    const newMessageId = `msg-${selectedConversationId}-${Date.now()}`;

    setConversations((currentConversations) =>
      currentConversations.map((conversation) => {
        if (conversation.id !== selectedConversationId) {
          return conversation;
        }

        const newMessage = {
          id: newMessageId,
          conversationId: conversation.id,
          content,
          timestamp,
          sender: "outgoing" as const,
        };

        return {
          ...conversation,
          lastMessage: content,
          lastMessageTime: timestamp,
          messages: [...conversation.messages, newMessage],
        };
      }),
    );
  };

  return (
    <main className={PAGE_CONTENT_CLASSNAME}>
      {conversations && <MessagesStats conversations={conversations} />}

      <Card className="overflow-hidden border-border shadow-sm">
        <CardContent className="p-0">
          <div className="grid min-h-[min(620px,calc(100dvh-12rem))] lg:min-h-[620px] lg:grid-cols-[360px_minmax(0,1fr)]">
            <div
              className={cn(
                "min-h-[420px] lg:block",
                mobileView === "conversation" ? "hidden" : "block",
              )}
            >
              <ConversationList
                conversations={filteredConversations}
                selectedConversationId={selectedConversationId ?? ""}
                search={search}
                onSearchChange={setSearch}
                onSelectConversation={handleSelectConversation}
              />
            </div>

            <div
              className={cn(
                "min-h-[420px] lg:block",
                mobileView === "list" ? "hidden lg:block" : "block",
              )}
            >
              <ConversationPanel
                key={selectedConversationId ?? "empty"}
                conversation={selectedConversation}
                showBackButton={mobileView === "conversation"}
                onBack={() => {
                  setSelectedConversationId(null);
                  setMobileView("list");
                }}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default MessagesPage;
