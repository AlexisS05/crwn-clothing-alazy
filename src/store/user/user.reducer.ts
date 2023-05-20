import {
	signInFailed,
	signInSuccess,
	signOutFailed,
	signOutSuccess,
	signUpFailed,
} from './user.action';
import { USER_ACTION_TYPES } from './user.types';
import { AnyAction } from 'redux';

export type InitialState = {
	readonly currentUser: object | null;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: InitialState = {
	currentUser: null,
	isLoading: false,
	error: null,
};

export const userReducer = (
	state = INITIAL_STATE,
	action: AnyAction
): InitialState => {
	if (signInSuccess.match(action)) {
		return { ...state, currentUser: action.payload };
	}

	if (signOutSuccess.match(action)) {
		return {
			...state,
			currentUser: null,
		};
	}

	if ((signOutFailed || signUpFailed || signInFailed).match(action)) {
		return { ...state, error: action.payload };
	}

	return state;
};
