"use client";

import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

interface EditButtonProps {
  onClick?: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label="Edit"
      className="h-8 w-8 hover:bg-amber-100 hover:text-amber-600"
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
};

export default EditButton;
