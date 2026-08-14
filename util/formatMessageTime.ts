export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatConversationTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return formatMessageTime(timestamp);
  }

  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
};
