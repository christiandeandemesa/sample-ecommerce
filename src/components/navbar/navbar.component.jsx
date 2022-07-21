import React from 'react';

import {Link, Outlet} from 'react-router-dom';

import {ReactComponent as CrwnLogo} from '../../assets/crown.svg';

import './navbar.styles.scss';

function Navbar() {
	return (
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
					<Link to='/signIn' className='nav-link'>
						SIGN IN
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	);
}

export default Navbar;
