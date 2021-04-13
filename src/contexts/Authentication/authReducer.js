export const authReducer = (state, action) => {
	// let _state = null;
	if (action) {
	  switch (action.type) {
		case "LOGIN_USER":
		  return {...state, isUserLoggedIn: true};
		case "LOGOUT_USER":
		  return {...state, isUserLoggedIn: false};
		default:
		  return state;
	  }
	}
	return state;
  };
  