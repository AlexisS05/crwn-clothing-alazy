import { screen, fireEvent } from '@testing-library/react';

import Navigation from '../navigation.component';
import { renderWithProviders } from '../../../utils/test/test.utils';
import { signOutStart } from '../../../store/user/user.action';

const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => mockedDispatch,
}));

describe('Navigation tests', () => {
	test('It should render a Sign In link and not a Sign Out link if there is no currentUser', () => {
		renderWithProviders(<Navigation />, {
			preloadedState: {
				user: {
					currentUser: null,
				},
			},
		});
		const signInLinkElement = screen.getByText(/sign in/i);
		expect(signInLinkElement).toBeInTheDocument();

		const signOutLinkElement = screen.queryByText(/sign out/i);
		expect(signOutLinkElement).toBeNull();
	});

	test('It should render Sign Out link and not Sign In link if there is a currentUser', () => {
		renderWithProviders(<Navigation />, {
			preloadedState: {
				user: {
					currentUser: {},
				},
			},
		});

		const signOutLinkElement = screen.getByText(/sign out/i);
		expect(signOutLinkElement).toBeInTheDocument();

		const signInLinkElement = screen.queryByText(/sign in/i);
		expect(signInLinkElement).toBeNull();
	});

	test('It should render if cart dropdown is not present', () => {
		renderWithProviders(<Navigation />, {
			preloadedState: {
				cartItems: {
					isCartOpen: false,
					cartItems: [],
				},
			},
		});
		const cartDropDownElement = screen.queryByText(/Your cart is empty/i);
		expect(cartDropDownElement).toBeNull();
	});

	test('It should render if cart dropdown is present', () => {
		renderWithProviders(<Navigation />, {
			preloadedState: {
				cartItems: {
					isCartOpen: true,
					cartItems: [],
				},
			},
		});
		const cartDropDownElement = screen.getByText(/Your cart is empty/i);
		expect(cartDropDownElement).toBeInTheDocument();
	});

	test('It should dispatch signOutStart action when clicking on the Sign Out link', async () => {
		renderWithProviders(<Navigation />, {
			preloadedState: {
				user: {
					currentUser: {},
				},
			},
		});

		const signOutLinkElement = screen.getByText(/sign out/i);
		expect(signOutLinkElement).toBeInTheDocument();

		await fireEvent.click(signOutLinkElement);
		expect(mockedDispatch).toHaveBeenCalled();
		const signOutAction = signOutStart();
		expect(mockedDispatch).toHaveBeenCalledWith(signOutAction);

		mockedDispatch.mockClear();
	});
});
