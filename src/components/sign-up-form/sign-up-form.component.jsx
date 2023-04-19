import { useState, useContext } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import { UserContext } from '../../contexts/user.context';

import './sign-up-form.styles.scss';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
	phoneNumber: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword, phoneNumber } =
		formFields;

	const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		// 1 Confirm Passwords matches
		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		// 2 See if user authenticated with email and password
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			// console.log(user);
			setCurrentUser(user);

			// 3 Create user document
			await createUserDocumentFromAuth(user, {
				displayName,
			});
			resetFormFields();
		} catch (err) {
			if (err.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else {
				console.error(err.message);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2>Don't have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>
				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>
				<FormInput
					label='Confirm Password'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>
				<FormInput
					label='Phone Number'
					type='number'
					required
					onChange={handleChange}
					name='phoneNumber'
					value={phoneNumber}
				/>
				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};
export default SignUpForm;
