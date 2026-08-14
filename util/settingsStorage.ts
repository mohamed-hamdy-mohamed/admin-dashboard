import { SettingsData } from "@/types/settings";
import { defaultSettings } from "@/constants/settings";

export const SETTINGS_STORAGE_KEY = "admin-dashboard-settings";

export const loadSettings = (): SettingsData => {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!stored) {
      return defaultSettings;
    }

    const parsed = JSON.parse(stored) as Partial<SettingsData>;

    return {
      profile: { ...defaultSettings.profile, ...parsed.profile },
      appearance: { ...defaultSettings.appearance, ...parsed.appearance },
      notifications: {
        ...defaultSettings.notifications,
        ...parsed.notifications,
      },
      security: { ...defaultSettings.security, ...parsed.security },
    };
  } catch {
    return defaultSettings;
  }
};

export const persistSettings = (settings: SettingsData): void => {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
};
