"use client";

import { memo } from "react";
import { User } from "@/types/users";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/atoms/dialog";
import DetailGrid from "@/shared/atoms/DetailGrid";
import DetailItem from "@/shared/atoms/DetailItem";
import EntityDialog from "@/shared/molecules/EntityDialog";
import EntityViewHeader from "@/shared/molecules/EntityViewHeader";
import UserRoleBadge from "./UserRoleBadge";
import { useTranslation } from "@/providers/LanguageProvider";

interface UserViewDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserViewDialog = ({ user, open, onOpenChange }: UserViewDialogProps) => {
  const { t } = useTranslation();

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      closeLabel={t("common.close")}
    >
      {user && (
        <>
          <DialogHeader>
            <DialogTitle>{t("users.dialogs.view.title")}</DialogTitle>
            <DialogDescription>
              {t("users.dialogs.view.description")}
            </DialogDescription>
          </DialogHeader>

          <EntityViewHeader
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            fallback={`${user.firstName[0]}${user.lastName[0]}`}
            title={`${user.firstName} ${user.lastName}`}
            subtitle={`@${user.username}`}
          >
            <UserRoleBadge role={user.role} />
          </EntityViewHeader>

          <DetailGrid>
            <DetailItem label={t("users.dialogs.view.email")} value={user.email} />
            <DetailItem label={t("users.dialogs.view.phone")} value={user.phone} />
            <DetailItem
              label={t("users.dialogs.view.age")}
              value={t("users.dialogs.view.ageValue", { age: user.age })}
            />
            <DetailItem label={t("users.dialogs.view.gender")} value={user.gender} />
            <DetailItem label={t("users.dialogs.view.company")} value={user.company.name} />
            <DetailItem label={t("users.dialogs.view.jobTitle")} value={user.company.title} />
            <DetailItem label={t("users.dialogs.view.country")} value={user.address.country} />
            <DetailItem label={t("users.dialogs.view.city")} value={user.address.city} />
            <DetailItem label={t("users.dialogs.view.university")} value={user.university} />
            <DetailItem label={t("users.dialogs.view.department")} value={user.company.department} />
          </DetailGrid>
        </>
      )}
    </EntityDialog>
  );
};

export default memo(UserViewDialog);
