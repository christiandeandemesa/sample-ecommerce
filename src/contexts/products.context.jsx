import {createContext, useEffect, useState} from 'react';

// import {onAuthStateChangedListener} from '../utils/firebase/firebase.utils';

import SHOP_DATA from '../shop-data.json';

export const ProductsContext = createContext({
	products: []
});

export const ProductsProvider = props => {
	const [products, setProducts] = useState(SHOP_DATA);

	const value = {products};

	return <ProductsContext.Provider value={value}>{props.children}</ProductsContext.Provider>;
};
