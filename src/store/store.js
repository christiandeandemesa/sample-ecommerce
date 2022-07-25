// Where each reducer's state lives and where we receive dispatched actions.

import {compose, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import {rootReducer} from './root-reducer';

const persistConfig = {
	key: 'root',
	storage: storage,
	blacklist: ['user'] // Prevents the the logged in/out user from persisting between reloads.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [logger]; // This executes before a dispatched action reaches the reducers.

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers); // The second argument is for additional default states.

export const persistor = persistStore(store);
