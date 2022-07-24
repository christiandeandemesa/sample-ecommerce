import {React, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {getCategoriesAndDocuments} from '../../utils/firebase/firebase.utils';

import {setCategories} from '../../store/categories/categories.action';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

// This is the shopping page component.
function Shop() {
	const dispatch = useDispatch();

	// Gets all the documents from the categories collection, and sets it as an array in categoriesArray.
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesArray = await getCategoriesAndDocuments();

			dispatch(setCategories(categoriesArray));
		};

		getCategoriesMap();
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
