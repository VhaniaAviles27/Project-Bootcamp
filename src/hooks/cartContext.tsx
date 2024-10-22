import { createContext, ReactNode } from "react";
import { useCart } from "./useCart";

type CartContextType = ReturnType<typeof useCart>;

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();

  return (
    <CartContext.Provider value={cart}>
      {children}
    </CartContext.Provider>
  );
}
