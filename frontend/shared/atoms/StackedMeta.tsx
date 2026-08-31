import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StackedMetaProps {
  title: ReactNode;
  subtitle?: ReactNode;
  titleClassName?: string;
  className?: string;
}

const StackedMeta = ({
  title,
  subtitle,
  titleClassName,
  className,
}: StackedMetaProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      <p className={cn("font-medium", titleClassName)}>{title}</p>
      {subtitle ? (
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
};

export default memo(StackedMeta);
