import { createContext, useContext, useReducer, useEffect } from "react";
import { wishlistReducer } from "./wishlistReducer";
import axios from "axios";
import { setupAuthHeaderForServiceCalls } from "../axiosMethods";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [{ wishlist, appState }, dispatch] = useReducer(wishlistReducer, {
    wishlist: [],
    appState: "success",
  });
  const value = { wishlist, appState, wishlistDispatch: dispatch };

  useEffect(() => {
    (async () => {
      const loginStatus = JSON.parse(localStorage?.getItem("gSenseLogin"));
      if (loginStatus) {
        const userId = loginStatus.userId;
        setupAuthHeaderForServiceCalls(loginStatus.token);
        try {
          dispatch({ type: "SET_APP_STATE", payload: "loading" });
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND}/users/${userId}/wishlist`
          );
          if (data.success) {
            const fetchedWishlist = data.wishlist;
            dispatch({ type: "SET_WISHLIST", payload: fetchedWishlist });
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
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
