"use client";

import { TableCell, TableRow } from "@/components/atoms/ui/table";
import { Badge } from "@/components/atoms/ui/badge";
import { User } from "@/types/users";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/ui/avatar";
import UserStatusBadge from "./UserStatusBadge";

import UserRoleBadge from "./UserRoleBadge";
import RowActions from "../atoms/ui/RowActions";
import { Eye, Pencil } from "lucide-react";
import { useTranslation } from "@/providers/LanguageProvider";

interface UserTableRowProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
}

const UserTableRow = ({ user, onView, onEdit }: UserTableRowProps) => {
  const { t } = useTranslation();

  return (
    <TableRow className="cursor-pointer transition-colors hover:bg-muted/40">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border shadow-sm">
            <AvatarImage
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              sizes="44px"
            />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <p className="font-semibold">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs font-medium text-primary">@{user.username}</p>
            <p className="max-w-[220px] truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>
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
        <RowActions
          ariaLabel={t("rowActions.user")}
          actions={[
            {
              label: t("rowActions.view"),
              icon: Eye,
              onClick: () => onView(user),
            },
            {
              label: t("rowActions.edit"),
              icon: Pencil,
              onClick: () => onEdit(user),
            },
          ]}
        />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
