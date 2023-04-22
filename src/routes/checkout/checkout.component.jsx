import { useContext } from 'react';
import { CartContext } from '../../contexts/cart-open.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';

const Checkout = () => {
	const { cartItems, totalPrice } = useContext(CartContext);

	return (
		<div className='checkout-container'>
			<div className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>
				<div className='header-block'>
					<span>Description</span>
				</div>
				<div className='header-block'>
					<span>Quantity</span>
				</div>
				<div className='header-block'>
					<span>Price</span>
				</div>
				<div className='header-block'>
					<span>Remove</span>
				</div>
			</div>
			{cartItems.map((item) => (
				<CheckoutItem key={item.id} cartItems={item}></CheckoutItem>
			))}
			{totalPrice > 1 ? (
				<span className='total'>Total Price: ${totalPrice}</span>
			) : (
				<span>There is no items in your cart.</span>
			)}
		</div>
	);
};
export default Checkout;
