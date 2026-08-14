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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Edit Recipe</DialogTitle>
        <DialogDescription>
          Update the recipe details. Changes are saved locally.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="recipeName">Name</Label>
          <Input
            id="recipeName"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-11 rounded-xl"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cuisine">Cuisine</Label>
          <Input
            id="cuisine"
            value={cuisine}
            onChange={(event) => setCuisine(event.target.value)}
            className="h-11 rounded-xl"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="difficulty">Difficulty</Label>
          <Select
            value={difficulty}
            onValueChange={(value) =>
              setDifficulty(value as Recipe["difficulty"])
            }
          >
            <SelectTrigger id="difficulty" className="h-11 w-full rounded-xl">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficultyOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
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
