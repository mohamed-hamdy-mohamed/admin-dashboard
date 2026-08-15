"use client";

import { THEME_OPTIONS } from "@/constants/appearance";
import { useTranslation } from "@/providers/LanguageProvider";
import { ThemeOption } from "@/types/settings";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface ThemeSelectProps {
  value: ThemeOption;
  onValueChange: (value: ThemeOption) => void;
  id?: string;
  showLabel?: boolean;
  triggerClassName?: string;
}

const ThemeSelect = ({
  value,
  onValueChange,
  id = "theme",
  showLabel = true,
  triggerClassName,
}: ThemeSelectProps) => {
  const { t } = useTranslation();

  const themeLabels: Record<ThemeOption, string> = {
    light: t("settings.appearance.themes.light"),
    dark: t("settings.appearance.themes.dark"),
    system: t("settings.appearance.themes.system"),
  };

  const getThemeLabel = (option: ThemeOption | null) =>
    option ? themeLabels[option] : null;

  return (
    <div className="grid gap-2">
      {showLabel ? (
        <Label htmlFor={id}>{t("settings.appearance.theme")}</Label>
      ) : null}
      <Select
        value={value}
        onValueChange={(nextValue) => onValueChange(nextValue as ThemeOption)}
      >
        <SelectTrigger 
          id={id}
          className={cn("h-11 w-full rounded-xl", triggerClassName)}
        >
          <SelectValue placeholder={t("settings.appearance.selectTheme")}>
            {(option) => getThemeLabel(option as ThemeOption | null)}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {THEME_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {themeLabels[option]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelect;
