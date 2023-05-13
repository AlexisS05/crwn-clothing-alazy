import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './payment-form.styles';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { CART_ACTION_TYPES } from '../../store/cart/cart.types';

import {
	PaymentFormContainer,
	FormContainer,
	PaymentButton,
} from './payment-form.styles';

const PaymentForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const stripe = useStripe();
	const elements = useElements();
	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);
	const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const goToConfirmationPage = () => {
		navigate('/confirmation');
	};

	const paymentHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsProcessingPayment(true);

		const response = await fetch('/.netlify/functions/create-payment-intent', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ amount: amount * 100 }),
		}).then((res) => res.json());
		const {
			paymentIntent: { client_secret },
		} = response;

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		});

		setIsProcessingPayment(false);

		if (paymentResult.error) {
			alert(paymentResult.error);
		} else {
			if (paymentResult.paymentIntent.status === 'succeeded') {
				console.log('Payment Successful');
				goToConfirmationPage();
				dispatch({ type: CART_ACTION_TYPES.CLEAR_CART_ITEMS });
			}
		}
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement />
				<PaymentButton
					isLoading={isProcessingPayment}
					buttonType={BUTTON_TYPE_CLASSES.inverted}
				>
					Pay Now
				</PaymentButton>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
