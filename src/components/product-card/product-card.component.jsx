import {
	ProductCardContainer,
	Name,
	Price,
	Footer,
} from './product.card.styles.jsx';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { selectCartItems } from '../../store/cart/cart.selector.js';

import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action.js';

const ProductCard = ({ product }) => {
	const dispatch = useDispatch();
	const { name, price, imageUrl } = product;
	const cartItems = useSelector(selectCartItems);

	const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductToCart}
			>
				Add to Cart
			</Button>
		</ProductCardContainer>
	);
};
export default ProductCard;
