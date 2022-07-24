import {CATEGORIES_ACTION_TYPES} from './categories.types';

// This is the initial state of each variable in the categories.
const INITIAL_STATE = {
	categories: []
};

// The categories reducer takes the state (i.e. all the categories' variables) and an action (i.e. what is dispatched), then updates the state's variable(s) with the action's payload depending on the action's type.
export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
	// Gives state the default value of INITIAL_STATE for the first time this executes.
	const {type, payload} = action;

	switch (type) {
		case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
			return {
				...state,
				categories: payload
			};

		default:
			return state; // If the type does not exist, it means the action was dispatched for another reducer.
	}
};
