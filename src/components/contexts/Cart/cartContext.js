import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      console.log("reducer used");
      return state;
    },
    { cart: ["prod1", "prod2"] }
  );
  const value = { cartState: state, cartDispatch: dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
