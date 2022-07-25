// Where each reducer's state lives and where we receive dispatched actions.

import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';

import {rootReducer} from './root-reducer';

const middleWares = [logger]; // This executes before a dispatched action reaches the reducers.

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers); // The second argument is for additional default states.
