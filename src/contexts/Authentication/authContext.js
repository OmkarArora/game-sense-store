import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "./authReducer";
import { useNavigate } from "react-router-dom";
import { fakeAuthApi } from "./fakeAuthApi";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [{ isUserLoggedIn }, dispatch] = useReducer(authReducer, {
    isUserLoggedIn: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = JSON.parse(localStorage?.getItem("login"));

    loginStatus?.isUserLoggedIn &&
      dispatch({ type: "LOGIN_USER", payload: true });
  }, []);

  async function loginUserWithCredentials(username, password) {
    try {
      const response = await fakeAuthApi(username, password);
      if (response.success) {
        dispatch({ type: "LOGIN_USER"});
        localStorage?.setItem(
          "login",
          JSON.stringify({ isUserLoggedIn: true })
        );
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  function logoutUser() {
    dispatch({ type: "LOGOUT_USER"});
    localStorage.removeItem("login");
    navigate("/");
  }

  const value = { isUserLoggedIn, loginUserWithCredentials, logoutUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
