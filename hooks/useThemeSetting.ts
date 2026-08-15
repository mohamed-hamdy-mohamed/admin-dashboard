"use client";

import { useCallback } from "react";
import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ThemeOption } from "@/types/settings";
import { loadSettings, persistSettings } from "@/util/settingsStorage";

const useIsClient = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

const isThemeOption = (value: string | undefined): value is ThemeOption =>
  value === "light" || value === "dark" || value === "system";

interface UseThemeSettingOptions {
  onThemeChange?: (theme: ThemeOption) => void;
}

export const useThemeSetting = (options?: UseThemeSettingOptions) => {
  const { theme, setTheme } = useTheme();
  const isClient = useIsClient();

  const setThemeSetting = useCallback(
    (value: ThemeOption) => {
      setTheme(value);

      const settings = loadSettings();
      persistSettings({
        ...settings,
        appearance: {
          ...settings.appearance,
          theme: value,
        },
      });

      options?.onThemeChange?.(value);
    },
    [options?.onThemeChange, setTheme],
  );

  const storedTheme = loadSettings().appearance.theme;
  const activeTheme: ThemeOption =
    isClient && isThemeOption(theme) ? theme : storedTheme;

  return {
    activeTheme,
    setThemeSetting,
  };
};
