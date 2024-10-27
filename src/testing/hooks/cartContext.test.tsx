import { ReactNode } from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCartContext } from '../../hooks/cartContext'; 
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

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  
  it('should add a product to the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'ADD_PRODUCT', product: mockProduct });
      result.current.dispatch({ type: 'ADD_PRODUCT', product: mockProduct });
    });
    expect(result.current.state.cart).toHaveLength(1);
    expect(result.current.state.cart[0].quantity).toBe(2);
  });

  it('should increment product quantity in the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      result.current.dispatch({ type: "INCREMENT_QUANTITY", productId: mockProduct.id });
    });
    expect(result.current.state.cart).toHaveLength(1);
    expect(result.current.state.cart[0].quantity).toBe(3);
  });
  });

  it('should decrement product quantity in the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'DECREMENT_QUANTITY', productId: mockProduct.id });
    });
    expect(result.current.state.cart).toHaveLength(1);
    expect(result.current.state.cart[0].quantity).toBe(2);
  });

  it('should remove a product from the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'CLEAR_PRODUCT', productId: mockProduct.id });
    });
    expect(result.current.state.cart).toHaveLength(0);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'CLEAR_CART' });
    });
    expect(result.current.state.cart).toHaveLength(0);
  });

  it('should throw error if useCartContext is used outside CartProvider', () => {
    try {
      renderHook(() => useCartContext());
    } catch (e) {
      expect(e).toEqual(new Error("useCartContext must be used within a CartProvider"));
    }
  });

  it('should return the current state when action type is not recognized', () => {
    const { result } = renderHook(() => useCartContext(), { wrapper });
    act(() => {
      result.current.dispatch({ type: 'UNKNOWN_ACTION' as any });
    });
    expect(result.current.state.cart).toEqual([]);
  });

