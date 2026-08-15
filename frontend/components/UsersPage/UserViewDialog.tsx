"use client";

import { User } from "@/types/users";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/ui/avatar";
import UserRoleBadge from "./UserRoleBadge";
import DetailItem from "@/components/atoms/ui/DetailItem";
import { useTranslation } from "@/providers/LanguageProvider";

interface UserViewDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserViewDialog = ({ user, open, onOpenChange }: UserViewDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" closeLabel={t("common.close")}>
        {user && (
          <>
            <DialogHeader>
              <DialogTitle>{t("users.dialogs.view.title")}</DialogTitle>
              <DialogDescription>
                {t("users.dialogs.view.description")}
              </DialogDescription>
            </DialogHeader>

            <div className="flex min-w-0 items-center gap-4">
              <Avatar className="h-16 w-16 border shadow-sm">
                <AvatarImage
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  sizes="64px"
                />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div>
                  <p className="text-lg font-semibold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
                <UserRoleBadge role={user.role} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserViewDialog;
