"use client";

import dynamic from "next/dynamic";
import { Menu } from "lucide-react";
import { useTranslation } from "@/providers/LanguageProvider";

const AppNotifications = dynamic(
  () => import("./Header/NotificationsDropdown"),
);

const UserMenuDropdown = dynamic(() => import("./Header/UserMenuDropdown"));

interface HeaderProps {
  onOpenMobileSidebar: () => void;
}

const Header = ({ onOpenMobileSidebar }: HeaderProps) => {
  const { t } = useTranslation();

  return (
    <header className="mx-4 mb-2 mt-4 rounded-lg border border-sidebar-border bg-sidebar sm:mx-6 lg:mx-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            aria-label={t("aria.toggleSidebar")}
            className="shrink-0 cursor-pointer rounded-xl p-2 text-foreground hover:bg-muted lg:hidden"
            onClick={onOpenMobileSidebar}
          >
            <Menu className="size-5" />
          </button>
          <h1 className="truncate text-lg font-semibold text-foreground sm:text-2xl">
            {t("header.dashboardTitle")}
          </h1>
        </div>
        <div className="flex h-10 shrink-0 items-center gap-2 sm:gap-4">
          <AppNotifications />
          <UserMenuDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
