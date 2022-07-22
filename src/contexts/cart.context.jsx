import {createContext, useState} from 'react';

// CartContext is a context object that initializes the cart dropdown menu as closed.
export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {}
});

// This component checks if the cart dropdown menu is open (i.e. true) or closed (i.e. false).
export const CartProvider = props => {
	const [isCartOpen, setIsCartOpen] = useState(false);

	const value = {isCartOpen, setIsCartOpen};

	return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
};
