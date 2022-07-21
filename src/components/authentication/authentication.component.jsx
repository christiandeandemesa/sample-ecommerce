import React from 'react';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

import './authentication.styles.scss';

function Authentication() {
	return (
		<div className='authentication-container'>
			<SignIn />
			<SignUp />
		</div>
	);
}

export default Authentication;
