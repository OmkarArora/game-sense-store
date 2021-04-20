export const wishlistReducer = (state, action) => {
  let _state = null;
  if (action) {
    switch (action.type) {
      case "ADD_TO_WISHLIST":
        if (!state.wishlist.find((item) => item.id === action.payload.id))
          return { ...state, wishlist: state.wishlist.concat(action.payload) };
        return state;
      case "REMOVE_FROM_WISHLIST":
        _state = { ...state };
        _state.wishlist = state.wishlist.filter(
          (item) => item.id !== action.payload
        );
        return _state;
      default:
        return state;
    }
  }
  return state;
};
