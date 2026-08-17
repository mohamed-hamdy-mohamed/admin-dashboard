import { HydrationBoundary } from "@tanstack/react-query";
import ProductsPage from "@/components/ProductsPage/ProductsPage";
import {
  dehydrateCatalogQuery,
  productsQueryOptions,
} from "@/lib/catalogQueries";

const Products = async () => {
  const state = await dehydrateCatalogQuery(productsQueryOptions());

  return (
    <HydrationBoundary state={state}>
      <ProductsPage />
    </HydrationBoundary>
  );
};

export default Products;
