import { CartItems } from '../../store/cart/cart.types';
import { CartItemContainer, ItemDetails } from './cart-item.styles';
import { FC, memo } from 'react';

type CartItemProps = {
	cartItems: CartItems;
};

const CartItem: FC<CartItemProps> = memo(({ cartItems }) => {
	const { name, imageUrl, price, quantity } = cartItems;
	return (
		<CartItemContainer>
			<img src={imageUrl} alt={`${name}`} />
			<ItemDetails>
				<span>{name}</span>
				<span>
					{quantity} x ${price}
				</span>
			</ItemDetails>
		</CartItemContainer>
	);
});
export default CartItem;
