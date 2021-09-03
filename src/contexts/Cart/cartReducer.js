import axios from "axios";

export const cartReducer = (state, action) => {
  let _state = null;

  // NOTE: getting action undefined without using if()
  if (action) {
    switch (action.type) {
      case "ADD_TO_CART":
        _state = { ...state, cart: state.cart.concat(action.payload) };
        if (localStorage?.getItem("gSenseLogin")) {
          const userId = JSON.parse(localStorage.getItem("gSenseLogin")).userId;
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
        }else{
          if(localStorage){
            localStorage.setItem("noUserCart", JSON.stringify(_state.cart));
          }
        }
        return _state;
      case "REMOVE_FROM_CART":
        _state = { ...state };
        _state.cart = state.cart.filter((item) => item.id !== action.payload);
        if (localStorage?.getItem("gSenseLogin")) {
          const userId = JSON.parse(localStorage.getItem("gSenseLogin")).userId;
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
        else{
          if(localStorage){
            localStorage.setItem("noUserCart", JSON.stringify(_state.cart));
          }
        }
        return _state;
      case "SET_CART":
        return { ...state, cart: action.payload };
      case "RESET_CART":
        return {...state, cart: []};
      case "SET_APP_STATE":
        return { ...state, appState: action.payload };
      default:
        return state;
    }
  }
  return state;
};
