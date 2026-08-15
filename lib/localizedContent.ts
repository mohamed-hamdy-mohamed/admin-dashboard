import { helpData } from "@/constants/help";
import { notificationsData } from "@/constants/notifications";
import { getDictionary } from "@/lib/i18n";
import { Locale } from "@/types/i18n";
import { HelpFaqItem } from "@/types/help";
import { MessagesData } from "@/types/messages";
import { NotificationsData } from "@/types/notifications";
import { localizeDigitsInString } from "@/util/formatLocale";

export function getLocalizedMessages(locale: Locale): MessagesData {
  return {
    conversations: getDictionary(locale).messages.conversations.map(
      (conversation) => ({
        ...conversation,
        status: conversation.status as "online" | "offline",
        messages: conversation.messages.map((message) => ({
          ...message,
          sender: message.sender as "incoming" | "outgoing",
        })),
      }),
    ),
  };
}

export function getLocalizedNotifications(locale: Locale): NotificationsData {
  return {
    notifications: getDictionary(locale).notifications.items.map(
      (item, index) => ({
        ...item,
        message: localizeDigitsInString(item.message, locale),
        time: localizeDigitsInString(item.time, locale),
        read: notificationsData.notifications[index]?.read ?? false,
      }),
    ),
  };
}

export function getLocalizedFaqs(locale: Locale): HelpFaqItem[] {
  const translatedFaqs = getDictionary(locale).help.faqs;

  return translatedFaqs.map((faq, index) => ({
    ...helpData.faqs[index],
    id: faq.id,
    question: localizeDigitsInString(faq.question, locale),
    answer: localizeDigitsInString(faq.answer, locale),
  }));
}
