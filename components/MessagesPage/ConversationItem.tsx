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
        "flex w-full items-start gap-3 border-b border-slate-200 px-4 py-4 text-left transition-colors hover:bg-slate-50",
        isSelected && "border-l-4 border-l-slate-800 bg-slate-100",
      )}
    >
      <Avatar size="lg" className="relative">
        <AvatarImage src={conversation.avatar} alt={conversation.userName} />
        <AvatarBadge
          className={cn(
            "size-3 ring-2 ring-white",
            conversation.status === "online"
              ? "bg-emerald-500"
              : "bg-slate-400",
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
            <Badge className="shrink-0 bg-slate-800 text-white hover:bg-slate-800">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;
