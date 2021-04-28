import { createContext, useContext, useReducer, useEffect } from "react";
import { homeReducer } from "./homeReducer";
import axios from "axios";

const HomeContext = createContext();

export const useHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }) => {
  const [
    { products, appState },
    dispatch,
  ] = useReducer(homeReducer, {
    products: [],
    appState: "success",
  });

  const fetchProducts = async () => {
    try {
      dispatch({ type: "SET_APP_STATE", payload: "loading" });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND}/home`
      );
      if (data.success) {
        data.products.forEach((item) => item.id = item._id);
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

  const value = { products, appState, dispatch };

  return (
    <HomeContext.Provider value={value}>
      {children}
    </HomeContext.Provider>
  );
};
