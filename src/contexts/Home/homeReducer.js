export const homeReducer = (state, action) => {
	if (action) {
	  switch (action.type) {
		case "SET_APP_STATE":
		  return { ...state, appState: action.payload };
		case "SET_PRODUCTS":
		  return { ...state, products: action.payload };
		default:
		  return state;
	  }
	}
	return state;
  };
  