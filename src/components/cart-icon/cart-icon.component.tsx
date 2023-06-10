import { useDispatch, useSelector } from 'react-redux';

import {
	selectCartCount,
	selectIsCartOpen,
} from '../../store/cart/cart.selector';

import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
	const dispatch = useDispatch();
	const setCartOpen = useSelector(selectIsCartOpen);
	const cartCount = useSelector(selectCartCount);
	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!setCartOpen));

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};
export default CartIcon;
