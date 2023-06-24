import { takeLatest, all, call, put, select } from 'typed-redux-saga/macro';
import { AuthErrorCodes, User } from 'firebase/auth';
import { toast, ToastOptions } from 'react-toastify';

import getCartItemsFromFirebase, {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
	signOutUser,
	AddtionalInformation,
	updateCartInFirebase,
	db,
	mergeCartItems,
} from '../../utils/firebase/firebase.utils';

import { USER_ACTION_TYPES } from './user.types';

import {
	signInSuccess,
	signInFailed,
	signUpSuccess,
	signUpFailed,
	signOutFailed,
	signOutSuccess,
	EmailSignInStart,
	SignUpStart,
	SignUpSuccess,
	navigateToHomePage,
} from './user.action';
import { FirebaseError } from 'firebase/app';
import { CartItems } from '../cart/cart.types';
import { RootState } from '../store';
import { clearCartItemsNoFirebase, setCartItems } from '../cart/cart.action';

export function displayNotification(message: string, options: ToastOptions) {
	toast(message, options);
}

export function* getSnapshotFromUserAuth(
	userAuth: User,
	additionalDetails?: AddtionalInformation
) {
	try {
		const userSnapshot = yield* call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);

		if (userSnapshot) {
			yield* put(
				signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
			);

			const { cartItems } = yield* select(
				(state: RootState) => state.cartItems
			);
			const firebaseCartItems: CartItems[] = yield* call(
				getCartItemsFromFirebase,
				userAuth
			);

			// Merge existing cart items with the cart items from Firebase
			const mergedCartItems = mergeCartItems(firebaseCartItems, cartItems);

			// Update the cart in Firebase with the merged cart items
			yield* call(updateCartInFirebase, userAuth, mergedCartItems);

			// Update the cart in Redux with the merged cart items
			yield* put(setCartItems(mergedCartItems));
		}
	} catch (err) {
		yield* put(signInFailed(err as Error));
	}
}
export function* signInWithEmail({
	payload: { email, password },
}: EmailSignInStart) {
	try {
		const userCredential = yield* call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		if (userCredential) {
			const { user } = userCredential;
			yield* call(getSnapshotFromUserAuth, user);
			yield* put(navigateToHomePage());
		}
	} catch (err: unknown) {
		if ((err as FirebaseError).code === AuthErrorCodes.INVALID_PASSWORD) {
			yield* put(signUpFailed(new Error('Incorrect email or password')));
			displayNotification('Incorrect email or password', { type: 'error' });
		} else {
			yield* put(signUpFailed(err as Error));
		}
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield* call(getCurrentUser);
		if (!userAuth) return;
		yield* call(getSnapshotFromUserAuth, userAuth);
	} catch (err) {
		yield* put(signInFailed(err as Error));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield* call(signInWithGooglePopup);
		console.log(user, 'Signed in With Google');
		yield* call(getSnapshotFromUserAuth, user);
		yield* put(navigateToHomePage());
	} catch (err) {
		yield* put(signInFailed(err as Error));
	}
}

export function* signUp({
	payload: { email, password, displayName },
}: SignUpStart) {
	try {
		const userCredential = yield* call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);
		if (userCredential) {
			const { user } = userCredential;
			yield* put(signUpSuccess(user, { displayName }));
		}
	} catch (err: unknown) {
		if ((err as FirebaseError).code === AuthErrorCodes.EMAIL_EXISTS) {
			yield* put(signUpFailed(new Error('auth/email-already-in-use')));
			displayNotification('Email already in use', {
				type: 'error',
			});
		} else {
			yield* put(signUpFailed(err as Error));
		}
	}
}

export function* signInAfterSignUp({
	payload: { user, additionalDetails },
}: SignUpSuccess) {
	yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
	try {
		yield* call(signOutUser);
		yield* put(clearCartItemsNoFirebase());
		yield* put(signOutSuccess());
	} catch (err) {
		yield* put(signOutFailed(err as Error));
	}
}

export function* onGoogleSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
	yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
	yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSaga() {
	yield* all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
		call(onSignOutStart),
	]);
}
