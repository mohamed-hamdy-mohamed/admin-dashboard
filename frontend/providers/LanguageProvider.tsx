"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import {
  getDictionary,
  getLocaleDirection,
  translate,
  type Dictionary,
  type TranslationKey,
} from "@/lib/i18n";
import { Locale } from "@/types/i18n";
import { loadSettings, persistSettings } from "@/util/settingsStorage";
import {
  persistLocaleCookie,
  readLocaleFromSettingsStorage,
} from "@/util/localeStorage";

interface LanguageContextValue {
  locale: Locale;
  direction: "ltr" | "rtl";
  dictionary: Dictionary;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  initialLocale: Locale;
}

export function LanguageProvider({
  children,
  initialLocale,
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return initialLocale;
    }

    return readLocaleFromSettingsStorage();
  });

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    persistLocaleCookie(nextLocale);

    const settings = loadSettings();
    persistSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        language: nextLocale,
      },
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getLocaleDirection(locale);
  }, [locale]);

  const value = useMemo<LanguageContextValue>(() => {
    const dictionary = getDictionary(locale);

    return {
      locale,
      direction: getLocaleDirection(locale),
      dictionary,
      t: (key, params) => translate(locale, key, params),
      setLocale,
    };
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider value={value}>
      <DirectionProvider direction={getLocaleDirection(locale)}>
        {children}
      </DirectionProvider>
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }

  return context;
}
