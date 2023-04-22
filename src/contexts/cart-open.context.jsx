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

const subtractCartItem = (cartItems, cartItemToRemove) => {
	// find if cartItems contains cartItemToRemove
	const existingItem = cartItems.find(
		(item) => item.id === cartItemToRemove.id
	);

	// if found, decrease quantity
	if (existingItem.quantity === 1) {
		return cartItems.filter((item) => item.id !== cartItemToRemove.id);
	}
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const deleteCartItem = (cartItems, itemToDelete) => {
	return cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	totalQuantity: 0,
	totalPrice: 0,
	deleteItemFromCart: () => {},
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItem] = useState([]);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setTotalQuantity(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const addPrice = cartItems.reduce(
			(total, cartItem) => total + cartItem.price * cartItem.quantity,
			0
		);
		setTotalPrice(addPrice);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		setCartItem(addCartItem(cartItems, productToAdd));
	};

	const subtractItemToCart = (cartItemToRemove) => {
		setCartItem(subtractCartItem(cartItems, cartItemToRemove));
	};

	const deleteItemFromCart = (productToDelete) => {
		setCartItem(deleteCartItem(cartItems, productToDelete));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		cartItems,
		totalQuantity,
		totalPrice,
		subtractItemToCart,
		deleteItemFromCart,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
