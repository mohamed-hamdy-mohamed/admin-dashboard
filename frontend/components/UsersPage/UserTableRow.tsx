"use client";

import { memo } from "react";
import { TableCell, TableRow } from "@/components/atoms/ui/table";
import { Badge } from "@/components/atoms/ui/badge";
import EntityIdentity from "@/components/molecules/EntityIdentity";
import ViewEditRowActions from "@/components/molecules/ViewEditRowActions";
import { User } from "@/types/users";
import UserStatusBadge from "./UserStatusBadge";
import UserRoleBadge from "./UserRoleBadge";
import { useTranslation } from "@/providers/LanguageProvider";

interface UserTableRowProps {
  user: User;
  priority?: boolean;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
}

const UserTableRow = ({
  user,
  priority = false,
  onView,
  onEdit,
}: UserTableRowProps) => {
  const { t } = useTranslation();

  return (
    <TableRow className="cursor-pointer transition-colors hover:bg-muted/40">
      <TableCell>
        <EntityIdentity
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
          fallback={
            <>
              {user.firstName[0]}
              {user.lastName[0]}
            </>
          }
          title={`${user.firstName} ${user.lastName}`}
          subtitle={`@${user.username}`}
          meta={
            <p className="max-w-[220px] truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          }
          avatarClassName="h-11 w-11 border shadow-sm"
          contentClassName="space-y-0.5"
          subtitleClassName="text-xs font-medium text-primary"
          priority={priority}
        />
      </TableCell>
      <TableCell className="align-middle">
        <UserRoleBadge role={user.role} />
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <p className="max-w-[180px] truncate font-medium">
            {user.company.name}
          </p>
          <p className="text-xs text-muted-foreground">{user.company.title}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className="space-y-1">
          <p className="max-w-[150px] truncate font-medium">
            {user.address.country}
          </p>
          <p className="text-xs text-muted-foreground">{user.address.city}</p>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline">
          {t("users.dialogs.view.ageValue", { age: user.age })}
        </Badge>
      </TableCell>
      <TableCell>
        <UserStatusBadge id={user.id} />
      </TableCell>
      <TableCell className="w-[120px] text-end">
        <ViewEditRowActions
          item={user}
          ariaLabel={t("rowActions.user")}
          viewLabel={t("rowActions.view")}
          editLabel={t("rowActions.edit")}
          onView={onView}
          onEdit={onEdit}
        />
      </TableCell>
    </TableRow>
  );
};

export default memo(UserTableRow);
