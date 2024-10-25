import React, { createContext, ReactNode, useContext, useReducer, useEffect } from "react";
import { Product } from "../models/Product";

type CartState = {
  cart: Product[];
};

type CartAction =
  | { type: "ADD_PRODUCT"; product: Product }
  | { type: "INCREMENT_QUANTITY"; productId: number }
  | { type: "DECREMENT_QUANTITY"; productId: number }
  | { type: "CLEAR_PRODUCT"; productId: number }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const productInCartIndex = state.cart.findIndex((item) => item.id === action.product.id);
      if (productInCartIndex >= 0) {
        const newCart = [...state.cart];
        newCart[productInCartIndex].quantity! += 1;
        return { cart: newCart };
      } else {
        return { cart: [...state.cart, { ...action.product, quantity: 1 }] };
      }
    case "INCREMENT_QUANTITY":
      return {
        cart: state.cart.map(item =>
          item.id === action.productId ? { ...item, quantity: item.quantity! + 1 } : item
        )
      };
    case "DECREMENT_QUANTITY":
      return {
        cart: state.cart.map(item =>
          item.id === action.productId && item.quantity! > 1
            ? { ...item, quantity: item.quantity! - 1 }
            : item
        )
      };
    case "CLEAR_PRODUCT":
      return {
        cart: state.cart.filter(item => item.id !== action.productId)
      };
    case "CLEAR_CART":
      return { cart: [] };
    default:
      return state;
  }
};

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: JSON.parse(localStorage.getItem('cart') || '[]') });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

