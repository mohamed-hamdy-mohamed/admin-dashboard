"use client";

import { TableCell, TableRow } from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Star } from "lucide-react";
import { Recipe } from "@/types/recipes";
import RowActions from "../ui/RowActions";
import RecipeDifficultyBadge from "./RecipeDifficultyBadge";

interface RecipesTableRowProps {
  recipe: Recipe;
}

const RecipesTableRow = ({ recipe }: RecipesTableRowProps) => {
  return (
    <TableRow className="transition-colors hover:bg-muted/40">
      {/* Recipe */}

      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage src={recipe.image} />

            <AvatarFallback>{recipe.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <p className="font-semibold">{recipe.name}</p>

            <p className="text-xs text-muted-foreground">
              {recipe.mealType.join(", ")}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Cuisine */}

      <TableCell>{recipe.cuisine}</TableCell>

      {/* Difficulty */}

      <TableCell>
        <RecipeDifficultyBadge difficulty={recipe.difficulty} />
      </TableCell>

      {/* Rating */}

      <TableCell>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

          {recipe.rating}
        </div>
      </TableCell>

      {/* Reviews */}

      <TableCell>{recipe.reviewCount}</TableCell>

      {/* Servings */}

      <TableCell>
        <Badge variant="outline">{recipe.servings}</Badge>
      </TableCell>

      {/* Calories */}

      <TableCell>{recipe.caloriesPerServing} kcal</TableCell>

      {/* Actions */}

      <TableCell className="text-right">
        <RowActions id={recipe.id} />
      </TableCell>
    </TableRow>
  );
};

export default RecipesTableRow;
