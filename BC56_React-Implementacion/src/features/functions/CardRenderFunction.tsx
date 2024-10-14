import { useState, useEffect } from "react";
import { Product } from "../../models/Product";

export const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch('https://dummyjson.com/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setFilteredProducts(data.products); 
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message || "Error fetching products");
                setLoading(false);
            });
    }, []);

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

    return { products: filteredProducts, loading, error, filterBySearch, filterByCategory }; // Asegúrate de devolver filterByCategory
};
