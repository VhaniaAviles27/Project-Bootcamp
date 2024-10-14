import { useState, useEffect } from "react";

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCategories(data); // Almacena la respuesta directa
      })
      .catch((err: Error) => {
        setError(err.message || "Error fetching categories");
      });
  }, []); // Ejecutar solo una vez al montar

  return { categories, error };
};
