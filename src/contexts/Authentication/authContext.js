import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import { useNavigate } from "react-router-dom";
// import { fakeAuthApi } from "./fakeAuthApi";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [{ isUserLoggedIn, appState, errorMessage }, dispatch] = useReducer(
    authReducer,
    {
      isUserLoggedIn: false,
      appState: "success",
      errorMessage: "",
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));

    loginStatus?.isUserLoggedIn &&
      dispatch({ type: "LOGIN_USER", payload: true });
  }, []);

  async function loginUserWithCredentials(email, password) {
    try {
      dispatch({ type: "SET_APP_STATE", payload: "loading" });
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/login`,
        {
          email,
          password,
        }
      );
      if (response.data.success) {
        dispatch({ type: "LOGIN_USER" });
        dispatch({ type: "SET_APP_STATE", payload: "success" });
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: "",
        });
        localStorage?.setItem(
          "login",
          JSON.stringify({
            isUserLoggedIn: true,
            userId: response.data.user.id,
            role: response.data.user.role,
            cart: response.data.user.cart,
          })
        );
      }
      return response.data;
    } catch (error) {
      dispatch({ type: "SET_APP_STATE", payload: "error" });
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: error.message,
      });
      return { success: false, error };
    }
  }

  function logoutUser() {
    dispatch({ type: "LOGOUT_USER" });
    localStorage.removeItem("login");
    navigate("/");
  }

  const value = {
    isUserLoggedIn,
    loginUserWithCredentials,
    logoutUser,
    appState,
    errorMessage,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
