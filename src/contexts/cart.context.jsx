import {createContext, useState, useEffect} from 'react';

// This function adds a product to the cart.
export const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

	if (existingCartItem)
		return cartItems.map(cartItem =>
			cartItem.id === productToAdd.id
				? {...cartItem, quantity: cartItem.quantity + 1}
				: cartItem
		);
	else return [...cartItems, {...productToAdd, quantity: 1}];
};

// This function removes a product from the cart.
export const removeCartItem = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

	if (existingCartItem.quantity === 1)
		return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
	else
		return cartItems.map(cartItem =>
			cartItem.id === productToRemove.id
				? {...cartItem, quantity: cartItem.quantity - 1}
				: cartItem
		);
};

// This function removes all copies of a product from the cart.
export const clearCartItem = (cartItems, productsToClear) =>
	cartItems.filter(cartItem => cartItem.id !== productsToClear.id);

// CartContext is a context object that initializes the cart dropdown menu as closed and empty.
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	totalCount: 0
});

// This component checks if the cart dropdown menu is open (i.e. true) or closed (i.e. false), if there are items in the cart, how many items are in the cart, and the total.
export const CartProvider = props => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);

	// Updates the number of items in the cart.
	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setCartCount(newCartCount);
	}, [cartItems]);

	// Updates the total price for all the cart items.
	useEffect(() => {
		const newTotalCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setTotalCount(newTotalCount);
	}, [cartItems]);

	const addItemToCart = productToAdd => setCartItems(addCartItem(cartItems, productToAdd));

	const removeItemFromCart = productToRemove =>
		setCartItems(removeCartItem(cartItems, productToRemove));

	const clearItemFromCart = productsToClear =>
		setCartItems(clearCartItem(cartItems, productsToClear));

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		totalCount
	};

	return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
};
