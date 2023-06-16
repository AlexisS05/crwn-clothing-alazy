import { CategoryItem } from '../categories/category.types';
import { CART_ACTION_TYPES, CartItems } from './cart.types';
import {
	ActionWithPayload,
	createAction,
	withMatcher,
} from '../../utils/reducer/reducer.utils';

const addCartItem = (
	cartItems: CartItems[],
	productToAdd: CategoryItem
): CartItems[] => {
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

const subtractCartItem = (
	cartItems: CartItems[],
	cartItemToRemove: CartItems
): CartItems[] => {
	// find if cartItems contains cartItemToRemove
	const existingItem = cartItems.find(
		(item) => item.id === cartItemToRemove.id
	);

	// if found, decrease quantity
	if (existingItem?.quantity === 1) {
		return cartItems.filter((item) => item.id !== cartItemToRemove.id);
	}
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const deleteCartItem = (
	cartItems: CartItems[],
	itemToDelete: CartItems
): CartItems[] => {
	return cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);
};

export const setIsCartOpen = withMatcher(
	(isOpen: boolean): SetIsCartOpen =>
		createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isOpen)
);

export const setCartItems = withMatcher(
	(cartItems: CartItems[]): SetCartItems =>
		createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export type SetIsCartOpen = ActionWithPayload<
	CART_ACTION_TYPES.SET_IS_CART_OPEN,
	boolean
>;

// export type AddItemToCart = ActionWithPayload<
// 	CART_ACTION_TYPES.SET_CART_ITEMS,
// 	CartItems[]
// >;

// export type SubtractItemToCart = ActionWithPayload<
// 	CART_ACTION_TYPES.SET_CART_ITEMS,
// 	CartItems[]
// >;
// export type DeleteItemFromCart = ActionWithPayload<
// 	CART_ACTION_TYPES.SET_CART_ITEMS,
// 	CartItems[]
// >;

export type SetCartItems = ActionWithPayload<
	CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItems[]
>;

export type ClearCartItems = ActionWithPayload<
	CART_ACTION_TYPES.CLEAR_CART_ITEMS,
	boolean
>;

export const clearCartItems = withMatcher(
	(isCartOpen: boolean): ClearCartItems =>
		createAction(CART_ACTION_TYPES.CLEAR_CART_ITEMS, isCartOpen)
);

export const addItemToCart = (
	cartItems: CartItems[],
	productToAdd: CategoryItem
): SetCartItems => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return setCartItems(newCartItems);
};

export const subtractItemToCart = (
	cartItems: CartItems[],
	cartItemToRemove: CartItems
): SetCartItems => {
	const newCartItems = subtractCartItem(cartItems, cartItemToRemove);
	return setCartItems(newCartItems);
};

export const deleteItemFromCart = (
	cartItems: CartItems[],
	productToDelete: CartItems
): SetCartItems => {
	const newCartItems = deleteCartItem(cartItems, productToDelete);
	return setCartItems(newCartItems);
};
