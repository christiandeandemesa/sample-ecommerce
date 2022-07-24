import {createAction} from '../../utils/reducer/reducer.utils';

import {CATEGORIES_ACTION_TYPES} from './categories.types';

// Creates an action object to be dispatched to the categories reducer.
export const setCategories = categories =>
	createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);
