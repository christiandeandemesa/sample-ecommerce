import {createContext, useEffect, useState} from 'react';

import {
	createUserDocumentFromAuth,
	onAuthStateChangedListener
} from '../utils/firebase/firebase.utils';

// UserContext is a context object (i.e. a method to hold data to be shared with specific children components without using props) to check if the current user is logged in or not.
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null
});

// This component checks if the current user is logged in (i.e. currentUser is not null) or not (i.e. currentUser is null).
export const UserProvider = props => {
	const [currentUser, setCurrentUser] = useState(null);

	const value = {currentUser, setCurrentUser};

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(user => {
			if (user) createUserDocumentFromAuth(user);
			setCurrentUser(user);
		});

		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};
