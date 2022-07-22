import {React, useContext} from 'react';

import {Link, Outlet} from 'react-router-dom';

import {signOutUser} from '../../utils/firebase/firebase.utils';

import {UserContext} from '../../contexts/user.context';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'; // Imports the SVG icon as a component.

import './navbar.styles.scss';

// This is the navigation bar component.
function Navbar() {
	// Takes the currentUser from the useContext object.
	const {currentUser} = useContext(UserContext);

	return (
		// Use of fragment tag.
		<>
			<div className='navigation'>
				<Link to='/' className='logo-container'>
					<CrwnLogo className='logo' />
				</Link>

				<div className='nav-links-container'>
					<Link to='/shop' className='nav-link'>
						SHOP
					</Link>
				</div>

				{/* If currentUser is not null, render the SIGN OUT link. If currentUser is null, render the SIGN IN link. */}
				{currentUser ? (
					<div className='nav-links-container'>
						<span className='nav-link' onClick={signOutUser}>
							SIGN OUT
						</span>
					</div>
				) : (
					<div className='nav-links-container'>
						<Link to='/auth' className='nav-link'>
							SIGN IN
						</Link>
					</div>
				)}
			</div>
			<Outlet /> {/* Outlet renders the current Link that was selected */}
		</>
	);
}

export default Navbar;
