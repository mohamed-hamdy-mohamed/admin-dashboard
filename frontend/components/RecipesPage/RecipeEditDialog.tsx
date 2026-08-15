"use client";

import { FormEvent, useState } from "react";
import { Recipe } from "@/types/recipes";
import { RecipeEditValues } from "@/types/recipe-edits";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/ui/dialog";
import { Button } from "@/components/atoms/ui/button";
import { Input } from "@/components/atoms/ui/input";
import { Label } from "@/components/atoms/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/ui/select";
import { useTranslation } from "@/providers/LanguageProvider";

interface RecipeEditDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: RecipeEditValues) => void;
}

interface RecipeEditFormProps {
  recipe: Recipe;
  onSave: (values: RecipeEditValues) => void;
  onCancel: () => void;
}

const difficultyOptions: Recipe["difficulty"][] = ["Easy", "Medium", "Hard"];

const RecipeEditForm = ({ recipe, onSave, onCancel }: RecipeEditFormProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState(recipe.name);
  const [cuisine, setCuisine] = useState(recipe.cuisine);
  const [difficulty, setDifficulty] = useState<Recipe["difficulty"]>(
    recipe.difficulty,
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedCuisine = cuisine.trim();

    if (!trimmedName || !trimmedCuisine) {
      return;
    }

    onSave({
      name: trimmedName,
      cuisine: trimmedCuisine,
      difficulty,
    });
  };

  const difficultyLabels: Record<Recipe["difficulty"], string> = {
    Easy: t("recipes.difficulty.easy"),
    Medium: t("recipes.difficulty.medium"),
    Hard: t("recipes.difficulty.hard"),
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>{t("recipes.dialogs.edit.title")}</DialogTitle>
        <DialogDescription>
          {t("recipes.dialogs.edit.description")}
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="recipeName">{t("recipes.dialogs.edit.name")}</Label>
          <Input
            id="recipeName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-xl"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cuisine">{t("recipes.dialogs.edit.cuisine")}</Label>
          <Input
            id="cuisine"
            value={cuisine}
            onChange={(event) => setCuisine(event.target.value)}
            className="h-11 rounded-xl"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="difficulty">{t("recipes.dialogs.edit.difficulty")}</Label>
          <Select
            value={difficulty}
            onValueChange={(value) =>
              setDifficulty(value as Recipe["difficulty"])
            }
          >
            <SelectTrigger id="difficulty" className="h-11 w-full rounded-xl">
              <SelectValue placeholder={t("recipes.dialogs.edit.selectDifficulty")} />
            </SelectTrigger>
            <SelectContent>
              {difficultyOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {difficultyLabels[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          {t("common.cancel")}
        </Button>
        <Button type="submit">{t("common.saveChanges")}</Button>
      </DialogFooter>
    </form>
  );
};

const RecipeEditDialog = ({
  recipe,
  open,
  onOpenChange,
  onSave,
}: RecipeEditDialogProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" closeLabel={t("common.close")}>
        {recipe && open ? (
          <RecipeEditForm
            key={recipe.id}
            recipe={recipe}
            onSave={onSave}
            onCancel={() => onOpenChange(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeEditDialog;
