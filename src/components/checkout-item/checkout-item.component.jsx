import './checkout-item.styles.scss';

import { CartContext } from '../../contexts/cart-open.context';
import { useContext } from 'react';

const CheckoutItem = ({ cartItems }) => {
	const { name, imageUrl, price, quantity } = cartItems;
	const { addItemToCart, subtractItemToCart, deleteItemFromCart } =
		useContext(CartContext);

	const clearItemHandler = () => deleteItemFromCart(cartItems);
	const addItemHandler = () => addItemToCart(cartItems);
	const subtractItemHandler = () => subtractItemToCart(cartItems);

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt={`${name}`} />
			</div>
			<span className='name'>{name}</span>
			<span className='quantity'>
				<div className='arrow' onClick={subtractItemHandler}>
					&#10094;
				</div>
				<div className='value'>{quantity}</div>
				<div className='arrow' onClick={addItemHandler}>
					&#10095;
				</div>
			</span>

			<span className='price'>${price}</span>
			<div className='remove-button' onClick={clearItemHandler}>
				&#10005;
			</div>
		</div>
	);
};
export default CheckoutItem;
