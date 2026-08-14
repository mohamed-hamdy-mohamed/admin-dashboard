"use client";

import { useState } from "react";
import {
  AppearanceSettings,
  NotificationSettings,
  ProfileSettings,
  SecuritySettings,
  SettingsData,
} from "@/types/settings";
import { loadSettings, persistSettings } from "@/util/settingsStorage";
import ProfileSection from "./ProfileSection";
import AppearanceSection from "./AppearanceSection";
import NotificationsSection from "./NotificationsSection";
import SecuritySection from "./SecuritySection";

const SettingsPage = () => {
  const [settings, setSettings] = useState<SettingsData>(() => loadSettings());

  const updateSettings = (nextSettings: SettingsData) => {
    setSettings(nextSettings);
    persistSettings(nextSettings);
  };

  const handleProfileSave = (profile: ProfileSettings) => {
    updateSettings({
      ...settings,
      profile,
    });
  };

  const handleAppearanceChange = (appearance: AppearanceSettings) => {
    updateSettings({
      ...settings,
      appearance,
    });
  };

  const handleNotificationsChange = (
    notifications: NotificationSettings,
  ) => {
    updateSettings({
      ...settings,
      notifications,
    });
  };

  const handleSecurityChange = (security: SecuritySettings) => {
    updateSettings({
      ...settings,
      security,
    });
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-8">
        <section className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Settings
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Manage your profile, preferences, notifications, and security
            settings.
          </p>
        </section>

        <div className="flex w-full flex-col gap-6">
          <ProfileSection profile={settings.profile} onSave={handleProfileSave} />
          <AppearanceSection
            appearance={settings.appearance}
            onChange={handleAppearanceChange}
          />
          <NotificationsSection
            notifications={settings.notifications}
            onChange={handleNotificationsChange}
          />
          <SecuritySection
            security={settings.security}
            onChange={handleSecurityChange}
          />
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
