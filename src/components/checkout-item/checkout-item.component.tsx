import {
	CheckoutItemContainer,
	ImageContainer,
	Quantity,
	Arrow,
	Value,
	RemoveButton,
	BaseSpan,
} from './checkout-item.styles';
import { FC } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
	addItemToCart,
	deleteItemFromCart,
	subtractItemToCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItems } from '../../store/cart/cart.types';

type CheckoutItemProps = {
	cartItems: CartItems;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItems }) => {
	const dispatch = useDispatch();
	const { name, imageUrl, price, quantity } = cartItems;
	const cartItem = useSelector(selectCartItems);

	const clearItemHandler = () =>
		dispatch(deleteItemFromCart(cartItem, cartItems));
	const addItemHandler = () => dispatch(addItemToCart(cartItem, cartItems));
	const subtractItemHandler = () =>
		dispatch(subtractItemToCart(cartItem, cartItems));

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
