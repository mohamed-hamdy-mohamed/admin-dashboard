import { useMemo, useState } from "react";

interface UsePaginationProps<T> {
  data?: T[];
  itemsPerPage?: number;
  totalItems?: number;
}

export const usePagination = <T>({
  data = [],
  itemsPerPage = 10,
  totalItems,
}: UsePaginationProps<T>) => {
  const [currentPageState, setCurrentPageState] = useState<number>(1);

  const hasKnownTotal = totalItems !== undefined || data.length > 0;
  const resolvedTotalItems = totalItems ?? data.length;
  const totalPages =
    resolvedTotalItems > 0 ? Math.ceil(resolvedTotalItems / itemsPerPage) : 1;
  const currentPage = Math.min(currentPageState, totalPages);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const prevPage = () => {
    setCurrentPageState((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setCurrentPageState((prev) => {
      const next = prev + 1;
      return hasKnownTotal ? Math.min(next, totalPages) : next;
    });
  };

  const goToPage = (page: number) => {
    const next = Math.max(1, page);
    setCurrentPageState(hasKnownTotal ? Math.min(next, totalPages) : next);
  };

  return {
    paginatedData,
    currentPage,
    totalPages,
    itemsPerPage,
    prevPage,
    nextPage,
    goToPage,
  };
};
