import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styleCard.css";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

type CardProps = {
  imageSrc: string;
  name: string;
  stock: number;
  price: number;
  width: number;
  height: number;
  onAddProductToCart: () => void;
};

const Card: React.FC<CardProps> = ({
  imageSrc,
  name,
  stock,
  price,
  width,
  height,
  onAddProductToCart,
}) => {
  
  return (
    <div className="containerCard" style={{ width, height }}>
      <img src={imageSrc} className="imageProduct" />
      <div className="detailsProduct">
        <button className="addButton" onClick={onAddProductToCart}>
          <FontAwesomeIcon className="iconCart" icon={faShoppingCart} />
          Add to cart
        </button>
        <h2 className="nameProduct">{name}</h2>
        <h3 className="stockProduct">Stock: {stock}</h3>
        <h2 className="priceProduct">Price: ${price}</h2>
      </div>
    </div>
  );
};

export default Card;
