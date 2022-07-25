import {takeLatest, all, call, put} from 'redux-saga/effects';

import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';

import {fetchCategoriesSuccess, fetchCategoriesFailed} from './categories.action';
import {CATEGORIES_ACTION_TYPES} from './category.types';

/*
How an ES6 generator function executes.

function* test(num) {
	yield num;
	const newNum = num + 10;
	yield newNum;
	const newestNum = newNum + 100;
	return newestNum;
}

const num = test(1);
console.log(num.next()); // { value: 1, done: false }
console.log(num.next()); // { value: 11, done: false }
console.log(num.next()); // { value: 111, done: true }
*/

export function* fetchCategoriesAsync() {
	try {
		// Gets all the documents from the categories collection, and sets it as an array in categoriesArray.
		const categoriesArray = yield call(getCategoriesAndDocuments); // call turns the generator function into an effect.

		yield put(fetchCategoriesSuccess(categoriesArray)); // put is the generator version of dispatch.
	} catch (err) {
		yield put(fetchCategoriesFailed(err));
	}
}

export function* onFetchCategories() {
	yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync); // If takeLatest hears similar actions, only execute the latest one.
}

export function* categoriesSaga() {
	yield all([onFetchCategories]); // The array will hold different functions and generators, and it will not progress to the next line of code until every one executes.
}
