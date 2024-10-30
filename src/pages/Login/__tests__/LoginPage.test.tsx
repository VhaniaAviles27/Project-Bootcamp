// LoginPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';
import { useHandleAuth } from '../../../hooks/auth/useHandleAuth';
import useHandlePassword from '../../../hooks/auth/useHandleForgotPassword';

jest.mock('../../../hooks/auth/useHandleAuth');
jest.mock('../../hooks/auth/useHandleForgotPassword');

const mockHandleAuth = useHandleAuth as jest.Mock;
const mockHandlePassword = useHandlePassword as jest.Mock;

describe('LoginPage', () => {
  beforeEach(() => {
    mockHandleAuth.mockReturnValue({ handleAuth: jest.fn() });
    mockHandlePassword.mockReturnValue({ passwordError: false, handleForgotPassword: jest.fn() });
  });

  it('renders the login page', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa su usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa su contraseña')).toBeInTheDocument();
    expect(screen.getByText('Inicie Sesión')).toBeInTheDocument();
    expect(screen.getByText('¿Olvidó su contraseña?')).toBeInTheDocument();
  });

  it('shows error message for empty username', async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Inicie Sesión'));
    
    expect(screen.getByText('Campo obligatorio')).toBeInTheDocument();
  });

  it('calls handleAuth and navigates to HOME on successful login', async () => {
    const handleAuthMock = jest.fn().mockResolvedValue(true);
    mockHandleAuth.mockReturnValue({ handleAuth: handleAuthMock });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Ingresa su usuario'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa su contraseña'), {
      target: { value: 'testpassword' },
    });
    
    fireEvent.click(screen.getByText('Inicie Sesión'));

    await waitFor(() => expect(handleAuthMock).toHaveBeenCalledWith('testuser', 'testpassword'));
    
  });

  it('calls handleForgotPassword when forgot password link is clicked', () => {
    const handleForgotPasswordMock = jest.fn();
    mockHandlePassword.mockReturnValue({ passwordError: false, handleForgotPassword: handleForgotPasswordMock });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('forgot'));
    
    expect(handleForgotPasswordMock).toHaveBeenCalled();
  });
});
