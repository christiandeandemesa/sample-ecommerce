import {createAction} from '../../utils/reducer/reducer.utils';

import {CATEGORIES_ACTION_TYPES} from './categories.types';

import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';

// Creates an action object to be dispatched to the categories reducer.
export const setCategories = categories =>
	createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categories);

export const fetchCategoriesStart = () =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = categories =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categories);

export const fetchCategoriesFailed = err =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, err);

// The categories thunk executes or dispatches different functions asynchronously depending if they are successful or not.
export const fetchCategoriesAsync = () => async dispatch => {
	dispatch(fetchCategoriesStart());

	try {
		// Gets all the documents from the categories collection, and sets it as an array in categoriesArray.
		const categoriesArray = await getCategoriesAndDocuments();
		dispatch(fetchCategoriesSuccess(categoriesArray));
	} catch (err) {
		dispatch(fetchCategoriesFailed(err));
	}
};
