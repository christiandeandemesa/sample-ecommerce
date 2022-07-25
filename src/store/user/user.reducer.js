import {USER_ACTION_TYPES} from './user.types';

// This is the initial state of each variable in the user.
const INITIAL_STATE = {
	currentUser: null
};

// The user reducer takes the state (i.e. all the user's variables) and an action (i.e. what is dispatched), then updates the state's variable(s) with the action's payload depending on the action's type.
// Gives state the default value of INITIAL_STATE for the first time this executes, and an empty object in case there is no action.
export const userReducer = (state = INITIAL_STATE, action = {}) => {
	const {type, payload} = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload
			};

		default:
			return state; // If the type does not exist, it means the action was dispatched for another reducer.
	}
};
