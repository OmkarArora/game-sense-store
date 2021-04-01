import { createContext, useContext, useReducer } from "react";
import { reducerFn } from "./xboxReducer";
import { data } from "./mockData";

const XboxContext = createContext();

export const useXbox = () => useContext(XboxContext);

export const XboxProvider = ({ children }) => {
  const [
    { products, ratingFilter, priceFilter },
    dispatch,
  ] = useReducer(reducerFn, {
    products: data,
    ratingFilter: null,
    priceFilter: null,
  });
  const value = { products, ratingFilter, priceFilter, dispatch };
  return <XboxContext.Provider value={value}>{children}</XboxContext.Provider>;
};
