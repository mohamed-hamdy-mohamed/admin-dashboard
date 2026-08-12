import { useMemo, useState } from "react";

interface UsePaginationProps<T> {
  data: T[];
  itemsPerPage?: number;
}

export const usePagination = <T>({
  data,
  itemsPerPage = 10,
}: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPage = (page: number) => setCurrentPage(page);

  return {
    paginatedData,
    currentPage,
    totalPages,
    prevPage,
    nextPage,
    goToPage,
  };
};
