import { useDeferredValue, useMemo, useState } from "react";

export const useCatalogSearch = <T,>(
  items: T[] | undefined,
  match: (item: T, query: string) => boolean,
) => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filteredItems = useMemo(() => {
    const list = items ?? [];
    const query = deferredSearch.trim().toLowerCase();

    if (!query) {
      return list;
    }

    return list.filter((item) => match(item, query));
  }, [deferredSearch, items, match]);

  return {
    search,
    setSearch,
    filteredItems,
  };
};
