"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/atoms/avatar";
import { cn } from "@/lib/utils";
import { getAvatarSrc } from "@/util/avatar";
import { getFullName } from "@/util/getFullName";
import { getInitials } from "@/util/getInitials";

interface UserAvatarProps {
  firstName?: string | null;
  lastName?: string | null;
  name?: string;
  avatar?: string | null;
  className?: string;
  sizes?: string;
}

const UserAvatar = ({
  firstName,
  lastName,
  name,
  avatar,
  className,
  sizes = "32px",
}: UserAvatarProps) => {
  const src = getAvatarSrc(avatar);
  const displayName = getFullName(firstName, lastName, name);

  return (
    <Avatar className={cn("overflow-hidden", className)}>
      {src ? <AvatarImage src={src} alt={displayName} sizes={sizes} /> : null}
      <AvatarFallback>{getInitials(firstName, lastName)}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
