import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	deleteItemFromCart: () => {},
});

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

export const CART_ACTION_TYPES = {
	SET_CART_ACTIVE: 'SET_CART_ACTIVE',
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ACTIVE:
			return {
				...state,
				...payload,
			};
		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload,
			};

		default:
			throw new Error(`Unhandled type of ${type} in cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
		useReducer(cartReducer, INITIAL_STATE);

	const updateCartItemsReducer = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

		const addPrice = newCartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0
		);

		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ACTIVE, {
				cartItems: newCartItems,
				cartCount: newCartCount,
				cartTotal: addPrice,
			})
		);
	};

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const subtractItemToCart = (cartItemToRemove) => {
		const newCartItems = subtractCartItem(cartItems, cartItemToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const deleteItemFromCart = (productToDelete) => {
		const newCartItems = deleteCartItem(cartItems, productToDelete);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = (isOpen) => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		cartCount,
		cartTotal,
		subtractItemToCart,
		deleteItemFromCart,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
