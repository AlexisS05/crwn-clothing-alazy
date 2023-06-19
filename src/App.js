import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect, lazy, Suspense, useState } from 'react';

// import Home from './routes/home/home.component';

import ConfirmationPage from './routes/confirmation/confirmation.component';
import { checkUserSession } from './store/user/user.action';
import Spinner from './components/spinner/spinner.component';
import { GlobalStyle } from './global.styles';
import { displayNotification } from './store/user/user.saga';
import { selectCurrentUser } from './store/user/user.selector';

const Navigation = lazy(() =>
	import('./routes/navigation/navigation.component')
);
const Shop = lazy(() => import('./routes/shop/shop.component'));
const Checkout = lazy(() => import('./routes/checkout/checkout.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const Authentication = lazy(() =>
	import('./routes/authentication/authentication.component')
);

const App = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser);
	const [userName, setUserName] = useState('Guest');

	useEffect(() => {
		dispatch(checkUserSession());
	}, []);

	useEffect(() => {
		if (currentUser) {
			setTimeout(() => {
				const displayName =
					currentUser.displayName[0].toLocaleUpperCase() +
					currentUser.displayName.slice(1);
				setUserName(displayName);
			}, 1000);
		}
	}, [currentUser]);

	useEffect(() => {
		if (userName !== 'Guest') {
			displayNotification(`Welcome ${userName}!`, { type: 'success' });
		}
	}, [userName]);

	return (
		<Suspense fallback={<Spinner />}>
			<GlobalStyle />
			<Routes>
				<Route path='/' element={<Navigation />}>
					<Route index element={<Home />} />
					<Route path='shop/*' element={<Shop />} />
					<Route path='auth' element={<Authentication />} />
					<Route path='checkout' element={<Checkout />} />
					<Route path='confirmation' element={<ConfirmationPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;
