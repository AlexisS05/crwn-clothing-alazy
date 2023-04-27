import {
	CheckoutItemContainer,
	ImageContainer,
	Quantity,
	Arrow,
	Value,
	RemoveButton,
	BaseSpan,
} from './checkout-item.styles.jsx';

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
		<CheckoutItemContainer>
			<ImageContainer>
				<img src={imageUrl} alt={`${name}`} />
			</ImageContainer>
			<BaseSpan>{name}</BaseSpan>
			<Quantity>
				<Arrow onClick={subtractItemHandler}>&#10094;</Arrow>
				<Value>{quantity}</Value>
				<Arrow onClick={addItemHandler}>&#10095;</Arrow>
			</Quantity>
			<BaseSpan>${price}</BaseSpan>
			<RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
		</CheckoutItemContainer>
	);
};
export default CheckoutItem;
