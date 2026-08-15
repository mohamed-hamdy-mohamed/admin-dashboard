"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
}: UserAvatarProps) => {
  const src = getAvatarSrc(avatar);
  const [hasError, setHasError] = useState(false);
  const displayName = getFullName(firstName, lastName, name);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const showImage = Boolean(src) && !hasError;

  return (
    <Avatar className={cn("overflow-hidden", className)}>
      {showImage ? (
        <img
          src={src}
          alt={displayName}
          className="relative z-[1] size-full rounded-[inherit] object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <AvatarFallback>{getInitials(firstName, lastName)}</AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
