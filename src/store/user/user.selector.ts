import { InitialState } from './user.reducer';

export const selectCurrentUser = (state: { user: InitialState }) =>
	state.user.currentUser;
