import {useEffect} from "react";
import {
  Cart,
  Home,
  PlaystationPage,
  XboxPage,
  Wishlist,
  UserProfile,
  ProductDetails,
  Login,
  Signup
} from "./components";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  return (
    <Routes>
      <Route path="/playstation" element={<PlaystationPage />} />
      <Route path="/xbox" element={<XboxPage />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <PrivateRoute path="/wishlist" element={<Wishlist />} />
      <PrivateRoute path="/wishlist" element={<Wishlist />} />
      <PrivateRoute path="/user-profile" element={<UserProfile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AllRoutes;
