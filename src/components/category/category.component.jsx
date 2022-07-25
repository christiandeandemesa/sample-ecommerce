import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {
	selectCategoriesIsLoading,
	selectCategoriesMap
} from '../../store/categories/categories.selector';

import ProductCard from '../product-card/product-card.component';
import Spinner from '../spinner/spinner.component';

import './category.styles.scss';

// Each category page component.
function Category() {
	// useParams() creates an object where category (named in the shop component) is the name from the dynamic route (e.g. hats).
	const {category} = useParams();

	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);

	const [products, setProducts] = useState(categoriesMap[category]);

	// This sets all of the products from a given category (e.g. hats) among all the categories.
	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<h2 className='title'>{category.toUpperCase()}</h2>

			{isLoading ? (
				<Spinner />
			) : (
				<div className='category-container'>
					{/* Used products && because the products fetched from the categories collection is asynchronous, so the page will not show anything until it gets the data. */}
					{products &&
						products.map(product => <ProductCard key={product.id} product={product} />)}
				</div>
			)}
		</>
	);
}

export default Category;
