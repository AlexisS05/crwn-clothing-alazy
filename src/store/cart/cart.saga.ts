import { takeLatest, all, call, select } from 'typed-redux-saga/macro';

import { RootState } from '../store';
import {
	getCurrentUser,
	mergeCartItems,
	updateCartInFirebase,
	getCartItemsFromFirebase,
	// deleteCartItemInFirebase,
} from '../../utils/firebase/firebase.utils';
import { CART_ACTION_TYPES, CartItems } from './cart.types';

export function deepCompare(a: any, b: any): boolean {
	// Check if the types of a and b are not equal
	if (typeof a !== typeof b) {
		return false;
	}

	// Check if both a and b are arrays
	if (Array.isArray(a) && Array.isArray(b)) {
		// Compare the lengths of the arrays
		if (a.length !== b.length) {
			return false;
		}

		// Compare each element in the arrays recursively
		for (let i = 0; i < a.length; i++) {
			if (!deepCompare(a[i], b[i])) {
				return false;
			}
		}

		return true;
	}

	// Check if both a and b are objects
	if (typeof a === 'object' && typeof b === 'object') {
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);

		// Compare the number of keys in the objects
		if (keysA.length !== keysB.length) {
			return false;
		}

		// Compare each key-value pair in the objects recursively
		for (const key of keysA) {
			if (!deepCompare(a[key], b[key])) {
				return false;
			}
		}

		return true;
	}

	// Compare the primitive values directly
	return a === b;
}

export function* updateCartInFirebaseSaga() {
	const userAuth = yield* call(getCurrentUser);
	if (userAuth) {
		const cartItems = yield* select(
			(state: RootState) => state.cartItems.cartItems
		);
		console.log(cartItems);

		const cartItemsInFirebase = yield* call(getCartItemsFromFirebase, userAuth);
		console.log(cartItemsInFirebase);

		// Compare the cart items in Redux with the cart items in Firebase
		const isCartUpdated = deepCompare(cartItemsInFirebase, cartItems);

		if (!isCartUpdated) {
			// Update the cart items in Firebase only if they have not been updated already
			yield* call(updateCartInFirebase, userAuth, cartItems);
		}
	}
}

export function* clearCartInFirebaseSaga() {
	const userAuth = yield* call(getCurrentUser);
	if (userAuth) {
		yield* call(updateCartInFirebase, userAuth, []);
	}
}

export function* watchCartActions() {
	yield* takeLatest(
		[
			CART_ACTION_TYPES.SET_CART_ITEMS,
			CART_ACTION_TYPES.SET_CART_COUNT,
			CART_ACTION_TYPES.SET_CART_TOTAL,
		],
		updateCartInFirebaseSaga
	);

	yield* takeLatest(
		CART_ACTION_TYPES.CLEAR_CART_ITEMS,
		clearCartInFirebaseSaga
	);
}

export function* cartSaga() {
	yield* all([call(watchCartActions)]);
}
