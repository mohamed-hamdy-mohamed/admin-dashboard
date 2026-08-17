import { memo } from "react";
import { CATALOG_SKELETON_ROWS } from "@/constants/catalog";
import TableRowSkeleton, {
  type TableRowSkeletonLeading,
} from "@/components/skeletons/TableRowSkeleton";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  leading?: TableRowSkeletonLeading;
}

const TableSkeleton = ({
  columns,
  rows = CATALOG_SKELETON_ROWS,
  leading = "line",
}: TableSkeletonProps) => {
  return (
    <>
      {Array.from({ length: rows }, (_, index) => (
        <TableRowSkeleton key={index} columns={columns} leading={leading} />
      ))}
    </>
  );
};

export default memo(TableSkeleton);
