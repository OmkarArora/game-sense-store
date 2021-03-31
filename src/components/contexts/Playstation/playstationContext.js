import { createContext, useContext, useReducer } from "react";
import {reducerFn} from "./playstationReducer";
import { data } from "./mockData";

const PlaystationContext = createContext();

export const usePlaystation = () => useContext(PlaystationContext);

export const PlaystationProvider = ({ children }) => {
  const [{products, ratingFilter, priceFilter}, dispatch] = useReducer(reducerFn, {products: data, ratingFilter: null, priceFilter: null})
  const value = { products, ratingFilter, priceFilter, dispatch };
  return (
    <PlaystationContext.Provider value={value}>
      {children}
    </PlaystationContext.Provider>
  );
};
