"use client";

import { memo, useCallback } from "react";
import { Recipe } from "@/types/recipes";
import { RecipeEditValues } from "@/types/recipe-edits";
import EntityDialog from "@/components/molecules/EntityDialog";
import { useTranslation } from "@/providers/LanguageProvider";
import RecipeEditForm from "./RecipeEditForm";

interface RecipeEditDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: RecipeEditValues) => void;
}

const RecipeEditDialog = ({
  recipe,
  open,
  onOpenChange,
  onSave,
}: RecipeEditDialogProps) => {
  const { t } = useTranslation();
  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <EntityDialog
      open={open}
      onOpenChange={onOpenChange}
      closeLabel={t("common.close")}
      className="sm:max-w-md"
    >
      {recipe && open ? (
        <RecipeEditForm
          key={recipe.id}
          recipe={recipe}
          onSave={onSave}
          onCancel={handleCancel}
        />
      ) : null}
    </EntityDialog>
  );
};

export default memo(RecipeEditDialog);
