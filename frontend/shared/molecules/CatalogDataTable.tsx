import { memo, type ReactNode } from "react";
import { TableHead } from "@/shared/atoms/table";
import CatalogTable from "@/shared/molecules/CatalogTable";
import { TableSkeleton } from "@/components/skeletons";
import type { TableRowSkeletonLeading } from "@/components/skeletons/TableRowSkeleton";

export interface CatalogColumn {
  label: string;
  className?: string;
}

interface CatalogDataTableProps {
  columns: CatalogColumn[];
  emptyMessage: string;
  isLoading?: boolean;
  isEmpty: boolean;
  skeletonLeading?: TableRowSkeletonLeading;
  children: ReactNode;
}

const CatalogDataTable = ({
  columns,
  emptyMessage,
  isLoading = false,
  isEmpty,
  skeletonLeading = "line",
  children,
}: CatalogDataTableProps) => {
  const colSpan = columns.length;

  return (
    <div aria-busy={isLoading} role={isLoading ? "status" : undefined}>
      <CatalogTable
        colSpan={colSpan}
        emptyMessage={emptyMessage}
        isEmpty={!isLoading && isEmpty}
        columns={
          <>
            {columns.map((column) => (
              <TableHead key={column.label} className={column.className}>
                {column.label}
              </TableHead>
            ))}
          </>
        }
      >
        {isLoading ? (
          <TableSkeleton columns={colSpan} leading={skeletonLeading} />
        ) : (
          children
        )}
      </CatalogTable>
    </div>
  );
};

export default memo(CatalogDataTable);
