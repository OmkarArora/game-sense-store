import { useEffect } from "react";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useWindowSize } from "../../hooks";
import { useNavPhone, useAuth } from "../../contexts";
import { useLocation, useNavigate } from "react-router-dom";
import "./authPage.css";

export const AuthPage = () => {
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();

  useEffect(() => setNavPhoneVisibility(false), [setNavPhoneVisibility]);

  const { state } = useLocation();

  const navigate = useNavigate();
  const { isUserLoggedIn, loginUserWithCredentials, logoutUser } = useAuth();

  useEffect(() => {
    if (isUserLoggedIn) {
      if (state && state.from) {
        navigate(state.from);
      } else navigate("/");
    }
  }, [isUserLoggedIn, navigate, state]);

  const loginHandler = () => {
    loginUserWithCredentials("admin", "admin");
  };

  return (
    <div className="container-app">
      {screenWidth < 768 && navPhoneVisible && <NavPhone active="discover" />}
      <Header active="" />
      <div className="container-authPage">
        Auth page
        <br />
        {isUserLoggedIn ? (
          <button onClick={() => logoutUser()}>Log out</button>
        ) : (
          <button onClick={loginHandler}>Log in</button>
        )}
      </div>
    </div>
  );
};
