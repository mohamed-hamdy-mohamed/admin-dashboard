import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageSectionSkeletonProps {
  children: ReactNode;
  className?: string;
  label?: string;
}

const PageSectionSkeleton = ({
  children,
  className,
  label,
}: PageSectionSkeletonProps) => {
  return (
    <section
      className={cn(className)}
      role="status"
      aria-busy="true"
      aria-label={label}
    >
      {children}
    </section>
  );
};

export default PageSectionSkeleton;
