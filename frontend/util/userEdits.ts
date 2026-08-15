import { User } from "@/types/users";
import { UserEditValues } from "@/types/user-edits";

export const USER_EDITS_STORAGE_KEY = "admin-dashboard-user-edits";

export type UserEditsMap = Record<number, UserEditValues>;

export const loadUserEdits = (): UserEditsMap => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const stored = localStorage.getItem(USER_EDITS_STORAGE_KEY);
    if (!stored) {
      return {};
    }

    return JSON.parse(stored) as UserEditsMap;
  } catch {
    return {};
  }
};

export const persistUserEdits = (edits: UserEditsMap): void => {
  localStorage.setItem(USER_EDITS_STORAGE_KEY, JSON.stringify(edits));
};

export const applyUserEdits = (users: User[], edits: UserEditsMap): User[] => {
  return users.map((user) => {
    const edit = edits[user.id];
    if (!edit) {
      return user;
    }

    return {
      ...user,
      firstName: edit.firstName,
      lastName: edit.lastName,
      role: edit.role,
    };
  });
};
