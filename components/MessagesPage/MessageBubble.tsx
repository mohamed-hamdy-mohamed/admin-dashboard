import { Message } from "@/types/messages";
import { cn } from "@/lib/utils";
import { formatMessageTime } from "@/util/formatMessageTime";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isOutgoing = message.sender === "outgoing";

  return (
    <div
      className={cn("flex flex-col gap-1", isOutgoing ? "items-end" : "items-start")}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isOutgoing
            ? "rounded-br-md bg-slate-800 text-white"
            : "rounded-bl-md bg-slate-100 text-foreground",
        )}
      >
        {message.content}
      </div>

      <span className="px-1 text-xs text-muted-foreground">
        {formatMessageTime(message.timestamp)}
      </span>
    </div>
  );
};

export default MessageBubble;
