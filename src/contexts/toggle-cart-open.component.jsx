import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	const existingItem = cartItems.find((item) => item.id === productToAdd.id);
	// if found, increment quantity
	if (existingItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// return new array with modified cartItems/ new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	totalQuantity: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItem] = useState([]);
	const [totalQuantity, setTotalQuantity] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setTotalQuantity(newCartCount);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItem(addCartItem(cartItems, productToAdd));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		totalQuantity,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
