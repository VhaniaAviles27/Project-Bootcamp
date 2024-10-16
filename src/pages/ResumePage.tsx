import Title from "../components/Title";
import "../styles/styleResume.css";
import { Product } from "../models/Product";
import { useCart } from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus, faLocation, faLocationDot, faMapLocationDot, faPhone, faTrash, faUserPen, faUserTag } from "@fortawesome/free-solid-svg-icons";
import FooterLayout from "../layouts/FooterLayout";
import Input from "../components/Input";
import { validDistricts } from "../data/districts";
import { useValidateDistrict } from "../hooks/district";

const ResumePage = () => {

    const { cart, clearProductCart, incrementQuantity, decrementQuantity, cartPrice } = useCart();
    const { validateDistrict } = useValidateDistrict();

    const validateInputPersonalData = (value: string) => {
        return value.length >= 3;
    };

    const validateInputAddress = (value: string) => {
        return value.length >= 15;
    }

    return (
        <div className="resumeContainer">
            <Title title={"RESUME"} />
            <div className="resumeContent">
                <div className="resumeHeader">
                    <text>Producto</text>
                    <text>Nombre</text>
                    <text>Precio</text>
                    <text>Cantidad</text>
                    <text>Total</text>
                    <text>Eliminar</text>
                </div>

                {cart.length > 0 ? (
                    cart.map((product: Product) => {
                        const totalPriceForProduct = product.price * (product.quantity || 0);
                        return (
                            <div key={product.id} className="resumeProducts">
                                <img src={product.thumbnail} className="productImage" />
                                <text>{product.title}</text>
                                <text>$ {product.price}</text>
                                <div className="quantityProduct">
                                    <FontAwesomeIcon className="quantityButton" onClick={() => decrementQuantity(product.id)} icon={faCircleMinus} />
                                    <text>{product.quantity}</text>
                                    <FontAwesomeIcon className="quantityButton" onClick={() => incrementQuantity(product.id)} icon={faCirclePlus} />
                                </div>
                                <text>${totalPriceForProduct.toFixed(2)}</text>
                                <FontAwesomeIcon className="deleteButton" onClick={() => clearProductCart(product.id)} icon={faTrash} />
                            </div>

                        )

                    })
                ) : (
                    <div>No hay productos en el carrito.</div>
                )}

                <div className="totalPricePay">
                    <text className="textPay">
                        Total a Pagar = ${cartPrice.toFixed(2)}
                    </text>
                </div>

            </div>
            <Title title="INFORMACIÓN DE ENVÍO" />
            <div className="informationContent">
                <Input
                    typeData="Nombre"
                    icon={faUserPen}
                    placeholder="Ingresa tu nombre"
                    validate={validateInputPersonalData}
                    errorMessage="Entrada no válido"
                />
                <Input
                    typeData="Apellidos"
                    icon={faUserTag}
                    placeholder="Ingresa tu apellido"
                    validate={validateInputPersonalData}
                    errorMessage="Entrada no válida"
                />
                <Input
                    typeData="Distrito"
                    icon={faLocation}
                    placeholder="Ingresa tu distrito"
                    validate={validateDistrict}
                    options={validDistricts}
                    errorMessage="Seleccione un distrito"
                />
                <Input
                    typeData="Dirección"
                    icon={faLocationDot}
                    placeholder="Ingresa tu dirección"
                    validate={validateInputAddress}
                    errorMessage="Ingrese una dirección válida"
                />
                <Input
                    typeData="Referencia"
                    icon={faMapLocationDot}
                    placeholder="Ingresa una referencia"
                    validate={validateInputPersonalData}
                    errorMessage="Ingrese una referencia válida"
                />
                <Input
                    typeData="Celular"
                    icon={faPhone}
                    placeholder="Ingresa un número de celular"
                    validate={validateInputPersonalData}
                    errorMessage="Ingrese un número de celular válido"
                />
                <button className="buttonPay">Pagar</button>
            </div>
           
            
             
            <FooterLayout />

        </div>

    );
}

export default ResumePage;
