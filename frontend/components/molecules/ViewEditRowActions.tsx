"use client";

import { memo, useMemo } from "react";
import { Eye, Pencil } from "lucide-react";
import RowActions from "@/components/atoms/ui/RowActions";

interface ViewEditRowActionsProps<T> {
  item: T;
  ariaLabel: string;
  viewLabel: string;
  editLabel: string;
  onView: (item: T) => void;
  onEdit: (item: T) => void;
}

const ViewEditRowActionsInner = <T,>({
  item,
  ariaLabel,
  viewLabel,
  editLabel,
  onView,
  onEdit,
}: ViewEditRowActionsProps<T>) => {
  const actions = useMemo(
    () => [
      {
        label: viewLabel,
        icon: Eye,
        onClick: () => onView(item),
      },
      {
        label: editLabel,
        icon: Pencil,
        onClick: () => onEdit(item),
      },
    ],
    [editLabel, item, onEdit, onView, viewLabel],
  );

  return <RowActions ariaLabel={ariaLabel} actions={actions} />;
};

const ViewEditRowActions = memo(ViewEditRowActionsInner) as typeof ViewEditRowActionsInner;

export default ViewEditRowActions;
