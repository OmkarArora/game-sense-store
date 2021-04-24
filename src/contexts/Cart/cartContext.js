import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "./cartReducer";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [{ cart, appState }, dispatch] = useReducer(cartReducer, {
    cart: [],
    appState: "success",
  });
  const value = { cart, appState, cartDispatch: dispatch };

  useEffect(() => {
    (async () => {
      if (localStorage?.getItem("login")) {
        const userId = JSON.parse(localStorage.getItem("login")).userId;
        try {
          dispatch({ type: "SET_APP_STATE", payload: "loading" });
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND}/users/${userId}/cart`
          );
          if (data.success) {
            const fetchedCart = data.cart;
            dispatch({ type: "SET_CART", payload: fetchedCart });
            dispatch({ type: "SET_APP_STATE", payload: "success" });
          } else {
            dispatch({ type: "SET_APP_STATE", payload: "error" });
          }
        } catch (error) {
          dispatch({ type: "SET_APP_STATE", payload: "error" });
        }
      }
    })();
  }, [dispatch]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
