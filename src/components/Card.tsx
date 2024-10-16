import "../styles/styleCard.css";

type CardProps = {
    imageSrc: string;
    name: string;
    stock: number;
    price: number;
    width: number;
    height: number;
    onAddProductToCart: () => void;
};

const Card: React.FC<CardProps> = ({ imageSrc, name, stock, price, width, height, onAddProductToCart }) => {
    const handleTotalCart = () => {
        onAddProductToCart();
    };
    return (
        <div className="containerCard" style={{ width, height }}>
            <img src={imageSrc} className="imageProduct" />
            <div className="detailsProduct">
                <h2 className="nameProduct">{name}</h2>
                <h3 className="stockProduct">Stock: {stock}</h3>
                <h2 className="priceProduct">Price: ${price}</h2>
            </div>
            <button className="addButton" onClick={handleTotalCart}>Agregar</button>
        </div>
    );
};

export default Card;