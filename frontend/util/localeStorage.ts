import { SETTINGS_STORAGE_KEY } from "@/util/settingsStorage";
import { Locale } from "@/types/i18n";
import { normalizeLocale } from "@/lib/i18n";
import { defaultSettings } from "@/constants/settings";

export const LOCALE_COOKIE = "admin-dashboard-locale";

export function readLocaleFromSettingsStorage(): Locale {
  if (typeof window === "undefined") {
    return "en";
  }

  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);

    if (!stored) {
      return normalizeLocale(defaultSettings.appearance.language);
    }

    const parsed = JSON.parse(stored) as {
      appearance?: { language?: string };
    };

    return normalizeLocale(parsed.appearance?.language);
  } catch {
    return "en";
  }
}

export function persistLocaleCookie(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax`;
}
