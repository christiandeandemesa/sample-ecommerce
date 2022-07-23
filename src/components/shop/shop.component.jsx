import React from 'react';

import {Routes, Route} from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

import './shop.styles.scss';

// This is the shopping page component.
function Shop() {
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			{/* Using a colon creates a dynamic route toward the category name. */}
			<Route path=':category' element={<Category />} />
		</Routes>
	);
}

export default Shop;
