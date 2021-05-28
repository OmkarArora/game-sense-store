import {
  Cart,
  Home,
  PlaystationPage,
  XboxPage,
  Wishlist,
  UserProfile,
  ProductDetails,
  Login
} from "./components";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
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
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default AllRoutes;
