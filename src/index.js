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
  HomeProvider,
  OrdersProvider,
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
                <HomeProvider>
                  <PlaystationProvider>
                    <XboxProvider>
                      <OrdersProvider>
                        <AllRoutes />
                      </OrdersProvider>
                    </XboxProvider>
                  </PlaystationProvider>
                </HomeProvider>
              </AlertProvider>
            </WishlistProvider>
          </CartProvider>
        </NavPhoneProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
