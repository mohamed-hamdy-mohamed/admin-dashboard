"use client";

import { NotificationSettings } from "@/types/settings";
import { Switch } from "@/components/ui/switch";
import SettingsSection from "./SettingsSection";

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
    <div className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-b-0 last:pb-0">
      <div>
        <p className="font-medium text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

const NotificationsSection = ({
  notifications,
  onChange,
}: NotificationsSectionProps) => {
  return (
    <SettingsSection
      title="Notifications"
      description="Choose which updates you want to receive."
    >
      <NotificationToggle
        title="Email"
        description="Receive email alerts for important account activity."
        checked={notifications.email}
        onCheckedChange={(email) => onChange({ ...notifications, email })}
      />

      <NotificationToggle
        title="Messages"
        description="Get notified when new inbox messages arrive."
        checked={notifications.messages}
        onCheckedChange={(messages) =>
          onChange({ ...notifications, messages })
        }
      />

      <NotificationToggle
        title="Orders"
        description="Stay updated on new and completed sales orders."
        checked={notifications.orders}
        onCheckedChange={(orders) => onChange({ ...notifications, orders })}
      />
    </SettingsSection>
  );
};

export default NotificationsSection;
