import { Locale } from "@/types/i18n";
import {
  getDateTimeFormatOptions,
  getIntlLocale,
} from "@/util/formatLocale";

export const formatMessageTime = (
  timestamp: string,
  locale: Locale = "en",
): string => {
  const date = new Date(timestamp);

  return date.toLocaleTimeString(
    getIntlLocale(locale),
    getDateTimeFormatOptions(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
};

export const formatConversationTime = (
  timestamp: string,
  locale: Locale = "en",
): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return formatMessageTime(timestamp, locale);
  }

  return date.toLocaleDateString(
    getIntlLocale(locale),
    getDateTimeFormatOptions(locale, {
      month: "short",
      day: "numeric",
    }),
  );
};
