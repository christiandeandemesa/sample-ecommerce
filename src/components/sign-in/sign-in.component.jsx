import React from 'react';

import {
	signInwithGooglePopup,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

function SignIn() {
	const logGoogleUser = async () => {
		const res = await signInwithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(res.user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign In with Google Popup</button>
		</div>
	);
}

export default SignIn;
