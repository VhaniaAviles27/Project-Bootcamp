import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCartContext } from "./cartContext";
import { CustomerData } from "../models/CustomerData";

export const useHandlePay = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCartContext();

  const handlePay = (customer: CustomerData, error: { [key: string]: boolean }) => {

    if (Object.values(error).some(err => err)) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor completa todos los campos correctamente.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
      return; 
    }

    const orderData = {
      customer,
      cart: state.cart,
    };

    const cartItems = orderData.cart.map(item => {
      const totalPrice = (item.price * (item.quantity || 0)).toFixed(2);
      return `<div>${item.title} (x${item.quantity}) = $${totalPrice}</div>`;
    }).join("");

    const message = `
      <strong>Datos de envío:</strong><br>
      Cliente: ${orderData.customer.name} ${orderData.customer.lastName}<br>
      Distrito: ${orderData.customer.district}<br>
      Dirección: ${orderData.customer.address}<br>
      Referencia: ${orderData.customer.reference}<br>
      Celular: ${orderData.customer.phone}<br><br>
      <strong>Productos:</strong><br>${cartItems}
    `;

    Swal.fire({
      title: 'Pedido registrado con éxito!',
      html: message,
      icon: 'success',
      confirmButtonText: "Cerrar"
    });

    dispatch({ type: "CLEAR_CART" });
    navigate("/");
  };

  return { handlePay };
};
