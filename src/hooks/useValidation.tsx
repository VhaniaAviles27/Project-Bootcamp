import { useState } from "react";
import { validateInputAddress, validateInputPersonalData, validateInputPhone } from "../utils/validationUtils";

export const useValidation = () => {
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
    setError(prev => ({ ...prev, district: value === "" }));
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

  return {
    name, handleNameChange,
    lastName, handleLastNameChange,
    district, handleDistrictChange,
    address, handleAddressChange,
    reference, handleReferenceChange,
    phone, handlePhoneChange,
    error
  };
};
