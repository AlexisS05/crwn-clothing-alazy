import { useContext } from 'react';

import { CartContext } from '../../contexts/cart-open.context';

import {
	ShoppingIcon,
	CartIconContainer,
	ItemCount,
} from './cart-icon.styles.jsx';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, totalQuantity } = useContext(CartContext);
	const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<ItemCount>{totalQuantity}</ItemCount>
		</CartIconContainer>
	);
};
export default CartIcon;
