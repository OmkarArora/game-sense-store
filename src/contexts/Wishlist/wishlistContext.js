import {createContext, useContext, useReducer} from "react";
import {reducerFn} from "./wishlistReducer";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({children}) =>{
	const [{wishlist}, dispatch] = useReducer(reducerFn, {wishlist: []});
	const value = {wishlist, wishlistDispatch: dispatch};
	return(
		<WishlistContext.Provider value={value}>
			{children}
		</WishlistContext.Provider>
	)
}