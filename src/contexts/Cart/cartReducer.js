import axios from "axios";

export const cartReducer = (state, action) => {
  let _state = null;

  // NOTE: getting action undefined without using if()
  if (action) {
    switch (action.type) {
      case "ADD_TO_CART":
        _state = { ...state, cart: state.cart.concat(action.payload) };
        if (localStorage?.getItem("login")) {
          const userId = JSON.parse(localStorage.getItem("login")).userId;
          const sendCartToBackend = _state.cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          }));
          (async () => {
            await axios.post(
              `${process.env.REACT_APP_BACKEND}/users/${userId}`,
              {
                cart: sendCartToBackend,
              }
            );
          })();
        }
        return _state;
      case "REMOVE_FROM_CART":
        _state = { ...state };
        _state.cart = state.cart.filter((item) => item.id !== action.payload);
        if (localStorage?.getItem("login")) {
          const userId = JSON.parse(localStorage.getItem("login")).userId;
          const sendCartToBackend = _state.cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          }));
          (async () => {
            await axios.post(
              `${process.env.REACT_APP_BACKEND}/users/${userId}`,
              {
                cart: sendCartToBackend,
              }
            );
          })();
        }
        return _state;
      case "SET_CART":
        const cart = action.payload;
        const normalisedCart = cart.map((item) => ({
          ...item.product,
          quantity: item.quantity,
          id: item.product._id,
        }));
        return { cart: normalisedCart };
      default:
        return state;
    }
  }
  return state;
};
