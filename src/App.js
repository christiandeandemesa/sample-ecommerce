import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from './components/navbar/navbar.component';
import Home from './components/home/home.component';

import './App.scss';

function Shop() {
	return <div>This is the shop</div>;
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<Home />} />
					<Route path='shop' element={<Shop />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
