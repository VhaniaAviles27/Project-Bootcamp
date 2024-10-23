import { useCart } from "./useCart";
import { useValidateDistrict } from './useDistrict';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validateInputPersonalData, validateInputAddress, validateInputPhone } from "../utils/validationUtils";

export const useValidation = () => {
  const { cart, clearCart } = useCart();
  const { validateDistrict } = useValidateDistrict();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({
    name: false,
    lastName: false,
    district: false,
    address: false,
    reference: false,
    phone: false
  });

  const handleNameChange = (value: string) => {
    setName(value);
    setError(prev => ({ ...prev, name: !validateInputPersonalData(value) }));
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
    setError(prev => ({ ...prev, lastName: !validateInputPersonalData(value) }));
  };

  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setError(prev => ({ ...prev, district: !validateDistrict(value) }));
  };

  const handleAddressChange = (value: string) => {
    setAddress(value);
    setError(prev => ({ ...prev, address: !validateInputAddress(value) }));
  };

  const handleReferenceChange = (value: string) => {
    setReference(value);
    setError(prev => ({ ...prev, reference: !validateInputAddress(value) }));
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setError(prev => ({ ...prev, phone: !validateInputPhone(value) }));
  };

  const handlePay = () => {
    const newError = {
      name: !validateInputPersonalData(name),
      lastName: !validateInputPersonalData(lastName),
      district: !validateDistrict(district),
      address: !validateInputAddress(address),
      reference: !validateInputAddress(reference),
      phone: !validateInputPhone(phone),
    };
    setError(newError);
    const hasError = Object.values(newError).some(error => error);
    if (!hasError) {
      const orderData = {
        customer: { name, lastName, district, address, reference, phone },
        cart,
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

      console.log("Datos del carrito:", orderData);
      setName("");
      setLastName("");
      setDistrict("");
      setAddress("");
      setReference("");
      setPhone("");
      clearCart();
      navigate("/");
    }
  };

  return {
    name, handleNameChange,
    lastName, handleLastNameChange,
    district, handleDistrictChange,
    address, handleAddressChange,
    reference, handleReferenceChange,
    phone, handlePhoneChange,
    error,
    handlePay
  };
};
