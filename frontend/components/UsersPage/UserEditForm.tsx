"use client";

import { FormEvent, useState } from "react";
import { User, UserRole } from "@/types/users";
import { UserEditValues } from "@/types/user-edits";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/ui/dialog";
import { Input } from "@/components/atoms/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/ui/select";
import DialogFormActions from "@/components/atoms/ui/DialogFormActions";
import FormField from "@/components/atoms/ui/FormField";
import { useTranslation } from "@/providers/LanguageProvider";

interface UserEditFormProps {
  user: User;
  onSave: (values: UserEditValues) => void;
  onCancel: () => void;
}

const roleOptions: UserRole[] = ["admin", "moderator", "user"];

const UserEditForm = ({ user, onSave, onCancel }: UserEditFormProps) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [role, setRole] = useState<UserRole>(user.role);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      return;
    }

    onSave({
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      role,
    });
  };

  const roleLabels: Record<UserRole, string> = {
    admin: t("users.roles.admin"),
    moderator: t("users.roles.moderator"),
    user: t("users.roles.user"),
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{t("users.dialogs.edit.title")}</DialogTitle>
        <DialogDescription>
          {t("users.dialogs.edit.description")}
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <FormField id="firstName" label={t("users.dialogs.edit.firstName")}>
          <Input
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="h-11 rounded-xl"
          />
        </FormField>

        <FormField id="lastName" label={t("users.dialogs.edit.lastName")}>
          <Input
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="h-11 rounded-xl"
          />
        </FormField>

        <FormField id="role" label={t("users.dialogs.edit.role")}>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as UserRole)}
          >
            <SelectTrigger id="role" className="h-11 w-full rounded-xl">
              <SelectValue placeholder={t("users.dialogs.edit.selectRole")} />
            </SelectTrigger>
            <SelectContent>
              {roleOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {roleLabels[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </div>

      <DialogFormActions
        cancelLabel={t("common.cancel")}
        submitLabel={t("common.saveChanges")}
        onCancel={onCancel}
      />
    </form>
  );
};

export default UserEditForm;
