"use client";

import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface ViewButtonProps {
  onClick?: () => void;
}

const ViewButton = ({ onClick }: ViewButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label="View"
      className="h-8 w-8 hover:bg-blue-100 hover:text-blue-600"
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
};

export default ViewButton;
