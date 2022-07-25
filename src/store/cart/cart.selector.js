import {createSelector} from 'reselect';

const selectCartReducer = state => state.cart;

export const selectCartItems = createSelector(
	// Caches state[cart].
	[selectCartReducer],
	cart => cart.cartItems
);

// Selects isCartOpen from state in the cart reducer.
export const selectIsCartOpen = createSelector(
	// Caches what is cached in selectCartItems.
	[selectCartItems],
	cart => cart.isCartOpen
);

// Selects cartCount from state in the cart reducer.
export const selectCartCount = createSelector(
	// Caches what is cached in selectCartItems.
	[selectCartItems],
	// Takes the cartItems, starts the total at 0, and adds each cartItem to the total.
	cartItems => cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// Selects totalCount from state in the cart reducer.
export const selectTotalCount = createSelector(
	// Caches what is cached in selectCartItems.
	[selectCartItems],
	// Takes the cartItems, starts the total at 0, and adds each cartItem multiplied by its price to the total.
	cartItems =>
		cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
);
