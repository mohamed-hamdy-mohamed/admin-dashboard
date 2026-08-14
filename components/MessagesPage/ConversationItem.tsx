import { Conversation } from "@/types/messages";
import { cn } from "@/lib/utils";
import { formatConversationTime } from "@/util/formatMessageTime";
import { Avatar, AvatarBadge, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ConversationItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (conversationId: string) => void;
}

const ConversationItem = ({
  conversation,
  isSelected,
  onSelect,
}: ConversationItemProps) => {
  return (
    <button
      type="button"
      onClick={() => onSelect(conversation.id)}
      className={cn(
        "flex w-full items-start gap-3 border-b border-border px-4 py-4 text-left transition-colors hover:bg-muted",
        isSelected && "border-l-4 border-l-primary bg-muted",
      )}
    >
      <Avatar size="lg" className="relative">
        <AvatarImage src={conversation.avatar} alt={conversation.userName} />
        <AvatarBadge
          className={cn(
            "size-3 ring-2 ring-card",
            conversation.status === "online"
              ? "bg-emerald-500"
              : "bg-muted-foreground",
          )}
        />
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate font-semibold text-foreground">
            {conversation.userName}
          </p>
          <span className="shrink-0 text-xs text-muted-foreground">
            {formatConversationTime(conversation.lastMessageTime)}
          </span>
        </div>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-sm text-muted-foreground">
            {conversation.lastMessage}
          </p>

          {conversation.unreadCount > 0 && (
            <Badge className="shrink-0 bg-primary text-primary-foreground hover:bg-primary">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;
