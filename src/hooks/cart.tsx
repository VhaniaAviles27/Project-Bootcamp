import { createContext, ReactNode, useState } from "react";
import { Product } from "../models/Product";

type CartContextType = {
  cart: Product[];
  addProductCart: (product: Product) => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  clearProductCart: (productId: number) => void;
  cartCount: number;
  cartPrice: number;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>([]);

  const addProductCart = (product: Product) => {
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
        item.id === productId? { ...item, quantity: item.quantity! + 1} : item
      )
    )
  }

  const decrementQuantity = (productId: number) => {
    setCart(cart => 
      cart.map(item =>
        item.id === productId && item.quantity! > 1 
        ? { ...item, quantity: item.quantity! - 1} 
        : item
      )
    )
  }

  const clearProductCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0)
  const cartPrice = cart.reduce((acc, item) => acc + (item.price*(item.quantity || 0)), 0)
  
  const clearCart = () => {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addProductCart, 
      clearProductCart, 
      incrementQuantity, 
      decrementQuantity,
      cartCount,
      cartPrice,
      clearCart,     
      }}>
      {children}
    </CartContext.Provider>
  );
}
