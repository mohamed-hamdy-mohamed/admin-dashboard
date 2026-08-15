import { UsersResponse } from "@/types/users";
import { useDummyJsonQuery } from "@/hooks/useDummyJsonQuery";

export const useGetUsers = () => {
  return useDummyJsonQuery<UsersResponse>("users", "/users");
};
