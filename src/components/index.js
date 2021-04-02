export { Home } from "./Home/Home";
export { PlaystationPage } from "./PlaystationPage/PlaystationPage";
export { XboxPage } from "./XboxPage/XboxPage";
export { Wishlist } from "./Wishlist/Wishlist";
export { Cart } from "./Cart/Cart";
export { CartProvider, useCart } from "./contexts/Cart/cartContext";
export {
  WishlistProvider,
  useWishlist,
} from "./contexts/Wishlist/wishlistContext";
export {
  PlaystationProvider,
  usePlaystation,
} from "./contexts/Playstation/playstationContext";
export { useNavPhone, NavPhoneProvider } from "./contexts/navPhoneContext";
