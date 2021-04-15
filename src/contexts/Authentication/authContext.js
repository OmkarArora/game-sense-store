import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import { useNavigate } from "react-router-dom";
import { fakeAuthApi } from "./fakeAuthApi";

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

  async function loginUserWithCredentials(username, password) {
    try {
      dispatch({ type: "SET_APP_STATE", payload: "loading" });
      const response = await fakeAuthApi(username, password);
      if (response.success) {
        dispatch({ type: "LOGIN_USER" });
        dispatch({ type: "SET_APP_STATE", payload: "success" });
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: "",
        });
        localStorage?.setItem(
          "login",
          JSON.stringify({ isUserLoggedIn: true })
        );
        return { success: true };
      }
    } catch (error) {
      dispatch({ type: "SET_APP_STATE", payload: "error" });
      dispatch({
        type: "SET_ERROR_MESSAGE",
        payload: error.errorMessage,
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
