"use client";

import { Button } from "@/components/ui/button";
import { Eye, Pencil, MoreHorizontal } from "lucide-react";

interface UserRowActionsProps {
  userId: number;
}

const UserRowActions = ({ userId }: UserRowActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        size="icon"
        variant="ghost"
        aria-label="View User"
        onClick={() => console.log("View", userId)}
      >
        <Eye className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        aria-label="Edit User"
        onClick={() => console.log("Edit", userId)}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        aria-label="More Actions"
        onClick={() => console.log("More", userId)}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default UserRowActions;
