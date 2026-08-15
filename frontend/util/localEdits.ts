export const loadJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const stored = localStorage.getItem(key);
    if (!stored) {
      return fallback;
    }

    return JSON.parse(stored) as T;
  } catch {
    return fallback;
  }
};

export const persistJson = <T,>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const applyIdEdits = <TItem extends { id: number }, TEdit>(
  items: TItem[],
  edits: Record<number, TEdit>,
  merge: (item: TItem, edit: TEdit) => TItem,
): TItem[] => {
  return items.map((item) => {
    const edit = edits[item.id];
    if (!edit) {
      return item;
    }

    return merge(item, edit);
  });
};
