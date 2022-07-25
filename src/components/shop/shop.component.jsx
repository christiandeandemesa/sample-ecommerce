import {React, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {fetchCategoriesAsync} from '../../store/categories/categories.action';
// import {fetchCategoriesStart} from '../../store/categories/categories.action';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

// This is the shopping page component.
function Shop() {
	const dispatch = useDispatch();

	// Dispatches the categories thunk.
	useEffect(() => {
		dispatch(fetchCategoriesAsync());
		// dispatch(fetchCategoriesStart()); // Replace the above dispatch with this if you use redux-saga instead of redux-thunk.
	}, []);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			{/* Using a colon creates a dynamic route toward the category name. */}
			<Route path=':category' element={<Category />} />
		</Routes>
	);
}

export default Shop;
