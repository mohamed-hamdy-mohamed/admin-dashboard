"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/providers/LanguageProvider";
import { formatNumber } from "@/util/formatNumber";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const getPaginationItems = (
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: (number | "ellipsis")[] = [1];
  const showLeftEllipsis = currentPage > 3;
  const showRightEllipsis = currentPage < totalPages - 2;

  if (showLeftEllipsis) {
    items.push("ellipsis");
  }

  const rangeStart = showLeftEllipsis ? Math.max(2, currentPage - 1) : 2;
  const rangeEnd = showRightEllipsis
    ? Math.min(totalPages - 1, currentPage + 1)
    : totalPages - 1;

  for (let page = rangeStart; page <= rangeEnd; page += 1) {
    items.push(page);
  }

  if (showRightEllipsis) {
    items.push("ellipsis");
  }

  items.push(totalPages);

  return items.filter(
    (page, index, pages) => index === 0 || page !== pages[index - 1],
  );
};

const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
}: TablePaginationProps) => {
  const { locale, t } = useTranslation();

  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <Pagination className="mt-4" label={t("pagination.label")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text={t("pagination.previous")}
            ariaLabel={t("pagination.goToPreviousPage")}
            aria-disabled={isFirstPage}
            className={cn(isFirstPage && "pointer-events-none opacity-50")}
            onClick={(event) => {
              event.preventDefault();
              if (!isFirstPage) {
                onPrevious();
              }
            }}
          />
        </PaginationItem>

        {paginationItems.map((item, index) =>
          item === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis morePagesLabel={t("pagination.morePages")} />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                isActive={item === currentPage}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(item);
                }}
              >
                {formatNumber(item, locale)}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            text={t("pagination.next")}
            ariaLabel={t("pagination.goToNextPage")}
            aria-disabled={isLastPage}
            className={cn(isLastPage && "pointer-events-none opacity-50")}
            onClick={(event) => {
              event.preventDefault();
              if (!isLastPage) {
                onNext();
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
