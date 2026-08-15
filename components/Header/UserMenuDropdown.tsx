"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Languages, LogOut } from "lucide-react";
import AdminPic from "@/public/Profile-picture.png";
import ThemeSelect from "@/components/Appearance/ThemeSelect";
import { LANGUAGE_OPTIONS } from "@/constants/appearance";
import { defaultSettings } from "@/constants/settings";
import { useThemeSetting } from "@/hooks/useThemeSetting";
import { useTranslation } from "@/providers/LanguageProvider";
import { Locale } from "@/types/i18n";
import { LanguageOption, ThemeOption } from "@/types/settings";
import { loadSettings, persistSettings } from "@/util/settingsStorage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const UserMenuDropdown = () => {
  const router = useRouter();
  const { locale, setLocale, t } = useTranslation();
  const { activeTheme, setThemeSetting } = useThemeSetting();
  const [open, setOpen] = useState(false);
  const email = useSyncExternalStore(
    () => () => {},
    () => loadSettings().profile.email,
    () => defaultSettings.profile.email,
  );

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
        <Image
          src={AdminPic}
          alt={t("header.profilePictureAlt")}
          width={32}
          height={32}
          sizes="32px"
          className="size-8 rounded-full object-cover ring-1 ring-border"
        />
        <span className="hidden max-w-32 truncate text-sm font-semibold text-foreground sm:inline">
          {t("header.adminUser")}
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
            {t("header.adminUser")}
          </p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
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
          onClick={() => router.push("/login")}
        >
          <LogOut className="size-4" />
          {t("header.userMenu.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuDropdown;
