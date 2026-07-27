"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface MoreButtonProps {
  onClick?: () => void;
}

const MoreButton = ({ onClick }: MoreButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label="More Actions"
      className="h-8 w-8 hover:bg-slate-100"
    >
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );
};

export default MoreButton;
