"use client";

import { useState } from "react";
import { SecuritySettings } from "@/types/settings";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import SettingsSection from "./SettingsSection";
import ChangePasswordDialog from "./ChangePasswordDialog";

interface SecuritySectionProps {
  security: SecuritySettings;
  onChange: (security: SecuritySettings) => void;
}

const SecuritySection = ({ security, onChange }: SecuritySectionProps) => {
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <>
      <SettingsSection
        title="Security"
        description="Manage password and account protection settings."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-foreground">Password</p>
            <p className="text-sm text-muted-foreground">
              Update your password to keep your account secure.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl"
            onClick={() => setPasswordOpen(true)}
          >
            Change Password
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
          <div>
            <p className="font-medium text-foreground">
              Two-Factor Authentication
            </p>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account.
            </p>
          </div>

          <Switch
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
