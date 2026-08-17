import { memo } from "react";
import { PAGE_CONTENT_CLASSNAME } from "@/constants/layout";
import StatsCardsSkeleton from "@/components/skeletons/StatsCardsSkeleton";
import TableCardSkeleton from "@/components/skeletons/TableCardSkeleton";
import type { TableRowSkeletonLeading } from "@/components/skeletons/TableRowSkeleton";

interface CatalogPageSkeletonProps {
  columns?: number;
  leading?: TableRowSkeletonLeading;
}

const CatalogPageSkeleton = ({
  columns = 7,
  leading = "avatar",
}: CatalogPageSkeletonProps) => {
  return (
    <div className={PAGE_CONTENT_CLASSNAME}>
      <StatsCardsSkeleton />
      <TableCardSkeleton columns={columns} leading={leading} />
    </div>
  );
};

export default memo(CatalogPageSkeleton);
