import {React} from 'react';
import {useSelector} from 'react-redux';

import {
	selectCategoriesMap,
	selectCategoriesIsLoading
} from '../../store/categories/categories.selector';

import CategoryPreview from '../category-preview/category-preview.component';
import Spinner from '../spinner/spinner.component';

// The categories preview component.
function CategoriesPreview() {
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map(title => {
					const products = categoriesMap[title];
					return <CategoryPreview key={title} title={title} products={products} />;
				})
			)}
		</>
	);
}

export default CategoriesPreview;
