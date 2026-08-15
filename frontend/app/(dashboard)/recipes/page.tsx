import QueryProvider from "@/providers/QueryProvider";
import RecipesPage from "@/components/RecipesPage/RecipesPage";

const Recipes = () => {
  return (
    <QueryProvider>
      <RecipesPage />
    </QueryProvider>
  );
};

export default Recipes;
