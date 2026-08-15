export const getInitials = (
  firstName?: string | null,
  lastName?: string | null
) => {
  const first = firstName?.trim().charAt(0) ?? "";
  const last = lastName?.trim().charAt(0) ?? "";

  return `${first}${last}`;
};
