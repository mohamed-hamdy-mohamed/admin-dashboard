"use client";

import { Conversation } from "@/types/messages";
import MessageSearch from "./MessageSearch";
import ConversationItem from "./ConversationItem";
import { useTranslation } from "@/providers/LanguageProvider";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelectConversation: (conversationId: string) => void;
}

const ConversationList = ({
  conversations,
  selectedConversationId,
  search,
  onSearchChange,
  onSelectConversation,
}: ConversationListProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-full min-h-0 flex-col border-border lg:border-e">
      <div className="border-b border-border p-4">
        <MessageSearch value={search} onChange={onSearchChange} />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
              isSelected={conversation.id === selectedConversationId}
              onSelect={onSelectConversation}
            />
          ))
        ) : (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            {t("messages.emptyConversations")}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
