import { createContext, useContext, useReducer, useEffect } from "react";
import { reducerFn } from "./playstationReducer";
import axios from "axios";

const PlaystationContext = createContext();

export const usePlaystation = () => useContext(PlaystationContext);

export const PlaystationProvider = ({ children }) => {
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
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/playstation`
      );
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

  return (
    <PlaystationContext.Provider value={value}>
      {children}
    </PlaystationContext.Provider>
  );
};
