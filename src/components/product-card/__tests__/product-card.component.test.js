import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../utils/test/test.utils';
import ProductCard from '../product-card.component';

describe('Product Card tests', () => {
	test('it should add the product item when Product Card button is clicked', async () => {
		const mockProduct = {
			id: 1,
			imageUrl: 'test',
			name: 'Item 1',
			price: 10,
		};
		const { store } = renderWithProviders(
			<ProductCard product={mockProduct} />,
			{
				preloadedState: {
					cartItems: {
						cartItems: [],
					},
				},
			}
		);

		const addToCartButtonElement = screen.getByText(/add to cart/i);
		await fireEvent.click(addToCartButtonElement);

		expect(store.getState().cartItems.cartItems.length).toBe(1);
	});
});
