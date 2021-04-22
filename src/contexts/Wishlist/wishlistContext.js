import { createContext, useContext, useReducer, useEffect } from "react";
import { wishlistReducer } from "./wishlistReducer";
import axios from "axios";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [{ wishlist }, dispatch] = useReducer(wishlistReducer, {
    wishlist: [],
  });
  const value = { wishlist, wishlistDispatch: dispatch };

  useEffect(() => {
    (async () => {
      if (localStorage?.getItem("login")) {
        const userId = JSON.parse(localStorage.getItem("login")).userId;
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/users/${userId}/wishlist`
        );
        const fetchedWishlist = response.data.wishlist;
        dispatch({ type: "SET_WISHLIST", payload: fetchedWishlist });
      }
    })();
  }, [dispatch]);
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
