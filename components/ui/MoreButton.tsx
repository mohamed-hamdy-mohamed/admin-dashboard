"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/LanguageProvider";
import { MoreHorizontal } from "lucide-react";

interface MoreButtonProps {
  onClick?: () => void;
}

const MoreButton = ({ onClick }: MoreButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={t("rowActions.moreActions")}
      className="h-8 w-8 hover:bg-muted"
    >
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );
};

export default MoreButton;
