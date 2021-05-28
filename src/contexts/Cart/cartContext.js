import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "./cartReducer";
import axios from "axios";
import { setupAuthHeaderForServiceCalls } from "../axiosMethods";

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
      const loginStatus = JSON.parse(localStorage.getItem("gSenseLogin"));
      if (loginStatus) {
        const userId = loginStatus.userId;
        setupAuthHeaderForServiceCalls(loginStatus.token);
        try {
          dispatch({ type: "SET_APP_STATE", payload: "loading" });
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND}/users/${userId}/cart`
          );
          if (data.success) {
            const fetchedCart = data.cart;
            const normalisedCart = fetchedCart.map((item) => ({
              ...item.product,
              quantity: item.quantity,
              id: item.product._id,
            }));
            dispatch({ type: "SET_CART", payload: normalisedCart });
            dispatch({ type: "SET_APP_STATE", payload: "success" });
          } else {
            dispatch({ type: "SET_APP_STATE", payload: "error" });
          }
        } catch (error) {
          dispatch({ type: "SET_APP_STATE", payload: "error" });
        }
      } else {
        if (localStorage?.getItem("noUserCart")) {
          dispatch({
            type: "SET_CART",
            payload: JSON.parse(localStorage.getItem("noUserCart")),
          });
        }
      }
    })();
  }, [dispatch]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
