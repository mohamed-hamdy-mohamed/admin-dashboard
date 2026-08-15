"use client";

import { Button } from "@/components/ui/button";
import { useTranslation } from "@/providers/LanguageProvider";
import { Pencil } from "lucide-react";

interface EditButtonProps {
  onClick?: () => void;
}

const EditButton = ({ onClick }: EditButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={t("aria.edit")}
      className="h-8 w-8 hover:bg-amber-100 hover:text-amber-600"
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
};

export default EditButton;
