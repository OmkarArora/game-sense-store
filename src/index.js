import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AlertProvider,
  Cart,
  Home,
  NavPhoneProvider,
  PlaystationPage,
  PlaystationProvider,
  Wishlist,
  WishlistProvider,
  XboxPage,
} from "./components";
import { CartProvider } from "./components";
import { XboxProvider } from "./components/contexts/Xbox/xboxContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavPhoneProvider>
        <CartProvider>
          <WishlistProvider>
            <AlertProvider>
              <PlaystationProvider>
                <XboxProvider>
                  <Switch>
                    <Route path="/playstation">
                      <PlaystationPage />
                    </Route>
                    <Route path="/xbox">
                      <XboxPage />
                    </Route>
                    <Route path="/wishlist">
                      <Wishlist />
                    </Route>
                    <Route path="/cart">
                      <Cart />
                    </Route>
                    <Route path="/">
                      <Home />
                    </Route>
                  </Switch>
                </XboxProvider>
              </PlaystationProvider>
            </AlertProvider>
          </WishlistProvider>
        </CartProvider>
      </NavPhoneProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
