import { User } from "@/types/users";
import { UserEditValues } from "@/types/user-edits";
import { applyIdEdits, loadJson, persistJson } from "@/util/localEdits";

export const USER_EDITS_STORAGE_KEY = "admin-dashboard-user-edits";

export type UserEditsMap = Record<number, UserEditValues>;

export const loadUserEdits = (): UserEditsMap => {
  return loadJson<UserEditsMap>(USER_EDITS_STORAGE_KEY, {});
};

export const persistUserEdits = (edits: UserEditsMap): void => {
  persistJson(USER_EDITS_STORAGE_KEY, edits);
};

export const applyUserEdits = (users: User[], edits: UserEditsMap): User[] => {
  return applyIdEdits(users, edits, (user, edit) => ({
    ...user,
    firstName: edit.firstName,
    lastName: edit.lastName,
    role: edit.role,
  }));
};
