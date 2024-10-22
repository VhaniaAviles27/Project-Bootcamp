import { useFetchData } from "../hooks/useFetchData";
import { Category } from "../models/Category";

export const useFetchCategories = () => {
  const { data: categories, loading, error } = useFetchData<Category>('https://dummyjson.com/products/categories');
  return { categories, loading, error };
};
