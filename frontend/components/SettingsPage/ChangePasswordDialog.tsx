"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldError from "@/components/Auth/FieldError";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";
import PasswordInput from "@/components/Auth/PasswordInput";
import { Spinner } from "@/components/atoms/ui/spinner";
import { changePassword } from "@/lib/authApi";
import { getApiErrorMessage } from "@/lib/apiError";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/lib/schemas/auth";
import { useTranslation } from "@/providers/LanguageProvider";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordDialog = ({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [open, reset]);

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const onSubmit = async ({
    currentPassword,
    newPassword,
  }: ChangePasswordFormValues) => {
    try {
      const response = await changePassword({ currentPassword, newPassword });
      toast.success(response.message);
      logout();
      router.replace("/login");
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-xl border-border sm:max-w-md" closeLabel={t("common.close")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{t("settings.security.changePasswordDialog.title")}</DialogTitle>
            <DialogDescription>
              {t("settings.security.changePasswordDialog.description")}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">
                {t("settings.security.changePasswordDialog.currentPassword")}
              </Label>
              <Input
                id="currentPassword"
                type="password"
                autoComplete="current-password"
                className="h-11 rounded-xl"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.currentPassword)}
                {...register("currentPassword")}
              />
              <FieldError message={errors.currentPassword?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="newPassword">
                {t("settings.security.changePasswordDialog.newPassword")}
              </Label>
              <PasswordInput
                id="newPassword"
                autoComplete="new-password"
                className="h-11 rounded-xl"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.newPassword)}
                {...register("newPassword")}
              />
              <FieldError message={errors.newPassword?.message} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">
                {t("settings.security.changePasswordDialog.confirmPassword")}
              </Label>
              <PasswordInput
                id="confirmPassword"
                autoComplete="new-password"
                className="h-11 rounded-xl"
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.confirmPassword)}
                {...register("confirmPassword")}
              />
              <FieldError message={errors.confirmPassword?.message} />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              onClick={() => handleOpenChange(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? <Spinner /> : null}
              {t("common.updatePassword")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
