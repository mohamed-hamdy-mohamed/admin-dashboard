"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { getLocalizedNotifications } from "@/lib/localizedContent";
import { Notification } from "@/types/notifications";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatNumber } from "@/util/formatNumber";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const AppNotifications = () => {
  const { locale, t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>(() =>
    getLocalizedNotifications(locale).notifications,
  );

  useEffect(() => {
    setNotifications(getLocalizedNotifications(locale).notifications);
  }, [locale]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications],
  );

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative cursor-pointer rounded-full p-2 transition-colors hover:bg-muted"
        aria-label={t("aria.notifications")}
      >
        <Bell className="h-5 w-5 cursor-pointer text-foreground" />

        {unreadCount > 0 && (
          <span className="absolute end-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {formatNumber(unreadCount, locale)}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="h-full w-[min(24rem,calc(100vw-1.5rem))] rounded-xl border border-border p-0 shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {t("notifications.title")}
            </p>
            <p className="text-xs text-muted-foreground">
              {unreadCount > 0
                ? t("notifications.unread", { count: unreadCount })
                : t("notifications.allCaughtUp")}
            </p>
          </div>

          {unreadCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground hover:text-foreground"
              onClick={handleMarkAllAsRead}
            >
              {t("notifications.markAllAsRead")}
            </Button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <button
                key={notification.id}
                type="button"
                onClick={() => handleMarkAsRead(notification.id)}
                className={cn(
                  "mb-2 w-full rounded-xl border border-border p-3 text-start transition-colors last:mb-0 hover:opacity-90",
                  notification.read ? "bg-secondary" : "bg-accent",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-foreground">
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </button>
            ))
          ) : (
            <div className="px-2 py-6 text-center text-sm text-muted-foreground">
              {t("notifications.empty")}
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppNotifications;
