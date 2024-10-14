import { useState } from "react";
import "../styles/styleCatalog.css";
import Card from "../components/Card";
import { useFetchProducts } from "../features/functions/CardRenderFunction";
import HeaderLayout from "../layouts/HeaderLayout";
import FooterLayout from "../layouts/FooterLayout";
import Title from "../components/Title";
import { Product } from "../models/Product";
import Search from "../components/Search";
import { useFetchCategories } from "../features/functions/CboRenderFunction";
import Cbo from "../components/Cbo";

const CatalogPage = () => {
  const { products, loading, error, filterBySearch, filterByCategory } = useFetchProducts();
  const { categories, error: categoryError } = useFetchCategories();

  // Estado para manejar el contador del carrito
  const [cartCount, setCartCount] = useState(0);

  // Función para manejar la acción de agregar al carrito
  const handleAddToCart = () => {
    setCartCount(cartCount + 1); // Aumentar el contador en 1
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
      <HeaderLayout cartCount={cartCount} />
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
          />
        ))}
      </div>
      <FooterLayout />
    </div>
  );
};

export default CatalogPage;
