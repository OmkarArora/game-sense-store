import axios from "axios";

export const wishlistReducer = (state, action) => {
  let _state = null;
  if (action) {
    switch (action.type) {
      case "ADD_TO_WISHLIST":
        if(!state.wishlist.find(item => item.id===action.payload.id)){
          _state = { ...state, wishlist: state.wishlist.concat(action.payload) };
          if (localStorage?.getItem("gSenseLogin")) {
            const userId = JSON.parse(localStorage.getItem("gSenseLogin")).userId;
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
        }
        return state;
      case "REMOVE_FROM_WISHLIST":
        _state = { ...state };
        _state.wishlist = state.wishlist.filter(
          (item) => item.id !== action.payload
        );
        if (localStorage?.getItem("gSenseLogin")) {
          const userId = JSON.parse(localStorage.getItem("gSenseLogin")).userId;
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
        _state =  { ...state, wishlist: action.payload };
        _state.wishlist.forEach(item => item.id = item._id);
        return _state;
      case "SET_APP_STATE":
        return { ...state, appState: action.payload };
      default:
        return state;
    }
  }
  return state;
};
