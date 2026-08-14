"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
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

interface AppearanceSectionProps {
  appearance: AppearanceSettings;
  onChange: (appearance: AppearanceSettings) => void;
}

const themeOptions: { value: ThemeOption; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

const languageOptions: { value: LanguageOption; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "fr", label: "French" },
];

const AppearanceSection = ({
  appearance,
  onChange,
}: AppearanceSectionProps) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (value: ThemeOption) => {
    setTheme(value);
    onChange({
      ...appearance,
      theme: value,
    });
  };

  return (
    <SettingsSection
      title="Appearance"
      description="Customize how the dashboard looks and reads."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={mounted ? (theme as ThemeOption) : appearance.theme}
            onValueChange={(value) => handleThemeChange(value as ThemeOption)}
          >
            <SelectTrigger id="theme" className="h-11 w-full rounded-xl">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {themeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="language">Language</Label>
          <Select
            value={appearance.language}
            onValueChange={(value) =>
              onChange({
                ...appearance,
                language: value as LanguageOption,
              })
            }
          >
            <SelectTrigger id="language" className="h-11 w-full rounded-xl">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
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
