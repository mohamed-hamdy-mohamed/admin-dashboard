"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import UserAvatar from "@/components/Auth/UserAvatar";
import { Button } from "@/components/ui/button";
import SettingsSection from "./SettingsSection";
import EditProfileDialog from "./EditProfileDialog";
import { useTranslation } from "@/providers/LanguageProvider";
import { useAuth } from "@/providers/AuthProvider";
import { updateCurrentUser, uploadAvatar } from "@/lib/authApi";
import { getApiErrorMessage } from "@/lib/apiError";
import type { ProfileFormValues } from "@/lib/schemas/auth";
import { getFullName } from "@/util/getFullName";
import toast from "react-hot-toast";

const ProfileSection = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    return null;
  }

  const fullName = getFullName(user.firstName, user.lastName, user.name);

  const handleSave = async (profile: ProfileFormValues, avatarFile?: File) => {
    setIsSaving(true);

    try {
      let nextUser = user;

      if (
        profile.firstName !== user.firstName ||
        profile.lastName !== user.lastName
      ) {
        const response = await updateCurrentUser({
          firstName: profile.firstName,
          lastName: profile.lastName,
        });
        nextUser = response.data.user;
      }

      if (avatarFile) {
        const response = await uploadAvatar(avatarFile);
        nextUser = response.data.user;
      }

      updateUser(nextUser);
      setEditOpen(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <SettingsSection
        title={t("settings.profile.title")}
        description={t("settings.profile.description")}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar
              key={user.avatar ?? fullName}
              firstName={user.firstName}
              lastName={user.lastName}
              name={fullName}
              avatar={user.avatar}
              className="h-16 w-16 border shadow-sm"
              sizes="64px"
            />

            <div>
              <p className="text-lg font-semibold text-foreground">{fullName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-full gap-2 rounded-xl sm:w-auto"
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="size-4" />
            {t("settings.profile.editProfile")}
          </Button>
        </div>
      </SettingsSection>

      <EditProfileDialog
        user={user}
        open={editOpen}
        isSaving={isSaving}
        onOpenChange={setEditOpen}
        onSave={handleSave}
      />
    </>
  );
};

export default ProfileSection;
