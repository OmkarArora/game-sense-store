import { useEffect } from "react";
import { Header } from "../Header/Header";
import { NavPhone } from "../NavPhone/NavPhone";
import { useWindowSize } from "../../hooks";
import { useNavPhone, useAuth, useAlert } from "../../contexts";
import { useLocation, useNavigate } from "react-router-dom";
import "./authPage.css";
import { Login } from "./Login/Login";
import { LoadingState } from "../LoadingState/LoadingState";

export const AuthPage = () => {
  const screenWidth = useWindowSize().width;
  const { navPhoneVisible, setNavPhoneVisibility } = useNavPhone();

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
    }
    else{
      setSnackbar({
        openStatus: true,
        type: "success",
        data: "Signed in successfully",
      });
    }
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
