"use client";

import { FormEvent, useState } from "react";
import { Recipe } from "@/types/recipes";
import { RecipeEditValues } from "@/types/recipe-edits";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/ui/dialog";
import { Input } from "@/components/atoms/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/ui/select";
import DialogFormActions from "@/components/atoms/ui/DialogFormActions";
import FormField from "@/components/atoms/ui/FormField";
import { useTranslation } from "@/providers/LanguageProvider";

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
        <FormField id="recipeName" label={t("recipes.dialogs.edit.name")}>
          <Input
            id="recipeName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-xl"
          />
        </FormField>

        <FormField id="cuisine" label={t("recipes.dialogs.edit.cuisine")}>
          <Input
            id="cuisine"
            value={cuisine}
            onChange={(event) => setCuisine(event.target.value)}
            className="h-11 rounded-xl"
          />
        </FormField>

        <FormField id="difficulty" label={t("recipes.dialogs.edit.difficulty")}>
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
        </FormField>
      </div>

      <DialogFormActions
        cancelLabel={t("common.cancel")}
        submitLabel={t("common.saveChanges")}
        onCancel={onCancel}
      />
    </form>
  );
};

export default RecipeEditForm;
