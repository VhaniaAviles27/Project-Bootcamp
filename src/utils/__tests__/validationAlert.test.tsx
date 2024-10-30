import Swal from 'sweetalert2';
import {
  showFieldsRequiredAlert,
  showLoginSuccessAlert,
  showInvalidUsernameAlert,
  showInvalidPasswordAlert,
  showIncompleteFieldsAlert,
  showNetworkErrorAlert,
} from '../validationAlert';

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}));

describe('Validation Alerts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should show "Todos los campos son obligatorios." error alert', () => {
    showFieldsRequiredAlert();

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error',
      text: 'Todos los campos son obligatorios.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  });

  test('should show "Bienvenido/a al sistema." success alert', () => {
    showLoginSuccessAlert();

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Inicio de sesión exitoso',
      text: 'Bienvenido/a al sistema.',
      icon: 'success',
      confirmButtonText: 'Cerrar',
    });
  });

  test('should show "Usuario inválido." error alert', () => {
    showInvalidUsernameAlert();

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error',
      text: 'Usuario inválido.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  });

  test('should show "Contraseña inválida." error alert', () => {
    showInvalidPasswordAlert();

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error',
      text: 'Contraseña inválida.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  });

  test('should show "Por favor completa todos los campos correctamente." error alert', () => {
    showIncompleteFieldsAlert();

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error',
      text: 'Por favor completa todos los campos correctamente.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  });

  test('should show "Ha ocurrido un error en la red." error alert', () => {
    showNetworkErrorAlert();

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error',
      text: 'Ha ocurrido un error en la red.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });
  });
});
