import { useEffect, useState } from "react";
import { Product } from "../models/Product";

export function useCart() {
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product: Product) => {
    const productInCartIndex = cart.findIndex((item) => item.id === product.id);
    if (productInCartIndex >= 0) {
      const newCart = [...cart];
      newCart[productInCartIndex].quantity! += 1;
      setCart(newCart);
    } else {
      setCart((prevState) => [
        ...prevState,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const incrementQuantity = (productId: number) => {
    setCart(cart =>
      cart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity! + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId: number) => {
    setCart(cart =>
      cart.map(item =>
        item.id === productId && item.quantity! > 1
          ? { ...item, quantity: item.quantity! - 1 }
          : item
      )
    );
  };

  const clearProduct = (productId: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const cartPrice = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 0)), 0);

  return {
    cart,
    addProduct,
    incrementQuantity,
    decrementQuantity,
    clearProduct,
    clearCart,
    cartCount,
    cartPrice,
  };
}
