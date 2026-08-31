import { memo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/shared/atoms/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/atoms/table";
import { Skeleton } from "@/shared/atoms/skeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";
import type { TableRowSkeletonLeading } from "@/components/skeletons/TableRowSkeleton";

interface TableCardSkeletonProps {
  columns?: number;
  leading?: TableRowSkeletonLeading;
}

const TableCardSkeleton = ({
  columns = 7,
  leading = "avatar",
}: TableCardSkeletonProps) => {
  return (
    <Card className="shadow-sm" aria-hidden="true">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-full lg:w-64" />
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columns }, (_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableSkeleton columns={columns} leading={leading} />
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(TableCardSkeleton);
