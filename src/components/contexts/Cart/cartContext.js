import { createContext, useContext, useReducer } from "react";
import { reducerFn } from "./cartReducer";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [{cart}, dispatch] = useReducer(reducerFn, { cart: [] });
  const value = { cart, cartDispatch: dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
