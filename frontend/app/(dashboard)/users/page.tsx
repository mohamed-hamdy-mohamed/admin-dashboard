import { HydrationBoundary } from "@tanstack/react-query";
import UsersPage from "@/components/UsersPage/UsersPage";
import {
  dehydrateCatalogQuery,
  usersQueryOptions,
} from "@/lib/catalogQueries";

const Users = async () => {
  const state = await dehydrateCatalogQuery(usersQueryOptions());

  return (
    <HydrationBoundary state={state}>
      <UsersPage />
    </HydrationBoundary>
  );
};

export default Users;
