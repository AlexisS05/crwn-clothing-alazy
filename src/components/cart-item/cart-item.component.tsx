import { CartItems } from '../../store/cart/cart.types';
import { CartItemContainer, ItemDetails } from './cart-item.styles';

type CartItemProps = {
	cartItems: CartItems;
};

const CartItem = ({ cartItems }: CartItemProps) => {
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
};
export default CartItem;
