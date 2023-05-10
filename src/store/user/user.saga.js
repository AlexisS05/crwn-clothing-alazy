import { takeLatest, all, call, put } from 'redux-saga/effects';

import {
	getCurrentUser,
	createUserDocumentFromAuth,
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
	createAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import { USER_ACTION_TYPES } from './user.types';

import {
	signInSuccess,
	signInFailed,
	signUpSuccess,
	signUpFailed,
} from './user.action';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
	try {
		const userSnapshot = yield call(
			createUserDocumentFromAuth,
			userAuth,
			additionalDetails
		);
		yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
	} catch (err) {
		yield put(signInFailed(err));
	}
}

export function* signInWithEmail({ payload: { email, password } }) {
	try {
		const { user } = yield call(
			signInAuthUserWithEmailAndPassword,
			email,
			password
		);
		console.log(user, 'Signed with Email');
		yield call(getSnapshotFromUserAuth, user);
	} catch (err) {
		yield put(signInFailed('something failed', err));
	}
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield call(getCurrentUser);
		if (!userAuth) return;
		yield call(getSnapshotFromUserAuth, userAuth);
	} catch (err) {
		yield put(signInFailed(err));
	}
}

export function* signInWithGoogle() {
	try {
		const { user } = yield call(signInWithGooglePopup);
		console.log(user, 'Signed in With Google');
		yield call(getSnapshotFromUserAuth, user);
	} catch (err) {
		yield put(signInFailed(err));
	}
}

export function* signUp({ payload: { email, password, displayName } }) {
	try {
		const { user } = yield call(
			createAuthUserWithEmailAndPassword,
			email,
			password
		);
		console.log(user, 'Signed Up');
		yield put(signUpSuccess(user, { displayName }));
	} catch (err) {
		yield put(signUpFailed(err));
	}
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
	yield call(getSnapshotFromUserAuth, user, additionalDetails);
	console.log('test');
}

export function* onGoogleSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
	yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
	yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
	yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSaga() {
	yield all([
		call(onCheckUserSession),
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onSignUpStart),
		call(onSignUpSuccess),
	]);
}
