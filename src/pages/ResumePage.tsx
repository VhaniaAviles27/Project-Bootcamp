import Title from "../components/Title";
import "../styles/styleResume.css";
import { Product } from "../models/Product";
import { useCart } from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const ResumePage = () => {

    const { cart, clearProductCart, incrementQuantity, decrementQuantity } = useCart();

    return (
        <div className="resumeContainer">
            <Title title={"RESUME"} />

            <div className="resumeHeader">
                <text>Producto</text>
                <text>Nombre</text>
                <text>Cantidad</text>
                <text>Eliminar</text>
            </div>
            {cart.length > 0 ? (
                cart.map((product: Product) => (
                    <div key={product.id} className="resumeProducts">
                        <img src={product.thumbnail} className="productImage" />
                        <text>{product.title}</text>
                        <div className="quantityProduct">
                            <FontAwesomeIcon className="deleteButton" onClick={() => decrementQuantity(product.id)} icon={faCircleMinus} />
                            <text>{product.quantity}</text>
                            <FontAwesomeIcon className="deleteButton" onClick={() => incrementQuantity(product.id)} icon={faCirclePlus} />
                        </div>
                        <FontAwesomeIcon className="deleteButton" onClick={() => clearProductCart(product.id)} icon={faTrash} />
                    </div>
                ))
            ) : (
                <div>No hay productos en el carrito.</div>
            )}
        </div>

    );
}

export default ResumePage;
