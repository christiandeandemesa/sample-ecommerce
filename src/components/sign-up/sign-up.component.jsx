import {React, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up.styles.scss';

// Sign up form component.
function SignUp() {
	// defaultFormFields is used to reset the form.
	const defaultFormFields = {
		displayName: '',
		email: '',
		password: '',
		confirmPassword: ''
	};

	const [formFields, setFormFields] = useState(defaultFormFields);
	const {displayName, email, password, confirmPassword} = formFields;

	const navigate = useNavigate();

	// Function to reset form fields.
	const resetFormFields = () => setFormFields(defaultFormFields);

	// Function used to manually sign up when the form is submitted.
	const handleSubmit = async e => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		try {
			const res = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(res.user, {displayName}); // {displayName} needed to avoid displayName: null in the database.
			resetFormFields();
			navigate('/');
		} catch (err) {
			if (err.code === 'auth/email-already-in-use')
				alert('Cannot create user, email already in use.');
			else if (err.code === 'auth/weak-password')
				alert('Must use a password with at least 6 characters.');

			console.log('User creation encountered an error', err);
		}
	};

	// Function used to change the value of the form the user is typing in or deleting from.
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
