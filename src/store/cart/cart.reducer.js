import {CART_ACTION_TYPES} from './cart.types';

// This is the initial state of each variable in cart.
export const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: []
};

// The cart reducer takes the state (i.e. all the cart's variables) an an action (i.e. what is dispatched), then updates the state's variable(s) with the action's payload depending on the action's type.
// Gives state the default value of INITIAL_STATE for the first time this executes, and an empty object in case there is no action.
export const cartReducer = (state = INITIAL_STATE, action = {}) => {
	const {type, payload} = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				cartItems: payload
			};

		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload
			};

		default:
			return state; // If the type does not exist, it means the action was dispatched for another reducer.
	}
};
