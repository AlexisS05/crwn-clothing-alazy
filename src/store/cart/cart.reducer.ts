import {
	setCartItems,
	setIsCartOpen,
	clearCartItems,
	// setCartItemQuantity,
} from './cart.action';
import { CartItems } from './cart.types';
import { AnyAction } from 'redux';

export type CartState = {
	readonly isCartOpen: boolean;
	readonly cartItems: CartItems[];
};

const INITIAL_STATE: CartState = {
	isCartOpen: false,
	cartItems: [],
};

export const cartReducer = (
	state = INITIAL_STATE,
	action: AnyAction
): CartState => {
	if (setIsCartOpen.match(action)) {
		return { ...state, isCartOpen: action.payload };
	}

	if (setCartItems.match(action)) {
		return { ...state, cartItems: action.payload };
	}

	if (clearCartItems.match(action)) {
		return { ...state, cartItems: [], isCartOpen: action.payload };
	}

	// if (setCartItemQuantity.match(action)) {
	// 	const { cartItemToUpdate, newQuantity } = action.payload;
	// 	const updatedCartItems = state.cartItems.map((item) =>
	// 		item.id === cartItemToUpdate.id
	// 			? { ...item, quantity: newQuantity }
	// 			: item
	// 	);
	// 	return { ...state, cartItems: updatedCartItems };
	// }

	return state;
};
