import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  AlertProvider,
  AuthProvider,
  NavPhoneProvider,
  PlaystationProvider,
  WishlistProvider,
  XboxProvider,
  CartProvider,
} from "./contexts";
import AllRoutes from "./AllRoutes";
import "./index.css";

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
                    <AllRoutes />
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
