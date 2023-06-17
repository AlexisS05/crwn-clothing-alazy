import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { RootState } from '../../store/store';
import { selectCurrentUser } from '../../store/user/user.selector';
import { AuthErrorCodes } from 'firebase/auth'; // Assuming you have error code constants defined

type NotificationState = {
	message: string;
	code: string;
};

// const useNotification = () => {
// 	const notification = useSelector<RootState, NotificationState | null>(
// 		(state) => state.notification
// 	);
// 	const dispatch = useDispatch();
// 	const currentUser = useSelector(selectCurrentUser);

// 	useEffect(() => {
// 		if (notification && currentUser) {
// 			let message = '';

// 			if (notification.code === AuthErrorCodes.EMAIL_EXISTS) {
// 				message = 'Email is already in use.';
// 			} else if (notification.code === AuthErrorCodes.INVALID_EMAIL_PASSWORD) {
// 				message = 'Invalid email or password.';
// 			} else {
// 				message = 'Unknown error occurred.';
// 			}

// 			toast(`${currentUser.displayName}: ${message}`);
// 		}
// 	}, [notification, currentUser]);

// 	return null;
// };

// const NotifyPopUp: React.FC = () => {
// 	useNotification();

// 	return (
// 		<div>
// 			<ToastContainer />
// 		</div>
// 	);
// };

// export default NotifyPopUp;
