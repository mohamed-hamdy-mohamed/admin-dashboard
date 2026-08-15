import QueryProvider from "@/providers/QueryProvider";
import ProductsPage from "@/components/ProductsPage/ProductsPage";

const Products = () => {
  return (
    <QueryProvider>
      <ProductsPage />
    </QueryProvider>
  );
};

export default Products;
