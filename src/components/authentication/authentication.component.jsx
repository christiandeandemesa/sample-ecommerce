import {React, useEffect} from 'react';

import {useDispatch} from 'react-redux';

import {setIsCartOpen} from '../../store/cart/cart.action';

import SignIn from '../sign-in/sign-in.component';
import SignUp from '../sign-up/sign-up.component';

import './authentication.styles.scss';

// This is the sign in/up page component.
function Authentication() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setIsCartOpen(false));
	}, []);

	return (
		<div className='authentication-container'>
			<SignIn />
			<SignUp />
		</div>
	);
}

export default Authentication;
