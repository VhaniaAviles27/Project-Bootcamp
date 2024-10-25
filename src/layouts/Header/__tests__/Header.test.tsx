import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HeaderLayout from '../HeaderLayout';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../../components/Icon/Icon', () => (props: any) => (
  <div onClick={props.onNavigate} data-testid={props.icon.iconName}>
    IconMock
  </div>
));

describe('HeaderLayout Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('should render the logo image', () => {
    renderWithRouter(<HeaderLayout cartCount={2} cartPrice={50.0} />);

    const logoImage = screen.getByRole('img', { name: /logo/i });
    expect(logoImage).toBeInTheDocument();
  });

  test('should display the cart count and price', () => {
    renderWithRouter(<HeaderLayout cartCount={2} cartPrice={50.0} />);

    const cartCount = screen.getByText('2');
    const cartPrice = screen.getByText('| Pay: $50.00');

    expect(cartCount).toBeInTheDocument();
    expect(cartPrice).toBeInTheDocument();
  });

  test('should navigate to home when home icon is clicked', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    renderWithRouter(<HeaderLayout cartCount={2} cartPrice={50.0} />);

    fireEvent.click(screen.getByTestId('home'));

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('should navigate to profile when user icon is clicked', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    renderWithRouter(<HeaderLayout cartCount={2} cartPrice={50.0} />);

    fireEvent.click(screen.getByTestId('user'));

    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  test('should navigate to resume when cart icon is clicked', () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

    renderWithRouter(<HeaderLayout cartCount={2} cartPrice={50.0} />);

    fireEvent.click(screen.getByTestId('shopping-cart'));

    expect(mockNavigate).toHaveBeenCalledWith('/resume');
  });
});
