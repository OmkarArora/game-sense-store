export const ordersReducer = (state, action) => {
  if (action) {
    switch (action.type) {
      case "SET_ORDERS":
        return {...state, orders: action.payload.orders};
      case "SET_APP_STATE":
        return { ...state, appState: action.payload };
      default:
        return state;
    }
  }
  return state;
};
