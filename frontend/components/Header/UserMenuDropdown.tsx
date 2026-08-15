"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Languages, LogOut } from "lucide-react";
import UserAvatar from "@/components/Auth/UserAvatar";
import ThemeSelect from "@/components/Appearance/ThemeSelect";
import { LANGUAGE_OPTIONS } from "@/constants/appearance";
import { useThemeSetting } from "@/hooks/useThemeSetting";
import { useTranslation } from "@/providers/LanguageProvider";
import { Locale } from "@/types/i18n";
import { LanguageOption, ThemeOption } from "@/types/settings";
import { loadSettings, persistSettings } from "@/util/settingsStorage";
import { getFullName } from "@/util/getFullName";
import { useAuth } from "@/providers/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const UserMenuDropdown = () => {
  const router = useRouter();
  const { logout, user } = useAuth();
  const { locale, setLocale, t } = useTranslation();
  const { activeTheme, setThemeSetting } = useThemeSetting();
  const [open, setOpen] = useState(false);

  const languageLabels: Record<LanguageOption, string> = {
    en: t("settings.appearance.languages.en"),
    ar: t("settings.appearance.languages.ar"),
  };

  const closeMenu = () => {
    setOpen(false);
  };

  const handleLanguageChange = (value: LanguageOption) => {
    closeMenu();
    setLocale(value as Locale);

    const settings = loadSettings();
    persistSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        language: value,
      },
    });
  };

  const handleThemeChange = (value: ThemeOption) => {
    closeMenu();
    setThemeSetting(value);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        className={cn(
          "flex cursor-pointer items-center gap-2 rounded-full border border-transparent p-1 pe-2 transition-colors",
          "hover:border-border hover:bg-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
        aria-label={t("aria.openUserMenu")}
      >
        <UserAvatar
          firstName={user?.firstName}
          lastName={user?.lastName}
          name={getFullName(user?.firstName, user?.lastName, user?.name)}
          avatar={user?.avatar}
          className="size-8"
          sizes="32px"
        />
        <span className="hidden max-w-32 truncate text-sm font-semibold text-foreground sm:inline">
          {getFullName(user?.firstName, user?.lastName, user?.name)}
        </span>
        <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-60 rounded-xl p-2"
      >
        <div className="px-2 py-2">
          <p className="truncate text-sm font-semibold text-foreground">
            {getFullName(user?.firstName, user?.lastName, user?.name)}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>

        <DropdownMenuSeparator />

        <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-muted-foreground">
          <Languages className="size-3.5" />
          {t("header.userMenu.language")}
        </div>

        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => handleLanguageChange(value as LanguageOption)}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option}
              value={option}
              closeOnClick
              className="rounded-lg"
            >
              {languageLabels[option]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <div className="px-2 py-1">
          <ThemeSelect
            id="header-theme"
            value={activeTheme}
            onValueChange={handleThemeChange}
            showLabel={false}
            triggerClassName="h-9 rounded-lg"
          />
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          className="rounded-lg"
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          <LogOut className="size-4" />
          {t("header.userMenu.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuDropdown;
