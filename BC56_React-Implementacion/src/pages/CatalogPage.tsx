import "../styles/styleCatalog.css";
import Card from "../components/Card";
import { useFetchProducts } from "../features/functions/CardRenderFunction";
import HeaderLayout from "../layouts/HeaderLayout";

const CatalogPage = () => {
  const { products, loading, error } = useFetchProducts();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error:{error}</div>;
  }
  return (
    <div className="catalogContainer">
      <HeaderLayout />
      <div className="productContainer">
      {products.map((product: any) => (
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
      
    </div>
  );
};

export default CatalogPage;
