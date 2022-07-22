import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from './components/navbar/navbar.component';
import Home from './components/home/home.component';
import Authentication from './components/authentication/authentication.component';

function Shop() {
	return <div>This is the shop</div>;
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navbar />}>
					{/* index corresponds to the parent level path (e.g. path='/') */}
					<Route index element={<Home />} />
					<Route path='shop' element={<Shop />} />
					<Route path='auth' element={<Authentication />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
