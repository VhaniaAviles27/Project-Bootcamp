import React from 'react';
import { Category } from "../models/Category"; 
import "../styles/styleCbo.css"

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
        <select className = "principalCbo" value={selectedCategory} onChange={handleCategoryChange}>
            <option  value="">-- Selecciona una categoría --</option>
            {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                    {category.name}
                </option>
            ))}
        </select>
    );
};

export default Cbo;