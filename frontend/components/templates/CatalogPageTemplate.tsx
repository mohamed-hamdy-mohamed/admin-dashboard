import type { ReactNode } from "react";
import { PAGE_CONTENT_CLASSNAME } from "@/constants/layout";
import AppLoader from "@/components/atoms/ui/AppLoader";
import DataTableLayout from "@/components/atoms/ui/DataTableLayout";
import SearchInput from "@/components/atoms/ui/SearchInput";
import TablePagination from "@/components/atoms/ui/TablePagination";

interface CatalogPageTemplateProps {
  header: ReactNode;
  isFetching?: boolean;
  title: string;
  description: string;
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

const CatalogPageTemplate = ({
  header,
  isFetching = false,
  title,
  description,
  search,
  onSearchChange,
  searchPlaceholder,
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  children,
  footer,
}: CatalogPageTemplateProps) => {
  return (
    <main className={PAGE_CONTENT_CLASSNAME}>
      {header}
      {isFetching && <AppLoader />}
      <DataTableLayout
        title={title}
        description={description}
        toolbar={
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        }
      >
        {children}
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          onPrevious={onPrevious}
          onNext={onNext}
        />
      </DataTableLayout>
      {footer}
    </main>
  );
};

export default CatalogPageTemplate;
