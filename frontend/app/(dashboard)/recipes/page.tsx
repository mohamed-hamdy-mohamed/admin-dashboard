import { HydrationBoundary } from "@tanstack/react-query";
import RecipesPage from "@/components/RecipesPage/RecipesPage";
import {
  dehydrateCatalogQuery,
  recipesQueryOptions,
} from "@/lib/catalogQueries";

const Recipes = async () => {
  const state = await dehydrateCatalogQuery(recipesQueryOptions());

  return (
    <HydrationBoundary state={state}>
      <RecipesPage />
    </HydrationBoundary>
  );
};

export default Recipes;
