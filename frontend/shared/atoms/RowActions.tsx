"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/atoms/dropdown-menu";
import { MoreHorizontal, type LucideIcon } from "lucide-react";

export interface RowActionItem {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface RowActionsProps {
  actions: RowActionItem[];
  ariaLabel?: string;
}

const RowActions = ({
  actions,
  ariaLabel = "Row actions",
}: RowActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label={ariaLabel}
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <DropdownMenuItem key={action.label} onClick={action.onClick}>
              <Icon className="me-2 h-4 w-4" />
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowActions;
