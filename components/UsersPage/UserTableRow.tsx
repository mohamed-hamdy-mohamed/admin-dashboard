"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/users";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import UserStatusBadge from "./UserStatusBadge";
import UserRowActions from "./UserRowAction";
import UserRoleBadge from "./UserRoleBadge";

interface UserTableRowProps {
  user: User;
}

const UserTableRow = ({ user }: UserTableRowProps) => {
  return (
    <TableRow className="cursor-pointer transition-colors hover:bg-muted/40">
      {/* User */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border shadow-sm">
            <AvatarImage src={user.image} />
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
      {/* Role */}
      <TableCell className="align-middle">
        <UserRoleBadge role={user.role} />
      </TableCell>
      {/* Company */}
      <TableCell>
        <div className="space-y-1">
          <p className="max-w-[180px] truncate font-medium">
            {user.company.name}
          </p>
          <p className="text-xs text-muted-foreground">{user.company.title}</p>
        </div>
      </TableCell>
      {/* Location */}
      <TableCell>
        <div className="space-y-1">
          <p className="max-w-[150px] truncate font-medium">
            {user.address.country}
          </p>
          <p className="text-xs text-muted-foreground">{user.address.city}</p>
        </div>
      </TableCell>
      {/* Age */}
      <TableCell>
        <Badge variant="outline">{user.age} yrs</Badge>
      </TableCell>
      {/* Status */}
      <TableCell>
        <UserStatusBadge id={user.id} />
      </TableCell>
      {/* Actions */}
      <TableCell className="w-[120px] text-right">
        <UserRowActions userId={user.id} />
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
