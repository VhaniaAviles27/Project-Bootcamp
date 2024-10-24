import Title from "../components/Title/Title";
import "../styles/styleResume.css";
import { Product } from "../models/Product";
import { useCart } from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus, faLocation, faLocationDot, faMapLocationDot, faPhone, faTrash, faUserPen, faUserTag } from "@fortawesome/free-solid-svg-icons";
import FooterLayout from "../layouts/Footer/FooterLayout";
import Input from "../components/Input/Input";
import { useValidation } from "../hooks/useValidation";
import { validDistricts } from '../data/districts';
import HeaderLayout from "../layouts/Header/HeaderLayout";
import ComboBox from "../components/ComboBox/ComboBox";


const ResumePage = () => {

    const { cart, clearProduct, incrementQuantity, decrementQuantity, cartPrice, cartCount } = useCart();
 
    const {
        name, handleNameChange,
        lastName, handleLastNameChange,
        district, handleDistrictChange,
        address, handleAddressChange,
        reference, handleReferenceChange,
        phone, handlePhoneChange,
        error,
        handlePay
    } = useValidation();
    
    return (
        <div className="resumeContainer">
            <HeaderLayout cartCount={cartCount} cartPrice={cartPrice}/>
            <Title title={"RESUME"} />
            <div className="resumeContent">
                <div className="resumeHeader">
                    <h3>Producto</h3>
                    <h3>Nombre</h3>
                    <h3>Precio</h3>
                    <h3>Cantidad</h3>
                    <h3>Total</h3>
                    <h3>Eliminar</h3>
                </div>

                {cart.length > 0 ? (
                    cart.map((product: Product) => {
                        const totalPriceForProduct = product.price * (product.quantity || 0);
                        return (
                            <div key={product.id} className="resumeProducts">
                                <img src={product.thumbnail} className="productImage" />
                                <h3>{product.title}</h3>
                                <h3>$ {product.price}</h3>
                                <div className="quantityProduct">
                                    <FontAwesomeIcon className="quantityButton" onClick={() => decrementQuantity(product.id)} icon={faCircleMinus} />
                                    <h3>{product.quantity}</h3>
                                    <FontAwesomeIcon className="quantityButton" onClick={() => incrementQuantity(product.id)} icon={faCirclePlus} />
                                </div>
                                <h3>${totalPriceForProduct.toFixed(2)}</h3>
                                <FontAwesomeIcon className="deleteButton" onClick={() => clearProduct(product.id)} icon={faTrash} />
                            </div>

                        )

                    })
                ) : (
                    <div>No hay productos en el carrito.</div>
                )}

                <div className="totalPricePay">
                    <h3 className="textPay">
                        Total a Pagar = ${cartPrice.toFixed(2)}
                    </h3>
                </div>

            </div>
            <Title title="INFORMACIÓN DE ENVÍO" />
            <div className="informationContent">
                <Input
                    typeData="Nombre"
                    icon={faUserPen}
                    placeholder="Ingresa tu nombre"
                    value={name}
                    onChange={handleNameChange}
                    errorMessage="Entrada no válida"
                    showError={error.name}             
                />
                <Input
                    typeData="Apellidos"
                    icon={faUserTag}
                    placeholder="Ingresa tu apellido"
                    value={lastName}
                    onChange= {handleLastNameChange}
                    errorMessage="Entrada no válida"
                    showError = {error.lastName}
                />
                <ComboBox 
                    typeData="Distrito"
                    options={validDistricts.map((district) => ({
                        value: district,
                        label: district,
                      }))}
                    onSelect={handleDistrictChange}
                    icon = {faLocation}
                    selectedValue={district}
                    errorMessage="Debe seleccionar un distrito"   
                    showError={error.district}                 
                />
                <Input
                    typeData="Dirección"
                    icon={faLocationDot}
                    placeholder="Ingresa tu dirección"
                    value={address}
                    onChange={handleAddressChange}                    
                    errorMessage="Ingrese una dirección válida"
                    showError = {error.address}
                />
                <Input
                    typeData="Referencia"
                    icon={faMapLocationDot}
                    placeholder="Ingresa una referencia"
                    value={reference}
                    onChange={handleReferenceChange}
                    errorMessage="Ingrese una referencia válida"
                    showError = {error.reference}
                />
                <Input
                    typeData="Celular"
                    icon={faPhone}
                    placeholder="Ingresa un número de celular"
                    value={phone}
                    onChange={handlePhoneChange}
                    errorMessage="Ingrese un número de celular válido"
                    showError = {error.phone}
                />
                <button className="buttonPay" onClick={handlePay}>Pagar</button>
            </div>
            <FooterLayout />
        </div>
    );
}

export default ResumePage;
