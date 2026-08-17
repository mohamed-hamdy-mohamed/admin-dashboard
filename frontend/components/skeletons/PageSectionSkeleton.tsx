import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageSectionSkeletonProps {
  children: ReactNode;
  className?: string;
}

const PageSectionSkeleton = ({
  children,
  className,
}: PageSectionSkeletonProps) => {
  return (
    <section
      className={cn(className)}
      role="status"
      aria-busy="true"
    >
      {children}
    </section>
  );
};

export default PageSectionSkeleton;
