import { useCallback, useState } from "react";

export const useEntityDialog = <T,>() => {
  const [item, setItem] = useState<T | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const openView = useCallback((nextItem: T) => {
    setItem(nextItem);
    setViewOpen(true);
  }, []);

  const openEdit = useCallback((nextItem: T) => {
    setItem(nextItem);
    setEditOpen(true);
  }, []);

  return {
    item,
    setItem,
    viewOpen,
    setViewOpen,
    editOpen,
    setEditOpen,
    openView,
    openEdit,
  };
};
