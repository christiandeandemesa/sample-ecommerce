// Holds all the reducers in an object called rootReducer.

import {combineReducers} from 'redux';

import {userReducer} from './user/user.reducer';

export const rootReducer = combineReducers({
	user: userReducer
});
