"use client";

import { useMemo, useState } from "react";
import { Bell } from "lucide-react";
import { notificationsData } from "@/constants/notifications";
import { Notification } from "@/types/notifications";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const AppNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(
    notificationsData.notifications,
  );

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
        className="relative cursor-pointer rounded-full p-2 transition-colors hover:bg-slate-600"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 cursor-pointer text-white" />

        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-96 h-full rounded-xl border border-slate-200 p-0 shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Notifications</p>
            <p className="text-xs text-slate-500">
              {unreadCount > 0
                ? `${unreadCount} unread`
                : "You're all caught up"}
            </p>
          </div>

          {unreadCount > 0 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-slate-600 hover:text-slate-900"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
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
                  "mb-2 w-full rounded-xl border border-slate-200 p-3 text-left transition-colors last:mb-0 hover:opacity-90",
                  notification.read ? "bg-gray-50" : "bg-gray-200",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {notification.title}
                  </p>
                  {!notification.read && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-800" />
                  )}
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  {notification.message}
                </p>
                <p className="mt-2 text-xs text-slate-500">{notification.time}</p>
              </button>
            ))
          ) : (
            <div className="px-2 py-6 text-center text-sm text-slate-500">
              No notifications yet.
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppNotifications;
