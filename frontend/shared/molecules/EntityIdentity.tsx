import { memo, type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/atoms/avatar";
import { cn } from "@/lib/utils";

interface EntityIdentityProps {
  src: string;
  alt: string;
  fallback: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  avatarClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

const EntityIdentity = ({
  src,
  alt,
  fallback,
  title,
  subtitle,
  meta,
  children,
  avatarClassName,
  contentClassName,
  titleClassName = "font-semibold",
  subtitleClassName = "text-xs text-muted-foreground",
  sizes = "44px",
  priority = false,
  className,
}: EntityIdentityProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Avatar className={avatarClassName}>
        <AvatarImage src={src} alt={alt} sizes={sizes} priority={priority} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div className={contentClassName}>
        {children ? (
          <>
            <div>
              <p className={titleClassName}>{title}</p>
              {subtitle ? <p className={subtitleClassName}>{subtitle}</p> : null}
              {meta}
            </div>
            {children}
          </>
        ) : (
          <>
            <p className={titleClassName}>{title}</p>
            {subtitle ? <p className={subtitleClassName}>{subtitle}</p> : null}
            {meta}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(EntityIdentity);
