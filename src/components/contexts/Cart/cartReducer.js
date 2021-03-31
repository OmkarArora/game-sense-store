export const reducerFn = (state, action) => {
	let _state = null;
	switch(action.type){
		case "ADD_TO_CART":
			return {...state, cart: state.cart.concat(action.payload)};
		case "REMOVE_FROM_CART":
			_state = state.filter(item => item.id!==action.payload)
			return _state;
		default:
			return state;
	}
}