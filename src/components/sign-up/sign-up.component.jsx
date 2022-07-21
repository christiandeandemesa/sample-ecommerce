import {React, useState} from 'react';

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up.styles.scss';

function SignUp() {
	const defaultFormFields = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	const [formFields, setFormFields] = useState(defaultFormFields);
	const {displayName, email, password, confirmPassword} = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			const res = await createAuthUserWithEmailAndPassword(email, password);

			await createUserDocumentFromAuth(res.user, {displayName});

			resetFormFields();
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			}

			console.log('User creation encountered an error', err);
		}
	};

	const handleChange = e => {
		const {name, value} = e.target;
		setFormFields({...formFields, [name]: value});
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					type='text'
					onChange={handleChange}
					name='displayName'
					value={displayName}
					required
				/>

				<FormInput
					label='Email'
					type='email'
					onChange={handleChange}
					name='email'
					value={email}
					required
				/>

				<FormInput
					label='Password'
					type='password'
					onChange={handleChange}
					name='password'
					value={password}
					required
				/>

				<FormInput
					label='Confirm Password'
					type='password'
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
					required
				/>

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
}

export default SignUp;