import "../styles/styleCatalog.css";
import Card from "../components/Card";
import { useFetchProducts } from "../features/functions/CardRenderFunction";
import HeaderLayout from "../layouts/HeaderLayout";
import FooterLayout from "../layouts/FooterLayout";
import Title from "../components/Title";
import { Product } from "../models/Product";
import Search from "../components/Search";

const CatalogPage = () => {
  const { products, loading, error, filterBySearch } = useFetchProducts();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="catalogContainer">
      <HeaderLayout />
      <Title title={"PRODUCTOS"} />
      <div className="orderContainer">
        <Search onSearch={filterBySearch} />
        
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
          />
        ))}
      </div>
      <FooterLayout />
    </div>
  );
};

export default CatalogPage;
