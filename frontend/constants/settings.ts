import { SettingsData } from "@/types/settings";

export const defaultSettings: SettingsData = {
  profile: {
    name: "",
    email: "",
    avatar: "",
  },
  appearance: {
    theme: "light",
    language: "en",
  },
  notifications: {
    email: true,
    messages: true,
    orders: false,
  },
  security: {
    twoFactorEnabled: false,
  },
};
