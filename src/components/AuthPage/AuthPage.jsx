import axios from "axios";
import { useEffect } from "react";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useWindowSize } from "../../hooks";
import { useNavPhone, useAuth, useAlert, useCart } from "../../contexts";
import { useLocation, useNavigate } from "react-router-dom";
import "./authPage.css";
import { Login } from "./Login/Login";
import { LoadingState } from "../LoadingState/LoadingState";

export const AuthPage = () => {
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();
  const { cartDispatch } = useCart();

  useEffect(() => setNavPhoneVisibility(false), [setNavPhoneVisibility]);

  const { state } = useLocation();

  const navigate = useNavigate();

  const {
    isUserLoggedIn,
    loginUserWithCredentials,
    logoutUser,
    appState,
  } = useAuth();

  const { setSnackbar } = useAlert();

  useEffect(() => {
    if (isUserLoggedIn) {
      if (state && state.from) {
        navigate(state.from);
      } else navigate("/");
    }
  }, [isUserLoggedIn, navigate, state]);

  const loginHandler = async (email, password) => {
    const msg = await loginUserWithCredentials(email, password);
    if (!msg.success) {
      setSnackbar({
        openStatus: true,
        type: "error",
        data: msg.errorMessage,
      });
    } else {
      // fetch cart
      (async () => {
        const userId = msg.user.id;
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_BACKEND}/users/${userId}/cart`
          );
          if (data.success) {
            const fetchedCart = data.cart;
            cartDispatch({ type: "SET_CART", payload: fetchedCart });
          }
        } catch (error) {
          cartDispatch({ type: "SET_APP_STATE", payload: "error" });
        }
      })();

      setSnackbar({
        openStatus: true,
        type: "success",
        data: "Signed in successfully",
      });
    }
  };
  const logoutHandler = () => {
    if(localStorage?.getItem("noUserCart")){
      cartDispatch({ type: "SET_CART", payload: JSON.parse(localStorage.getItem("noUserCart")) });
    }else{
      cartDispatch({ type: "SET_CART", payload: [] });
    }
    logoutUser();
  };

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="discover" />}
      <Header active="" />
      <div className="container-authPage">
        Auth page
        <br />
        {isUserLoggedIn ? (
          <button onClick={logoutHandler}>Log out</button>
        ) : (
          <>
            <Login
              loginHandler={(email, password) => loginHandler(email, password)}
            />
            {appState === "loading" && <LoadingState />}
          </>
        )}
      </div>
    </div>
  );
};
