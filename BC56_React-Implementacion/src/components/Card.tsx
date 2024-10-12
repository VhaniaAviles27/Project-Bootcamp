import "../styles/styleCard.css";

type CardProps = {
    imageSrc: string;
    title: string;
    name: string;
    stock: number;
    price: number;
    width: number;
    height: number;
};

const Card: React.FC<CardProps> = ({ imageSrc, title, name, stock, price, width, height }) => {
    return (
        <div className="containerCard" style={{ width, height }}>
            <img src={imageSrc} alt={title} className="imageProduct" />
            <div className="detailsProduct">
                <h2 className="nameProduct">{name}</h2>
                <h3 className="stockProduct">Stock: {stock}</h3>
                <h2 className="priceProduct">Price: ${price}</h2>
            </div>
        </div>
    );
};

export default Card;
