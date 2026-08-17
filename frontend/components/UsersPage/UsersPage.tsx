"use client";

import { memo } from "react";
import dynamic from "next/dynamic";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useCatalogEntityPage } from "@/hooks/useCatalogEntityPage";
import { useLazyMount } from "@/hooks/useLazyMount";
import UsersTable from "./UsersTable";
import UsersStats from "./UsersStats";
import CatalogPageTemplate from "@/components/templates/CatalogPageTemplate";
import { User } from "@/types/users";
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
  const {
    search,
    setSearch,
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
    mergedData,
    activeItem: activeUser,
    viewOpen,
    setViewOpen,
    editOpen,
    setEditOpen,
    openView,
    openEdit,
    handleSave,
  } = useCatalogEntityPage({
    data,
    collectionKey: "users",
    match: matchUser,
    load: loadUserEdits,
    persist: persistUserEdits,
    apply: applyUserEdits,
  });
  const viewMounted = useLazyMount(viewOpen);
  const editMounted = useLazyMount(editOpen);

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
          {viewMounted ? (
            <UserViewDialog
              user={activeUser}
              open={viewOpen}
              onOpenChange={setViewOpen}
            />
          ) : null}

          {editMounted ? (
            <UserEditDialog
              user={activeUser}
              open={editOpen}
              onOpenChange={setEditOpen}
              onSave={handleSave}
            />
          ) : null}
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

export default memo(UsersPage);
