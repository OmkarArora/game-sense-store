export const reducerFn = (state, action) => {
	let _state = null;
	if(action){
		switch(action.type){
			case "ADD_TO_WISHLIST":
				return {...state, wishlist: state.wishlist.concat(action.payload)};
			case "REMOVE_FROM_WISHLIST":
				_state = {...state};
				_state.wishlist = state.wishlist.filter(item => item.id!==action.payload)
				return _state;
			default:
				return state;
		}
	}
	return state;
}