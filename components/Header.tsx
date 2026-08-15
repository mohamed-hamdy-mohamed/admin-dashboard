"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import AdminPic from "@/public/Profile-picture.png";
import { useTranslation } from "@/providers/LanguageProvider";

const AppNotifications = dynamic(
  () => import("./Header/NotificationsDropdown"),
);

const Header = () => {
  const { locale, t } = useTranslation();

  return (
    <header className="mx-4 mb-2 mt-4 rounded-lg border border-sidebar-border bg-sidebar sm:mx-6 lg:mx-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {t("header.dashboardTitle")}
        </h1>
        <div className="flex items-center gap-3 sm:gap-6">
          <span
            className="cursor-pointer text-xl leading-none shadow-md transition-transform hover:scale-105"
            aria-label={t("header.countryFlagAlt")}
          >
            {locale === "en" ? "🇬🇧" : "🇪🇬"}
          </span>
          <AppNotifications />
          <Image
            src={AdminPic}
            alt={t("header.profilePictureAlt")}
            width={32}
            height={32}
            sizes="32px"
            className="size-8 rounded-full object-cover ring-1 ring-border"
          />
          <span className="font-semibold text-foreground">
            {t("header.adminUser")}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
