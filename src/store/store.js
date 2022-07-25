// Where each reducer's state lives and where we receive dispatched actions.

import {compose, createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';

import {rootReducer} from './root-reducer';

// import {rootSaga} from './root-saga';

// import {customLogger} from '../middleware/customLogger';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['cart'] // Only allows the cart to persist between reloads.
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const sagaMiddleware = createSagaMiddleware();

// Note that if you use sagaMiddleware, you cannot use thunk.
const middleWares = [
	process.env.NODE_ENV === 'development' && logger,
	thunk /* sagaMiddleware */
].filter(Boolean); // This executes before an action reaches the reducers while in development.

const composeEnhancer =
	(process.env.NODE_ENV === 'development' &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose; // If in development, active redux devtools extension.

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers); // The second argument is for additional default states.

// sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
