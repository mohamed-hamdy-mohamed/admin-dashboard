import { API_BASE_URL } from "@/constants/api";

export const getAvatarSrc = (avatar?: string | null) => {
  if (!avatar) {
    return undefined;
  }

  if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
    return avatar;
  }

  const origin = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${origin}${avatar.startsWith("/") ? avatar : `/${avatar}`}`;
};
