"use client";

import {
  AppearanceSettings,
  LanguageOption,
} from "@/types/settings";
import { LANGUAGE_OPTIONS } from "@/constants/appearance";
import ThemeSelect from "@/components/Appearance/ThemeSelect";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeSetting } from "@/hooks/useThemeSetting";
import SettingsSection from "./SettingsSection";
import { useTranslation } from "@/providers/LanguageProvider";
import { Locale } from "@/types/i18n";

interface AppearanceSectionProps {
  appearance: AppearanceSettings;
  onChange: (appearance: AppearanceSettings) => void;
}

const AppearanceSection = ({
  appearance,
  onChange,
}: AppearanceSectionProps) => {
  const { setLocale, t } = useTranslation();
  const { setThemeSetting } = useThemeSetting({
    onThemeChange: (theme) => {
      onChange({
        ...appearance,
        theme,
      });
    },
  });

  const handleLanguageChange = (value: LanguageOption) => {
    setLocale(value as Locale);
    onChange({
      ...appearance,
      language: value,
    });
  };

  const languageLabels: Record<LanguageOption, string> = {
    en: t("settings.appearance.languages.en"),
    ar: t("settings.appearance.languages.ar"),
  };

  const getLanguageLabel = (value: LanguageOption | null) =>
    value ? languageLabels[value] : null;

  return (
    <SettingsSection
      title={t("settings.appearance.title")}
      description={t("settings.appearance.description")}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <ThemeSelect
          value={appearance.theme}
          onValueChange={setThemeSetting}
        />

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
              {LANGUAGE_OPTIONS.map((option) => (
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
