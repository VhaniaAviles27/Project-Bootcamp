import { useState } from "react";
import "../styles/styleCatalog.css";
import Card from "../components/Card/Card";
import HeaderLayout from "../layouts/Header/HeaderLayout";
import FooterLayout from "../layouts/Footer/FooterLayout";
import Title from "../components/Title/Title";
import Search from "../components/Search/Search";
import Carousel from "../components/Carousel/Carousel";
import ComboBox from "../components/ComboBox/ComboBox";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { useCartContext } from "../hooks/cartContext";
import { CATEGORIES_URL, PRODUCTS_URL } from "../utils/apiEndpoints";
import { useFetchData } from "../hooks/useFetchData";
import { useFilterProducts } from "../hooks/useFilterProducts";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

const CatalogPage = () => {
  const { data: products, loading, error } = useFetchData<Product>(PRODUCTS_URL);
  const { data: categories } = useFetchData<Category>(CATEGORIES_URL);
  const { filterBySearch, filterByCategory, filteredProducts } = useFilterProducts(products);

  const [selectedCategory, setSelectedCategory] = useState("");

  const { state, dispatch } = useCartContext();
  const cartCount = state.cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const cartPrice = state.cart.reduce((acc, item) => acc + (item.price * (item.quantity || 0)), 0);
  
  const handleAddProduct = (product: Product) => {
    dispatch({ type: "ADD_PRODUCT", product });
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


  return (
    <div className="catalogContainer">
      <HeaderLayout cartCount={cartCount} cartPrice={cartPrice} />
      <Carousel />
      <Title title={"PRODUCTOS"} />
      <div className="catalogContent">
        <div className="orderContainer">
          <Search onSearch={filterBySearch} data-testid = "search" />
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
          {filteredProducts.map((product: Product) => (
            <Card
              key={product.id}
              imageSrc={product.thumbnail}
              name={product.title}
              stock={product.stock}
              price={product.price}
              width={200}
              height={300}
              onAddProductToCart={() => handleAddProduct(product)}
            />
          ))}
        </div>
      </div>
      <FooterLayout />
    </div>
  );
};

export default CatalogPage;
