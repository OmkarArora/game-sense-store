import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, PlaystationPage, PlaystationProvider, Wishlist, WishlistProvider, XboxPage } from "./components";
import { CartProvider } from "./components";
import { XboxProvider } from "./components/contexts/Xbox/xboxContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <WishlistProvider>
        <Switch>
          <Route path="/playstation">
            <PlaystationProvider>
              <PlaystationPage />
            </PlaystationProvider>
          </Route>
          <Route path="/xbox">
            <XboxProvider>
              <XboxPage />
            </XboxProvider>
          </Route>
          <Route path="/wishlist">
              <Wishlist />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        </WishlistProvider>
      </CartProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
