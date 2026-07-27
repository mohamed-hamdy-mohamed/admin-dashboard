import { apiClient } from "@/lib/apiClient";
import { UsersResponse } from "@/types/users";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async (): Promise<UsersResponse> => {
      const { data } = await apiClient.get<UsersResponse>("/users");
      return data;
    },
  });
};
