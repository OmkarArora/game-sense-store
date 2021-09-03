import { useEffect } from "react";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useWindowSize } from "../../hooks";
import {
  useNavPhone,
  useAuth,
  useCart,
  useWishlist,
  useOrders,
} from "../../contexts";
import "./userProfile.css";
import { OrderCard } from "./OrderCard/OrderCard";

export const UserProfile = () => {
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();
  const { isUserLoggedIn, logoutUser } = useAuth();
  const { cartDispatch } = useCart();
  const { wishlistDispatch } = useWishlist();
  const { orders, appState } = useOrders();
  useEffect(() => setNavPhoneVisibility(false), [setNavPhoneVisibility]);

  const logoutHandler = () => {
    if (localStorage?.getItem("noUserCart")) {
      cartDispatch({
        type: "SET_CART",
        payload: JSON.parse(localStorage.getItem("noUserCart")),
      });
    } else {
      cartDispatch({ type: "SET_CART", payload: [] });
    }
    wishlistDispatch({ type: "SET_WISHLIST", payload: [] });
    logoutUser();
  };

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="discover" />}
      <Header active="" />
      <div className="container-userProfile">
        Profile
        <br />
        {isUserLoggedIn && <button onClick={logoutHandler}>Log out</button>}
        <div>
          <h2>Your Orders</h2>
          {appState !== "loading" && orders && orders.length === 0 && (
            <div className="no-orders-text">You haven't made any orders</div>
          )}
          {appState === "loading" && "Loading..."}
          <div className="container-orders">
            {orders &&
              orders.length > 0 &&
              orders.map((order) => <OrderCard key={order._id} {...order} />)}
          </div>
        </div>
      </div>
    </div>
  );
};
