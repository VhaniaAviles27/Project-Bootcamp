import { renderHook, act } from '@testing-library/react';
import Swal from 'sweetalert2';
import { CustomerData } from '../../../models/CustomerData';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useCartContext } from '../../../hooks/cart/cartContext';
import { useHandlePay } from '../useHandlePay';
import { RoutePaths } from '../../../routes/routesConfig';

jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({}),
}));

jest.mock('../../../hooks/cart/cartContext', () => ({
  useCartContext: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('useHandlePay', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useCartContext as jest.Mock).mockReturnValue({
      state: {
        cart: [
          { id: 1, title: 'Product 1', price: 10, quantity: 1, description: '', category: '', stock: 0, thumbnail: '' },
          { id: 2, title: 'Product 2', price: 20, quantity: 2, description: '', category: '', stock: 0, thumbnail: '' },
        ],
      },
      dispatch: mockDispatch,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show error popup if there are validation errors', async () => {
    const { result } = renderHook(() => useHandlePay());

    const customer: CustomerData = {
      name: 'John',
      lastName: 'Doe',
      district: 'District',
      address: '123 Main St',
      reference: 'Near Park',
      phone: '1234567890',
    };

    const error = { name: true, lastName: false, district: false, address: false, reference: false, phone: false };

    await act(async () => {
      result.current.handlePay(customer, error);
    });

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Error',
      text: 'Por favor completa todos los campos correctamente.',
      icon: 'error',
      confirmButtonText: 'Cerrar',
    });

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should process payment successfully', async () => {
    const { result } = renderHook(() => useHandlePay(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={children} />
          </Routes>
        </MemoryRouter>
      ),
    });

    const customer: CustomerData = {
      name: 'John',
      lastName: 'Doe',
      district: 'District',
      address: '123 Main St',
      reference: 'Near Park',
      phone: '1234567890',
    };

    const error = { name: false, lastName: false, district: false, address: false, reference: false, phone: false };

    await act(async () => {
      result.current.handlePay(customer, error);
    });

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Pedido registrado con éxito!',
      html: expect.stringContaining('<div>Product 1 (x1) = $10.00</div>'),
      icon: 'success',
      confirmButtonText: 'Cerrar',
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CLEAR_CART' });
    expect(mockNavigate).toHaveBeenCalledWith(RoutePaths.HOME);
  });
});