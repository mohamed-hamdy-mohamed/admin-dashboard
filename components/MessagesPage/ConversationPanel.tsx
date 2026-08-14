"use client";

import {  FormEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Conversation } from "@/types/messages";
import { cn } from "@/lib/utils";
import { Avatar, AvatarBadge, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageBubble from "./MessageBubble";

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

  if (!conversation ) {
    return (
      <div className="flex h-full min-h-[420px] items-center justify-center px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-foreground">
            Select a conversation
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a conversation from the list to start messaging.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4">
        {showBackButton && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onBack}
            aria-label="Back to conversations"
          >
            <ArrowLeft />
          </Button>
        )}

        <Avatar size="lg" className="relative">
          <AvatarImage
            src={conversation.avatar}
            alt={conversation.userName}
          />
          <AvatarBadge
            className={cn(
              "size-3 ring-2 ring-white",
              conversation.status === "online"
                ? "bg-emerald-500"
                : "bg-slate-400",
            )}
          />
        </Avatar>

        <div>
          <p className="font-semibold text-foreground">{conversation.userName}</p>
          <p className="text-sm capitalize text-muted-foreground">
            {conversation.status}
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
        className="flex items-center gap-2 border-t border-slate-200 p-4"
      >
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Type your message..."
          className="h-11 rounded-xl"
        />

        <Button
          type="submit"
          size="icon"
          className="size-11 shrink-0 rounded-xl bg-slate-800 text-white hover:bg-slate-700"
          aria-label="Send message"
        >
          <Send />
        </Button>
      </form>
    </div>
  );
};

export default ConversationPanel;
