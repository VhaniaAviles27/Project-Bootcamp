import { useState } from "react";
import "../styles/styleCatalog.css";
import Card from "../components/Card/Card";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { useFetchCategories } from "../hooks/useFetchCategories";
import HeaderLayout from "../layouts/Header/HeaderLayout";
import FooterLayout from "../layouts/Footer/FooterLayout";
import Title from "../components/Title/Title";
import { Product } from "../models/Product";
import Search from "../components/Search/Search";
import Carousel from "../components/Carousel/Carousel";
import { useCart } from "../hooks/useCart";
import ComboBox from "../components/ComboBox/ComboBox";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const CatalogPage = () => {
  const { products, loading, error, filterBySearch, filterByCategory } = useFetchProducts();
  const { categories, error: categoryError } = useFetchCategories();
  const { addProduct, cartCount, cartPrice } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleProductAddToCart = (product: Product) => {
    addProduct(product);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    filterByCategory(category)
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (categoryError) {
    return <div>Error: {categoryError}</div>;
  }

  return (
    <div className="catalogContainer">
      <HeaderLayout cartCount={cartCount} cartPrice={cartPrice} />
      <Carousel />
      <Title title={"PRODUCTOS"} />
      <div className="catalogContent">
        <div className="orderContainer">
          <Search onSearch={filterBySearch} />
          <ComboBox
            options={categories.map((category) => ({
              value: category.slug,
              label: category.name,
            }))}
            icon = {faDatabase}
            onSelect={handleCategorySelect} 
            selectedValue={selectedCategory} 
          />
        </div>

        <div className="productContainer">
          {products.map((product: Product) => (
            <Card
              key={product.id}
              imageSrc={product.thumbnail}
              name={product.title}
              stock={product.stock}
              price={product.price}
              width={200}
              height={300}
              onAddProductToCart={() => handleProductAddToCart(product)}
            />
          ))}
        </div>
      </div>
      <FooterLayout />
    </div>
  );
};

export default CatalogPage;
