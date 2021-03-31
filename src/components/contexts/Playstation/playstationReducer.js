export const reducerFn = (state, action) => {
	// NOTE: getting action undefined without using if()
	if(action){
		switch (action.type){
			case "SET_RATING_FILTER":
				return {...state, ratingFilter: action.payload}
			case "SET_PRICE_FILTER":
				return {...state, priceFilter: action.payload}
			default:
				return state;
		}
	}
	return state;
}