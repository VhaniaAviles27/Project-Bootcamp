import { useFetchData } from "./useFetchData";
import { useFilterProducts } from "./useFilterProducts";
import { Product } from "../models/Product";

export const useFetchProducts = () => {
  const { data: products, loading, error } = useFetchData<Product>('https://dummyjson.com/products');
  const { filteredProducts, filterBySearch, filterByCategory } = useFilterProducts(products);
  return { products: filteredProducts, loading, error, filterBySearch, filterByCategory };
};
