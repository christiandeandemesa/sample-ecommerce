import {createContext, useState} from 'react';

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
	addItemToCart: () => {}
});

// This component checks if the cart dropdown menu is open (i.e. true) or closed (i.e. false), and if there are items in the cart.
export const CartProvider = props => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	const addItemToCart = productToAdd => setCartItems(addCartItem(cartItems, productToAdd));

	const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};

	return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
};
