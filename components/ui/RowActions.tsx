"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Eye, Pencil, MoreHorizontal } from "lucide-react";

interface RowActionsProps {
  id: number;
}

const RowActions = ({ id }: RowActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
          inline-flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          transition-colors
          hover:bg-muted
          focus:outline-none
          focus:ring-2
          focus:ring-ring
        "
      >
        <MoreHorizontal className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RowActions;
