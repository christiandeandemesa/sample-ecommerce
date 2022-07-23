import {createContext, useEffect, useState} from 'react';

import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils';

// CategoriesContext is a context object that initializes the categories as empty.
export const CategoriesContext = createContext({
	categoriesMap: []
});

// This component checks if ???
export const CategoriesProvider = props => {
	const [categoriesMap, setCategoriesMap] = useState({});

	// Gets all the documents from the categories collection, and sets it as an object in categoriesMap.
	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoryMap = await getCategoriesAndDocuments();

			setCategoriesMap(categoryMap);
		};

		getCategoriesMap();
	}, []);

	const value = {categoriesMap};

	return <CategoriesContext.Provider value={value}>{props.children}</CategoriesContext.Provider>;
};
