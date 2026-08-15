"use client";

import { useState } from "react";
import { SecuritySettings } from "@/types/settings";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import SettingsSection from "./SettingsSection";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { useTranslation } from "@/providers/LanguageProvider";

interface SecuritySectionProps {
  security: SecuritySettings;
  onChange: (security: SecuritySettings) => void;
}

const SecuritySection = ({ security, onChange }: SecuritySectionProps) => {
  const { t } = useTranslation();
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <>
      <SettingsSection
        title={t("settings.security.title")}
        description={t("settings.security.description")}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-foreground">
              {t("settings.security.password.title")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("settings.security.password.description")}
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-xl sm:w-auto"
            onClick={() => setPasswordOpen(true)}
          >
            {t("settings.security.password.changePassword")}
          </Button>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 border-t border-border pt-4 sm:items-center">
          <div className="min-w-0">
            <p className="font-medium text-foreground">
              {t("settings.security.twoFactor.title")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("settings.security.twoFactor.description")}
            </p>
          </div>

          <Switch
            className="shrink-0"
            checked={security.twoFactorEnabled}
            onCheckedChange={(twoFactorEnabled) =>
              onChange({ ...security, twoFactorEnabled })
            }
          />
        </div>
      </SettingsSection>

      <ChangePasswordDialog
        open={passwordOpen}
        onOpenChange={setPasswordOpen}
      />
    </>
  );
};

export default SecuritySection;
