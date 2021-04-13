import { createContext, useContext, useReducer, useEffect } from "react";
import { reducerFn } from "./xboxReducer";
import axios from "axios";

const XboxContext = createContext();

export const useXbox = () => useContext(XboxContext);

export const XboxProvider = ({ children }) => {
  const [
    { products, ratingFilter, priceFilter, appState },
    dispatch,
  ] = useReducer(reducerFn, {
    products: [],
    ratingFilter: null,
    priceFilter: null,
    appState: "success",
  });

  const fetchProducts = async () => {
    try {
      dispatch({ type: "SET_APP_STATE", payload: "loading" });
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND}/xbox`);
      if (data.success) {
        dispatch({ type: "SET_APP_STATE", payload: "success" });
        dispatch({ type: "SET_PRODUCTS", payload: data.products });
      } else {
        dispatch({ type: "SET_APP_STATE", payload: "error" });
      }
    } catch (error) {
      dispatch({ type: "SET_APP_STATE", payload: "error" });
    }
  };

  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [products]);

  const value = { products, ratingFilter, priceFilter, appState, dispatch };

  return <XboxContext.Provider value={value}>{children}</XboxContext.Provider>;
};
