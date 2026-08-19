import {
  dehydrate,
  queryOptions,
  type FetchQueryOptions,
} from "@tanstack/react-query";
import { fetchDummyJson } from "@/lib/dummyJson";
import { createQueryClient } from "@/lib/queryClient";
import type { ProductsResponse } from "@/types/products";
import type { RecipesResponse } from "@/types/recipes";
import type { UsersResponse } from "@/types/users";

export const PRODUCTS_SELECT =
  "id,title,category,price,rating,stock,availabilityStatus,brand,thumbnail";

export const USERS_SELECT =
  "id,firstName,lastName,age,gender,email,phone,username,image,university,address,company,role";

export const RECIPES_SELECT =
  "id,name,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,tags,image,rating,reviewCount,mealType";

export const productsQueryOptions = () =>
  queryOptions({
    queryKey: ["products", PRODUCTS_SELECT],
    queryFn: () => fetchDummyJson<ProductsResponse>("/products", PRODUCTS_SELECT),
  });

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ["users", USERS_SELECT],
    queryFn: () => fetchDummyJson<UsersResponse>("/users", USERS_SELECT),
  });

export const recipesQueryOptions = () =>
  queryOptions({
    queryKey: ["recipes", RECIPES_SELECT],
    queryFn: () => fetchDummyJson<RecipesResponse>("/recipes", RECIPES_SELECT),
  });

export const dehydrateCatalogQuery = async <
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[],
>(
  options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
  const queryClient = createQueryClient();

  try {
    await queryClient.prefetchQuery(options);
  } catch {
    // Client hooks retry if server prefetch fails.
  }

  return dehydrate(queryClient);
};
