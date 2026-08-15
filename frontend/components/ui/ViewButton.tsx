"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/LanguageProvider";
import { Eye } from "lucide-react";

interface ViewButtonProps {
  onClick?: () => void;
}

const ViewButton = ({ onClick }: ViewButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={t("aria.view")}
      className="h-8 w-8 hover:bg-blue-100 hover:text-blue-600"
    >
      <Eye className="h-4 w-4" />
    </Button>
  );
};

export default ViewButton;
