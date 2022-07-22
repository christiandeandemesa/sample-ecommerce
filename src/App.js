import {BrowserRouter, Routes, Route} from 'react-router-dom';

import {UserProvider} from './contexts/user.context';

import Navbar from './components/navbar/navbar.component';
import Home from './components/home/home.component';
import Authentication from './components/authentication/authentication.component';

function Shop() {
	return <div>This is the shop</div>;
}

function App() {
	return (
		<BrowserRouter>
			{/* Since the UserProvider component checks if a user is logged in or not, it wraps around everything except BrowserRouter to keep all routing enabled. */}
			<UserProvider>
				<Routes>
					<Route path='/' element={<Navbar />}>
						{/* index corresponds to the parent level path (e.g. path='/'). */}
						<Route index element={<Home />} />
						<Route path='shop' element={<Shop />} />
						<Route path='auth' element={<Authentication />} />
					</Route>
				</Routes>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
