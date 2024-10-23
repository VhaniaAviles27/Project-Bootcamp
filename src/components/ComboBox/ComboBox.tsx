import React from "react";
import { Category } from "../../models/Category";
import "./styleComboBox.css";

type ComboBoxProps = {
  categories: Category[];
  onCategorySelect: (selectedCategory: string) => void;
  selectedCategory: string;
};

const ComboBox: React.FC<ComboBoxProps> = ({
  categories,
  onCategorySelect,
  selectedCategory,
}) => {
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onCategorySelect(event.target.value);
  };

  return (
    <select
      className="principalCbo"
      value={selectedCategory}
      onChange={handleCategoryChange}
    >
      <option value="">-- Selecciona una categoría --</option>
      {categories.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default ComboBox;
