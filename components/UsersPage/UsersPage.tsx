"use client";

import { useMemo, useState } from "react";
import { usePagination } from "@/hooks/usePagination";
import { useGetUsers } from "@/hooks/useGetUsers";
import StatsCardsSkeleton from "../ui/StatsCardsSkeleton";
import DataTableLayout from "../ui/DataTableLayout";
import SearchInput from "../ui/SearchInput";
import UsersTable from "./UsersTable";
import AppLoader from "../ui/AppLoader";
import UsersStats from "./UsersStats";
import TablePagination from "../ui/TablePagination";

const UsersPage = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isFetching } = useGetUsers();

  const filteredUsers = useMemo(
    () =>
      data?.users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase()),
      ) ?? [],
    [data?.users, search],
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

  return (
    <main className="space-y-6 p-6">
      {isLoading ? (
        <StatsCardsSkeleton cards={4} />
      ) : (
        data && <UsersStats data={data} />
      )}
      {isFetching && <AppLoader />}
      <DataTableLayout
        title="User List"
        description="Browse, search and manage your users."
        toolbar={<SearchInput value={search} onChange={setSearch} />}
      >
        <UsersTable users={paginatedData} />
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      </DataTableLayout>
    </main>
  );
};

export default UsersPage;
