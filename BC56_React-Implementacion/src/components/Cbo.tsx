import React from 'react';
import { Category } from "../models/Category"; 

type CboProps = {
    categories: Category[]; 
    onCategorySelect: (selectedCategory: string) => void; 
    selectedCategory: string; 
};

const Cbo: React.FC<CboProps> = ({ categories, onCategorySelect, selectedCategory }) => {
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onCategorySelect(event.target.value);
    };

    return (
        <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">-- Selecciona una opción --</option>
            {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                    {category.name}
                </option>
            ))}
        </select>
    );
};

export default Cbo;