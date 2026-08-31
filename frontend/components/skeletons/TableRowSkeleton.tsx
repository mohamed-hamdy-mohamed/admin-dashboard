import { memo } from "react";
import { TableCell, TableRow } from "@/shared/atoms/table";
import { Skeleton } from "@/shared/atoms/skeleton";

export type TableRowSkeletonLeading = "line" | "avatar" | "image";

interface TableRowSkeletonProps {
  columns: number;
  leading?: TableRowSkeletonLeading;
}

const LeadingSkeleton = ({ leading }: { leading: TableRowSkeletonLeading }) => {
  if (leading === "avatar") {
    return (
      <div className="flex items-center gap-3">
        <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    );
  }

  if (leading === "image") {
    return <Skeleton className="size-[50px] rounded-lg" />;
  }

  return <Skeleton className="h-4 w-28" />;
};

const TableRowSkeleton = ({
  columns,
  leading = "line",
}: TableRowSkeletonProps) => {
  return (
    <TableRow aria-hidden="true">
      <TableCell>
        <LeadingSkeleton leading={leading} />
      </TableCell>
      {Array.from({ length: Math.max(columns - 1, 0) }, (_, index) => (
        <TableCell key={index}>
          {leading === "image" && index === 0 ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          ) : (
            <Skeleton className="h-4 w-16" />
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default memo(TableRowSkeleton);
