"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { THEME_STORAGE_KEY } from "@/constants/theme";
import { loadSettings } from "@/util/settingsStorage";

const ThemeSync = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (!storedTheme) {
      setTheme(loadSettings().appearance.theme);
    }
  }, [setTheme]);

  return null;
};

export default ThemeSync;
