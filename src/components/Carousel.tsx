import "../styles/styleCarousel.css";

type CardProps = {
    imageSrc: string;
    name: string;
    stock: number;
    price: number;
    width: number;
    height: number;
    onAddToCart: () => void;
    onTotalPrice: () => void;
};

const Carousel: React.FC<CardProps> = ({ imageSrc, name, stock, price, width, height, onAddToCart, onTotalPrice }) => {
    const handleTotalCart = () => {
        onAddToCart();
        onTotalPrice();
    };
    return (
        <div className="containerCard" style={{ width, height }}>
            <img src={imageSrc} className="imageProduct" />
            <div className="detailsProduct">
                <h2 className="nameProduct">{name}</h2>
                <h3 className="stockProduct">Stock: {stock}</h3>
                <h2 className="priceProduct">Price: ${price}</h2>
            </div>
            <button onClick={handleTotalCart}>Agregar</button>
        </div>
    );
};

export default Carousel;