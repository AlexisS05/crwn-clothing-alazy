import { useSelector } from 'react-redux';
import './confirmation.styles.scss';
import { selectCurrentUser } from '../../store/user/user.selector';
import { ReactComponent as CheckMark } from '../../assets/check.svg';
import CartItem from '../../components/cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

const ConfirmationPage = () => {
	const currentUser = useSelector(selectCurrentUser);
	const cartItems = useSelector(selectCartItems);
	return (
		<div className='confirmation-container'>
			<div>
				<h1>Your order has been received!</h1>

				<div className='logo-container'>
					<CheckMark />
				</div>
				<h2>
					Thank you, {currentUser ? currentUser.displayName : 'Guest'} for your
					order!
				</h2>
				<h2>Order summary:</h2>
				<div>
					{cartItems.length
						? cartItems.map((item) => (
								<CartItem key={item.id} cartItems={item}></CartItem>
						  ))
						: 'Check'}
				</div>
			</div>
		</div>
	);
};
export default ConfirmationPage;
