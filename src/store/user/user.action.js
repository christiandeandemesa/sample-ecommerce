import {createAction} from '../../utils/reducer/reducer.utils';

import {USER_ACTION_TYPES} from './user.types';

// Creates an action object to be dispatched to the user reducer.
export const setCurrentUser = user => createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); // Creates an action object with a type (e.g. USER_ACTION_TYPES.SET_CURRENT_USER) and payload (e.g. user).
