"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import UserTableRow from "./UserTableRow";
import { User } from "@/types/users";
import { useTranslation } from "@/providers/LanguageProvider";

interface UsersTableProps {
  users: User[];
  onViewUser: (user: User) => void;
  onEditUser: (user: User) => void;
}

const UsersTable = ({ users, onViewUser, onEditUser }: UsersTableProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("users.table.user")}</TableHead>
            <TableHead>{t("users.table.role")}</TableHead>
            <TableHead>{t("users.table.company")}</TableHead>
            <TableHead>{t("users.table.location")}</TableHead>
            <TableHead>{t("users.table.age")}</TableHead>
            <TableHead>{t("users.table.status")}</TableHead>
            <TableHead>{t("users.table.action")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onView={onViewUser}
                onEdit={onEditUser}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                {t("users.empty")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
