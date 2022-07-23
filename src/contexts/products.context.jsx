import {createContext, useEffect, useState} from 'react';

import {addCollectionAndDocuments} from '../utils/firebase/firebase.utils';

import SHOP_DATA from '../shop-data.js';

// ProductsContext is a context object that initializes the products as empty.
export const ProductsContext = createContext({
	products: []
});

// This component checks if ???
export const ProductsProvider = props => {
	const [products, setProducts] = useState([]);

	// Adds the data to a collection called categories.
	useEffect(() => {
		addCollectionAndDocuments('categories', SHOP_DATA);
	}, []);

	const value = {products};

	return <ProductsContext.Provider value={value}>{props.children}</ProductsContext.Provider>;
};
