import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from '../../hooks/cartContext'; // Ajusta la ruta si es necesario
import { Product } from '../../models/Product';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 10,
  category: 'Test Category',
  quantity: 1,
  description: '',
  stock: 0,
  thumbnail: ''
};

describe('CartContext', () => {
  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  it('should add a product to the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'ADD_PRODUCT', product: mockProduct });
    });

    expect(result.current.state.cart).toHaveLength(1);
    expect(result.current.state.cart[0]).toEqual({ ...mockProduct, quantity: 1 });
  });

  it('should increment product quantity in the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'ADD_PRODUCT', product: mockProduct });
      result.current.dispatch({ type: 'INCREMENT_QUANTITY', productId: mockProduct.id });
    });

    expect(result.current.state.cart[0].quantity).toBe(2);
  });

  it('should decrement product quantity in the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'ADD_PRODUCT', product: mockProduct });
      result.current.dispatch({ type: 'INCREMENT_QUANTITY', productId: mockProduct.id });
      result.current.dispatch({ type: 'DECREMENT_QUANTITY', productId: mockProduct.id });
    });

    expect(result.current.state.cart[0].quantity).toBe(1);
  });

  it('should remove a product from the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'ADD_PRODUCT', product: mockProduct });
      result.current.dispatch({ type: 'CLEAR_PRODUCT', productId: mockProduct.id });
    });

    expect(result.current.state.cart).toHaveLength(0);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });

    act(() => {
      result.current.dispatch({ type: 'ADD_PRODUCT', product: mockProduct });
      result.current.dispatch({ type: 'CLEAR_CART' });
    });

    expect(result.current.state.cart).toHaveLength(0);
  });
});
