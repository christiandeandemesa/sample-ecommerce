import {createAction} from '../../utils/reducer/reducer.utils';

import {CART_ACTION_TYPES} from './cart.types';

// Creates an action object that toggles the cart dropdown menu that is dispatched to the cart reducer.
export const setIsCartOpen = bool => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

// This function adds a product to the cart.
const addCartItem = (cartItems, productToAdd) => {
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
const removeCartItem = (cartItems, productToRemove) => {
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
const clearCartItem = (cartItems, productsToClear) =>
	cartItems.filter(cartItem => cartItem.id !== productsToClear.id);

// Creates an action object that adds an item to the cart that is dispatched to the cart reducer.
export const addItemToCart = (cartItems, productToAdd) => {
	const newCartItems = addCartItem(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// Creates an action object that removes an item from the cart that is dispatched to the cart reducer.
export const removeItemFromCart = (cartItems, productToRemove) => {
	const newCartItems = removeCartItem(cartItems, productToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// Creates an action object that removes every copy of an item from the cart that is dispatched to the cart reducer.
export const clearItemFromCart = (cartItems, productsToClear) => {
	const newCartItems = clearCartItem(cartItems, productsToClear);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// Creates an action object that removes every item from the cart that is dispatched to the cart reducer.
export const clearAllItemsFromCart = () => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, []);
