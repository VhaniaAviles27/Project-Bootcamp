import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Input/Input";
import Title from "../components/Title/Title";
import Button from "../components/Button/Button";
import "../styles/styleLogin.css";
import { useNavigate } from "react-router-dom";
import { useHandleAuth } from '../hooks/usehandleAuth';
import { useValidation } from "../hooks/useValidation";
import { RoutePaths } from "../routes/routesConfig";
import Swal from "sweetalert2";
import { User } from "../models/User";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { username, handleUserChange, password, handlePasswordChange, error } = useValidation();
  const [  , setUser ] = useState<User | null>(null);
  const { handleAuth } = useHandleAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData) as User);
    }
  }, []);

  const handleLogin = async (path:string) => {
    const isAuthenticated = await handleAuth(username, password);
    if (isAuthenticated) {
      navigate(path);
    }
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
      // Simulación de envío de correo
      const tokenEnviado = true; // Simular que el token se envió correctamente

      if (tokenEnviado) {
        await Swal.fire({
          title: "Éxito",
          text: "El token de recuperación se ha enviado a su correo.",
          icon: "success",
          confirmButtonText: "Cerrar",
        });
      } else {
        await Swal.fire({
          title: "Error",
          text: "Hubo un problema al enviar el correo. Inténtelo de nuevo.",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      }
    }
  };
  return (
    <div className="loginContainer">
      <Title title="INICIO DE SESIÓN" />
      <Input
        typeData="Usuario"
        icon={faUser}
        placeholder="Ingresa su usuario"
        value={username}
        onChange={handleUserChange}
        errorMessage="Entrada no válida"
        showError={error.username}
      />
      <Input
        typeData="Contraseña"
        icon={faLock}
        placeholder="Ingresa su contraseña"
        value={password}
        onChange={handlePasswordChange}
        errorMessage="Entrada no válida"
        showError={error.password}
      />
      <Button
        textButton="Inicie Sesión"
        testId="loginButton"
        onAction={()=>handleLogin(RoutePaths.HOME)}
      />
      <h1 onClick={handleForgotPassword}>
        ¿Olvidó su contraseña?
      </h1>

    </div>
  );
};

export default LoginPage;
