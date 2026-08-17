import { useQuery } from "@tanstack/react-query";
import { usersQueryOptions } from "@/lib/catalogQueries";

export const useGetUsers = () => {
  return useQuery(usersQueryOptions());
};
