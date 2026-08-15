"use client";

import { FormEvent, useState } from "react";
import { ProfileSettings } from "@/types/settings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/providers/LanguageProvider";

interface EditProfileDialogProps {
  profile: ProfileSettings;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (profile: ProfileSettings) => void;
}

interface EditProfileFormProps {
  profile: ProfileSettings;
  onSave: (profile: ProfileSettings) => void;
  onCancel: () => void;
}

const EditProfileForm = ({
  profile,
  onSave,
  onCancel,
}: EditProfileFormProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return;
    }

    onSave({
      ...profile,
      name: trimmedName,
      email: trimmedEmail,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{t("settings.profile.dialog.title")}</DialogTitle>
        <DialogDescription>
          {t("settings.profile.dialog.description")}
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="profileName">{t("settings.profile.dialog.name")}</Label>
          <Input
            id="profileName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-xl"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="profileEmail">{t("settings.profile.dialog.email")}</Label>
          <Input
            id="profileEmail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 rounded-xl"
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("common.cancel")}
        </Button>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {t("common.saveChanges")}
        </Button>
      </DialogFooter>
    </form>
  );
};

const EditProfileDialog = ({
  profile,
  open,
  onOpenChange,
  onSave,
}: EditProfileDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-xl border-border sm:max-w-md" closeLabel={t("common.close")}>
        {open ? (
          <EditProfileForm
            key={`${profile.name}-${profile.email}`}
            profile={profile}
            onSave={onSave}
            onCancel={() => onOpenChange(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
