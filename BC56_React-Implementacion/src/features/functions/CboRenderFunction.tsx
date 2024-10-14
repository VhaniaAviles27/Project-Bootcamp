import { useState, useEffect } from "react";
import { Category } from "../../models/Category";

export const useFetchCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch((err: Error) => {
                setError(err.message || "Error fetching categories");
            });
    }, []); 

    return { categories, error };
};
