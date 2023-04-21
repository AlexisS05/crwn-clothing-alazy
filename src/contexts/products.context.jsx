import { createContext, useState, useEffect } from 'react';

import PRODUCTS from '../shop-data.json';

export const ProductsContext = createContext({
	currentProduct: [],
});

export const ProductsProvider = ({ children }) => {
	const [currentProduct, setCurrentProduct] = useState(PRODUCTS);
	const value = { currentProduct };

	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};
