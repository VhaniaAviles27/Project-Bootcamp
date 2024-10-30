import Swal from "sweetalert2";

const showAlert = (
  title: string,
  text: string,
  icon: "success" | "error" | "warning" | "info"
) => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: "Cerrar",
  });
};

export const showFieldsRequiredAlert = () => {
  return showAlert("Error", "Todos los campos son obligatorios.", "error");
};

export const showLoginSuccessAlert = () => {
  return showAlert(
    "Inicio de sesión exitoso",
    "Bienvenido/a al sistema.",
    "success"
  );
};

export const showInvalidUsernameAlert = () => {
  return showAlert("Error", "Usuario inválido.", "error");
};

export const showInvalidPasswordAlert = () => {
  return showAlert("Error", "Contraseña inválida.", "error");
};

export const showIncompleteFieldsAlert = () => {
  return showAlert("Error", "Por favor completa todos los campos correctamente.", "error");
};

export const showNetworkErrorAlert = () => {
  return showAlert("Error", "Ha ocurrido un error en la red.", "error");
};

export const showTokenAlert = () => {
  return showAlert("Éxito", "El token de recuperación se ha enviado a su correo.", "success");
};

export const showTokenErrorAlert = () => {
  return showAlert("Error", "Hubo un problema al enviar el correo. Inténtelo de nuevo.", "error");
};




