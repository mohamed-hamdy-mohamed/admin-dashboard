"use client";

import { useGetUsers } from "@/hooks/useGetUsers";
import StatsCard from "../ui/StatsCard";
import { Cake, Globe, LucideIcon, ShieldCheck, Users } from "lucide-react";
import StatsCardsSkeleton from "../ui/StatsCardsSkeleton";
import DataTableLayout from "../ui/DataTableLayout";
import SearchInput from "../ui/SearchInput";
import { useState } from "react";
import UsersTable from "./UsersTable";
import AppLoader from "../ui/AppLoader";
import UsersStats from "./UsersStats";

const UsersPage = () => {
  const [search, setSearch] = useState<string>("");
  const { data, isLoading, isFetching } = useGetUsers();
  const users = data?.users ?? [];
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="space-y-6 p-6">
      {/* <UsersPageHeader /> */}
      {isLoading ? (
        <StatsCardsSkeleton cards={4} />
      ) : (
        data && <UsersStats data={data} />
      )}
      {isFetching && <AppLoader />}{" "}
      <DataTableLayout
        title="User List"
        description="Browse, search and manage your users."
        toolbar={<SearchInput value={search} onChange={setSearch} />}
      >
        <UsersTable users={filteredUsers} />
      </DataTableLayout>
    </main>
  );
};

export default UsersPage;
