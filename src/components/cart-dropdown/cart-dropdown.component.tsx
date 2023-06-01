import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
	CartDropDownContainer,
	EmptyMessage,
	CartItems,
} from './cart-dropdown.styles';

const sleep = (milliseconds: number): void => {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if (new Date().getTime() - start > milliseconds) {
			break;
		}
	}
};

const CartDropDown = () => {
	const cartItems = useSelector(selectCartItems);
	const navigate = useNavigate();
	const [count, setCount] = useState(0);

	// const hundredCount = useMemo(() => {
	// 	console.log('start');
	// 	sleep(2000);
	// 	console.log('end');
	// 	return 100 + count;
	// }, [count]);

	const goToCheckoutHandler = useCallback(() => {
		navigate('./checkout');
	}, []);

	return (
		<CartDropDownContainer>
			<CartItems>
				{/* {hundredCount} */}
				{cartItems.length ? (
					cartItems.map((item) => (
						<CartItem key={item.id} cartItems={item}></CartItem>
					))
				) : (
					<EmptyMessage>Your cart is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
		</CartDropDownContainer>
	);
};
export default CartDropDown;
