import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, PlaystationPage, PlaystationProvider } from "./components";
import { CartProvider } from "./components";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <Switch>
          <Route path="/playstation">
            <PlaystationProvider>
              <PlaystationPage />
            </PlaystationProvider>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </CartProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
