import { UserRole } from "@/types/users";

export interface UserEditValues {
  firstName: string;
  lastName: string;
  role: UserRole;
}
