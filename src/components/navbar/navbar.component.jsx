import React from 'react';

import {Link, Outlet} from 'react-router-dom';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'; // Imports the SVG icon as a component.

import './navbar.styles.scss';

// This is the navigation bar component.
function Navbar() {
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

				<div className='nav-links-container'>
					<Link to='/auth' className='nav-link'>
						SIGN IN
					</Link>
				</div>
			</div>
			<Outlet /> {/* Outlet renders the current Link that was selected */}
		</>
	);
}

export default Navbar;
