export type ThemeOption = "light" | "dark" | "system";

export type LanguageOption = "en" | "ar";

export interface ProfileSettings {
  name: string;
  email: string;
  avatar: string;
}

export interface AppearanceSettings {
  theme: ThemeOption;
  language: LanguageOption;
}

export interface NotificationSettings {
  email: boolean;
  messages: boolean;
  orders: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
}

export interface SettingsData {
  profile: ProfileSettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
}
