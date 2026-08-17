import { memo, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  isLoading: boolean;
  fallback: ReactNode;
  children: ReactNode;
  className?: string;
}

const LoadingState = ({
  isLoading,
  fallback,
  children,
  className,
}: LoadingStateProps) => {
  return (
    <div
      className={cn(className)}
      aria-busy={isLoading}
      role={isLoading ? "status" : undefined}
    >
      {isLoading ? fallback : children}
    </div>
  );
};

export default memo(LoadingState);
