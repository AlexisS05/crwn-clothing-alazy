import { takeLatest, all, call, select } from 'typed-redux-saga/macro';

import { RootState } from '../store';
import getCartItemsFromFirebase, {
	getCurrentUser,
	mergeCartItems,
	updateCartInFirebase,
	// deleteCartItemInFirebase,
} from '../../utils/firebase/firebase.utils';
import { CART_ACTION_TYPES, CartItems } from './cart.types';

export function* updateCartInFirebaseSaga() {
	const userAuth = yield* call(getCurrentUser);
	if (userAuth) {
		const cartItems = yield* select(
			(state: RootState) => state.cartItems.cartItems
		);
		yield* call(updateCartInFirebase, userAuth, cartItems);
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
