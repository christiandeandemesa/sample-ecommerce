import {useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import {
	createUserDocumentFromAuth,
	onAuthStateChangedListener
} from './utils/firebase/firebase.utils';

import {setCurrentUser} from './store/user/user.action';

import Navbar from './components/navbar/navbar.component';
import Home from './components/home/home.component';
import Shop from './components/shop/shop.component';
import Authentication from './components/authentication/authentication.component';
import Checkout from './components/checkout/checkout.component';

function App() {
	const dispatch = useDispatch();

	// Checks if a user is logged in or not.
	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener(user => {
			if (user) createUserDocumentFromAuth(user);

			dispatch(setCurrentUser(user));
		});

		return unsubscribe;
	}, []);

	return (
		<Routes>
			<Route path='/' element={<Navbar />}>
				{/* index corresponds to the parent level path (e.g. path='/'). */}
				<Route index element={<Home />} />
				{/* The wildcard * is needed because the Shop component has additional routes. */}
				<Route path='shop/*' element={<Shop />} />
				<Route path='auth' element={<Authentication />} />
				<Route path='checkout' element={<Checkout />} />
			</Route>
		</Routes>
	);
}

export default App;
