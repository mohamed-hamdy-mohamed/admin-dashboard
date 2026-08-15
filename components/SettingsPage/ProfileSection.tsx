"use client";

import { useState } from "react";
import { ProfileSettings } from "@/types/settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SettingsSection from "./SettingsSection";
import EditProfileDialog from "./EditProfileDialog";
import { useTranslation } from "@/providers/LanguageProvider";

interface ProfileSectionProps {
  profile: ProfileSettings;
  onSave: (profile: ProfileSettings) => void;
}

const ProfileSection = ({ profile, onSave }: ProfileSectionProps) => {
  const { t } = useTranslation();
  const [editOpen, setEditOpen] = useState(false);

  const handleSave = (nextProfile: ProfileSettings) => {
    onSave(nextProfile);
    setEditOpen(false);
  };

  return (
    <>
      <SettingsSection
        title={t("settings.profile.title")}
        description={t("settings.profile.description")}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border shadow-sm">
              <AvatarImage src={profile.avatar} alt={profile.name} sizes="64px" />
              <AvatarFallback>
                {profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-lg font-semibold text-foreground">
                {profile.name}
              </p>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-xl sm:w-auto"
            onClick={() => setEditOpen(true)}
          >
            {t("settings.profile.editProfile")}
          </Button>
        </div>
      </SettingsSection>

      <EditProfileDialog
        profile={profile}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={handleSave}
      />
    </>
  );
};

export default ProfileSection;
