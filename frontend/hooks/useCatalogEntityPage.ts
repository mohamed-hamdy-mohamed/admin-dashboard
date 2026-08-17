import { useCallback, useMemo } from "react";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import { useEntityDialog } from "@/hooks/useEntityDialog";
import { usePersistedEdits } from "@/hooks/usePersistedEdits";

interface UseCatalogEntityPageOptions<
  TItem extends { id: number },
  TEdit,
  TKey extends string,
  TData extends Record<TKey, TItem[]>,
> {
  data: TData | undefined;
  collectionKey: TKey;
  match: (item: TItem, query: string) => boolean;
  load: () => Record<number, TEdit>;
  persist: (edits: Record<number, TEdit>) => void;
  apply: (items: TItem[], edits: Record<number, TEdit>) => TItem[];
}

export const useCatalogEntityPage = <
  TItem extends { id: number },
  TEdit,
  TKey extends string,
  TData extends Record<TKey, TItem[]>,
>({
  data,
  collectionKey,
  match,
  load,
  persist,
  apply,
}: UseCatalogEntityPageOptions<TItem, TEdit, TKey, TData>) => {
  const { mergedItems, saveEdit } = usePersistedEdits<TItem, TEdit>({
    items: data?.[collectionKey],
    load,
    persist,
    apply,
  });
  const {
    item: activeItem,
    setItem: setActiveItem,
    viewOpen,
    setViewOpen,
    editOpen,
    setEditOpen,
    openView,
    openEdit,
  } = useEntityDialog<TItem>();
  const collection = useCatalogCollection({
    items: mergedItems,
    match,
  });

  const mergedData = useMemo((): TData | undefined => {
    if (!data) {
      return undefined;
    }

    return {
      ...data,
      [collectionKey]: mergedItems,
    } as TData;
  }, [collectionKey, data, mergedItems]);

  const handleSave = useCallback(
    (values: TEdit) => {
      if (!activeItem) {
        return;
      }

      setActiveItem(saveEdit(activeItem, values));
      setEditOpen(false);
    },
    [activeItem, saveEdit, setActiveItem, setEditOpen],
  );

  return {
    ...collection,
    mergedData,
    activeItem,
    viewOpen,
    setViewOpen,
    editOpen,
    setEditOpen,
    openView,
    openEdit,
    handleSave,
  };
};
