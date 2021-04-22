import axios from "axios";

export const wishlistReducer = (state, action) => {
  let _state = null;
  if (action) {
    switch (action.type) {
      case "ADD_TO_WISHLIST":
        _state = { ...state, wishlist: state.wishlist.concat(action.payload) };
        if (localStorage?.getItem("login")) {
          const userId = JSON.parse(localStorage.getItem("login")).userId;
          const sendWishlistToBackend = _state.wishlist.map((item) => item._id);
          (async () => {
            await axios.post(
              `${process.env.REACT_APP_BACKEND}/users/${userId}`,
              {
                wishlist: sendWishlistToBackend,
              }
            );
          })();
        }
        return _state;
      case "REMOVE_FROM_WISHLIST":
        _state = { ...state };
        _state.wishlist = state.wishlist.filter(
          (item) => item.id !== action.payload
        );
        if (localStorage?.getItem("login")) {
          const userId = JSON.parse(localStorage.getItem("login")).userId;
          const sendWishlistToBackend = _state.wishlist.map((item) => item._id);
          (async () => {
            await axios.post(
              `${process.env.REACT_APP_BACKEND}/users/${userId}`,
              {
                wishlist: sendWishlistToBackend,
              }
            );
          })();
        }
        return _state;
      case "SET_WISHLIST":
        _state =  { wishlist: action.payload };
        _state.wishlist.forEach(item => item.id = item._id);
        return _state;
      default:
        return state;
    }
  }
  return state;
};
