"use client";

import { FormEvent, useState } from "react";
import { User, UserRole } from "@/types/users";
import { UserEditValues } from "@/types/user-edits";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/providers/LanguageProvider";

interface UserEditDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: UserEditValues) => void;
}

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
        <div className="grid gap-2">
          <Label htmlFor="firstName">{t("users.dialogs.edit.firstName")}</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            className="h-11 rounded-xl"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="lastName">{t("users.dialogs.edit.lastName")}</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            className="h-11 rounded-xl"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="role">{t("users.dialogs.edit.role")}</Label>
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
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("common.cancel")}
        </Button>
        <Button type="submit">{t("common.saveChanges")}</Button>
      </DialogFooter>
    </form>
  );
};

const UserEditDialog = ({
  user,
  open,
  onOpenChange,
  onSave,
}: UserEditDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" closeLabel={t("common.close")}>
        {user && open ? (
          <UserEditForm
            key={user.id}
            user={user}
            onSave={onSave}
            onCancel={() => onOpenChange(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
