import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from './checkout.styles.jsx';
import { useSelector } from 'react-redux';
import {
	selectCartCount,
	selectCartItems,
	selectCartTotal,
} from '../../store/cart/cart.selector';

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const cartCount = useSelector(selectCartCount);
	const cartTotal = useSelector(selectCartTotal);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map((item) => (
				<CheckoutItem key={item.id} cartItems={item}></CheckoutItem>
			))}
			{cartCount >= 1 ? (
				<Total>Total Price: ${cartTotal}</Total>
			) : (
				<span>There is no items in your cart.</span>
			)}
		</CheckoutContainer>
	);
};
export default Checkout;
