"use client";

import { NotificationSettings } from "@/types/settings";
import { Switch } from "@/components/ui/switch";
import SettingsSection from "./SettingsSection";
import { useTranslation } from "@/providers/LanguageProvider";

interface NotificationsSectionProps {
  notifications: NotificationSettings;
  onChange: (notifications: NotificationSettings) => void;
}

interface NotificationToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const NotificationToggle = ({
  title,
  description,
  checked,
  onCheckedChange,
}: NotificationToggleProps) => {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-4 last:border-b-0 last:pb-0 sm:items-center">
      <div className="min-w-0">
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Switch className="shrink-0" checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

const NotificationsSection = ({
  notifications,
  onChange,
}: NotificationsSectionProps) => {
  const { t } = useTranslation();

  return (
    <SettingsSection
      title={t("settings.notifications.title")}
      description={t("settings.notifications.description")}
    >
      <NotificationToggle
        title={t("settings.notifications.email.title")}
        description={t("settings.notifications.email.description")}
        checked={notifications.email}
        onCheckedChange={(email) => onChange({ ...notifications, email })}
      />

      <NotificationToggle
        title={t("settings.notifications.messages.title")}
        description={t("settings.notifications.messages.description")}
        checked={notifications.messages}
        onCheckedChange={(messages) =>
          onChange({ ...notifications, messages })
        }
      />

      <NotificationToggle
        title={t("settings.notifications.orders.title")}
        description={t("settings.notifications.orders.description")}
        checked={notifications.orders}
        onCheckedChange={(orders) => onChange({ ...notifications, orders })}
      />
    </SettingsSection>
  );
};

export default NotificationsSection;
