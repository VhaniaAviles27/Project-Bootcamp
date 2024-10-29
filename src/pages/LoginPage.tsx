import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Input/Input";
import Title from "../components/Title/Title";
import Button from "../components/Button/Button";
import "../styles/styleLogin.css";
import { useNavigate } from "react-router-dom";
import { useHandleAuth } from '../hooks/usehandleAuth';
import { useValidation } from "../hooks/useValidation";


const LoginPage = () => {
  const { user, handleUserChange, password, handlePasswordChange, error } = useValidation();
  const { handleAuth } = useHandleAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const isAuthenticated = await handleAuth(user, password);
    if (isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <div className="loginContainer">
      <Title title="INICIO DE SESIÓN" />
      <Input
        typeData="Usuario"
        icon={faUser}
        placeholder="Ingresa su usuario"
        value={user}
        onChange={handleUserChange}
        errorMessage="Entrada no válida"
        showError={error.user}
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
        aditionalText="¿Olvidó su contraseña?"
        testId="loginButton"
        onAction={handleLogin}
      />
    </div>
  );
};

export default LoginPage;
