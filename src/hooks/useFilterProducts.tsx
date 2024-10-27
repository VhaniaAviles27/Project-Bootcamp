import { useState, useEffect } from "react";
import { Product } from "../models/Product";

export const useFilterProducts = (products: Product[]) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const filterBySearch = (searchTerm: string) => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const lowerCaseTerm = searchTerm.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseTerm) ||
          product.description.toLowerCase().includes(lowerCaseTerm)
      );
      setFilteredProducts(filtered);
    }
  };

  const filterByCategory = (category: string) => {
    if (category === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return { filteredProducts, filterBySearch, filterByCategory };
};
