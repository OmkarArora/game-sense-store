import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Cart,
  Home,
  PlaystationPage,
  XboxPage,
  Wishlist,
  AuthPage,
  UserProfile,
} from "./components";
import {
  AlertProvider,
  AuthProvider,
  NavPhoneProvider,
  PlaystationProvider,
  WishlistProvider,
} from "./contexts";
import { CartProvider } from "./contexts";
import { XboxProvider } from "./contexts";
import "./index.css";
import { PrivateRoute } from "./PrivateRoute";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NavPhoneProvider>
          <CartProvider>
            <WishlistProvider>
              <AlertProvider>
                <PlaystationProvider>
                  <XboxProvider>
                    <Routes>
                      <Route
                        path="/playstation"
                        element={<PlaystationPage />}
                      />
                      <Route path="/xbox" element={<XboxPage />} />
                      <PrivateRoute path="/wishlist" element={<Wishlist />} />
                      <PrivateRoute path="/wishlist" element={<Wishlist />} />
                      <PrivateRoute path="/user-profile" element={<UserProfile />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/login" element={<AuthPage />} />
                      <Route path="/" element={<Home />} />
                    </Routes>
                  </XboxProvider>
                </PlaystationProvider>
              </AlertProvider>
            </WishlistProvider>
          </CartProvider>
        </NavPhoneProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
