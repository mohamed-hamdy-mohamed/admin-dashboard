"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Recipe } from "@/types/recipes";
import RecipesTableRow from "./RecipesTableRow";

interface RecipesTableProps {
  recipes: Recipe[];
}

const RecipesTable = ({ recipes }: RecipesTableProps) => {
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
          {recipes.map((recipe) => (
            <RecipesTableRow key={recipe.id} recipe={recipe} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipesTable;
