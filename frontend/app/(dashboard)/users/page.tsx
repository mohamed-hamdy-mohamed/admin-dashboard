import QueryProvider from "@/providers/QueryProvider";
import UsersPage from "@/components/UsersPage/UsersPage";

const Users = () => {
  return (
    <QueryProvider>
      <UsersPage />
    </QueryProvider>
  );
};

export default Users;
