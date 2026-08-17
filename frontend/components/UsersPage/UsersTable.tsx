"use client";

import { memo, useMemo } from "react";
import CatalogDataTable from "@/components/molecules/CatalogDataTable";
import { CATALOG_PRIORITY_ROWS } from "@/constants/catalog";
import UserTableRow from "./UserTableRow";
import { User } from "@/types/users";
import { useTranslation } from "@/providers/LanguageProvider";

interface UsersTableProps {
  users: User[];
  isLoading?: boolean;
  onViewUser: (user: User) => void;
  onEditUser: (user: User) => void;
}

const UsersTable = ({
  users,
  isLoading = false,
  onViewUser,
  onEditUser,
}: UsersTableProps) => {
  const { t } = useTranslation();

  const columns = useMemo(
    () => [
      { label: t("users.table.user") },
      { label: t("users.table.role") },
      { label: t("users.table.company") },
      { label: t("users.table.location") },
      { label: t("users.table.age") },
      { label: t("users.table.status") },
      { label: t("users.table.action") },
    ],
    [t],
  );

  return (
    <CatalogDataTable
      columns={columns}
      emptyMessage={t("users.empty")}
      isLoading={isLoading}
      isEmpty={users.length === 0}
      skeletonLeading="avatar"
    >
      {users.map((user, index) => (
        <UserTableRow
          key={user.id}
          user={user}
          priority={index < CATALOG_PRIORITY_ROWS}
          onView={onViewUser}
          onEdit={onEditUser}
        />
      ))}
    </CatalogDataTable>
  );
};

export default memo(UsersTable);
