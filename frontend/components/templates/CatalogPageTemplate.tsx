import type { ReactNode } from "react";
import { PAGE_CONTENT_CLASSNAME } from "@/constants/layout";
import DataTableLayout from "@/components/atoms/ui/DataTableLayout";
import SearchInput from "@/components/atoms/ui/SearchInput";
import TablePagination from "@/components/atoms/ui/TablePagination";
import { StatsCardsSkeleton } from "@/components/skeletons";

interface CatalogPageTemplateProps {
  header: ReactNode;
  isLoading?: boolean;
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
  isLoading = false,
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
    <div className={PAGE_CONTENT_CLASSNAME}>
      {isLoading ? <StatsCardsSkeleton /> : header}
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
    </div>
  );
};

export default CatalogPageTemplate;
