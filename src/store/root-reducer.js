import {combineReducers} from 'redux';

import {userReducer} from './user/user.reducer';
import {categoriesReducer} from './categories/categories.reducer';
import {cartReducer} from './cart/cart.reducer';

// This holds all the reducers in an object.
export const rootReducer = combineReducers({
	user: userReducer,
	categories: categoriesReducer,
	cart: cartReducer
});
