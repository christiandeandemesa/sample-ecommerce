import React from 'react';

import {
	signInWithGooglePopup,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import SignUp from '../sign-up/sign-up.component';

function SignIn() {
	const logGoogleUser = async () => {
		const res = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(res.user);
	};

	return (
		<div>
			<h1>Sign In Page</h1>
			<button onClick={logGoogleUser}>Sign In with Google Popup</button>
			<SignUp />
		</div>
	);
}

export default SignIn;
