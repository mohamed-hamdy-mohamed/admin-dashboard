import { memo, type ReactNode } from "react";
import { PAGE_CONTENT_CLASSNAME } from "@/constants/layout";
import DataTableLayout from "@/shared/atoms/DataTableLayout";
import SearchInput from "@/shared/atoms/SearchInput";
import TablePagination from "@/shared/atoms/TablePagination";
import { LoadingState, StatsCardsSkeleton } from "@/components/skeletons";

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
      <LoadingState isLoading={isLoading} fallback={<StatsCardsSkeleton />}>
        {header}
      </LoadingState>
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

export default memo(CatalogPageTemplate);
