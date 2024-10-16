import { useCart } from "./useCart"
import { useValidateDistrict } from './district';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    })

    const validateInputPersonalData = (value: string) => {
        const noNumbers = /^[^0-9]*$/; 
        return value.length >= 3 && noNumbers.test(value);
    };

    const validateInputAddress = (value: string) => {
        return value.length >= 10;
    };

    const validateInputPhone = (value: string) => {
        const onlyNumbers = /^[0-9]+$/; 
        return value.length === 9 && onlyNumbers.test(value);
    };

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
        }
        setError(newError)
        const hasError = Object.values(newError).some(error => error === true);
        if(!hasError) {
            const orderData = {
                customer: {
                    name,
                    lastName,
                    district,
                    address,
                    reference,
                    phone,
                },
                cart,
            }
            alert(`Pedido registrado exitosamente: ${JSON.stringify(orderData, null, 2)}`);
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
    }

    return {
        name, handleNameChange,
        lastName, handleLastNameChange,
        district, handleDistrictChange,
        address, handleAddressChange,
        reference, handleReferenceChange,
        phone, handlePhoneChange,
        error,
        handlePay
    }

}