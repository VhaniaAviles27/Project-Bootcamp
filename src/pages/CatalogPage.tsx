import { useState } from "react";
import "../styles/styleCatalog.css";
import Card from "../components/Card";
import { useFetchProducts } from "../features/functions/CardRenderFunction";
import { useFetchCategories } from "../features/functions/CboRenderFunction";
import HeaderLayout from "../layouts/HeaderLayout";
import FooterLayout from "../layouts/FooterLayout";
import Title from "../components/Title";
import { Product } from "../models/Product";
import Search from "../components/Search";
import Cbo from "../components/Cbo";
import Carousel from "../components/Carousel";

const CatalogPage = () => {
  const { products, loading, error, filterBySearch, filterByCategory } = useFetchProducts();
  const { categories, error: categoryError } = useFetchCategories();
  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  const handleAddToCart = () => {
    setCartCount(cartCount + 1); 
  };

  const handleTotalPrice = (price: number) => {
    setCartPrice(cartPrice + price)
  }

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
      <Carousel/>
      <Title title={"PRODUCTOS"} />
      <div className="orderContainer">
        <Search onSearch={filterBySearch} />
        <Cbo 
          selectedCategory="" 
          onCategorySelect={filterByCategory}
          categories={categories}
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
            onAddToCart={handleAddToCart}  
            onTotalPrice={() => handleTotalPrice(product.price)}
          />
        ))}
      </div>
      <FooterLayout />
    </div>
  );
};

export default CatalogPage;