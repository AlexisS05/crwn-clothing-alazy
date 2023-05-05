import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../utils/reducer/reducer.utils';

export const setIsCartOpen = (boolean) =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	const existingItem = cartItems.find((item) => item.id === productToAdd.id);
	// if found, increment quantity
	if (existingItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// return new array with modified cartItems/ new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const subtractCartItem = (cartItems, cartItemToRemove) => {
	// find if cartItems contains cartItemToRemove
	const existingItem = cartItems.find(
		(item) => item.id === cartItemToRemove.id
	);

	// if found, decrease quantity
	if (existingItem.quantity === 1) {
		return cartItems.filter((item) => item.id !== cartItemToRemove.id);
	}
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const deleteCartItem = (cartItems, itemToDelete) => {
	return cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);
};

export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const subtractItemToCart = (cartItems, cartItemToRemove) => {
	const newCartItems = subtractCartItem(cartItems, cartItemToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, productToDelete) => {
	const newCartItems = deleteCartItem(cartItems, productToDelete);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
