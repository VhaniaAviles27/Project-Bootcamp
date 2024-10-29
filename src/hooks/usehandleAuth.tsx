import { USER_URL } from '../utils/apiEndpoints';
import Swal from 'sweetalert2';

export const useHandleAuth = () => {
  const handleAuth = async (username: string, password: string): Promise<boolean> => {
    if (username === '' || password === '') {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      return false;
    }

    const login = async (username: string, password: string): Promise<any> => {
      const response = await fetch(USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      return data;
    };

    try {
      const data = await login(username, password);

      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data));
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          text: 'Bienvenido/a al sistema',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        return true;
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña inválidos.',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        });
        return false;
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error en la red.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
      });
      console.error('Error:', error);
      return false;
    }
  };

  return { handleAuth };
};
