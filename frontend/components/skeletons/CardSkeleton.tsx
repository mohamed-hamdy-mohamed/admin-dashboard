import { memo } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/shared/atoms/card";
import { Skeleton } from "@/shared/atoms/skeleton";

type CardSkeletonVariant = "stat" | "chart" | "plain";

interface CardSkeletonProps {
  variant?: CardSkeletonVariant;
  className?: string;
}

const StatCardSkeleton = ({ className }: { className?: string }) => (
  <Card className={cn("border-0 shadow-sm", className)} aria-hidden="true">
    <CardContent className="p-4 sm:p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-3 w-36" />
        </div>
        <Skeleton className="h-12 w-12 rounded-xl" />
      </div>
    </CardContent>
  </Card>
);

const ChartCardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "min-w-0 rounded-xl border border-border bg-card p-4 sm:p-6",
      className,
    )}
    aria-hidden="true"
  >
    <div className="mb-4 space-y-2 sm:mb-6">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-56" />
    </div>
    <Skeleton className="h-56 rounded-lg sm:h-64 md:h-80" />
  </div>
);

const PlainCardSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "min-w-0 rounded-xl border border-border bg-card p-4 sm:p-6",
      className,
    )}
    aria-hidden="true"
  >
    <div className="space-y-3">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const CardSkeleton = ({ variant = "plain", className }: CardSkeletonProps) => {
  if (variant === "stat") {
    return <StatCardSkeleton className={className} />;
  }

  if (variant === "chart") {
    return <ChartCardSkeleton className={className} />;
  }

  return <PlainCardSkeleton className={className} />;
};

export default memo(CardSkeleton);
