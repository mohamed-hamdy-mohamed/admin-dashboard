"use client";

import { memo, useCallback } from "react";
import { User } from "@/types/users";
import { UserEditValues } from "@/types/user-edits";
import EntityDialog from "@/shared/molecules/EntityDialog";
import { useTranslation } from "@/providers/LanguageProvider";
import UserEditForm from "./UserEditForm";

interface UserEditDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: UserEditValues) => void;
}

const UserEditDialog = ({
  user,
  open,
  onOpenChange,
  onSave,
}: UserEditDialogProps) => {
  const { t } = useTranslation();
  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      closeLabel={t("common.close")}
      className="sm:max-w-md"
    >
      {user && open ? (
        <UserEditForm
          key={user.id}
          user={user}
          onSave={onSave}
          onCancel={handleCancel}
        />
      ) : null}
    </EntityDialog>
  );
};

export default memo(UserEditDialog);
