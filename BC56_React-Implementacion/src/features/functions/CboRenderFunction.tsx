import { useState, useEffect } from "react";

export const useFetchCategories = () => {
    const[categories, setCategories] = useState<string[]>([]);
    const[error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://dummyjson.com/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data.Categories);
            })
            .catch((err: Error) => {
                setError(err.message || "Error fetching categories");
            })
    })

    return {categories, error};
};