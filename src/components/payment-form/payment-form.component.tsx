import { useState, FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeCardElement } from '@stripe/stripe-js';
import './payment-form.styles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	selectCartCount,
	selectCartItems,
	selectCartTotal,
} from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
	PaymentFormContainer,
	FormContainer,
	PaymentButton,
} from './payment-form.styles';

const ifValidCardElement = (
	card: StripeCardElement | null
): card is StripeCardElement => card !== null;

const PaymentForm = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();
	const stripe = useStripe();
	const elements = useElements();
	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);
	const cartCount = useSelector(selectCartCount);

	const [isProcessingPayment, setIsProcessingPayment] = useState(false);
	const [isFormComplete, setIsFormComplete] = useState(false);

	const goToConfirmationPage = () => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
		localStorage.setItem('amount', JSON.stringify(amount));
		navigate('/confirmation');
	};

	const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
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

		const cardDetails = elements.getElement(CardElement);

		if (!ifValidCardElement(cardDetails)) return;

		const paymentResult = await stripe.confirmCardPayment(client_secret, {
			payment_method: {
				card: cardDetails,
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
			}
		}
	};

	const handleCardInputChange = (event: any) => {
		setIsFormComplete(event.complete);
	};

	return (
		<PaymentFormContainer>
			<FormContainer onSubmit={paymentHandler}>
				<h2>Credit Card Payment: </h2>
				<CardElement onChange={handleCardInputChange} />
				<PaymentButton
					isLoading={isProcessingPayment}
					buttonType={
						isFormComplete && cartCount >= 1
							? BUTTON_TYPE_CLASSES.base
							: BUTTON_TYPE_CLASSES.disabled
					}
					disabled={!isFormComplete || cartCount === 0}
				>
					Pay Now
				</PaymentButton>
				<h3>Test a purchase: Type 424242... on all the fields</h3>
			</FormContainer>
		</PaymentFormContainer>
	);
};

export default PaymentForm;
