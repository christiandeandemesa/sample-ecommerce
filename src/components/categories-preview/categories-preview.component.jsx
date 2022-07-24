import {React} from 'react';
import {useSelector} from 'react-redux';

import {selectCategoriesMap} from '../../store/categories/categories.selector';

import CategoryPreview from '../category-preview/category-preview.component';

// The categories preview component.
function CategoriesPreview() {
	const categoriesMap = useSelector(selectCategoriesMap);

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
