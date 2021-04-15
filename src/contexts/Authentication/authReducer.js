export const authReducer = (state, action) => {
  // let _state = null;
  if (action) {
    switch (action.type) {
      case "LOGIN_USER":
        return { ...state, isUserLoggedIn: true };
      case "LOGOUT_USER":
        return { ...state, isUserLoggedIn: false };
      case "SET_APP_STATE":
        return { ...state, appState: action.payload };
      case "SET_ERROR_MESSAGE":
        return { ...state, errorMessage: action.payload };
      default:
        return state;
    }
  }
  return state;
};
