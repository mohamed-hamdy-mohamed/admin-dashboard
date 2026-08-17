import { CATALOG_ITEMS_PER_PAGE } from "@/constants/catalog";
import { useCatalogSearch } from "@/hooks/useCatalogSearch";
import { usePagination } from "@/hooks/usePagination";

interface UseCatalogCollectionOptions<T> {
  items: T[] | undefined;
  match: (item: T, query: string) => boolean;
  itemsPerPage?: number;
}

export const useCatalogCollection = <T,>({
  items,
  match,
  itemsPerPage = CATALOG_ITEMS_PER_PAGE,
}: UseCatalogCollectionOptions<T>) => {
  const { search, setSearch, filteredItems } = useCatalogSearch(items, match);
  const pagination = usePagination({
    data: filteredItems,
    itemsPerPage,
  });

  return {
    search,
    setSearch,
    filteredItems,
    ...pagination,
  };
};
