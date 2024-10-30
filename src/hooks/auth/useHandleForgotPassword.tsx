import { useState } from "react";
import Swal from "sweetalert2";
import { showTokenAlert, showTokenErrorAlert } from "../../utils/validationAlert";

const useHandlePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordError(!event.target.value);
  };

  const handleForgotPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Ingrese su correo electrónico",
      input: "email",
      inputPlaceholder: "Ingrese su correo electrónico",
      showCancelButton: true,
    });

    if (email) {
      console.log("Correo ingresado: ", email);
      const tokenEnviado = true;

      if (tokenEnviado) {
        showTokenAlert();
      } else {
        showTokenErrorAlert();
      }
    }
  };

  return {
    password,
    handlePasswordChange,
    passwordError,
    handleForgotPassword
  };
};

export default useHandlePassword;
