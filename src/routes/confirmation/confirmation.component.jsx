import { useSelector } from 'react-redux';
import './confirmation.styles.jsx';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../store/user/user.selector';
import { ReactComponent as CheckMark } from '../../assets/check.svg';
import CartItem from '../../components/cart-item/cart-item.component';
import { useState, useEffect } from 'react';

import {
	ConfirmationContainer,
	LogoContainer,
	ContinueButton,
} from './confirmation.styles.jsx';

const ConfirmationPage = () => {
	const currentUser = useSelector(selectCurrentUser);
	const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
	const storedAmount = JSON.parse(localStorage.getItem('amount'));
	const [cartItems, setCartItems] = useState(storedCartItems || []);
	const [amount, setAmount] = useState(storedAmount || 0);
	const navigate = useNavigate();

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			// Only remove cartItems from localStorage if the user is closing the tab/browser
			if (
				event.currentTarget.location.pathname === '/confirmation' ||
				event.currentTarget.location.pathname === '/'
			) {
				event.preventDefault();
				event.returnValue = '';
			} else {
				localStorage.removeItem('cartItems');
				localStorage.removeItem('amount');
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	const handleContinueShopping = () => {
		localStorage.removeItem('cartItems');
		localStorage.removeItem('amount');
		setAmount(0);
		setCartItems([]);
		navigate('/');
	};

	return (
		<ConfirmationContainer>
			<div>
				<h1>Your order has been received!</h1>
				<LogoContainer>
					<CheckMark />
				</LogoContainer>
				<h2>
					Thank you, {currentUser ? currentUser.displayName : 'Guest'} for your
					order!
				</h2>
				<h2>Order summary:</h2>
				<div>
					{cartItems.length
						? cartItems.map((item) => (
								<CartItem key={item.id} cartItems={item}></CartItem>
						  ))
						: 'Please Leave this page. The data is gone.'}
				</div>
				<div>Total: ${amount}</div>
				<ContinueButton onClick={handleContinueShopping}>
					Continue Shopping
				</ContinueButton>
			</div>
		</ConfirmationContainer>
	);
};
export default ConfirmationPage;
