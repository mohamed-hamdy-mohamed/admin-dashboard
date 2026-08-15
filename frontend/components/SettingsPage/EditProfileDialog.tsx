"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldError from "@/components/Auth/FieldError";
import UserAvatar from "@/components/Auth/UserAvatar";
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
import { Spinner } from "@/components/ui/spinner";
import { useTranslation } from "@/providers/LanguageProvider";
import type { AuthUser } from "@/types/auth";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/lib/schemas/auth";
import { getFullName } from "@/util/getFullName";

const AVATAR_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

interface EditProfileDialogProps {
  user: AuthUser;
  open: boolean;
  isSaving?: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (profile: ProfileFormValues, avatarFile?: File) => Promise<void> | void;
}

const EditProfileDialog = ({
  user,
  open,
  isSaving = false,
  onOpenChange,
  onSave,
}: EditProfileDialogProps) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  const defaultValues = useMemo<ProfileFormValues>(
    () => ({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    }),
    [user.firstName, user.lastName]
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const previewName = getFullName(firstName, lastName, user.name);

  useEffect(() => {
    if (open) {
      reset(defaultValues);
      setAvatarFile(undefined);
      setPreviewUrl(undefined);
    }
  }, [defaultValues, open, reset]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const onSubmit = async (values: ProfileFormValues) => {
    await onSave(values, avatarFile);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-xl border-border sm:max-w-md"
        closeLabel={t("common.close")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("settings.profile.dialog.title")}</DialogTitle>
            <DialogDescription>
              {t("settings.profile.dialog.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept={AVATAR_ACCEPT}
                className="sr-only"
                tabIndex={-1}
                disabled={isSaving}
                onChange={handleAvatarChange}
              />
              <button
                type="button"
                disabled={isSaving}
                aria-label={t("settings.profile.dialog.avatar")}
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewUrl}
                    alt={previewName}
                    className="h-20 w-20 cursor-pointer rounded-full border object-cover shadow-sm"
                  />
                ) : (
                  <UserAvatar
                    firstName={firstName}
                    lastName={lastName}
                    name={previewName}
                    avatar={user.avatar}
                    className="h-20 w-20 cursor-pointer border shadow-sm"
                    sizes="80px"
                  />
                )}
              </button>
              <p className="text-xs text-muted-foreground">
                {t("settings.profile.dialog.avatar")}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="profileFirstName">
                  {t("settings.profile.dialog.firstName")}
                </Label>
                <Input
                  id="profileFirstName"
                  autoComplete="given-name"
                  className="h-11 rounded-xl"
                  disabled={isSaving}
                  aria-invalid={Boolean(errors.firstName)}
                  {...register("firstName")}
                />
                <FieldError message={errors.firstName?.message} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="profileLastName">
                  {t("settings.profile.dialog.lastName")}
                </Label>
                <Input
                  id="profileLastName"
                  autoComplete="family-name"
                  className="h-11 rounded-xl"
                  disabled={isSaving}
                  aria-invalid={Boolean(errors.lastName)}
                  {...register("lastName")}
                />
                <FieldError message={errors.lastName?.message} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="profileEmail">
                {t("settings.profile.dialog.email")}
              </Label>
              <Input
                id="profileEmail"
                type="email"
                value={user.email}
                readOnly
                disabled
                className="h-11 rounded-xl"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={() => onOpenChange(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button type="submit" disabled={isSaving} className="gap-2">
              {isSaving ? <Spinner /> : null}
              {t("common.saveChanges")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
