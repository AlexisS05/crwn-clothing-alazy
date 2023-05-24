import {
	ProductCardContainer,
	Name,
	Price,
	Footer,
} from './product.card.styles';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { selectCartItems } from '../../store/cart/cart.selector';

import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { CategoryItem } from '../../store/categories/category.types';

type ProductCardProps = {
	product: CategoryItem;
};

const ProductCard = ({ product }: ProductCardProps) => {
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
