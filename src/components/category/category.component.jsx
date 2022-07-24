import {React, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';

import {selectCategoriesMap} from '../../store/categories/categories.selector';

import ProductCard from '../product-card/product-card.component';

import './category.styles.scss';

// Each category page component.
function Category() {
	const {category} = useParams();

	const categoriesMap = useSelector(selectCategoriesMap);

	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<>
			<h2 className='title'>{category.toUpperCase()}</h2>
			<div className='category-container'>
				{/* Used products && because the products fetched from the categories collection is asynchronous, so the page will not show anything until it gets the data. */}
				{products &&
					products.map(product => <ProductCard key={product.id} product={product} />)}
			</div>
		</>
	);
}

export default Category;
