import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';

export function useCurrentUser(): string | undefined {
	const currentUser = useSelector(selectCurrentUser);
	return currentUser?.displayName;
}
