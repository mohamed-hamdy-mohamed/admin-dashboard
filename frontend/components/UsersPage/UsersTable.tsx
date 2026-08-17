"use client";

import { memo, useMemo } from "react";
import CatalogListTable from "@/components/molecules/CatalogListTable";
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
    <CatalogListTable
      items={users}
      isLoading={isLoading}
      columns={columns}
      emptyMessage={t("users.empty")}
      skeletonLeading="avatar"
      renderRow={(user, priority) => (
        <UserTableRow
          key={user.id}
          user={user}
          priority={priority}
          onView={onViewUser}
          onEdit={onEditUser}
        />
      )}
    />
  );
};

export default memo(UsersTable);
