import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../ProfilePage'; 
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('../../../layouts/Footer/FooterLayout', () => () => <div>FooterLayout Mock</div>);
jest.mock('../../../layouts/Header/HeaderLayout', () => () => <div>HeaderLayout Mock</div>);
jest.mock('../../../components/Title/Title', () => () => <div>Title Mock</div>);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ProfilePage Component', () => {
  const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    gender: 'male',
    username: 'johndoe',
    email: 'john.doe@example.com',
    image: 'profile.jpg',
  };

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(mockUser));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should display user data when user is present', () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('(male)')).toBeInTheDocument();
    expect(screen.getByText('User: johndoe')).toBeInTheDocument();
    expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
  });

  test('should display loading message when user data is not present', () => {
    localStorage.removeItem('user');

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Cargando datos del usuario...')).toBeInTheDocument();
  });

  test('should navigate to login page on logout', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText('Cerrar Sesión');
    fireEvent.click(logoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
