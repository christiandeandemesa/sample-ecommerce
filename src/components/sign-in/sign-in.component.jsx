import {React, useState} from 'react';

import {useNavigate} from 'react-router-dom';

import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in.styles.scss';

// Sign in form component.
function SignIn() {
	// defaultFormFields is used to reset the form.
	const defaultFormFields = {
		email: '',
		password: ''
	};

	const [formFields, setFormFields] = useState(defaultFormFields);
	const {email, password} = formFields;

	const navigate = useNavigate();

	// This function resets the form fields.
	const resetFormFields = () => setFormFields(defaultFormFields);

	// This function is used to sign in with a Google account.
	const signInWithGoogle = async () => {
		await signInWithGooglePopup();

		navigate('/');
	};

	// This function is used to manually sign in when the form is submitted.
	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
			navigate('/');
		} catch (err) {
			if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found')
				alert('Wrong email or password.');
			console.log('User sign in encountered an error', err);
		}
	};

	// This function is used to change the value of the form the user is typing in or deleting from.
	const handleChange = e => {
		const {name, value} = e.target;
		setFormFields({...formFields, [name]: value});
	};

	return (
		<div className='sign-up-container'>
			<h2>Already have an account?</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					onChange={handleChange}
					name='email' // Only inputs with a name attribute will have their values passed when submitting a form.
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

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>

					<Button buttonType='google' onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
}

export default SignIn;
