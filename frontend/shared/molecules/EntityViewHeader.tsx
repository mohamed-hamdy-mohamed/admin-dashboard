import { memo, type ReactNode } from "react";
import EntityIdentity from "@/shared/molecules/EntityIdentity";

interface EntityViewHeaderProps {
  src: string;
  alt: string;
  fallback: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  avatarClassName?: string;
}

const EntityViewHeader = ({
  src,
  alt,
  fallback,
  title,
  subtitle,
  children,
  avatarClassName = "h-16 w-16 border shadow-sm",
}: EntityViewHeaderProps) => {
  return (
    <EntityIdentity
      src={src}
      alt={alt}
      fallback={fallback}
      title={title}
      subtitle={subtitle}
      sizes="64px"
      className="min-w-0 gap-4"
      avatarClassName={avatarClassName}
      contentClassName="space-y-2"
      titleClassName="text-lg font-semibold"
      subtitleClassName="text-sm text-muted-foreground"
    >
      {children}
    </EntityIdentity>
  );
};

export default memo(EntityViewHeader);
