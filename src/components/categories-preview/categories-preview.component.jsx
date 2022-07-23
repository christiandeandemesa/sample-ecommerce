import {React, useContext} from 'react';

import {CategoriesContext} from '../../contexts/categories.context';

import CategoryPreview from '../category-preview/category-preview.component';

// The categories preview component.
function CategoriesPreview() {
	const {categoriesMap} = useContext(CategoriesContext);

	return (
		<>
			{Object.keys(categoriesMap).map(title => {
				const products = categoriesMap[title];
				return <CategoryPreview key={title} title={title} products={products} />;
			})}
		</>
	);
}

export default CategoriesPreview;
