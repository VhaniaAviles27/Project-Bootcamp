import { useState, useEffect } from "react";

export const useFetchProducts = () => {
    const [products, setProducts] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message || "Error fetching products");
                setLoading(false);
            });
    }, []);

    return { products, loading, error };
};

