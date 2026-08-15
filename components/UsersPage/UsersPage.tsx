"use client";

import { useMemo, useState } from "react";
import { PAGE_CONTENT_CLASSNAME } from "@/constants/layout";
import { usePagination } from "@/hooks/usePagination";
import { useGetUsers } from "@/hooks/useGetUsers";
import StatsCardsSkeleton from "../ui/StatsCardsSkeleton";
import DataTableLayout from "../ui/DataTableLayout";
import SearchInput from "../ui/SearchInput";
import UsersTable from "./UsersTable";
import AppLoader from "../ui/AppLoader";
import UsersStats from "./UsersStats";
import TablePagination from "../ui/TablePagination";
import UserViewDialog from "./UserViewDialog";
import UserEditDialog from "./UserEditDialog";
import { User } from "@/types/users";
import { UserEditValues } from "@/types/user-edits";
import {
  applyUserEdits,
  loadUserEdits,
  persistUserEdits,
  UserEditsMap,
} from "@/util/userEdits";
import { useTranslation } from "@/providers/LanguageProvider";

const UsersPage = () => {
  const [search, setSearch] = useState<string>("");
  const { t } = useTranslation();
  const [userEdits, setUserEdits] = useState<UserEditsMap>(() => loadUserEdits());
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const { data, isLoading, isFetching } = useGetUsers();

  const users = useMemo(
    () => applyUserEdits(data?.users ?? [], userEdits),
    [data?.users, userEdits],
  );

  const mergedData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return {
      ...data,
      users,
    };
  }, [data, users]);

  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase()),
      ),
    [users, search],
  );

  const {
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
  } = usePagination({
    data: filteredUsers,
    itemsPerPage: 10,
  });

  const handleViewUser = (user: User) => {
    setActiveUser(user);
    setViewOpen(true);
  };

  const handleEditUser = (user: User) => {
    setActiveUser(user);
    setEditOpen(true);
  };

  const handleSaveUser = (values: UserEditValues) => {
    if (!activeUser) {
      return;
    }

    const nextEdits: UserEditsMap = {
      ...userEdits,
      [activeUser.id]: values,
    };

    setUserEdits(nextEdits);
    persistUserEdits(nextEdits);
    setActiveUser({
      ...activeUser,
      ...values,
    });
    setEditOpen(false);
  };

  return (
    <main className={PAGE_CONTENT_CLASSNAME}>
      {isLoading ? (
        <StatsCardsSkeleton cards={4} />
      ) : (
        mergedData && <UsersStats data={mergedData} />
      )}
      {isFetching && <AppLoader />}
      <DataTableLayout
        title={t("users.listTitle")}
        description={t("users.listDescription")}
        toolbar={
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder={t("users.searchPlaceholder")}
          />
        }
      >
        <UsersTable
          users={paginatedData}
          onViewUser={handleViewUser}
          onEditUser={handleEditUser}
        />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      </DataTableLayout>

      <UserViewDialog
        user={activeUser}
        open={viewOpen}
        onOpenChange={setViewOpen}
      />

      <UserEditDialog
        user={activeUser}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSave={handleSaveUser}
      />
    </main>
  );
};

export default UsersPage;
