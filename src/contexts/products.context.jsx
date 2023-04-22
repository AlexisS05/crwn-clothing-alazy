import { createContext, useState } from 'react';

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
	currentProduct: [],
});

export const ProductsProvider = ({ children }) => {
	const [currentProduct] = useState(PRODUCTS);
	const value = { currentProduct };

	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};
