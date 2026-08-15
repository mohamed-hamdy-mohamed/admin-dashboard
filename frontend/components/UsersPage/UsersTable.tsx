"use client";

import { TableHead } from "@/components/atoms/ui/table";
import CatalogTable from "@/components/molecules/CatalogTable";
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
    <CatalogTable
      colSpan={7}
      emptyMessage={t("users.empty")}
      isEmpty={users.length === 0}
      columns={
        <>
          <TableHead>{t("users.table.user")}</TableHead>
          <TableHead>{t("users.table.role")}</TableHead>
          <TableHead>{t("users.table.company")}</TableHead>
          <TableHead>{t("users.table.location")}</TableHead>
          <TableHead>{t("users.table.age")}</TableHead>
          <TableHead>{t("users.table.status")}</TableHead>
          <TableHead>{t("users.table.action")}</TableHead>
        </>
      }
    >
      {users.map((user) => (
        <UserTableRow
          key={user.id}
          user={user}
          onView={onViewUser}
          onEdit={onEditUser}
        />
      ))}
    </CatalogTable>
  );
};

export default UsersTable;
