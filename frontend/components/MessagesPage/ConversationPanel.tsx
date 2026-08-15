"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Conversation } from "@/types/messages";
import { cn } from "@/lib/utils";
import { Avatar, AvatarBadge, AvatarImage } from "@/components/atoms/ui/avatar";
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import MessageBubble from "./MessageBubble";
import { useTranslation } from "@/providers/LanguageProvider";

interface ConversationPanelProps {
  conversation: Conversation | undefined;
  showBackButton?: boolean;
  onBack?: () => void;
  onSendMessage: (content: string) => void;
}

const ConversationPanel = ({
  conversation,
  showBackButton = false,
  onBack,
  onSendMessage,
}: ConversationPanelProps) => {
  const { t } = useTranslation();
  const [draft, setDraft] = useState<string>("");
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!conversation) {
      return;
    }

    const container = messagesContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [conversation, conversation?.messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedDraft = draft.trim();
    if (!trimmedDraft || !conversation) {
      return;
    }

    onSendMessage(trimmedDraft);
    setDraft("");
  };

  if (!conversation) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-foreground">
            {t("messages.panel.selectTitle")}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {t("messages.panel.selectDescription")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex min-w-0 items-center gap-3 border-b border-border px-3 py-3 sm:px-4 sm:py-4">
        {showBackButton && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onBack}
            aria-label={t("aria.backToConversations")}
          >
            <ArrowLeft />
          </Button>
        )}

        <Avatar size="lg" className="relative">
          <AvatarImage
            src={conversation.avatar}
            alt={conversation.userName}
            sizes="40px"
          />
          <AvatarBadge
            className={cn(
              "size-3 ring-2 ring-card",
              conversation.status === "online"
                ? "bg-emerald-500"
                : "bg-muted-foreground",
            )}
          />
        </Avatar>

        <div className="min-w-0">
          <p className="truncate font-semibold text-foreground">{conversation.userName}</p>
          <p className="text-sm capitalize text-muted-foreground">
            {conversation.status === "online"
              ? t("common.online")
              : t("common.offline")}
          </p>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5"
      >
        {conversation.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex min-w-0 items-center gap-2 border-t border-border p-3 sm:p-4"
      >
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={t("messages.panel.messagePlaceholder")}
          className="h-11 min-w-0 flex-1 rounded-xl"
        />

        <Button
          type="submit"
          size="icon"
          className="size-11 shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
          aria-label={t("aria.sendMessage")}
        >
          <Send />
        </Button>
      </form>
    </div>
  );
};

export default ConversationPanel;
