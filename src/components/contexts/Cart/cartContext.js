import { createContext, useContext, useReducer } from "react";
import { reducerFn } from "./cartReducer";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFn, { cart: [] });
  const value = { cartState: state, cartDispatch: dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
