import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "./cartReducer";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [{ cart }, dispatch] = useReducer(cartReducer, { cart: [] });
  const value = { cart, cartDispatch: dispatch };

  useEffect(() => {
    (async () => {
      if (localStorage?.getItem("login")) {
        const userId = JSON.parse(localStorage.getItem("login")).userId;
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/users/${userId}/cart`
        );
        const fetchedCart = response.data.cart;
        dispatch({ type: "SET_CART", payload: fetchedCart });
      }
    })();
  }, [dispatch]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
