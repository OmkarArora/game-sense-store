export const playstationReducer = (state, action) => {
  // NOTE: getting action undefined without using if()
  if (action) {
    switch (action.type) {
      case "SET_RATING_FILTER":
        return { ...state, ratingFilter: action.payload };
      case "SET_PRICE_FILTER":
        return { ...state, priceFilter: action.payload };
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
