import {createContext, useReducer} from 'react';

import {createAction} from '../utils/reducer/reducer.utils';

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

// This holds the different action types for the cartReducer.
const CART_ACTION_TYPES = {
	SET_CART_ITEMS: 'SET_IS_CART_ITEMS',
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

// The cartReducer takes the state (i.e. all the cart's variables) and an action (i.e. what is dispatched), then updates the state's variable(s) with the action's payload depending on the action's type.
const cartReducer = (state, action) => {
	const {type, payload} = action;

	switch (type) {
		case CART_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload // The payload is spread over because it could be added, incremented, decremented, or removed from the state.
			};

		case CART_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload
			};

		default:
			throw new Error(`🛑 Unhandled type ${type} in cartReducer`);
	}
};

// This is the initial state of each variable in the cart.
const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	totalCount: 0
};

// This component checks if the cart dropdown menu is open (i.e. true) or closed (i.e. false), if there are items in the cart, how many items are in the cart, and the total.
export const CartProvider = props => {
	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE); // Takes the state from the initial state, and will run the dispatch toward the cartReducer.

	const {isCartOpen, cartItems, cartCount, totalCount} = state;

	// This function takes what is returned from the below functions, then appropriately updates the cartItems, cartCount, and totalCount.
	const updateCartItemsReducer = newCartItems => {
		const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

		const newTotalCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		// Dispatches an action with a type (e.g. CART_ACTION_TYPES.SET_CART_ITEMS) and payload (e.g. the object).
		dispatch(
			createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
				cartItems: newCartItems,
				cartCount: newCartCount,
				totalCount: newTotalCount
			})
		);
	};

	const addItemToCart = productToAdd => {
		const newCartItems = addCartItem(cartItems, productToAdd);
		updateCartItemsReducer(newCartItems);
	};

	const removeItemFromCart = productToRemove => {
		const newCartItems = removeCartItem(cartItems, productToRemove);
		updateCartItemsReducer(newCartItems);
	};

	const clearItemFromCart = productsToClear => {
		const newCartItems = clearCartItem(cartItems, productsToClear);
		updateCartItemsReducer(newCartItems);
	};

	const setIsCartOpen = bool => {
		dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)); // Dispatches an action with a type (e.g. CART_ACTION_TYPES.SET_IS_CART_OPEN) and payload (e.g. bool).
	};

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
