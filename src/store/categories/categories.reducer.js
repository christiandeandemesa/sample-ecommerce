import {CATEGORIES_ACTION_TYPES} from './categories.types';

// This is the initial state of each variable in the categories.
const INITIAL_STATE = {
	categories: [],
	// isLoading and error are needed for the categories thunk.
	isLoading: false,
	error: null
};

// The categories reducer takes the state (i.e. all the categories' variables) and an action (i.e. what is dispatched), then updates the state's variable(s) with the action's payload depending on the action's type.
// Gives state the default value of INITIAL_STATE for the first time this executes, and an empty object in case there is no action.
export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
	const {type, payload} = action;

	switch (type) {
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
			return {
				...state,
				isLoading: true
			};

		// All the below cases are needed for the categories thunk.
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: payload,
				isLoading: false
			};

		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
			return {
				...state,
				error: payload,
				isLoading: false
			};

		default:
			return state; // If the type does not exist, it means the action was dispatched for another reducer.
	}
};
