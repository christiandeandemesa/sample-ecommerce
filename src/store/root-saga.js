import {all, call} from 'redux-saga.effects';

import {categoriesSaga} from './categories/categories.saga';

// Sagas execute after individual reducers are updated (e.g. cart reducer), but before they pass the state to the component. Then the sagas run back into the middleware.
// This holds all the sagas in an object.
export function* rootSaga() {
	yield all([call(categoriesSaga)]);
}
