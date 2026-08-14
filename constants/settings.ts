import { SettingsData } from "@/types/settings";

export const defaultSettings: SettingsData = {
  profile: {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/Profile-picture.png",
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
