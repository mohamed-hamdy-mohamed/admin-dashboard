import { memo, type ReactNode } from "react";
import CatalogDataTable, {
  type CatalogColumn,
} from "@/shared/molecules/CatalogDataTable";
import { CATALOG_PRIORITY_ROWS } from "@/constants/catalog";
import type { TableRowSkeletonLeading } from "@/components/skeletons/TableRowSkeleton";

interface CatalogListTableProps<T extends { id: number }> {
  items: T[];
  isLoading?: boolean;
  columns: CatalogColumn[];
  emptyMessage: string;
  skeletonLeading?: TableRowSkeletonLeading;
  renderRow: (item: T, priority: boolean) => ReactNode;
}

const CatalogListTableInner = <T extends { id: number }>({
  items,
  isLoading = false,
  columns,
  emptyMessage,
  skeletonLeading,
  renderRow,
}: CatalogListTableProps<T>) => {
  return (
    <CatalogDataTable
      columns={columns}
      emptyMessage={emptyMessage}
      isLoading={isLoading}
      isEmpty={items.length === 0}
      skeletonLeading={skeletonLeading}
    >
      {items.map((item, index) =>
        renderRow(item, index < CATALOG_PRIORITY_ROWS),
      )}
    </CatalogDataTable>
  );
};

const CatalogListTable = memo(CatalogListTableInner) as typeof CatalogListTableInner;

export default CatalogListTable;
