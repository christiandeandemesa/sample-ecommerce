import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {UserProvider} from './contexts/user.context';
import {CategoriesProvider} from './contexts/categories.context';
import {CartProvider} from './contexts/cart.context';

import Navbar from './components/navbar/navbar.component';
import Home from './components/home/home.component';
import Shop from './components/shop/shop.component';
import Authentication from './components/authentication/authentication.component';
import Checkout from './components/checkout/checkout.component';

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<CategoriesProvider>
					<CartProvider>
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
					</CartProvider>
				</CategoriesProvider>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
