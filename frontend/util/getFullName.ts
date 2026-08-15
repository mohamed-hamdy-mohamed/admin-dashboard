export const getFullName = (
  firstName?: string | null,
  lastName?: string | null,
  fallbackName?: string | null
) => {
  const fullName = [firstName, lastName]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ");

  return fullName || fallbackName?.trim() || "";
};
