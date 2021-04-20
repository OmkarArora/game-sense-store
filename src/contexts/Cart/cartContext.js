import { createContext, useContext, useReducer } from "react";
import { cartReducer } from "./cartReducer";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [{ cart }, dispatch] = useReducer(cartReducer, { cart: [] });
  const value = { cart, cartDispatch: dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
