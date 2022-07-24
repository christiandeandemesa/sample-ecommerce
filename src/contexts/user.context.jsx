import {createContext, useEffect, useReducer} from 'react';

import {createAction} from '../utils/reducer/reducer.utils';

import {
	createUserDocumentFromAuth,
	onAuthStateChangedListener
} from '../utils/firebase/firebase.utils';

// UserContext is a context object (i.e. a method to hold data to be shared with specific children components without using props) to check if the current user is logged in or not.
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null
});

// This holds the different action types for the userReducer.
const USER_ACTION_TYPES = {
	SET_CURRENT_USER: 'SET_CURRENT_USER'
};

// The userReducer takes the state (i.e. all the user's variables) and an action (i.e. what is dispatched), then updates the state's variable(s) with the action's payload depending on the action's type.
const userReducer = (state, action) => {
	const {type, payload} = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload
			};

		default:
			throw new Error(`🛑 Unhandled type ${type} in userReducer`);
	}
};

// This is the initial state of each variable in the user.
const INITIAL_STATE = {
	currentUser: null
};

// This component checks if the current user is logged in (i.e. currentUser is not null) or not (i.e. currentUser is null).
export const UserProvider = props => {
	const [state, dispatch] = useReducer(userReducer, INITIAL_STATE); // Takes the state from the initial state, and will run the dispatch toward the userReducer.

	const {currentUser} = state;

	const setCurrentUser = user => {
		dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)); // Dispatches an action with a type (e.g. USER_ACTION_TYPES.SET_CURRENT_USER) and payload (e.g. user).
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(user => {
			if (user) createUserDocumentFromAuth(user);
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		setCurrentUser
	};

	return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};
