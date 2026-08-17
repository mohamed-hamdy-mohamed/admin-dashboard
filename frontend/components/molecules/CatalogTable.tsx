import { memo, type ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/atoms/ui/table";

interface CatalogTableProps {
  columns: ReactNode;
  colSpan: number;
  emptyMessage: string;
  isEmpty: boolean;
  children: ReactNode;
}

const CatalogTable = ({
  columns,
  colSpan,
  emptyMessage,
  isEmpty,
  children,
}: CatalogTableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>{columns}</TableRow>
        </TableHeader>
        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell
                colSpan={colSpan}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            children
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default memo(CatalogTable);
