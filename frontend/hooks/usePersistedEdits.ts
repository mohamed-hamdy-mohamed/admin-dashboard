import { useCallback, useMemo, useState } from "react";

interface UsePersistedEditsOptions<TItem extends { id: number }, TEdit> {
  items: TItem[] | undefined;
  load: () => Record<number, TEdit>;
  persist: (edits: Record<number, TEdit>) => void;
  apply: (items: TItem[], edits: Record<number, TEdit>) => TItem[];
}

export const usePersistedEdits = <TItem extends { id: number }, TEdit>({
  items,
  load,
  persist,
  apply,
}: UsePersistedEditsOptions<TItem, TEdit>) => {
  const [edits, setEdits] = useState(load);

  const mergedItems = useMemo(
    () => apply(items ?? [], edits),
    [apply, edits, items],
  );

  const saveEdit = useCallback(
    (item: TItem, values: TEdit) => {
      setEdits((prev) => {
        const nextEdits = {
          ...prev,
          [item.id]: values,
        };

        persist(nextEdits);
        return nextEdits;
      });

      return {
        ...item,
        ...values,
      };
    },
    [persist],
  );

  return {
    edits,
    mergedItems,
    saveEdit,
  };
};
