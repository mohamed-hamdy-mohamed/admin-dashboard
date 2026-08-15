"use client";

import { useEffect } from "react";
import { useTranslation } from "@/providers/LanguageProvider";
import { loadSettings } from "@/util/settingsStorage";
import { normalizeLocale } from "@/lib/i18n";

const LanguageSync = () => {
  const { locale, setLocale } = useTranslation();

  useEffect(() => {
    const settingsLanguage = normalizeLocale(loadSettings().appearance.language);

    if (settingsLanguage !== locale) {
      setLocale(settingsLanguage);
    }
  }, [locale, setLocale]);

  return null;
};

export default LanguageSync;
