import Title from "../../components/Title/Title";
import "./styleResume.css";
import { Product } from "../../models/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faLocation,
  faLocationDot,
  faMapLocationDot,
  faPhone,
  faTrash,
  faUserPen,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import FooterLayout from "../../layouts/Footer/FooterLayout";
import Input from "../../components/Input/Input";
import { useValidation } from "../../hooks/validation/useValidation";
import { validDistricts } from "../../data/districts";
import HeaderLayout from "../../layouts/Header/HeaderLayout";
import ComboBox from "../../components/ComboBox/ComboBox";
import { useCartContext } from "../../hooks/cart/cartContext";
import { useHandlePay } from "../../hooks/cart/useHandlePay";
import Button from "../../components/Button/Button";

const ResumePage = () => {
  const { state, dispatch } = useCartContext();
  const handleIncrementQuantity = (productId: number) => {
    dispatch({ type: "INCREMENT_QUANTITY", productId });
  };
  const handleDecrementQuantity = (productId: number) => {
    dispatch({ type: "DECREMENT_QUANTITY", productId });
  };
  const handleClearProduct = (productId: number) => {
    dispatch({ type: "CLEAR_PRODUCT", productId });
  };
  const cartCount = state.cart.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );
  const cartPrice = state.cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 0),
    0
  );

  const {
    name,
    handleNameChange,
    lastName,
    handleLastNameChange,
    district,
    handleDistrictChange,
    address,
    handleAddressChange,
    reference,
    handleReferenceChange,
    phone,
    handlePhoneChange,
    error,
  } = useValidation();

  const { handlePay } = useHandlePay();

  const handlePaymentClick = () => {
    const customerData = {
      name,
      lastName,
      district,
      address,
      reference,
      phone,
    };
    handlePay(customerData, error);
  };

  return (
    <div className="resumeContainer">
      <HeaderLayout cartCount={cartCount} cartPrice={cartPrice} />
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

        {state.cart.length > 0 ? (
          state.cart.map((product: Product) => {
            const totalPriceForProduct =
              product.price * (product.quantity || 0);
            return (
              <div key={product.id} className="resumeProducts">
                <img src={product.thumbnail} className="productImage" />
                <h3>{product.title}</h3>
                <h3>$ {product.price}</h3>
                <div className="quantityProduct">
                  <FontAwesomeIcon
                    className="quantityButton"
                    onClick={() => handleDecrementQuantity(product.id)}
                    icon={faCircleMinus}
                    data-testid="decrementQuantity"
                  />
                  <h3>{product.quantity}</h3>
                  <FontAwesomeIcon
                    className="quantityButton"
                    onClick={() => handleIncrementQuantity(product.id)}
                    icon={faCirclePlus}
                    data-testid="incrementQuantity"
                  />
                </div>
                <h3>${totalPriceForProduct.toFixed(2)}</h3>
                <FontAwesomeIcon
                  className="deleteButton"
                  onClick={() => handleClearProduct(product.id)}
                  icon={faTrash}
                  data-testid="clearProduct"
                />
              </div>
            );
          })
        ) : (
          <div>No hay productos en el carrito.</div>
        )}

        <div className="totalPricePay">
          <h3 className="textPay">Total a Pagar = ${cartPrice.toFixed(2)}</h3>
        </div>
      </div>
      <Title title="INFORMACIÓN DE ENVÍO" />
      <div className="informationContent">
        <Input
          type = "text"
          typeData="Nombre"
          icon={faUserPen}
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={handleNameChange}
          errorMessage="Entrada no válida"
          showError={error.name}
        />
        <Input
          type = "text"
          typeData="Apellidos"
          icon={faUserTag}
          placeholder="Ingresa tu apellido"
          value={lastName}
          onChange={handleLastNameChange}
          errorMessage="Entrada no válida"
          showError={error.lastName}
        />
        <ComboBox
          typeData="Distrito"
          options={validDistricts.map((district) => ({
            value: district,
            label: district,
          }))}
          onSelect={handleDistrictChange}
          icon={faLocation}
          selectedValue={district}
          errorMessage="Debe seleccionar un distrito"
          showError={error.district}
        />
        <Input
          type = "text"
          typeData="Dirección"
          icon={faLocationDot}
          placeholder="Ingresa tu dirección"
          value={address}
          onChange={handleAddressChange}
          errorMessage="Ingrese una dirección válida"
          showError={error.address}
        />
        <Input
          type = "text"
          typeData="Referencia"
          icon={faMapLocationDot}
          placeholder="Ingresa una referencia"
          value={reference}
          onChange={handleReferenceChange}
          errorMessage="Ingrese una referencia válida"
          showError={error.reference}
        />
        <Input
          type = "text"
          typeData="Celular"
          icon={faPhone}
          placeholder="Ingresa un número de celular"
          value={phone}
          onChange={handlePhoneChange}
          errorMessage="Ingrese un número de celular válido"
          showError={error.phone}
        />
        <Button
          textButton={"Pagar"}
          onAction={handlePaymentClick}
          testId={"payButton"}
        />
      </div>
      <FooterLayout />
    </div>
  );
};

export default ResumePage;
