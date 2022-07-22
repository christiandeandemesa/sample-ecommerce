import {createContext, useState, useEffect} from 'react';

// This function adds a product to all the cart items.
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

// CartContext is a context object that initializes the cart dropdown menu as closed and empty.
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	cartCount: 0
});

// This component checks if the cart dropdown menu is open (i.e. true) or closed (i.e. false), if there are items in the cart, and how many items are in the cart.
export const CartProvider = props => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
		setCartCount(newCartCount);
	}, [cartItems]);

	const addItemToCart = productToAdd => setCartItems(addCartItem(cartItems, productToAdd));

	const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

	return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
};
