import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HeaderLayout from '../HeaderLayout';
import { MemoryRouter } from 'react-router-dom';
import { RoutePaths } from '../../../routes/routesConfig';

jest.mock("../../../components/Icon/Icon", () => (props: any) => (
  <div onClick={props.onNavigate} data-testid={props["data-testid"]}>
    IconMock
  </div>
));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('HeaderLayout Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  afterEach(() => {
    mockNavigate.mockClear();
  });

  test('should render the logo image', () => {
    renderWithRouter(<HeaderLayout cartCount={2} cartPrice={50.0} />);
    const logoImage = screen.getByRole('img')
    expect(logoImage).toBeInTheDocument();
  });

  test('should display the cart count and price', () => {
    renderWithRouter(<HeaderLayout cartCount={2} cartPrice={50.0} />);
    const cartCount = screen.getByText('2');
    const cartPrice = screen.getByText('| Pay: $50.00');
    expect(cartCount).toBeInTheDocument();
    expect(cartPrice).toBeInTheDocument();
  });

  test("should navigate to home when home icon is clicked", () => {
    renderWithRouter(<HeaderLayout cartCount={2} cartPrice={50.0} />);
    fireEvent.click(screen.getByTestId("navHome"));
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.HOME);
  });

  test("should navigate to resume when cart icon is clicked", () => {
    renderWithRouter(<HeaderLayout cartCount={2} cartPrice={50.0} />);
    fireEvent.click(screen.getByTestId("navResume"));
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.RESUME);
  });
});
