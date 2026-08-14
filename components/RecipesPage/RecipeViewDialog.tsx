"use client";

import { Recipe } from "@/types/recipes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RecipeDifficultyBadge from "./RecipeDifficultyBadge";

interface RecipeViewDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
};

const RecipeViewDialog = ({
  recipe,
  open,
  onOpenChange,
}: RecipeViewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        {recipe && (
          <>
            <DialogHeader>
              <DialogTitle>Recipe Details</DialogTitle>
              <DialogDescription>
                Read-only recipe information.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-lg">
                <AvatarImage src={recipe.image} alt={recipe.name} />
                <AvatarFallback>{recipe.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div>
                  <p className="text-lg font-semibold">{recipe.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {recipe.cuisine}
                  </p>
                </div>
                <RecipeDifficultyBadge difficulty={recipe.difficulty} />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <DetailItem label="Rating" value={recipe.rating} />
              <DetailItem label="Reviews" value={recipe.reviewCount} />
              <DetailItem label="Servings" value={recipe.servings} />
              <DetailItem
                label="Calories"
                value={`${recipe.caloriesPerServing} kcal`}
              />
              <DetailItem label="Prep Time" value={`${recipe.prepTimeMinutes} min`} />
              <DetailItem label="Cook Time" value={`${recipe.cookTimeMinutes} min`} />
              <DetailItem label="Meal Type" value={recipe.mealType.join(", ")} />
              <DetailItem label="Tags" value={recipe.tags.join(", ")} />
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeViewDialog;
