import { createContext, useContext, useReducer, useEffect } from "react";
import { ordersReducer } from "./ordersReducer";
import { setupAuthHeaderForServiceCalls } from "../axiosMethods";
import axios from "axios";

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
  const [{ orders, appState }, dispatch] = useReducer(ordersReducer, {
    orders: [],
    appState: "success",
  });
  const value = { orders, appState, ordersDispatch: dispatch };

  useEffect(() => {
    (async () => {
      const loginStatus = JSON.parse(localStorage?.getItem("gSenseLogin"));
      if (loginStatus) {
        const userId = loginStatus.userId;
        if(loginStatus.token){
          setupAuthHeaderForServiceCalls(loginStatus.token);
        }
        try {
          dispatch({ type: "SET_APP_STATE", payload: "loading" });
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND}/users/${userId}/orders`
          );
          if (data.success) {
            const fetchedOrders = data.orders;
            dispatch({ type: "SET_ORDERS", payload: {orders: fetchedOrders} });
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
  return (
    <OrdersContext.Provider value={value}>
      {children}
    </OrdersContext.Provider>
  );
};
