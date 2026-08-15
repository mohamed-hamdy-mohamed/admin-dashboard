"use client";

import { useTheme } from "next-themes";
import {
  AppearanceSettings,
  LanguageOption,
  ThemeOption,
} from "@/types/settings";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SettingsSection from "./SettingsSection";
import { useTranslation } from "@/providers/LanguageProvider";
import { Locale } from "@/types/i18n";

interface AppearanceSectionProps {
  appearance: AppearanceSettings;
  onChange: (appearance: AppearanceSettings) => void;
}

const themeOptions: ThemeOption[] = ["light", "dark", "system"];
const languageOptions: LanguageOption[] = ["en", "ar"];

const AppearanceSection = ({
  appearance,
  onChange,
}: AppearanceSectionProps) => {
  const { setTheme } = useTheme();
  const { setLocale, t } = useTranslation();

  const handleThemeChange = (value: ThemeOption) => {
    setTheme(value);
    onChange({
      ...appearance,
      theme: value,
    });
  };

  const handleLanguageChange = (value: LanguageOption) => {
    setLocale(value as Locale);
    onChange({
      ...appearance,
      language: value,
    });
  };

  const themeLabels: Record<ThemeOption, string> = {
    light: t("settings.appearance.themes.light"),
    dark: t("settings.appearance.themes.dark"),
    system: t("settings.appearance.themes.system"),
  };

  const languageLabels: Record<LanguageOption, string> = {
    en: t("settings.appearance.languages.en"),
    ar: t("settings.appearance.languages.ar"),
  };

  const getThemeLabel = (value: ThemeOption | null) =>
    value ? themeLabels[value] : null;

  const getLanguageLabel = (value: LanguageOption | null) =>
    value ? languageLabels[value] : null;

  return (
    <SettingsSection
      title={t("settings.appearance.title")}
      description={t("settings.appearance.description")}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="theme">{t("settings.appearance.theme")}</Label>
          <Select
            value={appearance.theme}
            onValueChange={(value) => handleThemeChange(value as ThemeOption)}
          >
            <SelectTrigger id="theme" className="h-11 w-full rounded-xl">
              <SelectValue placeholder={t("settings.appearance.selectTheme")}>
                {(value) => getThemeLabel(value as ThemeOption | null)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {themeLabels[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="language">{t("settings.appearance.language")}</Label>
          <Select
            value={appearance.language}
            onValueChange={(value) =>
              handleLanguageChange(value as LanguageOption)
            }
          >
            <SelectTrigger id="language" className="h-11 w-full rounded-xl">
              <SelectValue placeholder={t("settings.appearance.selectLanguage")}>
                {(value) => getLanguageLabel(value as LanguageOption | null)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {languageLabels[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </SettingsSection>
  );
};

export default AppearanceSection;
