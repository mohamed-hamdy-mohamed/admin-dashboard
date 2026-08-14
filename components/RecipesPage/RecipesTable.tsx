"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Recipe } from "@/types/recipes";
import RecipesTableRow from "./RecipesTableRow";

interface RecipesTableProps {
  recipes: Recipe[];
  onViewRecipe: (recipe: Recipe) => void;
  onEditRecipe: (recipe: Recipe) => void;
}

const RecipesTable = ({
  recipes,
  onViewRecipe,
  onEditRecipe,
}: RecipesTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[320px]">Recipe</TableHead>

            <TableHead>Cuisine</TableHead>

            <TableHead>Difficulty</TableHead>

            <TableHead>Rating</TableHead>

            <TableHead>Reviews</TableHead>

            <TableHead>Servings</TableHead>

            <TableHead>Calories</TableHead>

            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipesTableRow
                key={recipe.id}
                recipe={recipe}
                onView={onViewRecipe}
                onEdit={onEditRecipe}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                No recipes found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipesTable;
