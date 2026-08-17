import { UsersResponse } from "@/types/users";
import { useDummyJsonQuery } from "@/hooks/useDummyJsonQuery";

const USERS_SELECT =
  "id,firstName,lastName,age,gender,email,phone,username,image,university,address,company,role";

export const useGetUsers = () => {
  return useDummyJsonQuery<UsersResponse>("users", "/users", {
    select: USERS_SELECT,
  });
};
