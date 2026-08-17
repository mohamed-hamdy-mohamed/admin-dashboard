"use client";

import { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import { useEntityDialog } from "@/hooks/useEntityDialog";
import { usePersistedEdits } from "@/hooks/usePersistedEdits";
import UsersTable from "./UsersTable";
import UsersStats from "./UsersStats";
import CatalogPageTemplate from "@/components/templates/CatalogPageTemplate";
import { User } from "@/types/users";
import { UserEditValues } from "@/types/user-edits";
import {
  applyUserEdits,
  loadUserEdits,
  persistUserEdits,
} from "@/util/userEdits";
import { useTranslation } from "@/providers/LanguageProvider";

const UserViewDialog = dynamic(() => import("./UserViewDialog"), {
  ssr: false,
});

const UserEditDialog = dynamic(() => import("./UserEditDialog"), {
  ssr: false,
});

const matchUser = (user: User, query: string) =>
  user.username.toLowerCase().includes(query);

const UsersPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetUsers();
  const { mergedItems: users, saveEdit } = usePersistedEdits({
    items: data?.users,
    load: loadUserEdits,
    persist: persistUserEdits,
    apply: applyUserEdits,
  });
  const {
    item: activeUser,
    setItem: setActiveUser,
    viewOpen,
    setViewOpen,
    editOpen,
    setEditOpen,
    openView,
    openEdit,
  } = useEntityDialog<User>();
  const {
    search,
    setSearch,
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
  } = useCatalogCollection({
    items: users,
    match: matchUser,
  });

  const mergedData = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return {
      ...data,
      users,
    };
  }, [data, users]);

  const handleSaveUser = useCallback(
    (values: UserEditValues) => {
      if (!activeUser) {
        return;
      }

      setActiveUser(saveEdit(activeUser, values));
      setEditOpen(false);
    },
    [activeUser, saveEdit, setActiveUser, setEditOpen],
  );

  return (
    <CatalogPageTemplate
      isLoading={isLoading}
      header={mergedData && <UsersStats data={mergedData} />}
      title={t("users.listTitle")}
      description={t("users.listDescription")}
      search={search}
      onSearchChange={setSearch}
      searchPlaceholder={t("users.searchPlaceholder")}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={goToPage}
      onPrevious={prevPage}
      onNext={nextPage}
      footer={
        <>
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
        </>
      }
    >
      <UsersTable
        isLoading={isLoading}
        users={paginatedData}
        onViewUser={openView}
        onEditUser={openEdit}
      />
    </CatalogPageTemplate>
  );
};

export default UsersPage;
