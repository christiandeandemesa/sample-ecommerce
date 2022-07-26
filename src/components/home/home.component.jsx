import {React, useEffect} from 'react';

import {useDispatch} from 'react-redux';

import {setIsCartOpen} from '../../store/cart/cart.action';

import CategoriesContainer from '../categories-container/categories-container.component';

// This is the home page component.
function Home() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setIsCartOpen(false));
	}, []);

	return <CategoriesContainer />;
}

export default Home;
