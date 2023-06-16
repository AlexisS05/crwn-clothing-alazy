import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonContainer } from './sign-in-styles';
import {
	googleSignInStart,
	emailSignInStart,
} from '../../store/user/user.action';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm: React.FC<{ isActive: boolean }> = ({ isActive }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const goToConfirmationPage = () => {
		navigate('/');
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			dispatch(emailSignInStart(email, password));
			resetFormFields();
		} catch (err) {
			// switch (err.code) {
			// 	case 'auth/wrong-password':
			// 		alert('Incorrect password for email');
			// 		break;
			// 	case 'auth/user-not-found':
			// 		alert('No user associated with this email');
			// 		break;
			// 	default:
			console.error('user sign in failed', err);
		}
	};

	const logGoogleUser = async () => {
		dispatch(googleSignInStart());
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<SignInContainer isActive={isActive}>
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
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
				<ButtonContainer>
					<Button type='submit'>Sign In</Button>
					<Button
						buttonType={BUTTON_TYPE_CLASSES.google}
						type='button'
						onClick={logGoogleUser}
					>
						Google Sign In
					</Button>
				</ButtonContainer>
			</form>
		</SignInContainer>
	);
};
export default SignInForm;
