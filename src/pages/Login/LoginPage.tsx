import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import Button from "../../components/Button/Button";
import "./styleLogin.css";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routes/routesConfig";
import { useState } from "react";
import { useHandleAuth } from "../../hooks/auth/useHandleAuth";
import useHandlePassword from "../../hooks/auth/useHandleForgotPassword";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { handleAuth } = useHandleAuth();
  const { passwordError, handleForgotPassword } = useHandlePassword();
  const navigate = useNavigate();

  const handleLogin = async (path: string) => {
    const isAuthenticated = await handleAuth(username, password);
    if (isAuthenticated) {
      navigate(path);
    }
  };

  return (
    <div className="loginContainer">
      <Title data-testid = "login" title="INICIO DE SESIÓN" />
      <Input
        type ="text"
        typeData="Usuario"
        icon={faUser}
        placeholder="Ingresa su usuario"
        value={username}
        onChange={setUsername}
        errorMessage="Campo obligatorio"
        showError={username === ""}
      />
      <Input
        type = "password"
        typeData="Contraseña"
        icon={faLock}
        placeholder="Ingresa su contraseña"
        value={password}
        onChange={setPassword}
        errorMessage="Contraseña Incorrecta"
        showError={passwordError}
      />
      <Button
        textButton="Inicie Sesión"
        testId="loginButton"
        onAction={() => handleLogin(RoutePaths.HOME)}
      />
      <h1 className="textForgot" onClick={handleForgotPassword} data-testid = "forgot">
        ¿Olvidó su contraseña?
      </h1>
    </div>
  );
};

export default LoginPage;
