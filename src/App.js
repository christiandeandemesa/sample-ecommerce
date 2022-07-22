import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {UserProvider} from './contexts/user.context';
import {ProductsProvider} from './contexts/products.context';

import Navbar from './components/navbar/navbar.component';
import Home from './components/home/home.component';
import Shop from './components/shop/shop.component';
import Authentication from './components/authentication/authentication.component';

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<ProductsProvider>
					<Routes>
						<Route path='/' element={<Navbar />}>
							{/* index corresponds to the parent level path (e.g. path='/'). */}
							<Route index element={<Home />} />
							<Route path='shop' element={<Shop />} />
							<Route path='auth' element={<Authentication />} />
						</Route>
					</Routes>
				</ProductsProvider>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
